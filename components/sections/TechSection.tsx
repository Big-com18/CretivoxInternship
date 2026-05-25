"use client";

import { useState } from "react";
import gsap from "gsap";
import Image from "next/image"; // 1. Tambahkan import Image di sini
import { TECH_STACK, TECH_CATEGORIES } from "@/constants/techStack";

export default function TechSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [displayCategory, setDisplayCategory] = useState("all");

  const filteredTech = TECH_STACK.filter(
    (t) => displayCategory === "all" || t.category === displayCategory
  );

  const handleCategorySwitch = (id: string) => {
    if (id === activeCategory) return;

    gsap.to(".tech-card", {
      y: 20, opacity: 0, scale: 0.92,
      duration: 0.22, stagger: 0.03, ease: "power2.in",
      onComplete: () => {
        setDisplayCategory(id);
        setActiveCategory(id);
        gsap.fromTo(
          ".tech-card",
          { y: 28, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.38, stagger: 0.05, ease: "power3.out" }
        );
      },
    });
  };

  return (
    <section className="tech-section min-h-screen flex flex-col items-center justify-center py-20 px-6 relative bg-zinc-950">
      <div className="max-w-5xl w-full">

        {/* Title */}
        <div className="tech-title text-center mb-10">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">The Arsenal.</h2>
          <p className="text-zinc-400 text-lg">
            Bahasa, framework, dan tools yang gue pakai buat ngebangun digital experience.
          </p>
        </div>

        {/* Category nav pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {TECH_CATEGORIES.map((cat) => {
            const count =
              cat.id === "all"
                ? TECH_STACK.length
                : TECH_STACK.filter((t) => t.category === cat.id).length;
            const isActive = activeCategory === cat.id;

            // 1. Tentukan warna dinamis berdasarkan ID kategori
            let colorTheme = {
              bgActive: "",
              borderActive: "",
              shadowActive: "",
              dotActive: "",
              badgeBg: "",
              badgeText: "",
            };

            switch (cat.id) {
              case "language": // Kategori Bahasa
                colorTheme = {
                  bgActive: "bg-emerald-500/10",
                  borderActive: "border-emerald-500/40",
                  shadowActive: "shadow-emerald-500/10",
                  dotActive: "bg-emerald-500",
                  badgeBg: "bg-emerald-500/20",
                  badgeText: "text-emerald-400",
                };
                break;
              case "framework": // Kategori Framework
                colorTheme = {
                  bgActive: "bg-red-500/10",
                  borderActive: "border-red-500/40",
                  shadowActive: "shadow-red-500/10",
                  dotActive: "bg-red-500",
                  badgeBg: "bg-red-500/20",
                  badgeText: "text-red-400",
                };
                break;
              case "tools": // Kategori Tools
                colorTheme = {
                  bgActive: "bg-blue-500/10",
                  borderActive: "border-blue-500/40",
                  shadowActive: "shadow-blue-500/10",
                  dotActive: "bg-blue-500",
                  badgeBg: "bg-blue-500/20",
                  badgeText: "text-blue-400",
                };
                break;
              default: // Untuk kategori "All"
                colorTheme = {
                  bgActive: "bg-zinc-500/10",
                  borderActive: "border-zinc-500/40",
                  shadowActive: "shadow-zinc-500/10",
                  dotActive: "bg-zinc-400",
                  badgeBg: "bg-zinc-500/20",
                  badgeText: "text-zinc-300",
                };
                break;
            }

            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySwitch(cat.id)}
                className={`tech-nav-pill relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold tracking-wide border transition-all duration-300 cursor-pointer
                  ${isActive
                    // 2. Terapkan variabel warna di sini
                    ? `${colorTheme.bgActive} ${colorTheme.borderActive} text-white shadow-lg ${colorTheme.shadowActive}`
                    : "bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
                  }`}
              >
                {isActive && (
                  <span className={`w-1.5 h-1.5 rounded-full ${colorTheme.dotActive} block animate-pulse`} />
                )}
                {cat.label}
                <span
                  className={`text-xs font-semibold px-1.5 py-0.5 rounded-full transition-colors duration-300
                    ${isActive ? `${colorTheme.badgeBg} ${colorTheme.badgeText}` : "bg-zinc-800 text-zinc-600"}`}
                >
                  {count}
                </span>
              </button>
            );
          })}

          <div className="hidden md:block w-px h-5 bg-zinc-800 mx-1" />
          <span className="hidden md:flex items-center gap-1.5 text-xs text-zinc-600 font-semibold tracking-widest uppercase">
            <span className="w-1 h-1 rounded-full bg-zinc-700 block" />
            {filteredTech.length} items
          </span>
        </div>

          <div className="hidden md:block w-px h-5 bg-zinc-800 mx-1" />
          <span className="hidden md:flex items-center gap-1.5 text-xs text-zinc-600 font-semibold tracking-widest uppercase">
            <span className="w-1 h-1 rounded-full bg-zinc-700 block" />
            {filteredTech.length} items
          </span>
        </div>

        {/* Tech cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {filteredTech.map((tech, idx) => (
            <div
              key={`${tech.name}-${idx}`}
              className="tech-card group flex flex-col items-start p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-red-500/50 hover:bg-zinc-800/60 hover:-translate-y-1 transition-all duration-300 shadow-md relative overflow-hidden"
            >
              {/* Category badge */}
              <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest text-zinc-700 group-hover:text-zinc-500 transition-colors duration-300">
                {tech.category === "language" ? "lang" : tech.category === "framework" ? "fw" : "tool"}
              </span>

              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

              {/* 2. Logika Render Icon Di Sini */}
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300 origin-bottom-left z-10 flex items-center justify-center min-h-[32px]">
                {tech.icon.startsWith("/") ? (
                  <Image 
                    src={tech.icon} 
                    alt={`${tech.name} logo`} 
                    width={32} 
                    height={32} 
                    className="object-contain"
                  />
                ) : (
                  <span className="text-2xl md:text-3xl">{tech.icon}</span>
                )}
              </div>
              
              <h3 className="text-sm md:text-base font-bold text-zinc-100 group-hover:text-red-400 transition-colors duration-300 z-10">
                {tech.name}
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5 z-10">{tech.desc}</p>
            </div>
          ))}
        </div>
    </section>
  );
}