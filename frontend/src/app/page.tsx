"use client";

import React, { useState, useEffect } from "react";
import Hero from "@/components/home/Hero";
import NoticeBoard from "@/components/home/NoticeBoard";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Library,
  Monitor,
  Projector,
  Building2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { API_URL } from "@/lib/constants";

export default function Home() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [recruiterIndex, setRecruiterIndex] = useState(0);
  const [leadershipIndex, setLeadershipIndex] = useState(0);



  const DEFAULT_LEADERS = [
    {
      name: "Dr. Sushovan Chatterjee",
      role: "Principal & Associate Professor",
      dept: "Mechanical Engineering",
      message:
        "Welcome to Cooch Behar Government Engineering College. We foster technical innovation, academic rigor, and ethical citizenship across all engineering disciplines.",
      image: "/img/about_img.webp",
    },
  ];

  const testimonials = [
    {
      name: "Arpan Maity",
      role: "2027 passout",
      dept: "EE",
      text: "The EE department at CGEC is known for its hands-on approach to learning. The students have the opportunity to work on real-world projects and gain practical experience.",
      image: "/img/alumni/arpan_maity.jpeg",
    },
    {
      name: "Pritam Laskar",
      role: "2027 passout",
      dept: "ECE",
      text: "The ECE department at CGEC is known for its strong emphasis on practical learning. The students have the opportunity to work on real-world projects and gain hands-on experience.",
      image: "/img/alumni/pritam_laskar.jpeg",
    },
    {
      name: "Subhojit Gorain",
      role: "2027 passout",
      dept: "CSE",
      text: "The coding culture here is growing rapidly. Seniors are very helpful and the placement cell works tirelessly for student success.",
      image: "/img/alumni/Subhajit_Gorain.jpeg?v=1",
      imageFit: "object-contain object-center",
    },
    {
      name: "Tanmoy Pal",
      role: "2027 passout",
      dept: "CSE",
      text: "CGEC has provided me with not just an engineering degree but a life-changing experience. The campus life and extracurriculars are amazing.",
      image: "/img/alumni/tanmoy_pal.png",
    },
    {
      name: "Sagnik Banik",
      role: "2020 passout",
      dept: "CSE",
      text: "A Model Engineering College. Clean bright classrooms, highly configured computer labs, modern library, workshops, graphics labs. A very rare govt engineering college.",
      image: "/img/alumni/CSE_Sagnik_Banik.jpg",
    },
    {
      name: "Rounak das",
      role: "2020 passout",
      dept: "EE",
      text: "Well furnished classroom facilities, laboratories, workshops, hostels, mess and great infrastructure. Provides a great atmosphere to study learn and to become successful.",
      image: "/img/alumni/EE_Rounak%20Das.jpg",
    },
    {
      name: "Anubrata Sengupta",
      role: "2020 passout",
      dept: "EE",
      text: "A new bud in the educational field of Bengal. Hope it will flourish as the center of excellence of North Bengal. A perfect place to study, learn and increase knowledge.",
      image: "/img/alumni/EE_ANUBRATA%20SENGUPTA.jpg",
    },
    {
      name: "Manas Kumar Kundu",
      role: "2020 passout",
      dept: "ECE",
      text: "Very very excellent college.... I'm a student of this college. All teachers and students are very close to each other. No words for this college..",
      image: "/img/alumni/ECE_MANAS%20KUMAR%20KUNDU.jpg",
    },
  ];

  const DEFAULT_RECRUITERS: { name: string; logo: string }[] = [];

  const [leaders, setLeaders] = useState(DEFAULT_LEADERS);
  const [recruiters, setRecruiters] = useState(DEFAULT_RECRUITERS);

  useEffect(() => {
    fetch(`${API_URL}/public/leadership`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setLeaders(data);
        }
      })
      .catch(() => {});

    fetch(`${API_URL}/public/recruiters`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setRecruiters(data);
        }
      })
      .catch(() => {});
  }, []);

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
                  className="bg-gray-50 p-6 rounded-3xl border border-gray-100 relative group hover:bg-blue-900 hover:text-white transition-all duration-500 shadow-lg shadow-gray-200/50 animate-fadeIn pt-12"
                >
                  <div className="absolute top-0 right-6 -translate-y-1/2 w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-100">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold mb-1 leading-tight min-h-[3.5rem] flex items-end pb-1">
                      {leader.name}
                    </h3>
                    <p className="text-blue-600 font-semibold text-[10px] mb-4 group-hover:text-blue-300 uppercase tracking-wider min-h-[2rem] flex items-center">
                      {leader.role}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed italic group-hover:text-gray-100 line-clamp-4 min-h-[6rem]">
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
                      slug: "cse",
                      image:
                        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop",
                      fees: "1000/- Per Month",
                    },
                    {
                      name: "BTech in Electronics & Comm. Engineering",
                      slug: "ece",
                      image:
                        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
                      fees: "1000/- Per Month",
                    },
                    {
                      name: "BTech in Mechanical Engineering",
                      slug: "me",
                      image:
                        "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800&auto=format&fit=crop",
                      fees: "500/- Per Month",
                    },
                    {
                      name: "BTech in Electrical Engineering",
                      slug: "ee",
                      image:
                        "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?w=800&auto=format&fit=crop",
                      fees: "500/- Per Month",
                    },
                    {
                      name: "BTech in Civil Engineering",
                      slug: "ce",
                      image:
                        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop",
                      fees: "500/- Per Month",
                    },
                    {
                      name: "Basic Science & Humanities",
                      slug: "bsh",
                      image:
                        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                    },
                  ].map((course, i) => (
                    <Link
                      href={`/academics/${course.slug}`}
                      key={i}
                      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group block cursor-pointer"
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
                        {course.slug !== "bsh" && (
                          <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold z-20">
                            B.Tech
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 h-12 line-clamp-2">
                          {course.name}
                        </h3>
                        <div className="pt-4 border-t border-gray-50">
                          <p className="text-blue-700 font-bold">
                            {course.slug !== "bsh" && "Semester Fees : "}
                            <span className="text-gray-900">{course.fees}</span>
                          </p>
                        </div>
                      </div>
                    </Link>
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

      {/* Facilities Section (Enhanced) */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50/50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="relative">
                <h2 className="text-4xl font-extrabold text-gray-900 leading-tight tracking-tight mb-2">
                  WORLD-CLASS FACILITIES FOR <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                    FUTURE ENGINEERS
                  </span>
                </h2>
                <div className="w-24 h-1.5 bg-blue-600 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    title: "Modern Library",
                    desc: "7000+ volumes of reference books.",
                    icon: Library,
                  },
                  {
                    title: "Central Computing",
                    desc: "140+ high-speed computers.",
                    icon: Monitor,
                  },
                  {
                    title: "Smart Learning",
                    desc: "Digital boards & projectors.",
                    icon: Projector,
                  },
                  {
                    title: "Sprawling Campus",
                    desc: "21-acre green campus.",
                    icon: Building2,
                  },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-xl text-gray-900 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm font-medium">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative mt-4 lg:mt-0">
              <div className="absolute -inset-4 bg-blue-100/50 rounded-3xl blur-2xl -z-10"></div>
              <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4 p-2 sm:p-4">
                <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8">
                  {/* 21+ Acres Campus */}
                  <div className="aspect-square min-h-[140px] sm:min-h-[180px] relative rounded-2xl overflow-hidden group shadow-lg border-2 sm:border-4 border-white">
                    <Image
                      src="/img/hero/slider-1.jpg"
                      alt="CGEC Campus"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent flex flex-col justify-end p-3 sm:p-6 text-white">
                      <div className="text-2xl sm:text-4xl font-bold mb-0.5 sm:mb-1">21+</div>
                      <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest opacity-90">
                        Acres Campus
                      </div>
                    </div>
                  </div>

                  {/* 5 B.Tech Programs */}
                  <div className="aspect-[4/3] min-h-[120px] sm:min-h-[150px] relative rounded-2xl overflow-hidden group shadow-lg border-2 sm:border-4 border-white">
                    <Image
                      src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1000"
                      alt="Engineering Departments"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent flex flex-col justify-end p-3 sm:p-6 text-white">
                      <div className="text-2xl sm:text-4xl font-bold mb-0.5 sm:mb-1">5</div>
                      <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest opacity-90">
                        B.Tech Programs
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {/* 5 Hostels */}
                  <div className="aspect-[4/3] min-h-[120px] sm:min-h-[150px] relative rounded-2xl overflow-hidden group shadow-lg border-2 sm:border-4 border-white">
                    <Image
                      src="/img/hero/slider-3.jpg"
                      alt="Student Hostels"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent flex flex-col justify-end p-3 sm:p-6 text-white">
                      <div className="text-2xl sm:text-4xl font-bold mb-0.5 sm:mb-1">5</div>
                      <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest opacity-90">
                        Hostels
                      </div>
                    </div>
                  </div>

                  {/* 300+ Computers */}
                  <div className="aspect-square min-h-[140px] sm:min-h-[180px] relative rounded-2xl overflow-hidden group shadow-lg border-2 sm:border-4 border-white">
                    <Image
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"
                      alt="Computer Labs"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent flex flex-col justify-end p-3 sm:p-6 text-white">
                      <div className="text-2xl sm:text-4xl font-bold mb-0.5 sm:mb-1">300+</div>
                      <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest opacity-90">
                        Computers
                      </div>
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
              { label: "Faculty Members", value: "40+" },
              { label: "Graduated Students", value: "15000+" },
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
            {recruiters.length > 0 ? (
              recruiters
                .slice(recruiterIndex, recruiterIndex + 6)
                .map((recruiter, i) => (
                  <div
                    key={i}
                    className="relative w-32 h-16 transition-all duration-300 hover:scale-110 flex items-center justify-center animate-fadeIn"
                  >
                    <Image
                      src={recruiter.logo}
                      alt={recruiter.name}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                ))
            ) : (
              <p className="text-gray-400 text-sm font-medium py-4">
                Recruiter details will be updated shortly.
              </p>
            )}
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
                    <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-3 overflow-hidden border-2 border-white shadow-sm relative">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className={
                          (testimonial as { imageFit?: string }).imageFit || "object-cover object-top"
                        }
                        unoptimized
                      />
                    </div>
                    <h4 className="font-bold text-lg text-blue-900 leading-tight mb-1">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <p className="text-sm text-blue-600 font-bold uppercase tracking-tighter">
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
