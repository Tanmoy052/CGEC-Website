"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ICCPage() {
  const members = [
    {
      id: 1,
      name: "Prof. Madhuchandra Bhaduri",
      profession: "Chair Person",
      associatedWith: "Cooch Behar Government Engineering College (CGEC)",
      email: "madhuchandrabhaduri@gmail.com",
      designation: "Asst. Prof., BSH Dept.",
      gender: "Female",
    },
    {
      id: 2,
      name: "Dr. Madhumita Dhar",
      profession: "Member",
      associatedWith: "CGEC",
      email: "madhumita.dhar007@gmail.com",
      designation: "Asst. Prof., BSH Dept.",
      gender: "Female",
    },
    {
      id: 3,
      name: "Prof. Arnab Gain",
      profession: "Member",
      associatedWith: "CGEC",
      email: "arnabgaincgec@gmail.com",
      designation: "Asst. Prof., CSE Dept.",
      gender: "Male",
    },
    {
      id: 4,
      name: "Mr. Samir Paul",
      profession: "Member",
      associatedWith: "CGEC",
      email: "aocgec23@gmail.com",
      designation: "Account Officer",
      gender: "Male",
    },
    {
      id: 5,
      name: "Ms. Indrani Dey",
      profession: "Member",
      associatedWith: "CGEC",
      email: "indranideycob6@gmail.com",
      designation: "Non-Technical Employee",
      gender: "Female",
    },
    {
      id: 6,
      name: "Ms. Sanchita Das",
      profession: "Student",
      associatedWith: "CGEC",
      email: "sanchita9das@gmail.com",
      designation: "Student (CE-3rd year)",
      gender: "Female",
    },
    {
      id: 7,
      name: "Ms. Mouli Howlader",
      profession: "Student",
      associatedWith: "CGEC",
      email: "moulihowladar@gmail.com",
      designation: "Student (ECE-3rd year)",
      gender: "Female",
    },
    {
      id: 8,
      name: "Mr. Abhirup Deb",
      profession: "Student",
      associatedWith: "CGEC",
      email: "abhirupd2@gmail.com",
      designation: "Student (CSE-3rd year)",
      gender: "Male",
    },
    {
      id: 9,
      name: "Mr. Sharadindu Roy",
      profession: "Member",
      associatedWith: "Radical Socitety (NGO Representative)",
      email: "shara85@outlook.com",
      designation: "Non-Government Organization",
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
              Internal Complaint Committee
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          Internal Complaint Committee
        </h1>
        <p className="text-gray-700 mb-8">
          The Internal Complaint Committee (ICC) has been formed with the
          following members:
        </p>

        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200 mb-12">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 font-semibold text-gray-700 w-16 text-center">
                  Sl. No.
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  Name of the Committee member
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  Profession
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  Associated with
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
                    {member.id}
                  </td>
                  <td className="py-3 px-4 text-gray-800 font-medium align-top">
                    {member.name}
                  </td>
                  <td className="py-3 px-4 text-gray-600 align-top">
                    {member.profession}
                  </td>
                  <td className="py-3 px-4 text-gray-600 align-top">
                    {member.associatedWith}
                  </td>
                  <td className="py-3 px-4 text-blue-600 align-top break-all">
                    <a href={`mailto:${member.email}`}>{member.email}</a>
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

        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h2 className="text-xl font-bold text-blue-900 mb-4 underline">
            ACTIVITIES/ RESPONSIBILITIES:
          </h2>
          <p className="text-gray-800 font-medium mb-3">
            The committee will submit Annual Report containing the following
            details by 30th June of the Calendar Year:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              Number of complaints of sexual harassment received in the year
            </li>
            <li>
              Number of orientation or training Programmes carried out for the
              members of the ICC to deal with complaints
            </li>
            <li>Number of complaints disposed of during the year</li>
            <li>Number of cases pending for more than 90 days</li>
            <li>
              Number of Workshops or awareness Programme carried out for the
              officers, functionaries, faculty and students to sensitize them
              against sexual harassment
            </li>
            <li>
              Nature of action taken by the Technical Institution against the
              perpetrator
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
