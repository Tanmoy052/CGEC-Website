"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Code, 
  Cpu, 
  Lightbulb, 
  Wrench, 
  Building2,
  Users,
  FlaskConical,
  GraduationCap
} from "lucide-react";
import Link from "next/link";

const DEPARTMENTS = [
  {
    name: "Computer Science & Engineering",
    code: "CSE",
    icon: <Code className="w-10 h-10" />,
    color: "bg-blue-600",
    desc: "The Department of Computer Science and Engineering is the most sought-after department at CGEC. It focuses on software development, AI, data science, and networking.",
    labs: ["Data Structures Lab", "AI & Robotics Lab", "Computer Networking Lab", "Cloud Computing Lab"],
    facultyCount: 15,
    students: 240
  },
  {
    name: "Electronics & Communication Engineering",
    code: "ECE",
    icon: <Cpu className="w-10 h-10" />,
    color: "bg-purple-600",
    desc: "The ECE department prepares students for the semiconductor and communication industries, covering VLSI, embedded systems, and 5G technologies.",
    labs: ["VLSI Design Lab", "Digital Signal Processing Lab", "Analog Electronics Lab", "Microprocessor Lab"],
    facultyCount: 12,
    students: 240
  },
  {
    name: "Electrical Engineering",
    code: "EE",
    icon: <Lightbulb className="w-10 h-10" />,
    color: "bg-amber-600",
    desc: "Focused on power systems, electrical machines, and control engineering. The department is a hub for research in renewable energy and smart grids.",
    labs: ["Electrical Machines Lab", "Power Systems Lab", "Control Engineering Lab", "Circuit Theory Lab"],
    facultyCount: 12,
    students: 240
  },
  {
    name: "Mechanical Engineering",
    code: "ME",
    icon: <Wrench className="w-10 h-10" />,
    color: "bg-red-600",
    desc: "Mechanical Engineering deals with the design, manufacturing, and operation of machinery. It is one of the oldest and most diverse engineering branches.",
    labs: ["Thermal Engineering Lab", "Fluid Mechanics Lab", "Manufacturing Technology Lab", "CAD/CAM Lab"],
    facultyCount: 14,
    students: 240
  },
  {
    name: "Civil Engineering",
    code: "CE",
    icon: <Building2 className="w-10 h-10" />,
    color: "bg-emerald-600",
    desc: "Civil Engineering is about building the infrastructure of modern society. From bridges to smart cities, our students learn to build a better future.",
    labs: ["Structural Engineering Lab", "Geotechnical Engineering Lab", "Surveying Lab", "Environmental Engineering Lab"],
    facultyCount: 10,
    students: 240
  }
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
            Our departments offer cutting-edge curriculum, state-of-the-art labs, and a research-oriented environment for holistic development.
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
                    <div className={`w-20 h-20 ${dept.color} text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      {dept.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{dept.name}</h2>
                      <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Department of {dept.code}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-lg leading-relaxed">
                    {dept.desc}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-gray-900 font-bold mb-4 flex items-center">
                        <FlaskConical className="w-5 h-5 mr-2 text-blue-600" />
                        Key Laboratories
                      </h3>
                      <ul className="space-y-2">
                        {dept.labs.map((lab, i) => (
                          <li key={i} className="text-gray-500 flex items-center text-sm">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                            {lab}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-6 rounded-2xl text-center">
                        <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900">{dept.facultyCount}</div>
                        <div className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Faculty</div>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-2xl text-center">
                        <GraduationCap className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900">{dept.students}</div>
                        <div className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Intake</div>
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
                <div className="lg:w-1/3 relative hidden lg:block">
                  <div className={`absolute inset-0 ${dept.color} opacity-5 rounded-3xl`}></div>
                  <div className="h-full flex items-center justify-center p-8">
                    {/* Abstract design elements */}
                    <div className="relative w-full h-full border-4 border-dashed border-gray-100 rounded-3xl flex items-center justify-center">
                       <span className="text-9xl font-black text-gray-100 select-none">{dept.code}</span>
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
