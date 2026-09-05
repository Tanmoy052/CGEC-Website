"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronRight,
  MessageCircle,
  Phone,
  Mail,
  Download,
  FileText,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { API_URL } from "@/lib/constants";

interface AdmissionItemData {
  id?: string;
  category?: string;
  title: string;
  fileUrl: string;
  order?: number;
}

interface AdmissionNoticeRow {
  id: string;
  subject: string;
  link: string;
}

const DEFAULT_NOTICES: AdmissionNoticeRow[] = [];
const DEFAULT_DOCUMENTS: AdmissionNoticeRow[] = [];

export default function AdmissionDynamicPage() {
  const [year, setYear] = useState("2026");
  const [notices, setNotices] = useState(DEFAULT_NOTICES);
  const [documents, setDocuments] = useState(DEFAULT_DOCUMENTS);
  const [config, setConfig] = useState({
    whatsappLink: "",
    contactPhone: "9475445190",
    contactEmail: "admission@cgec.org.in",
    officerName: "Dr. Sushovan Chatterjee",
    officerRole: "PI Admin, Admission (2026)",
    officerDesignation: "Cooch Behar Government Engineering College",
  });

  useEffect(() => {
    fetch(`${API_URL}/public/admission`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          const currentYear = data.activeYear || data.config?.year || "2026";
          setYear(currentYear);

          if (Array.isArray(data.items) && data.items.length > 0) {
            const apiNotices = data.items
              .filter((i: AdmissionItemData) => i.category === "NOTICE")
              .map((item: AdmissionItemData, idx: number) => ({
                id: String(item.order || idx + 1).padStart(2, "0"),
                subject: item.title,
                link: item.fileUrl,
              }));
            const apiDocs = data.items
              .filter((i: AdmissionItemData) => i.category === "DOCUMENT")
              .map((item: AdmissionItemData, idx: number) => ({
                id: String(item.order || idx + 1).padStart(2, "0"),
                subject: item.title,
                link: item.fileUrl,
              }));

            if (apiNotices.length > 0) setNotices(apiNotices);
            if (apiDocs.length > 0) setDocuments(apiDocs);
          }

          if (data.config) {
            setConfig({
              whatsappLink: data.config.whatsappLink || "",
              contactPhone: data.config.contactPhone || "9475445190",
              contactEmail: data.config.contactEmail || "admission@cgec.org.in",
              officerName: data.config.officerName || "Dr. Sushovan Chatterjee",
              officerRole: data.config.officerRole || `PI Admin, Admission (${currentYear})`,
              officerDesignation: data.config.officerDesignation || "Cooch Behar Government Engineering College",
            });
          }
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3.5 sm:py-4 mb-6 sm:mb-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-wrap items-center gap-y-1 text-xs sm:text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 mx-1.5 sm:mx-2 text-gray-400" />
            <span className="text-gray-900">Admission</span>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 mx-1.5 sm:mx-2 text-gray-400" />
            <span className="font-semibold text-blue-600">Admission {year}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-6 sm:p-10 text-white text-center mb-8 sm:mb-12 shadow-xl shadow-blue-950/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 text-xs font-semibold mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>Current Academic Session {year}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3 sm:mb-4">
              Admission {year}
            </h1>

            {config.whatsappLink ? (
              <a
                href={config.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-950/20 transition-all hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span>Join Official WhatsApp Group for Admission {year}</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-80" />
              </a>
            ) : (
              <p className="text-blue-100 text-sm sm:text-base font-medium">
                Official Admission Portal for Academic Year {year}
              </p>
            )}
          </div>
        </div>

        {/* Two-Column Grid for Notices & Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12">
          {/* Left Column: Notices */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-blue-50/70 px-5 sm:px-6 py-4 border-b border-blue-100 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-blue-950 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600 shrink-0" />
                <span>Admission Related Notices {year}</span>
              </h2>
              <span className="text-xs font-bold text-blue-700 bg-blue-100/80 px-2.5 py-1 rounded-full">
                {notices.length}
              </span>
            </div>

            <div className="p-4 sm:p-6 flex-1">
              {notices.length === 0 ? (
                <div className="py-12 text-center text-gray-500">
                  <FileText className="w-10 h-10 mx-auto text-gray-300 mb-2" />
                  <p className="text-sm font-medium">No admission notices currently available for {year}.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notices.map((notice) => (
                    <div
                      key={notice.id}
                      className="p-3.5 sm:p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-blue-50/40 hover:border-blue-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {notice.id}
                        </span>
                        <p className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-blue-900 transition-colors">
                          {notice.subject}
                        </p>
                      </div>

                      <a
                        href={notice.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm hover:shadow transition-all shrink-0 self-start sm:self-center min-h-[34px] w-full sm:w-auto"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Documents */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-emerald-50/70 px-5 sm:px-6 py-4 border-b border-emerald-100 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-emerald-950 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Admission Related Documents</span>
              </h2>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full">
                {documents.length}
              </span>
            </div>

            <div className="p-4 sm:p-6 flex-1">
              {documents.length === 0 ? (
                <div className="py-12 text-center text-gray-500">
                  <FileText className="w-10 h-10 mx-auto text-gray-300 mb-2" />
                  <p className="text-sm font-medium">No admission documents currently available.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3.5 sm:p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-emerald-50/40 hover:border-emerald-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {doc.id}
                        </span>
                        <p className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-emerald-950 transition-colors">
                          {doc.subject}
                        </p>
                      </div>

                      <a
                        href={doc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm hover:shadow transition-all shrink-0 self-start sm:self-center min-h-[34px] w-full sm:w-auto"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Contact Info Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-8 border border-blue-100 shadow-sm text-sm">
          <div className="space-y-4 text-gray-800">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <span>Admission Assistance &amp; Helpdesk</span>
            </h3>

            <p className="leading-relaxed text-gray-600 text-xs sm:text-sm">
              For admission related assistance one may visit to Registrar&apos;s
              Office or contact our officials within the office hours (10.30 AM
              - 5.30 PM) or send an email. One official WhatsApp group has been created for
              better communication with reporting candidates (strictly within office
              hours):
            </p>

            {config.whatsappLink && (
              <div>
                <a
                  href={config.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 bg-green-50 hover:bg-green-100 text-green-800 px-4 py-2.5 rounded-xl border border-green-200 transition-colors font-bold text-xs sm:text-sm"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0" />
                  <span>Click here to join Admission {year} WhatsApp Group</span>
                </a>
              </div>
            )}

            <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 text-gray-700">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="truncate">
                  Official Contact:{" "}
                  <a
                    href={`tel:${config.contactPhone}`}
                    className="font-bold text-blue-900 hover:underline"
                  >
                    {config.contactPhone}
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-700">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="truncate">
                  Email:{" "}
                  <a
                    href={`mailto:${config.contactEmail}`}
                    className="font-bold text-blue-900 hover:underline"
                  >
                    {config.contactEmail}
                  </a>
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <p className="font-bold text-gray-900 text-sm">{config.officerName}</p>
              <p className="text-gray-600 text-xs">{config.officerRole}</p>
              <p className="text-gray-500 text-xs">{config.officerDesignation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
