"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [admissionYear, setAdmissionYear] = useState("2026");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/public/admission`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.activeYear) {
          setAdmissionYear(data.activeYear);
        }
      })
      .catch(() => {});
  }, []);

  const getChildLabel = (child: { label: string; href: string }) => {
    if (child.href.startsWith("/admission") && !child.href.includes("fees")) {
      return `Admission ${admissionYear}`;
    }
    return child.label;
  };

  const getChildHref = (child: { label: string; href: string }) => {
    if (child.href.startsWith("/admission") && !child.href.includes("fees")) {
      return "/admission";
    }
    return child.href;
  };

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300 flex items-center bg-white border-b border-gray-200/90 shadow-sm",
          scrolled ? "h-16 sm:h-20 shadow-md" : "h-16 sm:h-20",
        )}
      >
        <div className="container mx-auto px-4 h-full flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center h-full group py-1.5">
            <div className="relative h-11 sm:h-14 md:h-16 w-48 sm:w-56 md:w-64 overflow-hidden shrink-0 flex items-center justify-start">
              <Image
                src="/img/cgec_logo.png"
                alt="CGEC Logo"
                fill
                className="object-contain transform group-hover:scale-105 transition-transform duration-300 block"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 h-full">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative group/dropdown h-full flex items-center"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.children ? (
                  <button
                    className={cn(
                      "px-3.5 py-2 rounded-full text-xs xl:text-sm font-bold transition-all duration-200 flex items-center gap-1 uppercase leading-none",
                      pathname.startsWith(link.href)
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50/80",
                    )}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        activeDropdown === link.label ? "rotate-180 text-blue-600" : "text-gray-400",
                      )}
                    />
                  </button>
                ) : link.href.startsWith("http") ? (
                  <a
                    href={link.href}
                    className={cn(
                      "px-3.5 py-2 rounded-full text-xs xl:text-sm font-bold transition-all duration-200 uppercase leading-none flex items-center",
                      pathname === link.href
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50/80",
                    )}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "px-3.5 py-2 rounded-full text-xs xl:text-sm font-bold transition-all duration-200 uppercase leading-none flex items-center",
                      pathname === link.href
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50/80",
                    )}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {link.children && (
                  <div
                    className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200",
                      activeDropdown === link.label
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2",
                    )}
                  >
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 py-2 min-w-[240px] relative">
                      {/* Triangle Arrow */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white"></div>

                      {link.children.map((child, idx) => (
                        <Link
                          key={child.label}
                          href={getChildHref(child)}
                          className={cn(
                            "block px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 transition-colors",
                            idx !== link.children.length - 1
                              ? "border-b border-gray-100"
                              : "",
                          )}
                        >
                          {getChildLabel(child)}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <a
              href="https://cgec-sms-portal.vercel.app/"
              className="ml-4 h-full flex items-center"
            >
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-blue-200 active:scale-95 flex items-center justify-center">
                Portal
              </button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-xl text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "fixed inset-x-0 top-16 sm:top-20 bg-white border-t border-gray-100 shadow-2xl transition-all duration-300 lg:hidden overflow-hidden z-40",
            isOpen
              ? "max-h-[calc(100dvh-4rem)] sm:max-h-[calc(100dvh-5rem)] py-6 opacity-100 overflow-y-auto"
              : "max-h-0 py-0 opacity-0 pointer-events-none",
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
                          href={getChildHref(child)}
                          className="px-4 py-2 text-base text-gray-600 hover:text-blue-600 border-l-2 border-gray-100 hover:border-blue-600 transition-all"
                          onClick={() => setIsOpen(false)}
                        >
                          {getChildLabel(child)}
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
