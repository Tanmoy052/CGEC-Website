"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Phone, Mail } from "lucide-react";

export default function StudentCounsellorPage() {
  const members = [
    {
      id: 1,
      name: "Prof. Sunandita Bhowmik (as nominated by VC,(CBPBU))",
      designation: "Assistant Prof.",
      associatedWith: "Cooch Behar Panchanan Barma University (CBPBU)",
      contact: "9002735087",
      email: "sunanditabhowmik@cbpbu.ac.in",
    },
    {
      id: 2,
      name: "Dr. Prasenjit Dey",
      designation: "Assistant Prof.",
      associatedWith: "Cooch Behar Government Engineering College (CGEC)",
      contact: "9123363688",
      email: "prasenjitdey13@gmail.com",
    },
    {
      id: 3,
      name: "Prof. Biren Gurung",
      designation: "Assistant Prof.",
      associatedWith: "CGEC",
      contact: "9734474528",
      email: "biren.gurung@gmail.com",
    },
    {
      id: 4,
      name: "Dr. Gopal Ghosh",
      designation: "Assistant Prof.",
      associatedWith: "CGEC",
      contact: "8981708655",
      email: "ghoshgopal.pmath@gmail.com",
    },
    {
      id: 5,
      name: "Mr. Sujay Sarkar",
      designation: "Technical Asst.",
      associatedWith: "CGEC",
      contact: "9232147569",
      email: "sujaysarkar1997@gmail.com",
    },
    {
      id: 6,
      name: "Mr. Soumik Sarkar",
      designation: "Technical Asst.",
      associatedWith: "CGEC",
      contact: "7501408016",
      email: "soumik.sarkar100@gmail.com",
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
              Student Counsellor
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          Student Counsellor
        </h1>
        <p className="text-gray-700 mb-8 leading-relaxed">
          A student counsellor committee has been formed with the following
          members to start functioning from 23/03/2021 to provide support to
          students to deal anxiety and stress issues, to nurture their creative
          minds etc.
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
                <th className="py-3 px-4 font-semibold text-gray-700 w-64">
                  Associated with
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  Contact
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  E-mail
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
                    {member.designation}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
