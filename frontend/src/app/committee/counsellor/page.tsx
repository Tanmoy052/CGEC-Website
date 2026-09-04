"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Phone, Mail } from "lucide-react";
import { API_URL } from "@/lib/constants";

interface CounsellorMemberRow {
  id: number;
  name: string;
  designation: string;
  associatedWith: string;
  contact: string;
  email: string;
}

interface CommitteeMemberApi {
  id?: string;
  name: string;
  position: string;
  department?: string | null;
  phone?: string | null;
  email?: string | null;
  order?: number;
}

export default function StudentCounsellorPage() {
  const [members, setMembers] = useState<CounsellorMemberRow[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/public/committees?committee=counsellor`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setMembers(
            data.map((m: CommitteeMemberApi, idx: number) => ({
              id: m.order || idx + 1,
              name: m.name,
              designation: m.position,
              associatedWith: "CGEC",
              contact: m.phone || "-",
              email: m.email || "-",
            }))
          );
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
          The student counsellor committee provides support to students dealing
          with academic anxiety and stress, while nurturing creative and personal growth.
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
              {members.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500 font-medium">
                    No committee members listed currently.
                  </td>
                </tr>
              ) : (
                members.map((member) => (
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
                      {member.email && member.email !== "-" ? (
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center gap-1 text-blue-600 hover:underline break-all"
                        >
                          <Mail className="w-3 h-3 flex-shrink-0" />
                          {member.email}
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
