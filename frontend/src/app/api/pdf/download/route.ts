import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const dynamic = "force-dynamic";

/**
 * Generic PDF download proxy.
 * Usage: /api/pdf/download?url=<encoded-pdf-url>&name=<filename>
 *
 * This ensures the browser always downloads with the correct
 * Content-Type: application/pdf and a proper .pdf filename,
 * fixing Cloudinary raw uploads that have no extension in the URL.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileUrl = searchParams.get("url");
    let fileName = searchParams.get("name") || "document.pdf";

    // Ensure .pdf extension
    if (!fileName.toLowerCase().endsWith(".pdf")) {
      fileName = `${fileName}.pdf`;
    }

    // Sanitize filename – remove characters unsafe for Content-Disposition
    const safeFileName = fileName.replace(/[^\w.\-_ ]/g, "_");

    if (!fileUrl) {
      return new NextResponse("Missing 'url' parameter", { status: 400 });
    }

    const headers = {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${safeFileName}"`,
    };

    // Local public file
    if (fileUrl.startsWith("/")) {
      const localPath = path.join(process.cwd(), "public", fileUrl.replace(/^\//, ""));
      if (fs.existsSync(localPath)) {
        const buffer = fs.readFileSync(localPath);
        return new NextResponse(buffer, { headers });
      }
      return new NextResponse("File not found", { status: 404 });
    }

    // Remote file (Cloudinary or any URL)
    const remoteRes = await fetch(fileUrl, { cache: "no-store" });
    if (!remoteRes.ok) {
      return new NextResponse("Failed to fetch PDF from remote source", { status: 502 });
    }

    const buffer = await remoteRes.arrayBuffer();
    return new NextResponse(buffer, { headers });
  } catch (error: unknown) {
    console.error("PDF download proxy error:", error);
    return new NextResponse("Error downloading PDF", { status: 500 });
  }
}
