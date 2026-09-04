import { NextRequest, NextResponse } from "next/server";
import { API_URL } from "@/lib/constants";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const fetchUrl = id
      ? `${API_URL}/public/brochures/${id}`
      : `${API_URL}/public/brochures/latest`;

    const metaRes = await fetch(fetchUrl, { cache: "no-store" });
    if (!metaRes.ok) {
      return new NextResponse("Brochure not found", { status: 404 });
    }

    const brochure = await metaRes.json();
    const fileUrl = brochure.fileUrl || "/data/placement/CGEC_Placement_Brochure.pdf";
    
    // Ensure clean download filename with proper .pdf extension
    let downloadFileName = brochure.fileName || `CGEC_Placement_Brochure_${brochure.academicYear || "2026-27"}.pdf`;
    if (!downloadFileName.toLowerCase().endsWith(".pdf")) {
      downloadFileName = `${downloadFileName}.pdf`;
    }

    const contentType = "application/pdf";

    // If local file
    if (fileUrl.startsWith("/")) {
      const localPath = path.join(process.cwd(), "public", fileUrl.replace(/^\//, ""));
      if (fs.existsSync(localPath)) {
        const fileBuffer = fs.readFileSync(localPath);
        return new NextResponse(fileBuffer, {
          headers: {
            "Content-Type": contentType,
            "Content-Disposition": `attachment; filename="${downloadFileName}"`,
          },
        });
      }
    }

    // Remote file (Cloudinary)
    const remoteRes = await fetch(fileUrl);
    if (!remoteRes.ok) {
      const fallbackPath = path.join(process.cwd(), "public/data/placement/CGEC_Placement_Brochure.pdf");
      if (fs.existsSync(fallbackPath)) {
        const fallbackBuffer = fs.readFileSync(fallbackPath);
        return new NextResponse(fallbackBuffer, {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="CGEC_Placement_Brochure.pdf"`,
          },
        });
      }
      return new NextResponse("Failed to download brochure file", { status: 502 });
    }

    const buffer = await remoteRes.arrayBuffer();
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${downloadFileName}"`,
      },
    });
  } catch (error: unknown) {
    console.error("Brochure download error:", error);
    return new NextResponse("Error downloading brochure", { status: 500 });
  }
}
