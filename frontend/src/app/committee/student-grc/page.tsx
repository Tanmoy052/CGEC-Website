"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function SGRCPage() {
  const members = [
    "1. Dr. Prabal Deb, Principal- Chairman",
    "2. Dr. Samik Nag, Asst. Prof., BSH Dept.- Coordinator",
    "3. Prof. Madhuchandra Bhaduri, Asst. Prof., BSH Dept - Member",
    "4. Prof. G.T. Lepcha, Asst. Prof., ME Dept - Member",
    "5. Mr. Hrdayat Tulla, Student Member",
    "6. Prof. Mohammad Salim- Registrar( Officiating)- Member",
    "7. Prof. Soumik Roy, Asst. Prof., BSH Dept – Member",
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
            <span className="text-gray-900">Committee</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="font-semibold text-blue-600">
              Student Grievance Redressal Committee
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          Student Grievance Redressal Committee (SGRC)
        </h1>
        <p className="text-gray-700 mb-8 leading-relaxed">
          In order to provide opportunities for redressal of certain grievances
          of students, the following Student Grievance Redressal Committee
          (SGRC) is constituted.
        </p>

        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 font-bold text-gray-900 uppercase w-1/3 border-r border-gray-200">
                  COMMITTEE
                </th>
                <th className="py-3 px-4 font-bold text-gray-900 uppercase">
                  MEMBERS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-4 px-4 text-gray-800 font-semibold align-top border-r border-gray-200">
                  Student Grievance Redressal Committee (SGRC)
                </td>
                <td className="py-4 px-4 text-gray-700 align-top">
                  <ul className="space-y-2">
                    {members.map((member, index) => (
                      <li key={index}>{member}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
