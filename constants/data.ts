import { Project, AboutItem, PurposeCard } from "@/types";

export const PROJECTS: Project[] = [
  {
    title: "TransLink",
    description:
      "Aplikasi mobile pelacak dan integrasi rute transportasi publik di Jakarta (TransJakarta, MRT, KRL, LRT) menggunakan GTFS data.",
    link: "https://github.com/billy/translink",
    image: "/images/project1.jpg",
  },
  {
    title: "RANCAR Web App",
    description:
      "Platform pelaporan lalu lintas berbasis web full-stack yang dibangun menggunakan Next.js dan Prisma ORM setelah masa ujian selesai.",
    link: "https://github.com/billy/rancar",
    image: "/images/project2.jpg",
  },
];

export const ABOUT_ITEMS: AboutItem[] = [
  { icon: "/assets/graduation-hat.png", label: "University", value: "Cakrawala"         },
  { icon: "/assets/career.png", label: "Experience", value: "Front-End @ Seeds" },
  { icon: "/assets/concentration.png", label: "Focus",      value: "Front-End Developer,Quality Assurance, And Software Engineer" },
  { icon: "/assets/navigation.png", label: "Location",   value: "Jakarta Barat"       },
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