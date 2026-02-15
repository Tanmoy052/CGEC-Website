export const COLLEGE_NAME = "Cooch Behar Government Engineering College";
export const COLLEGE_SHORT_NAME = "CGEC";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "ACADEMIC",
    href: "/academics",
    children: [
      { label: "Computer Science & Engineering", href: "/academics/cse" },
      {
        label: "Electronics & Communication Engineering",
        href: "/academics/ece",
      },
      { label: "Electrical Engineering", href: "/academics/ee" },
      { label: "Mechanical Engineering", href: "/academics/me" },
      { label: "Civil Engineering", href: "/academics/ce" },
      { label: "Basic Science & Humanities", href: "/academics/bsh" },
    ],
  },
  {
    label: "ADMISSION",
    href: "/admission",
    children: [
      { label: "Admission 2025", href: "/admission/2025" },
      { label: "Fees Structure", href: "/admission/fees" },
    ],
  },
  {
    label: "COMMITTEE",
    href: "/committee",
    children: [
      { label: "Academic Committee", href: "/committee/academic" },
      { label: "Anti-ragging Committee", href: "/committee/anti-ragging" },
      { label: "Internal Complaint Committee", href: "/committee/icc" },
      { label: "Anti-ragging Squard", href: "/committee/anti-ragging-squard" },
      { label: "Committee for SC & ST", href: "/committee/sc-st" },
      { label: "Grievance Redressal Committee (GRC)", href: "/committee/grc" },
      { label: "Institute Industry Cell", href: "/committee/iic" },
      {
        label: "Internal Quality Assurance Cell(IQAC)",
        href: "/committee/iqac",
      },
      {
        label: "Student Grievance Redressal Committee",
        href: "/committee/student-grc",
      },
      { label: "Student Counsellor", href: "/committee/counsellor" },
    ],
  },
  { label: "Library", href: "https://www.cgeclibrary.org.in/" },
  { label: "Placement", href: "/placement" },
  { label: "Notices", href: "/notices" },
  { label: "Contact", href: "/contact" },
];

export const COLORS = {
  primary: "#1e3a8a", // Blue 900
  secondary: "#1d4ed8", // Blue 700
  accent: "#f59e0b", // Amber 500
};
