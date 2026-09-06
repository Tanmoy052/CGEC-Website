"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Loader2,
  ChevronRight,
  GraduationCap,
  Building2,
  Phone,
  BookOpen,
  Trophy,
  Microscope,
  Users,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── KNOWLEDGE BASE ──────────────────────────────────────────────────────────

const KB = {
  college: {
    name: "Cooch Behar Government Engineering College (CGEC)",
    shortName: "CGEC",
    established: "2016 (16th August 2016)",
    campus: "21-acre green campus at Harinchawra, Panchanan Barma University Road, Cooch Behar — 736101, West Bengal",
    affiliation: "MAKAUT (Maulana Abul Kalam Azad University of Technology), formerly WBUT",
    approval: "AICTE Approved",
    motto: "\"तमसो मा ज्योतिर्गमय\" — From darkness, lead me to enlightenment",
    governedBy: "Higher Education Department, Government of West Bengal",
    vision: "To develop technically competent and ethically sound engineers who contribute meaningfully to society and industry.",
    mission: [
      "Provide quality technical education aligned with global standards",
      "Promote research, innovation and industry collaboration",
      "Ensure holistic development of students through co-curricular activities",
    ],
    phone: "03582-233040",
    email: "principalofficecgec@gmail.com",
    website: "https://cgec.org.in",
    library: "https://www.cgeclibrary.org.in/",
    location: "Harinchawra, Panchanan Barma University Road, Cooch Behar, West Bengal – 736101",
    locationMapLink: "https://maps.google.com/?q=Cooch+Behar+Government+Engineering+College",
  },

  leadership: {
    principal: {
      name: "Dr. Sushovan Chatterjee",
      dept: "Mechanical Engineering",
      qualification: "BME (Hons.) (JU), MME (JU), PhD (IIT Guwahati), MIE (India)",
      specialization: "Design and thermal optimization of chemical process, IC engines",
      message: "Excellent facilities in terms of equipment and staff are available to prepare students as professional Mechanical Engineers with a focus on innovation.",
    },
    registrar: {
      name: "Dr. Kingshuk Dan",
      dept: "Civil Engineering",
      role: "Registrar (I/C)",
    },
    tpo: {
      name: "Prof. Somen Mondal",
      role: "Training & Placement Officer (TPO) — Head",
      phone: "9331892632",
      email: "placement@cgec.org.in",
    },
  },

  departments: {
    cse: {
      name: "Computer Science & Engineering",
      shortName: "CSE",
      hod: "Dr. Somen Mondal",
      hodQual: "B.Tech., M.Tech. | Cloud Computing, Advanced Cryptography & Network Security | Experience: 9 Years",
      focus: ["Software Development", "Artificial Intelligence & ML", "Machine Learning & Deep Learning", "Cloud Computing", "Cybersecurity & Network Security", "Big Data", "Image Processing", "Web Technology", "Computer Networks", "DBMS"],
      labs: [
        "Computer Center — 100 computers (i5, 4/8GB RAM)",
        "Language Lab — 40 computers (i5 processor)",
        "Computer Programming Lab-1 — 36 computers (Ubuntu/Windows)",
        "Computer Programming Lab-2 — 36 computers (DBMS, OOP Labs)",
        "Computer Programming Lab-3 — 36 computers (AI, Internet Tech Labs)",
      ],
      faculty: [
        "Dr. Somen Mondal — HOD & Asst. Prof | Cloud Computing, Cryptography",
        "Mr. Arnab Gain — Asst. Prof | Computer Vision, Deep Learning, DAA",
        "Mr. Shahid Ali — Technical Asst | C, C++, Java, VB | 9 yrs exp",
        "Mr. Pranab Kumar Mallick — Technical Asst | Data Structure, Image Processing | 7 yrs",
        "Mr. Umakanta Bera — Technical Asst | Python, C, Java, DS | 7 yrs",
        "Prof. Supriyo Banerjee — Asst. Prof | B.Tech, M.Tech | 10 yrs",
        "Dr. Prabir Kr. Naskar — Asst. Prof | B.Tech, M.Tech, Ph.D | 9 yrs",
      ],
      wallMag: "The Wall — Creative magazine for CSE students",
      pageUrl: "/academics/cse",
    },
    ece: {
      name: "Electronics & Communication Engineering",
      shortName: "ECE",
      hod: "Dr. Sourav Chakraborty",
      hodQual: "Ph.D(Engg), M.Tech, B.Tech | VLSI design, Signal Processing, Wireless Systems | Teaching: 12 yrs",
      focus: ["VLSI Design", "Embedded Systems", "IoT", "Digital Signal Processing (DSP)", "5G Communication", "Analog Circuit Design", "Wireless Systems", "Microprocessors", "Robotics (Robotica Club)"],
      labs: [
        "Basic Electronics Lab — MAKAUT syllabus compliant",
        "Solid State Lab",
        "Analog Electronics Lab",
        "EM Theory & Transmission Lines Lab",
        "Digital Electronics & Integrated Circuits Lab",
      ],
      faculty: [
        "Dr. Sourav Chakraborty — HOD & Asst. Prof | VLSI, Signal Processing | 12 yrs",
        "Dr. Gautam Das — Professor | Digital Circuits, Microprocessor | Ph.D Engg | 17.5 yrs",
        "Dr. Palash Das — Asst. Prof | GaN HEMT, HRXRD | Ph.D IIT Kharagpur | Research: 11 yrs",
        "Mr. Rajib Das — Asst. Prof | Control Systems, Signal Processing | M.E.Tel.E | 6 yrs",
        "Mr. Soumik Sarkar — Technical Asst | Solid State, Analog Electronics | 5 yrs",
        "Mr. Avisek Nandi — Technical Asst | Power Electronics | 10 yrs",
        "Mr. Abhijit Sarma — Technical Asst | ECE | 5 yrs",
      ],
      wallMag: "ElectroWaves — Creative magazine for ECE students",
      pageUrl: "/academics/ece",
    },
    ee: {
      name: "Electrical Engineering",
      shortName: "EE",
      hod: "Prof. Atanu Maji",
      hodQual: "B.Tech., M.E. | Power Systems | Teaching: 11 Years",
      focus: ["Power Systems", "Smart Grids", "Renewable Energy", "Electrical Machines & Drives", "Control Systems", "Power Electronics", "Electric Vehicle Technology", "Simulation & Modelling"],
      labs: [
        "Basic Electrical Lab",
        "Electric Circuit Theory Lab",
        "Electrical & Electronics Measurement Lab",
        "Electrical Machine-I & II Labs",
        "Power System-I & II Labs",
        "Control System Lab",
        "Power Electronics Lab",
        "Electric Drives Lab",
        "Simulation Lab",
      ],
      faculty: [
        "Prof. Atanu Maji — HOD & Asst. Prof | Power System | B.Tech, M.E. | 11 yrs",
        "Mr. Sk Rabiul Hossain — OIC & Asst. Prof | Power Electronics & Drives | 3 yrs",
        "Mr. Tanumay Halder — Asst. Prof | Illumination Engineering | B.Tech, M.E. | 7 yrs",
        "Mr. Deepjyoti Santra — Assoc. Prof | Electrical Machines | M.Tech | 7 yrs",
        "Dr. Goutam Kumar Panda — Professor | Electrical Machines & Drives | Ph.D | 31 yrs teaching",
        "Mr. Sk Mafizul Islam — Assoc. Prof | Power System | M.Tech | 26 yrs",
        "Mr. Sujay Sarkar — Technical Asst | Diploma in EE | 9 yrs teaching + 5 yrs industry",
      ],
      wallMag: "Electra — Creative magazine for EE students",
      pageUrl: "/academics/ee",
    },
    me: {
      name: "Mechanical Engineering",
      shortName: "ME",
      hod: "Prof. Prasenjit Das",
      hodQual: "M.E. in Mechanical Engineering | Machine Design | 5 yrs teaching",
      focus: ["Thermodynamics", "Fluid Mechanics", "CAD/CAM", "Robotics", "Manufacturing Technology", "Machine Design", "Composite Materials", "Automobile Engineering", "Production Engineering"],
      labs: [
        "Workshop — Lathe, milling, drilling machines",
        "Fluid Mechanics Lab — Flow measurement & fluid properties",
        "Manufacturing Technology Lab — Advanced manufacturing processes",
        "Material Testing Lab — Mechanical properties of materials",
        "Thermal Engineering Lab — Heat transfer & thermodynamics",
        "CAD/CAM Lab — Computer-aided design & manufacturing",
      ],
      faculty: [
        "Dr. Sushovan Chatterjee — Principal & Assoc. Prof | IC Engines, Design | Ph.D IIT Guwahati | 12 yrs",
        "Prof. Prasenjit Das — HOD & Asst. Prof | Machine Design | M.E. | 5 yrs",
        "Mr. Gyan Tshering Lepcha — Asst. Prof | Production, Auto Engg | B.Tech, MBA, MTech | 8 yrs",
        "Mr. Sudipta Roy — Asst. Prof | Production Engg, Composites | B.Tech, MME, PhD(Pursuing) | 12 yrs",
        "Dr. Masud Rana — Asst. Prof | Machine Design, Biomechanics | M.E IIEST, Ph.D | 4 yrs",
        "Dr. Sanchayan Mukherjee — Assoc. Prof | Heat Transfer, Refrigeration | Ph.D JU | 29 yrs",
        "Mr. Provas Barua — Technical Asst | Quality Control | Diploma ME | 9 yrs",
        "Mr. Nikhilesh Das — Technical Asst | Diploma ME | 3 yrs",
        "Mr. Ziaul Rahaman — Technical Asst | Diploma ME | 3 yrs",
      ],
      wallMag: "Mechanix — Creative magazine for ME students",
      pageUrl: "/academics/me",
    },
    ce: {
      name: "Civil Engineering",
      shortName: "CE",
      hod: "Prof. Biren Gurung",
      hodQual: "BE, M.Tech | Structural Engineering | 9 yrs teaching",
      focus: ["Structural Engineering", "Geotechnical Engineering", "Transportation Engineering", "Water Resources Engineering", "Environmental Engineering", "Earthquake Engineering", "Surveying", "Smart City Development"],
      labs: [
        "Concrete Lab — Construction material testing",
        "Solid Mechanics Lab — Stress and strain analysis",
        "Surveying Practice — Land surveying techniques",
        "Fluid Mechanics Lab — Fluid flow and hydraulics",
        "Engineering Geology Lab — Rocks and minerals",
        "Soil Mechanics Lab — Soil properties and foundation engineering",
      ],
      faculty: [
        "Prof. Biren Gurung — HOD & Asst. Prof | Structural Engineering | BE, M.Tech | 9 yrs",
        "Dr. Kingshuk Dan — Asst. Prof & Registrar(I/C) | Soil Mechanics, Transportation | Ph.D | 8 yrs",
        "Mr. Md Asif Sk — Asst. Prof | Water Resources, Hydraulic Structures | B.Tech, M.E. | 4 yrs",
        "Mr. Shyamal Ghosh — Asst. Prof | Structural Dynamics, Earthquake Engg | Ph.D, M.E.(BESU) | 1 yr teach + 3 yrs research",
        "Mr. Chhandamay Ray — Asst. Prof | Soil Mechanics & Foundation | M.Tech | 5 yrs",
        "Mr. Mithun Mandal — Asst. Prof | Geotechnical Engineering | M.Tech | 5 yrs",
        "Mr. Ansarul Seikh — Technical Asst | Diploma CE | 3 yrs",
      ],
      wallMag: "CivilLines — Creative magazine for CE students",
      pageUrl: "/academics/ce",
    },
    bsh: {
      name: "Basic Science & Humanities",
      shortName: "BSH",
      hod: "Dr. Samik Nag",
      focus: ["Engineering Physics", "Engineering Chemistry", "Engineering Mathematics", "Professional Communication", "Environmental Science", "Engineering Drawing"],
      labs: [
        "Physics Lab — Optics, mechanics, electricity experiments",
        "Chemistry Lab — Titrations, qualitative analysis, material testing",
        "Language Lab — Communication skills, NPTEL resources",
      ],
      faculty: [
        "Dr. Samik Nag — Assoc. Prof | Chemistry, Physics | BSH",
        "Mr. Arghya Chakraborty — Asst. Prof | BSH (TPO Rep)",
        "Mr. Biplab Maity — Asst. Prof | BSH",
        "Mr. Tanmay Banerjee — Asst. Prof | BSH",
        "Mr. Md Salim Reza — Asst. Prof | BSH",
      ],
      wallMag: "Scientia — Creative magazine for BSH",
      pageUrl: "/academics/bsh",
    },
  },

  admission: {
    btech: "B.Tech (1st Year) — Admission via WBJEE (West Bengal Joint Entrance Examination) rank. Centralized counselling by WBJEE Board.",
    lateral: "Lateral Entry (2nd Year / 3rd Semester) — Admission via JELET (Joint Entrance for Lateral Entry to B.Tech) rank.",
    process: [
      "Step 1: Appear in WBJEE / JELET examination",
      "Step 2: Register on WBJEEB counselling portal",
      "Step 3: Fill in college/branch preferences",
      "Step 4: Await seat allotment based on rank & category",
      "Step 5: Report to allotted college with documents",
    ],
    docs: "10th & 12th marksheets, WBJEE rank card, category certificate (if applicable), ID proof, passport photos",
    seats: "CSE: 60, ECE: 60, EE: 60, ME: 60, CE: 60 (approx per year)",
  },

  fees: {
    btech: "₹1,000/- per month for CSE & ECE | ₹500/- per month for EE, ME, CE (Government subsidized rates)",
    annual: "Approximately ₹6,000 – ₹12,000 per year (depending on branch)",
    hostel: "Approx ₹14,700 – ₹15,000 per year (including security deposit, mess charges)",
    scholarships: [
      "SC/ST Merit Scholarship — Government of West Bengal",
      "OBC Merit Scholarship",
      "Minority Scholarship",
      "Swami Vivekananda Merit Cum Means Scholarship",
      "Post-Matric Scholarship",
      "INSPIRE Scholarship (for top WBJEE rankers)",
    ],
    payment: "Payments via official government portals or Demand Draft. No cash payments.",
  },

  placement: {
    tpoHead: "Prof. Somen Mondal",
    tpoPhone: "9331892632",
    tpoEmail: "placement@cgec.org.in",
    highestPackage: "21 LPA",
    avgPackage: "4–6 LPA (approx)",
    topRecruiters: [
      "TCS (Tata Consultancy Services)",
      "Infosys",
      "Cognizant",
      "Wipro",
      "HCL Technologies",
      "Tech Mahindra",
      "Mindtree",
      "LTI (Larsen & Toubro Infotech)",
      "ICICI Bank",
      "WBSEDCL",
    ],
    training: ["Aptitude & Reasoning", "Soft Skills & Communication", "Mock Interviews", "GD (Group Discussion)", "Coding Rounds", "Resume Building Workshops"],
    representatives: [
      "Prof. Atanu Maji (EE) — 9734762149 | atanudgp@outlook.com",
      "Prof. Rajib Das (ECE) — 9163309694 | rajibdasece@gmail.com",
      "Prof. Masud Rana (ME) — 9851012790 | masud.rana@cgec.org.in",
      "Prof. Chhandamay Ray (CE) — 9903194589 | chhandamayray@yahoo.com",
      "Prof. Arghya Chakraborty (BSH) — 8617455414 | pikaiarghya@gmail.com",
    ],
  },

  infrastructure: {
    computing: "140+ high-performance computers across campus (Central Computing Facility + departmental labs)",
    library: "7,000+ volumes; digital reading room; NPTEL resources; available at cgeclibrary.org.in",
    hostels: "5 dedicated hostels on campus — Boys & Girls hostels; mess facility available",
    sportsGround: "Cricket ground, volleyball court, football field, badminton court",
    internet: "High-speed Wi-Fi campus-wide; LAN in all labs",
    transport: "Nearest railway station: Cooch Behar Railway Station (~5 km). Auto-rickshaws and buses available.",
    location: "Harinchawra, Panchanan Barma University Road, Cooch Behar, West Bengal – 736101",
    canteen: "On-campus canteen with subsidized meals",
    medical: "First aid facility on campus",
  },

  committees: [
    { name: "Academic Committee", url: "/committee/academic" },
    { name: "Anti-Ragging Committee", url: "/committee/anti-ragging" },
    { name: "Anti-Ragging Squad", url: "/committee/anti-ragging-squard" },
    { name: "Internal Complaint Committee (ICC)", url: "/committee/icc" },
    { name: "Committee for SC & ST", url: "/committee/sc-st" },
    { name: "Grievance Redressal Committee (GRC)", url: "/committee/grc" },
    { name: "Institute Industry Cell (IIC)", url: "/committee/iic" },
    { name: "Internal Quality Assurance Cell (IQAC)", url: "/committee/iqac" },
    { name: "Student Grievance Redressal Committee", url: "/committee/student-grc" },
    { name: "Student Counsellor", url: "/committee/counsellor" },
  ],

  studentLife: {
    fest: "Zeal — Annual Technical & Cultural Extravaganza",
    clubs: ["Robotica Club (ECE)", "Coding Club (CSE)", "NSS Unit", "Sports Club", "Wall Magazine Editorial Teams"],
    wallMagazines: {
      cse: "The Wall",
      ece: "ElectroWaves",
      ee: "Electra",
      me: "Mechanix",
      ce: "CivilLines",
    },
  },
};

// ─── RESPONSE ENGINE (NLP & FUZZY MATCHING) ──────────────────────────────────

const STOP_WORDS = new Set([
  // WH-words
  "what", "which", "who", "whom", "whose", "where", "when", "why", "how",
  // Auxiliary verbs & to-be
  "is", "am", "are", "was", "were", "be", "been", "being",
  "do", "does", "did",
  "have", "has", "had",
  "can", "could", "would", "should", "will", "shall", "may", "might", "must",
  // Articles & prepositions
  "a", "an", "the", "and", "or", "to", "for", "in", "on", "at", "by", "from",
  "with", "about", "into", "through", "during", "before", "after", "above", "below",
  "of", "off", "over", "under", "again", "further", "then", "once",
  // Pronouns & conversational fillers
  "i", "you", "he", "she", "it", "we", "they", "me", "him", "her", "us", "them",
  "my", "your", "his", "their", "our",
  "this", "that", "these", "those",
  "there", "here", "any", "both", "each", "few", "more", "most", "some",
  "tell", "show", "give", "please", "want", "know", "need", "like",
  "detail", "details", "info", "information", "let", "cgec"
]);

function cleanPunctuation(text: string): string {
  return text
    .replace(/[`.:;"'?!,\-_()[\]{}/\\*&%$#@~^+<>|=]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasWord(text: string, ...words: string[]): boolean {
  return words.some((w) => {
    const escaped = w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, "i").test(text);
  });
}

function contains(text: string, ...keywords: string[]): boolean {
  return keywords.some((kw) => text.includes(kw));
}

function stemWord(word: string): string {
  if (word.length <= 3) return word;
  const w = word.toLowerCase();
  if (w === "departments") return "department";
  if (w === "branches") return "branch";
  if (w === "faculties") return "faculty";
  if (w === "professors") return "professor";
  if (w === "teachers") return "teacher";
  if (w === "admissions") return "admission";
  if (w === "placements") return "placement";
  if (w === "hostels") return "hostel";
  if (w === "libraries") return "library";
  if (w === "syllabi" || w === "syllabuses") return "syllabus";
  if (w === "fees") return "fee";
  if (w === "laboratories" || w === "labs") return "lab";
  if (w === "trainings") return "training";
  if (w === "internships") return "internship";
  if (w === "notices") return "notice";
  if (w === "courses") return "course";
  if (w === "scholarships") return "scholarship";
  if (w === "exams" || w === "examinations") return "exam";

  if (w.endsWith("ies") && w.length > 5) return w.slice(0, -3) + "y";
  if (w.endsWith("es") && w.length > 4 && !w.endsWith("ces") && !w.endsWith("ges")) return w.slice(0, -2);
  if (w.endsWith("ing") && w.length > 5) return w.slice(0, -3);
  if (w.endsWith("ed") && w.length > 4) return w.slice(0, -2);
  if (w.endsWith("s") && !w.endsWith("ss") && w.length > 3) return w.slice(0, -1);
  return w;
}

function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = [];
  for (let i = 0; i <= m; i++) dp[i] = [i];
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[m][n];
}

function tokenSimilarity(a: string, b: string): number {
  if (a === b) return 1.0;
  if (!a || !b) return 0.0;
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1.0;
  if (a.length <= 3 || b.length <= 3) {
    return a === b ? 1.0 : 0.0;
  }
  const dist = levenshteinDistance(a, b);
  return Math.max(0, 1 - dist / maxLen);
}

interface PreprocessedQuery {
  raw: string;
  cleaned: string;
  rawTokens: string[];
  tokens: string[];
}

function preprocessQuery(raw: string): PreprocessedQuery {
  const cleaned = cleanPunctuation(raw.toLowerCase());
  const rawTokens = cleaned.split(/\s+/).filter(Boolean);
  const filteredTokens = rawTokens
    .filter((t) => !STOP_WORDS.has(t))
    .map((t) => stemWord(t));
  return {
    raw,
    cleaned,
    rawTokens,
    tokens: filteredTokens.length > 0 ? filteredTokens : rawTokens.map(stemWord),
  };
}

interface BotIntent {
  id: string;
  title: string;
  keywords: string[];
  negativeKeywords?: string[];
  priorityMatch?: (prep: PreprocessedQuery, q: string) => number;
  generate: () => { content: string; suggestions: string[] };
}

const INTENTS: BotIntent[] = [
  // 1. GREETING
  {
    id: "greeting",
    title: "Greeting & Welcome",
    keywords: ["hello", "hi", "hey", "greet", "greetings", "good morning", "good evening", "good afternoon", "namaste"],
    priorityMatch: (prep, q) => {
      if (/^(hi|hello|hey|namaste)\b/i.test(q) || /^(good\s+(morning|afternoon|evening))/i.test(q)) return 1.0;
      return 0;
    },
    generate: () => ({
      content: `### 👋 Welcome to CGEC Smart Assistant!

I'm the official AI assistant of **Cooch Behar Government Engineering College**. I can help you with:

🎓 **Academics** — Departments, Faculty, Labs, Syllabus
📋 **Admission** — WBJEE Process, Eligibility, Documents
💰 **Fees & Scholarships** — Fee structure, available scholarships
🏆 **Placements** — Top recruiters, packages, TPO contacts
🏫 **Infrastructure** — Hostels, Library, Labs, Campus facilities
📢 **Notices & Events** — College fest, clubs, activities

What would you like to know?`,
      suggestions: ["Admission Process", "Fee Structure", "All Departments", "Placement Records"],
    }),
  },

  // 2. ABOUT COLLEGE
  {
    id: "about_college",
    title: "About CGEC College Profile",
    keywords: ["about cgec", "about college", "overview cgec", "history cgec", "established", "founded", "institution", "mission", "vision", "motto", "affiliation", "makaut", "aicte", "government college", "west bengal"],
    priorityMatch: (prep, q) => {
      if (/\babout\s+(cgec|college)\b/i.test(q) || (/\bcollege\b/i.test(q) && !/\b(engineering|department|fee|admission)\b/i.test(q))) return 0.95;
      return 0;
    },
    generate: () => ({
      content: `### 🏫 About CGEC — Institutional Profile

**${KB.college.name}**

| Field | Details |
| **Established** | ${KB.college.established} |
| **Type** | Government Engineering College |
| **Governed By** | ${KB.college.governedBy} |
| **Affiliation** | ${KB.college.affiliation} |
| **Approval** | ${KB.college.approval} |
| **Campus** | 21-acre green campus |
| **Motto** | ${KB.college.motto} |

**📌 Location:** ${KB.college.location}

**🎯 Vision:** ${KB.college.vision}

**📞 Contact:** ${KB.college.phone} | ✉️ ${KB.college.email}`,
      suggestions: ["Departments", "Leadership", "Infrastructure", "Admission Process"],
    }),
  },

  // 3. LEADERSHIP & HODs
  {
    id: "leadership",
    title: "Leadership & Heads of Departments",
    keywords: ["principal", "leadership", "hod", "head of department", "registrar", "administration", "director", "kingshuk", "sushovan"],
    priorityMatch: (prep, q) => {
      if (/\b(principal|leadership|registrar|hods?|head of department)\b/i.test(q)) return 0.98;
      return 0;
    },
    generate: () => ({
      content: `### 👨‍💼 CGEC Leadership & Heads of Departments

**Principal:**
> **${KB.leadership.principal.name}** (ME Dept)
> ${KB.leadership.principal.qualification}
> *"${KB.leadership.principal.message}"*

**Registrar (I/C):**
> **${KB.leadership.registrar.name}** (CE Dept)

**Training & Placement Officer (TPO):**
> **${KB.leadership.tpo.name}** | 📞 ${KB.leadership.tpo.phone} | ✉️ ${KB.leadership.tpo.email}

---
**Heads of Departments:**
• **CSE:** ${KB.departments.cse.hod}
• **ECE:** ${KB.departments.ece.hod}
• **EE:** ${KB.departments.ee.hod}
• **ME:** ${KB.departments.me.hod}
• **CE:** ${KB.departments.ce.hod}
• **BSH:** ${KB.departments.bsh.hod}`,
      suggestions: ["TPO & Placement", "CSE Department", "Faculty Details", "Contact Us"],
    }),
  },

  // 4. ALL DEPARTMENTS OVERVIEW
  {
    id: "all_departments",
    title: "All Academic Departments",
    keywords: ["all departments", "department", "departments", "department list", "departments list", "all dept", "all depts", "branch", "branches", "course", "courses", "btech", "b.tech", "programs", "engineering branches", "discipline", "disciplines", "courses offered", "programs offered"],
    negativeKeywords: ["cse", "cs", "ece", "ee", "bsh", "computer", "electronics", "electrical", "mechanical", "civil"],
    priorityMatch: (prep, q) => {
      if (
        /^(all\s+(departments?|branches?|depts?)|departments?|branches?)$/i.test(q) ||
        /\b(all\s+departments?|all\s+branches?|list\s+of\s+departments?|department\s+list|engineering\s+branches)\b/i.test(q)
      ) return 1.0;
      return 0;
    },
    generate: () => ({
      content: `### 🎓 Academic Departments at CGEC

Cooch Behar Government Engineering College offers 4-year B.Tech degree programs affiliated with **MAKAUT** and approved by **AICTE**.

---

**💻 1. Computer Science & Engineering (CSE)**
• **HOD:** ${KB.departments.cse.hod}
• **Specializations:** AI/ML, Cloud Computing, Cybersecurity, Data Structures, Image Processing, Web Tech
• **Laboratories:** 5 High-Tech Labs including Computer Center (100 i5 PCs), AI Lab, and Language Lab
• **Faculty Strength:** ${KB.departments.cse.faculty.length} Members
• **Wall Magazine:** ${KB.departments.cse.wallMag}
• 🔗 [Explore CSE Department](/academics/cse)

---

**📡 2. Electronics & Communication Engineering (ECE)**
• **HOD:** ${KB.departments.ece.hod}
• **Specializations:** VLSI Design, Embedded Systems, 5G Wireless Comm, DSP, IoT, Robotics
• **Laboratories:** Basic Electronics Lab, Solid State Lab, Analog Circuits, Digital & IC Lab, EM Theory Lab
• **Faculty Strength:** ${KB.departments.ece.faculty.length} Members
• **Active Club:** Robotica Club | **Wall Magazine:** ${KB.departments.ece.wallMag}
• 🔗 [Explore ECE Department](/academics/ece)

---

**⚡ 3. Electrical Engineering (EE)**
• **HOD:** ${KB.departments.ee.hod}
• **Specializations:** Power Systems, Smart Grids, Electric Drives, Renewable Energy, EV Technology, Control Systems
• **Laboratories:** 11 State-of-the-Art Labs (Power System, Electrical Machines, Power Electronics, Simulation Lab, etc.)
• **Faculty Strength:** ${KB.departments.ee.faculty.length} Members
• **Wall Magazine:** ${KB.departments.ee.wallMag}
• 🔗 [Explore EE Department](/academics/ee)

---

**⚙️ 4. Mechanical Engineering (ME)**
• **HOD:** ${KB.departments.me.hod}
• **Specializations:** Robotics, CAD/CAM, Thermodynamics, Fluid Mechanics, Automobile & Production Engg
• **Laboratories:** Machine Workshop, Thermal Engg Lab, CAD/CAM Lab, Fluid Mechanics Lab, Material Testing Lab
• **Faculty Strength:** ${KB.departments.me.faculty.length} Members (Guided by Principal ${KB.leadership.principal.name})
• **Wall Magazine:** ${KB.departments.me.wallMag}
• 🔗 [Explore ME Department](/academics/me)

---

**🏗️ 5. Civil Engineering (CE)**
• **HOD:** ${KB.departments.ce.hod}
• **Specializations:** Structural Dynamics, Geotechnical Engg, Earthquake Engg, Surveying, Water Resources
• **Laboratories:** Concrete Lab, Soil Mechanics Lab, Surveying Field Lab, Solid Mechanics, Geology Lab
• **Faculty Strength:** ${KB.departments.ce.faculty.length} Members
• **Wall Magazine:** ${KB.departments.ce.wallMag}
• 🔗 [Explore CE Department](/academics/ce)

---

**🔬 6. Basic Science & Humanities (BSH)**
• **In-charge:** ${KB.departments.bsh.hod}
• **Subjects:** Engineering Physics, Engineering Chemistry, Mathematics, Professional Communication
• **Laboratories:** Physics Lab, Chemistry Lab, Language Lab
• 🔗 [Explore BSH Department](/academics/bsh)

---

📋 **Academic Highlights:**
• **Evaluation:** Internal CA1–CA4 + MAKAUT Semester Exams
• **Industry Exposure:** Industrial visits to NTPC, WBSEDCL, and power plants
• **Projects:** Mandatory final-year capstone projects & industry-oriented training`,
      suggestions: ["CSE Department", "ECE Department", "EE Department", "ME Department", "CE Department", "Fee Structure", "Placement Records"],
    }),
  },

  // 5. CSE DEPARTMENT
  {
    id: "dept_cse",
    title: "Computer Science & Engineering (CSE)",
    keywords: ["cse", "computer science", "computer engineering", "cs dept", "cse dept", "software engineering", "coding", "computer center"],
    priorityMatch: (prep, q) => {
      if (hasWord(q, "cse", "cs") || /\bcomputer\s+science\b/i.test(q)) return 1.0;
      return 0;
    },
    generate: () => {
      const dept = KB.departments.cse;
      return {
        content: `### 💻 ${dept.name} (${dept.shortName})

**HOD:** ${dept.hod}
*${dept.hodQual}*

**🔬 Focus Areas:**
${dept.focus.map((f) => `• ${f}`).join("\n")}

**🧪 Laboratories (5 Labs):**
${dept.labs.map((l) => `• ${l}`).join("\n")}

**👨‍🏫 Faculty (${dept.faculty.length} Members):**
${dept.faculty.map((f) => `• ${f}`).join("\n")}

**📰 Wall Magazine:** ${dept.wallMag}

🔗 Visit: [CSE Department Page](${dept.pageUrl})`,
        suggestions: ["CSE Faculty", "CSE Labs", "CSE Syllabus", "Placement Records"],
      };
    },
  },

  // 6. ECE DEPARTMENT
  {
    id: "dept_ece",
    title: "Electronics & Communication Engineering (ECE)",
    keywords: ["ece", "electronics", "communication engineering", "ece dept", "vlsi", "embedded", "robotica", "signal processing"],
    priorityMatch: (prep, q) => {
      if (hasWord(q, "ece") || /\belectronics\b/i.test(q)) return 1.0;
      return 0;
    },
    generate: () => {
      const dept = KB.departments.ece;
      return {
        content: `### 📡 ${dept.name} (${dept.shortName})

**HOD:** ${dept.hod}
*${dept.hodQual}*

**🔬 Focus Areas:**
${dept.focus.map((f) => `• ${f}`).join("\n")}

**🧪 Laboratories:**
${dept.labs.map((l) => `• ${l}`).join("\n")}

**👨‍🏫 Faculty (${dept.faculty.length} Members):**
${dept.faculty.map((f) => `• ${f}`).join("\n")}

**📰 Wall Magazine:** ${dept.wallMag}
**🤖 Club:** Robotica Club — for robotics enthusiasts

🔗 Visit: [ECE Department Page](${dept.pageUrl})`,
        suggestions: ["ECE Faculty", "ECE Labs", "VLSI Research", "Placement Records"],
      };
    },
  },

  // 7. EE DEPARTMENT
  {
    id: "dept_ee",
    title: "Electrical Engineering (EE)",
    keywords: ["ee", "electrical engineering", "electrical", "ee dept", "power system", "power electronics", "smart grid", "electric drive"],
    priorityMatch: (prep, q) => {
      if (hasWord(q, "ee") || /\belectrical\b/i.test(q)) return 1.0;
      return 0;
    },
    generate: () => {
      const dept = KB.departments.ee;
      return {
        content: `### ⚡ ${dept.name} (${dept.shortName})

**HOD:** ${dept.hod}
*${dept.hodQual}*

**🔬 Focus Areas:**
${dept.focus.map((f) => `• ${f}`).join("\n")}

**🧪 Laboratories (11 Labs):**
${dept.labs.map((l) => `• ${l}`).join("\n")}

**👨‍🏫 Faculty (${dept.faculty.length} Members):**
${dept.faculty.map((f) => `• ${f}`).join("\n")}

**📰 Wall Magazine:** ${dept.wallMag}

🔗 Visit: [EE Department Page](${dept.pageUrl})`,
        suggestions: ["EE Faculty", "EE Labs", "Power System", "Placement Records"],
      };
    },
  },

  // 8. ME DEPARTMENT
  {
    id: "dept_me",
    title: "Mechanical Engineering (ME)",
    keywords: ["mechanical", "mech", "mechanical engineering", "me dept", "thermodynamics", "cad cam", "cad/cam", "fluid mechanics", "workshop"],
    priorityMatch: (prep, q) => {
      if (/\bmechanical\b/i.test(q) || q === "me" || (hasWord(q, "me") && /\b(dept|department|branch|faculty|lab|syllabus|course|hod|engineering)\b/i.test(q))) return 1.0;
      return 0;
    },
    generate: () => {
      const dept = KB.departments.me;
      return {
        content: `### ⚙️ ${dept.name} (${dept.shortName})

**HOD:** ${dept.hod}
*${dept.hodQual}*

**🔬 Focus Areas:**
${dept.focus.map((f) => `• ${f}`).join("\n")}

**🧪 Laboratories (6 Labs):**
${dept.labs.map((l) => `• ${l}`).join("\n")}

**👨‍🏫 Faculty (${dept.faculty.length} Members):**
${dept.faculty.map((f) => `• ${f}`).join("\n")}

**📰 Wall Magazine:** ${dept.wallMag}

🔗 Visit: [ME Department Page](${dept.pageUrl})`,
        suggestions: ["ME Faculty", "ME Workshop", "CAD/CAM", "Placement Records"],
      };
    },
  },

  // 9. CE DEPARTMENT
  {
    id: "dept_ce",
    title: "Civil Engineering (CE)",
    keywords: ["ce", "civil", "civil engineering", "ce dept", "structural", "geotechnical", "surveying", "construction", "soil mechanics"],
    priorityMatch: (prep, q) => {
      if (/\bcivil\b/i.test(q) || q === "ce" || (hasWord(q, "ce") && /\b(dept|department|branch|faculty|lab|syllabus|course|hod|engineering)\b/i.test(q))) return 1.0;
      return 0;
    },
    generate: () => {
      const dept = KB.departments.ce;
      return {
        content: `### 🏗️ ${dept.name} (${dept.shortName})

**HOD:** ${dept.hod}
*${dept.hodQual}*

**🔬 Focus Areas:**
${dept.focus.map((f) => `• ${f}`).join("\n")}

**🧪 Laboratories (6 Labs):**
${dept.labs.map((l) => `• ${l}`).join("\n")}

**👨‍🏫 Faculty (${dept.faculty.length} Members):**
${dept.faculty.map((f) => `• ${f}`).join("\n")}

**📰 Wall Magazine:** ${dept.wallMag}

🔗 Visit: [CE Department Page](${dept.pageUrl})`,
        suggestions: ["CE Faculty", "CE Labs", "Soil Mechanics", "Placement Records"],
      };
    },
  },

  // 10. BSH DEPARTMENT
  {
    id: "dept_bsh",
    title: "Basic Science & Humanities (BSH)",
    keywords: ["bsh", "basic science", "humanities", "physics", "chemistry", "mathematics", "language lab", "bsh dept"],
    priorityMatch: (prep, q) => {
      if (hasWord(q, "bsh") || /\bbasic\s+science\b/i.test(q)) return 1.0;
      return 0;
    },
    generate: () => {
      const dept = KB.departments.bsh;
      return {
        content: `### 🔭 ${dept.name} (${dept.shortName})

**In-charge:** ${dept.hod}

**📚 Subjects Covered:**
${dept.focus.map((f) => `• ${f}`).join("\n")}

**🧪 Laboratories:**
${dept.labs.map((l) => `• ${l}`).join("\n")}

**👨‍🏫 Faculty:**
${dept.faculty.map((f) => `• ${f}`).join("\n")}

*BSH provides the foundational knowledge that forms the backbone of all engineering disciplines at CGEC.*

🔗 Visit: [BSH Department Page](${dept.pageUrl})`,
        suggestions: ["Physics Lab", "Chemistry Lab", "Language Skills", "All Departments"],
      };
    },
  },

  // 11. ADMISSION
  {
    id: "admission",
    title: "Admission Process & WBJEE",
    keywords: ["admission", "admissions", "wbjee", "jelet", "counselling", "cut off", "rank", "eligibility", "entrance", "apply", "enroll", "seat allotment", "counselling process", "documents required"],
    priorityMatch: (prep, q) => {
      if (/\b(admission|wbjee|jelet|counselling|eligibility)\b/i.test(q) && !/\bfee\b/i.test(q)) return 0.96;
      return 0;
    },
    generate: () => ({
      content: `### 📋 Admission Process 2025-26

**B.Tech (1st Year) — via WBJEE:**
${KB.admission.btech}

**Lateral Entry (3rd Semester) — via JELET:**
${KB.admission.lateral}

**Step-by-Step Process:**
${KB.admission.process.map((s) => `${s}`).join("\n")}

**📄 Required Documents:**
${KB.admission.docs}

**🎯 Approximate Seats Per Department:**
${KB.admission.seats}

> ⚠️ Always check the official WBJEE Board website and the CGEC notice board for the latest dates and notifications.`,
      suggestions: ["Fee Structure", "Available Scholarships", "Documents Required", "Contact Admissions"],
    }),
  },

  // 12. FEES
  {
    id: "fees",
    title: "Fee Structure & Expenses",
    keywords: ["fee", "fees", "cost", "tuition", "expense", "payment", "hostel fee", "annual fee", "charges", "how much fee", "money"],
    priorityMatch: (prep, q) => {
      if (/\b(fees?|tuition|cost|expense)\b/i.test(q) && !/\bhostel\b/i.test(q)) return 0.98;
      return 0;
    },
    generate: () => ({
      content: `### 💰 Fee Structure (Government Subsidized)

As a Government College, CGEC offers world-class education at minimal cost:

**📚 Tuition Fees:**
• ${KB.fees.btech}
• ${KB.fees.annual}

**🏠 Hostel Fees:**
• ${KB.fees.hostel}

**💳 Payment Mode:**
• ${KB.fees.payment}

**🎓 Available Scholarships:**
${KB.fees.scholarships.map((s) => `• ${s}`).join("\n")}

> Scholarship applications are typically processed through the West Bengal e-District portal or directly through the college.`,
      suggestions: ["Hostel Details", "Scholarship Process", "Admission Process", "Contact Us"],
    }),
  },

  // 13. SCHOLARSHIP
  {
    id: "scholarship",
    title: "Scholarships & Financial Aid",
    keywords: ["scholarship", "scholarships", "financial aid", "stipend", "swami vivekananda", "svmcm", "inspire", "sc st scholarship", "obc scholarship", "post matric"],
    priorityMatch: (prep, q) => {
      if (/\b(scholarships?|financial\s+aid|stipend|svmcm)\b/i.test(q)) return 0.98;
      return 0;
    },
    generate: () => ({
      content: `### 🎓 Scholarships Available at CGEC

Students at CGEC are eligible for multiple government scholarships:

${KB.fees.scholarships.map((s, i) => `${i + 1}. **${s}**`).join("\n")}

**How to Apply:**
• SC/ST & OBC: Apply via West Bengal SC/ST Development & Finance Corporation portal
• Swami Vivekananda Scholarship: Apply at wbmdfcscholarship.in
• INSPIRE: Apply at inspire-dst.gov.in (for top WBJEE rankers)
• Post-Matric: Apply via Minority Affairs dept portal

> Contact the college office or Student Counsellor for guidance on scholarship applications.`,
      suggestions: ["Contact College Office", "Student Counsellor", "Fee Structure", "Admission"],
    }),
  },

  // 14. PLACEMENT
  {
    id: "placement",
    title: "Training & Placement Cell (TPO)",
    keywords: ["placement", "placements", "job", "recruit", "recruiter", "recruiters", "salary", "package", "lpa", "highest package", "average package", "company", "companies", "campus placement", "tpo", "training and placement"],
    priorityMatch: (prep, q) => {
      if (/\b(placements?|recruiters?|packages?|salary|tpo)\b/i.test(q)) return 0.98;
      return 0;
    },
    generate: () => ({
      content: `### 🏆 Training & Placement Cell

**Head TPO:** ${KB.placement.tpoHead}
📞 ${KB.placement.tpoPhone} | ✉️ ${KB.placement.tpoEmail}

**📊 Placement Highlights:**
• **Highest Package:** ${KB.placement.highestPackage}
• **Average Package:** ${KB.placement.avgPackage}

**🏢 Top Recruiters:**
${KB.placement.topRecruiters.map((r) => `• ${r}`).join("\n")}

**🎯 Training Programs:**
${KB.placement.training.map((t) => `• ${t}`).join("\n")}

**👥 Department-wise TPO Representatives:**
${KB.placement.representatives.map((r) => `• ${r}`).join("\n")}`,
      suggestions: ["TPO Contact", "Top Recruiters", "Internships", "Resume Workshop"],
    }),
  },

  // 15. INFRASTRUCTURE / CAMPUS
  {
    id: "infrastructure",
    title: "Campus Infrastructure & Facilities",
    keywords: ["campus", "infrastructure", "facility", "facilities", "building", "ground", "sports", "canteen", "wifi", "internet", "computer lab"],
    priorityMatch: (prep, q) => {
      if (/\b(infrastructure|facilities|campus\s+facilities|sports\s+ground|canteen)\b/i.test(q)) return 0.96;
      return 0;
    },
    generate: () => ({
      content: `### 🏫 Campus Infrastructure & Facilities

**💻 Computing:**
• ${KB.infrastructure.computing}

**📚 Library:**
• ${KB.infrastructure.library}

**🏠 Hostels:**
• ${KB.infrastructure.hostels}

**🌐 Connectivity:**
• ${KB.infrastructure.internet}

**⚽ Sports:**
• ${KB.infrastructure.sportsGround}

**🍽️ Canteen:**
• ${KB.infrastructure.canteen}

**🚌 Transport:**
• ${KB.infrastructure.transport}

**📍 Address:**
${KB.infrastructure.location}`,
      suggestions: ["Hostel Details", "Library Website", "Contact College", "Location Map"],
    }),
  },

  // 16. HOSTEL
  {
    id: "hostel",
    title: "Hostel Facilities & Accommodation",
    keywords: ["hostel", "hostels", "accommodation", "mess", "room", "stay", "boys hostel", "girls hostel", "dormitory", "hostel fee"],
    priorityMatch: (prep, q) => {
      if (/\b(hostels?|accommodation|mess|dormitory)\b/i.test(q)) return 0.98;
      return 0;
    },
    generate: () => ({
      content: `### 🏠 Hostel Facilities at CGEC

CGEC provides **5 dedicated hostels** on campus for boys and girls:

• **Boys' Hostels:** Multiple blocks accommodating 300+ students
• **Girls' Hostel:** Dedicated block with warden facilities
• **Mess:** Subsidized cafeteria/mess service; monthly meal plans available
• **Security:** 24×7 security guards; CCTV surveillance
• **Amenities:** Common rooms, reading rooms, Wi-Fi access

**💰 Hostel Fee:**
• ${KB.fees.hostel}

> For hostel allotment, apply through the college administration office after admission confirmation.`,
      suggestions: ["Fee Structure", "Contact College", "Campus Facilities", "Admission"],
    }),
  },

  // 17. LIBRARY
  {
    id: "library",
    title: "Central Library & E-Resources",
    keywords: ["library", "book", "books", "reading room", "digital library", "cgeclibrary", "nptel", "journals"],
    priorityMatch: (prep, q) => {
      if (/\b(library|cgeclibrary|reading\s+room)\b/i.test(q)) return 0.98;
      return 0;
    },
    generate: () => ({
      content: `### 📚 CGEC Central Library

• **Collection:** 7,000+ volumes covering all engineering disciplines
• **Digital Resources:** NPTEL web & video lectures available on LAN
• **Reading Room:** Dedicated quiet study area
• **E-Resources:** Access to online journals and digital books
• **Timing:** Weekdays 9:00 AM – 5:00 PM (during semester)

**🌐 Library Website:** [cgeclibrary.org.in](https://www.cgeclibrary.org.in/)

The library is continuously expanding its collection to support academic and research needs of all departments.`,
      suggestions: ["Campus Facilities", "Hostel", "Contact Us"],
    }),
  },

  // 18. CONTACT / LOCATION
  {
    id: "contact",
    title: "Contact Information & Location",
    keywords: ["contact", "address", "phone", "email", "location", "where is", "how to reach", "map", "direction", "distance", "nearest railway station"],
    priorityMatch: (prep, q) => {
      if (/\b(contact|phone|email|address|where\s+is|reach\s+college)\b/i.test(q)) return 0.98;
      return 0;
    },
    generate: () => ({
      content: `### 📞 Contact & Location — CGEC

**📍 Address:**
${KB.college.location}

**☎️ Phone:** ${KB.college.phone}
**✉️ Email:** ${KB.college.email}
**🌐 Website:** ${KB.college.website}

**Placement Office:**
📞 ${KB.placement.tpoPhone} | ✉️ ${KB.placement.tpoEmail}

**🚉 How to Reach:**
• Nearest Railway Station: Cooch Behar (~5 km)
• Auto-rickshaws and buses available from Cooch Behar town
• NH-27 passes near the college

🗺️ [View on Google Maps](${KB.college.locationMapLink})`,
      suggestions: ["Principal's Office", "TPO Contact", "Campus Tour", "Admission Office"],
    }),
  },

  // 19. COMMITTEES
  {
    id: "committees",
    title: "College Committees",
    keywords: ["committee", "committees", "icc", "grievance", "grc", "iqac", "iic", "sc st", "counsellor", "student committee"],
    priorityMatch: (prep, q) => {
      if (/\b(committees?|icc|iqac|grc|iic)\b/i.test(q) && !/\bragging\b/i.test(q)) return 0.98;
      return 0;
    },
    generate: () => ({
      content: `### 🏛️ College Committees at CGEC

CGEC maintains various statutory and welfare committees:

${KB.committees.map((c) => `• **${c.name}**`).join("\n")}

Each committee ensures a safe, fair, and inclusive environment for all students and staff.

> For specific committee details, member lists, or to file a complaint, visit the respective committee page on the CGEC website or contact the administrative office.`,
      suggestions: ["Anti-Ragging Info", "Student Counsellor", "Contact College", "IQAC Details"],
    }),
  },

  // 20. ANTI RAGGING
  {
    id: "anti_ragging",
    title: "Anti-Ragging Policy & Helpline",
    keywords: ["ragging", "anti ragging", "safety", "secure", "harassment", "zero tolerance", "helpline"],
    priorityMatch: (prep, q) => {
      if (/\bragging\b/i.test(q)) return 1.0;
      return 0;
    },
    generate: () => ({
      content: `### 🛡️ Anti-Ragging Policy at CGEC

CGEC strictly follows UGC/AICTE Anti-Ragging Guidelines:

**Zero Tolerance:** Any form of ragging is strictly prohibited and punishable.

**Committees:**
• Anti-Ragging Committee — Reports directly to Principal
• Anti-Ragging Squad — Active monitoring teams

**If you face ragging:**
1. Immediately report to the Anti-Ragging Committee
2. Contact the Warden or any Faculty member
3. File complaint at: **ugc.ac.in/antiRagging** (National Anti-Ragging Helpline)
4. Helpline: **1800-180-5522** (Toll-free, 24×7)

All complaints are treated with utmost confidentiality.`,
      suggestions: ["Student Counsellor", "Contact College", "Grievance Redressal", "College Committees"],
    }),
  },

  // 21. STUDENT LIFE & FEST
  {
    id: "student_life",
    title: "Student Life, Clubs & Fest (Zeal)",
    keywords: ["fest", "festival", "zeal", "club", "clubs", "nss", "event", "events", "student life", "extra curricular", "co curricular", "wall magazine", "magazine"],
    priorityMatch: (prep, q) => {
      if (/\b(fest|zeal|clubs?|student\s+life|wall\s+magazine)\b/i.test(q)) return 0.98;
      return 0;
    },
    generate: () => ({
      content: `### 🎉 Student Life & Activities at CGEC

**🎪 Annual Fest:** **${KB.studentLife.fest}**
The flagship event featuring technical competitions, cultural performances, hackathons, and more!

**🤝 Active Clubs:**
${KB.studentLife.clubs.map((c) => `• ${c}`).join("\n")}

**📰 Wall Magazines (Department-wise Creative Journals):**
• CSE → **The Wall**
• ECE → **ElectroWaves**
• EE → **Electra**
• ME → **Mechanix**
• CE → **CivilLines**

**🏅 Sports & Recreation:**
Cricket, Football, Volleyball, Badminton — regular inter-departmental tournaments held.

*"Student life at CGEC is a perfect blend of academics, creativity, and teamwork."*`,
      suggestions: ["Annual Fest", "Robotica Club", "NSS Activities", "Wall Magazine CSE"],
    }),
  },

  // 22. SYLLABUS & CURRICULUM
  {
    id: "syllabus",
    title: "Syllabus & Curriculum",
    keywords: ["syllabus", "curriculum", "makaut syllabus", "semester syllabus", "subject", "subjects", "course content", "study material"],
    priorityMatch: (prep, q) => {
      if (/\b(syllabus|curriculum|course\s+content)\b/i.test(q)) return 0.98;
      return 0;
    },
    generate: () => ({
      content: `### 📖 Syllabus & Curriculum at CGEC

All departments follow the **MAKAUT** (Maulana Abul Kalam Azad University of Technology) curriculum.

**Semester-wise PDFs are available for each department:**

| Department | Semesters Available |
|---|---|
| CSE | Sem 1-2 (AICTE New), Sem 3-8, Old Syllabus (2017-21) |
| ECE | Sem 1-2 (AICTE New), Sem 3-8, Old Syllabus |
| EE | Sem 1-2 (AICTE New), Sem 3-8, Old Syllabus |
| ME | Sem 1-2 (AICTE New), Sem 3-8, Old Syllabus |
| CE | Sem 1-2 (AICTE New), Sem 3-8, Old Syllabus |

📎 Syllabus PDFs can be downloaded from each department's page on the website.
🔗 Visit: [CGEC Academics](https://cgec.org.in)`,
      suggestions: ["CSE Syllabus", "ECE Syllabus", "EE Syllabus", "ME Syllabus", "CE Syllabus"],
    }),
  },

  // 23. RESEARCH & INNOVATION
  {
    id: "research",
    title: "Research & Publications",
    keywords: ["research", "publication", "publications", "journal", "paper", "papers", "phd", "project", "innovation", "lab research"],
    priorityMatch: (prep, q) => {
      if (/\b(research|publications?|journals?)\b/i.test(q)) return 0.98;
      return 0;
    },
    generate: () => ({
      content: `### 🔬 Research & Publications at CGEC

CGEC faculty are actively engaged in research across various disciplines:

**CSE Research Areas:**
• AI & Machine Learning (Computer Vision, Deep Learning)
• MRI Image Segmentation using Fuzzy C-Means algorithms
• Network Security & Cryptography

**ECE Research Areas:**
• VLSI Design & Analog Circuits
• GaN-based High Electron Mobility Transistors (HEMT)
• Signal Processing & Wireless Communication

**ME Research Areas:**
• Heat Transfer & Refrigeration
• Machine Design & Biomechanics
• Production Engineering & Composites

**EE Research Areas:**
• Power Systems & Smart Grids
• Electrical Machines & Drives

Faculty members regularly publish in **reputed national/international journals** and participate in conferences. Students are also encouraged to co-author research papers.`,
      suggestions: ["Faculty Publications", "CSE Research", "ECE Research", "Lab Facilities"],
    }),
  },

  // 24. WBJEE RANKS & CUTOFFS
  {
    id: "wbjee_ranks",
    title: "WBJEE Ranks & Cut-offs",
    keywords: ["wbjee", "rank", "cut off", "cutoff", "closing rank", "opening rank", "last rank"],
    priorityMatch: (prep, q) => {
      if (/\b(cut\s*off|closing\s+rank|opening\s+rank|ranks?)\b/i.test(q)) return 0.98;
      return 0;
    },
    generate: () => ({
      content: `### 📊 WBJEE Ranks & Cut-offs for CGEC

CGEC is a highly sought-after government engineering college in West Bengal. Admission is through **WBJEE counselling**.

**General Guidance on Ranks:**
• CGEC being a government college, cut-off ranks are competitive
• CSE & ECE branches generally have lower (better) closing ranks
• EE, ME, CE branches have comparatively higher (more accessible) closing ranks
• SC/ST/OBC categories have separate reserved seats with different rank thresholds

**📋 To get exact current cut-off ranks:**
1. Visit the **WBJEE Board website**: wbjeeb.nic.in
2. Check the **CSAB/WBJEE counselling round-wise allotment data**
3. Compare previous years' closing ranks as an indicative guide

> Cut-offs change every year based on the number of applicants and seat availability.`,
      suggestions: ["Admission Process", "WBJEE Counselling Steps", "Available Seats", "Fee Structure"],
    }),
  },

  // 25. NOTICES & UPDATES
  {
    id: "notices",
    title: "Notices & Official Circulars",
    keywords: ["notice", "notices", "notification", "notifications", "update", "updates", "announcement", "circular", "exam notice", "date sheet", "schedule"],
    priorityMatch: (prep, q) => {
      if (/\b(notices?|notifications?|circulars?)\b/i.test(q)) return 0.98;
      return 0;
    },
    generate: () => ({
      content: `### 📢 Notices & Official Updates

For the latest official notices, check:

• **🔔 CGEC Website Notices Section:** [cgec.org.in/notices](https://cgec.org.in)
• **📋 Admission Notices:** Published on WBJEE Board website
• **📚 Exam Schedules:** Published by MAKAUT on makautwb.ac.in
• **🎓 Academic Calendar:** Available from the college administration office

**Types of Notices Published:**
• Admission Notifications
• Exam & Internal Assessment Schedules
• Scholarship Application Deadlines
• Placement Drive Announcements
• College Events & Fest Notifications
• Administrative Circulars

> 🔗 You can also check the **Notices page** on this website for the latest updates.`,
      suggestions: ["Latest Notices", "Placement Notices", "Exam Schedule", "Academic Calendar"],
    }),
  },

  // 26. THANK YOU / GOODBYE
  {
    id: "thanks",
    title: "Thank You & Goodbye",
    keywords: ["thank", "thanks", "thank you", "bye", "goodbye", "see you", "take care", "good night", "ok thanks", "thx"],
    priorityMatch: (prep, q) => {
      if (/\b(thanks?|thank\s+you|bye|goodbye|thx)\b/i.test(q)) return 1.0;
      return 0;
    },
    generate: () => ({
      content: `### 😊 You're welcome!

It was my pleasure to assist you. If you have any more questions about CGEC — academics, admissions, placements, or anything else — feel free to ask anytime!

**Quick Links:**
• 🌐 [Official Website](https://cgec.org.in)
• 📚 [Library Portal](https://www.cgeclibrary.org.in/)
• 📞 College Office: ${KB.college.phone}

*Wishing you all the best! 🎓*`,
      suggestions: ["About CGEC", "Admission Process", "Contact Us"],
    }),
  },

  // 27. WHO ARE YOU / BOT IDENTITY
  {
    id: "bot_identity",
    title: "About CGEC Smart Assistant",
    keywords: ["who are you", "your name", "what are you", "chatbot", "bot", "assistant", "what can you do", "help me", "how to use"],
    priorityMatch: (prep, q) => {
      if (/\b(who\s+are\s+you|what\s+are\s+you|what\s+can\s+you\s+do|chatbot)\b/i.test(q)) return 1.0;
      return 0;
    },
    generate: () => ({
      content: `### 🤖 About CGEC Smart Assistant

I am the **CGEC Smart Assistant** — the official AI-powered digital assistant for Cooch Behar Government Engineering College.

**What I can help with:**
• 🏫 **College Info** — About CGEC, vision, mission, history
• 🎓 **Academics** — All 6 departments (CSE, ECE, EE, ME, CE, BSH), faculty details, labs, syllabus
• 📋 **Admissions** — WBJEE/JELET process, eligibility, documents, seats
• 💰 **Fees & Scholarships** — Fee structure, available government scholarships
• 🏆 **Placements** — Package details, top recruiters, TPO contacts
• 🏠 **Campus Life** — Hostels, library, sports, canteen, transport
• 📢 **Notices & Events** — College fest, clubs, official updates
• 🛡️ **Committees** — Anti-ragging, grievance redressal, IQAC
• 🔬 **Research** — Faculty publications, research areas
• 📞 **Contact Info** — Phone, email, address, Google Maps link

**How to use:** Simply type your question or click the suggestion pills below! You can also use the **Quick Topics** panel at the top.

*I'm available 24/7 to help you! 😊*`,
      suggestions: ["About CGEC", "Departments", "Admission", "Placement", "Contact Us"],
    }),
  },

  // 28. EXAM & RESULTS
  {
    id: "exam_results",
    title: "Examinations & MAKAUT Results",
    keywords: ["exam", "exams", "result", "results", "marksheet", "grade", "sgpa", "cgpa", "backlog", "supplementary", "academic calendar", "internal assessment", "ca1", "ca2", "ca3", "ca4"],
    priorityMatch: (prep, q) => {
      if (/\b(exams?|results?|sgpa|cgpa|backlog|ca1|ca2|ca3|ca4)\b/i.test(q)) return 0.98;
      return 0;
    },
    generate: () => ({
      content: `### 📝 Examinations & Results at CGEC

**Evaluation System (MAKAUT Pattern):**
• **Internal Assessment:** CA1, CA2, CA3, CA4 (Continuous Assessment) — conducted by the college throughout the semester
• **End Semester Exam:** Conducted by **MAKAUT** (centralized)
• **Grading:** SGPA (Semester Grade Point Average) & CGPA (Cumulative GPA) on a 10-point scale
• **Passing Criteria:** Minimum 4.0 SGPA in each semester

**Internal CA Breakdown:**
• **CA1:** Class test / Quiz (typically Week 3-4)
• **CA2:** Mid-semester test (Week 7-8)
• **CA3:** Assignments / Projects
• **CA4:** Attendance + Class Participation

**📊 Results:**
• End-semester results published on: **[makautwb.ac.in](https://makautwb.ac.in)**
• Students can check using their Registration Number & Roll Number

**📋 Supplementary / Backlog:**
• Students can appear in supplementary exams for failed subjects in subsequent semesters
• Re-evaluation facility available through MAKAUT portal

> 📌 Check the [Notices page](/notices) for exam schedules and internal assessment dates.`,
      suggestions: ["Syllabus", "Academic Calendar", "Departments", "Contact College"],
    }),
  },

  // 29. INTERNSHIP & INDUSTRIAL TRAINING
  {
    id: "internship",
    title: "Internships & Industrial Training",
    keywords: ["internship", "internships", "intern", "industrial training", "summer training", "winter training", "industry visit", "ntpc", "wbsedcl"],
    priorityMatch: (prep, q) => {
      if (/\b(internships?|industrial\s+training|summer\s+training)\b/i.test(q)) return 0.98;
      return 0;
    },
    generate: () => ({
      content: `### 🏭 Internships & Industrial Training

**Mandatory Training Programs:**
• **Industrial Visit:** All departments organize visits to industries like **NTPC, WBSEDCL, power plants, and manufacturing units**
• **Summer Internship:** 4-6 weeks industrial training after 6th semester (recommended)
• **Winter Training:** Optional short-term training programs

**TPO Facilitated Opportunities:**
• The Training & Placement Cell helps coordinate internship drives
• Companies like **TCS, Infosys, Cognizant, Wipro** offer summer internship programs
• Students can also apply individually via LinkedIn, Internshala, etc.

**Key Benefits:**
• Real-world industry exposure
• Certificate for resume building
• Often leads to pre-placement offers (PPOs)

**Contact TPO for Internship Queries:**
📞 ${KB.placement.tpoPhone} | ✉️ ${KB.placement.tpoEmail}
TPO Head: ${KB.placement.tpoHead}`,
      suggestions: ["Placement Records", "Top Recruiters", "TPO Contact", "Industry Visits"],
    }),
  },

  // 30. TRANSPORT / HOW TO REACH
  {
    id: "transport",
    title: "Transport & How to Reach",
    keywords: ["transport", "bus", "train", "railway", "airport", "how to reach", "travel", "distance", "route", "auto", "cab", "rickshaw", "nearest station", "bagdogra"],
    priorityMatch: (prep, q) => {
      if (/\b(transport|how\s+to\s+reach|railway\s+station|airport)\b/i.test(q)) return 0.98;
      return 0;
    },
    generate: () => ({
      content: `### 🚌 How to Reach CGEC

**📍 Campus Address:**
${KB.college.location}

**🚉 By Train:**
• Nearest Railway Station: **Cooch Behar Junction** (~5 km from campus)
• Cooch Behar is connected to New Jalpaiguri (NJP), Kolkata, Guwahati, and Delhi by rail
• From station: Auto-rickshaw (₹30-50) or shared auto available

**✈️ By Air:**
• Nearest Airport: **Bagdogra Airport (IXB)** (~160 km)
• From airport: Take a cab to NJP, then train to Cooch Behar
• Approximate travel time: 4-5 hours from Bagdogra

**🚌 By Road:**
• NH-27 (formerly NH-31) passes near the college
• Regular bus services from Siliguri, Jalpaiguri, Alipurduar, and Kolkata
• NBSTC (North Bengal State Transport Corporation) buses available

**🗺️ Google Maps:**
[View CGEC on Google Maps](${KB.college.locationMapLink})

> 💡 The college is situated in a scenic location near the Torsha River banks.`,
      suggestions: ["Campus Facilities", "Hostel", "Contact Us", "About CGEC"],
    }),
  },

  // 31. CAMPUS GALLERY
  {
    id: "gallery",
    title: "Campus Photo Gallery",
    keywords: ["gallery", "photos", "images", "campus photo", "picture", "pictures", "campus view", "campus tour"],
    priorityMatch: (prep, q) => {
      if (/\b(gallery|photos?|images?|pictures?)\b/i.test(q)) return 0.98;
      return 0;
    },
    generate: () => ({
      content: `### 📸 Campus Gallery

CGEC's 21-acre green campus offers a beautiful learning environment:

**🏫 Campus Highlights:**
• Modern academic buildings with smart classrooms
• Well-equipped laboratories across all departments
• 140+ computer workstations in central computing facility
• Beautiful green campus near the Torsha River banks

**🏠 Residential Facilities:**
• 5 dedicated hostels for boys and girls
• On-campus canteen and mess

**⚽ Sports & Recreation:**
• Cricket ground, football field
• Volleyball & badminton courts
• Regular inter-departmental sports tournaments

**📷 View Campus Gallery:**
🔗 [Visit Gallery Page](/gallery)

*The gallery is regularly updated with photos from campus events, fests, and department activities.*`,
      suggestions: ["Campus Facilities", "Hostel Details", "Student Life", "About CGEC"],
    }),
  },

  // 32. ACADEMIC STRUCTURE & SEMESTERS
  {
    id: "academic_structure",
    title: "Academic Structure & Semesters",
    keywords: ["semester", "semesters", "duration", "how many years", "how long", "4 year", "eight semester", "1st year", "2nd year", "3rd year", "4th year", "first year", "second year", "academic calendar"],
    priorityMatch: (prep, q) => {
      if (/\b(duration|how\s+many\s+years?|4\s+years?|semesters?)\b/i.test(q) && !/\bsyllabus\b/i.test(q)) return 0.96;
      return 0;
    },
    generate: () => ({
      content: `### 📅 Academic Structure at CGEC

**Program Duration:** 4 Years (8 Semesters)

**Year-wise Breakdown:**

**📘 1st Year (Sem 1 & 2) — Foundation:**
• Common subjects for all branches (AICTE New Syllabus)
• Physics, Chemistry, Mathematics, Engineering Drawing, Programming (C)
• Department: BSH (Basic Science & Humanities)

**📗 2nd Year (Sem 3 & 4) — Core Begins:**
• Branch-specific core subjects start
• First exposure to departmental labs
• Internal assessments CA1-CA4 pattern

**📙 3rd Year (Sem 5 & 6) — Specialization:**
• Advanced branch-specific subjects
• Elective subjects introduced
• Industrial training / summer internship (after Sem 6)
• Placement preparation begins

**📕 4th Year (Sem 7 & 8) — Industry Ready:**
• Advanced electives & specializations
• Final year capstone project (mandatory)
• Campus placements (major recruitment season)
• MAKAUT final examinations

**⏰ Academic Calendar:**
• Odd Semester: July – December
• Even Semester: January – June
• Exam: End of each semester by MAKAUT`,
      suggestions: ["Syllabus", "Departments", "Admission Process", "Placement"],
    }),
  },

  // 33. ALL FACULTY DIRECTORY
  {
    id: "all_faculty",
    title: "Faculty Directory — All Departments",
    keywords: ["faculty", "faculties", "teacher", "teachers", "professor", "professors", "staff", "lecturer", "lecturers", "all faculty", "faculty directory"],
    negativeKeywords: ["cse", "ece", "ee", "me", "ce", "bsh", "computer", "electronics", "electrical", "mechanical", "civil"],
    priorityMatch: (prep, q) => {
      if (
        /^(all\s+faculty|facult(?:y|ies)|teachers?|professors?)$/i.test(q) ||
        (/\b(all\s+faculty|faculty\s+directory|list\s+of\s+faculty)\b/i.test(q) && !hasWord(q, "cse", "cs", "ece", "ee", "me", "ce", "bsh"))
      ) return 1.0;
      return 0;
    },
    generate: () => ({
      content: `### 👨‍🏫 Faculty Directory — All Departments

CGEC has **40+ dedicated faculty members** across all departments:

**💻 CSE Faculty (${KB.departments.cse.faculty.length} members):**
${KB.departments.cse.faculty.slice(0, 3).map((f) => `• ${f}`).join("\n")}

**📡 ECE Faculty (${KB.departments.ece.faculty.length} members):**
${KB.departments.ece.faculty.slice(0, 3).map((f) => `• ${f}`).join("\n")}

**⚡ EE Faculty (${KB.departments.ee.faculty.length} members):**
${KB.departments.ee.faculty.slice(0, 3).map((f) => `• ${f}`).join("\n")}

**⚙️ ME Faculty (${KB.departments.me.faculty.length} members):**
${KB.departments.me.faculty.slice(0, 3).map((f) => `• ${f}`).join("\n")}

**🏗️ CE Faculty (${KB.departments.ce.faculty.length} members):**
${KB.departments.ce.faculty.slice(0, 3).map((f) => `• ${f}`).join("\n")}

**🔬 BSH Faculty:**
${KB.departments.bsh.faculty.slice(0, 3).map((f) => `• ${f}`).join("\n")}

> Click a department below for the **complete faculty list** with qualifications, specializations, and experience.`,
      suggestions: ["CSE Faculty", "ECE Faculty", "EE Faculty", "ME Faculty", "CE Faculty"],
    }),
  },
];

function scoreIntent(prep: PreprocessedQuery, intent: BotIntent): number {
  const { cleaned, tokens } = prep;

  // 1. Priority match handler
  if (intent.priorityMatch) {
    const p = intent.priorityMatch(prep, cleaned);
    if (p > 0) return p;
  }

  // 2. Negative keyword check
  if (intent.negativeKeywords) {
    for (const neg of intent.negativeKeywords) {
      if (hasWord(cleaned, neg) || tokens.includes(neg)) {
        return 0;
      }
    }
  }

  // 3. Exact phrase match
  for (const kw of intent.keywords) {
    const cleanKw = cleanPunctuation(kw.toLowerCase());
    if (cleaned === cleanKw) return 1.0;
    if (new RegExp(`\\b${cleanKw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(cleaned)) {
      return 0.95;
    }
  }

  // 4. Token-level overlap & fuzzy match
  let tokenMatches = 0;
  let totalSim = 0;

  for (const qToken of tokens) {
    let maxSim = 0;
    for (const kw of intent.keywords) {
      const kwTokens = cleanPunctuation(kw.toLowerCase()).split(/\s+/).map(stemWord);
      for (const kToken of kwTokens) {
        const sim = tokenSimilarity(qToken, kToken);
        if (sim > maxSim) maxSim = sim;
      }
    }
    if (maxSim >= 0.70) {
      tokenMatches++;
      totalSim += maxSim;
    }
  }

  if (tokenMatches === 0) return 0;
  const coverage = tokenMatches / tokens.length;
  const avgSim = totalSim / tokenMatches;
  return Math.min(1.0, coverage * 0.65 + avgSim * 0.35);
}

function getBotResponse(rawInput: string): { content: string; suggestions: string[] } {
  const prep = preprocessQuery(rawInput);
  const { cleaned, rawTokens } = prep;

  // ─── DYNAMIC FACULTY NAME LOOKUP ──────────────────────────────────────────
  const allFaculty: { name: string; dept: string }[] = [];
  Object.values(KB.departments).forEach((dept) => {
    dept.faculty.forEach((f) => {
      allFaculty.push({ name: f, dept: dept.shortName });
    });
  });

  const facultyMatches = allFaculty.filter((f) => {
    const fLower = f.name.toLowerCase();
    return rawTokens.some((token) => token.length > 2 && fLower.includes(token));
  });

  // Only trigger faculty search if user actually mentions a faculty name
  const isKnownFacultyName = contains(
    cleaned,
    "arnab", "shahid", "pranab", "umakanta", "supriyo", "prabir",
    "gautam", "soumik", "avisek", "palash", "rajib", "abhijit",
    "rabiul", "atanu", "tanumay", "deepjyoti", "panda", "mafizul",
    "sushovan", "prasenjit", "gyan", "provas", "masud", "sanchayan",
    "sudipta", "nikhilesh", "ziaul", "biren", "dan", "asif", "shyamal",
    "chhandamay", "mithun", "ansarul", "samik", "arghya", "biplab",
    "tanmay", "salim", "somen"
  );

  if (isKnownFacultyName && facultyMatches.length > 0) {
    return {
      content: `### 👨‍🏫 Faculty Search Results

${facultyMatches.length === 1 ? "Found 1 matching faculty member:" : `Found ${facultyMatches.length} matching faculty members:`}

${facultyMatches.map((m) => `**[${m.dept}]** ${m.name}`).join("\n\n")}

> For detailed profiles, visit the respective department page.`,
      suggestions: facultyMatches.length === 1
        ? [`${facultyMatches[0].dept} Department`, "All Faculty", "Contact College"]
        : ["CSE Faculty", "ECE Faculty", "All Departments"],
    };
  }

  // ─── SCORE ALL INTENTS (NLP & FUZZY MATCHING) ─────────────────────────────
  let bestIntent: BotIntent | null = null;
  let bestScore = 0;
  const scoredCandidates: { intent: BotIntent; score: number }[] = [];

  for (const intent of INTENTS) {
    const score = scoreIntent(prep, intent);
    if (score > 0.20) {
      scoredCandidates.push({ intent, score });
    }
    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  }

  scoredCandidates.sort((a, b) => b.score - a.score);

  // ─── CONFIDENCE THRESHOLD 1: HIGH CONFIDENCE (>= 70%) ──────────────────────
  if (bestIntent && bestScore >= 0.70) {
    return bestIntent.generate();
  }

  // ─── CONFIDENCE THRESHOLD 2: LIKELY MATCH (50% – 69%) ──────────────────────
  if (bestIntent && bestScore >= 0.50) {
    const result = bestIntent.generate();
    const matchPct = Math.round(bestScore * 100);
    return {
      content: `> 💡 *Likely you are asking about: **${bestIntent.title}** (${matchPct}% match)*\n\n${result.content}`,
      suggestions: result.suggestions,
    };
  }

  // ─── CONFIDENCE THRESHOLD 3: FALLBACK (< 50%) ──────────────────────────────
  const fallbackSuggestions = scoredCandidates.length > 0
    ? Array.from(new Set(scoredCandidates.slice(0, 3).map((c) => c.intent.title))).slice(0, 4)
    : ["About CGEC", "Departments", "Admission", "Placement", "Fee Structure", "Contact Us"];

  return {
    content: `I apologize — I don't have specific information about *"${rawInput}"* in my knowledge base right now.

For the most accurate and up-to-date details, please:
• 🌐 Visit the official website: **[cgec.org.in](https://cgec.org.in)**
• 📞 Call the college office: **${KB.college.phone}**
• ✉️ Email: **${KB.college.email}**
• 📋 Check the Notices section on this website

You can also try asking me about:`,
    suggestions: fallbackSuggestions.length >= 3
      ? fallbackSuggestions
      : ["About CGEC", "Departments", "Admission", "Placement", "Fee Structure", "Contact Us"],
  };
}

// ─── QUICK TOPIC CATEGORIES ──────────────────────────────────────────────────

const QUICK_TOPICS = [
  { icon: Info, label: "About CGEC", query: "About CGEC college" },
  { icon: GraduationCap, label: "Admission", query: "Admission process" },
  { icon: Building2, label: "Departments", query: "All departments" },
  { icon: BookOpen, label: "Fee Structure", query: "Fee structure" },
  { icon: Trophy, label: "Placements", query: "Placement records" },
  { icon: Microscope, label: "Labs & Research", query: "Research and labs" },
  { icon: Users, label: "Faculty", query: "Leadership and HODs" },
  { icon: Phone, label: "Contact", query: "Contact and location" },
];

// ─── MARKDOWN-LIKE RENDERER ──────────────────────────────────────────────────

function RenderMessage({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div className="space-y-1 text-sm leading-relaxed">
      {lines.map((line, i) => {
        if (line.startsWith("### ")) {
          return (
            <p key={i} className="font-bold text-base text-blue-900 mt-1 mb-1 border-b border-blue-100 pb-1">
              {line.replace("### ", "")}
            </p>
          );
        }
        if (line.startsWith("**") && line.endsWith("**") && !line.includes(" ")) {
          return <p key={i} className="font-semibold text-gray-800">{line.replace(/\*\*/g, "")}</p>;
        }
        if (line.startsWith("| ") && line.includes(" | ")) {
          if (line.includes("---")) return null;
          const cells = line.split("|").filter((c) => c.trim() !== "");
          const isHeader = lines[i + 1]?.includes("---");
          return (
            <div key={i} className={cn("grid gap-1 text-xs", cells.length === 2 ? "grid-cols-2" : cells.length === 3 ? "grid-cols-3" : "grid-cols-4")}>
              {cells.map((cell, j) => (
                <span key={j} className={cn("px-2 py-1 rounded", isHeader ? "font-bold bg-blue-50 text-blue-800" : "bg-gray-50 text-gray-700 border border-gray-100")}>
                  {cell.trim().replace(/\*\*/g, "")}
                </span>
              ))}
            </div>
          );
        }
        if (line.startsWith("• ") || line.startsWith("- ")) {
          const text = line.replace(/^[•\-] /, "");
          return (
            <div key={i} className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5 shrink-0">•</span>
              <span className="text-gray-700" dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>").replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 underline" target="_blank">$1</a>') }} />
            </div>
          );
        }
        if (line.match(/^\d+\./)) {
          return (
            <div key={i} className="flex items-start gap-2">
              <span className="text-blue-600 font-bold shrink-0 text-xs mt-0.5">{line.match(/^\d+/)?.[0]}.</span>
              <span className="text-gray-700" dangerouslySetInnerHTML={{ __html: line.replace(/^\d+\.\s*/, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
            </div>
          );
        }
        if (line.startsWith("> ")) {
          return (
            <div key={i} className="border-l-2 border-blue-300 pl-3 py-0.5 my-1 bg-blue-50/50 rounded-r">
              <span className="text-gray-600 italic text-xs" dangerouslySetInnerHTML={{ __html: line.replace(/^> /, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
            </div>
          );
        }
        if (line.startsWith("---")) {
          return <hr key={i} className="border-gray-100 my-2" />;
        }
        if (line.trim() === "") return <div key={i} className="h-1" />;
        return (
          <p key={i} className="text-gray-700" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>").replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 underline" target="_blank">$1</a>') }} />
        );
      })}
    </div>
  );
}

// ─── MAIN CHATBOT COMPONENT ──────────────────────────────────────────────────

interface Message {
  role: "user" | "bot";
  content: string;
  suggestions?: string[];
}

const ChatBot = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: `### 👋 Hello! I'm CGEC Smart Assistant

I'm your official AI guide for **Cooch Behar Government Engineering College**. I have comprehensive knowledge about academics, admissions, faculty, placements, and campus life.

*Ask me anything or pick a quick topic below!*`,
      suggestions: ["About CGEC", "Admission Process", "All Departments", "Placement Records"],
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickTopics, setShowQuickTopics] = useState(true);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setHasNewMessage(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setHasNewMessage(false);
    setTimeout(() => inputRef.current?.focus(), 300);
  };

  const handleSend = useCallback((customInput?: string) => {
    const messageText = (customInput || input).trim();
    if (!messageText) return;

    const userMsg: Message = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setShowQuickTopics(false);
    setIsLoading(true);

    const delay = 700 + Math.floor(Math.random() * 600);
    setTimeout(() => {
      const { content, suggestions } = getBotResponse(messageText);
      setMessages((prev) => [...prev, { role: "bot", content, suggestions }]);
      setIsLoading(false);
    }, delay);
  }, [input]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      {/* ── Floating Trigger Button ── */}
      <motion.div
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <AnimatePresence>
          {!isOpen && hasNewMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute -top-14 right-0 bg-white text-gray-800 rounded-2xl rounded-br-none px-3 py-2 text-xs font-semibold shadow-lg border border-gray-100 whitespace-nowrap"
            >
              💬 Ask me about CGEC!
              <div className="absolute bottom-0 right-3 translate-y-full w-0 h-0 border-l-8 border-l-transparent border-r-0 border-t-8 border-t-white" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleOpen}
          aria-label="Open CGEC Chat Assistant"
          className="w-13 h-13 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-full shadow-2xl shadow-blue-600/40 flex items-center justify-center relative"
        >
          <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7" />
          {hasNewMessage && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          )}
        </motion.button>
      </motion.div>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-20 right-3 sm:bottom-28 sm:right-6 w-[calc(100vw-1.5rem)] sm:w-[420px] max-w-[calc(100vw-1.5rem)] h-[520px] sm:h-[600px] max-h-[calc(100dvh-5.5rem)] bg-white rounded-3xl shadow-2xl shadow-blue-900/20 border border-gray-100 flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center ring-2 ring-white/20">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">CGEC Smart Assistant</h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-blue-200 font-semibold uppercase tracking-wider mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Online
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setMessages([{
                      role: "bot",
                      content: `### 👋 Chat Restarted

How can I help you today? Pick a topic or type your question!`,
                      suggestions: ["About CGEC", "Admission", "Departments", "Placement"],
                    }]);
                    setShowQuickTopics(true);
                  }}
                  className="text-[10px] text-blue-200 hover:text-white transition-colors font-medium px-2 py-1 rounded hover:bg-white/10"
                  title="Clear chat"
                >
                  Clear
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-white/10 text-blue-200 hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Topics */}
            <AnimatePresence>
              {showQuickTopics && messages.length <= 2 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-b border-gray-100 shrink-0 overflow-hidden"
                >
                  <div className="p-3 bg-gray-50/70">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 px-1">Quick Topics</p>
                    <div className="grid grid-cols-4 gap-1.5">
                      {QUICK_TOPICS.map(({ icon: Icon, label, query }) => (
                        <button
                          key={label}
                          onClick={() => handleSend(query)}
                          className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group shadow-sm"
                        >
                          <div className="w-7 h-7 rounded-lg bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                            <Icon className="w-3.5 h-3.5 text-blue-600" />
                          </div>
                          <span className="text-[9px] font-semibold text-gray-600 group-hover:text-blue-700 text-center leading-tight">{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2"
                >
                  <div className={cn("flex items-start gap-2.5", msg.role === "user" ? "flex-row-reverse" : "")}>
                    {/* Avatar */}
                    <div className={cn(
                      "w-7 h-7 rounded-xl flex items-center justify-center shrink-0 shadow-sm mt-0.5",
                      msg.role === "user"
                        ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white"
                        : "bg-white text-blue-600 border border-gray-200"
                    )}>
                      {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    {/* Bubble */}
                    <div className={cn(
                      "max-w-[82%] rounded-2xl px-4 py-3 shadow-sm",
                      msg.role === "user"
                        ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-tr-none"
                        : "bg-white border border-gray-100 rounded-tl-none"
                    )}>
                      {msg.role === "user" ? (
                        <p className="text-sm text-white/95">{msg.content}</p>
                      ) : (
                        <RenderMessage content={msg.content} />
                      )}
                    </div>
                  </div>

                  {/* Suggestion Pills */}
                  {msg.role === "bot" && msg.suggestions && msg.suggestions.length > 0 && i === messages.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-wrap gap-1.5 pl-10"
                    >
                      {msg.suggestions.map((s, si) => (
                        <button
                          key={si}
                          onClick={() => handleSend(s)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-white border border-blue-100 text-blue-700 rounded-full text-[11px] font-semibold hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm hover:shadow-md"
                        >
                          <ChevronRight className="w-3 h-3" />
                          {s}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {/* Typing Indicator */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="flex items-center gap-2.5"
                  >
                    <div className="w-7 h-7 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                      <Bot className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                      <div className="flex items-center gap-1.5">
                        {[0, 1, 2].map((dot) => (
                          <motion.div
                            key={dot}
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.15 }}
                            className="w-1.5 h-1.5 rounded-full bg-blue-400"
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="px-4 pb-4 pt-3 bg-white border-t border-gray-100 shrink-0">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 focus-within:border-blue-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask anything about CGEC..."
                  className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400 font-medium"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </motion.button>
              </div>
              <p className="text-[10px] text-gray-400 text-center mt-2 font-medium">
                Official CGEC Smart Assistant
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
