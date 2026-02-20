"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  GraduationCap,
  Building2,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const heroImages = [
  "https://cgec.org.in/img/slider/cgec_acdemic.jpeg",
  "https://cgec.org.in/img/slider/3.jpg",
  "https://cgec.org.in/img/slider/5.jpg",
  "https://www.cgecsportsclub.in/web/image/909-9b45cf31/IMG20231002155319%20-%20SOUMYAJIT_%20BHUNIA_CE.webp",
  "https://www.collegebatch.com/static/clg-gallery/coochbehar-government-engineering-college-cooch-behar-329253.webp",
  "https://media.licdn.com/dms/image/v2/C561BAQEPhsvRkXzwrA/company-background_10000/company-background_10000/0/1598857517758/official_cgec_cover?e=2147483647&v=beta&t=A8UG8KjpX25C16ZD5Ee6-N0zgWy7DfeTiKbEOEzLd9U",
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // Variants for the 3D Cube Rotation + Scale Effect
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      rotateY: direction > 0 ? 45 : -45,
      scale: 1.1, // Start slightly zoomed in
      opacity: 0,
      zIndex: 0,
      filter: "brightness(0.5) blur(8px)", // Cinematic blur on entry
    }),
    center: {
      zIndex: 1,
      x: 0,
      rotateY: 0,
      scale: 1, // Settle at normal scale
      opacity: 1,
      filter: "brightness(1.1) blur(0px)",
      transition: {
        x: {
          type: "spring",
          stiffness: 5000,
          damping: 200,
          duration: 0.000000000000000000000000000000000000001,
        }, // Instant
        rotateY: {
          duration: 0.000000000000000000000000000000000000001,
          ease: "linear",
        },
        scale: { duration: 7, ease: "linear" }, // Keep the slow zoom effect
        opacity: { duration: 0.8 },
        filter: { duration: 0.8 },
      },
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      rotateY: direction < 0 ? 45 : -45,
      scale: 0.9, // Shrink slightly on exit
      opacity: 0,
      filter: "brightness(0.5) blur(8px)",
      transition: {
        x: {
          type: "spring",
          stiffness: 5000,
          damping: 200,
          duration: 0.000000000000000000000000000000000000001,
        },
        rotateY: {
          duration: 0.000000000000000000000000000000000000001,
          ease: "linear",
        },
        scale: { duration: 0.000000000000000000000000000000000000001 },
        opacity: { duration: 0.000000000000000000000000000000000000001 },
        filter: { duration: 0.000000000000000000000000000000000000001 },
      },
    }),
  };

  // Staggered text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.000000000000000000000000000000000000001,
        delayChildren: 0.000000000000000000000000000000000000001,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 5000,
        damping: 200,
        duration: 0.000000000000000000000000000000000000001,
      },
    },
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentImageIndex((prev) =>
      prev === 0 ? heroImages.length - 1 : prev - 1,
    );
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentImageIndex ? 1 : -1);
    setCurrentImageIndex(index);
  };

  return (
    <section
      className="relative h-[90vh] flex items-center overflow-hidden bg-black"
      style={{ perspective: "1500px" }} // Deeper perspective for more wow factor
    >
      {/* Background Carousel */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentImageIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat origin-center backface-hidden"
          style={{
            backgroundImage: `url("${heroImages[currentImageIndex]}")`,
            backgroundSize: heroImages[currentImageIndex].includes("329254")
              ? "contain"
              : "cover",
            backgroundColor: "#000",
          }}
        >
          {/* Inner Vignette for cinematic depth - Soft Blue Tint */}
          <div className="absolute inset-0 bg-blue-500/10 mix-blend-multiply" />
        </motion.div>
      </AnimatePresence>

      {/* Dynamic Overlay with animated gradient - Enhanced Beautiful Blue Tint */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 z-0 bg-gradient-to-r from-blue-600/30 via-sky-400/20 to-blue-600/30 bg-[length:200%_200%] pointer-events-none mix-blend-color-dodge"
      />
      {/* Additional blue wash for unified tint */}
      <div className="absolute inset-0 z-0 bg-blue-600/20 pointer-events-none mix-blend-color" />

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-30">
        <motion.div
          key={currentImageIndex}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 7, ease: "linear" }}
          className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
        />
      </div>

      {/* Navigation Arrows (Glassmorphism) */}
      <button
        onClick={prevSlide}
        className="absolute left-8 z-20 p-4 text-white/80 hover:text-white transition-all hidden md:flex items-center justify-center rounded-full bg-transparent hover:bg-white/10 border border-white/30 group"
      >
        <ChevronLeft className="w-10 h-10 group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-8 z-20 p-4 text-white/80 hover:text-white transition-all hidden md:flex items-center justify-center rounded-full bg-transparent hover:bg-white/10 border border-white/30 group"
      >
        <ChevronRight className="w-10 h-10 group-hover:scale-110 transition-transform" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === currentImageIndex
                ? "bg-blue-400 w-8 shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                : "bg-white/30 w-2 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={itemVariants}
              className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-white uppercase bg-blue-900/90 border border-blue-500 rounded-full backdrop-blur-md shadow-lg"
            >
              New Engineering College
            </motion.span>
            <motion.p
              variants={itemVariants}
              className="text-2xl text-white mb-10 leading-relaxed max-w-2xl font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
            >
              Cooch Behar Government Engineering College provides a platform for
              students to excel in technical education, research, and holistic
              development.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mt-55"
            >
              <Link
                href="/about"
                className="px-8 py-4 bg-blue-600 text-white border border-blue-500 backdrop-blur-md rounded-xl font-bold hover:bg-blue-700 transition-all hover:border-blue-400 shadow-lg"
              >
                Explore Campus
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex gap-12 mt-10 pt-10 border-t border-white/10"
          >
            <div className="text-white group cursor-default">
              <div className="flex items-center space-x-2 mb-2 group-hover:scale-105 transition-transform duration-300">
                <GraduationCap className="w-6 h-6 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                <span className="text-3xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  5+
                </span>
              </div>
              <p className="text-sm text-blue-100 uppercase tracking-widest font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Departments
              </p>
            </div>
            <div className="text-white group cursor-default">
              <div className="flex items-center space-x-2 mb-2 group-hover:scale-105 transition-transform duration-300">
                <Users className="w-6 h-6 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                <span className="text-3xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  1200+
                </span>
              </div>
              <p className="text-sm text-blue-100 uppercase tracking-widest font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Students
              </p>
            </div>
            <div className="text-white group cursor-default">
              <div className="flex items-center space-x-2 mb-2 group-hover:scale-105 transition-transform duration-300">
                <Building2 className="w-6 h-6 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                <span className="text-3xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  10+
                </span>
              </div>
              <p className="text-sm text-blue-100 uppercase tracking-widest font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Laboratories
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          <div className="w-1 h-2 bg-blue-400 rounded-full shadow-[0_0_5px_rgba(96,165,250,0.8)]" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
