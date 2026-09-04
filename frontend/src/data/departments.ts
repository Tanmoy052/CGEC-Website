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
    message: string | string[];
    image: string;
  };
  faculty: {
    name: string;
    role: string;
    image: string;
    experience?: string;
    qualification?: string;
    specialization?: string;
    cvLink?: string;
  }[];
  labs: {
    name: string;
    description: string;
    image?: string;
  }[];
  syllabus: {
    semester: string;
    pdfLink: string;
  }[];
  research: {
    facultyName: string;
    publications: {
      title: string;
      authors: string;
      journal: string;
      year: string;
    }[];
  }[];
  wallMagazine: {
    name: string;
    description: string;
    images: string[];
  };
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
        "The Department of Computer Science and Engineering started its journey from the very first day the college started on 16th August in the year 2016. The department envisions to continually improving its educational delivery and research with a goal to develop engineering manpower with strong academic and technical background, who will respond swiftly to challenges and changes faced in the rapidly changing scenario of Computer Science and Engineering.",
        "The department is regularly conducting workshops, seminars and special classes beyond the syllabus to groom both students and faculty to inculcate advancement of technology in Computer Science and Engineering. With a mix of experienced and young faculty members, the department thrives in providing a disciplined as well as a well-coordinated learning environment.",
        "Well-equipped Laboratories function seamlessly to enable the use of laboratory facilities for research activities. The department specializes in various disciplines under Computer Science, including Computer Networks, Operating Systems, Database Management Systems, Artificial Intelligence, Machine Learning, and Web Technology.",
        "The department encourages students to participate in research and live projects under the guidance of faculty members. Students are motivated and encouraged to work on state-of-the-art research and projects.",
      ],
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop",
    },
    hodMessage: {
      name: "Head of the Department",
      message:
        "The Department offers a 4-year B.Tech degree in Computer Science & Engineering. The department places emphasis on core aspects of computers such as Algorithm Design, Database Systems, Computer Networks, and Artificial Intelligence, while encouraging analytical capabilities and professional excellence.",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop",
    },
    faculty: [],
    labs: [],
    syllabus: [],
    research: [],
    wallMagazine: {
      name: "CSE Wall Magazine",
      description: "Department technical showcase and student creativity corner.",
      images: [],
    },
  },
  ece: {
    id: "ece",
    name: "Electronics & Communication Engineering",
    shortName: "ECE",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
    home: {
      paragraphs: [
        "The Department of Electronics and Communication Engineering has been imparting quality technical education since the inception of the college. The department aims to produce competent engineers capable of addressing emerging technological challenges.",
        "The curriculum integrates theoretical coursework with hands-on laboratory experiences in Analog & Digital Electronics, VLSI Design, Microwave Engineering, and Digital Signal Processing.",
        "Students are actively encouraged to develop hardware and embedded systems prototypes, participate in technical symposiums, and engage in interdisciplinary research.",
      ],
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
    },
    hodMessage: {
      name: "Head of the Department",
      message:
        "Welcome to the Department of Electronics and Communication Engineering. We strive to provide students with rigorous training in cutting-edge communication systems, microelectronics, and signal processing.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop",
    },
    faculty: [],
    labs: [],
    syllabus: [],
    research: [],
    wallMagazine: {
      name: "ECE Wall Magazine",
      description: "Highlights of innovations and creative pursuits in electronics.",
      images: [],
    },
  },
  ee: {
    id: "ee",
    name: "Electrical Engineering",
    shortName: "EE",
    image:
      "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?w=800&auto=format&fit=crop",
    home: {
      paragraphs: [
        "The Department of Electrical Engineering at CGEC provides comprehensive education in fundamental electrical principles and contemporary power technologies.",
        "Through practical sessions in Electrical Machines, Power Electronics, Control Systems, and Renewable Energy systems, students acquire strong analytical and experimental skills.",
        "Our graduates are prepared to contribute effectively across power sectors, automation industries, and advanced academic research.",
      ],
      image:
        "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?w=800&auto=format&fit=crop",
    },
    hodMessage: {
      name: "Head of the Department",
      message:
        "Our department focuses on academic excellence, hands-on learning, and preparing our students for sustainable engineering solutions in power and automation.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop",
    },
    faculty: [],
    labs: [],
    syllabus: [],
    research: [],
    wallMagazine: {
      name: "EE Wall Magazine",
      description: "Student articles, renewable energy trends, and technical articles.",
      images: [],
    },
  },
  me: {
    id: "me",
    name: "Mechanical Engineering",
    shortName: "ME",
    image:
      "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800&auto=format&fit=crop",
    home: {
      paragraphs: [
        "The Department of Mechanical Engineering offers a thorough grounding in thermal engineering, design, manufacturing, and mechanics.",
        "The department provides experiential learning through workshop practices, manufacturing facilities, CAD/CAM labs, and fluid power test facilities.",
        "We encourage innovation and sustainable design principles, preparing our students for diverse roles in industry and research.",
      ],
      image:
        "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800&auto=format&fit=crop",
    },
    hodMessage: {
      name: "Head of the Department",
      message:
        "Mechanical Engineering continues to be the foundation of industrial advancement. We empower students with design capabilities, practical problem-solving skills, and ethical professionalism.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop",
    },
    faculty: [],
    labs: [],
    syllabus: [],
    research: [],
    wallMagazine: {
      name: "ME Wall Magazine",
      description: "Technical articles on modern manufacturing, automotive engineering, and student projects.",
      images: [],
    },
  },
  ce: {
    id: "ce",
    name: "Civil Engineering",
    shortName: "CE",
    image:
      "https://images.unsplash.com/photo-1541888946425-d0fbb1861564?w=800&auto=format&fit=crop",
    home: {
      paragraphs: [
        "The Department of Civil Engineering is committed to developing engineering professionals who design, construct, and maintain resilient infrastructure.",
        "Students gain practical expertise in Structural Engineering, Geotechnical Investigation, Environmental Engineering, and Surveying.",
        "Emphasis is placed on modern construction management, sustainable green infrastructure, and community development.",
      ],
      image:
        "https://images.unsplash.com/photo-1541888946425-d0fbb1861564?w=800&auto=format&fit=crop",
    },
    hodMessage: {
      name: "Head of the Department",
      message:
        "The aim of the department is to impart sound knowledge of the theory and practice of civil engineering, equipping students to build the sustainable cities of tomorrow.",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop",
    },
    faculty: [],
    labs: [],
    syllabus: [],
    research: [],
    wallMagazine: {
      name: "CE Wall Magazine",
      description: "Showcasing structural achievements, architectural designs, and student insights.",
      images: [],
    },
  },
  bsh: {
    id: "bsh",
    name: "Basic Science & Humanities",
    shortName: "BSH",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop",
    home: {
      paragraphs: [
        "The Department of Basic Science & Humanities plays a vital foundational role in engineering education, imparting deep knowledge in Mathematics, Physics, Chemistry, and English Communication.",
        "Strong fundamentals in basic sciences are essential for understanding complex engineering applications and advancing scientific inquiry.",
        "The department provides well-equipped physics and chemistry laboratories along with modern language communication resources.",
      ],
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop",
    },
    hodMessage: {
      name: "Head of the Department",
      message:
        "Basic sciences form the backbone of engineering education. We ensure our students have a solid conceptual foundation and communication proficiency to excel in higher studies.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop",
    },
    faculty: [],
    labs: [],
    syllabus: [],
    research: [],
    wallMagazine: {
      name: "BSH Wall Magazine",
      description: "Literary pursuits, science essays, and creative student publications.",
      images: [],
    },
  },
};
