"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Phone, Mail } from "lucide-react";

export default function IICPage() {
  const members = [
    {
      id: 1,
      name: "Dr. Aritra Acharyya",
      designation: "Assistant Professor (Coordinator)",
      associatedWith: "Cooch Behar Government Engineering College (CGEC)",
      mobile: "9836357184",
      email: "ari_besu@yahoo.co.in",
    },
    {
      id: 2,
      name: "Dr. Prasenjit Dey",
      designation: "Assistant Professor",
      associatedWith: "CGEC",
      mobile: "9123363688",
      email: "prasenjitdey13@gmail.com",
    },
    {
      id: 3,
      name: "Prof. Atanu Maji",
      designation: "Assistant Professor",
      associatedWith: "CGEC",
      mobile: "9734762149",
      email: "atanudgp@outlook.com",
    },
    {
      id: 4,
      name: "Prof. Prasenjit Das",
      designation: "Assistant Professor",
      associatedWith: "CGEC",
      mobile: "7044057958",
      email: "pd.jgec006@gmail.com",
    },
    {
      id: 5,
      name: "Prof. Biren Gurung",
      designation: "Assistant Professor",
      associatedWith: "CGEC",
      mobile: "9734474528",
      email: "biren.gurung@gmail.com",
    },
    {
      id: 6,
      name: "Prof. Amit Singha Roy",
      designation: "Assistant Professor",
      associatedWith: "CGEC",
      mobile: "8172051534",
      email: "singharoyamit@gmail.com",
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
            <span className="text-gray-900">Committee</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="font-semibold text-blue-600">
              Institute Industry Cell
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          Institute Industry Cell
        </h1>
        <p className="text-gray-700 mb-8 leading-relaxed">
          A committee named &apos;Institute Industry Cell&apos; has been formed
          with the following members to provide institutional support to all
          departments for industry initiatives and to maintain a bridge between
          the need of the industry and the academic offerings. The committee
          will start functioning from 23/03/2021.
        </p>

        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 font-semibold text-gray-700 w-16 text-center">
                  Sl. No.
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">Name</th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  Designation
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700 w-32">
                  Associated With
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  Mobile
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-center text-gray-600 align-top">
                    {member.id}.
                  </td>
                  <td className="py-3 px-4 text-gray-800 font-medium align-top">
                    {member.name}
                  </td>
                  <td className="py-3 px-4 text-gray-600 align-top">
                    {member.designation}
                  </td>
                  <td className="py-3 px-4 text-gray-600 align-top">
                    {member.associatedWith}
                  </td>
                  <td className="py-3 px-4 text-gray-600 align-top whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-blue-600" />
                      {member.mobile}
                    </div>
                  </td>
                  <td className="py-3 px-4 align-top">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-1 text-blue-600 hover:underline break-all"
                      >
                        <Mail className="w-3 h-3 flex-shrink-0" />
                        {member.email}
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
