"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Phone, Mail } from "lucide-react";
import { API_URL } from "@/lib/constants";

interface AntiRaggingMemberApi {
  id?: string;
  name: string;
  position: string;
  phone?: string | null;
  email?: string | null;
  order?: number;
}

interface AntiRaggingRow {
  id: number;
  name: string;
  position: string;
  phone: string;
  email: string;
}

const DEFAULT_MEMBERS: AntiRaggingRow[] = [];

export default function AntiRaggingCommitteePage() {
  const [members, setMembers] = useState(DEFAULT_MEMBERS);

  useEffect(() => {
    fetch(`${API_URL}/public/committees?committee=anti-ragging`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setMembers(
            data.map((m: AntiRaggingMemberApi, idx: number) => ({
              id: m.order || idx + 1,
              name: m.name,
              position: m.position,
              phone: m.phone || "",
              email: m.email || "",
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
              Anti-ragging Committee
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          Anti-ragging Committee
        </h1>
        <p className="text-gray-700 mb-8 leading-relaxed">
          In order to ensure the implementation of the policy of &apos;Zero
          Tolerance&apos; for ragging of any kind, the following Anti-Ragging
          Committe has been constituted:
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
                  Position
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700 w-32">
                  Phone no
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  Email-id
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {members.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500 font-medium">
                    No committee members listed currently.
                  </td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-center text-gray-600 align-top">
                      {member.id}
                    </td>
                    <td className="py-3 px-4 text-gray-800 font-medium align-top">
                      {member.name}
                    </td>
                    <td className="py-3 px-4 text-gray-600 align-top">
                      {member.position}
                    </td>
                    <td className="py-3 px-4 text-gray-600 align-top whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-blue-600" />
                        {member.phone}
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
