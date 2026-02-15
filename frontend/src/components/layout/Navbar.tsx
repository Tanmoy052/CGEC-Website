"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-md py-2"
            : "bg-transparent py-4",
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative h-12 w-32 overflow-hidden shrink-0">
              <Image
                src="https://cgec.org.in/img/cgec_logo.png"
                alt="CGEC Logo"
                fill
                className="object-contain transform group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative group/dropdown"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.children ? (
                  <button
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 flex items-center space-x-1 uppercase",
                      scrolled
                        ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                        : "text-blue-900 hover:text-blue-600 hover:bg-white/20",
                    )}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        activeDropdown === link.label ? "rotate-180" : "",
                      )}
                    />
                  </button>
                ) : link.href.startsWith("http") ? (
                  <a
                    href={link.href}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 uppercase",
                      scrolled
                        ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                        : "text-blue-900 hover:text-blue-600 hover:bg-white/20",
                    )}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 uppercase",
                      scrolled
                        ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                        : "text-blue-900 hover:text-blue-600 hover:bg-white/20",
                    )}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {link.children && (
                  <div
                    className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-200",
                      activeDropdown === link.label
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2",
                    )}
                  >
                    <div className="bg-[#435356] rounded-lg shadow-2xl py-2 min-w-[240px] relative">
                      {/* Triangle Arrow */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-[#435356]"></div>

                      {link.children.map((child, idx) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className={cn(
                            "block px-6 py-3 text-sm text-white hover:bg-white/10 transition-colors",
                            idx !== link.children.length - 1
                              ? "border-b border-white/10 border-dashed"
                              : "",
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <a href="https://cgec-sms-portal.vercel.app/" className="ml-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-blue-200 active:scale-95">
                Portal
              </button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              scrolled ? "text-gray-900" : "text-blue-900",
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "fixed inset-x-0 top-[72px] bg-white border-t border-gray-100 shadow-xl transition-all duration-300 lg:hidden overflow-hidden",
            isOpen
              ? "max-h-[calc(100vh-72px)] py-6 opacity-100 overflow-y-auto"
              : "max-h-0 py-0 opacity-0",
          )}
        >
          <div className="container mx-auto px-4 flex flex-col space-y-2">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="flex flex-col">
                {link.children ? (
                  <>
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === link.label ? null : link.label,
                        )
                      }
                      className="flex items-center justify-between px-4 py-3 text-lg font-bold text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors uppercase"
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 transition-transform duration-200",
                          activeDropdown === link.label ? "rotate-180" : "",
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "flex flex-col pl-4 overflow-hidden transition-all duration-300",
                        activeDropdown === link.label
                          ? "max-h-[500px] opacity-100 mt-1 mb-2"
                          : "max-h-0 opacity-0",
                      )}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="px-4 py-2 text-base text-gray-600 hover:text-blue-600 border-l-2 border-gray-100 hover:border-blue-600 transition-all"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : link.href.startsWith("http") ? (
                  <a
                    href={link.href}
                    className="px-4 py-3 text-lg font-bold text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors uppercase"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="px-4 py-3 text-lg font-bold text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors uppercase"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-gray-100 mt-2">
              <a
                href="https://cgec-sms-portal.vercel.app/"
                onClick={() => setIsOpen(false)}
              >
                <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg">
                  Portal
                </button>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
