"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code,
  Cpu,
  Lightbulb,
  Wrench,
  Building2,
  FlaskConical,
  ChevronRight,
  ArrowRight,
  GraduationCap,
  Award,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface DepartmentCard {
  name: string;
  code: string;
  icon: React.ElementType;
  color: string;
  accentBg: string;
  textColor: string;
  badgeBg: string;
  desc: string;
  tags: string[];
  image: string;
}

const DEPARTMENTS: DepartmentCard[] = [
  {
    name: "Computer Science & Engineering",
    code: "CSE",
    icon: Code,
    color: "bg-blue-800",
    accentBg: "from-blue-900 to-indigo-950",
    textColor: "text-blue-700",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
    desc: "The Department of Computer Science and Engineering is the premier technology hub at CGEC. It delivers rigorous curricula in algorithms, software engineering, AI, cybersecurity, and modern distributed cloud architectures.",
    tags: ["Artificial Intelligence", "Machine Learning", "Cloud Systems", "Networking"],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
  },
  {
    name: "Electronics & Communication Engineering",
    code: "ECE",
    icon: Cpu,
    color: "bg-purple-800",
    accentBg: "from-purple-900 to-indigo-950",
    textColor: "text-purple-700",
    badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
    desc: "The ECE department equips engineers for semiconductor fabrication, telecom networks, and embedded systems with hands-on exposure to VLSI design suites, digital signal processors, and 5G communication protocols.",
    tags: ["VLSI Design", "Embedded Systems", "Signal Processing", "Microwave & 5G"],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
  },
  {
    name: "Electrical Engineering",
    code: "EE",
    icon: Lightbulb,
    color: "bg-amber-700",
    accentBg: "from-amber-900 to-slate-950",
    textColor: "text-amber-700",
    badgeBg: "bg-amber-50 text-amber-800 border-amber-200",
    desc: "Focusing on contemporary electrical machines, control systems, and renewable microgrids, the EE department develops future leaders in sustainable power generation and automated industrial systems.",
    tags: ["Smart Grids", "Renewable Energy", "Electrical Machines", "Power Electronics"],
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop",
  },
  {
    name: "Mechanical Engineering",
    code: "ME",
    icon: Wrench,
    color: "bg-rose-800",
    accentBg: "from-rose-950 to-slate-950",
    textColor: "text-rose-700",
    badgeBg: "bg-rose-50 text-rose-800 border-rose-200",
    desc: "The ME department offers rigorous grounding across thermal science, precision design, and modern automated manufacturing. Students hone practical expertise inside modern machine shops and CAD/CAM facilities.",
    tags: ["Thermal Engineering", "CAD/CAM", "Advanced Manufacturing", "Fluid Dynamics"],
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop",
  },
  {
    name: "Civil Engineering",
    code: "CE",
    icon: Building2,
    color: "bg-emerald-800",
    accentBg: "from-emerald-950 to-slate-950",
    textColor: "text-emerald-700",
    badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
    desc: "The CE department is committed to advancing sustainable civil infrastructure, environmental resilience, geotechnical exploration, structural modeling, and modern project management methodologies.",
    tags: ["Structural Engineering", "Geotechnical Testing", "Surveying & GIS", "Environmental Eng."],
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop",
  },
  {
    name: "Basic Science & Humanities",
    code: "BSH",
    icon: FlaskConical,
    color: "bg-sky-800",
    accentBg: "from-sky-950 to-slate-950",
    textColor: "text-sky-700",
    badgeBg: "bg-sky-50 text-sky-800 border-sky-200",
    desc: "The BSH department provides the foundational bedrock for all engineering disciplines, cultivating analytical thinking, experimental sciences, physics, chemistry, and professional communication skills.",
    tags: ["Engineering Mathematics", "Applied Physics", "Industrial Chemistry", "Professional English"],
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
];

const PILLARS = [
  {
    title: "AICTE Approved",
    subtitle: "Govt. of West Bengal Institution",
    icon: Award,
  },
  {
    title: "MAKAUT Affiliated",
    subtitle: "CBCS / NEP Aligned Curriculum",
    icon: GraduationCap,
  },
  {
    title: "5 Academic Streams",
    subtitle: "Undergraduate Engineering & Sciences",
    icon: Sparkles,
  },
  {
    title: "Industry Aligned",
    subtitle: "Cutting-Edge Labs & Research Hubs",
    icon: CheckCircle2,
  },
];

export default function AcademicsPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Top Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200 py-3.5">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center text-sm text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-slate-400" />
            <span className="font-semibold text-blue-700">Academics</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Excellence &amp; Research</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight"
          >
            Engineering Disciplines &amp; Academics
          </motion.h1>

          <p className="text-base sm:text-xl text-blue-100/90 max-w-3xl mx-auto leading-relaxed">
            Our departments provide state-of-the-art laboratory infrastructure, industry-guided curricula,
            and research-driven faculty mentorship designed to shape competent engineering professionals.
          </p>
        </div>
      </section>

      {/* Academic Highlights Strip */}
      <section className="container mx-auto px-4 max-w-7xl -mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex items-center gap-3.5"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {pillar.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 truncate">
                    {pillar.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Departments Grid Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore Our Academic Departments
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Click on any department to visit its dedicated portal with detailed faculty directories, laboratory facilities, semester syllabus, and HOD messages.
            </p>
          </div>

          <div className="space-y-12">
            {DEPARTMENTS.map((dept, index) => {
              const Icon = dept.icon;
              return (
                <motion.article
                  key={dept.code}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col lg:flex-row items-stretch group"
                >
                  {/* Left Side: Department Info */}
                  <div className="w-full lg:w-3/5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                    <div className="space-y-5">
                      {/* Badge and Icon header */}
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-14 h-14 ${dept.color} text-white rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0`}
                        >
                          <Icon className="w-7 h-7" />
                        </div>
                        <div>
                          <span
                            className={`text-xs font-bold tracking-wider uppercase ${dept.textColor}`}
                          >
                            Department of {dept.code}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                            {dept.name}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        {dept.desc}
                      </p>

                      {/* Key Competencies / Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {dept.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className={`text-xs font-semibold px-3 py-1 rounded-full border ${dept.badgeBg}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={`/academics/${dept.code.toLowerCase()}`}
                        aria-label={`Visit Department Portal for ${dept.name}`}
                        className={`inline-flex items-center gap-2.5 px-6 py-3.5 ${dept.color} text-white rounded-xl font-bold text-sm shadow-md hover:opacity-95 transition-all hover:scale-[1.02] active:scale-95`}
                      >
                        <span>Visit Department Portal</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <span className="text-xs font-bold text-slate-400 hidden sm:inline">
                        Faculty • Labs • Syllabus • HOD
                      </span>
                    </div>
                  </div>

                  {/* Right Side: Image Banner */}
                  <div className="w-full lg:w-2/5 relative h-56 sm:h-72 lg:h-auto min-h-[260px] lg:min-h-[360px] bg-slate-100 overflow-hidden shrink-0">
                    <Image
                      src={dept.image}
                      alt={`${dept.name} Laboratory and Facilities`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority={index === 0}
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 ${dept.color} mix-blend-multiply opacity-25 group-hover:opacity-15 transition-opacity`}
                    />

                    {/* Department Code Watermark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-6">
                      <span className="text-xs font-bold text-white/90 uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                        {dept.code} Portal
                      </span>
                      <span className="text-5xl sm:text-6xl font-black text-white/20 select-none tracking-tighter">
                        {dept.code}
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
