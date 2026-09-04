import prisma from '../lib/prisma';

export const initialNotices = [
  {
    title: "Notice for Approved list contains selected students for WBFS (Full Freeship/ Half freeship) 2025-26 for 2nd year students.",
    content: "Approved list of selected students for West Bengal Freeship Scheme (WBFS) 2025-26. Beneficiaries must submit documentation to the scholarship cell.",
    category: "Academic",
    priority: "HIGH",
    department: "ALL",
    attachment: "/data/notices/wbfs_list_2025.pdf",
  },
  {
    title: "Status of applications for decentralized counselling of B.Tech 3rd Semester (Lateral Entry) candidates 2025-26",
    content: "Update on the status of applications for decentralized counselling for lateral entry candidates against vacant seats.",
    category: "Academic",
    priority: "HIGH",
    department: "ALL",
    attachment: "/data/notices/decentralized_status.pdf",
  },
  {
    title: "NOTICE FOR ADMISSION THROUGH DECENTRALIZED COUNSELLING IN THE 2nd YEAR (LATERAL ENTRY) OF B. TECH COURSES AGAINST VACANCY",
    content: "Notice regarding admission through decentralized counselling for 2nd year lateral entry students. Physical document verification required.",
    category: "Academic",
    priority: "HIGH",
    department: "ALL",
    attachment: "/data/notices/lateral_entry_admission.pdf",
  },
  {
    title: "NOTICE FOR REQUIREMENT OF VISITING FACULTY FOR THE EVEN SEMESTER 2026",
    content: "Applications are invited from eligible candidates for Visiting Faculty positions in CSE, ECE, EE, ME, CE, and BSH for the upcoming even semester.",
    category: "Recruitment",
    priority: "NORMAL",
    department: "ALL",
    attachment: "/data/notices/visiting_faculty_2026.pdf",
  },
  {
    title: "Notice inviting Quotation for Jungle Cutting and Cleaning of Sewerages of college campus",
    content: "Sealed quotations are invited from bona fide agencies/contractors for jungle cutting and cleaning of sewerages within college premises.",
    category: "Tender",
    priority: "HIGH",
    department: "ALL",
    attachment: "/data/notices/jungle_cutting_tender.pdf",
  },
  {
    title: "Notice Inviting Quotation for supply of various Items for CGEC Annual Sports Meet 2026",
    content: "Quotations invited for the supply of sports equipment, trophies, medals, and refreshments for the Annual Sports Meet 2026.",
    category: "Tender",
    priority: "HIGH",
    department: "ALL",
    attachment: "/data/notices/sports_meet_tender.pdf",
  },
  {
    title: "Notice Inviting Quotation for supply of CCTV and Electrical Items for Conduct of Semester Examination",
    content: "Quotations invited for CCTV surveillance equipment, wiring, and high-intensity lights required for semester examinations.",
    category: "Tender",
    priority: "NORMAL",
    department: "ALL",
    attachment: "/data/notices/cctv_tender.pdf",
  },
  {
    title: "Notice Inviting Quotation for the supply of Refreshments for Admission 2025-26",
    content: "Quotations invited for supplying refreshments and packaged water during the admission counselling process.",
    category: "Tender",
    priority: "NORMAL",
    department: "ALL",
    attachment: "/data/notices/refreshments_tender.pdf",
  },
  {
    title: "Placement Drive: Tata Consultancy Services (TCS) for 2026 Graduating Batch",
    content: "TCS National Qualifier Test (NQT) recruitment drive for 2026 passing out batch across all engineering streams.",
    category: "Recruitment",
    priority: "HIGH",
    department: "ALL",
    attachment: "/data/notices/tcs_recruitment.pdf",
  },
];

export const initialGallery = [
  {
    title: "Main Academic Building & Front Lawns",
    category: "Campus",
    imageUrl: "/img/hero/slider-1.jpg",
    description: "Cooch Behar Government Engineering College main academic building",
  },
  {
    title: "Modern Computer Center & Computing Labs",
    category: "Labs",
    imageUrl: "/img/hero/slider-2.jpg",
    description: "Equipped with high-performance workstations and optical fiber connectivity",
  },
  {
    title: "Advanced Electronics & Communication Lab",
    category: "Labs",
    imageUrl: "/img/hero/slider-3.jpg",
    description: "Microwave and VLSI design engineering laboratories",
  },
  {
    title: "Central Administrative Block",
    category: "Campus",
    imageUrl: "/img/hero/slider-4.webp",
    description: "Administrative facilities, principal's office, and conference hall",
  },
  {
    title: "Electrical Machines & Power Systems Lab",
    category: "Labs",
    imageUrl: "/img/hero/slider-5.jpg",
    description: "Heavy machinery and smart grid test benches",
  },
  {
    title: "Computer Science Laboratory",
    category: "Labs",
    imageUrl: "/img/labs/cse_lab.jpg",
    description: "CSE department high-speed software lab",
  },
];
export const initialWallMagazines: any[] = [];

export const fullFacultyList = [
  // ==================== CSE ====================
  {
    name: "Dr. Somen Mondal",
    designation: "HOD and Assistant Professor",
    department: "CSE",
    email: "smondal@cgec.org.in",
    experience: "09 Years",
    qualifications: ["B.Tech.", "M.Tech."],
    specialization: ["Cloud Computing", "Advanced Cryptography & Network Security"],
    image: "/img/Faculty/Somen_P.jpg",
    cvLink: "/data/cse/cv/somen.pdf",
  },
  {
    name: "Mr. Arnab Gain",
    designation: "Assistant Professor",
    department: "CSE",
    email: "arnab.gain@cgec.org.in",
    experience: "2 yr 7 month",
    qualifications: ["M.E."],
    specialization: ["Computer Vision", "Deep Learning", "Formal Language and Automata Theory", "Design and Analysis of Algorithm"],
    image: "/img/Faculty/423-A.jpg",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Mr. Shahid Ali",
    designation: "Technical Assistant",
    department: "CSE",
    email: "shahid.ali@cgec.org.in",
    experience: "9 yrs",
    qualifications: ["B.Sc.", "PDIT", "PGDSE"],
    specialization: ["Computer Applications", "C", "C++", "Java", "VB"],
    image: "/img/Faculty/ii.jpg",
    cvLink: "/data/cse/cv/shahid_ali.pdf",
  },
  {
    name: "Mr. Pranab Kumar Mallick",
    designation: "Technical Assistant",
    department: "CSE",
    email: "pranab.mallick@cgec.org.in",
    experience: "7 Years",
    qualifications: ["B.Tech", "M.Tech in CSE"],
    specialization: ["Data Structure", "Image Processing", "Soft Computing"],
    image: "/img/Faculty/Mama.jpg",
    cvLink: "/data/cse/cv/pranab.pdf",
  },
  {
    name: "Mr. Umakanta Bera",
    designation: "Technical Assistant",
    department: "CSE",
    email: "umakanta.bera@cgec.org.in",
    experience: "07 Years",
    qualifications: ["B.Tech."],
    specialization: ["Data Structure", "Python", "C", "Java", "Computer Architecture"],
    image: "/img/Faculty/CSE_Umakanta_Bera.jpg",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Dr. Prabir Kr. Naskar",
    designation: "Assistant Professor",
    department: "CSE",
    email: "prabir.naskar@cgec.org.in",
    experience: "9 Years",
    qualifications: ["B.Tech", "M.Tech", "Ph.D"],
    specialization: ["Machine Learning", "Data Mining", "Algorithms"],
    image: "/img/Faculty/PrabirNaskar_cse.jpg.jpeg",
    cvLink: "/data/cv/sample_cv.pdf",
  },

  // ==================== ECE ====================
  {
    name: "Mr. Sourav Saha",
    designation: "HOD and Assistant Professor",
    department: "ECE",
    email: "sourav.saha@cgec.org.in",
    experience: "8 Years",
    qualifications: ["B.Tech", "M.Tech"],
    specialization: ["VLSI Design", "Semiconductor Devices", "Microprocessors"],
    image: "/img/Faculty/sourav.png",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Mr. Palash Das",
    designation: "Assistant Professor",
    department: "ECE",
    email: "palash.das@cgec.org.in",
    experience: "6.5 Years",
    qualifications: ["B.Tech", "M.Tech"],
    specialization: ["Digital Communication", "Signal Processing"],
    image: "/img/Faculty/ECEpalashDas.jpg",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Mr. Avshek Bhattacharya",
    designation: "Assistant Professor",
    department: "ECE",
    email: "avshek.ece@cgec.org.in",
    experience: "7 Years",
    qualifications: ["B.Tech", "M.Tech"],
    specialization: ["Microwave Engineering", "Antenna Design"],
    image: "/img/Faculty/ECE_Avshek.bmp",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Mr. Abhijit Bose",
    designation: "Assistant Professor",
    department: "ECE",
    email: "abhijit.bose@cgec.org.in",
    experience: "5 Years",
    qualifications: ["B.Tech", "M.Tech"],
    specialization: ["Embedded Systems", "IoT"],
    image: "/img/Faculty/abhijit_ece01082024.jpeg",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Mr. Soumik Roy",
    designation: "Technical Assistant",
    department: "ECE",
    email: "soumik.roy@cgec.org.in",
    experience: "8 Years",
    qualifications: ["Diploma in ECE", "B.Tech in ECE"],
    specialization: ["Communication Lab", "VLSI CAD Tools"],
    image: "/img/Faculty/Soumik_Roy.jpeg",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Mr. Kingshuk Dan",
    designation: "Technical Assistant",
    department: "ECE",
    email: "kingshuk.dan@cgec.org.in",
    experience: "6 Years",
    qualifications: ["Diploma", "B.Tech"],
    specialization: ["Circuit Simulation", "Digital Electronics"],
    image: "/img/Faculty/Kingshuk Dan.jpg",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Mr. Sudipta Roy",
    designation: "Technical Assistant",
    department: "ECE",
    email: "sudipta.roy@cgec.org.in",
    experience: "7.5 Years",
    qualifications: ["Diploma", "B.Tech"],
    specialization: ["Analog Electronics", "Microcontroller Hardware"],
    image: "/img/Faculty/sudipta_roy.jpeg",
    cvLink: "/data/cv/sample_cv.pdf",
  },

  // ==================== EE ====================
  {
    name: "Dr. Goutam Panda",
    designation: "HOD and Associate Professor",
    department: "EE",
    email: "goutam.panda@cgec.org.in",
    experience: "15 Years",
    qualifications: ["B.E.", "M.E.", "Ph.D"],
    specialization: ["Power Systems", "High Voltage Engineering", "Smart Grid"],
    image: "/img/Faculty/GoutamPandaSir_ee.jpg",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Prof. Mafizul Islam",
    designation: "Assistant Professor",
    department: "EE",
    email: "mafizul.islam@cgec.org.in",
    experience: "10 Years",
    qualifications: ["B.Tech", "M.Tech"],
    specialization: ["Electrical Machines", "Renewable Energy Systems"],
    image: "/img/Faculty/Prof._Mafizul_Islam_ee.jpg",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Mr. Deepjyoti Santra",
    designation: "Assistant Professor",
    department: "EE",
    email: "deepjyoti.santra@cgec.org.in",
    experience: "6 Years",
    qualifications: ["B.Tech", "M.Tech"],
    specialization: ["Control Systems", "Instrumentation Engineering"],
    image: "/img/Faculty/DeepjyotiSantra_ee.jpeg",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Mr. Tanumoy Das",
    designation: "Technical Assistant",
    department: "EE",
    email: "tanumoy.das@cgec.org.in",
    experience: "8 Years",
    qualifications: ["Diploma in EE", "B.Tech in EE"],
    specialization: ["Power Electronics Lab", "Electric Drives"],
    image: "/img/Faculty/EE_Tanumoy.jpg",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Mr. Atanu Das",
    designation: "Technical Assistant",
    department: "EE",
    email: "atanu.das@cgec.org.in",
    experience: "7.5 Years",
    qualifications: ["Diploma in EE", "B.Tech in EE"],
    specialization: ["Measurements & Instrumentations", "Machine Testing"],
    image: "/img/Faculty/EE_Atanu.jpg",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Mr. Rajib Das",
    designation: "Technical Assistant",
    department: "EE",
    email: "rajib.das@cgec.org.in",
    experience: "7 Years",
    qualifications: ["Diploma", "B.Tech"],
    specialization: ["Circuit Theory Lab", "Simulation Lab"],
    image: "/img/Faculty/RAJIB Das.JPG",
    cvLink: "/data/cv/sample_cv.pdf",
  },

  // ==================== ME ====================
  {
    name: "Dr. Sanchayan Mukherjee",
    designation: "HOD and Associate Professor",
    department: "ME",
    email: "sanchayan.mukherjee@cgec.org.in",
    experience: "16 Years",
    qualifications: ["B.E.", "M.E.", "Ph.D"],
    specialization: ["Thermal Engineering", "Fluid Mechanics", "CFD"],
    image: "/img/Faculty/SanchayanMukherjeeSir_me.jpg",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Dr. Sushovan Chatterjee",
    designation: "Assistant Professor",
    department: "ME",
    email: "sushovan.chatterjee@cgec.org.in",
    experience: "9 Years",
    qualifications: ["B.Tech", "M.Tech", "Ph.D"],
    specialization: ["Manufacturing Sciences", "Additive Manufacturing", "Machining"],
    image: "/img/Faculty/ME_Sushovan_Chatterjee.jpg",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Dr. Provas Kumar Roy",
    designation: "Associate Professor",
    department: "ME",
    email: "provas.roy@cgec.org.in",
    experience: "14 Years",
    qualifications: ["B.Tech", "M.Tech", "Ph.D"],
    specialization: ["Machine Design", "Optimization Techniques", "Tribology"],
    image: "/img/Faculty/ME_Provas.jpg",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Mr. Prasenjit Ghosh",
    designation: "Assistant Professor",
    department: "ME",
    email: "prasenjit.ghosh@cgec.org.in",
    experience: "7 Years",
    qualifications: ["B.Tech", "M.Tech"],
    specialization: ["Robotics", "Kinematics & Dynamics of Machines"],
    image: "/img/Faculty/ME_Prasenjit.jpg",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Mr. Masud Mondal",
    designation: "Technical Assistant",
    department: "ME",
    email: "masud.mondal@cgec.org.in",
    experience: "8 Years",
    qualifications: ["Diploma in ME"],
    specialization: ["Machine Shop", "Lathe & Milling Operations"],
    image: "/img/Faculty/Masud_me.jpeg",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Mr. Nikhil Roy",
    designation: "Technical Assistant",
    department: "ME",
    email: "nikhil.roy@cgec.org.in",
    experience: "7 Years",
    qualifications: ["Diploma in ME"],
    specialization: ["Fitting & Welding Shop", "Foundry Practice"],
    image: "/img/Faculty/nikhil_me01082024.jpeg",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Dr. Ziaul Mondal",
    designation: "Assistant Professor",
    department: "ME",
    email: "ziaul.mondal@cgec.org.in",
    experience: "8.5 Years",
    qualifications: ["B.Tech", "M.Tech", "Ph.D"],
    specialization: ["Material Science", "Heat Treatment", "Nanomaterials"],
    image: "/img/Faculty/ziaul_me01082024.jpeg",
    cvLink: "/data/cv/sample_cv.pdf",
  },

  // ==================== CE ====================
  {
    name: "Dr. Chhandamay Ray",
    designation: "HOD and Associate Professor",
    department: "CE",
    email: "chhandamay.ray@cgec.org.in",
    experience: "15 Years",
    qualifications: ["B.E.", "M.E.", "Ph.D"],
    specialization: ["Structural Engineering", "Concrete Technology", "Earthquake Resistant Design"],
    image: "/img/Faculty/ChhandamayRay_ce.jpg",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Mr. Mithun Mandal",
    designation: "Assistant Professor",
    department: "CE",
    email: "mithun.mandal@cgec.org.in",
    experience: "8 Years",
    qualifications: ["B.Tech", "M.Tech"],
    specialization: ["Geotechnical Engineering", "Soil Dynamics", "Foundation Engineering"],
    image: "/img/Faculty/MithunMandal_ce.jpg",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Mr. Ansarul Islam",
    designation: "Assistant Professor",
    department: "CE",
    email: "ansarul.islam@cgec.org.in",
    experience: "6.5 Years",
    qualifications: ["B.Tech", "M.Tech"],
    specialization: ["Transportation Engineering", "Highway Materials", "Traffic Flow"],
    image: "/img/Faculty/ansarul_ce01082024.jpg",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Mr. Shyamal Das",
    designation: "Technical Assistant",
    department: "CE",
    email: "shyamal.das@cgec.org.in",
    experience: "8 Years",
    qualifications: ["Diploma in CE", "B.Tech in CE"],
    specialization: ["Surveying Lab", "Total Station & GPS", "Concrete Testing Lab"],
    image: "/img/Faculty/shyamalSir_ce.jpeg",
    cvLink: "/data/cv/sample_cv.pdf",
  },

  // ==================== BSH ====================
  {
    name: "Dr. Biplab Maity",
    designation: "HOD & Assistant Professor (Physics)",
    department: "BSH",
    email: "biplab.maity@cgec.org.in",
    experience: "12 Years",
    qualifications: ["M.Sc", "Ph.D"],
    specialization: ["Condensed Matter Physics", "Semiconductors", "Nanostructures"],
    image: "/img/Faculty/BiplabMaity_bsh.jpg",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Dr. Samik Nag",
    designation: "Assistant Professor (Chemistry)",
    department: "BSH",
    email: "samik.nag@cgec.org.in",
    experience: "11 Years",
    qualifications: ["M.Sc", "Ph.D"],
    specialization: ["Inorganic Chemistry", "Coordination Complexes", "Catalysis"],
    image: "/img/Faculty/CHE_Samik_Nag.jpg",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Dr. Tanmay Biswas",
    designation: "Assistant Professor (Mathematics)",
    department: "BSH",
    email: "tanmay.biswas@cgec.org.in",
    experience: "9.5 Years",
    qualifications: ["M.Sc", "Ph.D"],
    specialization: ["Complex Analysis", "Differential Equations", "Mathematical Modelling"],
    image: "/img/Faculty/Tanmay_bs.jpeg",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Dr. Md. Salim",
    designation: "Assistant Professor (Mathematics)",
    department: "BSH",
    email: "md.salim@cgec.org.in",
    experience: "9 Years",
    qualifications: ["M.Sc", "Ph.D"],
    specialization: ["Operations Research", "Numerical Analysis", "Probability & Statistics"],
    image: "/img/Faculty/Md_salim.jpg",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Mr. Rabiul Islam",
    designation: "Assistant Professor (English/Humanities)",
    department: "BSH",
    email: "rabiul.islam@cgec.org.in",
    experience: "8 Years",
    qualifications: ["M.A. in English", "M.Phil"],
    specialization: ["Professional Communication", "Technical Writing", "Linguistics"],
    image: "/img/Faculty/Rabiul.jpg",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Mr. Asif Iqbal",
    designation: "Technical Assistant",
    department: "BSH",
    email: "asif.iqbal@cgec.org.in",
    experience: "7 Years",
    qualifications: ["B.Sc.", "Diploma"],
    specialization: ["Physics & Chemistry Laboratory Operations"],
    image: "/img/Faculty/asif.jpg",
    cvLink: "/data/cv/sample_cv.pdf",
  },
  {
    name: "Dr. G. D. Sharma",
    designation: "Associate Professor (Physics)",
    department: "BSH",
    email: "gd.sharma@cgec.org.in",
    experience: "14 Years",
    qualifications: ["M.Sc", "Ph.D"],
    specialization: ["Optics & Photonics", "Laser Spectroscopy"],
    image: "/img/Faculty/gdsir.jpg",
    cvLink: "/data/cv/sample_cv.pdf",
  },
];

export const fullLabsList = [
  // CSE
  {
    department: "CSE",
    name: "Computer Center",
    description: "Equipped with 100 high-performance computers (i5 processor, 8GB RAM, Windows 10/Linux OS), Smart projectors, and high-speed gigabit LAN. Used for C, Data Structures, Algorithms, and Numerical Methods labs according to MAKAUT curriculum.",
    image: "/img/labs/cse_lab.jpg",
    roomNumber: "Room 101, Academic Block A",
    facultyInCharge: "Dr. Somen Mondal",
  },
  {
    department: "CSE",
    name: "Advance Computer Network & Security Lab",
    description: "Equipped with Cisco switches, hardware firewalls, network packet analyzers, and Linux workstations for networking and cryptography labs.",
    image: "/img/labs/cse_lab.jpg",
    roomNumber: "Room 102, Academic Block A",
    facultyInCharge: "Mr. Arnab Gain",
  },
  {
    department: "CSE",
    name: "Operating System & System Programming Lab",
    description: "Equipped with Unix/Linux environments for kernel debugging, process scheduling simulation, multi-threading, and POSIX shell scripting.",
    image: "/img/labs/cse_lab.jpg",
    roomNumber: "Room 103, Academic Block A",
    facultyInCharge: "Mr. Shahid Ali",
  },
  {
    department: "CSE",
    name: "Artificial Intelligence & Data Engineering Lab",
    description: "Equipped with GPU computing workstations with CUDA support, Python frameworks (PyTorch, TensorFlow, Scikit-learn) and Big Data clusters.",
    image: "/img/labs/cse_lab.jpg",
    roomNumber: "Room 104, Academic Block A",
    facultyInCharge: "Dr. Prabir Kr. Naskar",
  },
  {
    department: "CSE",
    name: "Software Engineering & Database Lab",
    description: "Equipped for Oracle/MySQL database administration, Agile project simulation, UML modeling tools, and full-stack software development.",
    image: "/img/labs/cse_lab.jpg",
    roomNumber: "Room 105, Academic Block A",
    facultyInCharge: "Mr. Umakanta Bera",
  },

  // ECE
  {
    department: "ECE",
    name: "Solid State Device & Analog Electronics Lab",
    description: "Cathode Ray Oscilloscopes (CRO), Function Generators, DC Regulated Power Supplies, and Semiconductor characterization benches.",
    image: "/img/hero/slider-3.jpg",
    roomNumber: "Room 201, Academic Block B",
    facultyInCharge: "Mr. Sourav Saha",
  },
  {
    department: "ECE",
    name: "Digital Electronics & Logic Design Lab",
    description: "Digital IC trainers, Logic State Analyzers, FPGA/CPLD kits, and combinational/sequential logic circuit test platforms.",
    image: "/img/hero/slider-3.jpg",
    roomNumber: "Room 202, Academic Block B",
    facultyInCharge: "Mr. Palash Das",
  },
  {
    department: "ECE",
    name: "Analog & Digital Communication Lab",
    description: "AM/FM modulation-demodulation trainers, QPSK/QAM digital modulators, Optical fiber transmission kits, and Spectrum Analyzers.",
    image: "/img/hero/slider-5.jpg",
    roomNumber: "Room 203, Academic Block B",
    facultyInCharge: "Mr. Avshek Bhattacharya",
  },
  {
    department: "ECE",
    name: "Microwave Engineering & Antenna Lab",
    description: "X-band and K-band Klystron/Gunn test benches, horn antenna radiation pattern measurement setups, and VSWR meters.",
    image: "/img/hero/slider-1.jpg",
    roomNumber: "Room 204, Academic Block B",
    facultyInCharge: "Mr. Abhijit Bose",
  },
  {
    department: "ECE",
    name: "VLSI & Digital Signal Processing Lab",
    description: "Cadence EDA Suite, Xilinx Vivado, TMS320C6713 DSP Starter Kits, and MATLAB Signal Processing toolboxes.",
    image: "/img/hero/slider-2.jpg",
    roomNumber: "Room 205, Academic Block B",
    facultyInCharge: "Mr. Sourav Saha",
  },

  // EE
  {
    department: "EE",
    name: "Electric Machines & Dynamos Lab",
    description: "Coupled DC shunt/series motors, synchronous alternators, three-phase squirrel cage induction motors, and autotransformers.",
    image: "/img/hero/slider-5.jpg",
    roomNumber: "Room 101, Ground Floor",
    facultyInCharge: "Dr. Goutam Panda",
  },
  {
    department: "EE",
    name: "Power Systems & Smart Grid Lab",
    description: "Transmission line artificial models, differential protection relays, earth fault relays, and digital power factor analyzers.",
    image: "/img/hero/slider-1.jpg",
    roomNumber: "Room 102, Ground Floor",
    facultyInCharge: "Prof. Mafizul Islam",
  },
  {
    department: "EE",
    name: "Power Electronics & Drives Lab",
    description: "SCR/TRIAC/IGBT triggering modules, single and three-phase inverters, dual converters, and variable frequency drive (VFD) trainers.",
    image: "/img/hero/slider-3.jpg",
    roomNumber: "Room 103, Ground Floor",
    facultyInCharge: "Mr. Deepjyoti Santra",
  },
  {
    department: "EE",
    name: "Control Systems & Automation Lab",
    description: "DC servomotor speed/position control setups, PID controllers, synchro transmitter-receiver pairs, and root locus simulators.",
    image: "/img/labs/cse_lab.jpg",
    roomNumber: "Room 104, Ground Floor",
    facultyInCharge: "Mr. Tanumoy Das",
  },

  // ME
  {
    department: "ME",
    name: "Central Workshop & Manufacturing Lab",
    description: "Heavy-duty precision lathe machines, universal milling machines, shapers, radial drilling machines, and CNC turning center.",
    image: "/img/hero/slider-4.webp",
    roomNumber: "Central Workshop Complex",
    facultyInCharge: "Dr. Sushovan Chatterjee",
  },
  {
    department: "ME",
    name: "Thermal Power Engineering & IC Engines Lab",
    description: "Single and multi-cylinder computerized four-stroke diesel and petrol engine test benches with eddy current dynamometer loading.",
    image: "/img/hero/slider-2.jpg",
    roomNumber: "Workshop Block 2",
    facultyInCharge: "Dr. Sanchayan Mukherjee",
  },
  {
    department: "ME",
    name: "Fluid Mechanics & Hydraulic Machinery Lab",
    description: "Pelton turbine test rig, Francis turbine test bench, centrifugal pump characteristics tester, and venturi/orifice meter calibration apparatus.",
    image: "/img/hero/slider-3.jpg",
    roomNumber: "Fluid Lab Block",
    facultyInCharge: "Dr. Provas Kumar Roy",
  },
  {
    department: "ME",
    name: "CAD/CAM & Computational Mechanics Lab",
    description: "High-end workstations with SolidWorks, AutoCAD, ANSYS Mechanical, and Mastercam for 3D modeling and finite element analysis.",
    image: "/img/labs/cse_lab.jpg",
    roomNumber: "Room 203, ME Block",
    facultyInCharge: "Mr. Prasenjit Ghosh",
  },

  // CE
  {
    department: "CE",
    name: "Structural Analysis & Concrete Technology Lab",
    description: "2000 kN Digital Compression Testing Machine (CTM), Universal Testing Machine (UTM), Slump cones, and ultrasonic pulse velocity tester.",
    image: "/img/hero/slider-1.jpg",
    roomNumber: "Civil Engineering Ground Floor",
    facultyInCharge: "Dr. Chhandamay Ray",
  },
  {
    department: "CE",
    name: "Geotechnical Engineering & Soil Mechanics Lab",
    description: "Triaxial shear apparatus, direct shear apparatus, consolidation test unit, liquid limit device, and Proctor compaction test setups.",
    image: "/img/hero/slider-3.jpg",
    roomNumber: "Room 102, Civil Block",
    facultyInCharge: "Mr. Mithun Mandal",
  },
  {
    department: "CE",
    name: "Advanced Surveying & GIS Lab",
    description: "Digital Total Stations, Electronic Theodolites, Auto Levels, Handheld GPS units, and ArcGIS software suite.",
    image: "/img/hero/slider-4.webp",
    roomNumber: "Room 103, Civil Block",
    facultyInCharge: "Mr. Shyamal Das",
  },
  {
    department: "CE",
    name: "Transportation & Highway Materials Lab",
    description: "Los Angeles Abrasion Testing Machine, Ductility test apparatus, Bitumen Penetrometer, and Marshall Stability test apparatus.",
    image: "/img/hero/slider-5.jpg",
    roomNumber: "Room 104, Civil Block",
    facultyInCharge: "Mr. Ansarul Islam",
  },

  // BSH
  {
    department: "BSH",
    name: "Engineering Physics & Modern Optics Lab",
    description: "He-Ne lasers, diffraction gratings, polarimeters, Hall effect apparatus, Newton's ring setups, and semiconductor bandgap measurement kits.",
    image: "/img/hero/slider-2.jpg",
    roomNumber: "Science Block 301",
    facultyInCharge: "Dr. Biplab Maity",
  },
  {
    department: "BSH",
    name: "Engineering Chemistry & Water Analysis Lab",
    description: "Digital pH meters, conductivity meters, UV-Visible spectrophotometers, Redwood viscometers, and chemical titration benches.",
    image: "/img/hero/slider-4.webp",
    roomNumber: "Science Block 302",
    facultyInCharge: "Dr. Samik Nag",
  },
  {
    department: "BSH",
    name: "Language & Professional Communication Lab",
    description: "Equipped with Sanako language lab software, audio-visual workstations, headsets, and interactive modules for soft skills training.",
    image: "/img/hero/slider-5.jpg",
    roomNumber: "Science Block 303",
    facultyInCharge: "Mr. Rabiul Islam",
  },
];

export const fullSyllabusList = [
  // CSE
  { department: "CSE", semester: "1st Semester", title: "B.Tech 1st Year All Departments AICTE Common Curriculum", pdfLink: "/data/cse/BTECH_all dept_1st year.pdf", academicYear: "2025-2026" },
  { department: "CSE", semester: "2nd Semester", title: "B.Tech 1st Year All Departments 2nd Sem AICTE Common Curriculum", pdfLink: "/data/cse/BTECH_all dept_1st year.pdf", academicYear: "2025-2026" },
  { department: "CSE", semester: "3rd Semester", title: "B.Tech Computer Science & Engineering 3rd Semester AICTE Syllabus", pdfLink: "/data/cse/BTECH_CSE_SEM3.pdf", academicYear: "2025-2026" },
  { department: "CSE", semester: "4th Semester", title: "B.Tech Computer Science & Engineering 4th Semester AICTE Syllabus", pdfLink: "/data/cse/BTECH_CSE_SEM4.pdf", academicYear: "2025-2026" },
  { department: "CSE", semester: "5th Semester", title: "B.Tech Computer Science & Engineering 5th Semester AICTE Syllabus", pdfLink: "/data/cse/BTECH_CSE_SEM5.pdf", academicYear: "2025-2026" },
  { department: "CSE", semester: "6th Semester", title: "B.Tech Computer Science & Engineering 6th Semester AICTE Syllabus", pdfLink: "/data/cse/BTECH_CSE_SEM6.pdf", academicYear: "2025-2026" },
  { department: "CSE", semester: "7th Semester", title: "B.Tech Computer Science & Engineering 7th Semester AICTE Syllabus", pdfLink: "/data/cse/BTECH_CSE_SEM7.pdf", academicYear: "2025-2026" },
  { department: "CSE", semester: "8th Semester", title: "B.Tech Computer Science & Engineering 8th Semester AICTE Syllabus", pdfLink: "/data/cse/BTECH_CSE_SEM8.pdf", academicYear: "2025-2026" },

  // ECE
  { department: "ECE", semester: "1st Semester", title: "B.Tech 1st Year Common Syllabus", pdfLink: "/data/cse/BTECH_all dept_1st year.pdf", academicYear: "2025-2026" },
  { department: "ECE", semester: "2nd Semester", title: "B.Tech 2nd Semester Common Syllabus", pdfLink: "/data/cse/BTECH_all dept_1st year.pdf", academicYear: "2025-2026" },
  { department: "ECE", semester: "3rd Semester", title: "B.Tech Electronics & Communication Engineering 3rd Sem Syllabus", pdfLink: "/data/ece/BTECH_ECE_SEM3.pdf", academicYear: "2025-2026" },
  { department: "ECE", semester: "4th Semester", title: "B.Tech Electronics & Communication Engineering 4th Sem Syllabus", pdfLink: "/data/ece/BTECH_ECE_SEM4.pdf", academicYear: "2025-2026" },
  { department: "ECE", semester: "5th Semester", title: "B.Tech Electronics & Communication Engineering 5th Sem Syllabus", pdfLink: "/data/ece/BTECH_ECE_SEM5.pdf", academicYear: "2025-2026" },
  { department: "ECE", semester: "6th Semester", title: "B.Tech Electronics & Communication Engineering 6th Sem Syllabus", pdfLink: "/data/ece/BTECH_ECE_SEM6.pdf", academicYear: "2025-2026" },
  { department: "ECE", semester: "7th Semester", title: "B.Tech Electronics & Communication Engineering 7th Sem Syllabus", pdfLink: "/data/ece/BTECH_ECE_SEM7.pdf", academicYear: "2025-2026" },
  { department: "ECE", semester: "8th Semester", title: "B.Tech Electronics & Communication Engineering 8th Sem Syllabus", pdfLink: "/data/ece/BTECH_ECE_SEM8.pdf", academicYear: "2025-2026" },

  // EE
  { department: "EE", semester: "1st Semester", title: "B.Tech 1st Year Common Syllabus", pdfLink: "/data/cse/BTECH_all dept_1st year.pdf", academicYear: "2025-2026" },
  { department: "EE", semester: "2nd Semester", title: "B.Tech 2nd Semester Common Syllabus", pdfLink: "/data/cse/BTECH_all dept_1st year.pdf", academicYear: "2025-2026" },
  { department: "EE", semester: "3rd Semester", title: "B.Tech Electrical Engineering 3rd Sem Syllabus", pdfLink: "/data/ee/BTECH_EE_SEM3.pdf", academicYear: "2025-2026" },
  { department: "EE", semester: "4th Semester", title: "B.Tech Electrical Engineering 4th Sem Syllabus", pdfLink: "/data/ee/BTECH_EE_SEM4.pdf", academicYear: "2025-2026" },
  { department: "EE", semester: "5th Semester", title: "B.Tech Electrical Engineering 5th Sem Syllabus", pdfLink: "/data/ee/BTECH_EE_SEM5.pdf", academicYear: "2025-2026" },
  { department: "EE", semester: "6th Semester", title: "B.Tech Electrical Engineering 6th Sem Syllabus", pdfLink: "/data/ee/BTECH_EE_SEM6.pdf", academicYear: "2025-2026" },
  { department: "EE", semester: "7th Semester", title: "B.Tech Electrical Engineering 7th Sem Syllabus", pdfLink: "/data/ee/BTECH_EE_SEM7.pdf", academicYear: "2025-2026" },
  { department: "EE", semester: "8th Semester", title: "B.Tech Electrical Engineering 8th Sem Syllabus", pdfLink: "/data/ee/BTECH_EE_SEM8.pdf", academicYear: "2025-2026" },

  // ME
  { department: "ME", semester: "1st Semester", title: "B.Tech 1st Year Common Syllabus", pdfLink: "/data/cse/BTECH_all dept_1st year.pdf", academicYear: "2025-2026" },
  { department: "ME", semester: "2nd Semester", title: "B.Tech 2nd Semester Common Syllabus", pdfLink: "/data/cse/BTECH_all dept_1st year.pdf", academicYear: "2025-2026" },
  { department: "ME", semester: "3rd Semester", title: "B.Tech Mechanical Engineering 3rd Sem Syllabus", pdfLink: "/data/me/BTECH_ME_SEM3.pdf", academicYear: "2025-2026" },
  { department: "ME", semester: "4th Semester", title: "B.Tech Mechanical Engineering 4th Sem Syllabus", pdfLink: "/data/me/BTECH_ME_SEM4.pdf", academicYear: "2025-2026" },
  { department: "ME", semester: "5th Semester", title: "B.Tech Mechanical Engineering 5th Sem Syllabus", pdfLink: "/data/me/BTECH_ME_SEM5.pdf", academicYear: "2025-2026" },
  { department: "ME", semester: "6th Semester", title: "B.Tech Mechanical Engineering 6th Sem Syllabus", pdfLink: "/data/me/BTECH_ME_SEM6.pdf", academicYear: "2025-2026" },
  { department: "ME", semester: "7th Semester", title: "B.Tech Mechanical Engineering 7th Sem Syllabus", pdfLink: "/data/me/BTECH_ME_SEM7.pdf", academicYear: "2025-2026" },
  { department: "ME", semester: "8th Semester", title: "B.Tech Mechanical Engineering 8th Sem Syllabus", pdfLink: "/data/me/BTECH_ME_SEM8.pdf", academicYear: "2025-2026" },

  // CE
  { department: "CE", semester: "1st Semester", title: "B.Tech 1st Year Common Syllabus", pdfLink: "/data/cse/BTECH_all dept_1st year.pdf", academicYear: "2025-2026" },
  { department: "CE", semester: "2nd Semester", title: "B.Tech 2nd Semester Common Syllabus", pdfLink: "/data/cse/BTECH_all dept_1st year.pdf", academicYear: "2025-2026" },
  { department: "CE", semester: "3rd Semester", title: "B.Tech Civil Engineering 3rd Sem Syllabus", pdfLink: "/data/ce/BTECH_CE_SEM3.pdf", academicYear: "2025-2026" },
  { department: "CE", semester: "4th Semester", title: "B.Tech Civil Engineering 4th Sem Syllabus", pdfLink: "/data/ce/BTECH_CE_SEM4.pdf", academicYear: "2025-2026" },
  { department: "CE", semester: "5th Semester", title: "B.Tech Civil Engineering 5th Sem Syllabus", pdfLink: "/data/ce/BTECH_CE_SEM5.pdf", academicYear: "2025-2026" },
  { department: "CE", semester: "6th Semester", title: "B.Tech Civil Engineering 6th Sem Syllabus", pdfLink: "/data/ce/BTECH_CE_SEM6.pdf", academicYear: "2025-2026" },
  { department: "CE", semester: "7th Semester", title: "B.Tech Civil Engineering 7th Sem Syllabus", pdfLink: "/data/ce/BTECH_CE_SEM7.pdf", academicYear: "2025-2026" },
  { department: "CE", semester: "8th Semester", title: "B.Tech Civil Engineering 8th Sem Syllabus", pdfLink: "/data/ce/BTECH_CE_SEM8.pdf", academicYear: "2025-2026" },

  // BSH
  { department: "BSH", semester: "1st Semester", title: "Basic Science & Humanities 1st Semester Detailed AICTE Syllabus", pdfLink: "/data/bsh/BSH_SEM1.pdf", academicYear: "2025-2026" },
  { department: "BSH", semester: "2nd Semester", title: "Basic Science & Humanities 2nd Semester Detailed AICTE Syllabus", pdfLink: "/data/bsh/BSH_SEM2.pdf", academicYear: "2025-2026" },
];

export async function runFullWebsiteSeeder() {
  console.log("🚀 Seeding ALL website content into MongoDB Atlas...");

  // 1. Notices
  for (const n of initialNotices) {
    const exists = await prisma.notice.findFirst({ where: { title: n.title } });
    if (!exists) {
      await prisma.notice.create({ data: n });
    }
  }

  // 2. Gallery
  for (const g of initialGallery) {
    const exists = await prisma.gallery.findFirst({ where: { title: g.title } });
    if (!exists) {
      await prisma.gallery.create({ data: g });
    }
  }

  // 3. Faculty
  for (const f of fullFacultyList) {
    const exists = await prisma.faculty.findUnique({ where: { email: f.email } });
    if (!exists) {
      await prisma.faculty.create({ data: f });
    }
  }

  // 4. Syllabus
  for (const s of fullSyllabusList) {
    const exists = await prisma.syllabus.findFirst({
      where: { department: s.department, semester: s.semester, title: s.title },
    });
    if (!exists) {
      await prisma.syllabus.create({ data: s });
    }
  }

  // 5. Labs
  for (const l of fullLabsList) {
    const exists = await prisma.lab.findFirst({
      where: { department: l.department, name: l.name },
    });
    if (!exists) {
      await prisma.lab.create({ data: l });
    }
  }

  // 6. Wall Magazine
  for (const w of initialWallMagazines) {
    const exists = await prisma.wallMagazine.findFirst({
      where: { title: w.title },
    });
    if (!exists) {
      await prisma.wallMagazine.create({ data: w });
    }
  }

  // 7. Admission Items & Config
  for (const item of initialAdmissionItems) {
    const exists = await prisma.admissionItem.findFirst({
      where: { title: item.title, category: item.category },
    });
    if (!exists) {
      await prisma.admissionItem.create({ data: item });
    }
  }
  const configExists = await prisma.admissionConfig.findUnique({ where: { year: "2025" } });
  if (!configExists) {
    await prisma.admissionConfig.create({
      data: {
        year: "2025",
        whatsappLink: "https://chat.whatsapp.com/",
        contactPhone: "9475445190",
        contactEmail: "admission@cgec.org.in",
        officerName: "Dr. Sushovan Chatterjee",
        officerRole: "PI Admin, Admission (2025)",
        officerDesignation: "Cooch Behar Government Engineering College",
      },
    });
  }

  // 8. Fee Items
  for (const fee of initialFeeItems) {
    const exists = await prisma.feeItem.findFirst({
      where: { admissionType: fee.admissionType, feeHead: fee.feeHead },
    });
    if (!exists) {
      await prisma.feeItem.create({ data: fee });
    }
  }

  // 9. Committee Members
  for (const member of initialCommitteeMembers) {
    const exists = await prisma.committeeMember.findFirst({
      where: { committee: member.committee, name: member.name },
    });
    if (!exists) {
      await prisma.committeeMember.create({ data: member });
    }
  }

  // 10. Leadership Messages
  for (const leader of initialLeadership) {
    const exists = await prisma.leadershipMessage.findFirst({
      where: { name: leader.name },
    });
    if (!exists) {
      await prisma.leadershipMessage.create({ data: leader });
    }
  }

  // 11. Recruiters
  for (const rec of initialRecruiters) {
    const exists = await prisma.recruiter.findFirst({
      where: { name: rec.name },
    });
    if (!exists) {
      await prisma.recruiter.create({ data: rec });
    }
  }

  // 12. Placement Brochure
  const brochureExists = await prisma.placementBrochure.findFirst();
  if (!brochureExists) {
    await prisma.placementBrochure.create({
      data: {
        title: "Official Placement Brochure 2025-26",
        description: "Comprehensive Training & Placement Brochure for Cooch Behar Government Engineering College featuring batch demographics, academic programs, recruiter profiles, and hiring guidelines.",
        academicYear: "2025-2026",
        fileUrl: "/data/placement/CGEC_Placement_Brochure.pdf",
        fileType: "pdf",
        fileName: "CGEC_Placement_Brochure_2025-26.pdf",
        fileSize: "268 KB",
        isActive: true,
        order: 1,
      },
    });
  }

  console.log("✅ COMPLETE! All website records have been seeded into MongoDB Atlas.");
}

export const initialAdmissionItems = [
  { year: "2025", category: "NOTICE", title: "Reporting Notice for 1st year student 2025", fileUrl: "/admission/2025/NOTIFICATION_FOR_ADDMISSION_PROCESS_2025-26.pdf", order: 1 },
  { year: "2025", category: "NOTICE", title: "NOTICE FOR ADMISSION THROUGH DECENTRALIZED COUNSELLING IN THE 1ST YEAR OF B. TECH COURSES AGAINST VACANCY 2025", fileUrl: "/admission/2025/Notice_Decentralized_2025-26.pdf", order: 2 },
  { year: "2025", category: "NOTICE", title: "UPDATED NOTICE FOR ADMISSION THROUGH DECENTRALIZED COUNSELLING IN THE 1ST YEAR OF B. TECH COURSES AGAINST VACANCY 2025", fileUrl: "/admission/2025/2025-26_10.pdf", order: 3 },
  { year: "2025", category: "NOTICE", title: "Status of applications for decentralized counselling of B.Tech 1st Semester candidates", fileUrl: "/admission/2025/NOTIFICATION_FOR_ADDMISSION_PROCESS_2025-26.pdf", order: 4 },
  { year: "2025", category: "NOTICE", title: "Provisional Merit List as per online application provided by candidate WBJEE2025 for decentralized counselling of B.Tech 1st Semester candidates CGEC", fileUrl: "/admission/2025/NOTIFICATION_FOR_ADDMISSION_PROCESS_2025-26.pdf", order: 5 },
  { year: "2025", category: "DOCUMENT", title: "College at a Glance", fileUrl: "/admission/2025/CGEC_at_a_glance.pdf", order: 1 },
  { year: "2025", category: "DOCUMENT", title: "Fees structure", fileUrl: "/admission/2025/FEES_STRUCTURE_CGEC.pdf", order: 2 },
  { year: "2025", category: "DOCUMENT", title: "Medical Form", fileUrl: "/admission/2025/Medical_Form.pdf", order: 3 },
  { year: "2025", category: "DOCUMENT", title: "Refund Form", fileUrl: "/admission/2025/Refund_Form.pdf", order: 4 },
];

export const initialFeeItems = [
  // 1st Semester Regular
  { academicYear: "2025-26", admissionType: "REGULAR", slNo: "1", feeHead: "Admission Fee (one time)", cseEce: "1000", core: "500", order: 1 },
  { academicYear: "2025-26", admissionType: "REGULAR", slNo: "2", feeHead: "Tuition Fee (July 2025 to December 2025)", cseEce: "6000", core: "3000", order: 2 },
  { academicYear: "2025-26", admissionType: "REGULAR", slNo: "3", feeHead: "University Development Fee (one time) May change by the order of MAKAUT", cseEce: "2200", core: "2200", order: 3 },
  { academicYear: "2025-26", admissionType: "REGULAR", slNo: "4", feeHead: "University Registration Fee (one time) May change by the order of MAKAUT", cseEce: "500", core: "500", order: 4 },
  { academicYear: "2025-26", admissionType: "REGULAR", slNo: "5", feeHead: "Caution Money Deposit (Refundable) (one time)", cseEce: "300", core: "300", order: 5 },
  { academicYear: "2025-26", admissionType: "REGULAR", slNo: "6", feeHead: "Identity Card & Library Card (one time)", cseEce: "200", core: "200", order: 6 },
  { academicYear: "2025-26", admissionType: "REGULAR", slNo: "7", feeHead: "First Aid fee (one time)", cseEce: "50", core: "50", order: 7 },
  { academicYear: "2025-26", admissionType: "REGULAR", slNo: "8", feeHead: "Athletic Fee (one time)", cseEce: "600", core: "600", order: 8 },
  { academicYear: "2025-26", admissionType: "REGULAR", slNo: "9", feeHead: "Student's Insurance Fee (one time)", cseEce: "600", core: "600", order: 9 },
  { academicYear: "2025-26", admissionType: "REGULAR", slNo: "10", feeHead: "Fees Book per book", cseEce: "50", core: "50", order: 10 },
  { academicYear: "2025-26", admissionType: "REGULAR", slNo: "11", feeHead: "Library Caution Deposit (Refundable) (one time)", cseEce: "2000", core: "2000", order: 11 },
  { academicYear: "2025-26", admissionType: "REGULAR", slNo: "12", feeHead: "Career Pathway Facility Charge", cseEce: "1200", core: "1200", order: 12 },
  { academicYear: "2025-26", admissionType: "REGULAR", slNo: "Total", feeHead: "Total Fee", cseEce: "14700", core: "11200", order: 13 },
  // 3rd Semester Lateral
  { academicYear: "2025-26", admissionType: "LATERAL", slNo: "1", feeHead: "Admission Fee (one time)", cseEce: "1000", core: "500", order: 1 },
  { academicYear: "2025-26", admissionType: "LATERAL", slNo: "2", feeHead: "Tuition Fee (July 2025 to December 2025)", cseEce: "6000", core: "3000", order: 2 },
  { academicYear: "2025-26", admissionType: "LATERAL", slNo: "3", feeHead: "University Development Fee (one time) May change by the order of MAKAUT", cseEce: "1650", core: "1650", order: 3 },
  { academicYear: "2025-26", admissionType: "LATERAL", slNo: "4", feeHead: "University Registration Fee (one time) May change by the order of MAKAUT", cseEce: "500", core: "500", order: 4 },
  { academicYear: "2025-26", admissionType: "LATERAL", slNo: "5", feeHead: "Caution Money Deposit (Refundable) (one time)", cseEce: "300", core: "300", order: 5 },
  { academicYear: "2025-26", admissionType: "LATERAL", slNo: "6", feeHead: "Identity Card & Library Card (one time)", cseEce: "200", core: "200", order: 6 },
  { academicYear: "2025-26", admissionType: "LATERAL", slNo: "7", feeHead: "First Aid fee (one time)", cseEce: "50", core: "50", order: 7 },
  { academicYear: "2025-26", admissionType: "LATERAL", slNo: "8", feeHead: "Athletic Fee (one time)", cseEce: "600", core: "600", order: 8 },
  { academicYear: "2025-26", admissionType: "LATERAL", slNo: "9", feeHead: "Student's Insurance Fee (one time)", cseEce: "450", core: "450", order: 9 },
  { academicYear: "2025-26", admissionType: "LATERAL", slNo: "10", feeHead: "Fees Book per book", cseEce: "50", core: "50", order: 10 },
  { academicYear: "2025-26", admissionType: "LATERAL", slNo: "11", feeHead: "Library Caution Deposit (Refundable) (one time)", cseEce: "2000", core: "2000", order: 11 },
  { academicYear: "2025-26", admissionType: "LATERAL", slNo: "12", feeHead: "Career Pathway Facility Charge", cseEce: "1200", core: "1200", order: 12 },
  { academicYear: "2025-26", admissionType: "LATERAL", slNo: "Total", feeHead: "Total Fee", cseEce: "14000", core: "10500", order: 13 },
];

export const initialCommitteeMembers = [
  // Academic Committee
  { committee: "academic", name: "Dr. Gautam Das", position: "Convenor & Professor", department: "Electronics and Communication Engineering", phone: "9434171610", email: "gdas321@yahoo.co.in", order: 1 },
  { committee: "academic", name: "Prof. Somen Mondal", position: "Member & Assistant Professor", department: "Computer Science and Engineering", phone: "9331892632", email: "somen@cgec.org.in", order: 2 },
  { committee: "academic", name: "Dr. Prasenjit Das", position: "Member & Assistant Professor", department: "Mechanical Engineering", phone: "", email: "", order: 3 },
  { committee: "academic", name: "Dr. Palash Das", position: "Member & Assistant Professor", department: "Electronics and Communication Engineering", phone: "", email: "", order: 4 },
  { committee: "academic", name: "Prof. Atanu Maji", position: "Member & Assistant Professor", department: "Electrical Engineering", phone: "", email: "", order: 5 },
  { committee: "academic", name: "Prof. Biren Gurung", position: "Member & Assistant Professor", department: "Civil Engineering", phone: "", email: "", order: 6 },
  { committee: "academic", name: "Prof. Mohammad Salim", position: "Member & Assistant Professor", department: "Basic Science and Humanities", phone: "", email: "", order: 7 },
  { committee: "academic", name: "Dr. Kingshuk Dan", position: "Member & Assistant Professor, Registrar In Charge", department: "Civil Engineering", phone: "9474848817", email: "dankingshuk@gmail.com", order: 8 },
  { committee: "academic", name: "Dr. Manoj Das", position: "Member & Librarian", department: "Central Library", phone: "", email: "", order: 9 },
  { committee: "academic", name: "Dr. Shymal Ghosh", position: "Member & Assistant Professor", department: "Civil Engineering", phone: "", email: "", order: 10 },

  // Anti-ragging Committee
  { committee: "anti-ragging", name: "Dr. Sushovan Chatterjee", position: "Associate Professor, Principal (Office-in-Charge), Chairman", department: "Mechanical Engineering", phone: "9707545561", email: "principal@cgec.org.in", order: 1 },
  { committee: "anti-ragging", name: "Dr. Kingshuk Dan", position: "Assistant Professor, Registrar (Office-in-Charge), Convenor", department: "Civil Engineering", phone: "9474848817", email: "dankingshuk@gmail.com", order: 2 },
  { committee: "anti-ragging", name: "Dr. Gautam Das", position: "Professor, ECE Department, Member", department: "Electronics and Communication Engineering", phone: "9434171610", email: "gdas321@yahoo.co.in", order: 3 },
  { committee: "anti-ragging", name: "Prof. Somen Mondal", position: "Assistant Professor, CSE Department, Member", department: "Computer Science and Engineering", phone: "9331892632", email: "somen@cgec.org.in", order: 4 },
  { committee: "anti-ragging", name: "Prof. Soumik Roy", position: "Assistant Professor, Hostel Superintendent Boys' Hostel", department: "Electrical Engineering", phone: "9681034366", email: "Whbes.sr@gmail.com", order: 5 },
  { committee: "anti-ragging", name: "Prof. Madhumita Dhar", position: "Assistant Professor, Hostel Superintendent Ladies Hostel, Member", department: "Basic Science and Humanities", phone: "7063666567", email: "adhumita.dhar007@gmail.com", order: 6 },
  { committee: "anti-ragging", name: "Prof. Chhandamay Ray", position: "Assistant Professor, CE Department, Member", department: "Civil Engineering", phone: "9903194589", email: "chhandamayray@yahoo.com", order: 7 },
  { committee: "anti-ragging", name: "Prof. Amit Singha Roy", position: "Assistant Professor, BSH Department, Member", department: "Basic Science and Humanities", phone: "8172051534", email: "singharoyamit@gmail.com", order: 8 },
  { committee: "anti-ragging", name: "Mr. Sharadindu Roy", position: "NGO Representative Radical Society, Member", department: "NGO", phone: "8172051534", email: "singharoyamit@gmail.com", order: 9 },
  { committee: "anti-ragging", name: "Mr. Tapan Paul", position: "Office In-charge, Kotwali Police Station | P.S. Cooch Behar, Member", department: "Police Administration", phone: "9147889249", email: "cbrkotwalies@gmail.com", order: 10 },
  { committee: "anti-ragging", name: "Prof. Avinash Kumar Tiwari", position: "Assistant Professor, LAW Department, CBPBU, Member", department: "Law", phone: "8303361615", email: "tiwariavinash002@gmail.com", order: 11 },
  { committee: "anti-ragging", name: "Mr. Main Uddin Chisti", position: "Reporter, Telegraph, Member", department: "Media", phone: "9434742618", email: "khanmoin46@gmail.com", order: 12 },
  { committee: "anti-ragging", name: "Md. Kamarul Islam", position: "Upper Division Assistant, Member", department: "Administration", phone: "8926829926", email: "kamarul55566@gmail.com", order: 13 },
  { committee: "anti-ragging", name: "Khadija Khatun", position: "Parent, Member (ME, 2nd year)", department: "Parent Representative", phone: "9434688688", email: "khadijakhatun.cb@gmail.com", order: 14 },
  { committee: "anti-ragging", name: "Latifa Hossain", position: "Parent, Member (ME, 2nd year)", department: "Parent Representative", phone: "7063007615", email: "", order: 15 },
  { committee: "anti-ragging", name: "Driti Ghosh", position: "2nd year Student, EE", department: "Electrical Engineering", phone: "9641008674", email: "dritighosh20@gmail.com", order: 16 },
  { committee: "anti-ragging", name: "Siddhartha Bag", position: "3rd year Student, CSE", department: "Computer Science and Engineering", phone: "9123613119", email: "amibagsiddhartha21@gmail.com", order: 17 },
  { committee: "anti-ragging", name: "Subhajit Sadhu", position: "4th year Student, CE", department: "Civil Engineering", phone: "9733234154", email: "subhajit09ce@gmail.com", order: 18 },

  // Anti-ragging Squad
  { committee: "anti-ragging-squard", name: "Prof. Sourav Chatterjee", position: "Assistant Professor & Convenor", department: "CSE", phone: "", email: "itssourav@gmail.com", order: 1 },
  { committee: "anti-ragging-squard", name: "Prof. Arnab Gain", position: "Assistant Professor", department: "CSE", phone: "", email: "arnabgaincgec@gmail.com", order: 2 },
  { committee: "anti-ragging-squard", name: "Dr. Sourav Chakraborty", position: "Assistant Professor", department: "ECE", phone: "", email: "sourav.chakraborty@cgec.org.in", order: 3 },
  { committee: "anti-ragging-squard", name: "Prof. Sudipta Roy", position: "Assistant Professor", department: "ME", phone: "", email: "sudipta.roy@cgec.org.in", order: 4 },
  { committee: "anti-ragging-squard", name: "Prof. Arghya Chakraborty", position: "Assistant Professor", department: "BSH", phone: "", email: "pikaiarghya@gmail.com", order: 5 },
  { committee: "anti-ragging-squard", name: "Prof. Amit Singha Roy", position: "Assistant Professor", department: "BSH", phone: "8172051534", email: "singharoyamit@gmail.com", order: 6 },
  { committee: "anti-ragging-squard", name: "Prof. Soumik Roy", position: "Assistant Professor, Boys' Hostel Superintendent", department: "EE", phone: "9681034366", email: "Whbes.sr@gmail.com", order: 7 },
  { committee: "anti-ragging-squard", name: "Prof. Madhumita Dhar", position: "Assistant Professor, Ladies' Hostel Superintendent", department: "BSH", phone: "7063666567", email: "adhumita.dhar007@gmail.com", order: 8 },

  // Student Counsellor
  { committee: "counsellor", name: "Prof. Sunandita Bhowmik", position: "Assistant Professor (as nominated by VC, CBPBU)", department: "CBPBU", phone: "9002735087", email: "sunanditabhowmik@cbpbu.ac.in", order: 1 },
  { committee: "counsellor", name: "Dr. Prasenjit Dey", position: "Assistant Professor", department: "CGEC", phone: "9123363688", email: "prasenjitdey13@gmail.com", order: 2 },
  { committee: "counsellor", name: "Prof. Biren Gurung", position: "Assistant Professor", department: "CGEC", phone: "9734474528", email: "biren.gurung@gmail.com", order: 3 },
  { committee: "counsellor", name: "Dr. Gopal Ghosh", position: "Assistant Professor", department: "CGEC", phone: "8981708655", email: "ghoshgopal.pmath@gmail.com", order: 4 },
  { committee: "counsellor", name: "Mr. Sujay Sarkar", position: "Technical Assistant", department: "CGEC", phone: "9232147569", email: "sujaysarkar1997@gmail.com", order: 5 },
  { committee: "counsellor", name: "Mr. Soumik Sarkar", position: "Technical Assistant", department: "CGEC", phone: "7501408016", email: "soumik.sarkar100@gmail.com", order: 6 },

  // GRC (Grievance Redressal Committee)
  { committee: "grc", name: "Dr. Prabal Deb", position: "Principal – Chairman", department: "Administration", phone: "", email: "principal@cgec.org.in", order: 1 },
  { committee: "grc", name: "Bidisha Mukherjee", position: "Jt. DTE – Member", department: "Higher Education Dept, Govt of WB", phone: "", email: "", order: 2 },
  { committee: "grc", name: "Dr. Sushovan Chatterjee", position: "HOD & Associate Professor, ME department – Member", department: "ME", phone: "9707545561", email: "sushovan.chatterjee@cgec.org.in", order: 3 },
  { committee: "grc", name: "Dr. Sourav De", position: "HOD & Associate Professor, CSE department - Member", department: "CSE", phone: "", email: "sourav.de@cgec.org.in", order: 4 },

  // Internal Complaint Committee (ICC)
  { committee: "icc", name: "Prof. Madhuchandra Bhaduri", position: "Chair Person, Asst. Prof.", department: "BSH Dept.", phone: "", email: "madhuchandrabhaduri@gmail.com", order: 1 },
  { committee: "icc", name: "Dr. Madhumita Dhar", position: "Member, Asst. Prof.", department: "BSH Dept.", phone: "7063666567", email: "madhumita.dhar007@gmail.com", order: 2 },
  { committee: "icc", name: "Prof. Arnab Gain", position: "Member, Asst. Prof.", department: "CSE Dept.", phone: "", email: "arnabgaincgec@gmail.com", order: 3 },
  { committee: "icc", name: "Mr. Samir Paul", position: "Member, Account Officer", department: "Administration", phone: "", email: "aocgec23@gmail.com", order: 4 },
  { committee: "icc", name: "Ms. Indrani Dey", position: "Member, Non-Technical Employee", department: "Administration", phone: "", email: "indranideycob6@gmail.com", order: 5 },
  { committee: "icc", name: "Ms. Sanchita Das", position: "Student Representative (CE-3rd year)", department: "CE", phone: "", email: "sanchita9das@gmail.com", order: 6 },
  { committee: "icc", name: "Ms. Priyanka Sarkar", position: "Student Representative (ECE-3rd year)", department: "ECE", phone: "", email: "", order: 7 },

  // Institute Industry Cell (IIC)
  { committee: "iic", name: "Dr. Somen Mondal", position: "Head, Training and Placement Cell & Convenor", department: "EE / T&P", phone: "9331892632", email: "somen@cgec.org.in", order: 1 },
  { committee: "iic", name: "Dr. Palash Das", position: "Member", department: "ECE", phone: "", email: "palash.das@cgec.org.in", order: 2 },
  { committee: "iic", name: "Prof. Sourav Chatterjee", position: "Member", department: "CSE", phone: "", email: "itssourav@gmail.com", order: 3 },
  { committee: "iic", name: "Prof. Prasenjit Das", position: "Member", department: "ME", phone: "", email: "", order: 4 },
  { committee: "iic", name: "Prof. Chhandamay Ray", position: "Member", department: "CE", phone: "9903194589", email: "chhandamayray@yahoo.com", order: 5 },

  // Internal Quality Assurance Cell (IQAC)
  { committee: "iqac", name: "Dr. Sushovan Chatterjee", position: "Principal (Office-in-Charge), Chairperson", department: "ME", phone: "9707545561", email: "principal@cgec.org.in", order: 1 },
  { committee: "iqac", name: "Dr. Gautam Das", position: "Director / Coordinator, IQAC", department: "ECE", phone: "9434171610", email: "gdas321@yahoo.co.in", order: 2 },
  { committee: "iqac", name: "Dr. Kingshuk Dan", position: "Registrar (Office-in-Charge)", department: "CE", phone: "9474848817", email: "dankingshuk@gmail.com", order: 3 },
  { committee: "iqac", name: "Prof. Somen Mondal", position: "Assistant Professor, Member", department: "CSE", phone: "9331892632", email: "somen@cgec.org.in", order: 4 },
  { committee: "iqac", name: "Prof. Atanu Maji", position: "Assistant Professor, Member", department: "EE", phone: "", email: "", order: 5 },

  // SC & ST Committee
  { committee: "sc-st", name: "Prof. Biren Gurung", position: "Convenor & Assistant Professor", department: "Civil Engineering", phone: "9734474528", email: "biren.gurung@gmail.com", order: 1 },
  { committee: "sc-st", name: "Prof. Amit Singha Roy", position: "Member & Assistant Professor", department: "Basic Science & Humanities", phone: "8172051534", email: "singharoyamit@gmail.com", order: 2 },
  { committee: "sc-st", name: "Prof. Arnab Gain", position: "Member & Assistant Professor", department: "Computer Science & Engineering", phone: "", email: "arnabgaincgec@gmail.com", order: 3 },
  { committee: "sc-st", name: "Mr. Sujay Sarkar", position: "Member & Technical Assistant", department: "Administration", phone: "9232147569", email: "sujaysarkar1997@gmail.com", order: 4 },

  // Student Grievance Redressal Committee (SGRC)
  { committee: "student-grc", name: "Dr. Sushovan Chatterjee", position: "Principal (Office-in-Charge), Chairman", department: "Administration", phone: "9707545561", email: "principal@cgec.org.in", order: 1 },
  { committee: "student-grc", name: "Prof. Soumik Roy", position: "Convenor & Hostel Superintendent", department: "EE", phone: "9681034366", email: "Whbes.sr@gmail.com", order: 2 },
  { committee: "student-grc", name: "Prof. Madhumita Dhar", position: "Member & Ladies Hostel Superintendent", department: "BSH", phone: "7063666567", email: "adhumita.dhar007@gmail.com", order: 3 },
  { committee: "student-grc", name: "Prof. Chhandamay Ray", position: "Member & Assistant Professor", department: "CE", phone: "9903194589", email: "chhandamayray@yahoo.com", order: 4 },
];

export const initialLeadership = [
  {
    name: "Dr. Sushovan Chatterjee",
    role: "Principal & Associate Professor",
    dept: "Mechanical Engineering",
    message: "Excellent facilities in terms of equipment and staffs are available to prepare students as professional Mechanical Engineers.",
    image: "/img/Faculty/ME_Sushovan_Chatterjee.jpg",
    order: 1,
  },
  {
    name: "Dr. Palash Das",
    role: "Assistant Professor",
    dept: "Electronics & Comm. Engg.",
    message: "I believe that someone's adaptive nature is one of the reasons behind his success. Our students are sufficiently adaptive.",
    image: "/img/Faculty/ECEpalashDas.jpg",
    order: 2,
  },
  {
    name: "Dr. Kingshuk Dan",
    role: "Assistant Professor",
    dept: "Civil Engineering",
    message: "The aim of the department is to impart the students a sound knowledge of the theory of civil engineering subjects.",
    image: "/img/Faculty/Kingshuk%20Dan.jpg",
    order: 3,
  },
  {
    name: "Dr. Somen Mondal (TPO Head)",
    role: "HOD & Assistant Professor",
    dept: "Electrical Engineering",
    message: "The TPO Cell promotes student success through dedicated faculty,industry Alliance,& effective training and placement outcomes.",
    image: "/img/Faculty/Somen_P.jpg",
    order: 4,
  },
  {
    name: "Prof. Arnab Gain",
    role: "Assistant Professor",
    dept: "Computer Science & Engg.",
    message: "Our department is committed to excellence in teaching and research in the field of computer science and technology.",
    image: "/img/Faculty/423-A.jpg",
    order: 5,
  },
  {
    name: "Dr. Sourav Chakraborty",
    role: "HOD & Assistant Professor",
    dept: "Electrical Engineering",
    message: "We focus on providing a strong foundation in electrical systems and power electronics for sustainable future.",
    image: "/img/Faculty/sourav.png",
    order: 6,
  },
  {
    name: "Prof. Atanu Maji",
    role: "HOD & Assistant Professor",
    dept: "Computer Science & Engg.",
    message: "As HOD (EE), I am committed to academic excellence, practical learning, and preparing our students for successful careers.",
    image: "/img/Faculty/EE_Atanu.jpg",
    order: 7,
  },
  {
    name: "Dr. Samik Nag",
    role: "Assistant Professor",
    dept: "Physics",
    message: "Basic sciences form the backbone of engineering. We ensure our students have a solid conceptual foundation.",
    image: "/img/Faculty/CHE_Samik_Nag.jpg",
    order: 8,
  },
];

export const initialRecruiters = [
  { name: "ICICI Bank", logo: "https://www.google.com/s2/favicons?domain=icicibank.com&sz=256", website: "https://www.icicibank.com", order: 1 },
  { name: "Infosys", logo: "https://content.linkedin.com/content/dam/me/business/en-us/sales-solutions/resources/images/apac/images/infosys-logo.png.original.png", website: "https://www.infosys.com", order: 2 },
  { name: "Mindtree", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVe94WjiPTzH2WwFOu3mw5UQU9I5Q_haldfg&s", website: "https://www.mindtree.com", order: 3 },
  { name: "TCS", logo: "https://cgec.org.in/img/company_logo/Tata%20Consultancy%20Services.png", website: "https://www.tcs.com", order: 4 },
  { name: "Cognizant", logo: "https://www.google.com/s2/favicons?domain=cognizant.com&sz=256", website: "https://www.cognizant.com", order: 5 },
  { name: "Wipro", logo: "https://www.google.com/s2/favicons?domain=wipro.com&sz=256", website: "https://www.wipro.com", order: 6 },
  { name: "Accenture", logo: "https://www.google.com/s2/favicons?domain=accenture.com&sz=256", website: "https://www.accenture.com", order: 7 },
  { name: "Capgemini", logo: "https://cgec.org.in/img/company_logo/Capgemini.jpg", website: "https://www.capgemini.com", order: 8 },
  { name: "HCL", logo: "https://www.logo.wine/a/logo/HCL_Technologies/HCL_Technologies-Logo.wine.svg", website: "https://www.hcltech.com", order: 9 },
  { name: "Tech Mahindra", logo: "https://architecturehouston.org/wp-content/uploads/2025/04/Logo-Without-Tagline_Blue.png", website: "https://www.techmahindra.com", order: 10 },
];

