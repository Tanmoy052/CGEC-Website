"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Calendar, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CATEGORIES = ["NOTICE", "TENDER", "NEWS", "RECRUITMENT"];

const NOTICES = [
  {
    id: 1,
    title: "Odd Semester Examination Form Fill-up 2025-26",
    date: "Feb 12, 2026",
    category: "NOTICE",
    isNew: true,
  },
  {
    id: 2,
    title: "Placement Drive: Tata Consultancy Services (TCS) for 2026 Batch",
    date: "Feb 10, 2026",
    category: "RECRUITMENT",
    isNew: true,
  },
  {
    id: 3,
    title: "Workshop on Artificial Intelligence and Machine Learning",
    date: "Feb 08, 2026",
    category: "NEWS",
    isNew: false,
  },
  {
    id: 4,
    title: "Hostel Admission Notice for First Year Students",
    date: "Feb 05, 2026",
    category: "NOTICE",
    isNew: false,
  },
];

const NoticeBoard = () => {
  const [activeTab, setActiveTab] = useState("NOTICE");

  const filteredNotices = NOTICES.filter((n) => n.category === activeTab);

  return (
    <div className="bg-white rounded-3xl shadow-2xl shadow-blue-900/5 border border-gray-100 overflow-hidden">
      {/* Tab Header */}
      <div className="flex border-b border-gray-100">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={cn(
              "flex-1 py-4 text-xs font-bold tracking-widest transition-all relative",
              activeTab === cat
                ? "text-blue-600"
                : "text-gray-400 hover:text-gray-600",
            )}
          >
            {cat}
            {activeTab === cat && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600"
              />
            )}
          </button>
        ))}
      </div>

      <div className="p-2 min-h-[400px]">
        <div className="divide-y divide-gray-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {filteredNotices.length > 0 ? (
                filteredNotices.map((notice, index) => (
                  <div
                    key={notice.id}
                    className="group p-6 hover:bg-blue-50/50 transition-all cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center text-gray-400 text-xs">
                        <Calendar className="w-4 h-4 mr-1.5" />
                        {notice.date}
                      </div>
                    </div>
                    <h3 className="text-gray-900 font-semibold group-hover:text-blue-700 transition-colors flex items-center leading-relaxed">
                      {notice.title}
                      {notice.isNew && (
                        <span className="ml-2 flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                      )}
                    </h3>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <Bell className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-sm">
                    No {activeTab.toLowerCase()} available
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="p-6 bg-gray-50 border-t border-gray-100">
        <Link
          href="/notices"
          className="w-full py-4 bg-white border border-gray-200 rounded-xl text-blue-900 font-bold hover:bg-blue-900 hover:text-white hover:border-blue-900 transition-all flex items-center justify-center space-x-2 shadow-sm"
        >
          <span>See All</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default NoticeBoard;
