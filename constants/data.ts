import { Project, AboutItem, PurposeCard, Contact } from "@/types";

export const PROJECTS: Project[] = [
  {
    title: "TransLink",
    description:
      "Aplikasi mobile pelacak dan integrasi rute transportasi publik di Jakarta (TransJakarta, MRT, KRL, LRT) menggunakan GTFS data.",
    link: "https://www.figma.com/design/xKuMipoW5Eo9xhojojKjJ3/Home?node-id=0-1&t=5Ob3IARB2iBKISb2-1",
    image: "/assets/Translink.png",
  },
  {
    title: "RANCAR",
    description:
      "Platform pelaporan lalu lintas berbasis web full-stack yang dibangun menggunakan Next.js dan Prisma ORM setelah masa ujian selesai.",
    link: ".",
    image: "/assets/Porto_KEL10_Rancar_IlkomB.jpg",
  },
  {
    title: "Game Disavoved",
    description:
      "Membuat game sederhana menggunakan Unity Egine untuk tugas akhir kuliah, dengan konsep stealth action yang terinspirasi dari game klasik.",
    link: "https://vntrydev.itch.io/disavowed",
    image: "/assets/disavoved.jpg",
  },
];

export const ABOUT_ITEMS: AboutItem[] = [
  { icon: "/assets/graduation-hat.png", label: "University", value: "Cakrawala"         },
  { icon: "/assets/career.png",         label: "Experience", value: "Front-End @ Seeds" },
  { icon: "/assets/concentration.png",  label: "Focus",      value: "Front-End Developer,Quality Assurance, And Software Engineer" },
  { icon: "/assets/navigation.png",     label: "Location",   value: "Jakarta Barat"     },
];

export const PURPOSE_CARDS: PurposeCard[] = [
  {
    icon:  "🔥",
    title: "Pushing Limits",
    desc:  "Mengeksplorasi perpaduan Next.js & GSAP untuk UI yang fluid.",
  },
  {
    icon:  "📐",
    title: "Detail Oriented",
    desc:  "Memastikan animasi dan transisi sempurna di mata.",
  },
  {
    icon:  "🚀",
    title: "Ready for Cretivox",
    desc:  "Pembuktian nyata kalau gue siap jadi bagian dari tim.",
  },
];

export const TAGS = ["Front-End Dev", "Quality Assurance", "Software Engineer"];

export const CONTACTS: Contact[] = [
  {
    platform:  "GitHub",
    handle:    "github.com/Big-com18",
    href:      "https://github.com/Big-com18",
    icon:      "/assets/github-142-svgrepo-com.svg",
    iconBg:    "rgba(255,255,255,0.06)",
    iconColor: "#ffffff",
  },
  {
    platform:  "LinkedIn",
    handle:    "linkedin.com/in/bill-and",
    href:      "https://www.linkedin.com/in/bill-and",
    icon:      "/assets/linkedin-1-svgrepo-com.svg",
    iconBg:    "rgba(10, 102, 194, 0.15)",
    iconColor: "#0A66C2",
  },
  {
    platform:  "Email",
    handle:    "billyandreas441@gmail.com",
    href:      "mailto:billyandreas441@gmail.com",
    icon:      "/assets/gmail-svgrepo-com.svg",
    iconBg:    "rgba(216, 90, 48, 0.15)",
    iconColor: "#D85A30",
  },
  {
    platform:  "Instagram",
    handle:    "@bill.and18",
    href:      "https://instagram.com/bill.and18",
    icon:      "/assets/instagram-1-svgrepo-com.svg",
    iconBg:    "rgba(193, 53, 132, 0.15)",
    iconColor: "#C13584",
  },
];