"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Bell, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { API_URL } from "@/lib/constants";

interface NoticeItem {
  id: string;
  title: string;
  date: string;
  category: string;
  isNew?: boolean;
  attachment?: string | null;
}

interface RawNotice {
  id: string;
  title: string;
  createdAt?: string;
  category?: string;
  priority?: string;
  attachment?: string | null;
}

const CATEGORIES = ["NOTICE", "TENDER", "NEWS", "RECRUITMENT"];

const STATIC_NOTICES: NoticeItem[] = [];

const NoticeBoard = () => {
  const [activeTab, setActiveTab] = useState("NOTICE");
  const [dbNotices, setDbNotices] = useState<NoticeItem[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/public/notices`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const formatted: NoticeItem[] = data.map((n: RawNotice) => ({
            id: n.id,
            title: n.title,
            date: n.createdAt ? n.createdAt.split("T")[0] : "2026",
            category: (n.category || "NOTICE").toUpperCase(),
            isNew: n.priority === "HIGH" || n.priority === "URGENT",
            attachment: n.attachment,
          }));
          setDbNotices(formatted);
        }
      })
      .catch(() => {});
  }, []);

  // Prefer live database notices, fallback to static defaults
  const allNotices = dbNotices.length > 0 ? dbNotices : STATIC_NOTICES;

  const filteredNotices = allNotices.filter((n) => {
    if (activeTab === "NOTICE") return n.category === "NOTICE" || n.category === "GENERAL" || n.category === "ACADEMIC";
    return n.category === activeTab;
  });

  return (
    <div className="bg-white rounded-3xl shadow-2xl shadow-blue-900/5 border border-gray-100 overflow-hidden">
      {/* Tab Header */}
      <div className="flex border-b border-gray-100">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={cn(
              "flex-1 py-4 text-xs font-bold tracking-widest transition-all relative cursor-pointer",
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
                filteredNotices.slice(0, 6).map((notice) => (
                  <div
                    key={notice.id}
                    className="group p-5 hover:bg-blue-50/50 transition-all"
                  >
                    <div className="flex justify-between items-start mb-1.5">
                      <div className="flex items-center text-gray-400 text-xs font-medium">
                        <Calendar className="w-3.5 h-3.5 mr-1.5 text-blue-500" />
                        {notice.date}
                      </div>
                      {notice.attachment && (
                        <a
                          href={notice.attachment}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 font-semibold"
                        >
                          <span>PDF</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <h3 className="text-gray-900 font-semibold group-hover:text-blue-700 transition-colors flex items-center leading-relaxed text-sm">
                      {notice.title}
                      {notice.isNew && (
                        <span className="ml-2 flex h-2 w-2 relative shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
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
          <span>See All Notices & Circulars</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default NoticeBoard;
