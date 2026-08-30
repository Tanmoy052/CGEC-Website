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
  Sparkles,
} from "lucide-react";

interface HeroSlide {
  image: string;
  tag: string;
  title: string;
  description: string;
}

const slides: HeroSlide[] = [
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

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

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
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Multi-layered Cinematic Gradients for Rich Contrast & Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/30 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50 z-[1]" />
        <div className="absolute inset-0 bg-blue-950/20 mix-blend-color-dodge z-[1] pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-16">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 text-xs sm:text-sm font-semibold tracking-wider text-blue-200 uppercase bg-blue-900/60 border border-blue-500/40 rounded-full backdrop-blur-md shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                <span>{slides[currentIndex].tag}</span>
              </div>

              {/* Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-5 drop-shadow-md">
                {slides[currentIndex].title}
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg md:text-xl text-slate-200 mb-8 leading-relaxed max-w-2xl font-medium drop-shadow">
                {slides[currentIndex].description}
              </p>

              {/* Call-to-Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Explore Campus</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/admission"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 backdrop-blur-md rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Admissions 2026</span>
                </Link>
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
      </div>

      {/* Glassmorphic Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg group"
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg group"
      >
        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Bottom Indicators & Progress Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2.5 px-4 py-2 rounded-full bg-slate-950/50 backdrop-blur-md border border-white/10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
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
          animate={{ width: isPaused ? "0%" : "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
        />
      </div>
    </section>
  );
};

export default Hero;
