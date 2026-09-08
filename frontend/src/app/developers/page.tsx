import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Code2,
  Github,
  Linkedin,
  ArrowLeft,
  GraduationCap,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Developer & Management Team | CGEC",
  description:
    "Meet the official website developer and management team behind Cooch Behar Government Engineering College's digital portal.",
};

interface Developer {
  id: string;
  name: string;
  role: string;
  badge: string;
  department: string;
  batch: string;
  image?: string;
  github?: string;
  linkedin?: string;
  isLead?: boolean;
}

const DEVELOPERS: Developer[] = [
  {
    id: "tanmoy-pal",
    name: "Tanmoy Pal",
    role: "Main Developer & Lead Architect",
    badge: "Lead Developer",
    department: "CSE",
    batch: "2023 - 2027",
    image: "/img/alumni/tanmoy_pal.png",
    github: "https://github.com/Tanmoy052/",
    linkedin: "https://www.linkedin.com/in/tanmoy-pal-755611294/",
    isLead: true,
  },
  {
    id: "sabir-ali-mondal",
    name: "Sabir Ali Mondal",
    role: "Development Contributor",
    badge: "Contributor",
    department: "CSE",
    batch: "2023 - 2027",
    github: "https://github.com/Sabir-Ali-Mondal",
    linkedin: "https://www.linkedin.com/in/sabir-ali-mondal/",
    isLead: false,
  },
];

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-600 selection:text-white">
      {/* Background Ambience Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10 max-w-5xl">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold backdrop-blur-md transition-all hover:-translate-x-0.5 active:translate-x-0 w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Hero Section Header */}
        <div className="text-center space-y-4 mb-14 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-300 text-xs sm:text-sm font-bold tracking-wider uppercase backdrop-blur-md shadow-lg shadow-blue-500/10">
            <Code2 className="w-4 h-4" />
            <span>Digital Infrastructure &amp; Engineering</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            CGEC Website Developer &amp; Management Team
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            The student engineers, architects, and technical contributors who design, build, and maintain the digital face of Cooch Behar Government Engineering College.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {DEVELOPERS.map((dev) => (
            <div
              key={dev.id}
              className={`rounded-3xl border transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between backdrop-blur-xl relative overflow-hidden group ${
                dev.isLead
                  ? "bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-blue-950/40 border-blue-500/40 shadow-2xl shadow-blue-950/40 hover:border-blue-400"
                  : "bg-slate-900/80 border-slate-800 hover:border-slate-700 shadow-xl hover:bg-slate-900/95"
              }`}
            >
              {/* Subtle radiant corner glow */}
              <div
                className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-2xl pointer-events-none ${
                  dev.isLead ? "bg-blue-500/20" : "bg-indigo-500/10"
                }`}
              />

              {/* Profile Header */}
              <div className="flex items-center gap-4 sm:gap-5 mb-5 relative z-10">
                {/* Avatar */}
                <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-gradient-to-tr from-blue-600 to-indigo-600 p-1 shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300">
                  {dev.image ? (
                    <Image
                      src={dev.image}
                      alt={dev.name}
                      fill
                      className="object-cover object-top rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center font-extrabold text-xl text-blue-400 border border-white/10">
                      {dev.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        dev.isLead
                          ? "bg-blue-600/30 text-blue-300 border-blue-500/40 shadow-sm"
                          : "bg-purple-600/20 text-purple-300 border-purple-500/40"
                      }`}
                    >
                      {dev.badge}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-white truncate tracking-tight mb-0.5">
                    {dev.name}
                  </h2>

                  <p className="text-xs sm:text-sm font-semibold text-blue-300 mb-1">
                    {dev.role}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">
                      {dev.department} • {dev.batch}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Links Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3 relative z-10">
                <div className="flex items-center gap-2">
                  {dev.github && (
                    <a
                      href={dev.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm"
                      title={`${dev.name} on GitHub`}
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}

                  {dev.linkedin && (
                    <a
                      href={dev.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-blue-400 text-xs font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm"
                      title={`${dev.name} on LinkedIn`}
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>

                <span className="text-[11px] text-slate-500 font-medium">
                  CGEC Web Portal
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
