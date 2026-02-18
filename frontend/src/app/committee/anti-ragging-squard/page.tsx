"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function AntiRaggingSquadPage() {
  const members = [
    {
      id: 1,
      name: "Prof. Sourav Chatterjee",
      department: "CSE",
      designation: "Assistant Professor & Convenor",
      email: "itssourav@gmail.com",
    },
    {
      id: 2,
      name: "Prof. Arnab Gain",
      department: "CSE",
      designation: "Assistant Professor",
      email: "arnabgaincgec@gmail.com",
    },
    {
      id: 3,
      name: "Dr. Sourav Chakraborty",
      department: "ECE",
      designation: "Assistant Professor",
      email: "sourav.chakraborty@cgec.org.in",
    },
    {
      id: 4,
      name: "Prof. Sudipta Roy",
      department: "ME",
      designation: "Assistant Professor",
      email: "sudipta.roy@cgec.org.in",
    },
    {
      id: 5,
      name: "Prof. Arghya Chakraborty",
      department: "BSH",
      designation: "Assistant Professor",
      email: "pikaiarghya@gmail.com",
    },
    {
      id: 6,
      name: "Dr. Manoj Das",
      department: "Library",
      designation: "Librarian",
      email: "manoj.das.library@cgec.org.in",
    },
    {
      id: 7,
      name: "Prof. Mohammad Salim",
      department: "BSH",
      designation: "Assistant Professor",
      email: "wbcscap@gmail.com",
    },
    {
      id: 8,
      name: "Mr. Umakanta Bera",
      department: "CSE",
      designation: "Technical Assistant",
      email: "umakantabera@gmail.com",
    },
    {
      id: 9,
      name: "Mr. Abhijit Sarma",
      department: "ECE",
      designation: "Technical Assistant",
      email: "abhijitsarma500@gmail.com",
    },
    {
      id: 10,
      name: "Mr. Ziaul Rahaman",
      department: "ME",
      designation: "Technical Assistant",
      email: "ziaulrahaman126@gmail.com",
    },
    {
      id: 11,
      name: "Mr. Ansarul Seikh",
      department: "CE",
      designation: "Technical Assistant",
      email: "ansarulseikh@gmail.com",
    },
    {
      id: 12,
      name: "Girl Student prefinal year(2)",
      department: "All Department",
      designation: "Student",
      email: "",
    },
    {
      id: 13,
      name: "Girl Student Second year",
      department: "All Department",
      designation: "Student",
      email: "",
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
              Anti-ragging Squad
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          Anti-ragging Squad
        </h1>
        <p className="text-gray-700 mb-8 leading-relaxed">
          CGEC constitute a Anti-Ragging Squad nominated by the Head of the
          Institution(Principal/OIC) and such representation may be considered
          necessary for maintaining vigil, oversight and patrolling functions
          and shall remain mobile, alert and active at all times
        </p>

        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 font-semibold text-gray-700 w-16 text-center">
                  SL. No.
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">Name</th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  Department
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  Designation
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-center text-gray-600 align-top">
                    {member.id}
                  </td>
                  <td className="py-3 px-4 text-gray-800 font-medium align-top">
                    {member.name}
                  </td>
                  <td className="py-3 px-4 text-gray-600 align-top">
                    {member.department}
                  </td>
                  <td className="py-3 px-4 text-gray-600 align-top">
                    {member.designation}
                  </td>
                  <td className="py-3 px-4 text-blue-600 align-top break-all">
                    {member.email && (
                      <a href={`mailto:${member.email}`}>{member.email}</a>
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
