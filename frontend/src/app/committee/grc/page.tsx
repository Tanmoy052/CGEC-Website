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

export default function GRCPage() {
  const [members, setMembers] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/public/committees?committee=grc`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setMembers(
            data.map((m: CommitteeMemberApi, idx: number) => 
              `${idx + 1}. ${m.name}, ${m.position}${m.department ? ` (${m.department})` : ""}`
            )
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
              Grievance Redressal Committee (GRC)
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          Grievance Redressal Committee (GRC) for faculty/staff members
        </h1>
        <p className="text-gray-700 mb-8 leading-relaxed">
          To address the grievances of faculty/staff members including service
          matters at the Institution level, the Grievance Redressal
          Committee (GRC) looks into grievances submitted by staff.
        </p>

        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 font-bold text-gray-900 uppercase w-1/3 border-r border-gray-200">
                  COMMITTEE
                </th>
                <th className="py-3 px-4 font-bold text-gray-900 uppercase">
                  MEMBERS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-4 px-4 text-gray-800 font-semibold align-top border-r border-gray-200">
                  Grievance Redressal Committee (GRC) for Faculty / Staff:
                </td>
                <td className="py-4 px-4 text-gray-700 align-top">
                  {members.length === 0 ? (
                    <p className="text-gray-500 italic">No committee members listed currently.</p>
                  ) : (
                    <ul className="space-y-2">
                      {members.map((member, index) => (
                        <li key={index}>{member}</li>
                      ))}
                    </ul>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
