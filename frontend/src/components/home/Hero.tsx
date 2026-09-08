"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  Building2,
  Users,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  FileText,
  Calendar,
  MapPin,
  QrCode,
  ExternalLink,
  Sparkles,
  X,
  Maximize2,
} from "lucide-react";
import { API_URL } from "@/lib/constants";

interface HeroSlide {
  id?: string;
  image: string;
  tag: string;
  title: string;
  subtitle?: string | null;
  description: string;
  isCustom?: boolean;
  badgeColor?: string | null;
  primaryBtnText?: string | null;
  primaryBtnLink?: string | null;
  secondaryBtnText?: string | null;
  secondaryBtnLink?: string | null;
  eventDate?: string | null;
  venue?: string | null;
  qrCodeImage?: string | null;
}

const defaultSlides: HeroSlide[] = [
  {
    image: "/img/hero/slider-1.jpg",
    tag: "Government Engineering Institution",
    title: "Cooch Behar Government Engineering College",
    description:
      "A premier institution providing a platform for students to excel in technical education, research, and holistic engineering innovation.",
  },
  {
    image: "/img/hero/slider-2.jpg",
    tag: "Excellence in Technology",
    title: "World-Class Infrastructure & Labs",
    description:
      "Equipped with modern laboratories, research centers, and cutting-edge facilities to foster next-generation engineers.",
  },
  {
    image: "/img/hero/slider-3.jpg",
    tag: "Vibrant Campus Life",
    title: "Nurturing Future Leaders",
    description:
      "A dynamic campus fostering technical excellence, active sports clubs, cultural fests, and holistic personality growth.",
  },
  {
    image: "/img/hero/slider-4.webp",
    tag: "Academic Excellence",
    title: "Dedicated Faculty & Research",
    description:
      "Mentored by distinguished professors committed to academic rigor, hands-on learning, and industry collaboration.",
  },
  {
    image: "/img/hero/slider-5.jpg",
    tag: "Career & Placements",
    title: "Bridging Academics to Industry",
    description:
      "Proven track record of placements across top national & global technology giants and premier public sector undertakings.",
  },
];

interface ApiHeroSlide {
  id: string;
  bgImage: string;
  badge?: string | null;
  badgeColor?: string | null;
  title: string;
  subtitle?: string | null;
  description: string;
  primaryBtnText?: string | null;
  primaryBtnLink?: string | null;
  secondaryBtnText?: string | null;
  secondaryBtnLink?: string | null;
  eventDate?: string | null;
  venue?: string | null;
  qrCodeImage?: string | null;
}

const Hero = () => {
  const [slides, setSlides] = useState<HeroSlide[]>(defaultSlides);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [expandedQr, setExpandedQr] = useState<string | null>(null);

  // Fetch custom active hero slides from backend API
  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        const res = await fetch(`${API_URL}/public/hero-slides`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            // Map backend slide format to HeroSlide format
            const customSlides: HeroSlide[] = data.map((item: ApiHeroSlide) => ({
              id: item.id,
              image: item.bgImage,
              tag: item.badge || "Special Announcement",
              title: item.title,
              subtitle: item.subtitle,
              description: item.description,
              isCustom: true,
              badgeColor: item.badgeColor || "blue",
              primaryBtnText: item.primaryBtnText,
              primaryBtnLink: item.primaryBtnLink,
              secondaryBtnText: item.secondaryBtnText,
              secondaryBtnLink: item.secondaryBtnLink,
              eventDate: item.eventDate,
              venue: item.venue,
              qrCodeImage: item.qrCodeImage,
            }));

            // Custom slides always come first, followed by default college slides
            setSlides([...customSlides, ...defaultSlides]);
          }
        }
      } catch (err) {
        // Silently fallback to default campus slides on error
        console.warn("Could not load dynamic hero slides, using defaults:", err);
      }
    };

    fetchHeroSlides();
  }, []);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isPaused || expandedQr) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused, expandedQr]);

  const currentSlide = slides[currentIndex] || defaultSlides[0];

  const getBadgeStyle = (color?: string | null) => {
    switch (color) {
      case "purple":
        return {
          wrapper: "text-purple-200 bg-purple-950/70 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]",
          dot: "bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]",
        };
      case "cyan":
        return {
          wrapper: "text-cyan-200 bg-cyan-950/70 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]",
          dot: "bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]",
        };
      case "emerald":
        return {
          wrapper: "text-emerald-200 bg-emerald-950/70 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
          dot: "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]",
        };
      case "amber":
        return {
          wrapper: "text-amber-200 bg-amber-950/70 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]",
          dot: "bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]",
        };
      case "rose":
        return {
          wrapper: "text-rose-200 bg-rose-950/70 border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.3)]",
          dot: "bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.8)]",
        };
      default:
        return {
          wrapper: "text-blue-200 bg-blue-900/60 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.3)]",
          dot: "bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]",
        };
    }
  };

  const badgeStyle = getBadgeStyle(currentSlide.badgeColor);

  return (
    <section
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-slate-950 text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with smooth crossfade & Ken Burns effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.1, ease: "easeInOut" },
              scale: { duration: 6, ease: "easeOut" },
            }}
            className="absolute inset-0"
          >
            <Image
              src={currentSlide.image}
              alt={currentSlide.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Multi-layered Cinematic Gradients for Rich Contrast & Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/40 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50 z-[1]" />
        <div className="absolute inset-0 bg-blue-950/20 mix-blend-color-dodge z-[1] pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
          {/* Left Column: Heading, Subtitle, Description, CTA */}
          <div className="max-w-3xl flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Badge & Subtitle */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wider uppercase border rounded-full backdrop-blur-md ${badgeStyle.wrapper}`}
                  >
                    <span className={`w-2 h-2 rounded-full animate-pulse ${badgeStyle.dot}`} />
                    <span>{currentSlide.tag}</span>
                  </div>

                  {currentSlide.subtitle && (
                    <span className="text-xs sm:text-sm font-semibold text-blue-300 tracking-wide uppercase">
                      {currentSlide.subtitle}
                    </span>
                  )}
                </div>

                {/* Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-5 drop-shadow-md">
                  {currentSlide.title}
                </h1>

                {/* Event Date & Venue Chips (For hackathons / fests / special occasions) */}
                {(currentSlide.eventDate || currentSlide.venue) && (
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    {currentSlide.eventDate && (
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-white/20 text-blue-200 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-md">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <span>{currentSlide.eventDate}</span>
                      </div>
                    )}
                    {currentSlide.venue && (
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-white/20 text-slate-200 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-md">
                        <MapPin className="w-4 h-4 text-rose-400" />
                        <span>{currentSlide.venue}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Description */}
                <p className="text-base sm:text-lg md:text-xl text-slate-200 mb-8 leading-relaxed max-w-2xl font-medium drop-shadow">
                  {currentSlide.description}
                </p>

                {/* Call-to-Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 mb-10">
                  {currentSlide.isCustom ? (
                    <>
                      {/* Dynamic Primary Button */}
                      {currentSlide.primaryBtnText && currentSlide.primaryBtnLink ? (
                        currentSlide.primaryBtnLink.startsWith("http") ? (
                          <a
                            href={currentSlide.primaryBtnLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold transition-all duration-200 shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(37,99,235,0.7)] hover:-translate-y-0.5 active:translate-y-0"
                          >
                            <span>{currentSlide.primaryBtnText}</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        ) : (
                          <Link
                            href={currentSlide.primaryBtnLink}
                            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold transition-all duration-200 shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(37,99,235,0.7)] hover:-translate-y-0.5 active:translate-y-0"
                          >
                            <span>{currentSlide.primaryBtnText}</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        )
                      ) : (
                        <Link
                          href="/about"
                          className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:-translate-y-0.5"
                        >
                          <span>Explore Campus</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}

                      {/* Dynamic Secondary Button */}
                      {currentSlide.secondaryBtnText && currentSlide.secondaryBtnLink ? (
                        currentSlide.secondaryBtnLink.startsWith("http") ? (
                          <a
                            href={currentSlide.secondaryBtnLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 backdrop-blur-md rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
                          >
                            <FileText className="w-4 h-4 text-blue-300" />
                            <span>{currentSlide.secondaryBtnText}</span>
                          </a>
                        ) : (
                          <Link
                            href={currentSlide.secondaryBtnLink}
                            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 backdrop-blur-md rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
                          >
                            <FileText className="w-4 h-4 text-blue-300" />
                            <span>{currentSlide.secondaryBtnText}</span>
                          </Link>
                        )
                      ) : (
                        <Link
                          href="/placement/brochure"
                          className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 backdrop-blur-md rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
                        >
                          <FileText className="w-4 h-4 text-blue-300" />
                          <span>Placement Brochure</span>
                        </Link>
                      )}

                      {/* Mobile QR trigger button if QR is available */}
                      {currentSlide.qrCodeImage && (
                        <button
                          onClick={() => setExpandedQr(currentSlide.qrCodeImage || null)}
                          className="lg:hidden inline-flex items-center gap-2 px-5 py-3.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 border border-purple-500/40 rounded-xl font-semibold backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                        >
                          <QrCode className="w-4 h-4 text-purple-400" />
                          <span>Scan QR</span>
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      {/* Default College Slide Buttons */}
                      <Link
                        href="/about"
                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <span>Explore Campus</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <Link
                        href="/placement/brochure"
                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 backdrop-blur-md rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
                      >
                        <FileText className="w-4 h-4 text-blue-300" />
                        <span>Placement Brochure</span>
                      </Link>
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Key Stats Counter */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-white/15 max-w-xl">
              <div className="group cursor-default">
                <div className="flex items-center space-x-2.5 mb-1.5">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">5+</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-medium tracking-wide">
                  B.Tech Departments
                </p>
              </div>

              <div className="group cursor-default">
                <div className="flex items-center space-x-2.5 mb-1.5">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 group-hover:scale-110 transition-transform">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">1200+</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-medium tracking-wide">
                  Enrolled Students
                </p>
              </div>

              <div className="group cursor-default">
                <div className="flex items-center space-x-2.5 mb-1.5">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 group-hover:scale-110 transition-transform">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">15+</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-medium tracking-wide">
                  Hi-Tech Laboratories
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Floating QR Card for Hackathons / Fests */}
          {currentSlide.qrCodeImage && (
            <div className="hidden lg:flex flex-col items-center justify-center shrink-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative group p-5 rounded-3xl bg-slate-900/80 hover:bg-slate-900/95 border border-purple-500/40 backdrop-blur-xl shadow-2xl shadow-purple-950/50 transition-all hover:scale-105"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-1 shrink-0 whitespace-nowrap">
                  <Sparkles className="w-3 h-3" />
                  <span>Scan to Register</span>
                </div>

                {/* QR Display Container */}
                <div
                  onClick={() => setExpandedQr(currentSlide.qrCodeImage || null)}
                  className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden bg-white p-2.5 shadow-inner mt-2 cursor-pointer"
                >
                  <Image
                    src={currentSlide.qrCodeImage}
                    alt="Registration QR Code"
                    fill
                    className="object-contain p-1.5"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-2 rounded-xl bg-slate-950/80 text-white text-xs font-bold flex items-center gap-1 backdrop-blur-md">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Click to Zoom</span>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-3">
                  <p className="text-xs font-bold text-slate-200">Instant Event Registration</p>
                  <p className="text-[10px] text-slate-400">Scan with any smartphone camera</p>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Glassmorphic Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="hidden sm:flex absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg group items-center justify-center cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="hidden sm:flex absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg group items-center justify-center cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Bottom Indicators & Progress Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2.5 px-4 py-2 rounded-full bg-slate-950/50 backdrop-blur-md border border-white/10">
        {slides.map((s, index) => (
          <button
            key={s.id || index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentIndex
                ? "bg-blue-500 w-8 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                : "bg-white/30 hover:bg-white/60 w-2"
            }`}
          />
        ))}
      </div>

      {/* Linear Auto-play Progress Bar at Bottom of Section */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-30">
        <motion.div
          key={currentIndex}
          initial={{ width: "0%" }}
          animate={{ width: isPaused || expandedQr ? "0%" : "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
        />
      </div>

      {/* QR Code Lightbox Modal */}
      {expandedQr && (
        <div
          onClick={() => setExpandedQr(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-4"
          >
            <button
              onClick={() => setExpandedQr(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
              <QrCode className="w-3.5 h-3.5" />
              <span>Event Registration QR</span>
            </div>

            <div className="relative w-64 h-64 mx-auto rounded-2xl overflow-hidden bg-white p-4 shadow-xl">
              <Image
                src={expandedQr}
                alt="Registration QR Code"
                fill
                className="object-contain p-2"
              />
            </div>

            <div>
              <h4 className="text-base font-bold text-white mb-1">Scan with Smartphone</h4>
              <p className="text-xs text-slate-400">
                Point your mobile camera at this QR code to quickly access the event details or registration portal.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
