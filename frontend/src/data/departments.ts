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
  }[];
  labs: {
    name: string;
    description: string;
    image: string;
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
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Placeholder for lab image
    },
    hodMessage: {
      name: "Prof. Atanu Maji",
      message:
        "As the Head of the Department, I welcome you to the Department of Computer Science and Engineering. Our mission is to provide quality education and foster research in the field of computer science.",
      image: "https://cgec.org.in/img/Faculty/EE_Atanu.jpg",
    },
    faculty: [
      {
        name: "Prof. Atanu Maji",
        role: "Assistant Professor & HOD",
        image: "https://cgec.org.in/img/Faculty/EE_Atanu.jpg",
      },
      {
        name: "Prof. Arnab Gain",
        role: "Assistant Professor",
        image: "https://cgec.org.in/img/Faculty/423-A.jpg",
      },
    ],
    labs: [
      {
        name: "Programming Lab",
        description: "Equipped with high-end PCs for C, C++, Java programming.",
        image:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop",
      },
      {
        name: "Database Lab",
        description: "Dedicated to DBMS and SQL practicals.",
        image:
          "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
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
        "https://images.unsplash.com/photo-1581092921461-eab62e97a78e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    hodMessage: {
      name: "Dr. Palash Das",
      message:
        "Welcome to the ECE Department. We strive to create an environment that encourages innovation and critical thinking.",
      image: "https://cgec.org.in/img/Faculty/ECEpalashDas.jpg",
    },
    faculty: [
      {
        name: "Dr. Palash Das",
        role: "Assistant Professor & HOD",
        image: "https://cgec.org.in/img/Faculty/ECEpalashDas.jpg",
      },
    ],
    labs: [
      {
        name: "Electronics Lab",
        description: "For basic electronics and circuit design.",
        image:
          "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
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
      name: "Dr. Sushovan Chatterjee",
      message:
        "Welcome to the Mechanical Engineering Department. We are committed to excellence in engineering education.",
      image: "https://cgec.org.in/img/Faculty/ME_Sushovan_Chatterjee.jpg",
    },
    faculty: [
      {
        name: "Dr. Sushovan Chatterjee",
        role: "Principal & Professor",
        image: "https://cgec.org.in/img/Faculty/ME_Sushovan_Chatterjee.jpg",
      },
    ],
    labs: [
      {
        name: "Workshop",
        description:
          "Comprehensive workshop with lathe, milling, and drilling machines.",
        image:
          "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800&auto=format&fit=crop",
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
        "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?w=800&auto=format&fit=crop",
    },
    hodMessage: {
      name: "Prof. Somen Mondal",
      message:
        "The EE Department welcomes you. We aim to shape the future of electrical engineering through quality education.",
      image: "https://cgec.org.in/img/Faculty/Somen_P.jpg",
    },
    faculty: [
      {
        name: "Prof. Somen Mondal",
        role: "Assistant Professor & HOD",
        image: "https://cgec.org.in/img/Faculty/Somen_P.jpg",
      },
      {
        name: "Prof. Sourav Chakraborty",
        role: "Assistant Professor",
        image: "https://cgec.org.in/img/Faculty/sourav.png",
      },
    ],
    labs: [
      {
        name: "Electrical Machines Lab",
        description: "DC/AC motors and generators.",
        image:
          "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?w=800&auto=format&fit=crop",
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
      name: "Dr. Kingshuk Dan",
      message:
        "Welcome to the Civil Engineering Department. We are dedicated to building a sustainable future.",
      image: "https://cgec.org.in/img/Faculty/Kingshuk%20Dan.jpg",
    },
    faculty: [
      {
        name: "Dr. Kingshuk Dan",
        role: "Assistant Professor",
        image: "https://cgec.org.in/img/Faculty/Kingshuk%20Dan.jpg",
      },
    ],
    labs: [
      {
        name: "Concrete Lab",
        description: "Testing of concrete and construction materials.",
        image:
          "https://images.unsplash.com/photo-1590579491624-f98f36d4c763?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
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
      name: "Dr. Samik Nag",
      message:
        "Welcome to the Basic Science & Humanities Department. We are dedicated to providing a strong scientific foundation for future engineers.",
      image: "https://cgec.org.in/img/Faculty/CHE_Samik_Nag.jpg",
    },
    faculty: [
      {
        name: "Dr. Samik Nag",
        role: "Assistant Professor (Physics)",
        image: "https://cgec.org.in/img/Faculty/CHE_Samik_Nag.jpg",
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
