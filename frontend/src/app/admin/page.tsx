"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Image as ImageIcon, 
  Settings, 
  Bell,
  Search,
  Plus,
  TrendingUp,
  Eye,
  LogOut,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const STATS = [
    { label: "Total Visits", value: "24.5k", change: "+12%", icon: <Eye className="w-6 h-6" />, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Notices", value: "42", change: "+5", icon: <Bell className="w-6 h-6" />, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Faculty Members", value: "64", change: "0", icon: <Users className="w-6 h-6" />, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Student Growth", value: "1.2k", change: "+8%", icon: <TrendingUp className="w-6 h-6" />, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col hidden lg:flex">
        <div className="p-8">
          <div className="flex items-center space-x-3 text-blue-900 mb-10">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">A</div>
            <span className="font-black text-xl tracking-tight">CGEC Admin</span>
          </div>

          <nav className="space-y-2">
            {[
              { id: "overview", label: "Overview", icon: <LayoutDashboard className="w-5 h-5" /> },
              { id: "notices", label: "Manage Notices", icon: <FileText className="w-5 h-5" /> },
              { id: "faculty", label: "Faculty Directory", icon: <Users className="w-5 h-5" /> },
              { id: "gallery", label: "Campus Gallery", icon: <ImageIcon className="w-5 h-5" /> },
              { id: "settings", label: "Site Settings", icon: <Settings className="w-5 h-5" /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl font-bold transition-all",
                  activeTab === item.id 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-blue-600"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8">
          <button className="w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 p-8 sticky top-0 z-30">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-black text-gray-900">System Overview</h1>
              <p className="text-gray-500">Welcome back, Administrator</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Global Search..."
                  className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none w-64 text-sm"
                />
              </div>
              <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center space-x-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                <Plus className="w-5 h-5" />
                <span>New Notice</span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={cn("p-3 rounded-2xl", stat.bg, stat.color)}>
                    {stat.icon}
                  </div>
                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                    {stat.change}
                  </span>
                </div>
                <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                <h2 className="text-xl font-black text-gray-900">Recent Notices</h2>
                <button className="text-blue-600 font-bold text-sm hover:underline flex items-center">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="divide-y divide-gray-50">
                {[1, 2, 3, 4].map((id) => (
                  <div key={id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Notice Title {id}</h4>
                        <p className="text-xs text-gray-400 font-medium">Published 2 hours ago • Academic</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Settings className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions / Status */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-black text-gray-900 mb-8">Server Status</h2>
              <div className="space-y-6">
                {[
                  { label: "API Server", status: "Online", color: "bg-emerald-500" },
                  { label: "Database", status: "Connected", color: "bg-emerald-500" },
                  { label: "Storage (S3)", status: "Online", color: "bg-emerald-500" },
                  { label: "Mail Service", status: "Offline", color: "bg-red-500" },
                ].map((service, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="font-bold text-gray-600">{service.label}</span>
                    <div className="flex items-center space-x-2">
                      <span className={cn("w-2 h-2 rounded-full animate-pulse", service.color)}></span>
                      <span className="text-sm font-bold text-gray-900">{service.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-gray-50">
                <h3 className="font-bold text-gray-900 mb-4">Storage Usage</h3>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div className="w-[65%] h-full bg-blue-600 rounded-full"></div>
                </div>
                <div className="flex justify-between text-xs font-bold text-gray-400 uppercase">
                  <span>12.4 GB used</span>
                  <span>20 GB total</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
