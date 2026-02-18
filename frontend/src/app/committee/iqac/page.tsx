"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function IQACPage() {
  const members = [
    "1. Dr. Prabal Deb (Chairman)",
    "2. Dr. Gautam Das (Co- Ordinator)",
    "3. Dr. Prabir Kr. Halder, Professor, Physics, Cooch Behar Panchanan Barma University",
    "4. Prof. Subrata Bhattacharya, Associate Professor, Mechanical Engineering, Jalpaiguri Government Engineering College",
    "5. HOD of CSE",
    "6. HOD of ECE",
    "7. HOD of ME",
    "8. HOD of CE",
    "9. HOD of EE",
    "10. HOD of BSH",
    "11. Accounts Officer & D.D.O, Cooch Behar Government Engineering College",
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
              Internal Quality Assurance Cell(IQAC)
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          Internal Quality Assurance Cell(IQAC)
        </h1>
        <p className="text-gray-700 mb-8 leading-relaxed">
          An under-mentioned committee comprising of the following members has
          been formed to start functioning from 01.04.2021 in the interest of
          the institute as well as to comply with the AICTE requirement.
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
                  Internal Quality Assurance Cell(IQAC)
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
