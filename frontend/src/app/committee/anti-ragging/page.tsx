"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Phone, Mail } from "lucide-react";

export default function AntiRaggingCommitteePage() {
  const members = [
    {
      id: 1,
      name: "Dr. Sushovan Chatterjee",
      position: "Associate Professor, Principal (Office-in-Charge), Chairman",
      phone: "9707545561",
      email: "principal@cgec.org.in",
    },
    {
      id: 2,
      name: "Dr. Kingshuk Dan",
      position: "Assistant Professor, Registrar (Office-in-Charge), Convenor",
      phone: "9474848817",
      email: "dankingshuk@gmail.com",
    },
    {
      id: 3,
      name: "Dr. Gautam Das",
      position: "Professor, ECE Department, Member",
      phone: "9434171610",
      email: "gdas321@yahoo.co.in",
    },
    {
      id: 4,
      name: "Prof. Somen Mondal",
      position: "Assistant Professor, CSE Department, Member",
      phone: "9331892632",
      email: "somen@cgec.org.in",
    },
    {
      id: 5,
      name: "Prof. Soumik Roy",
      position: "Assistant Professor, Hostel Superintendent Boys' Host",
      phone: "9681034366",
      email: "Whbes.sr@gmail.com",
    },
    {
      id: 6,
      name: "Prof. Madhumita Dhar",
      position:
        "Assistant Professor, Hostel Superintendent Ladies Hostel, Member",
      phone: "7063666567",
      email: "adhumita.dhar007@gmail.com",
    },
    {
      id: 7,
      name: "Prof. Chhandamay Ray",
      position: "Assistant Professor, CE Department, Member",
      phone: "9903194589",
      email: "chhandamayray@yahoo.com",
    },
    {
      id: 8,
      name: "Prof. Amit Singha Roy",
      position: "Assistant Professor, BSH Department, Member",
      phone: "8172051534",
      email: "singharoyamit@gmail.com",
    },
    {
      id: 9,
      name: "Mr. Sharadindu Roy",
      position: "NGO Representative Rdical Socitety, Member",
      phone: "8172051534",
      email: "singharoyamit@gmail.com",
    },
    {
      id: 10,
      name: "Mr. Tapan Paul",
      position:
        "Office In-charge, Kotwali Police Station | P.S. Cooch Behar, Member",
      phone: "9147889249",
      email: "cbrkotwalies@gmail.com",
    },
    {
      id: 11,
      name: "Prof. Avinash Kumar Tiwari",
      position:
        "Assistant Professor, LAW Department, Cooch Behar Panchanan Barma University, Member",
      phone: "83033 61615",
      email: "tiwariavinash002@gmail.com",
    },
    {
      id: 12,
      name: "Mr. Main Uddin Chisti",
      position: "Reporter, Telegraph, Member",
      phone: "9434742618",
      email: "khanmoin46@gmail.com",
    },
    {
      id: 13,
      name: "Md. Kamarul Islam",
      position: "Upper Division Assistant, Member",
      phone: "8926829926",
      email: "kamarul55566@gmail.com",
    },
    {
      id: 14,
      name: "Khadija Khatun",
      position: "Parent, Member (ME, 2nd year)",
      phone: "9434688688",
      email: "khadijakhatun.cb@gmail.com",
    },
    {
      id: 15,
      name: "Latifa Hossain",
      position: "Parent, Member (ME, 2nd year)",
      phone: "7063007615",
      email: "",
    },
    {
      id: 16,
      name: "Driti Ghosh",
      position: "2nd year Student, EE",
      phone: "9641008674",
      email: "dritighosh20@gmail.com",
    },
    {
      id: 17,
      name: "Siddhartha Bag",
      position: "3rd year Student, CSE",
      phone: "9123613119",
      email: "amibagsiddhartha21@gmail.com",
    },
    {
      id: 18,
      name: "Subhajit Sadhu",
      position: "4th year Student, CE",
      phone: "9733234154",
      email: "subhajit09ce@gmail.com",
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
              {members.map((member) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
