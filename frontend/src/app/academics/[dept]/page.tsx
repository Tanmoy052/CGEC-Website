"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { departments } from "@/data/departments";
import Link from "next/link";
import { ChevronRight, ExternalLink, Newspaper } from "lucide-react";
import { API_URL } from "@/lib/constants";

const tabs = [
  { id: "home", label: "HOME" },
  { id: "hod", label: "HOD MESSAGE" },
  { id: "faculty", label: "FACULTY & STAFF" },
  { id: "lab", label: "LAB DETAILS" },
  { id: "syllabus", label: "SYLLABUS" },
  { id: "research", label: "RESEARCH & PUBLICATION" },
  { id: "wall", label: "WALL MAGAZINE" },
];

interface DeptFacultyItem {
  name: string;
  role: string;
  experience: string;
  qualification: string;
  specialization: string;
  image: string;
  cvLink: string;
}

interface DeptSyllabusItem {
  semester: string;
  pdfLink: string;
  title: string;
}

interface DeptLabItem {
  name: string;
  description: string;
  image?: string | null;
  roomNumber?: string | null;
}

interface DeptWallMagazineItem {
  id?: string;
  title: string;
  edition?: string | null;
  year?: string | null;
  description?: string | null;
  imageUrl: string;
  pdfLink?: string | null;
  department?: string | null;
}

interface RawFacultyApi {
  name: string;
  designation: string;
  experience?: string | null;
  qualifications?: string[] | string | null;
  specialization?: string[] | string | null;
  image?: string | null;
  cvLink?: string | null;
}

interface RawSyllabusApi {
  semester: string;
  pdfLink: string;
  title: string;
}

interface RawLabApi {
  name: string;
  description: string;
  image?: string | null;
  roomNumber?: string | null;
}

export default function DepartmentPage() {
  const params = useParams();
  const deptSlug = (params.dept as string) || "";
  const dept = departments[deptSlug.toLowerCase()];

  const [activeTab, setActiveTab] = useState("home");
  const [dbFaculty, setDbFaculty] = useState<DeptFacultyItem[]>([]);
  const [dbSyllabus, setDbSyllabus] = useState<DeptSyllabusItem[]>([]);
  const [dbLabs, setDbLabs] = useState<DeptLabItem[]>([]);
  const [dbWallMagazines, setDbWallMagazines] = useState<DeptWallMagazineItem[]>([]);

  useEffect(() => {
    if (!deptSlug) return;
    const deptUpper = deptSlug.toUpperCase();

    // Fetch dynamic faculty
    fetch(`${API_URL}/public/faculty?department=${deptUpper}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDbFaculty(
            data.map((f: RawFacultyApi) => ({
              name: f.name,
              role: f.designation,
              experience: f.experience || "-",
              qualification: Array.isArray(f.qualifications) ? f.qualifications.join(", ") : f.qualifications || "-",
              specialization: Array.isArray(f.specialization) ? f.specialization.join(", ") : f.specialization || "-",
              image: f.image || "/img/Faculty/Somen_P.jpg",
              cvLink: f.cvLink || "",
            }))
          );
        }
      })
      .catch(() => {});

    // Fetch dynamic syllabus
    fetch(`${API_URL}/public/syllabus?department=${deptUpper}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDbSyllabus(
            data.map((s: RawSyllabusApi) => ({
              semester: s.semester,
              pdfLink: s.pdfLink,
              title: s.title,
            }))
          );
        }
      })
      .catch(() => {});

    // Fetch dynamic labs
    fetch(`${API_URL}/public/labs?department=${deptUpper}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDbLabs(
            data.map((l: RawLabApi) => ({
              name: l.name,
              description: l.description,
              image: l.image,
              roomNumber: l.roomNumber,
            }))
          );
        }
      })
      .catch(() => {});

    // Fetch dynamic wall magazines
    fetch(`${API_URL}/public/wall-magazine`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const deptMags: DeptWallMagazineItem[] = data.filter(
            (m: DeptWallMagazineItem) =>
              !m.department ||
              m.department.toUpperCase() === deptUpper ||
              m.department.toUpperCase() === "ALL" ||
              m.department.toUpperCase() === deptSlug.toUpperCase()
          );
          setDbWallMagazines(deptMags);
        }
      })
      .catch(() => {});
  }, [deptSlug]);

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

  // Prefer live database lists if available, fallback to static defaults
  const allFaculty = dbFaculty.length > 0 ? dbFaculty : dept.faculty;
  const allSyllabus = dbSyllabus.length > 0 ? dbSyllabus : dept.syllabus;
  const allLabs = dbLabs.length > 0 ? dbLabs : dept.labs;

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
                className={`px-6 py-4 text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
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
                      priority
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
                      &ldquo;
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
                    {allFaculty.map((member, i) => (
                      <tr
                        key={i}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="relative w-24 h-32 rounded-lg overflow-hidden border border-gray-200 shadow-sm mx-auto bg-gray-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={member.image || "/img/Faculty/Somen_P.jpg"}
                              alt={member.name}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/img/Faculty/Somen_P.jpg";
                              }}
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900">
                          {member.cvLink ? (
                            <a
                              href={member.cvLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline inline-flex items-center gap-1"
                            >
                              <span>{member.name}</span>
                              <ExternalLink className="w-3 h-3" />
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
              <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-700 font-bold uppercase tracking-wider text-xs border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 w-20 text-center">SL. NO.</th>
                      <th className="px-6 py-4 w-1/4">LABORATORY NAME</th>
                      <th className="px-6 py-4">DETAILS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {allLabs.map((lab, i) => (
                      <tr
                        key={i}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-5 text-center font-medium text-gray-500 align-top">
                          {i + 1}
                        </td>
                        <td className="px-6 py-5 font-bold text-gray-900 align-top">
                          {lab.name}
                        </td>
                        <td className="px-6 py-5 text-gray-700 leading-relaxed align-top">
                          {lab.description || "-"}
                          {"roomNumber" in lab && Boolean(lab.roomNumber) && (
                            <span className="block text-xs text-gray-500 mt-1 font-medium">
                              📍 {lab.roomNumber}
                            </span>
                          )}
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
                    {allSyllabus.map((item, i) => (
                      <tr
                        key={i}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-center font-medium text-gray-500">
                          {i + 1}
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900">
                          {"title" in item && item.title ? `${item.semester} - ${item.title}` : item.semester}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <a
                            href={item.pdfLink}
                            target="_blank"
                            rel="noopener noreferrer"
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
                              <td className="px-6 py-4 text-center font-bold text-blue-600 align-top pt-5">
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
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 text-white p-8 rounded-2xl shadow-md">
                  <h2 className="text-2xl font-bold mb-2">
                    {dept.wallMagazine.name}
                  </h2>
                  <p className="text-blue-100 text-base max-w-3xl">
                    {dept.wallMagazine.description}
                  </p>
                </div>

                {dbWallMagazines.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dbWallMagazines.map((mag) => (
                      <div
                        key={mag.id}
                        className="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                      >
                        <div>
                          <div className="relative h-64 w-full bg-slate-900 overflow-hidden">
                            <Image
                              src={mag.imageUrl || "/img/hero/slider-2.jpg"}
                              alt={mag.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            {mag.edition && (
                              <span className="absolute top-3 left-3 px-3 py-1 text-xs font-bold bg-blue-600/90 backdrop-blur-md text-white rounded-lg shadow-sm">
                                {mag.edition}
                              </span>
                            )}
                            {mag.year && (
                              <span className="absolute top-3 right-3 px-3 py-1 text-xs font-bold bg-black/60 backdrop-blur-md text-white rounded-lg">
                                {mag.year}
                              </span>
                            )}
                            <div className="absolute bottom-3 left-3 right-3">
                              <h3 className="text-white font-bold text-lg leading-snug drop-shadow-md">
                                {mag.title}
                              </h3>
                            </div>
                          </div>

                          <div className="p-5">
                            {mag.description && (
                              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                {mag.description}
                              </p>
                            )}
                          </div>
                        </div>

                        {mag.pdfLink && (
                          <div className="px-5 pb-5 pt-0">
                            <a
                              href={mag.pdfLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-xl font-bold text-xs transition-all duration-200"
                            >
                              <span>Read / Download Magazine PDF</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                      <Newspaper className="w-6 h-6" />
                    </div>
                    <h3 className="text-gray-900 font-bold text-lg">No Wall Magazines Published Yet</h3>
                    <p className="text-gray-500 text-sm max-w-md mx-auto">
                      Technical wall magazine editions for this department will appear here once uploaded by department administrators.
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
