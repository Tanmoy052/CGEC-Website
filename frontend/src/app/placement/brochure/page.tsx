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
  FileQuestion,
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
  const displayBrochures: BrochureItem[] = brochures;

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

        {/* Brochure Cards Grid */}
        {displayBrochures.length === 0 ? (
          <div className="bg-[#0b1428] rounded-2xl border border-dashed border-slate-700/80 p-16 text-center space-y-4 max-w-md mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl bg-slate-800/80 text-blue-400 flex items-center justify-center mx-auto">
              <FileQuestion className="w-8 h-8" />
            </div>
            <h3 className="text-white font-bold text-lg">No Placement Brochures Published</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Official placement brochures will appear here once published by the Training &amp; Placement Cell.
            </p>
          </div>
        ) : (
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
                    {/* Top Row */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-start gap-3.5">
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
                      {item.description || "Training & Placement Brochure for CGEC."}
                    </p>

                    {/* Filename Pill */}
                    <div className="bg-[#060a14] border border-slate-800/90 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs text-slate-400 font-mono mb-6">
                      <span className="truncate max-w-[240px] sm:max-w-[280px]" title={item.fileName || "brochure.pdf"}>
                        {item.fileName || "brochure.pdf"}
                      </span>
                      <span className="text-[10px] font-bold text-slate-300 uppercase bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700">
                        PDF
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                    <a
                      href={viewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 shadow-md shadow-blue-500/20 active:scale-95"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View Brochure (PDF)</span>
                    </a>

                    <a
                      href={dlUrl}
                      download
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/80 font-bold text-xs sm:text-sm transition-colors active:scale-95"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Download</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
