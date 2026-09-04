"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { API_URL } from "@/lib/constants";

interface AntiRaggingSquadRow {
  id: number;
  name: string;
  department: string;
  designation: string;
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

export default function AntiRaggingSquadPage() {
  const [members, setMembers] = useState<AntiRaggingSquadRow[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/public/committees?committee=anti-ragging-squard`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setMembers(
            data.map((m: CommitteeMemberApi, idx: number) => ({
              id: m.order || idx + 1,
              name: m.name,
              department: m.department || "CGEC",
              designation: m.position,
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
          CGEC constitutes an Anti-Ragging Squad nominated by the Head of the
          Institution for maintaining vigil, oversight, and patrolling functions
          to ensure zero tolerance for ragging.
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
                      {member.department}
                    </td>
                    <td className="py-3 px-4 text-gray-600 align-top">
                      {member.designation}
                    </td>
                    <td className="py-3 px-4 text-blue-600 align-top break-all">
                      {member.email && member.email !== "-" ? (
                        <a href={`mailto:${member.email}`}>{member.email}</a>
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
