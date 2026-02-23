"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Code,
  Cpu,
  Lightbulb,
  Wrench,
  Building2,
  Users,
  FlaskConical,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";

const DEPARTMENTS = [
  {
    name: "Computer Science & Engineering",
    code: "CSE",
    icon: <Code className="w-10 h-10" />,
    color: "bg-blue-800",
    textColor: "text-blue-800",
    desc: "The Department of Computer Science and Engineering is the most sought-after department at CGEC. It focuses on software development, AI, data science, and networking.",
    labs: [
      "Data Structures Lab",
      "AI & Robotics Lab",
      "Computer Networking Lab",
      "Cloud Computing Lab",
    ],
    facultyCount: 7,
    students: 240,
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
  },
  {
    name: "Electronics & Communication Engineering",
    code: "ECE",
    icon: <Cpu className="w-10 h-10" />,
    color: "bg-purple-800",
    textColor: "text-purple-800",
    desc: "The ECE department prepares students for the semiconductor and communication industries, covering VLSI, embedded systems, and 5G technologies.",
    labs: [
      "VLSI Design Lab",
      "Digital Signal Processing Lab",
      "Analog Electronics Lab",
      "Microprocessor Lab",
    ],
    facultyCount: 7,
    students: 240,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
  },
  {
    name: "Electrical Engineering",
    code: "EE",
    icon: <Lightbulb className="w-10 h-10" />,
    color: "bg-amber-700",
    textColor: "text-amber-700",
    desc: "Focused on power systems, electrical machines, and control engineering. The department is a hub for research in renewable energy and smart grids.",
    labs: [
      "Power Systems Lab",
      "Electrical Machines Lab",
      "Control Systems Lab",
      "High Voltage Lab",
    ],
    facultyCount: 7,
    students: 240,
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop",
  },
  {
    name: "Mechanical Engineering",
    code: "ME",
    icon: <Wrench className="w-10 h-10" />,
    color: "bg-red-800",
    textColor: "text-red-800",
    desc: "The ME department offers comprehensive training in thermal engineering, design, and manufacturing. Students gain hands-on experience in modern workshops.",
    labs: [
      "Thermodynamics Lab",
      "Fluid Mechanics Lab",
      "CAD/CAM Lab",
      "Workshop Technology",
    ],
    facultyCount: 7,
    students: 240,
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop",
  },
  {
    name: "Civil Engineering",
    code: "CE",
    icon: <Building2 className="w-10 h-10" />,
    color: "bg-emerald-800",
    textColor: "text-emerald-800",
    desc: "The CE department focuses on structural engineering, geotechnics, and environmental engineering, preparing students for infrastructure development.",
    labs: [
      "Concrete Technology Lab",
      "Soil Mechanics Lab",
      "Surveying Lab",
      "Environmental Engg Lab",
    ],
    facultyCount: 7,
    students: 240,
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop",
  },
  {
    name: "Basic Science & Humanities",
    code: "BSH",
    icon: <FlaskConical className="w-10 h-10" />,
    color: "bg-sky-700",
    textColor: "text-sky-700",
    desc: "The BSH department provides a strong foundation in applied sciences and humanities, essential for engineering education.",
    labs: ["Physics Lab", "Chemistry Lab", "Language Lab", "Mathematics Lab"],
    facultyCount: 7,
    students: 240,
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
];

const AcademicsPage = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-blue-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6"
          >
            Academic Excellence
          </motion.h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Our departments offer cutting-edge curriculum, state-of-the-art
            labs, and a research-oriented environment for holistic development.
          </p>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {DEPARTMENTS.map((dept, index) => (
              <motion.div
                key={dept.code}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col lg:flex-row gap-12 p-8 md:p-12 rounded-[2rem] border border-gray-100 shadow-2xl shadow-blue-900/5 hover:shadow-blue-900/10 transition-all bg-white overflow-hidden group"
              >
                {/* Left Side - Info */}
                <div className="lg:w-2/3 space-y-8">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-20 h-20 ${dept.color} text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      {dept.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">
                        {dept.name}
                      </h2>
                      <span
                        className={`${dept.textColor} font-bold tracking-widest uppercase text-sm`}
                      >
                        Department of {dept.code}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-lg leading-relaxed">
                    {dept.desc}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-gray-900 font-bold mb-4 flex items-center">
                        <FlaskConical
                          className={`w-5 h-5 mr-2 ${dept.textColor}`}
                        />
                        Key Laboratories
                      </h3>
                      <ul className="space-y-2">
                        {dept.labs.map((lab, i) => (
                          <li
                            key={i}
                            className="text-gray-500 flex items-center text-sm"
                          >
                            <span
                              className={`w-1.5 h-1.5 ${dept.color} rounded-full mr-2`}
                            ></span>
                            {lab}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-6 rounded-2xl text-center">
                        <Users
                          className={`w-6 h-6 ${dept.textColor} mx-auto mb-2`}
                        />
                        <div className="text-2xl font-bold text-gray-900">
                          {dept.facultyCount}
                        </div>
                        <div className="text-xs text-gray-400 uppercase font-bold tracking-tighter">
                          Faculty
                        </div>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-2xl text-center">
                        <GraduationCap
                          className={`w-6 h-6 ${dept.textColor} mx-auto mb-2`}
                        />
                        <div className="text-2xl font-bold text-gray-900">
                          {dept.students}
                        </div>
                        <div className="text-xs text-gray-400 uppercase font-bold tracking-tighter">
                          Intake
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link
                      href={`/academics/${dept.code.toLowerCase()}`}
                      className={`inline-flex items-center px-8 py-4 ${dept.color} text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-xl`}
                    >
                      Visit Department Portal
                    </Link>
                  </div>
                </div>

                {/* Right Side - Image/Decoration */}
                <div className="lg:w-1/3 relative hidden lg:block min-h-[400px]">
                  <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl m-2">
                    <Image
                      src={dept.image}
                      alt={dept.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div
                      className={`absolute inset-0 ${dept.color} mix-blend-multiply opacity-30`}
                    ></div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                      <span className="text-6xl font-black text-white/20 select-none absolute bottom-4 right-4">
                        {dept.code}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AcademicsPage;
