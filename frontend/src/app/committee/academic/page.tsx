"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function AcademicCommitteePage() {
  const members = [
    {
      id: 1,
      name: "Dr. Gautam Das",
      designation: "Professor",
      role: "Convenor",
      department: "Electronics and Communication Engineering",
    },
    {
      id: 2,
      name: "Prof. Somen Mondal",
      designation: "Assistant Professor",
      role: "Member",
      department: "Computer Science and Engineering",
    },
    {
      id: 3,
      name: "Dr. Prasenjit Das",
      designation: "Assistant Professor",
      role: "Member",
      department: "Mechanical Engineering",
    },
    {
      id: 4,
      name: "Dr. Palash Das",
      designation: "Assistant Professor",
      role: "Member",
      department: "Electronics and Communication Engineering",
    },
    {
      id: 5,
      name: "Prof. Atanu Maji",
      designation: "Assistant Professor",
      role: "Member",
      department: "Electrical Engineering",
    },
    {
      id: 6,
      name: "Prof. Biren Gurung",
      designation: "Assistant Professor",
      role: "Member",
      department: "Civil Engineering",
    },
    {
      id: 7,
      name: "Prof. Mohammad Salim",
      designation: "Assistant Professor",
      role: "Member",
      department: "Basic Science and Humanities",
    },
    {
      id: 8,
      name: "Dr. Kingshuk Dan",
      designation: "Assistant Professor, Registrar In Charge",
      role: "Member",
      department: "Civil Engineering",
    },
    {
      id: 9,
      name: "Dr. Manoj Das",
      designation: "Librarian",
      role: "Member",
      department: "Central Library",
    },
    {
      id: 10,
      name: "Dr. Shymal Ghosh",
      designation: "Assistant Professor",
      role: "Member",
      department: "Civil Engineering",
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
              Academic Committee
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">
          Academic Committee
        </h1>

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
                <th className="py-3 px-4 font-semibold text-gray-700">
                  Role in Committee
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  Department
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-center text-gray-600">
                    {member.id}
                  </td>
                  <td className="py-3 px-4 text-gray-800 font-medium">
                    {member.name}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {member.designation}
                  </td>
                  <td className="py-3 px-4 text-gray-800 font-medium">
                    {member.role}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {member.department}
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
