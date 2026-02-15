import React from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { COLLEGE_NAME, COLLEGE_SHORT_NAME } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
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
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/admission"
                  className="hover:text-blue-500 transition-colors"
                >
                  Admission 2026
                </Link>
              </li>
              <li>
                <Link
                  href="/academics"
                  className="hover:text-blue-500 transition-colors"
                >
                  Academic Calendar
                </Link>
              </li>
              <li>
                <Link
                  href="/placement"
                  className="hover:text-blue-500 transition-colors"
                >
                  Placement Cell
                </Link>
              </li>
              <li>
                <Link
                  href="/notices"
                  className="hover:text-blue-500 transition-colors"
                >
                  College Notices
                </Link>
              </li>
              <li>
                <Link
                  href="/tenders"
                  className="hover:text-blue-500 transition-colors"
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
                  className="hover:text-blue-500 transition-colors"
                >
                  Computer Science
                </Link>
              </li>
              <li>
                <Link
                  href="/academics/ece"
                  className="hover:text-blue-500 transition-colors"
                >
                  Electronics & Comm.
                </Link>
              </li>
              <li>
                <Link
                  href="/academics/ee"
                  className="hover:text-blue-500 transition-colors"
                >
                  Electrical Engineering
                </Link>
              </li>
              <li>
                <Link
                  href="/academics/me"
                  className="hover:text-blue-500 transition-colors"
                >
                  Mechanical Engineering
                </Link>
              </li>
              <li>
                <Link
                  href="/academics/ce"
                  className="hover:text-blue-500 transition-colors"
                >
                  Civil Engineering
                </Link>
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

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm">
          <p>
            © {new Date().getFullYear()} {COLLEGE_NAME}. All Rights Reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link
              href="/sitemap"
              className="hover:text-white transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
