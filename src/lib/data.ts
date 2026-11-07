/**
 * Single source of truth for all site content.
 * Every value below comes from public/resume.pdf — nothing is invented.
 * Fields the résumé does not contain (GitHub, repo links, achievements…) are
 * `null` / absent, and the UI hides whatever depends on them.
 */

export const PROFILE = {
  name: "Mohamed Elgendy",
  firstName: "Mohamed",
  initials: "ME",
  role: "Frontend Developer",
  email: "moelgendy2210@gmail.com",
  phone: "(+20)1060819188",
  phoneHref: "https://wa.me/201060819188",
  location: "Cairo, Egypt",
  military: "Completed",
  resumeSummary:
    "MIS graduate (Excellent) and Frontend Developer with professional training through ITI, DEPI, and NTI. Skilled in building responsive, user-focused web applications using HTML5, CSS3, JavaScript, React, Tailwind CSS, and REST APIs. Brings 5+ years of experience in customer service, administrative operations, and cash handling, combining technical skills with strong communication, teamwork, and problem-solving abilities.",
  extraLine:
    "Led the graduation project, an Accounting Educational Website, as Team Leader.",
  quote:
    "Technical training paired with five-plus years of customer-facing and administrative work.",
  github: null as string | null,
  linkedin: "https://www.linkedin.com/in/mohamed-elgendy",
  resume: "/resume.pdf",
  graduated: "2024",
  degree: "Bachelor of Management Information Systems (MIS)",
  school: "Higher Institute of Computers, Tanta",
  grade: "Excellent",
  currentRole: "Administrative Data Entry, Anvel Security Egypt",
  languages: ["Arabic (Native)", "English (Good Working Proficiency)"],
  softSkills: ["Communication", "Teamwork", "Problem Solving", "Adaptability", "Fast Learning"],
};

export type NavItem = { id: string; label: string };

/** Only sections that have data. Order = page order. */
export const NAV: NavItem[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "certifications", label: "Certifications" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export type SkillFamily = "Frontend" | "Web Development" | "Tools" | "Additional";

export type Skill = {
  name: string;
  family: SkillFamily;
  /** key into the TechLogo BRAND / CONCEPT maps */
  logo: string;
  symbol: string;
};

export const SKILL_FAMILIES: SkillFamily[] = ["Frontend", "Web Development", "Tools", "Additional"];

export const SKILL_GROUPS: Record<SkillFamily, Skill[]> = {
  Frontend: [
    { name: "HTML5", family: "Frontend", logo: "html5", symbol: "H5" },
    { name: "CSS3", family: "Frontend", logo: "css3", symbol: "C3" },
    { name: "JavaScript (ES6+)", family: "Frontend", logo: "javascript", symbol: "Js" },
    { name: "React", family: "Frontend", logo: "react", symbol: "Re" },
    { name: "Tailwind CSS", family: "Frontend", logo: "tailwind", symbol: "Tw" },
    { name: "Bootstrap", family: "Frontend", logo: "bootstrap", symbol: "Bs" },
  ],
  "Web Development": [
    { name: "Responsive Design", family: "Web Development", logo: "responsive", symbol: "Rd" },
    { name: "REST APIs", family: "Web Development", logo: "rest", symbol: "Rs" },
    { name: "React Router", family: "Web Development", logo: "router", symbol: "Rr" },
    { name: "Context API", family: "Web Development", logo: "context", symbol: "Cx" },
    { name: "LocalStorage", family: "Web Development", logo: "storage", symbol: "Ls" },
  ],
  Tools: [
    { name: "Git", family: "Tools", logo: "git", symbol: "Gi" },
    { name: "GitHub", family: "Tools", logo: "github", symbol: "Gh" },
    { name: "Vite", family: "Tools", logo: "vite", symbol: "Vi" },
    { name: "VS Code", family: "Tools", logo: "vscode", symbol: "Vs" },
  ],
  Additional: [
    { name: "Arabic RTL Development", family: "Additional", logo: "rtl", symbol: "Ar" },
    { name: "Form Validation", family: "Additional", logo: "form", symbol: "Fv" },
    { name: "SEO / Open Graph", family: "Additional", logo: "seo", symbol: "Se" },
    { name: "API Integration", family: "Additional", logo: "api", symbol: "Ap" },
  ],
};

export type Project = {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[];
  /** keys into TechLogo for the tiny chips (only techs the résumé lists) */
  techLogos: string[];
  github: string | null;
  /** Placeholder link — replace with the real live demo URL. */
  demo: string | null;
  /** Project screenshot in /public/projects (4:5 crop). */
  image: string;
};

export const PROJECTS: Project[] = [
  {
    id: "vortex-store",
    index: "01",
    title: "VORTEX Store",
    kicker: "React SPA",
    description:
      "A React single-page app with product browsing, search, category filtering, sorting, cart management and a validated checkout. FakeStoreAPI is integrated through a centralized service layer.",
    features: [
      "Product browsing",
      "Search & category filtering",
      "Sorting",
      "Cart management",
      "Validated checkout",
      "Loading, error & retry states",
      "Global auth, cart & theme state",
      "Protected routes",
    ],
    tech: ["React 18", "Vite", "React Router", "Tailwind CSS", "Context API", "REST API", "LocalStorage"],
    techLogos: ["react", "vite", "router", "tailwind", "context", "rest", "storage"],
    github: null,
    demo: "https://vortex-xi-dun.vercel.app/", // TODO: replace with the real demo link
    image: "/projects/vortex-store.webp",
  },
  {
    id: "gamehub",
    index: "02",
    title: "GameHub",
    kicker: "Game Discovery Web App",
    description:
      "A framework-free game discovery app built on the FreeToGame REST API, with search, filtering and sorting, and a resilient data layer.",
    features: [
      "Search, filtering & sorting",
      "Request timeout",
      "Response normalization",
      "Fallback data handling",
      "Validated authentication",
      "Protected pages",
      "Per-user favorites",
      "LocalStorage persistence",
    ],
    tech: ["HTML5", "CSS3", "JavaScript (ES6+)", "REST API", "LocalStorage"],
    techLogos: ["html5", "css3", "javascript", "rest", "storage"],
    github: null,
    demo: "https://game-hub-phi-tan.vercel.app/", // TODO: replace with the real demo link
    image: "/projects/gamehub.webp",
  },
  {
    id: "shifa-medical",
    index: "03",
    title: "Shifa Medical Consulting",
    kicker: "Corporate Website · Arabic RTL",
    description:
      "A responsive Arabic RTL corporate website with 11 content sections and SEO / Open Graph optimization.",
    features: [
      "Arabic RTL layout",
      "11 content sections",
      "SEO / Open Graph",
      "Validated contact forms",
      "Live error feedback",
      "Dark / light mode",
      "Testimonial slider",
      "Vanilla JavaScript",
    ],
    tech: ["HTML5", "Tailwind CSS", "JavaScript"],
    techLogos: ["html5", "tailwind", "javascript"],
    github: null,
    demo: "https://shefaa-seven.vercel.app/", // TODO: replace with the real demo link
    image: "/projects/shifa-medical.webp",
  },
  {
    id: "power-gym",
    index: "04",
    title: "Power Gym",
    kicker: "Landing Page · Arabic RTL",
    description:
      "A responsive gym landing page featuring services, trainers, pricing, testimonials and contact sections.",
    features: [
      "Arabic RTL layout",
      "Services & trainers",
      "Pricing",
      "Testimonials",
      "Scroll-triggered animations",
      "Counters",
      "Testimonial slider",
      "Mobile navigation",
    ],
    tech: ["HTML5", "Tailwind CSS", "JavaScript"],
    techLogos: ["html5", "tailwind", "javascript"],
    github: null,
    demo: "https://gym-power-six.vercel.app/", // TODO: replace with the real demo link
    image: "/projects/power-gym.webp",
  },
];

/** Which projects use which skill (derived from each project's tech line / bullets). */
export const SKILL_PROJECTS: Record<string, string[]> = {
  HTML5: ["GameHub", "Shifa Medical Consulting", "Power Gym"],
  CSS3: ["GameHub"],
  "JavaScript (ES6+)": ["GameHub", "Shifa Medical Consulting", "Power Gym"],
  React: ["VORTEX Store"],
  "Tailwind CSS": ["VORTEX Store", "Shifa Medical Consulting", "Power Gym"],
  "Responsive Design": ["Shifa Medical Consulting", "Power Gym"],
  "REST APIs": ["VORTEX Store", "GameHub"],
  "React Router": ["VORTEX Store"],
  "Context API": ["VORTEX Store"],
  LocalStorage: ["VORTEX Store", "GameHub"],
  Vite: ["VORTEX Store"],
  "Arabic RTL Development": ["Shifa Medical Consulting", "Power Gym"],
  "Form Validation": ["VORTEX Store", "GameHub", "Shifa Medical Consulting"],
  "SEO / Open Graph": ["Shifa Medical Consulting"],
  "API Integration": ["VORTEX Store", "GameHub"],
};

export type Certification = { title: string; issuer: string; date: string };

export const CERTIFICATIONS: Certification[] = [
  { title: "Cloud Security", issuer: "NTI", date: "09/2026" },
  { title: "JavaScript", issuer: "Mahara-Tech (ITI Platform)", date: "07/2026" },
  { title: "Web Development Challenger Track", issuer: "Udacity & ITIDA", date: "11/2022" },
  { title: "HTML & CSS", issuer: "Mahara-Tech (ITI Platform)", date: "07/2026" },
  { title: "Training of Trainers (TOT)", issuer: "Higher Institute of Computers", date: "05/2022" },
  { title: "Self-Development Course", issuer: "Higher Institute for Computers", date: "06/2023" },
];

export type TimelineItem = {
  kind: "Education" | "Experience" | "Training";
  /** yyyymm of the start date, used for chronological order */
  sort: number;
  period: string;
  title: string;
  place: string;
  detail: string;
};

export const EDUCATION: TimelineItem[] = [
  {
    kind: "Education",
    sort: 202009,
    period: "2020 – 2024",
    title: "Bachelor of Management Information Systems (MIS)",
    place: "Higher Institute of Computers, Tanta",
    detail:
      "Grade: Excellent. Graduation project: Accounting Educational Website (Excellent), as Team Leader leading developers and designers and presenting the final project.",
  },
];

export const EXPERIENCE: TimelineItem[] = [
  {
    kind: "Experience",
    sort: 202011,
    period: "11/2020 – 01/2026",
    title: "Cashier & Customer Service",
    place: "ExxonMobil, Wadi El Natrun · Part-time",
    detail:
      "Handled daily financial transactions and cash reporting with accuracy and accountability, and delivered customer service in a fast-paced team environment.",
  },
  {
    kind: "Experience",
    sort: 202601,
    period: "01/2026 – Present",
    title: "Administrative Data Entry",
    place: "Anvel Security Egypt, Sadat City · Part-time",
    detail:
      "Maintain and update administrative records, organize and audit digital files, and prepare data reports for the administrative team.",
  },
];

export const TRAINING: TimelineItem[] = [
  {
    kind: "Training",
    sort: 202606,
    period: "06/2026 – 08/2026",
    title: "Web Designer Track",
    place: "NTI Creativa (National Technology Institute)",
    detail: "Professional training and grant programme.",
  },
  {
    kind: "Training",
    sort: 202607,
    period: "07/2026 – Present",
    title: "React Frontend Web Developer Track",
    place: "DEPI (Digital Egypt Pioneers Initiative)",
    detail: "Professional training and grant programme.",
  },
  {
    kind: "Training",
    sort: 202608,
    period: "08/2026 – 10/2026",
    title: "Web Development Using React Track",
    place: "ITI (Information Technology Institute)",
    detail: "Professional training and grant programme.",
  },
];

export const TIMELINE: TimelineItem[] = [...EDUCATION, ...EXPERIENCE, ...TRAINING].sort((a, b) => a.sort - b.sort);

/** The résumé has no competitive-programming ranks or awards, so this section is intentionally removed. */
export const ACHIEVEMENTS: never[] = [];
