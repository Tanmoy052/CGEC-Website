"use client";

import React from "react";
import { motion } from "framer-motion";
import { History, Target, Eye, Award, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-blue-900 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-800/20 skew-x-12 transform origin-bottom"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6"
          >
            About CGEC
          </motion.h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            A beacon of technical excellence and innovation in North Bengal,
            committed to nurturing global engineering leaders.
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-3 text-blue-600 mb-4">
                <History className="w-6 h-6" />
                <span className="font-bold uppercase tracking-widest text-sm">
                  Our Legacy
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Established with a Vision for the Future
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Cooch Behar Government Engineering College was established in
                  2016 by the Higher Education Department, Government of West
                  Bengal. It was a historic moment for the Cooch Behar district,
                  bringing premium technical education to the doorstep of
                  students in North Bengal.
                </p>
                <p>
                  The Institute is located at its own sprawling campus of 21
                  acres and the Institute has state-of-the-art laboratories,
                  experienced faculties, and extensive computer facilities
                  coupled with a high-tech teaching learning tools. Cooch Behar
                  Government Engineering College (CGEC) is also committed making
                  significant contributions in local developmental projects and
                  enriching the quality of life for the people around it.
                </p>
                <p>
                  Spanning across a lush green campus, the college has rapidly
                  evolved into a center for academic rigor and creative
                  exploration. Our state-of-the-art infrastructure and dedicated
                  faculty ensure that students receive the best possible
                  preparation for their professional careers.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl relative h-[500px]">
                <Image
                  src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="College Campus"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-blue-600 text-white p-8 rounded-2xl shadow-xl hidden md:block">
                <div className="text-4xl font-bold mb-1">21</div>
                <div className="text-sm font-medium text-blue-100 uppercase tracking-widest">
                  Acres Campus
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white p-12 rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100"
            >
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                <Eye className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                To emerge as a premier technical institution that provides
                quality education and research, fostering innovation and ethical
                leadership to meet the evolving needs of the global society.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white p-12 rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100"
            >
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                <Target className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Our Mission
              </h3>
              <ul className="space-y-4">
                {[
                  "Provide a dynamic academic environment for excellence.",
                  "Encourage research, innovation, and entrepreneurship.",
                  "Collaborate with industries for practical exposure.",
                  "Nurture social responsibility and ethical values.",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start space-x-3 text-gray-600"
                  >
                    <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Accreditation */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Affiliations & Accreditations
          </h2>
          <div className="flex flex-wrap justify-center gap-12 opacity-70">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Award className="w-12 h-12 text-blue-600" />
              </div>
              <span className="font-bold text-gray-900 uppercase tracking-widest text-sm">
                AICTE Approved
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Award className="w-12 h-12 text-blue-600" />
              </div>
              <span className="font-bold text-gray-900 uppercase tracking-widest text-sm">
                MAKAUT Affiliated
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Award className="w-12 h-12 text-blue-600" />
              </div>
              <span className="font-bold text-gray-900 uppercase tracking-widest text-sm">
                WB Govt Owned
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
