"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Phone, Mail } from "lucide-react";
import { API_URL } from "@/lib/constants";

interface SCSTMemberRow {
  id: number;
  name: string;
  associatedWith: string;
  contact: string;
  email: string;
  designation: string;
  gender: string;
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

export default function SCSTCommitteePage() {
  const [members, setMembers] = useState<SCSTMemberRow[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/public/committees?committee=sc-st`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setMembers(
            data.map((m: CommitteeMemberApi, idx: number) => ({
              id: m.order || idx + 1,
              name: m.name,
              associatedWith: "CGEC",
              contact: m.phone || "-",
              email: m.email || "-",
              designation: m.position,
              gender: "-",
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
            <span className="font-semibold text-blue-600">SC/ST Committee</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">SC/ST Committee</h1>

        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 font-semibold text-gray-700 w-16 text-center">
                  Sl. No.
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">Name</th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  Associated with
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700 w-32">
                  Contact no.
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
              {members.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500 font-medium">
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
                    <td className="py-3 px-4 text-gray-600 align-top">
                      {member.designation}
                    </td>
                    <td className="py-3 px-4 text-gray-600 align-top">
                      {member.gender}
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
