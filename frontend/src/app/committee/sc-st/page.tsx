"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Phone, Mail } from "lucide-react";

export default function SCSTCommitteePage() {
  const members = [
    {
      id: 1,
      name: "Prof. Gyan Tshering Lepcha",
      associatedWith: "Cooch Behar Government Engineering College (CGEC)",
      contact: "8637591910",
      email: "gyanchhamta@gmail.com",
      designation: "Asst. Prof, ME dept.",
      gender: "Male",
    },
    {
      id: 2,
      name: "Prof. Arnab Gain",
      associatedWith: "CGEC",
      contact: "7059528767",
      email: "arnabgaincgec@gmail.com",
      designation: "Asst. Prof, CSE dept.",
      gender: "Male",
    },
    {
      id: 3,
      name: "Prof. Madhuchandra Bhaduri",
      associatedWith: "CGEC",
      contact: "7586805533",
      email: "madhuchandrabhaduri@gmail.com",
      designation: "Asst. Prof, BSH dept.",
      gender: "Female",
    },
    {
      id: 4,
      name: "Prof. Atanu Majhi",
      associatedWith: "CGEC",
      contact: "9734762149",
      email: "atanudgp@outlook.com",
      designation: "Asst. Prof, EE dept.",
      gender: "Male",
    },
    {
      id: 5,
      name: "Mr. Pranab Mallik",
      associatedWith: "CGEC",
      contact: "8972251120",
      email: "pkmcse@gmail.com",
      designation: "Technical Assistant",
      gender: "Male",
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
              Committee for SC & ST
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          SC & ST Committee
        </h1>
        <p className="text-gray-700 mb-8 leading-relaxed">
          To address the grievances of the Scheduled Castes and the Scheduled
          Tribes members of the institute the SC/ST committee is constituted
          with the following members.
        </p>

        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 font-semibold text-gray-700 w-16 text-center">
                  Sl. No.
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  Name of the Committee member
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700 w-32">
                  Associated with
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  Contact
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  E-mail
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  Designation
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  Gender
                </th>
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
                    {member.associatedWith}
                  </td>
                  <td className="py-3 px-4 text-gray-600 align-top whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-blue-600" />
                      {member.contact}
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
                  <td className="py-3 px-4 text-gray-600 align-top">
                    {member.designation}
                  </td>
                  <td className="py-3 px-4 text-gray-600 align-top">
                    {member.gender}
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
