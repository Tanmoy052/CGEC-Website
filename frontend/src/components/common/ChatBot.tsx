"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "Hello! I am the CGEC Smart Assistant, the official AI assistant of Cooch Behar Government Engineering College. How can I assist you with information regarding academics, admissions, or campus facilities today?",
      suggestions: [
        "Admission Process",
        "Fee Structure",
        "Departments",
        "Placement Records",
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (customInput?: string) => {
    const messageText = customInput || input;
    if (!messageText.trim()) return;

    const userMessage = { role: "user", content: messageText, suggestions: [] };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setShowSuggestions(false);
    setIsLoading(true);

    // AI System Logic: Elaborate Institutional Knowledge Retrieval & Generation
    setTimeout(() => {
      let botResponse =
        "I'm sorry, I don't have specific information about that. For the most accurate and updated details, please refer to the official CGEC website at https://cgec.org.in/ or contact the college administrative office.";
      let suggestions: string[] = [];

      const lowerInput = messageText.toLowerCase().trim();

      // 1. GREETINGS & SYSTEM ROLE
      if (
        lowerInput === "hello" ||
        lowerInput === "hi" ||
        lowerInput === "hey" ||
        lowerInput.startsWith("hi ") ||
        lowerInput.startsWith("hello ")
      ) {
        botResponse = `### Welcome to CGEC Smart Assistant
        
Hello! I am the **CGEC Smart Assistant**, the official AI-powered digital assistant of Cooch Behar Government Engineering College. 

I am here to provide you with comprehensive information regarding:
• **Admissions & Fees:** WBJEE/JELET process and detailed fee structures.
• **Academics & Departments:** CSE, ECE, EE, ME, CE, and BSH.
• **Leadership & Faculty:** Details on Principal, HODs, TPO, and teachers.
• **Infrastructure:** Campus, labs, hostels, and workshops.
• **Placements:** Recruitment records, training, and contact info.
• **Notices & Projects:** Official updates and research focus.

How can I assist you today?`;
        suggestions = ["Admission 2025", "Departments", "Campus Tour"];
      }

      // 5. FEES & STRUCTURE
      else if (
        lowerInput === "fees" ||
        lowerInput === "fee" ||
        lowerInput.includes("fee structure") ||
        lowerInput.includes("cost") ||
        lowerInput.includes("money") ||
        lowerInput.includes("fees details")
      ) {
        botResponse = `### Subsidized Fee Structure (Government Norms)

As a government college, CGEC offers high-quality education at low costs:

• **B.Tech CSE/ECE:** ₹1,000/- Per Month (Semester Fees).
• **B.Tech EE/ME/CE:** ₹500/- Per Month (Semester Fees).
• **Hostel Fees:** Approx. ₹14,700 - ₹15,000 per year (Including Security & Mess).
• **Payment:** All payments are handled via official government portals or Demand Draft.`;
        suggestions = ["Admission Process", "Scholarships", "Hostel Details"];
      }

      // 2. INSTITUTIONAL IDENTITY & ABOUT
      else if (
        lowerInput.includes("about") ||
        lowerInput.includes("college") ||
        lowerInput.includes("institution") ||
        lowerInput.includes("cgec") ||
        lowerInput.includes("mission") ||
        lowerInput.includes("vision")
      ) {
        botResponse = `### About CGEC (Institutional Identity)

**Cooch Behar Government Engineering College (CGEC)** is a premier government institution established in 2016 by the Higher Education Department, Government of West Bengal.

• **Identity:** A Government of West Bengal institution dedicated to technical excellence.
• **Motto:** "तमसो मा ज्योतिर्गमय" (From darkness, lead me to enlightenment).
• **Established:** 2016.
• **Campus:** A sprawling **21-acre green campus** in Cooch Behar.
• **Affiliation:** MAKAUT (formerly WBUT).
• **Approval:** AICTE Approved.
• **Vision:** To develop technically competent engineers who contribute to society.`;
        suggestions = ["Principal's Message", "Location", "Affiliation"];
      }

      // 3. LEADERSHIP, HOD, TPO & TEACHERS
      else if (
        lowerInput === "hod" ||
        lowerInput.includes("heads of department") ||
        lowerInput.includes("hods")
      ) {
        botResponse = `### Official Heads of Departments (HODs) at CGEC

Based on the latest institutional records from **cgec.org.in**, our departments are led by:

• **Mechanical Engineering (ME):** **Dr. Sushovan Chatterjee** (Principal & HOD)
  > *"Excellent facilities are available to prepare students as professional Mechanical Engineers with a focus on innovation."*

• **Electronics & Comm. Engg. (ECE):** **Dr. Sourav Chakraborty** (HOD)
  > *"Our students at CGEC are sufficiently adaptive engineers with an absolute entrepreneurial mindset."*

• **Civil Engineering (CE):** **Prof. Biren Gurung** (HOD)
  > *"The aim is to impart sound knowledge of theory with exposure to practical knowledge through laboratories."*

• **Computer Science & Engineering (CSE):** **Dr. Somen Mondal** (HOD)

• **Electrical Engineering (EE):** **Prof. Atanu Maji** (HOD)

• **Basic Science & Humanities (BSH):** **Dr. Samik Nag** (Chemistry & Physics)
  > *"Basic knowledge of Physics, Chemistry, and Mathematics is essential to make a perfect engineer."*

These leaders oversee academic quality, research, and laboratory development in their respective branches.`;
        suggestions = ["Principal's Message", "Faculty Details", "Departments"];
      } else if (
        lowerInput.includes("tpo") ||
        lowerInput.includes("teacher") ||
        lowerInput.includes("faculty") ||
        lowerInput.includes("principal") ||
        lowerInput.includes("leadership") ||
        lowerInput.includes("message")
      ) {
        botResponse = `### Leadership & Faculty at CGEC

Our institution is guided by experienced academicians:

• **Principal:** **Dr. Sushovan Chatterjee** (Mechanical Engineering). 
  > *"Excellent facilities are available to prepare students as professional engineers."*
• **Registrar (I/C):** **Dr. Kingshuk Dan** (Civil Engineering).
• **Training & Placement Officer (TPO):** **Dr. Somen Mondal**.
• **Key HODs:**
  - **ECE:** Dr. Palash Das.
  - **EE:** Dr. Sourav Chakraborty / Prof. Atanu Maji.
  - **CSE:** Prof. Rajib Das (TPO Rep).
  - **Physics/BSH:** Dr. Samik Nag.
• **Faculty Excellence:** 40+ dedicated faculty members across all departments.`;
        suggestions = ["Placement Cell", "CSE Department", "EE Department"];
      }

      // 4. GENERAL ACADEMIC PROGRAMS & DEPARTMENTS
      else if (
        lowerInput.includes("department") ||
        lowerInput.includes("course") ||
        lowerInput.includes("b.tech") ||
        lowerInput.includes("academic") ||
        lowerInput.includes("branch") ||
        lowerInput.includes("syllab") ||
        lowerInput.includes("curriculum")
      ) {
        botResponse = `### Master Guide: All Departments at CGEC

CGEC follows the **MAKAUT** curriculum. Below are the complete details for all academic departments:

**1. Computer Science & Engineering (CSE)**
• **HOD:** Dr. Somen Mondal.
• **Key Faculty:** Prof. Arnab Gain (Assistant Professor).
• **Focus:** Software Dev, AI/ML, Cybersecurity, Cloud Computing.
• **Labs:** AI Lab, Networking Lab, Programming Lab, Data Structure Lab.
• **Student Quote:** *"The coding culture here is growing rapidly. Seniors are very helpful and the placement cell works tirelessly."* - Subhojit Gorain.

**2. Electronics & Communication Engineering (ECE)**
• **Key Faculty:** Dr. Sourav Chakraborty (HOD).
• **Focus:** VLSI Design, Embedded Systems, 5G, Digital Signal Processing.
• **Labs:** Communication Lab, VLSI Lab, Microprocessor Lab, DSP Lab.
• **Student Quote:** *"The ECE department at CGEC is known for its strong emphasis on practical learning."* - Pritam Laskar.

**3. Electrical Engineering (EE)**
• **HOD:** Prof. Atanu Maji.
• **Key Faculty:** Dr. Somen Mondal (TPO Head).
• **Focus:** Smart Grids, Power Electronics, Machines, Control Systems.
• **Labs:** Electrical Machine Lab, Power System Lab, Control Lab, Circuit Theory Lab.
• **Student Quote:** *"The EE department is known for its hands-on approach to learning."* - Arpan Maity.

**4. Mechanical Engineering (ME)**
• **Leadership:** Dr. Sushovan Chatterjee (Principal).
• **Key Faculty:** Prof. Masud Rana (TPO Rep).
• **Focus:** Robotics, CAD/CAM, Thermodynamics, Fluid Mechanics.
• **Labs:** Workshop, Thermodynamics Lab, Fluid Mechanics Lab, CAD Lab.
• **Academic Quote:** *"Excellent facilities in terms of equipment and staff are available to prepare students as professional engineers."* - Dr. Sushovan Chatterjee.

**5. Civil Engineering (CE)**
• **Leadership:** Prof. Biren Gurung (HOD).
• **Key Faculty:** Prof. Chhandamay Ray (TPO Rep).
• **Focus:** Structural Analysis, Geotechnical, Surveying, Urban Planning.
• **Labs:** Concrete Lab, Surveying Lab, Soil Mechanics Lab, Environmental Lab.

**6. Basic Science & Humanities (BSH)**
• **Key Faculty:** Dr. Samik Nag (Physics/Chemistry).
• **Focus:** Physics, Chemistry, Maths, Professional Communication.
• **Labs:** Physics Lab, Chemistry Lab, Language Lab.

**Academic Highlights:**
• **Evaluation:** Internal CA1-CA4 + MAKAUT Semester Exams.
• **Practical:** Mandatory industrial visits to NTPC, WBSEDCL.
• **Projects:** Final year capstone projects are mandatory for degree completion.`;
        suggestions = ["Fee Structure", "Placement Cell", "Campus Tour"];
      }

      // 4.1 SPECIFIC DEPARTMENTS (Deep Dive)
      else if (
        lowerInput.includes("cse") ||
        lowerInput.includes("computer science")
      ) {
        botResponse = `### Computer Science & Engineering (CSE)
        
The CSE department at CGEC is a hub of innovation and technical excellence.

• **HOD:** Dr. Somen Mondal.
• **Key Faculty:** Prof. Arnab Gain (Assistant Professor).
• **Focus Areas:** Software Development, Artificial Intelligence (AI), Machine Learning (ML), and Cybersecurity.
• **Labs:** Programming Lab, Networking Lab, AI Lab, and Data Structure Lab.
• **Student Insight:** *"The coding culture here is growing rapidly. Seniors are very helpful and the placement cell works tirelessly for student success."* - Subhojit Gorain (CSE Student).
• **Placement:** High recruitment from TCS, Infosys, and Cognizant.`;
        suggestions = ["CSE Labs", "CSE Faculty", "Placement Records"];
      } else if (
        lowerInput.includes("ece") ||
        lowerInput.includes("electronics")
      ) {
        botResponse = `### Electronics & Communication Engineering (ECE)
        
The ECE department focuses on cutting-edge communication and electronic systems.

• **HOD:** Dr. Sourav Chakraborty.
• **Key Faculty:** Dr. Palash Das (Assistant Professor).
• **Focus Areas:** VLSI Design, Embedded Systems, Digital Signal Processing (DSP), and 5G Communication.
• **Labs:** Communication Lab, VLSI Lab, Microprocessor Lab, and DSP Lab.
• **Student Insight:** *"The ECE department at CGEC is known for its strong emphasis on practical learning."* - Pritam Laskar (ECE Student).
• **Carrier Paths:** VLSI Design, Network Engineering, and IoT Developer.`;
        suggestions = ["ECE Labs", "ECE Faculty", "VLSI Research"];
      } else if (
        lowerInput === "ee" ||
        lowerInput.includes("electrical engineering")
      ) {
        botResponse = `### Electrical Engineering (EE)
        
The EE department provides a strong foundation in power systems and electrical machines.

• **HOD:** Prof. Atanu Maji.
• **Key Faculty:** Dr. Somen Mondal (TPO Head).
• **Focus Areas:** Smart Grids, Power Electronics, Machines, and Control Systems.
• **Labs:** Electrical Machine Lab, Power System Lab, and Control Lab.
• **Student Insight:** *"The EE department is known for its hands-on approach to learning. We work on real-world projects."* - Arpan Maity (EE Student).`;
        suggestions = ["EE Labs", "EE Faculty", "Placement Records"];
      } else if (
        lowerInput === "me" ||
        lowerInput.includes("mechanical engineering")
      ) {
        botResponse = `### Mechanical Engineering (ME)
        
The ME department focuses on thermodynamics, manufacturing, and design.

• **Leadership:** Dr. Sushovan Chatterjee (Principal & Associate Professor).
• **Key Faculty:** Prof. Masud Rana (TPO Rep).
• **Focus Areas:** Robotics, CAD/CAM, Thermodynamics, and Fluid Mechanics.
• **Labs:** Workshop, Thermodynamics Lab, Fluid Mechanics Lab, and CAD Lab.
• **Academic Quote:** *"Excellent facilities in terms of equipment and staff are available to prepare students as professional Mechanical Engineers."* - Dr. Sushovan Chatterjee.`;
        suggestions = ["ME Labs", "Mechanical Workshop", "CAD Facilities"];
      } else if (
        lowerInput === "ce" ||
        lowerInput.includes("civil engineering")
      ) {
        botResponse = `### Civil Engineering (CE)
        
The CE department excels in infrastructure and structural engineering.

• **Leadership:** Prof. Biren Gurung (HOD).
• **Key Faculty:** Prof. Chhandamay Ray (TPO Rep).
• **Focus Areas:** Structural Analysis, Geotechnical Engineering, Surveying, and Urban Planning.
• **Labs:** Concrete Lab, Surveying Lab, Soil Mechanics Lab, and Environmental Lab.
• **Mission:** To impart sound knowledge of the theory of civil engineering subjects.`;
        suggestions = ["CE Labs", "Civil Faculty", "Surveying Camp"];
      } else if (
        lowerInput.includes("bsh") ||
        lowerInput.includes("science") ||
        lowerInput.includes("humanities")
      ) {
        botResponse = `### Basic Science & Humanities (BSH)
        
The BSH department provides the foundational knowledge for all engineering disciplines.

• **Key Faculty:** Dr. Samik Nag (Physics), Dr. Samik Nag (Chemistry HOD).
• **Subjects:** Physics, Chemistry, Mathematics, and Professional Communication.
• **Labs:** Physics Lab, Chemistry Lab, and Language Lab.
• **Importance:** Ensuring students have a solid conceptual foundation before entering core engineering.`;
        suggestions = ["Physics Lab", "Language Lab", "BSH Faculty"];
      }

      // 6. ADMISSION PROCESS
      else if (
        lowerInput.includes("admission") ||
        lowerInput.includes("apply") ||
        lowerInput.includes("entrance") ||
        lowerInput.includes("wbjee") ||
        lowerInput.includes("cut-off")
      ) {
        botResponse = `### Admission 2025-26

Admission to CGEC is strictly merit-based:

• **B.Tech (1st Year):** Based on **WBJEE** ranking.
• **Lateral Entry:** Based on **JELET** ranking (2nd Year entry).
• **Counseling:** Conducted centrally by the WBJEE Board.
• **Notice:** Check the official "NOTIFICATION FOR ADMISSION PROCESS 2025-26" PDF on the website for specific dates.`;
        suggestions = ["Latest Notices", "Cut-off Ranks", "Contact Us"];
      }

      // 7. PLACEMENTS & TPO
      else if (
        lowerInput.includes("placement") ||
        lowerInput.includes("job") ||
        lowerInput.includes("recruit") ||
        lowerInput.includes("salary") ||
        lowerInput.includes("package")
      ) {
        botResponse = `### Training & Placement Cell

Heading by **Prof. Somen Mondal**, the T&P Cell has a strong track record:

• **Highest Package:** 21 LPA.
• **Top Recruiters:** TCS, Infosys, Cognizant, Wipro, ICICI Bank, Mindtree, HCL, Tech Mahindra, LTI.
• **Record:** 15,000+ graduates across all WB government engineering colleges (Centralized).
• **Training:** Aptitude, soft skills, and mock interviews.`;
        suggestions = ["TPO Contact", "Top Recruiters", "Internships"];
      }

      // 8. INFRASTRUCTURE & LOCATION
      else if (
        lowerInput.includes("infrastructure") ||
        lowerInput.includes("campus") ||
        lowerInput.includes("location") ||
        lowerInput.includes("address") ||
        lowerInput.includes("contact") ||
        lowerInput.includes("where") ||
        lowerInput.includes("library") ||
        lowerInput.includes("hostel") ||
        lowerInput.includes("lab") ||
        lowerInput.includes("facility")
      ) {
        botResponse = `### Campus & Facilities

CGEC provides a world-class environment:

• **Campus:** 20+ acre green campus in Harinchawra, Cooch Behar.
• **Library:** 7,000+ volumes, digital reading room.
• **Computing:** 140+ high-end PCs (Central Computing Facility).
• **Hostels:** 5 Dedicated Hostels (Boys & Girls) on campus.
• **Smart Labs:** Each department has specialized laboratories for practical learning.
• **Contact:** principalofficecgec@gmail.com | 03582-233040`;
        suggestions = ["Hostel Rules", "Library Hours", "Transport"];
      }

      // 9. NOTICES & EVENTS
      else if (
        lowerInput.includes("notice") ||
        lowerInput.includes("project") ||
        lowerInput.includes("research") ||
        lowerInput.includes("update") ||
        lowerInput.includes("event") ||
        lowerInput.includes("fest")
      ) {
        botResponse = `### Notices & Student Life

Stay updated with official college events:

• **Notices:** Academic, Exam, and Admission notices are updated daily on the website.
• **Technical Fest:** **Zeal** - The annual technical extravaganza.
• **Student Voices:** *"A perfect place to study, learn and increase knowledge."*
• **Clubs:** Active NSS unit, coding clubs, and sports meets.`;
        suggestions = ["Latest Notice", "Academic Calendar", "Fest Dates"];
      }

      setMessages((prev) => [
        ...prev,
        { role: "bot", content: botResponse, suggestions },
      ]);
      setShowSuggestions(true);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl shadow-blue-600/40 flex items-center justify-center z-50 group"
      >
        <MessageSquare className="w-8 h-8 group-hover:rotate-12 transition-transform" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 w-[420px] h-[600px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 flex justify-between items-center">
              <div className="flex items-center space-x-3 text-white">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold tracking-tight">
                    CGEC Smart Assistant
                  </h3>
                  <div className="flex items-center text-[10px] text-blue-100 uppercase tracking-widest font-bold">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                    Live AI Assistant
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
              {messages.map((msg, i) => (
                <div key={i} className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex items-start space-x-3",
                      msg.role === "user"
                        ? "flex-row-reverse space-x-reverse"
                        : "",
                    )}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                        msg.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-white text-blue-600 border border-gray-100",
                      )}
                    >
                      {msg.role === "user" ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={cn(
                        "p-4 rounded-2xl text-sm leading-relaxed shadow-sm max-w-[85%]",
                        msg.role === "user"
                          ? "bg-blue-600 text-white rounded-tr-none"
                          : "bg-white text-gray-800 rounded-tl-none border border-gray-100",
                      )}
                    >
                      <div className="prose prose-sm prose-blue max-w-none">
                        {msg.content.split("\n").map((line, idx) => (
                          <p
                            key={idx}
                            className={cn(
                              "m-0",
                              line.startsWith("###")
                                ? "font-bold text-lg text-blue-900 mt-2 mb-1"
                                : "",
                            )}
                          >
                            {line.startsWith("###")
                              ? line.replace("### ", "")
                              : line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Suggestions for Bot Messages */}
                  {msg.role === "bot" &&
                    (msg as any).suggestions &&
                    showSuggestions &&
                    i === messages.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-wrap gap-2 pl-11"
                      >
                        {(msg as any).suggestions.map(
                          (suggestion: string, sIdx: number) => (
                            <button
                              key={sIdx}
                              onClick={() => handleSend(suggestion)}
                              className="px-3 py-1.5 bg-white border border-blue-100 text-blue-600 rounded-full text-xs font-semibold hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm"
                            >
                              {suggestion}
                            </button>
                          ),
                        )}
                      </motion.div>
                    )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center space-x-3 pl-1">
                  <div className="w-8 h-8 rounded-xl bg-white border border-gray-100 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  </div>
                  <div className="bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm">
                    <span className="text-xs font-medium text-gray-500">
                      Assistant is typing...
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 bg-white border-t border-gray-100">
              <div className="relative flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me anything about CGEC..."
                  className="flex-1 pl-4 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:bg-white focus:border-transparent outline-none transition-all text-sm font-medium"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 disabled:bg-gray-300 transition-all shadow-lg shadow-blue-600/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-gray-400 text-center mt-3 font-medium">
                Official Institutional Assistant | v2.0 Professional
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
