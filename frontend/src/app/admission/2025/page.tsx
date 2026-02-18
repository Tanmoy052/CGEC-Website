"use client";

import React from "react";
import Link from "next/link";
import {
  Download,
  ChevronRight,
  MessageCircle,
  Phone,
  Mail,
  User,
} from "lucide-react";

export default function Admission2025Page() {
  const notices = [
    {
      id: "01",
      subject: "Reporting Notice for 1st year student 2025",
      link: "/admission/2025/NOTIFICATION_FOR_ADDMISSION_PROCESS_2025-26.pdf",
    },
    {
      id: "02",
      subject:
        "NOTICE FOR ADMISSION THROUGH DECENTRALIZED COUNSELLING IN THE 1ST YEAR OF B. TECH COURSES AGAINST VACANCY 2025",
      link: "/admission/2025/Notice_Decentralized_2025-26.pdf",
    },
    {
      id: "03",
      subject:
        "UPDATED NOTICE FOR ADMISSION THROUGH DECENTRALIZED COUNSELLING IN THE 1ST YEAR OF B. TECH COURSES AGAINST VACANCY 2025",
      link: "/admission/2025/2025-26_10.pdf",
    },
    {
      id: "04",
      subject:
        "Status of applications for decentralized counselling of B.Tech 1st Semester candidates",
      link: "/admission/2025/NOTIFICATION_FOR_ADDMISSION_PROCESS_2025-26.pdf",
    },
    {
      id: "05",
      subject:
        "Provisional Merit List as per online application provided by candidate WBJEE2025 for decentralized counselling of B.Tech 1st Semester candidates CGEC",
      link: "/admission/2025/NOTIFICATION_FOR_ADDMISSION_PROCESS_2025-26.pdf",
    },
  ];

  const documents = [
    {
      id: "01",
      subject: "College at a Glance",
      link: "/admission/2025/CGEC_at_a_glance.pdf",
    },
    {
      id: "02",
      subject: "Fees structure",
      link: "/admission/2025/FEES_STRUCTURE_CGEC.pdf",
    },
    {
      id: "03",
      subject: "Medical Form",
      link: "/admission/2025/Medical_Form.pdf",
    },
    {
      id: "04",
      subject: "Refund Form",
      link: "/admission/2025/Refund_Form.pdf",
    },
  ];

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
            <span className="font-semibold text-blue-600">Admission 2025</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2 hover:underline cursor-pointer">
            Admission 2025
          </h1>
          <a
            href=""
            className="inline-flex items-center text-gray-800 text-sm font-medium hover:text-blue-600 hover:underline"
          >
            For 1st year admission related queries please join the whatsapp
            group
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column: Notices */}
          <div>
            <h2 className="text-xl font-normal text-blue-600 mb-4">
              Admission Related Notice 2025
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
                  {notices.map((notice) => (
                    <tr key={notice.id} className="hover:bg-gray-50">
                      <td className="py-2 px-3 text-gray-600 align-top">
                        {notice.id}
                      </td>
                      <td className="py-2 px-3 text-gray-800 font-medium">
                        {notice.subject}
                      </td>
                      <td className="py-2 px-3 align-top">
                        <Link
                          href={notice.link}
                          className="font-bold text-gray-800 hover:text-blue-600"
                        >
                          Download
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Documents */}
          <div>
            <h2 className="text-xl font-normal text-blue-600 mb-4">
              Admission Related Document
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
                  {documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="py-2 px-3 text-gray-600 align-top">
                        {doc.id}
                      </td>
                      <td className="py-2 px-3 text-gray-800 font-medium">
                        {doc.subject}
                      </td>
                      <td className="py-2 px-3 align-top">
                        <Link
                          href={doc.link}
                          className="font-bold text-gray-800 hover:text-blue-600"
                        >
                          Download
                        </Link>
                      </td>
                    </tr>
                  ))}
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
              following group
            </p>

            <p>
              <span className="font-semibold">
                For 1st year admission related queries please join the{" "}
              </span>
              <a href="#" className="text-blue-600 underline font-medium">
                whatsapp group
              </a>
            </p>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 pt-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <span className="font-bold">Contact No.: 9475445190</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>
                  Email id for assistance:{" "}
                  <a
                    href="mailto:admission@cgec.org.in"
                    className="text-blue-600 hover:underline"
                  >
                    admission@cgec.org.in
                  </a>
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-start gap-2">
              <User className="w-4 h-4 text-blue-600 mt-1" />
              <div>
                <p className="font-bold">Dr. Sushovan Chatterjee</p>
                <p className="text-gray-600">PI Admin, Admission (2025)</p>
                <p className="font-bold text-gray-800">
                  Cooch Behar Government Engineering College
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
