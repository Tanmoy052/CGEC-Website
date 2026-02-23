"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { departments } from "@/data/departments";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const tabs = [
  { id: "home", label: "HOME" },
  { id: "hod", label: "HOD MESSAGE" },
  { id: "faculty", label: "FACULTY & STAFF" },
  { id: "lab", label: "LAB DETAILS" },
  { id: "syllabus", label: "SYLLABUS" },
  { id: "research", label: "RESEARCH & PUBLICATION" },
  { id: "wall", label: "WALL MAGAZINE" },
];

export default function DepartmentPage() {
  const params = useParams();
  const deptSlug = params.dept as string;
  const dept = departments[deptSlug];

  const [activeTab, setActiveTab] = useState("home");

  // If department not found, show 404
  if (!dept) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Department not found
        </h1>
      </div>
    );
  }

  // Generate dynamic tab labels
  const dynamicTabs = tabs.map((tab) => ({
    ...tab,
    label: tab.id === "home" ? `${dept.shortName} HOME` : tab.label,
  }));

  return (
    <div className="min-h-screen bg-white">
      {/* Header / Breadcrumb */}
      <div className="bg-gray-100 py-4 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/academics" className="hover:text-blue-600">
              Academics
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="font-semibold text-gray-900">{dept.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Department Title */}
        <div className="mb-12 text-center">
          <h1 className="text-base md:text-lg lg:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 mb-4 tracking-tight">
            Welcome to {dept.name} Department
          </h1>
          <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full shadow-sm"></div>
        </div>

        {/* Department Navigation Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex border-b-2 border-blue-900 min-w-max">
            {dynamicTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white border-t-2 border-l-2 border-r-2 border-blue-600 rounded-t-lg relative -mb-[2px]"
                    : "text-gray-600 hover:text-blue-800 hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="min-h-[400px]"
          >
            {activeTab === "home" && (
              <div className="space-y-8">
                {/* Intro Paragraph */}
                <div className="prose prose-lg max-w-none text-gray-800 font-medium">
                  <p>{dept.home.paragraphs[0]}</p>
                </div>

                {/* Main Content with Image */}
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  <div className="w-full lg:w-1/4 relative h-[180px] lg:h-[220px] rounded-xl overflow-hidden shadow-lg border border-gray-200 shrink-0">
                    <Image
                      src={dept.home.image}
                      alt={`${dept.name} Lab`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="w-full lg:w-3/4 prose prose-lg text-gray-700 font-medium">
                    {dept.home.paragraphs.slice(1, 3).map((p, i) => (
                      <p key={i} className="mb-4 font-medium">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Additional Content */}
                <div className="prose prose-lg max-w-none text-gray-700 font-medium">
                  {dept.home.paragraphs.slice(3).map((p, i) => (
                    <p key={i} className="mb-4 font-medium">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "hod" && (
              <div className="flex flex-col md:flex-row gap-8 items-start bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                <div className="shrink-0 relative w-full md:w-auto h-[250px] md:h-[220px] aspect-[4/5] rounded-xl overflow-hidden shadow-lg border border-gray-100 mx-auto md:mx-0">
                  <Image
                    src={dept.hodMessage.image}
                    alt={dept.hodMessage.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {dept.hodMessage.name}
                  </h2>
                  <h3 className="text-blue-600 font-medium mb-6 uppercase tracking-wide">
                    Head of Department
                  </h3>
                  <div className="prose prose-lg text-gray-700 relative pl-8 border-l-4 border-blue-600 font-medium">
                    <span className="absolute -top-6 -left-6 text-6xl text-blue-200 font-serif">
                      "
                    </span>
                    {Array.isArray(dept.hodMessage.message) ? (
                      dept.hodMessage.message.map((msg, i) => (
                        <p
                          key={i}
                          className="relative z-10 italic leading-relaxed mb-4 last:mb-0 font-medium"
                        >
                          {msg}
                        </p>
                      ))
                    ) : (
                      <p className="relative z-10 italic leading-relaxed font-medium">
                        {dept.hodMessage.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "faculty" && (
              <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-700 font-bold uppercase tracking-wider text-xs border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 w-32 text-center">Photo</th>
                      <th className="px-6 py-4">Faculty Name</th>
                      <th className="px-6 py-4">Experience (in Years)</th>
                      <th className="px-6 py-4">Designation</th>
                      <th className="px-6 py-4">Qualification</th>
                      <th className="px-6 py-4">Specialization</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {dept.faculty.map((member, i) => (
                      <tr
                        key={i}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="relative w-24 h-32 rounded-lg overflow-hidden border border-gray-200 shadow-sm mx-auto">
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover object-top"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900">
                          {member.cvLink ? (
                            <a
                              href={member.cvLink}
                              className="text-blue-600 hover:underline"
                            >
                              {member.name}
                            </a>
                          ) : (
                            member.name
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {member.experience || "-"}
                        </td>
                        <td className="px-6 py-4 text-blue-600 font-medium">
                          {member.role}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {member.qualification || "-"}
                        </td>
                        <td className="px-6 py-4 text-gray-700 leading-relaxed max-w-xs">
                          {member.specialization || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "lab" && (
              <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-700 font-bold uppercase tracking-wider text-xs border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 w-16 text-center">Sl. No.</th>
                      <th className="px-6 py-4 w-1/4">Laboratory Name</th>
                      <th className="px-6 py-4">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {dept.labs.map((lab, i) => (
                      <tr
                        key={i}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-center font-medium text-gray-500">
                          {i + 1}
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900">
                          {lab.name}
                        </td>
                        <td className="px-6 py-4 text-gray-700 leading-relaxed">
                          {lab.description || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "syllabus" && (
              <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-700 font-bold uppercase tracking-wider text-xs border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 w-16 text-center">Sl. No.</th>
                      <th className="px-6 py-4">Semester</th>
                      <th className="px-6 py-4 w-32 text-center">Download</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {dept.syllabus.map((item, i) => (
                      <tr
                        key={i}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-center font-medium text-gray-500">
                          {i + 1}
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900">
                          {item.semester}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <a
                            href={item.pdfLink}
                            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition-colors"
                          >
                            PDF
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "research" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700 font-bold uppercase tracking-wider text-xs border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 w-16 text-center">Sl. No.</th>
                        <th className="px-6 py-4">Details</th>
                        <th className="px-6 py-4 w-48 text-center">
                          Year of Publication
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {dept.research.map((facultySection, sectionIndex) => (
                        <React.Fragment key={sectionIndex}>
                          <tr className="bg-blue-50/50">
                            <td
                              colSpan={3}
                              className="px-6 py-3 text-center font-bold text-blue-800 border-y border-blue-100"
                            >
                              Publication of {facultySection.facultyName}
                            </td>
                          </tr>
                          {facultySection.publications.map((pub, pubIndex) => (
                            <tr
                              key={pubIndex}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-6 py-4 text-center font-medium text-gray-500 align-top pt-5">
                                {pubIndex + 1}
                              </td>
                              <td className="px-6 py-4">
                                <p className="font-bold text-gray-900 mb-2 text-base">
                                  {pub.title}
                                </p>
                                <p className="text-gray-700 mb-1 font-medium">
                                  {pub.authors}
                                </p>
                                <p className="text-gray-500 text-sm italic">
                                  {pub.journal}
                                </p>
                              </td>
                              <td className="px-6 py-4 text-center font-medium text-gray-700 align-top pt-5">
                                {pub.year}
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "wall" && (
              <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm space-y-8">
                <div className="bg-blue-50/50 p-6 rounded-lg border border-blue-100">
                  <p className="text-gray-800 leading-relaxed text-lg font-medium text-justify">
                    {dept.wallMagazine.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                  {dept.wallMagazine.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-full rounded-xl overflow-hidden shadow-lg border-4 border-amber-100"
                    >
                      <Image
                        src={img}
                        alt={`${dept.wallMagazine.name} - ${idx + 1}`}
                        width={1200}
                        height={800}
                        className="w-full h-auto object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
