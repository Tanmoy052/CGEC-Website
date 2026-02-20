"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Download,
  FileText,
  AlertCircle,
  ChevronRight,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "NOTICE", "TENDER", "NEWS", "RECRUITMENT"];

const NOTICES_DATA = [
  // NOTICE
  {
    id: 1,
    title:
      "Notice for Approved list contains selected students for WBFS (Full Freeship/ Half freeship) 2025-26 for 2nd year students.",
    category: "NOTICE",
    date: "Jan 29, 2026",
    priority: "HIGH",
    desc: "Approved list of selected students for West Bengal Freeship Scheme (WBFS) 2025-26.",
    file: "wbfs_list_2025.pdf",
  },
  {
    id: 2,
    title:
      "Status of applications for decentralized counselling of B.Tech 3rd Semester(Lateral Entry) candidates",
    category: "NOTICE",
    date: "Jan 28, 2026",
    priority: "HIGH",
    desc: "Update on the status of applications for decentralized counselling for lateral entry candidates.",
    file: "decentralized_status.pdf",
  },
  {
    id: 3,
    title:
      "NOTICE FOR ADMISSION THROUGH DECENTRALIZED COUNSELLING IN THE 2nd YEAR (LATERAL ENTRY) OF B. TECH COURSES AGAINST VACANCY 2024",
    category: "NOTICE",
    date: "Jan 24, 2026",
    priority: "HIGH",
    desc: "Notice regarding admission through decentralized counselling for 2nd year lateral entry students.",
    file: "lateral_entry_admission.pdf",
  },
  {
    id: 4,
    title:
      "NOTICE FOR REQUIREMENT OF VISITING FACULTY FOR THE EVEN SEMESTER 2026.",
    category: "NOTICE",
    date: "Dec 30, 2025",
    priority: "NORMAL",
    desc: "Applications are invited for Visiting Faculty positions for the upcoming even semester.",
    file: "visiting_faculty_2026.pdf",
  },
  // TENDER
  {
    id: 5,
    title:
      "Notice inviting Quotation for Jungle Cutting and Cleaning of Sewerages of college campus",
    category: "TENDER",
    date: "Feb 12, 2026",
    priority: "HIGH",
    desc: "Quotations invited for jungle cutting and sewerage cleaning services within the college campus.",
    file: "jungle_cutting_tender.pdf",
  },
  {
    id: 6,
    title:
      "Notice Inviting Quotation for supply of various Items for CGEC Annual Sports Meet 2026.",
    category: "TENDER",
    date: "Jan 29, 2026",
    priority: "HIGH",
    desc: "Quotations invited for the supply of sports equipment and items for the Annual Sports Meet.",
    file: "sports_meet_tender.pdf",
  },
  {
    id: 7,
    title:
      "Notice Inviting Quotation for supply of CCTV and Electrical Items for Conduct of Various Semester Examination at College Campus.",
    category: "TENDER",
    date: "Jan 15, 2026",
    priority: "NORMAL",
    desc: "Quotations invited for CCTV and electrical items required for semester examinations.",
    file: "cctv_tender.pdf",
  },
  {
    id: 8,
    title:
      "Notice Inviting Quotation for the supply of Refreshments for Admission 2025",
    category: "TENDER",
    date: "Aug 26, 2025",
    priority: "NORMAL",
    desc: "Quotations invited for supplying refreshments during the 2025 admission process.",
    file: "refreshments_tender.pdf",
  },
  // NEWS
  {
    id: 9,
    title: "Induction Programme Final Brochure 2.0",
    category: "NEWS",
    date: "Oct 27, 2021",
    priority: "NORMAL",
    desc: "Final brochure for the Student Induction Programme.",
    file: "induction_brochure.pdf",
  },
  {
    id: 10,
    title: "Student Induction Programme 2021 Invitation and Schedule",
    category: "NEWS",
    date: "Sep 14, 2021",
    priority: "NORMAL",
    desc: "Invitation and detailed schedule for the 2021 Student Induction Programme.",
    file: "induction_schedule.pdf",
  },
  {
    id: 11,
    title: "AJANTRIK 2K21",
    category: "NEWS",
    date: "Sep 13, 2021",
    priority: "NORMAL",
    desc: "Highlights and details of the annual tech fest AJANTRIK 2K21.",
    file: "ajantrik_2k21.pdf",
  },
  // RECRUITMENT
  {
    id: 12,
    title: "Placement Drive: Tata Consultancy Services (TCS) for 2026 Batch",
    category: "RECRUITMENT",
    date: "Feb 10, 2026",
    priority: "HIGH",
    desc: "TCS recruitment drive for the 2026 graduating batch.",
    file: "tcs_recruitment.pdf",
  },
];

const NoticePage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotices = NOTICES_DATA.filter((notice) => {
    const matchesCategory =
      activeCategory === "All" || notice.category === activeCategory;
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-blue-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-6"
            >
              Notice Board & Announcements
            </motion.h1>
            <p className="text-xl text-blue-100">
              Stay updated with the latest information, academic alerts, and
              official notifications from CGEC.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Search & Filter Bar */}
            <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-gray-100 mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Search */}
                <div className="lg:col-span-5 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search notices, keywords..."
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Category Pills */}
                <div className="lg:col-span-7 flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap",
                        activeCategory === cat
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200",
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Notices List */}
            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {filteredNotices.length > 0 ? (
                  filteredNotices.map((notice) => (
                    <motion.div
                      key={notice.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all group relative overflow-hidden"
                    >
                      <div className="flex flex-col md:flex-row md:items-start gap-8">
                        {/* Date Box */}
                        <div className="shrink-0 flex md:flex-col items-center justify-center w-24 h-24 bg-blue-50 text-blue-600 rounded-3xl p-4">
                          <span className="text-2xl font-black">
                            {notice.date.split(" ")[1].replace(",", "")}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-widest">
                            {notice.date.split(" ")[0]}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-4">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="px-4 py-1.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-full flex items-center">
                              <Tag className="w-3 h-3 mr-1.5" />
                              {notice.category}
                            </span>
                            {notice.priority === "HIGH" && (
                              <span className="px-4 py-1.5 bg-red-100 text-red-600 text-xs font-bold rounded-full flex items-center animate-pulse">
                                <AlertCircle className="w-3 h-3 mr-1.5" />
                                Urgent
                              </span>
                            )}
                          </div>

                          <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                            {notice.title}
                          </h2>

                          <p className="text-gray-500 leading-relaxed max-w-3xl">
                            {notice.desc}
                          </p>

                          <div className="pt-4 flex flex-wrap items-center gap-4">
                            <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                              <Download className="w-5 h-5" />
                              <span>Download PDF</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 font-bold transition-colors">
                              <FileText className="w-5 h-5" />
                              <span>View Online</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-gray-300"
                  >
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      No notices found
                    </h3>
                    <p className="text-gray-500 mt-2">
                      Try adjusting your filters or search query.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pagination / Load More */}
            <div className="mt-12 text-center">
              <button className="px-10 py-4 bg-white border border-gray-200 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all">
                Load Archive Notices
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NoticePage;
