"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronRight,
  MessageCircle,
  Phone,
  Mail,
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
  const [year, setYear] = useState("2025");
  const [notices, setNotices] = useState(DEFAULT_NOTICES);
  const [documents, setDocuments] = useState(DEFAULT_DOCUMENTS);
  const [config, setConfig] = useState({
    whatsappLink: "",
    contactPhone: "9475445190",
    contactEmail: "admission@cgec.org.in",
    officerName: "Dr. Sushovan Chatterjee",
    officerRole: "PI Admin, Admission",
    officerDesignation: "Cooch Behar Government Engineering College",
  });

  useEffect(() => {
    fetch(`${API_URL}/public/admission`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          const currentYear = data.activeYear || data.config?.year || "2025";
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
    <div className="min-h-screen bg-white pb-12">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200 py-4 mb-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">Admission</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="font-semibold text-blue-600">Admission {year}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">
            Admission {year}
          </h1>
          {config.whatsappLink ? (
            <a
              href={config.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-gray-800 text-sm font-medium hover:text-green-600 hover:underline"
            >
              <MessageCircle className="w-4 h-4 text-green-600" />
              <span>For 1st year admission related queries please join the WhatsApp group</span>
            </a>
          ) : (
            <p className="text-gray-600 text-sm">
              Official Admission Portal for Academic Year {year}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column: Notices */}
          <div>
            <h2 className="text-xl font-normal text-blue-600 mb-4">
              Admission Related Notices {year}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b-2 border-gray-200">
                    <th className="py-2 px-3 font-semibold text-gray-700 w-12">
                      Sl. No
                    </th>
                    <th className="py-2 px-3 font-semibold text-gray-700">
                      Subject
                    </th>
                    <th className="py-2 px-3 font-semibold text-gray-700 w-28">
                      Download Link
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {notices.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-gray-500 font-medium">
                        No admission notices currently available.
                      </td>
                    </tr>
                  ) : (
                    notices.map((notice) => (
                      <tr key={notice.id} className="hover:bg-gray-50">
                        <td className="py-2 px-3 text-gray-600 align-top">
                          {notice.id}
                        </td>
                        <td className="py-2 px-3 text-gray-800 font-medium">
                          {notice.subject}
                        </td>
                        <td className="py-2 px-3 align-top">
                          <a
                            href={notice.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-gray-800 hover:text-blue-600"
                          >
                            Download
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Documents */}
          <div>
            <h2 className="text-xl font-normal text-blue-600 mb-4">
              Admission Related Documents
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b-2 border-gray-200">
                    <th className="py-2 px-3 font-semibold text-gray-700 w-12">
                      Sl. No
                    </th>
                    <th className="py-2 px-3 font-semibold text-gray-700">
                      Subject
                    </th>
                    <th className="py-2 px-3 font-semibold text-gray-700 w-28">
                      Download Link
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {documents.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-gray-500 font-medium">
                        No admission documents currently available.
                      </td>
                    </tr>
                  ) : (
                    documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="py-2 px-3 text-gray-600 align-top">
                          {doc.id}
                        </td>
                        <td className="py-2 px-3 text-gray-800 font-medium">
                          {doc.subject}
                        </td>
                        <td className="py-2 px-3 align-top">
                          <a
                            href={doc.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-gray-800 hover:text-blue-600"
                          >
                            Download
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Contact Info */}
        <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100 text-sm">
          <div className="space-y-3 text-gray-800">
            <p className="leading-relaxed">
              For admission related assistance one may visit to Registrar&apos;s
              Office or contact our officials within the office hours (10.30 AM
              -5.30 PM) or post email. One WhatsApp group has been created for
              better communication with the candidates (strictly within office
              hours). Hence all reporting candidates are requested to join this
              following group:
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-200">
                <MessageCircle className="w-5 h-5 text-green-600 shrink-0" />
                <span>
                  WhatsApp Group Link:{" "}
                  {config.whatsappLink ? (
                    <a
                      href={config.whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="underline font-bold hover:text-green-800"
                    >
                      Click here to join WhatsApp Group
                    </a>
                  ) : (
                    <span className="text-gray-500 italic">Not set by admin</span>
                  )}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-blue-100 mt-4">
              <div className="flex items-center gap-2 text-gray-700 mb-1">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>
                  Official Mobile No:{" "}
                  <a
                    href={`tel:${config.contactPhone}`}
                    className="font-bold text-blue-900 hover:underline"
                  >
                    {config.contactPhone}
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>
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

            <div className="pt-4">
              <p className="font-bold text-gray-900">{config.officerName}</p>
              <p className="text-gray-600">{config.officerRole}</p>
              <p className="text-gray-600">{config.officerDesignation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
