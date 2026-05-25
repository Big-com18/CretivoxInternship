import { Tech } from "@/types";

export const TECH_CATEGORIES = [
  { id: "all",       label: "All"       },
  { id: "language",  label: "Bahasa"    },
  { id: "framework", label: "Framework" },
  { id: "tools",     label: "Tools"     },
] as const;

export const TECH_STACK: Tech[] = [
  // Languages
  { name: "JavaScript", desc: "Core Language",        icon: "/assets/js.svg", category: "language"  },
  { name: "TypeScript", desc: "Typed JS",              icon: "/assets/typescript-official.svg", category: "language"  },
  { name: "Python",     desc: "Scripting & Data",      icon: "/assets/python.svg", category: "language"  },
  { name: "Dart",       desc: "Flutter Language(Newbie)",      icon: "/assets/dart.svg", category: "language"  },
  { name: "PHP",        desc: "Server-side Scripting", icon: "/assets/php.svg", category: "language"  },
  // Frameworks
  { name: "Next.js",      desc: "React Framework", icon: "/assets/nextjs-fill.svg",  category: "framework" },
  { name: "React.js",     desc: "UI Library",       icon: "/assets/reactjs.svg",  category: "framework" },
  { name: "React Native", desc: "Mobile App",       icon: "/assets/reactjs.svg", category: "framework" },
  // Tools
  { name: "VS Code",        desc: "Primary Editor",  icon: "/assets/vscode-svgrepo-com.svg", category: "tools" },
  { name: "Android Studio", desc: "Mobile Testing",  icon: "/assets/android-studio-icon.svg", category: "tools" },
  { name: "Git",            desc: "Version Control", icon: "/assets/git-icon.svg",  category: "tools" },
  { name: "Figma",          desc: "UI Design",       icon: "/assets/figma-icon.svg",  category: "tools" },
  { name: "Github",         desc: "Pengelelolaan file",    icon: "/assets/github-142-svgrepo-com.svg",  category: "tools" },
];