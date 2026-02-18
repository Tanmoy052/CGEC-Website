
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
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/academics" className="hover:text-blue-600">Academics</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="font-semibold text-gray-900">{dept.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
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
                  <div className="w-full lg:w-1/2 relative h-[300px] lg:h-[400px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
                    <Image
                      src={dept.home.image}
                      alt={`${dept.name} Lab`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="w-full lg:w-1/2 prose prose-lg text-gray-700">
                     {dept.home.paragraphs.slice(1, 3).map((p, i) => (
                        <p key={i} className="mb-4">{p}</p>
                     ))}
                  </div>
                </div>

                {/* Additional Content */}
                <div className="prose prose-lg max-w-none text-gray-700">
                   {dept.home.paragraphs.slice(3).map((p, i) => (
                      <p key={i} className="mb-4">{p}</p>
                   ))}
                </div>
              </div>
            )}

            {activeTab === "hod" && (
              <div className="flex flex-col md:flex-row gap-8 items-start bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                <div className="w-full md:w-1/3 relative h-[300px] rounded-xl overflow-hidden shadow-md">
                   <Image
                      src={dept.hodMessage.image}
                      alt={dept.hodMessage.name}
                      fill
                      className="object-cover"
                    />
                </div>
                <div className="w-full md:w-2/3">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{dept.hodMessage.name}</h2>
                  <h3 className="text-blue-600 font-medium mb-6 uppercase tracking-wide">Head of Department</h3>
                  <div className="prose prose-lg text-gray-700 relative pl-8 border-l-4 border-blue-600">
                    <span className="absolute -top-6 -left-6 text-6xl text-blue-200 font-serif">"</span>
                    <p className="relative z-10 italic leading-relaxed">
                      {dept.hodMessage.message}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "faculty" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dept.faculty.map((member, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all group">
                    <div className="relative h-72 w-full overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 border-t border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-blue-600 font-medium text-sm uppercase tracking-wide">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "lab" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {dept.labs.map((lab, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-2xl shadow-lg h-64">
                    <Image
                      src={lab.image}
                      alt={lab.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{lab.name}</h3>
                      <p className="text-gray-200 text-sm line-clamp-2">{lab.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === "syllabus" && (
               <div className="bg-blue-50 border border-blue-100 rounded-xl p-12 text-center max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Course Syllabus</h3>
                  <p className="text-gray-600 mb-8">Download the comprehensive syllabus for the B.Tech program in {dept.name}.</p>
                  <a 
                    href={dept.syllabus} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/30"
                  >
                    Download PDF Syllabus
                  </a>
               </div>
            )}
            
            {activeTab === "research" && (
               <div className="prose prose-lg max-w-none text-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Research & Publications</h3>
                  <p>{dept.research}</p>
               </div>
            )}

            {activeTab === "wall" && (
               <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Department Wall Magazine</h3>
                  <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-100">
                    <h4 className="text-xl font-bold text-yellow-800 mb-2">"{dept.wallMagazine}"</h4>
                    <p className="text-yellow-700">
                      Our department's annual magazine showcasing student creativity, technical articles, and achievements.
                    </p>
                  </div>
               </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
