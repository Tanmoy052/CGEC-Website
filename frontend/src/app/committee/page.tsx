"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  ShieldCheck,
  GraduationCap,
  Scale,
  Users,
  Building2,
  Award,
  HeartHandshake,
  LifeBuoy,
  FileCheck2,
  AlertOctagon,
} from "lucide-react";

interface CommitteeCard {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  tag: string;
}

const COMMITTEES: CommitteeCard[] = [
  {
    title: "Academic Committee",
    description: "Oversees academic policies, curriculum implementation, examinations, and departmental coordination.",
    href: "/committee/academic",
    icon: GraduationCap,
    tag: "Academics",
  },
  {
    title: "Anti-Ragging Committee",
    description: "Ensures a zero-tolerance ragging-free campus adhering strictly to Supreme Court & AICTE guidelines.",
    href: "/committee/anti-ragging",
    icon: ShieldCheck,
    tag: "Safety & Discipline",
  },
  {
    title: "Anti-Ragging Squad",
    description: "Active vigilance squad conducting round-the-clock surprise checks across hostels and college premises.",
    href: "/committee/anti-ragging-squard",
    icon: AlertOctagon,
    tag: "Vigilance",
  },
  {
    title: "Internal Complaint Committee (ICC)",
    description: "Addresses gender sensitization, harassment prevention, and safety under the POSH Act.",
    href: "/committee/icc",
    icon: Scale,
    tag: "Statutory",
  },
  {
    title: "Committee for SC & ST",
    description: "Safeguards interests, equal opportunities, scholarships, and welfare of SC and ST community members.",
    href: "/committee/sc-st",
    icon: Users,
    tag: "Welfare",
  },
  {
    title: "Grievance Redressal Committee (GRC)",
    description: "Provides a structured institutional forum for redressal of staff, faculty, and institutional concerns.",
    href: "/committee/grc",
    icon: HeartHandshake,
    tag: "Redressal",
  },
  {
    title: "Student Grievance Redressal Committee",
    description: "Dedicated mechanism for students to raise and resolve academic and campus life grievances promptly.",
    href: "/committee/student-grc",
    icon: LifeBuoy,
    tag: "Student Support",
  },
  {
    title: "Institute Industry Cell (IIC)",
    description: "Connects academia with industry partners, organizing industrial visits, training, and MoU collaborations.",
    href: "/committee/iic",
    icon: Building2,
    tag: "Industry Connect",
  },
  {
    title: "Internal Quality Assurance Cell (IQAC)",
    description: "Drives continuous quality improvement, academic audits, and accreditation readiness at CGEC.",
    href: "/committee/iqac",
    icon: Award,
    tag: "Quality & NAAC",
  },
  {
    title: "Student Counsellor",
    description: "Confidential emotional, psychological, and mental health counseling support for all students.",
    href: "/committee/counsellor",
    icon: FileCheck2,
    tag: "Mental Wellbeing",
  },
];

export default function CommitteeIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white font-medium">Committees & Councils</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            Institutional Committees & Councils
          </h1>
          <p className="text-blue-200 max-w-2xl text-base md:text-lg leading-relaxed">
            Statutory bodies and regulatory cells established to maintain high standards of governance, academic integrity, student welfare, and campus safety at Cooch Behar Government Engineering College.
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="container mx-auto max-w-6xl px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMMITTEES.map((comm) => {
            const Icon = comm.icon;
            return (
              <Link
                key={comm.href}
                href={comm.href}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
                      {comm.tag}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2">
                    {comm.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {comm.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                  <span>View Committee Members</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
