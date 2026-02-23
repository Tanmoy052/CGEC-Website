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
  }[]; // List of syllabi
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
        "It is a pleasure to be head of the department of Computer Science & Engineering. The department offers 4 year's BTech degree in Computer Science & Engineering. The department is equipped with all modern tools of teaching like virtual class room, digital board, and projector. The aim of the department is to provide high quality education along with training the students with all the new advancements in the computers field. The department places emphasis on all the important aspects of computers such as Algorithm Design, Advance database systems, Computer Programming, networking, mobile networks, Operational research, Theory of computation , Computer Graphics and many more. The department also takes initiative to improve the soft skills, analytical capabilities and verbal communication of the students so that they can face the competition in the corporate world confidently. The scope of computer science is endless. The students of the computer science and engineering are highly demanded by the recruiters of the top companies. The department provides platform for the students and We are confident that our Student will emerge as assets not only to this institution and to the organization they belong, but also to the country at large.",
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
        cvLink: "/data/cse/cv/somen.pdf",
      },
      {
        name: "Mr. Arnab Gain",
        role: "Assistant Professor",
        experience: "2 yr 7 month",
        qualification: "M.E.",
        specialization:
          "Computer Vision, Deep Learning, Formal Language and Automata Theory, Design and analysis of algorithm",
        image: "https://cgec.org.in/img/Faculty/423-A.jpg",
        cvLink: "/data/cv/sample_cv.pdf",
      },
      {
        name: "Mr. Shahid Ali",
        role: "Technical Assistant",
        experience: "9 yrs",
        qualification: "BSC, PDIT, PGDSE",
        specialization: "COMPUTER Applications, C,C++, Java,VB",
        image: "https://cgec.org.in/img/Faculty/ii.jpg",
        cvLink: "/data/cse/cv/shahid_ali.pdf",
      },
      {
        name: "Mr. Pranab Kumar Mallick",
        role: "Technical Assistant",
        experience: "7 YEARS",
        qualification: "B.TECH M.TECH, CSE",
        specialization: "Data Structure, Image Processing, Soft Computing",
        image: "https://cgec.org.in/img/Faculty/Mama.jpg",
        cvLink: "/data/cse/cv/pranab.pdf",
      },
      {
        name: "Mr. Umakanta Bera",
        role: "Technical Assistant",
        experience: "07 Years (As of 2024)",
        qualification: "B.Tech.",
        specialization:
          "Data Structure, Python, C, Java, Computer Architecture",
        image: "https://cgec.org.in/img/Faculty/CSE_Umakanta_Bera.jpg",
        cvLink: "/data/cv/sample_cv.pdf",
      },
      {
        name: "Prof. Supriyo Banerjee",
        role: "Assistant Professor",
        experience: "10 Years",
        qualification: "B.Tech, M.Tech",
        specialization: "-",
        image:
          "https://ui-avatars.com/api/?name=Supriyo+Banerjee&background=random",
        cvLink: "/data/cv/sample_cv.pdf",
      },
      {
        name: "Dr. Prabir Kr. Naskar",
        role: "Assistant Professor",
        experience: "9 Years",
        qualification: "B.Tech, M.Tech, Ph.D",
        specialization: "-",
        image: "https://cgec.org.in/img/Faculty/PrabirNaskar_cse.jpg.jpeg",
        cvLink: "/data/cv/sample_cv.pdf",
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
    syllabus: [
      {
        semester: "1st & 2nd Semester(New AICTE Syllabus)",
        pdfLink: "/data/cse/AllSem_cse.pdf",
      },
      {
        semester: "3rd semester(New Syllabus)",
        pdfLink: "/data/cse/CSE_SEM3.pdf",
      },
      {
        semester: "4th semester(New Syllabus)",
        pdfLink: "/data/cse/CSE_SEM4.pdf",
      },
      {
        semester: "5th semester(New Syllabus)",
        pdfLink: "/data/cse/CSE_SEM5.pdf",
      },
      {
        semester: "6th semester(New Syllabus)",
        pdfLink: "/data/cse/CSE_SEM6.pdf",
      },
      {
        semester: "7th semester(New Syllabus)",
        pdfLink: "/data/cse/CSE_SEM7.pdf",
      },
      {
        semester: "8th semester(New Syllabus)",
        pdfLink: "/data/cse/CSE_SEM8.pdf",
      },
      {
        semester: "OLD Syllabus(2017-21 batch)",
        pdfLink: "/data/cse/CSE_OLD.pdf",
      },
    ],
    research: [
      {
        facultyName: "Dr. Sudip Kumar Adhikari",
        publications: [
          {
            title:
              "Conditional spatial fuzzy C-means clustering algorithm for segmentation of MRI images",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri",
            journal: "Applied soft computing 34, 758-769",
            year: "2015",
          },
          {
            title:
              "A spatial fuzzy c-means algorithm with application to mri image segmentation",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri",
            journal:
              "Advances in Pattern Recognition (ICAPR), 2015 Eighth International ..",
            year: "2015",
          },
          {
            title:
              "Segmentation of MRI brain images by incorporating intensity inhomogeneity and spatial information using probabilistic fuzzy c-means clustering algorithm",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri, PK Saha",
            journal:
              "Communications, Devices and Intelligent Systems (CODIS), 2012 International ...",
            year: "2012",
          },
          {
            title:
              "A modified fuzzy C-means algorithm using scale control spatial information for MRI image segmentation in the presence of noise",
            authors: "JK Sing, SK Adhikari, DK Basu",
            journal: "Journal of Chemometrics 29 (9), 492-505",
            year: "2015",
          },
          {
            title:
              "A nonparametric method for intensity inhomogeneity correction in MRI brain images by fusion of Gaussian surfaces",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri, PK Saha",
            journal: "Signal, Image and Video Processing 9 (8), 1945-1954",
            year: "2015",
          },
          {
            title:
              "Conditional Spatial Fuzzy C-means Clustering Algorithm with Application in MRI Image Segmentation",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri",
            journal:
              "Information Systems Design and Intelligent Applications, 539-547",
            year: "2015",
          },
          {
            title:
              "On estimation of bias field in MRI images: polynomial vs Gaussian surface fitting method",
            authors: "S Kahali, SK Adhikari, JK Sing",
            journal: "Journal of Chemometrics 30 (10), 602-620",
            year: "2016",
          },
          {
            title: "On estimation of bias field in MRI images",
            authors: "JK Sing, SK Adhikari, S Kahali",
            journal:
              "Computer Graphics, Vision and Information Security (CGVIS), 2015 IEEE ...",
            year: "2015",
          },
          {
            title:
              "Bias field estimation and segmentation of MRI images using a Spatial Fuzzy C-means algorithm",
            authors: "SK Adhikari, JK Sing, DK Basu",
            journal:
              "2016 2nd International Conference on Control, Instrumentation, Energy ...",
            year: "2016",
          },
        ],
      },
    ],
    wallMagazine: {
      name: "The Wall",
      description:
        "'The Wall' is a platform created for the students of the Computer Science Department, Cooch Behar Government Engineering College (CGEC) to express unspoken words through their artwork. 'The Wall Magazine' showcases an elegant collection of literature and art made by the creative students of the CSE Department, CGEC. Student life is often considered to be pandemonium. While overcoming our hardships, we unknowingly imbibe beautiful hobbies and interests. The Wall Magazine admires surreal thoughts and unusual palettes. We encourage students to adore and display their creative and introspective sides.",
      images: [
        "https://cgec.org.in/img/wall_magazine/Wall_magazine_2021-22_web1.jpg",
        "https://cgec.org.in/img/wall_magazine/Wall_magazine_2021-22_web2.jpg",
      ],
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
        "The Department of Electronics and Communication Engineering is dedicated to providing students with a strong foundation in electronics and communication systems. The department focuses on bridging the gap between theoretical knowledge and practical application, ensuring students are well-versed in both fundamental concepts and modern engineering practices.",
        "We offer state-of-the-art laboratories and research facilities to help students explore the latest advancements in the field, including VLSI Design, Embedded Systems, IoT, and Advanced Communication Networks. Our curriculum is designed to keep pace with the rapidly evolving technology landscape, integrating industry-relevant tools and methodologies.",
        "The department has a team of highly qualified and experienced faculty members who are committed to the holistic development of students. They actively mentor students in research projects, encouraging publication in reputed journals and participation in national and international conferences.",
        "Beyond academics, we foster a vibrant learning environment through technical workshops, seminars, and the 'Robotica' club. The department also emphasizes the importance of soft skills and professional ethics, ensuring that our graduates are well-rounded professionals ready to take on leadership roles in top-tier technology companies and public sector organizations.",
      ],
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvWA03NHsb7dweLdgPcEtyjmt1mlUHfbRu1g&s",
    },
    hodMessage: {
      name: "Dr.Sourav Chakraborty",
      message: [
        "Welcome you all in the glorifying Department of Electronics and Communication Engineering of Cooch Behar Government Engineering College. The department is located in a surrounding of awesome scenic beauty at the bank of Torsha River and enriched with state of the art facilities, smart class rooms, and highly qualified faculty and staff members. Though the department is comparatively a new entrant as it is a wing of a new Government Engineering College of West Bengal, still it works in line with the objective of addressing critical scientific and technological challenges of the Industries, Business Houses and Global Academia as a whole. The department promises with the dormant potential of its outstanding human and material resources to stand out in the crowd of many great contributors of the nation in the same fraternity.",
        "The department is empowered with highly skilled faculty and technical assistants along with more than 250 seat capacities of students in four years of the undergraduate course. The eminent group of faculty members is pursuing their post PhD research work in different fields like semiconductor devices, system on chip testing, robotics and soft computing, image analysis etc. The department apart from its undergraduate program has a future plan of offering a post graduate program once the college is promoted to a university. The department is equipped with smart classrooms where long distance in and out lecture programs could be carried out. To improve the quality of teaching-learning process the department is about to promote NPTEL web and video lecture resources available both to teacher and student community through Local Area Network and Wi-Fi Internet facilities",
        "The students are also very much enthusiastic and passionate about the development programs of the department. Apart from their academic performances they have shown interests in co-curricular activities like setting up a Robotica Club to explore the cutting edge technologies on Robotics. They do have a plan to organize a national level Tech-Feast every year to promote latest developments in the field of Electronics and Communication. We have a plan to organize national and International conferences, seminars and workshops every year to increase expertize in the field of all concerned. Some grooming programs of the students for increasing their employability are also to be exercised in near future.",
        "I, from the desk of Head of the Department, take the pride and opportunity to invite all the interested intelligentsia to be a part of the promotional noble venture of this department and thus enriching resources to fulfill our mission and vision.",
      ],
      image: "https://cgec.org.in/img/Faculty/sourav.png",
    },
    faculty: [
      {
        name: "Dr. Gautam Das",
        role: "Professor",
        experience: "17 years 6 months",
        qualification: "Ph.D in Engineering",
        specialization: "Digital electronic circuits, Microprocessor",
        image: "https://cgec.org.in/img/Faculty/gdsir.jpg",
        cvLink: "/data/ece/cv/gautam_das.pdf",
      },
      {
        name: "Mr. Soumik Sarkar",
        role: "Technical Assistant",
        experience: "5 years",
        qualification: "B.Tech from Jalpaiguri Government Engineering College",
        specialization: "Solid State Devices, Analog Electronics",
        image: "https://cgec.org.in/img/Faculty/Soumik_phto.jpg",
        cvLink: "/data/ece/cv/soumik_sarkar.pdf",
      },
      {
        name: "Mr. Avisek Nandi",
        role: "Technical Assistant",
        experience: "10 Years",
        qualification:
          "DIPLOMA IN ELECTRONICS & TELECOMMUNICATION ENGINEERING FROM KALNA GOVT POLYTECHNIC",
        specialization: "ELECRONICS SYSTEM IN POWER ELECTRONICS FIELD",
        image: "https://cgec.org.in/img/Faculty/ECE_Avshek.bmp",
        cvLink: "/data/ece/cv/avisek_nandi.pdf",
      },
      {
        name: "Dr. Palash Das",
        role: "Assistant Professor",
        experience: "Industry: 3 Research: 11 Teaching: 4",
        qualification: "Ph.D. (IIT Kharagpur) M.S. (IIT Kharagpur) B.Tech",
        specialization:
          "Gallium Nitride Compound Semiconductor based High Electron Mobility Transistor, HRXRD",
        image: "https://cgec.org.in/img/Faculty/ECEpalashDas.jpg",
        cvLink: "/data/ece/cv/palash_das.pdf",
      },
      {
        name: "Mr. Rajib Das",
        role: "Assistant Professor",
        experience: "Teaching: 6",
        qualification: "M.E.Tel.E, B. Tech",
        specialization: "Control Systems, Signal Processing",
        image: "https://cgec.org.in/img/Faculty/RAJIB%20Das.JPG",
        cvLink: "/data/ece/cv/rajib_das.pdf",
      },
      {
        name: "Dr. Sourav Chakraborty",
        role: "HOD & Assistant Professor",
        experience: "Teaching: 12",
        qualification: "Ph.D(Engg), M. Tech, B. Tech",
        specialization:
          "VLSI design, Signal Processing, Wireless system architecture design, Analog circuit design",
        image: "https://cgec.org.in/img/Faculty/sourav.png",
        cvLink: "/data/ece/cv/sourav_chakraborty.pdf",
      },
      {
        name: "Mr. Abhijit Sarma",
        role: "Technical Assistant",
        experience: "05 Years (As of 2024)",
        qualification:
          "Diploma in Electronics and Telecommunication Engineering",
        specialization: "-",
        image: "https://cgec.org.in/img/Faculty/abhijit_ece01082024.jpeg",
        cvLink: "/data/cv/sample_cv.pdf",
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
    syllabus: [
      {
        semester: "1st & 2nd Semester(New AICTE Syllabus)",
        pdfLink: "/data/ece/BTECH_all dept_1st year.pdf",
      },
      {
        semester: "3rd semester(New Syllabus)",
        pdfLink: "/data/ece/ECE_SEM3.pdf",
      },
      {
        semester: "4th semester(New Syllabus)",
        pdfLink: "/data/ece/ECE_SEM4.pdf",
      },
      {
        semester: "5th semester(New Syllabus)",
        pdfLink: "/data/ece/ECE_SEM5.pdf",
      },
      {
        semester: "6th semester(New Syllabus)",
        pdfLink: "/data/ece/ECE_SEM6.pdf",
      },
      {
        semester: "7th semester(New Syllabus)",
        pdfLink: "/data/ece/ECE_SEM7.pdf",
      },
      {
        semester: "8th semester(New Syllabus)",
        pdfLink: "/data/ece/ECE_SEM8.pdf",
      },
      {
        semester: "OLD Syllabus(2017-21 batch)",
        pdfLink: "/data/ece/ECE_OLD.pdf",
      },
    ],
    research: [
      {
        facultyName: "Dr. Sudip Kumar Adhikari",
        publications: [
          {
            title:
              "Conditional spatial fuzzy C-means clustering algorithm for segmentation of MRI images",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri",
            journal: "Applied soft computing 34, 758-769",
            year: "2015",
          },
          {
            title:
              "A spatial fuzzy c-means algorithm with application to mri image segmentation",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri",
            journal:
              "Advances in Pattern Recognition (ICAPR), 2015 Eighth International ..",
            year: "2015",
          },
          {
            title:
              "Segmentation of MRI brain images by incorporating intensity inhomogeneity and spatial information using probabilistic fuzzy c-means clustering algorithm",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri, PK Saha",
            journal:
              "Communications, Devices and Intelligent Systems (CODIS), 2012 International ...",
            year: "2012",
          },
          {
            title:
              "A modified fuzzy C-means algorithm using scale control spatial information for MRI image segmentation in the presence of noise",
            authors: "JK Sing, SK Adhikari, DK Basu",
            journal: "Journal of Chemometrics 29 (9), 492-505",
            year: "2015",
          },
          {
            title:
              "A nonparametric method for intensity inhomogeneity correction in MRI brain images by fusion of Gaussian surfaces",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri, PK Saha",
            journal: "Signal, Image and Video Processing 9 (8), 1945-1954",
            year: "2015",
          },
          {
            title:
              "Conditional Spatial Fuzzy C-means Clustering Algorithm with Application in MRI Image Segmentation",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri",
            journal:
              "Information Systems Design and Intelligent Applications, 539-547",
            year: "2015",
          },
          {
            title:
              "On estimation of bias field in MRI images: polynomial vs Gaussian surface fitting method",
            authors: "S Kahali, SK Adhikari, JK Sing",
            journal: "Journal of Chemometrics 30 (10), 602-620",
            year: "2016",
          },
          {
            title: "On estimation of bias field in MRI images",
            authors: "JK Sing, SK Adhikari, S Kahali",
            journal:
              "Computer Graphics, Vision and Information Security (CGVIS), 2015 IEEE ...",
            year: "2015",
          },
          {
            title:
              "Bias field estimation and segmentation of MRI images using a Spatial Fuzzy C-means algorithm",
            authors: "SK Adhikari, JK Sing, DK Basu",
            journal:
              "2016 2nd International Conference on Control, Instrumentation, Energy ...",
            year: "2016",
          },
        ],
      },
    ],
    wallMagazine: {
      name: "ElectroWaves",
      description:
        "'ElectroWaves' is a platform created for the students of the Electronics and Communication Engineering Department, Cooch Behar Government Engineering College (CGEC) to express unspoken words through their artwork. 'The Wall Magazine' showcases an elegant collection of literature and art made by the creative students of the ECE Department, CGEC. Student life is often considered to be pandemonium. While overcoming our hardships, we unknowingly imbibe beautiful hobbies and interests. The Wall Magazine admires surreal thoughts and unusual palettes. We encourage students to adore and display their creative and introspective sides.",
      images: [
        "https://cgec.org.in/img/wall_magazine/Wall_magazine_2021-22_web1.jpg",
        "https://cgec.org.in/img/wall_magazine/Wall_magazine_2021-22_web2.jpg",
      ],
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
        "The Mechanical Engineering Department aims to produce competent mechanical engineers who can contribute to the industrial growth of the nation. We focus on imparting sound technical knowledge and practical skills in core areas such as Thermal Engineering, Design, Manufacturing, and Robotics.",
        "Our workshops and laboratories are equipped with modern machinery and tools to provide hands-on training to students. From traditional machining to advanced CNC programming and CAD/CAM simulations, we ensure our students are industry-ready and capable of handling complex engineering challenges.",
        "The department encourages students to participate in various technical competitions and project exhibitions. Students are actively involved in designing innovative mechanical systems, including electric vehicles and automated machinery, under the guidance of expert faculty.",
        "We strive to create an environment that fosters innovation and creativity, empowering students to design and develop sustainable mechanical systems for the future. Our graduates are well-prepared for diverse careers in automotive, aerospace, energy, and manufacturing sectors, as well as for higher studies and research.",
      ],
      image:
        "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800&auto=format&fit=crop",
    },
    hodMessage: {
      name: "Prof. Prasenjit Das",
      message: [
        "Mechanical engineers develop state-of-the-art technologies and exhilarating solutions for the mankind. We attempt to provide our students with a cheerful, productive and satisfying experience of studies to explore the amazing world of mechanical engineering.",
        "Our objective is not merely to produce professionals capable to serve their own needs but endeavour to serve the society with great concern for human values. Our devoted faculties and staff render their utmost efforts to ensure that all our young students have a strong education with leadership, management and teaming skills, internship experience, and involvement in student activities. We feel proud to be a part of the department where our beloved students for their latest achievements in different cocurricular activities in versatile domain of sports and culture. We entrust that accentuating these areas will make our young students well-qualified to take leadership roles and team spirit in the future.",
        "With this, we welcome you all to Mechanical Engineering at the Department of Mechanical Engineering, Cooch Behar Government Engineering College.",
      ],
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
        cvLink: "/data/me/cv/sushovan_chatterjee.pdf",
      },
      {
        name: "Mr. Gyan Tshering Lepcha",
        role: "Assistant Professor",
        experience: "8 Years",
        qualification: "B.Tech(JGEC), MBA(NBU), MTech(JGEC)",
        specialization:
          "Production Engineering, Design, Automobile Engineering, Thermal Power Engineering",
        image: "https://cgec.org.in/img/Faculty/ME_GTL.jpg",
        cvLink: "/data/me/cv/gyan_tshering_lepcha.pdf",
      },
      {
        name: "Prof. Prasenjit Das",
        role: "HOD and Assistant Professor",
        experience: "05",
        qualification: "Master of Engineering In Mechanical Engineering",
        specialization: "Machine Design",
        image: "https://cgec.org.in/img/Faculty/ME_Prasenjit.jpg",
        cvLink: "/data/me/cv/prasenjit_das.pdf",
      },
      {
        name: "Mr. Provas Barua",
        role: "Technical Assistant",
        experience: "9 Years of Experience",
        qualification: "DIPLOMA MECHANICAL ENGINEERING",
        specialization: "Quality Control",
        image: "https://cgec.org.in/img/Faculty/ME_Provas.jpg",
        cvLink: "/data/cv/sample_cv.pdf",
      },
      {
        name: "Mr. Nikhilesh Das",
        role: "Technical Assistant",
        experience: "03 Years (As of 2024)",
        qualification: "Diploma in mechanical engineering",
        specialization: "-",
        image: "https://cgec.org.in/img/Faculty/nikhil_me01082024.jpeg",
        cvLink: "/data/cv/sample_cv.pdf",
      },
      {
        name: "Mr. Ziaul Rahaman",
        role: "Technical Assistant",
        experience: "03 Years (As of 2024)",
        qualification: "Diploma in Mechanical Engineering",
        specialization: "-",
        image: "https://cgec.org.in/img/Faculty/ziaul_me01082024.jpeg",
        cvLink: "/data/cv/sample_cv.pdf",
      },
      {
        name: "Mr. Sudipta Roy",
        role: "Assistant Professor",
        experience: "12 Years",
        qualification: "B.Tech(JGEC), MME(JU), PhD(JU) (Pursuing)",
        specialization: "Production Engineering, Composite",
        image: "https://cgec.org.in/img/Faculty/sudipta_roy.jpeg",
        cvLink: "/data/cv/sample_cv.pdf",
      },
      {
        name: "Dr. Masud Rana",
        role: "Assistant Professor",
        experience: "4 years",
        qualification: "M.E from IIEST Shibpur, Ph.D",
        specialization: "Machine Design, Biomechanics",
        image: "https://cgec.org.in/img/Faculty/Masud_me.jpeg",
        cvLink: "/data/cv/sample_cv.pdf",
      },
      {
        name: "Dr. Sanchayan Mukherjee",
        role: "Associate Professor",
        experience: "29 years 5 months",
        qualification:
          "B.M.E. (1st Class Hons., JU), M.E. (1st Class with Distinction, BITS Pilani), Ph.D. (Engineering, JU",
        specialization:
          "Heat Transfer, Refrigeration and Air-conditioning, Sediment Transport",
        image: "https://cgec.org.in/img/Faculty/SanchayanMukherjeeSir_me.jpg",
        cvLink: "/data/cv/sample_cv.pdf",
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
    syllabus: [
      {
        semester: "1st & 2nd Semester(New AICTE Syllabus)",
        pdfLink: "/data/me/BTECH_all dept_1st year.pdf",
      },
      {
        semester: "3rd semester(New Syllabus)",
        pdfLink: "/data/me/ME_SEM3.pdf",
      },
      {
        semester: "4th semester(New Syllabus)",
        pdfLink: "/data/me/ME_SEM4.pdf",
      },
      {
        semester: "5th semester(New Syllabus)",
        pdfLink: "/data/me/ME_SEM5.pdf",
      },
      {
        semester: "6th semester(New Syllabus)",
        pdfLink: "/data/me/ME_SEM6.pdf",
      },
      {
        semester: "7th semester(New Syllabus)",
        pdfLink: "/data/me/ME_SEM7.pdf",
      },
      {
        semester: "8th semester(New Syllabus)",
        pdfLink: "/data/me/ME_SEM8.pdf",
      },
      {
        semester: "OLD Syllabus(2017-21 batch)",
        pdfLink: "https://makautwb.ac.in/syllabus/ME_New_Syllabus_2018.pdf",
      },
    ],
    research: [
      {
        facultyName: "Dr. Sudip Kumar Adhikari",
        publications: [
          {
            title:
              "Conditional spatial fuzzy C-means clustering algorithm for segmentation of MRI images",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri",
            journal: "Applied soft computing 34, 758-769",
            year: "2015",
          },
          {
            title:
              "A spatial fuzzy c-means algorithm with application to mri image segmentation",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri",
            journal:
              "Advances in Pattern Recognition (ICAPR), 2015 Eighth International ..",
            year: "2015",
          },
          {
            title:
              "Segmentation of MRI brain images by incorporating intensity inhomogeneity and spatial information using probabilistic fuzzy c-means clustering algorithm",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri, PK Saha",
            journal:
              "Communications, Devices and Intelligent Systems (CODIS), 2012 International ...",
            year: "2012",
          },
          {
            title:
              "A modified fuzzy C-means algorithm using scale control spatial information for MRI image segmentation in the presence of noise",
            authors: "JK Sing, SK Adhikari, DK Basu",
            journal: "Journal of Chemometrics 29 (9), 492-505",
            year: "2015",
          },
          {
            title:
              "A nonparametric method for intensity inhomogeneity correction in MRI brain images by fusion of Gaussian surfaces",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri, PK Saha",
            journal: "Signal, Image and Video Processing 9 (8), 1945-1954",
            year: "2015",
          },
          {
            title:
              "Conditional Spatial Fuzzy C-means Clustering Algorithm with Application in MRI Image Segmentation",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri",
            journal:
              "Information Systems Design and Intelligent Applications, 539-547",
            year: "2015",
          },
          {
            title:
              "On estimation of bias field in MRI images: polynomial vs Gaussian surface fitting method",
            authors: "S Kahali, SK Adhikari, JK Sing",
            journal: "Journal of Chemometrics 30 (10), 602-620",
            year: "2016",
          },
          {
            title: "On estimation of bias field in MRI images",
            authors: "JK Sing, SK Adhikari, S Kahali",
            journal:
              "Computer Graphics, Vision and Information Security (CGVIS), 2015 IEEE ...",
            year: "2015",
          },
          {
            title:
              "Bias field estimation and segmentation of MRI images using a Spatial Fuzzy C-means algorithm",
            authors: "SK Adhikari, JK Sing, DK Basu",
            journal:
              "2016 2nd International Conference on Control, Instrumentation, Energy ...",
            year: "2016",
          },
        ],
      },
    ],
    wallMagazine: {
      name: "Mechanix",
      description:
        "'Mechanix' is a platform created for the students of the Mechanical Engineering Department, Cooch Behar Government Engineering College (CGEC) to express unspoken words through their artwork. 'The Wall Magazine' showcases an elegant collection of literature and art made by the creative students of the ME Department, CGEC. Student life is often considered to be pandemonium. While overcoming our hardships, we unknowingly imbibe beautiful hobbies and interests. The Wall Magazine admires surreal thoughts and unusual palettes. We encourage students to adore and display their creative and introspective sides.",
      images: [
        "https://cgec.org.in/img/wall_magazine/Wall_magazine_2021-22_web1.jpg",
        "https://cgec.org.in/img/wall_magazine/Wall_magazine_2021-22_web2.jpg",
      ],
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
        "The Electrical Engineering Department is one of the core departments of the college. We aim to provide a strong foundation in electrical engineering principles and applications, preparing students to solve complex problems in the power and energy sectors.",
        "Our curriculum covers a wide range of topics including Power Systems, Control Systems, Electrical Machines, and Power Electronics. We continuously update our syllabus to include emerging trends like Smart Grids, Renewable Energy Systems, and Electric Vehicle Technology.",
        "We emphasize practical learning through our well-equipped laboratories, where students gain hands-on experience with modern equipment and simulation tools. This practical exposure is complemented by industrial visits and internships that provide real-world insights.",
        "The department is committed to promoting research and development in emerging areas of electrical engineering, encouraging students to contribute to technological advancements. Our alumni have successfully secured positions in prestigious PSUs, core electrical industries, and research organizations worldwide.",
      ],
      image:
        "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=1000&auto=format&fit=crop",
    },
    hodMessage: {
      name: "Prof. Atanu Maji",
      message: [
        "Welcome to the Department of Electrical Engineering of Cooch Behar Government Engineering College. The department is continuously making efforts to impart cutting edge knowledge. The department is running Under Graduate programs.",
        "Our UG program has always been known to be one of the best in the institution. The department developing state of art laboratories, such as Electric Circuit Theory Laboratory, Electrical Machines Laboratory-I, Electrical &Electronics Measurement Laboratory, Electrical Machines Laboratory-II, Power System Laboratory, Control Systems Laboratory, Simulation Laboratory, Power Electronics Laboratory, & Electric Drives Laboratory and most of the labs are equipped with modern instruments.",
        "Faculty member and Technical stuff of our department are always involved in cutting edge research apart from passionate teaching. We are proud to have an exceptionally dedicated, motivated & experienced faculty and Technical Stuff as our Electrical Engineering family members. We constantly look or bright enthusiastic students who have passion to participate in all our activities & promote them to the level of leaders.",
        "Finally, our department has a long valued tradition of striving for excellence in whatever we do. I hope we will be able to maintain this in future too.",
      ],
      image: "https://cgec.org.in/img/Faculty/EE_Atanu.jpg",
    },
    faculty: [
      {
        name: "Mr. Sk Rabiul Hossain",
        role: "OIC & Assistant Professor",
        experience: "3 YEARS",
        qualification: "B.Tech.,M.Tech.",
        specialization: "Power Electronics & Drives",
        image: "https://cgec.org.in/img/Faculty/Rabiul.jpg",
        cvLink: "/data/ee/cv/rabiul_hossain.pdf",
      },
      {
        name: "Prof. Atanu Maji",
        role: "HOD & Assistant Professor",
        experience: "11 Years",
        qualification: "B.Tech., M.E.",
        specialization: "Power System",
        image: "https://cgec.org.in/img/Faculty/EE_Atanu.jpg",
        cvLink: "/data/ee/cv/atanu_maji.pdf",
      },
      {
        name: "Mr. Tanumay Halder",
        role: "Assistant Professor",
        experience: "7 Years",
        qualification: "B.Tech., M.E.",
        specialization: "ILLUMINATION ENGINEERING",
        image: "https://cgec.org.in/img/Faculty/EE_Tanumoy.jpg",
        cvLink: "/data/ee/cv/tanumay_halder.pdf",
      },
      {
        name: "Mr. Sujay Sarkar",
        role: "Technical Assistant",
        experience: "9 years teaching and 5 years industry",
        qualification: "Diploma in Electrical Engineering",
        specialization: "-",
        image:
          "https://ui-avatars.com/api/?name=Sujay+Sarkar&background=random",
        cvLink: "/data/cv/sample_cv.pdf",
      },
      {
        name: "Mr. Deepjyoti Santra",
        role: "Associate Professor",
        experience: "7 years",
        qualification: "M.TECH",
        specialization: "ELECTRICAL MACHINE",
        image: "https://cgec.org.in/img/Faculty/DeepjyotiSantra_ee.jpeg",
        cvLink: "/data/cv/sample_cv.pdf",
      },
      {
        name: "Dr. Goutam Kumar Panda",
        role: "Professor",
        experience: "Teaching 31years , industrial 2years",
        qualification: "B.E.( Electrical), M.E.E, Ph.D",
        specialization: "Electrical Machines and Drives",
        image: "https://cgec.org.in/img/Faculty/GoutamPandaSir_ee.jpg",
        cvLink: "/data/cv/sample_cv.pdf",
      },
      {
        name: "	Mr. Sk Mafizul Islam",
        role: "Associate Professor",
        experience: "26 Years",
        qualification: "B. E. (Electrical Engg), M. Tech(Electrical Engg)",
        specialization: "Power System",
        image: "https://cgec.org.in/img/Faculty/Prof._Mafizul_Islam_ee.jpg",
        cvLink: "/data/cv/sample_cv.pdf",
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
    syllabus: [
      {
        semester: "1st & 2nd Semester(New AICTE Syllabus)",
        pdfLink: "/data/ee/BTECH_all dept_1st year.pdf",
      },
      {
        semester: "3rd semester(New Syllabus)",
        pdfLink: "/data/ee/EE_SEM3.pdf",
      },
      {
        semester: "4th semester(New Syllabus)",
        pdfLink: "/data/ee/EE_SEM4.pdf",
      },
      {
        semester: "5th semester(New Syllabus)",
        pdfLink: "/data/ee/EE_SEM5.pdf",
      },
      {
        semester: "6th semester(New Syllabus)",
        pdfLink: "/data/ee/EE_SEM6.pdf",
      },
      {
        semester: "7th semester(New Syllabus)",
        pdfLink: "/data/ee/EE_SEM7.pdf",
      },
      {
        semester: "8th semester(New Syllabus)",
        pdfLink: "/data/ee/EE_SEM8.pdf",
      },
      {
        semester: "OLD Syllabus(2017-21 batch)",
        pdfLink: "/data/ee/EE_OLD.pdf",
      },
    ],
    research: [
      {
        facultyName: "Dr. Sudip Kumar Adhikari",
        publications: [
          {
            title:
              "Conditional spatial fuzzy C-means clustering algorithm for segmentation of MRI images",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri",
            journal: "Applied soft computing 34, 758-769",
            year: "2015",
          },
          {
            title:
              "A spatial fuzzy c-means algorithm with application to mri image segmentation",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri",
            journal:
              "Advances in Pattern Recognition (ICAPR), 2015 Eighth International ..",
            year: "2015",
          },
          {
            title:
              "Segmentation of MRI brain images by incorporating intensity inhomogeneity and spatial information using probabilistic fuzzy c-means clustering algorithm",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri, PK Saha",
            journal:
              "Communications, Devices and Intelligent Systems (CODIS), 2012 International ...",
            year: "2012",
          },
          {
            title:
              "A modified fuzzy C-means algorithm using scale control spatial information for MRI image segmentation in the presence of noise",
            authors: "JK Sing, SK Adhikari, DK Basu",
            journal: "Journal of Chemometrics 29 (9), 492-505",
            year: "2015",
          },
          {
            title:
              "A nonparametric method for intensity inhomogeneity correction in MRI brain images by fusion of Gaussian surfaces",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri, PK Saha",
            journal: "Signal, Image and Video Processing 9 (8), 1945-1954",
            year: "2015",
          },
          {
            title:
              "Conditional Spatial Fuzzy C-means Clustering Algorithm with Application in MRI Image Segmentation",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri",
            journal:
              "Information Systems Design and Intelligent Applications, 539-547",
            year: "2015",
          },
          {
            title:
              "On estimation of bias field in MRI images: polynomial vs Gaussian surface fitting method",
            authors: "S Kahali, SK Adhikari, JK Sing",
            journal: "Journal of Chemometrics 30 (10), 602-620",
            year: "2016",
          },
          {
            title: "On estimation of bias field in MRI images",
            authors: "JK Sing, SK Adhikari, S Kahali",
            journal:
              "Computer Graphics, Vision and Information Security (CGVIS), 2015 IEEE ...",
            year: "2015",
          },
          {
            title:
              "Bias field estimation and segmentation of MRI images using a Spatial Fuzzy C-means algorithm",
            authors: "SK Adhikari, JK Sing, DK Basu",
            journal:
              "2016 2nd International Conference on Control, Instrumentation, Energy ...",
            year: "2016",
          },
        ],
      },
    ],
    wallMagazine: {
      name: "Electra",
      description:
        "'Electra' is a platform created for the students of the Electrical Engineering Department, Cooch Behar Government Engineering College (CGEC) to express unspoken words through their artwork. 'The Wall Magazine' showcases an elegant collection of literature and art made by the creative students of the EE Department, CGEC. Student life is often considered to be pandemonium. While overcoming our hardships, we unknowingly imbibe beautiful hobbies and interests. The Wall Magazine admires surreal thoughts and unusual palettes. We encourage students to adore and display their creative and introspective sides.",
      images: [
        "https://cgec.org.in/img/wall_magazine/Wall_magazine_2021-22_web1.jpg",
        "https://cgec.org.in/img/wall_magazine/Wall_magazine_2021-22_web2.jpg",
      ],
    },
  },
  ce: {
    id: "ce",
    name: "Civil Engineering",
    shortName: "CE",
    image:
      "https://www.msruas.ac.in/uploads/blogs/btech-in-civil-engineering-your-pathway-to-monumental-success.webp",
    home: {
      paragraphs: [
        "The Civil Engineering Department is committed to producing skilled civil engineers who can contribute to infrastructure development. We focus on both theoretical and practical aspects of civil engineering, covering disciplines such as Structural Engineering, Geotechnical Engineering, Transportation, and Environmental Engineering.",
        "Our labs are equipped with the latest testing equipment for materials, soil, and structures, allowing students to conduct rigorous experiments and analysis. We also emphasize field expertise through survey camps and site visits, which are integral parts of our curriculum.",
        "We encourage students to take up projects that address real-world challenges, such as sustainable construction practices, disaster mitigation, and smart city development. Our faculty members actively involve students in consultancy projects, providing them with valuable industry exposure.",
        "Our goal is to mold socially responsible civil engineers who can design and execute infrastructure projects that are safe, sustainable, and beneficial to society. We strive to instill a sense of professional ethics and environmental stewardship in our graduates.",
      ],
      image:
        "https://images.unsplash.com/photo-1590579491624-f98f36d4c763?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    hodMessage: {
      name: "Prof. Biren Gurung",
      message: [
        "Welcome you all in the department of Civil Engineering bearing the social responsibility of paramount importance. As Civil Engineering being one of the core and most fundamental engineering branches which is fully dedicated to the teaching-learning philosophy of the Foundation. We take it as our moral and social responsibility to imbibe the state of the art technological information to be forwarded to the students of Civil Engineering. In the modern world of construction we witness every day as a day of new construction method, material and skill due to the continuous developments and technological advancements in the field. Therefore a bridge must be put in place in proper manner to fill the gap between learning and implementation. A highly qualified and experienced group of faculty members in this department are on their toes to accomplish the need of the department and society at large.",
        "I, from the desk of HOD of Civil Engineering take this opportunity to invite the best talent to fulfill our mission and vision at the outset.",
      ],
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
        cvLink: "/data/ce/cv/biren_gurung.pdf",
      },
      {
        name: "Dr. Kingshuk Dan",
        role: "Assistant Professor",
        experience: "8 Years",
        qualification: "B.E., M.E., Ph.D",
        specialization:
          "Soil mechanics, Highway and Transportation engineering",
        image: "https://cgec.org.in/img/Faculty/Kingshuk%20Dan.jpg",
        cvLink: "/data/ce/cv/kingshuk_dan.pdf",
      },
      {
        name: "Mr. Md Asif Sk",
        role: "Assistant Professor",
        experience: "4 years",
        qualification: "B.Tech, M.E.",
        specialization: "Water Resources Engineering, Hydraulic Structures",
        image: "https://cgec.org.in/img/Faculty/asif.jpg",
        cvLink: "/data/cv/sample_cv.pdf",
      },
      {
        name: "Mr. Shyamal Ghosh",
        role: "Assistant Professor",
        experience: "Teaching : 1 year, Research: 3 years",
        qualification:
          "Ph D, M. E (Structural Engineering) BESU, B.Tech. (Civil Engineering) JGEC",
        specialization:
          "Structural Dynamics and Earthquake Engineering, Reliability Analysis, Structural Engineering, Finite Element Analysis",
        image: "https://cgec.org.in/img/Faculty/shyamalSir_ce.jpeg",
        cvLink: "/data/ce/cv/shyamal_ghosh.pdf",
      },
      {
        name: "Mr. Ansarul Seikh",
        role: "Technical Assistant",
        experience: "03 Years (As of 2024)",
        qualification: "Diploma in Civil Engineering Department",
        specialization: "-",
        image: "https://cgec.org.in/img/Faculty/ansarul_ce01082024.jpg",
        cvLink: "/data/cv/sample_cv.pdf",
      },
      {
        name: "Mr. Chhandamay Ray",
        role: "Assistant Professor",
        experience: "5 years",
        qualification: "M. Tech",
        specialization: "Soil Mechanics & Foundation Engineering",
        image: "https://cgec.org.in/img/Faculty/ChhandamayRay_ce.jpg",
        cvLink: "/data/cv/sample_cv.pdf",
      },
      {
        name: "Mr. Mithun Mandal",
        role: "Assistant Professor",
        experience: "5 years",
        qualification: "M.Tech",
        specialization: "Geotechnical Engineering",
        image: "https://cgec.org.in/img/Faculty/MithunMandal_ce.jpg",
        cvLink: "/data/cv/sample_cv.pdf",
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
    syllabus: [
      {
        semester: "1st & 2nd Semester(New AICTE Syllabus)",
        pdfLink: "/data/ce/BTECH_all dept_1st year.pdf",
      },
      {
        semester: "3rd semester(New Syllabus)",
        pdfLink: "/data/ce/CE_SEM3.pdf",
      },
      {
        semester: "4th semester(New Syllabus)",
        pdfLink: "/data/ce/CE_SEM4.pdf",
      },
      {
        semester: "5th semester(New Syllabus)",
        pdfLink: "/data/ce/CE_SEM5.pdf",
      },
      {
        semester: "6th semester(New Syllabus)",
        pdfLink: "/data/ce/CE_SEM6.pdf",
      },
      {
        semester: "7th semester(New Syllabus)",
        pdfLink: "/data/ce/CE_SEM7.pdf",
      },
      {
        semester: "8th semester(New Syllabus)",
        pdfLink: "/data/ce/CE_SEM8.pdf",
      },
      {
        semester: "OLD Syllabus(2017-21 batch)",
        pdfLink: "/data/ce/CE_OLD.pdf",
      },
    ],
    research: [
      {
        facultyName: "Dr. Sudip Kumar Adhikari",
        publications: [
          {
            title:
              "Conditional spatial fuzzy C-means clustering algorithm for segmentation of MRI images",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri",
            journal: "Applied soft computing 34, 758-769",
            year: "2015",
          },
          {
            title:
              "A spatial fuzzy c-means algorithm with application to mri image segmentation",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri",
            journal:
              "Advances in Pattern Recognition (ICAPR), 2015 Eighth International ..",
            year: "2015",
          },
          {
            title:
              "Segmentation of MRI brain images by incorporating intensity inhomogeneity and spatial information using probabilistic fuzzy c-means clustering algorithm",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri, PK Saha",
            journal:
              "Communications, Devices and Intelligent Systems (CODIS), 2012 International ...",
            year: "2012",
          },
          {
            title:
              "A modified fuzzy C-means algorithm using scale control spatial information for MRI image segmentation in the presence of noise",
            authors: "JK Sing, SK Adhikari, DK Basu",
            journal: "Journal of Chemometrics 29 (9), 492-505",
            year: "2015",
          },
          {
            title:
              "A nonparametric method for intensity inhomogeneity correction in MRI brain images by fusion of Gaussian surfaces",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri, PK Saha",
            journal: "Signal, Image and Video Processing 9 (8), 1945-1954",
            year: "2015",
          },
          {
            title:
              "Conditional Spatial Fuzzy C-means Clustering Algorithm with Application in MRI Image Segmentation",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri",
            journal:
              "Information Systems Design and Intelligent Applications, 539-547",
            year: "2015",
          },
          {
            title:
              "On estimation of bias field in MRI images: polynomial vs Gaussian surface fitting method",
            authors: "S Kahali, SK Adhikari, JK Sing",
            journal: "Journal of Chemometrics 30 (10), 602-620",
            year: "2016",
          },
          {
            title: "On estimation of bias field in MRI images",
            authors: "JK Sing, SK Adhikari, S Kahali",
            journal:
              "Computer Graphics, Vision and Information Security (CGVIS), 2015 IEEE ...",
            year: "2015",
          },
          {
            title:
              "Bias field estimation and segmentation of MRI images using a Spatial Fuzzy C-means algorithm",
            authors: "SK Adhikari, JK Sing, DK Basu",
            journal:
              "2016 2nd International Conference on Control, Instrumentation, Energy ...",
            year: "2016",
          },
        ],
      },
    ],
    wallMagazine: {
      name: "Construct",
      description:
        "'Construct' is a platform created for the students of the Civil Engineering Department, Cooch Behar Government Engineering College (CGEC) to express unspoken words through their artwork. 'The Wall Magazine' showcases an elegant collection of literature and art made by the creative students of the CE Department, CGEC. Student life is often considered to be pandemonium. While overcoming our hardships, we unknowingly imbibe beautiful hobbies and interests. The Wall Magazine admires surreal thoughts and unusual palettes. We encourage students to adore and display their creative and introspective sides.",
      images: [
        "https://cgec.org.in/img/wall_magazine/Wall_magazine_2021-22_web1.jpg",
        "https://cgec.org.in/img/wall_magazine/Wall_magazine_2021-22_web2.jpg",
      ],
    },
  },
  bsh: {
    id: "bsh",
    name: "Basic Science & Humanities",
    shortName: "BSH",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    home: {
      paragraphs: [
        "The Department of Basic Science & Humanities plays a pivotal role in laying the foundation for engineering education. It comprises Physics, Chemistry, Mathematics, and Humanities, fostering an interdisciplinary approach that connects fundamental scientific principles with engineering applications.",
        "The department aims to provide a strong conceptual basis in fundamental sciences which is essential for understanding engineering principles. Through rigorous coursework and laboratory sessions, we nurture the analytical and problem-solving skills of our students, preparing them for the complex challenges of core engineering disciplines.",
        "We also focus on enhancing the communication skills and soft skills of students to prepare them for the corporate world. Our Humanities section offers training in professional ethics, organizational behavior, and effective communication, ensuring that students develop into confident and articulate professionals.",
        "The Basic Science & Humanities department is committed to providing a holistic education that prepares students for success in their future careers. We encourage scientific inquiry and cultural activities, helping students develop a well-rounded personality that balances academic excellence with social responsibility.",
      ],
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    hodMessage: {
      name: "Prof. Madhuchandra Bhaduri",
      message: [
        "It gives me immense pleasure to present brief report of Department of Basic Science & Humanities. Since, the Basic Science & Humanities subjects are the foundation subjects for all the branches of engineering and technology, Department of Basic Science & Humanities imparts to build a firm base as part of the Engineering Education. The BS & H department plays a vital role in teaching basic sciences courses as prescribed by the curriculum of the Maulana Abul Kalam Azad University of Technology B.Tech program.",
        "The Department enhances knowledge in subjects like Engineering Mathematics, Engineering Physics, Engineering Chemistry, Communication skill, Engineering Economics etc. Well educated, talented and dedicated Faculty and Staff Members are the backbone of this department.",
        "The teaching module comprises of lectures, tutorials and practicals along with various other initiatives. Faculty members perform the role of a perfect facilitator as Mentor to each section. The methodology adopted in the classroom teaching is based on the application of innovation strategies, comprehensive lectures, regular assignments and active interaction between teachers and students. The purpose of inducing the subjects of Basic Science & Humanities in Engineering study is to lay a solid foundation of basic concepts for innovative future with limitless opportunities. Therefore, the department acts as an active catalyst to develop perfect approach to unlock their hidden talent, personality and communication skills to fulfill the needs of young engineers.",
      ],
      image: "https://cgec.org.in/img/Faculty/MADHUCHANDRA%20BHADURI%20.jpg",
    },
    faculty: [
      {
        name: "Mr. Mohammad Salim",
        role: "Assistant Professor of Mathematics & Registrar-In-Charge",
        experience: "11 Years (As of 2024)",
        qualification: "M. Sc in Mathematics from IIT Bombay",
        specialization: "Complex Analysis, Topology",
        image: "https://cgec.org.in/img/Faculty/Md_salim.jpg",
        cvLink: "/data/bsh/cv/mohammad_salim.pdf",
      },
      {
        name: "Ms. Madhuchandra Bhaduri",
        role: "Assistant Professor in Economics",
        experience: "7 Years",
        qualification: "M.A., M.PHIL(Economics)",
        specialization: "International Trade, Agricultural Economics",
        image: "https://cgec.org.in/img/Faculty/MADHUCHANDRA%20BHADURI%20.jpg",
        cvLink: "/data/bsh/cv/madhuchandra_bhaduri.pdf",
      },
      {
        name: "Mr. Soumik Roy",
        role: "Assistant Professor in Mathematics",
        experience: "5 Years",
        qualification: "B.Sc Hons Mathematics, M.Sc Applied Mathematics",
        specialization: "Operation Research",
        image: "https://cgec.org.in/img/Faculty/Soumik_Roy.jpeg",
        cvLink: "/data/bsh/cv/soumik_roy.pdf",
      },
      {
        name: "Dr. Madhumita Dhar",
        role: "Assistant Professor in Physics",
        experience: "6 Years",
        qualification: "PhD",
        specialization: "Nuclear Physics",
        image: "https://cgec.org.in/img/Faculty/MDhar.jpg",
        cvLink: "/data/bsh/cv/madhumita_dhar.pdf",
      },
      {
        name: "Dr. Samik Nag",
        role: "Assistant Professor in Chemistry (WBES)",
        experience: "12 years",
        qualification: "MSc, PhD (IACS)",
        specialization: "Inorganic Chemistry",
        image: "https://cgec.org.in/img/Faculty/CHE_Samik_Nag.jpg",
        cvLink: "/data/bsh/cv/samik_nag.pdf",
      },
      {
        name: "Mr. Arghya Chakraborty",
        role: "Assistant Professor of English",
        experience: "6 years",
        qualification: "M.A. in ENGLISH, UGC - NET",
        specialization: "N.A.",
        image: "https://cgec.org.in/img/Faculty/Arghya_Sir.jpg",
        cvLink: "/data/bsh/cv/arghya_chakraborty.pdf",
      },
      {
        name: "Dr. Tanmay Choudhury",
        role: "Assistant Professor in Mathematics",
        experience: "4 years",
        qualification: "B.Sc. (H), M.Sc., Ph.D.",
        specialization: "Cryptography",
        image: "https://cgec.org.in/img/Faculty/Tanmay_bs.jpeg",
        cvLink: "/data/bsh/cv/tanmay_choudhury.pdf",
      },
      {
        name: "Dr. Biplab Maity",
        role: "Assistant Professor in Mathematics",
        experience: "11 years",
        qualification: "Ph.D",
        specialization: "Plasma Physics",
        image: "https://cgec.org.in/img/Faculty/BiplabMaity_bsh.jpg",
        cvLink: "/data/cv/sample_cv.pdf",
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
    syllabus: [
      {
        semester: "1st & 2nd Semester(New AICTE Syllabus)",
        pdfLink: "/data/bsh/BTECH_all dept_1st year.pdf",
      },
    ],
    research: [
      {
        facultyName: "Dr. Sudip Kumar Adhikari",
        publications: [
          {
            title:
              "Conditional spatial fuzzy C-means clustering algorithm for segmentation of MRI images",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri",
            journal: "Applied soft computing 34, 758-769",
            year: "2015",
          },
          {
            title:
              "A spatial fuzzy c-means algorithm with application to mri image segmentation",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri",
            journal:
              "Advances in Pattern Recognition (ICAPR), 2015 Eighth International ..",
            year: "2015",
          },
          {
            title:
              "Segmentation of MRI brain images by incorporating intensity inhomogeneity and spatial information using probabilistic fuzzy c-means clustering algorithm",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri, PK Saha",
            journal:
              "Communications, Devices and Intelligent Systems (CODIS), 2012 International ...",
            year: "2012",
          },
          {
            title:
              "A modified fuzzy C-means algorithm using scale control spatial information for MRI image segmentation in the presence of noise",
            authors: "JK Sing, SK Adhikari, DK Basu",
            journal: "Journal of Chemometrics 29 (9), 492-505",
            year: "2015",
          },
          {
            title:
              "A nonparametric method for intensity inhomogeneity correction in MRI brain images by fusion of Gaussian surfaces",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri, PK Saha",
            journal: "Signal, Image and Video Processing 9 (8), 1945-1954",
            year: "2015",
          },
          {
            title:
              "Conditional Spatial Fuzzy C-means Clustering Algorithm with Application in MRI Image Segmentation",
            authors: "SK Adhikari, JK Sing, DK Basu, M Nasipuri",
            journal:
              "Information Systems Design and Intelligent Applications, 539-547",
            year: "2015",
          },
          {
            title:
              "On estimation of bias field in MRI images: polynomial vs Gaussian surface fitting method",
            authors: "S Kahali, SK Adhikari, JK Sing",
            journal: "Journal of Chemometrics 30 (10), 602-620",
            year: "2016",
          },
          {
            title: "On estimation of bias field in MRI images",
            authors: "JK Sing, SK Adhikari, S Kahali",
            journal:
              "Computer Graphics, Vision and Information Security (CGVIS), 2015 IEEE ...",
            year: "2015",
          },
          {
            title:
              "Bias field estimation and segmentation of MRI images using a Spatial Fuzzy C-means algorithm",
            authors: "SK Adhikari, JK Sing, DK Basu",
            journal:
              "2016 2nd International Conference on Control, Instrumentation, Energy ...",
            year: "2016",
          },
        ],
      },
    ],
    wallMagazine: {
      name: "Spectrum",
      description:
        "'Spectrum' is a platform created for the students of the Basic Science and Humanities Department, Cooch Behar Government Engineering College (CGEC) to express unspoken words through their artwork. 'The Wall Magazine' showcases an elegant collection of literature and art made by the creative students of the BSH Department, CGEC. Student life is often considered to be pandemonium. While overcoming our hardships, we unknowingly imbibe beautiful hobbies and interests. The Wall Magazine admires surreal thoughts and unusual palettes. We encourage students to adore and display their creative and introspective sides.",
      images: [
        "https://cgec.org.in/img/wall_magazine/Wall_magazine_2021-22_web1.jpg",
        "https://cgec.org.in/img/wall_magazine/Wall_magazine_2021-22_web2.jpg",
      ],
    },
  },
};
