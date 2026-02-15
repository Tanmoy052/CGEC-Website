"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, GraduationCap, Building2, Users } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden">
      {/* Background with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-blue-100 uppercase bg-blue-600/30 border border-blue-400/30 rounded-full backdrop-blur-sm">
              Empowering Future Engineers
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Shaping Excellence <br />
              <span className="text-blue-400">Through Innovation</span>
            </h1>
            <p className="text-xl text-blue-50 mb-10 leading-relaxed max-w-2xl">
              Cooch Behar Government Engineering College provides a platform for
              students to excel in technical education, research, and holistic
              development.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/admission"
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold flex items-center space-x-2 hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20"
              >
                <span>Admission 2025</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 bg-white/10 text-white border border-white/20 backdrop-blur-md rounded-xl font-bold hover:bg-white/20 transition-all"
              >
                Explore Campus
              </Link>
            </div>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/10"
          >
            <div className="text-white">
              <div className="flex items-center space-x-2 mb-2">
                <GraduationCap className="w-5 h-5 text-blue-400" />
                <span className="text-2xl font-bold">5+</span>
              </div>
              <p className="text-sm text-blue-200 uppercase tracking-widest">
                Departments
              </p>
            </div>
            <div className="text-white">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-2xl font-bold">1200+</span>
              </div>
              <p className="text-sm text-blue-200 uppercase tracking-widest">
                Students
              </p>
            </div>
            <div className="text-white">
              <div className="flex items-center space-x-2 mb-2">
                <Building2 className="w-5 h-5 text-blue-400" />
                <span className="text-2xl font-bold">10+</span>
              </div>
              <p className="text-sm text-blue-200 uppercase tracking-widest">
                Laboratories
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
