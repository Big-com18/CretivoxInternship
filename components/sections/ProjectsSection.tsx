"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { PROJECTS } from "@/constants/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // 1. Pastikan semua elemen benar-be nar sudah siap (Anti-Gagal)
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    // Validasi super ketat biar gak meleset
    if (!section || !heading || cards.length === 0) return;

    let ctx = gsap.context(() => {
      // 2. Tentukan state awal (Ngumpet dengan efek 3D)
      // Kita set Perspective di parent biar efek 3D-nya kelihatan
      gsap.set(section, { perspective: 1500 });
      
      // Heading: transparan, agak bawah, miring
      gsap.set(heading, { 
        opacity: 0, 
        y: 60, 
        rotationX: -15, // Miring ke belakang
        transformOrigin: "top center", // Rotasi dari atas
      });
      
      // Cards: transparan, lebih bawah, miring, agak kecil
      gsap.set(cards, { 
        opacity: 0, 
        y: 100, 
        rotationX: -20, // Lebih miring
        scale: 0.9, 
        transformOrigin: "top center",
      });

      // 3. Rangkai animasinya (Aman di dalam Timeline)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%", // Mulai pas section masuk 75% layar dari bawah
          once: true,       // JALAN SEKALI SAJA, GAK BAKAL NGILANG
        }
      });

      // Animasikan Heading duluan
      tl.to(heading, {
        opacity: 1,
        y: 0,
        rotationX: 0, // Tegak kembali
        duration: 1.2,
        ease: "expo.out", // Pergerakan premium
      })
      // Animasikan Cards menyusul dengan Stagger (bergiliran)
      .to(cards, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.15, // Muncul satu per satu
      }, "-=0.8"); // Mulai barengan sebelum heading selesai

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center py-24 px-6 relative bg-zinc-950 border-t border-zinc-900 overflow-hidden"
      style={{ perspective: "1500px" }} // Tambahin perspective di inline style juga biar aman
    >
      {/* Heading */}
      <div
        ref={headingRef}
        className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between mb-12 gap-6"
        style={{ willChange: "transform, opacity" }} // Tips performa buat animasi 3D
      >
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center md:text-left">
            Featured Projects
          </h2>
          <p className="text-zinc-400 text-sm mt-1 text-center md:text-left">
            Koleksi aplikasi dan sistem yang udah dikembangin.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project, idx) => (
          <div
            key={idx}
            ref={(el) => { cardRefs.current[idx] = el; }}
            // Tambahin will-change biar browser siap-siap animas i, jadi smooth
            className="group relative flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 will-change-transform"
          >
            {/* Index + top metadata bar */}
            <div className="flex items-center justify-between px-5 pt-5 pb-0">
              <span className="text-[11px] font-mono text-zinc-600 tracking-widest uppercase">
                Project
              </span>
              <span className="text-[11px] font-mono text-zinc-700">
                {String(idx + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
              </span>
            </div>

            {/* Preview (Hover membesar elegan) */}
            <div className="mx-5 mt-3 rounded-xl overflow-hidden h-44 relative bg-zinc-950 border border-zinc-800/60">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 👈 Tambahkan baris ini
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/60 to-zinc-950 flex items-center justify-center">
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                    }}
                  />
                  <span className="relative text-zinc-700 text-xs font-semibold tracking-widest uppercase">
                    {project.title}
                  </span>
                </div>
              )}
              {/* Red accent line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 px-5 pt-5 pb-6 gap-3">
              <h3 className="text-lg font-bold leading-snug text-zinc-100 group-hover:text-red-400 transition-colors duration-300">
                {project.title}
              </h3>
              <div className="h-px w-full bg-zinc-800" />
              <p className="text-zinc-400 text-sm leading-relaxed flex-1">
                {project.description}
              </p>
              <div className="flex items-center justify-between mt-2">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-white flex items-center gap-1.5 hover:text-red-400 transition-colors duration-200 group/link"
                >
                  Lihat Detail
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <svg
                  className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors duration-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}