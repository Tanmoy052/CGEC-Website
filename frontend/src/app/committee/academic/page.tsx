"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { API_URL } from "@/lib/constants";

interface CommitteeMemberApi {
  id?: string;
  name: string;
  position: string;
  department?: string | null;
  order?: number;
}

interface AcademicCommitteeRow {
  id: number;
  name: string;
  designation: string;
  role: string;
  department: string;
}

const DEFAULT_MEMBERS: AcademicCommitteeRow[] = [];

export default function AcademicCommitteePage() {
  const [members, setMembers] = useState(DEFAULT_MEMBERS);

  useEffect(() => {
    fetch(`${API_URL}/public/committees?committee=academic`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setMembers(
            data.map((m: CommitteeMemberApi, idx: number) => {
              const parts = (m.position || "").split(",");
              return {
                id: m.order || idx + 1,
                name: m.name,
                designation: parts[0]?.trim() || m.position,
                role: parts.slice(1).join(", ").trim() || "Member",
                department: m.department || "-",
              };
            })
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
              {members.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500 font-medium">
                    No committee members listed currently.
                  </td>
                </tr>
              ) : (
                members.map((member) => (
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
