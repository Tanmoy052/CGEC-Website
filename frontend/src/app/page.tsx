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
  Library,
  Monitor,
  Projector,
  Building2,
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
      role: "Principal & Associate Professor",
      dept: "Mechanical Engineering",
      message:
        "Excellent facilities in terms of equipment and staffs are available to prepare students as professional Mechanical Engineers.",
      image: "https://cgec.org.in/img/Faculty/ME_Sushovan_Chatterjee.jpg",
    },
    {
      name: "Dr. Palash Das",
      role: "Assistant Professor",
      dept: "Electronics & Comm. Engg.",
      message:
        "I believe that someone's adaptive nature is one of the reasons behind his success. Our students are sufficiently adaptive.",
      image: "https://cgec.org.in/img/Faculty/ECEpalashDas.jpg",
    },
    {
      name: "Dr. Kingshuk Dan",
      role: "Assistant Professor",
      dept: "Civil Engineering",
      message:
        "The aim of the department is to impart the students a sound knowledge of the theory of civil engineering subjects.",
      image: "https://cgec.org.in/img/Faculty/Kingshuk%20Dan.jpg",
    },
    {
      name: "Dr. Somen Mondal  (TPO Head)",
      role: "HOD & Assistant Professor",
      dept: "Electrical Engineering",
      message:
        "The TPO Cell promotes student success through dedicated faculty,industry Alliance,& effective training and placement outcomes.",
      image: "https://cgec.org.in/img/Faculty/Somen_P.jpg",
    },
    // Adding more leaders for carousel
    {
      name: "Prof. Arnab Gain",
      role: "Assistant Professor",
      dept: "Computer Science & Engg.",
      message:
        "Our department is committed to excellence in teaching and research in the field of computer science and technology.",
      image: "https://cgec.org.in/img/Faculty/423-A.jpg",
    },
    {
      name: "Dr. Sourav Chakraborty",
      role: "HOD & Assistant Professor",
      dept: "Electrical Engineering",
      message:
        "We focus on providing a strong foundation in electrical systems and power electronics for sustainable future.",
      image: "https://cgec.org.in/img/Faculty/sourav.png",
    },
    // Adding more leaders for carousel
    {
      name: "Prof. Atanu Maji",
      role: "HOD & Assistant Professor",
      dept: "Computer Science & Engg.",
      message:
        " As HOD (EE), I am committed to academic excellence, practical learning, and preparing our students for successful careers.",
      image: "https://cgec.org.in/img/Faculty/EE_Atanu.jpg",
    },
    {
      name: "Dr. Samik Nag",
      role: "Assistant Professor",
      dept: "Physics",
      message:
        "Basic sciences form the backbone of engineering. We ensure our students have a solid conceptual foundation.",
      image: "https://cgec.org.in/img/Faculty/CHE_Samik_Nag.jpg",
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

  const recruiters = [
    {
      name: "Technext",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVqX3biFjz21ZQdxt9C-EPUjdLvEhobTJaJuEuL0z1&s",
    },
    {
      name: "ICICI Bank",
      logo: "https://www.google.com/s2/favicons?domain=icicibank.com&sz=256",
    },
    {
      name: "Infosys",
      logo: "https://content.linkedin.com/content/dam/me/business/en-us/sales-solutions/resources/images/apac/images/infosys-logo.png.original.png",
    },

    {
      name: "Mindtree",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVe94WjiPTzH2WwFOu3mw5UQU9I5Q_haldfg&s",
    },

    {
      name: "TCS",
      logo: "https://cgec.org.in/img/company_logo/Tata%20Consultancy%20Services.png",
    },
    {
      name: "Cognizant",
      logo: "https://www.google.com/s2/favicons?domain=cognizant.com&sz=256",
    },
    {
      name: "Wipro",
      logo: "https://www.google.com/s2/favicons?domain=wipro.com&sz=256",
    },
    {
      name: "Accenture",
      logo: "https://www.google.com/s2/favicons?domain=accenture.com&sz=256",
    },
    {
      name: "Capgemini",
      logo: "https://cgec.org.in/img/company_logo/Capgemini.jpg",
    },
    {
      name: "HCL",
      logo: "https://www.logo.wine/a/logo/HCL_Technologies/HCL_Technologies-Logo.wine.svg",
    },
    {
      name: "Tech Mahindra",
      logo: "https://architecturehouston.org/wp-content/uploads/2025/04/Logo-Without-Tagline_Blue.png",
    },
    {
      name: "LTI",
      logo: "data:image/png;base64,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",
    },
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
                        "https://www.msruas.ac.in/uploads/blogs/btech-in-civil-engineering-your-pathway-to-monumental-success.webp",
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
            <div className="lg:w-1/2 space-y-8">
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
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-blue-100/50 rounded-3xl blur-2xl -z-10"></div>
              <div className="relative z-10 grid grid-cols-2 gap-4 p-4">
                <div className="space-y-4 pt-8">
                  {/* 21+ Acres Campus */}
                  <div className="aspect-square relative rounded-2xl overflow-hidden group shadow-lg border-4 border-white">
                    <Image
                      src="https://senior-turquoise-aqjtekif9d.edgeone.app/41686705-52d3-4eaf-b9b0-659478904ae3%20(1).png"
                      alt="CGEC Campus"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent flex flex-col justify-end p-6 text-white">
                      <div className="text-4xl font-bold mb-1">21+</div>
                      <div className="text-xs font-bold uppercase tracking-widest opacity-90">
                        Acres Campus
                      </div>
                    </div>
                  </div>

                  {/* 5 B.Tech Programs */}
                  <div className="aspect-[4/3] relative rounded-2xl overflow-hidden group shadow-lg border-4 border-white">
                    <Image
                      src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1000"
                      alt="Engineering Departments"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent flex flex-col justify-end p-6 text-white">
                      <div className="text-4xl font-bold mb-1">5</div>
                      <div className="text-xs font-bold uppercase tracking-widest opacity-90">
                        B.Tech Programs
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {/* 3 Hostels */}
                  <div className="aspect-[4/3] relative rounded-2xl overflow-hidden group shadow-lg border-4 border-white">
                    <Image
                      src="data:image/jpeg;base64,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"
                      alt="Student Hostels"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent flex flex-col justify-end p-6 text-white">
                      <div className="text-4xl font-bold mb-1">5</div>
                      <div className="text-xs font-bold uppercase tracking-widest opacity-90">
                        Hostels
                      </div>
                    </div>
                  </div>

                  {/* 300+ Computers */}
                  <div className="aspect-square relative rounded-2xl overflow-hidden group shadow-lg border-4 border-white">
                    <Image
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"
                      alt="Computer Labs"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent flex flex-col justify-end p-6 text-white">
                      <div className="text-4xl font-bold mb-1">300+</div>
                      <div className="text-xs font-bold uppercase tracking-widest opacity-90">
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
            {recruiters
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
                    <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-3 overflow-hidden border-2 border-white shadow-sm relative">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className={
                          // @ts-ignore
                          testimonial.imageFit || "object-cover object-top"
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
