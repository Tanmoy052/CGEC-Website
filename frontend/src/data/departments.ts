export interface DepartmentData {
  id: string;
  name: string;
  shortName: string;
  image: string;
  home: {
    paragraphs: string[];
    image: string;
  };
  hodMessage: {
    name: string;
    message: string;
    image: string;
  };
  faculty: {
    name: string;
    role: string;
    image: string;
    experience?: string;
    qualification?: string;
    specialization?: string;
  }[];
  labs: {
    name: string;
    description: string;
    image?: string;
  }[];
  syllabus: string; // Link to PDF or description
  research: string;
  wallMagazine: string;
}

export const departments: Record<string, DepartmentData> = {
  cse: {
    id: "cse",
    name: "Computer Science & Engineering",
    shortName: "CSE",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop",
    home: {
      paragraphs: [
        "The Department of Computer Science and Engineering started its journey from the very first day the college started on 16th August in the year 2016. The department envisions to continually improving its educational delivery and research with a goal to develop engineering manpower with the strong academic and technical background, who will respond swiftly to the challenges and changes faced in the rapidly changing scenario of Computer Science and Engineering. The objective is to educate, train and develop world class research and IT professionals with a mastery of not only hardware and software skills but also soft skills for professional success.",
        "The department is regularly conducting workshops, seminars and special classes beyond the syllabus to groom both students and faculty to inculcate advancement of technology in Computer Science and Engineering. With a mix of experienced and young faculty members, the department thrives in providing a disciplined as well as a well-coordinated learning environment.",
        "Five well equipped Laboratories are functioning seamlessly every day to enable the use of laboratory facilities for research activities. The department specializes in various disciplines under Computer Science, including Computer Network, Operating Systems, Computer Architecture, Database Management Systems, Distributed Systems, Artificial Intelligence, Big Data, Machine Learning, Deep learning, Image Processing, Language Processors, Mobile Computing, Network Security, Pattern Recognition and Web Technology.",
        "The department encourages students to participate in research and live projects under the guidance of faculty members. Students are motivated and encouraged to work on state of the art research and projects. There have been a number of publications in Journals, International and National Conferences faculty members over the last three years. The department aims to provide amenities for the students in every possible way and groom them for a successful life ahead.",
        "The department maintaining its relationship with the different industry and renowned institute for conduct courses to enhance the technical skills of the students and make them industry ready. Students of the department are engaged in research oriented as well as industry oriented projects.",
      ],
      image: "https://cgec.org.in/img/labimage/LabCSE1.jpg",
    },
    hodMessage: {
      name: "Prof. Somen Mondal",
      message:
        "As the Head of the Department, I welcome you to the Department of Computer Science and Engineering. Our mission is to provide quality education and foster research in the field of computer science.",
      image: "https://cgec.org.in/img/Faculty/Somen_P.jpg",
    },
    faculty: [
      {
        name: "Mr. Somen Mondal",
        role: "HOD and Assistant Professor",
        experience: "09 Years",
        qualification: "B.Tech., M.Tech.",
        specialization:
          "Cloud Computing, Advanced Cryptography & Network Security",
        image: "https://cgec.org.in/img/Faculty/Somen_P.jpg",
      },
      {
        name: "Mr. Arnab Gain",
        role: "Assistant Professor",
        experience: "2 yr 7 month",
        qualification: "M.E.",
        specialization:
          "Computer Vision, Deep Learning, Formal Language and Automata Theory, Design and analysis of algorithm",
        image: "https://cgec.org.in/img/Faculty/423-A.jpg",
      },
      {
        name: "Mr. Shahid Ali",
        role: "Technical Assistant",
        experience: "9 yrs",
        qualification: "BSC, PDIT, PGDSE",
        specialization: "COMPUTER Applications, C,C++, Java,VB",
        image: "https://cgec.org.in/img/Faculty/ii.jpg",
      },
      {
        name: "Mr. Pranab Kumar Mallick",
        role: "Technical Assistant",
        experience: "7 YEARS",
        qualification: "B.TECH M.TECH, CSE",
        specialization: "Data Structure, Image Processing, Soft Computing",
        image:
          "https://ui-avatars.com/api/?name=Pranab+Kumar+Mallick&background=random",
      },
      {
        name: "Mr. Umakanta Bera",
        role: "Technical Assistant",
        experience: "07 Years (As of 2024)",
        qualification: "B.Tech.",
        specialization:
          "Data Structure, Python, C, Java, Computer Architecture",
        image:
          "https://ui-avatars.com/api/?name=Umakanta+Bera&background=random",
      },
      {
        name: "Dr. Prabir Kr. Naskar",
        role: "Assistant Professor",
        experience: "-",
        qualification: "B.Tech, M.Tech, Ph.D",
        specialization: "-",
        image:
          "https://ui-avatars.com/api/?name=Prabir+Kr+Naskar&background=random",
      },
    ],
    labs: [
      {
        name: "Computer Center",
        description:
          "This lab is equipped with 100 computers (i5 processor, 4/8GB RAM, Windows 8.1 Operating System), 1 Smart projector and 1 LCD projector. This Lab used to perform C programming Language Lab, Data Structure Lab, and Numerical Method lab according to MAKAUT curriculum.",
      },
      {
        name: "Language Lab",
        description:
          "This lab is equipped with 40 computers (i5 processor, 4/8GB RAM, Windows 8.1 Operating System) and 1 LCD projector. This Lab used to perform C programming Language Lab, Software based English Language Lab according to MAKAUT curriculum.",
      },
      {
        name: "Computer Programming Lab-1",
        description:
          "This lab is equipped with 36 computers (i5 processor, 8GB RAM, Ubuntu Linux/Windows 8.1 Operating System) and 1 LCD projector. This Lab used to perform Operating System Lab, Data Structure Lab, Networking Lab, Object Oriented Lab, Numerical Method Lab according to MAKAUT curriculum.",
      },
      {
        name: "Computer Programming Lab-2",
        description:
          "This lab is equipped with 36 computers (i5 processor, 8GB RAM, Ubuntu Linux/Windows 8.1 Operating System) and 1 LCD projector. This Lab used to perform Software Tools Lab, Networking Lab, Object Oriented Lab, DBMS Lab according to MAKAUT curriculum.",
      },
      {
        name: "Computer Programming Lab-3",
        description:
          "This lab is equipped with 36 computers (i5 processor, 8GB RAM, Ubuntu Linux/Windows 8.1 Operating System) and 1 LCD projector. This Lab used to perform Internet Technology Lab, Software Engg. Lab, AI Lab, DBMS Lab according to MAKAUT curriculum.",
      },
    ],
    syllabus: "https://makautwb.ac.in/syllabus/CSE_New_Syllabus_2018.pdf",
    research:
      "Our faculty and students are actively involved in research in AI, ML, and IoT.",
    wallMagazine: "TechBytes - The annual wall magazine of CSE department.",
  },
  ece: {
    id: "ece",
    name: "Electronics & Communication Engineering",
    shortName: "ECE",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
    home: {
      paragraphs: [
        "The Department of Electronics and Communication Engineering is dedicated to providing students with a strong foundation in electronics and communication systems. The department focuses on bridging the gap between theoretical knowledge and practical application.",
        "We offer state-of-the-art laboratories and research facilities to help students explore the latest advancements in the field. Our curriculum is designed to keep pace with the rapidly evolving technology landscape.",
        "The department has a team of highly qualified and experienced faculty members who are committed to the holistic development of students.",
      ],
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvWA03NHsb7dweLdgPcEtyjmt1mlUHfbRu1g&s",
    },
    hodMessage: {
      name: "Dr.Sourav Chakraborty",
      message:
        "Welcome to the ECE Department. We strive to create an environment that encourages innovation and critical thinking.",
      image: "https://cgec.org.in/img/Faculty/sourav.png",
    },
    faculty: [
      {
        name: "Dr. Gautam Das",
        role: "Professor",
        experience: "17 years 6 months",
        qualification: "Ph.D in Engineering",
        specialization: "Digital electronic circuits, Microprocessor",
        image: "https://ui-avatars.com/api/?name=Gautam+Das&background=random",
      },
      {
        name: "Mr. Soumik Sarkar",
        role: "Technical Assistant",
        experience: "5 years",
        qualification: "B.Tech from Jalpaiguri Government Engineering College",
        specialization: "Solid State Devices, Analog Electronics",
        image:
          "https://ui-avatars.com/api/?name=Soumik+Sarkar&background=random",
      },
      {
        name: "Mr. Avisek Nandi",
        role: "Technical Assistant",
        experience: "10 Years",
        qualification:
          "DIPLOMA IN ELECTRONICS & TELECOMMUNICATION ENGINEERING FROM KALNA GOVT POLYTECHNIC",
        specialization: "ELECRONICS SYSTEM IN POWER ELECTRONICS FIELD",
        image:
          "https://ui-avatars.com/api/?name=Avisek+Nandi&background=random",
      },
      {
        name: "Dr. Palash Das",
        role: "Assistant Professor",
        experience: "Industry: 3 Research: 11 Teaching: 4",
        qualification: "Ph.D. (IIT Kharagpur) M.S. (IIT Kharagpur) B.Tech",
        specialization:
          "Gallium Nitride Compound Semiconductor based High Electron Mobility Transistor, HRXRD",
        image: "https://cgec.org.in/img/Faculty/ECEpalashDas.jpg",
      },
      {
        name: "Mr. Rajib Das",
        role: "Assistant Professor",
        experience: "Teaching: 6",
        qualification: "M.E.Tel.E, B. Tech",
        specialization: "Control Systems, Signal Processing",
        image: "https://ui-avatars.com/api/?name=Rajib+Das&background=random",
      },
      {
        name: "Dr. Sourav Chakraborty",
        role: "HOD & Assistant Professor",
        experience: "Teaching: 12",
        qualification: "Ph.D(Engg), M. Tech, B. Tech",
        specialization:
          "VLSI design, Signal Processing, Wireless system architecture design, Analog circuit design",
        image: "https://cgec.org.in/img/Faculty/sourav.png",
      },
      {
        name: "Mr. Abhijit Sarma",
        role: "Technical Assistant",
        experience: "05 Years (As of 2024)",
        qualification:
          "Diploma in Electronics and Telecommunication Engineering",
        specialization: "-",
        image:
          "https://ui-avatars.com/api/?name=Abhijit+Sarma&background=random",
      },
    ],
    labs: [
      {
        name: "Basic Electronics Lab",
        description:
          "This lab is equiped with all the instrument that is required according to MAKAUT Syllabus",
      },
      {
        name: "Solid State Lab",
        description: "This labs are under progress",
      },
      {
        name: "Analog Electronics Lab",
        description: "-",
      },
      {
        name: "EM Theory & Tx Lines Lab",
        description: "-",
      },
      {
        name: "Digital Electronic & Integrated Circuits Lab",
        description: "-",
      },
    ],
    syllabus: "https://makautwb.ac.in/syllabus/ECE_New_Syllabus_2018.pdf",
    research:
      "Research areas include VLSI, Signal Processing, and Communication Systems.",
    wallMagazine: "ElectroWaves",
  },
  me: {
    id: "me",
    name: "Mechanical Engineering",
    shortName: "ME",
    image:
      "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800&auto=format&fit=crop",
    home: {
      paragraphs: [
        "The Mechanical Engineering Department aims to produce competent mechanical engineers who can contribute to the industrial growth of the nation. We focus on imparting sound technical knowledge and practical skills.",
        "Our workshops and laboratories are equipped with modern machinery and tools to provide hands-on training to students.",
        "The department encourages students to participate in various technical competitions and project exhibitions.",
      ],
      image:
        "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800&auto=format&fit=crop",
    },
    hodMessage: {
      name: "Prof. Prasenjit Das",
      message:
        "Welcome to the Mechanical Engineering Department. We are committed to excellence in engineering education.",
      image: "https://cgec.org.in/img/Faculty/ME_Prasenjit.jpg",
    },
    faculty: [
      {
        name: "Dr. Sushovan Chatterjee",
        role: "Principal & Associate Professor",
        experience: "12 years",
        qualification:
          "BME (Hons.) (JU), MME (JU), PhD (IIT Guwahati), MIE (India)",
        specialization:
          "Design and thermal optimization of chemical process, I.C. engines",
        image: "https://cgec.org.in/img/Faculty/ME_Sushovan_Chatterjee.jpg",
      },
      {
        name: "Mr. Gyan Tshering Lepcha",
        role: "Assistant Professor",
        experience: "8 Years",
        qualification: "B.Tech(JGEC), MBA(NBU), MTech(JGEC)",
        specialization:
          "Production Engineering, Design, Automobile Engineering, Thermal Power Engineering",
        image:
          "https://ui-avatars.com/api/?name=Gyan+Tshering+Lepcha&background=random",
      },
      {
        name: "Prof. Prasenjit Das",
        role: "HOD and Assistant Professor",
        experience: "05",
        qualification: "Master of Engineering In Mechanical Engineering",
        specialization: "Machine Design",
        image: "https://cgec.org.in/img/Faculty/ME_Prasenjit.jpg",
      },
      {
        name: "Mr. Provas Barua",
        role: "Technical Assistant",
        experience: "9 Years of Experience",
        qualification: "DIPLOMA MECHANICAL ENGINEERING",
        specialization: "Quality Control",
        image:
          "https://ui-avatars.com/api/?name=Provas+Barua&background=random",
      },
      {
        name: "Mr. Nikhilesh Das",
        role: "Technical Assistant",
        experience: "03 Years (As of 2024)",
        qualification: "Diploma in mechanical engineering",
        specialization: "-",
        image:
          "https://ui-avatars.com/api/?name=Nikhilesh+Das&background=random",
      },
      {
        name: "Mr. Ziaul Rahaman",
        role: "Technical Assistant",
        experience: "03 Years (As of 2024)",
        qualification: "Diploma in Mechanical Engineering",
        specialization: "-",
        image:
          "https://ui-avatars.com/api/?name=Ziaul+Rahaman&background=random",
      },
      {
        name: "Mr. Sudipta Roy",
        role: "Assistant Professor",
        experience: "12 Years",
        qualification: "B.Tech(JGEC), MME(JU), PhD(JU) (Pursuing)",
        specialization: "Production Engineering, Composite",
        image: "https://ui-avatars.com/api/?name=Sudipta+Roy&background=random",
      },
      {
        name: "Dr. Masud Rana",
        role: "Assistant Professor",
        experience: "4 years",
        qualification: "M.E from IIEST Shibpur, Ph.D",
        specialization: "Machine Design, Biomechanics",
        image: "https://ui-avatars.com/api/?name=Masud+Rana&background=random",
      },
      {
        name: "Dr. Sanchayan Mukherjee",
        role: "Associate Professor",
        experience: "29 years 5 months",
        qualification:
          "B.M.E. (1st Class Hons., JU), M.E. (1st Class with Distinction, BITS Pilani), Ph.D. (Engineering, JU",
        specialization:
          "Heat Transfer, Refrigeration and Air-conditioning, Sediment Transport",
        image:
          "https://ui-avatars.com/api/?name=Sanchayan+Mukherjee&background=random",
      },
    ],
    labs: [
      {
        name: "Workshop",
        description:
          "Comprehensive workshop with lathe, milling, and drilling machines.",
      },
      {
        name: "Fluid Mechanics Lab",
        description: "Flow measurement and fluid properties experiments.",
      },
      {
        name: "Manufacturing Technology Lab",
        description: "Advanced manufacturing processes and tools.",
      },
      {
        name: "Material Testing Lab",
        description: "Testing of mechanical properties of materials.",
      },
      {
        name: "Thermal Engineering Lab",
        description: "Heat transfer and thermodynamics experiments.",
      },
      {
        name: "CAD/CAM Lab",
        description: "Computer-aided design and manufacturing.",
      },
    ],
    syllabus: "https://makautwb.ac.in/syllabus/ME_New_Syllabus_2018.pdf",
    research: "Focus areas: Thermal Engineering, Design, and Manufacturing.",
    wallMagazine: "Mechanix",
  },
  ee: {
    id: "ee",
    name: "Electrical Engineering",
    shortName: "EE",
    image:
      "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?w=800&auto=format&fit=crop",
    home: {
      paragraphs: [
        "The Electrical Engineering Department is one of the core departments of the college. We aim to provide a strong foundation in electrical engineering principles and applications.",
        "Our curriculum covers a wide range of topics including power systems, control systems, and electrical machines.",
        "We emphasize practical learning through our well-equipped laboratories.",
      ],
      image:
        "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=1000&auto=format&fit=crop",
    },
    hodMessage: {
      name: "Prof. Atanu Maji",
      message:
        "The EE Department welcomes you. We aim to shape the future of electrical engineering through quality education.",
      image: "https://cgec.org.in/img/Faculty/EE_Atanu.jpg",
    },
    faculty: [
      {
        name: "Mr. Sk Rabiul Hossain",
        role: "OIC & Assistant Professor",
        experience: "3 YEARS",
        qualification: "B.Tech.,M.Tech.",
        specialization: "Power Electronics & Drives",
        image:
          "https://ui-avatars.com/api/?name=Sk+Rabiul+Hossain&background=random",
      },
      {
        name: "Prof. Atanu Maji",
        role: "HOD & Assistant Professor",
        experience: "11 Years",
        qualification: "B.Tech., M.E.",
        specialization: "Power System",
        image: "https://cgec.org.in/img/Faculty/EE_Atanu.jpg",
      },
      {
        name: "Mr. Tanumay Halder",
        role: "Assistant Professor",
        experience: "7 Years",
        qualification: "B.Tech., M.E.",
        specialization: "ILLUMINATION ENGINEERING",
        image:
          "https://ui-avatars.com/api/?name=Tanumay+Halder&background=random",
      },
      {
        name: "Mr. Sujay Sarkar",
        role: "Technical Assistant",
        experience: "9 years teaching and 5 years industry",
        qualification: "Diploma in Electrical Engineering",
        specialization: "-",
        image:
          "https://ui-avatars.com/api/?name=Sujay+Sarkar&background=random",
      },
      {
        name: "Mr. Deepjyoti Santra",
        role: "Associate Professor",
        experience: "7 years",
        qualification: "M.TECH",
        specialization: "ELECTRICAL MACHINE",
        image:
          "https://ui-avatars.com/api/?name=Deepjyoti+Santra&background=random",
      },
      {
        name: "Dr. Goutam Kumar Panda",
        role: "Professor",
        experience: "Teaching 31years , industrial 2years",
        qualification: "B.E.( Electrical), M.E.E, Ph.D",
        specialization: "Electrical Machines and Drives",
        image:
          "https://ui-avatars.com/api/?name=Goutam+Kumar+Panda&background=random",
      },
    ],
    labs: [
      {
        name: "Basic Electrical Lab",
        description: "Well-equipped laboratory as per MAKAUT curriculum",
      },
      {
        name: "Electric Circuit theory Lab",
        description: "This labs are under progress",
      },
      {
        name: "Electrical & Electronics Measurement Lab",
        description: "-",
      },
      {
        name: "Electric machine-I Lab",
        description: "-",
      },
      {
        name: "Electric machine-II Lab",
        description: "-",
      },
      {
        name: "Power system-I Lab",
        description: "-",
      },
      {
        name: "Power System –II Lab",
        description: "-",
      },
      {
        name: "Control System- Lab",
        description: "-",
      },
      {
        name: "Power Electronics Lab",
        description: "-",
      },
      {
        name: "Electric Drives Lab",
        description: "-",
      },
      {
        name: "Simulation Lab",
        description: "-",
      },
    ],
    syllabus: "https://makautwb.ac.in/syllabus/EE_New_Syllabus_2018.pdf",
    research: "Research in Power Systems and Renewable Energy.",
    wallMagazine: "Electra",
  },
  ce: {
    id: "ce",
    name: "Civil Engineering",
    shortName: "CE",
    image:
      "https://www.msruas.ac.in/uploads/blogs/btech-in-civil-engineering-your-pathway-to-monumental-success.webp",
    home: {
      paragraphs: [
        "The Civil Engineering Department is committed to producing skilled civil engineers who can contribute to infrastructure development. We focus on both theoretical and practical aspects of civil engineering.",
        "Our labs are equipped with the latest testing equipment for materials, soil, and structures.",
        "We encourage students to take up projects that address real-world challenges.",
      ],
      image:
        "https://images.unsplash.com/photo-1590579491624-f98f36d4c763?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    hodMessage: {
      name: "Prof. Biren Gurung",
      message:
        "Welcome to the Civil Engineering Department. We are dedicated to building a sustainable future.",
      image: "https://cgec.org.in/img//Faculty/Biren%20Gurung.jpg",
    },
    faculty: [
      {
        name: "Prof. Biren Gurung",
        role: "Assistant Professor",
        experience: "9 years",
        qualification: "BE, M.Tech",
        specialization: "Structure",
        image: "https://cgec.org.in/img//Faculty/Biren%20Gurung.jpg",
      },
      {
        name: "Dr. Kingshuk Dan",
        role: "Assistant Professor",
        experience: "8 Years",
        qualification: "B.E., M.E., Ph.D",
        specialization:
          "Soil mechanics, Highway and Transportation engineering",
        image: "https://cgec.org.in/img/Faculty/Kingshuk%20Dan.jpg",
      },
      {
        name: "Mr. Md Asif Sk",
        role: "Assistant Professor",
        experience: "4 years",
        qualification: "B.Tech, M.E.",
        specialization: "Water Resources Engineering, Hydraulic Structures",
        image: "https://ui-avatars.com/api/?name=Md+Asif+Sk&background=random",
      },
      {
        name: "Mr. Shyamal Ghosh",
        role: "Assistant Professor",
        experience: "Teaching : 1 year, Research: 3 years",
        qualification:
          "Ph D, M. E (Structural Engineering) BESU, B.Tech. (Civil Engineering) JGEC",
        specialization:
          "Structural Dynamics and Earthquake Engineering, Reliability Analysis, Structural Engineering, Finite Element Analysis",
        image:
          "https://ui-avatars.com/api/?name=Shyamal+Ghosh&background=random",
      },
      {
        name: "Mr. Ansarul Seikh",
        role: "Technical Assistant",
        experience: "03 Years (As of 2024)",
        qualification: "Diploma in Civil Engineering Department",
        specialization: "-",
        image:
          "https://ui-avatars.com/api/?name=Ansarul+Seikh&background=random",
      },
      {
        name: "Mr. Chhandamay Ray",
        role: "Assistant Professor",
        experience: "5 years",
        qualification: "M. Tech",
        specialization: "Soil Mechanics & Foundation Engineering",
        image:
          "https://ui-avatars.com/api/?name=Chhandamay+Ray&background=random",
      },
      {
        name: "Mr. Mithun Mandal",
        role: "Assistant Professor",
        experience: "5 years",
        qualification: "M.Tech",
        specialization: "Geotechnical Engineering",
        image:
          "https://ui-avatars.com/api/?name=Mithun+Mandal&background=random",
      },
    ],
    labs: [
      {
        name: "Concrete Lab",
        description: "Testing of concrete and construction materials.",
      },
      {
        name: "Solid Mechanics Lab",
        description: "Stress and strain analysis.",
      },
      {
        name: "Surveying Practice",
        description: "Land surveying techniques and instruments.",
      },
      {
        name: "Fluid Mechanics Lab",
        description: "Fluid flow and hydraulics.",
      },
      {
        name: "Engineering Geology Lab",
        description: "Study of rocks and minerals.",
      },
      {
        name: "Soil Mechanics Lab",
        description: "Soil properties and foundation engineering.",
      },
    ],
    syllabus: "https://makautwb.ac.in/syllabus/CE_New_Syllabus_2018.pdf",
    research:
      "Research in Structural Engineering and Environmental Engineering.",
    wallMagazine: "Construct",
  },
  bsh: {
    id: "bsh",
    name: "Basic Science & Humanities",
    shortName: "BSH",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    home: {
      paragraphs: [
        "The Department of Basic Science & Humanities plays a pivotal role in laying the foundation for engineering education. It comprises Physics, Chemistry, Mathematics, and Humanities.",
        "The department aims to provide a strong conceptual basis in fundamental sciences which is essential for understanding engineering principles.",
        "We also focus on enhancing the communication skills and soft skills of students to prepare them for the corporate world.",
      ],
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    hodMessage: {
      name: "Prof. Madhuchandra Bhaduri",
      message:
        "Welcome to the Basic Science & Humanities Department. We are dedicated to providing a strong scientific foundation for future engineers.",
      image: "https://cgec.org.in/img/Faculty/MADHUCHANDRA%20BHADURI%20.jpg",
    },
    faculty: [
      {
        name: "Mr. Mohammad Salim",
        role: "Assistant Professor of Mathematics & Registrar-In-Charge",
        experience: "11 Years (As of 2024)",
        qualification: "M. Sc in Mathematics from IIT Bombay",
        specialization: "Complex Analysis, Topology",
        image:
          "https://ui-avatars.com/api/?name=Mohammad+Salim&background=random",
      },
      {
        name: "Ms. Madhuchandra Bhaduri",
        role: "Assistant Professor in Economics",
        experience: "7 Years",
        qualification: "M.A., M.PHIL(Economics)",
        specialization: "International Trade, Agricultural Economics",
        image: "https://cgec.org.in/img/Faculty/MADHUCHANDRA%20BHADURI%20.jpg",
      },
      {
        name: "Mr. Soumik Roy",
        role: "Assistant Professor in Mathematics",
        experience: "5 Years",
        qualification: "B.Sc Hons Mathematics, M.Sc Applied Mathematics",
        specialization: "Operation Research",
        image: "https://ui-avatars.com/api/?name=Soumik+Roy&background=random",
      },
      {
        name: "Dr. Madhumita Dhar",
        role: "Assistant Professor in Physics",
        experience: "6 Years",
        qualification: "PhD",
        specialization: "Nuclear Physics",
        image:
          "https://ui-avatars.com/api/?name=Madhumita+Dhar&background=random",
      },
      {
        name: "Dr. Samik Nag",
        role: "Assistant Professor in Chemistry (WBES)",
        experience: "12 years",
        qualification: "MSc, PhD (IACS)",
        specialization: "Inorganic Chemistry",
        image: "https://cgec.org.in/img/Faculty/CHE_Samik_Nag.jpg",
      },
      {
        name: "Mr. Arghya Chakraborty",
        role: "Assistant Professor of English",
        experience: "6 years",
        qualification: "M.A. in ENGLISH, UGC - NET",
        specialization: "N.A.",
        image:
          "https://ui-avatars.com/api/?name=Arghya+Chakraborty&background=random",
      },
      {
        name: "Dr. Tanmay Choudhury",
        role: "Assistant Professor in Mathematics",
        experience: "4 years",
        qualification: "B.Sc. (H), M.Sc., Ph.D.",
        specialization: "Cryptography",
        image:
          "https://ui-avatars.com/api/?name=Tanmay+Choudhury&background=random",
      },
      {
        name: "Dr. Biplab Maity",
        role: "Assistant Professor in Mathematics",
        experience: "11 years",
        qualification: "Ph.D",
        specialization: "Plasma Physics",
        image:
          "https://ui-avatars.com/api/?name=Biplab+Maity&background=random",
      },
    ],
    labs: [
      {
        name: "Physics Lab",
        description:
          "Well-equipped lab for optics and general physics experiments.",
        image:
          "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      },
      {
        name: "Chemistry Lab",
        description: "Facilities for chemical analysis and synthesis.",
        image:
          "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      },
      {
        name: "Language Lab",
        description: "Digital lab for improving communication skills.",
        image:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      },
    ],
    syllabus: "https://makautwb.ac.in/syllabus/BSH_New_Syllabus_2018.pdf",
    research: "Research in Applied Physics, Chemistry, and Mathematics.",
    wallMagazine: "Spectrum",
  },
};
