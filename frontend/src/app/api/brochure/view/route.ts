import { NextRequest, NextResponse } from "next/server";
import { API_URL } from "@/lib/constants";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // 1. Fetch specific brochure or active brochure from backend
    const fetchUrl = id
      ? `${API_URL}/public/brochures/${id}`
      : `${API_URL}/public/brochures/latest`;

    const metaRes = await fetch(fetchUrl, { cache: "no-store" });
    if (!metaRes.ok) {
      return new NextResponse("Brochure not found", { status: 404 });
    }

    const brochure = await metaRes.json();
    const fileUrl = brochure.fileUrl || "/data/placement/CGEC_Placement_Brochure.pdf";
    let fileName = brochure.fileName || `CGEC_Placement_Brochure_${brochure.academicYear || "2026-27"}.pdf`;
    if (!fileName.toLowerCase().endsWith(".pdf")) {
      fileName = `${fileName}.pdf`;
    }

    // 2. If local file on disk
    if (fileUrl.startsWith("/")) {
      const localPath = path.join(process.cwd(), "public", fileUrl.replace(/^\//, ""));
      if (fs.existsSync(localPath)) {
        const fileBuffer = fs.readFileSync(localPath);
        return new NextResponse(fileBuffer, {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `inline; filename="${fileName}"`,
            "Cache-Control": "public, max-age=3600",
          },
        });
      }
    }

    // 3. Remote file (Cloudinary)
    const remoteRes = await fetch(fileUrl);
    if (!remoteRes.ok) {
      // Fallback to local brochure if remote fetch fails
      const fallbackPath = path.join(process.cwd(), "public/data/placement/CGEC_Placement_Brochure.pdf");
      if (fs.existsSync(fallbackPath)) {
        const fallbackBuffer = fs.readFileSync(fallbackPath);
        return new NextResponse(fallbackBuffer, {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `inline; filename="CGEC_Placement_Brochure.pdf"`,
          },
        });
      }
      return new NextResponse("Failed to load brochure file", { status: 502 });
    }

    const buffer = await remoteRes.arrayBuffer();
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${fileName}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error: unknown) {
    console.error("Brochure view proxy error:", error);
    return new NextResponse("Internal server error while loading brochure", { status: 500 });
  }
}
