"use client";

import React, { useState } from "react";
import Hero from "@/components/home/Hero";
import NoticeBoard from "@/components/home/NoticeBoard";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Quote,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [recruiterIndex, setRecruiterIndex] = useState(0);
  const [leadershipIndex, setLeadershipIndex] = useState(0);

  const leaders = [
    {
      name: "Dr. Sushovan Chatterjee",
      role: "Principal",
      dept: "Mechanical Engineering",
      message:
        "Excellent facilities in terms of equipment and staffs are available to prepare students as professional Mechanical Engineers.",
    },
    {
      name: "Dr. Palash Das",
      role: "HOD & Assistant Professor",
      dept: "Electronics & Comm. Engg.",
      message:
        "I believe that someone's adaptive nature is one of the reasons behind his success. Our students are sufficiently adaptive.",
    },
    {
      name: "Dr. Kingshuk Dan",
      role: "Assistant Professor",
      dept: "Civil Engineering",
      message:
        "The aim of the department is to impart the students a sound knowledge of the theory of civil engineering subjects.",
    },
    {
      name: "Prof. S. Sengupta",
      role: "Assistant Professor",
      dept: "Electrical Engineering",
      message:
        "We focus on providing a strong foundation in electrical systems and power electronics for sustainable future.",
    },
    // Adding more leaders for carousel
    {
      name: "Prof. A. Ray",
      role: "HOD & Assistant Professor",
      dept: "Computer Science & Engg.",
      message:
        "Our department is committed to excellence in teaching and research in the field of computer science and technology.",
    },
    {
      name: "Dr. M. K. Ghosh",
      role: "Assistant Professor",
      dept: "Physics",
      message:
        "Basic sciences form the backbone of engineering. We ensure our students have a solid conceptual foundation.",
    },
  ];

  const testimonials = [
    {
      name: "Sagnik Banik",
      role: "2020 passout",
      dept: "CSE",
      text: "A Model Engineering College. Clean bright classrooms, highly configured computer labs, modern library, workshops, graphics labs. A very rare govt engineering college.",
    },
    {
      name: "Rounak das",
      role: "2020 passout",
      dept: "EE",
      text: "Well furnished classroom facilities, laboratories, workshops, hostels, mess and great infrastructure. Provides a great atmosphere to study learn and to become successful.",
    },
    {
      name: "Anubrata Sengupta",
      role: "2020 passout",
      dept: "EE",
      text: "A new bud in the educational field of Bengal. Hope it will flourish as the center of excellence of North Bengal. A perfect place to study, learn and increase knowledge.",
    },
    {
      name: "Manas Kumar Kundu",
      role: "2020 passout",
      dept: "ECE",
      text: "Very very excellent college.... I'm a student of this college. All teachers and students are very close to each other. No words for this college..",
    },
    {
      name: "Rahul Sharma",
      role: "2021 passout",
      dept: "ME",
      text: "The mechanical workshops are world-class. The hands-on experience I gained here helped me secure a position at a top manufacturing firm.",
    },
    {
      name: "Priya Singh",
      role: "2022 passout",
      dept: "CE",
      text: "The faculty in the Civil department is extremely supportive. The structural labs are equipped with the latest testing machinery.",
    },
    {
      name: "Sneha Mukherjee",
      role: "2021 passout",
      dept: "CSE",
      text: "The coding culture here is growing rapidly. Seniors are very helpful and the placement cell works tirelessly for student success.",
    },
    {
      name: "Amit Kumar",
      role: "2023 passout",
      dept: "EE",
      text: "CGEC has provided me with not just an engineering degree but a life-changing experience. The campus life and extracurriculars are amazing.",
    },
  ];

  const recruiters = [
    "HiTechnext",
    "ICICI Bank",
    "Infosys",
    "inSync",
    "Mindtree",
    "Nineleaps",
    "TCS",
    "Cognizant",
    "Wipro",
    "Accenture",
    "Capgemini",
    "HCL",
    "Tech Mahindra",
    "LTI",
  ];

  const nextLeadership = () => {
    setLeadershipIndex((prev) => (prev + 4 >= leaders.length ? 0 : prev + 4));
  };

  const prevLeadership = () => {
    setLeadershipIndex((prev) =>
      prev - 4 < 0 ? Math.max(0, leaders.length - 4) : prev - 4,
    );
  };

  const nextTestimonial = () => {
    setTestimonialIndex((prev) =>
      prev + 4 >= testimonials.length ? 0 : prev + 4,
    );
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) =>
      prev - 4 < 0 ? Math.max(0, testimonials.length - 4) : prev - 4,
    );
  };

  const nextRecruiter = () => {
    setRecruiterIndex((prev) => (prev + 6 >= recruiters.length ? 0 : prev + 6));
  };

  const prevRecruiter = () => {
    setRecruiterIndex((prev) =>
      prev - 6 < 0 ? Math.max(0, recruiters.length - 6) : prev - 6,
    );
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Principal & HOD Messages Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                MESSAGES FROM OUR LEADERSHIP
              </h2>
              <div className="w-24 h-1.5 bg-blue-600 mx-auto md:mx-0 rounded-full"></div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={prevLeadership}
                className="p-2 rounded-full border border-gray-200 hover:bg-blue-600 hover:text-white transition-all bg-white shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextLeadership}
                className="p-2 rounded-full border border-gray-200 hover:bg-blue-600 hover:text-white transition-all bg-white shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaders
              .slice(leadershipIndex, leadershipIndex + 4)
              .map((leader, i) => (
                <div
                  key={i}
                  className="bg-gray-50 p-6 rounded-3xl border border-gray-100 relative group hover:bg-blue-900 hover:text-white transition-all duration-500 shadow-lg shadow-gray-200/50 animate-fadeIn"
                >
                  <Quote className="w-10 h-10 text-blue-600/10 absolute top-4 right-6 group-hover:text-white/10" />
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold mb-1 leading-tight">
                      {leader.name}
                    </h3>
                    <p className="text-blue-600 font-semibold text-[10px] mb-4 group-hover:text-blue-300 uppercase tracking-wider">
                      {leader.role}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed italic group-hover:text-gray-100 line-clamp-4">
                      &quot;{leader.message}&quot;
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Quick Links & Notices Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-12 h-1 bg-blue-600 mr-4 rounded-full"></span>
                  WELCOME TO CGEC
                </h2>
                <div className="prose prose-blue lg:prose-lg text-gray-600 max-w-none leading-relaxed">
                  <p className="font-medium text-gray-900 text-xl mb-4">
                    &quot;तमसो मा ज्योतिर्गमय&quot; - From darkness, lead me to
                    enlightenment.
                  </p>
                  <p>
                    The college is situated in a prime location in the Cooch
                    Behar District. The college, being well connected from any
                    part of the Cooch Behar city, enables the student&apos;s
                    easy access. The college is approved by AICTE and Maulana
                    Abul Kalam Azad University of Technology, West Bengal
                    (Formerly known as West Bengal University of Technology) –
                    WBUT and Government of India and the Department of Higher
                    Education, Government of West Bengal.
                  </p>
                  <p>
                    The Institute is located at its own sprawling campus of 21
                    acres and the Institute has state-of-the-art laboratories,
                    experienced faculties, and extensive computer facilities
                    coupled with a high-tech teaching learning tools. Cooch
                    Behar Government Engineering College (CGEC) is also
                    committed making significant contributions in local
                    developmental projects and enriching the quality of life for
                    the people around it.
                  </p>
                </div>
                <Link
                  href="/about"
                  className="inline-flex items-center text-blue-600 font-bold mt-6 hover:translate-x-2 transition-transform"
                >
                  Read More About Us <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>

              {/* OUR COURSES Section (Image 2 Style) */}
              <div className="pt-8">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                    <span className="w-12 h-1 bg-blue-600 mr-4 rounded-full"></span>
                    OUR COURSES
                  </h2>
                  <div className="flex space-x-2">
                    <button className="p-2 rounded-full border border-gray-200 hover:bg-blue-600 hover:text-white transition-all">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-full border border-gray-200 hover:bg-blue-600 hover:text-white transition-all">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      name: "BTech in Computer Science & Engineering",
                      image:
                        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop",
                      fees: "1000/- Per Month",
                    },
                    {
                      name: "BTech in Electronics & Communication Engineering",
                      image:
                        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
                      fees: "1000/- Per Month",
                    },
                    {
                      name: "BTech in Mechanical Engineering",
                      image:
                        "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800&auto=format&fit=crop",
                      fees: "500/- Per Month",
                    },
                    {
                      name: "BTech in Electrical Engineering",
                      image:
                        "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?w=800&auto=format&fit=crop",
                      fees: "500/- Per Month",
                    },
                    {
                      name: "BTech in Civil Engineering",
                      image:
                        "https://www.msruas.ac.in/uploads/blogs/btech-in-civil-engineering-your-pathway-to-monumental-success.webp",
                      fees: "500/- Per Month",
                    },
                  ].map((course, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
                    >
                      <div className="h-48 overflow-hidden relative bg-gray-100">
                        {/* Fallback gradient in case image fails */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-200 animate-pulse"></div>
                        <Image
                          src={course.image}
                          alt={course.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500 relative z-10"
                        />
                        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold z-20">
                          B.Tech
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 h-12 line-clamp-2">
                          {course.name}
                        </h3>
                        <div className="pt-4 border-t border-gray-50">
                          <p className="text-blue-700 font-bold">
                            Semester Fees :{" "}
                            <span className="text-gray-900">{course.fees}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar / Notice Board */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <NoticeBoard />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section (Shortened) */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl font-extrabold text-gray-900 leading-tight uppercase tracking-tight">
                WORLD-CLASS FACILITIES FOR <br />
                <span className="text-blue-600">FUTURE ENGINEERS</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Modern Library",
                    desc: "7000+ volumes of reference books.",
                  },
                  {
                    title: "Central Computing",
                    desc: "140+ high-speed computers.",
                  },
                  {
                    title: "Smart Learning",
                    desc: "Digital boards & projectors.",
                  },
                  { title: "Campus", desc: "21-acre sprawling campus." },
                ].map((feature, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex-shrink-0 flex items-center justify-center mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-gray-500">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative scale-90">
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-8">
                  <div className="aspect-square bg-blue-600 rounded-2xl p-6 text-white flex flex-col justify-end">
                    <div className="text-3xl font-bold">21+</div>
                    <div className="text-[10px] font-medium uppercase tracking-wider">
                      Acres Campus
                    </div>
                  </div>
                  <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-100"></div>
                  </div>
                  <div className="aspect-square bg-blue-900 rounded-2xl p-6 text-white flex flex-col justify-end">
                    <div className="text-3xl font-bold">300+</div>
                    <div className="text-[10px] font-medium uppercase tracking-wider">
                      Computers
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { label: "Faculty Members", value: "60+" },
              { label: "Graduated Students", value: "1500+" },
              { label: "Highest Package", value: "21 LPA" },
              { label: "Campus Area", value: "21 Acres" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-5xl font-extrabold mb-4">{stat.value}</div>
                <div className="text-blue-300 font-medium tracking-widest uppercase text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruiters Section (Image 3) */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-blue-900 uppercase tracking-wider mb-4">
                OUR RECRUITERS
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto md:mx-0"></div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={prevRecruiter}
                className="p-2 rounded-full border border-gray-200 hover:bg-blue-600 hover:text-white transition-all bg-white shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextRecruiter}
                className="p-2 rounded-full border border-gray-200 hover:bg-blue-600 hover:text-white transition-all bg-white shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-10 lg:gap-16 min-h-[100px]">
            {recruiters
              .slice(recruiterIndex, recruiterIndex + 6)
              .map((recruiter, i) => (
                <div
                  key={i}
                  className="text-xl font-black text-gray-300 hover:text-blue-600 transition-all duration-300 cursor-default select-none tracking-tighter animate-fadeIn"
                >
                  {recruiter.toUpperCase()}
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section (Image 3) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-blue-900 uppercase tracking-wider mb-4">
                WHAT OUR STUDENT SAYS
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto md:mx-0"></div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full border border-gray-200 hover:bg-blue-600 hover:text-white transition-all bg-white shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full border border-gray-200 hover:bg-blue-600 hover:text-white transition-all bg-white shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {testimonials
              .slice(testimonialIndex, testimonialIndex + 4)
              .map((testimonial, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center animate-fadeIn"
                >
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-50 mb-6 relative min-h-[160px] flex items-center">
                    <p className="text-sm text-gray-600 leading-relaxed italic text-center">
                      &quot;{testimonial.text}&quot;
                    </p>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rotate-45 border-r border-b border-gray-50 shadow-lg"></div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 overflow-hidden border-2 border-white shadow-sm">
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                        <Users className="w-8 h-8 text-blue-400" />
                      </div>
                    </div>
                    <h4 className="font-bold text-base text-blue-900 leading-tight">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                    <p className="text-[11px] text-blue-600 font-bold uppercase tracking-tighter">
                      {testimonial.dept}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
