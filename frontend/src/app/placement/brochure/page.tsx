import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  Download,
  FileText,
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Building2,
} from "lucide-react";
import { API_URL } from "@/lib/constants";

export const dynamic = "force-dynamic";

interface BrochureItem {
  id: string;
  title: string;
  description?: string | null;
  academicYear?: string | null;
  fileUrl?: string | null;
  fileType?: string | null;
  fileName?: string | null;
  fileSize?: string | null;
  isActive: boolean;
  order?: number;
}

async function getBrochures(): Promise<BrochureItem[]> {
  try {
    const res = await fetch(`${API_URL}/public/brochures`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch brochures:", err);
    return [];
  }
}

export default async function PlacementBrochuresPage() {
  const brochures = await getBrochures();

  // Fallback defaults if database has not returned any items yet
  const displayBrochures: BrochureItem[] =
    brochures.length > 0
      ? brochures
      : [
          {
            id: "2026-27",
            title: "CGEC Placement Brochure 2026-27",
            academicYear: "2026-2027",
            description:
              "Official Training & Placement Brochure for Cooch Behar Government Engineering College detailing department rosters, recruiter highlights, and hiring guidelines.",
            fileName: "placement_brochure_2026-27_compressed.pdf",
            fileType: "pdf",
            isActive: true,
          },
          {
            id: "2025-26",
            title: "CGEC Placement Brochure 2025-26",
            academicYear: "2025-2026",
            description:
              "Official Training & Placement Brochure for Cooch Behar Government Engineering College detailing department rosters, recruiter highlights, and hiring guidelines.",
            fileName: "placement_brochure_2025-26.pdf",
            fileType: "pdf",
            isActive: false,
          },
        ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white pb-16">
      {/* Top Breadcrumb Bar */}
      <div className="bg-[#0b1326] border-b border-slate-800/80 sticky top-0 z-40 px-4 py-3.5 backdrop-blur-md">
        <div className="container mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <Link
              href="/placement"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-700/60 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Placement</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-blue-400 font-semibold">Placement Brochures</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Training &amp; Placement Cell, CGEC</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto max-w-6xl px-4 py-10 flex-1 flex flex-col">
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 mb-3.5">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>Official College Brochures</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            CGEC Placement Brochures
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Select an academic year brochure below to view the official student demographics, department-wise skill matrices, recruiter profiles, and campus hiring guidelines in full view.
          </p>
        </div>

        {/* Brochure Cards Grid - Styled matching user image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full">
          {displayBrochures.map((item) => {
            const viewUrl = item.id.length > 10 ? `/api/brochure/view?id=${item.id}` : "/api/brochure/view";
            const dlUrl = item.id.length > 10 ? `/api/brochure/download?id=${item.id}` : "/api/brochure/download";

            return (
              <div
                key={item.id}
                className={`group relative bg-[#0b1428] rounded-2xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-2xl ${
                  item.isActive
                    ? "border-blue-500/40 hover:border-blue-400/80 shadow-blue-500/5 hover:shadow-blue-500/10"
                    : "border-slate-800/90 hover:border-slate-700"
                }`}
              >
                <div>
                  {/* Top Row: Icon + Title + Academic Year + Active Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-start gap-3.5">
                      {/* Red/Rose PDF File Icon in dark squircle container (matching screenshot) */}
                      <div className="p-3 rounded-2xl bg-[#14203d] border border-slate-700/60 shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                        <FileText className="w-6 h-6 text-rose-500" />
                      </div>

                      <div>
                        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                          {item.title}
                        </h2>
                        {item.academicYear && (
                          <p className="text-xs sm:text-sm font-semibold text-blue-400 mt-1 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-blue-400" />
                            <span>Academic Year: {item.academicYear}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {item.isActive && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Active</span>
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed mb-6">
                    {item.description ||
                      "Official Training & Placement Brochure for Cooch Behar Government Engineering College detailing department rosters, recruiter highlights, and hiring guidelines."}
                  </p>

                  {/* Filename Pill with PDF badge (matching screenshot) */}
                  <div className="bg-[#060a14] border border-slate-800/90 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs text-slate-400 font-mono mb-6">
                    <span className="truncate max-w-[240px] sm:max-w-[280px]" title={item.fileName || "placement_brochure.pdf"}>
                      {item.fileName || "placement_brochure_compressed.pdf"}
                    </span>
                    <span className="text-[10px] font-bold text-slate-300 uppercase bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700">
                      PDF
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                  {/* Primary CTA: Open in Full View New Tab */}
                  <a
                    href={viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Brochure (PDF)</span>
                  </a>

                  {/* Secondary CTA: Direct Download */}
                  <a
                    href={dlUrl}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-3 bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors border border-slate-700"
                    title="Download Brochure PDF"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-14 text-center text-xs text-slate-500">
          Cooch Behar Government Engineering College (CGEC) • Training and Placement Cell • Email:{" "}
          <a href="mailto:placement@cgec.org.in" className="text-blue-400 hover:underline">
            placement@cgec.org.in
          </a>
        </div>
      </div>
    </div>
  );
}
