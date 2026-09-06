"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Github,
  Code2,
} from "lucide-react";
import { COLLEGE_NAME, COLLEGE_SHORT_NAME } from "@/lib/constants";

const Footer = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);
  const [admissionYear, setAdmissionYear] = React.useState("");

  React.useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cgec_admission_year");
      if (stored) setAdmissionYear(stored);
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/public/admission`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.activeYear) {
          setAdmissionYear(data.activeYear);
          if (typeof window !== "undefined") {
            localStorage.setItem("cgec_admission_year", data.activeYear);
          }
        }
      })
      .catch(() => {});
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* College Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-2xl text-white tracking-tight">
                {COLLEGE_SHORT_NAME}
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Established by the Government of West Bengal in 2016, Cooch Behar
              Government Engineering College is committed to excellence in
              technical education and research.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/cgecofficialwb"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/cgecofficialwb"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/school/cgecofficial/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/cgecofficialwb/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@cgecofficialwb"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8">
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/admission"
                  suppressHydrationWarning
                  className="hover:text-blue-500 hover:underline transition-colors"
                >
                  <span suppressHydrationWarning>
                    {mounted && admissionYear ? `Admission ${admissionYear}` : "Admission"}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/academics"
                  className="hover:text-blue-500 hover:underline transition-colors"
                >
                  Academic Calendar
                </Link>
              </li>
              <li>
                <Link
                  href="/placement"
                  className="hover:text-blue-500 hover:underline transition-colors"
                >
                  Placement Cell
                </Link>
              </li>
              <li>
                <Link
                  href="/notices"
                  className="hover:text-blue-500 hover:underline transition-colors"
                >
                  College Notices
                </Link>
              </li>
              <li>
                <Link
                  href="/tenders"
                  className="hover:text-blue-500 hover:underline transition-colors"
                >
                  Tenders
                </Link>
              </li>
            </ul>
          </div>

          {/* Academics */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Departments</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/academics/cse"
                  className="hover:text-blue-500 hover:underline transition-colors"
                >
                  Computer Science
                </Link>
              </li>
              <li>
                <Link
                  href="/academics/ece"
                  className="hover:text-blue-500 hover:underline transition-colors"
                >
                  Electronics & Comm.
                </Link>
              </li>
              <li>
                <Link
                  href="/academics/ee"
                  className="hover:text-blue-500 hover:underline transition-colors"
                >
                  Electrical Engineering
                </Link>
              </li>
              <li>
                <Link
                  href="/academics/me"
                  className="hover:text-blue-500 hover:underline transition-colors"
                >
                  Mechanical Engineering
                </Link>
              </li>
              <li>
                <Link
                  href="/academics/ce"
                  className="hover:text-blue-500 hover:underline transition-colors"
                >
                  Civil Engineering
                </Link>
              </li>
            </ul>
          </div>

          {/* External Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">QUICK LINK</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://banglaruchchashiksha.wb.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 hover:underline transition-colors"
                >
                  Banglar Uchchashiksha
                </a>
              </li>
              <li>
                <a
                  href="https://wbjeeb.nic.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 hover:underline transition-colors"
                >
                  WBJEE Board
                </a>
              </li>
              <li>
                <a
                  href="https://makautwb.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 hover:underline transition-colors"
                >
                  MAKAUT
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 hover:underline transition-colors"
                >
                  Forum
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 hover:underline transition-colors"
                >
                  Online Grievance Redressal
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 hover:underline transition-colors block leading-tight"
                >
                  AICTE Suggested Books (Indian Authors)
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 hover:underline transition-colors"
                >
                  AICTE Mandatory Disclosure
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 hover:underline transition-colors"
                >
                  AICTE Approval
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                <span>
                  Harinchawra, P.O. Ghughumari, Cooch Behar, West Bengal 736170
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                <span>+91 03582-233040</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <span>principal@cgec.org.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Developer Details - Home page only (Centered to prevent ChatBot icon overlap) */}
        {pathname === "/" && (
          <div className="mb-6 pt-6 border-t border-gray-800/80 flex justify-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 px-6 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700/50 text-xs shadow-sm max-w-3xl w-full mx-auto text-center">
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <Code2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-semibold text-gray-200 tracking-wide whitespace-nowrap">Developer Details</span>
              </div>

              <div className="hidden sm:block w-px h-4 bg-gray-700" />

              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-gray-300">
                {/* Main Developer */}
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-400">Main Developer:</span>
                  <span className="font-medium text-white">Tanmoy Pal</span>
                  <div className="flex items-center gap-1 ml-0.5">
                    <a
                      href="https://github.com/Tanmoy052/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                      title="GitHub Profile"
                      aria-label="Tanmoy Pal GitHub"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/tanmoy-pal-755611294/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded text-gray-400 hover:text-blue-400 hover:bg-gray-700 transition-colors"
                      title="LinkedIn Profile"
                      aria-label="Tanmoy Pal LinkedIn"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <span className="hidden sm:inline text-gray-600">•</span>

                {/* Development Contributors */}
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-400">Development Contributor:</span>
                  <span className="font-medium text-white">Sabir Ali Mondal</span>
                  <div className="flex items-center gap-1 ml-0.5">
                    <a
                      href="https://github.com/Sabir-Ali-Mondal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                      title="GitHub Profile"
                      aria-label="Sabir Ali Mondal GitHub"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/sabir-ali-mondal/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded text-gray-400 hover:text-blue-400 hover:bg-gray-700 transition-colors"
                      title="LinkedIn Profile"
                      aria-label="Sabir Ali Mondal LinkedIn"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm">
          <p>
            © {new Date().getFullYear()} {COLLEGE_NAME}. All Rights Reserved.
          </p>
          <div className="flex space-x-6 text-gray-400 md:pr-16">
            <span>
              Designed & Developed by{" "}
              <Link
                href="/"
                className="hover:text-white hover:underline transition-colors text-blue-400 font-medium"
              >
                CGEC
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
