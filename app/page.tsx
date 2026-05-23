"use client";

import { useRef, useState, FormEvent } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UserData {
  firstName: string;
  lastName: string;
  image: string;
  username: string;
}

// ── TECH DATA dengan kategori ──
const techCategories = [
  { id: "all", label: "All" },
  { id: "language", label: "Bahasa" },
  { id: "framework", label: "Framework" },
  { id: "tools", label: "Tools" },
];

const myTechStack = [
  // Languages
  { name: "JavaScript", desc: "Core Language", icon: "JS", category: "language" },
  { name: "TypeScript", desc: "Typed JS", icon: "TS", category: "language" },
  { name: "Python", desc: "Scripting & Data", icon: "🐍", category: "language" },
  { name: "Dart", desc: "Flutter Language", icon: "DA", category: "language" },
  { name: "PHP", desc: "Server-side Scripting", icon: "🗄", category: "language" },
  // Frameworks
  { name: "Next.js", desc: "React Framework", icon: "▲", category: "framework" },
  { name: "React.js", desc: "UI Library", icon: "⚛", category: "framework" },
  { name: "React Native", desc: "Mobile App", icon: "📱", category: "framework" },
  { name: "Flutter", desc: "Cross-platform", icon: "🦋", category: "framework" },
  { name: "Tailwind CSS", desc: "Styling", icon: "🌊", category: "framework" },
  { name: "GSAP", desc: "Animations", icon: "✨", category: "framework" },
  // Tools
  { name: "VS Code", desc: "Primary Editor", icon: "💻", category: "tools" },
  { name: "Android Studio", desc: "Mobile Testing", icon: "🤖", category: "tools" },
  { name: "BigQuery", desc: "Data Warehouse", icon: "🔍", category: "tools" },
  { name: "Git", desc: "Version Control", icon: "⎇", category: "tools" },
  { name: "Figma", desc: "UI Design", icon: "◈", category: "tools" },
];

export default function Home() {
  const container = useRef<HTMLElement>(null);

  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [userData, setUserData] = useState<UserData | null>(null);
  const isLoggedIn = userData !== null;

  // ── Tech filter state ──
  const [activeCategory, setActiveCategory] = useState("all");
  const [displayCategory, setDisplayCategory] = useState("all");
  const [cardsVisible, setCardsVisible] = useState(true);

  const filteredTech = myTechStack.filter(
    (t) => displayCategory === "all" || t.category === displayCategory
  );

  const handleCategorySwitch = (id: string) => {
    if (id === activeCategory) return;
    // Animate out
    setCardsVisible(false);
    gsap.to(".tech-card", {
      y: 20,
      opacity: 0,
      scale: 0.92,
      duration: 0.22,
      stagger: 0.03,
      ease: "power2.in",
      onComplete: () => {
        setDisplayCategory(id);
        setActiveCategory(id);
        setCardsVisible(true);
        // Animate in
        gsap.fromTo(
          ".tech-card",
          { y: 28, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.38, stagger: 0.05, ease: "power3.out" }
        );
      },
    });
  };

  const myProjects = [
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

  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-elem",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out", delay: 0.2 }
      );

      const tlIntro = gsap.timeline({
        scrollTrigger: {
          trigger: ".intro-section",
          start: "top 85%",
          end: "bottom 15%",
          scrub: 1,
        },
      });
      tlIntro
        .fromTo(".intro-left", { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1 })
        .fromTo(".intro-right", { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, "<")
        .to(".intro-left", { x: 0, opacity: 1, duration: 1.5 })
        .to(".intro-right", { x: 0, opacity: 1, duration: 1.5 }, "<")
        .to(".intro-left", { x: -100, opacity: 0, duration: 1 })
        .to(".intro-right", { x: 100, opacity: 0, duration: 1 }, "<");

      if (isLoggedIn) {
        const tlPurpose = gsap.timeline({
          scrollTrigger: {
            trigger: ".purpose-wrapper",
            start: "center center",
            end: "+=150%",
            scrub: 1,
            pin: true,
          },
        });
        tlPurpose
          .to(".cretivox-bg", { yPercent: -15, ease: "none" }, 0)
          .fromTo(
            ".logo-frame",
            { opacity: 0, scale: 0.8, rotateY: 45, x: -50 },
            { opacity: 1, scale: 1, rotateY: 0, x: 0, duration: 1, ease: "power3.out" },
            0
          )
          .fromTo(
            ".purpose-text-item",
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" },
            0.2
          )
          .fromTo(
            ".purpose-card",
            {
              opacity: 0,
              y: 150,
              scale: 0.8,
              rotation: (i: number) => [-15, 0, 15][i],
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 1.2,
              stagger: 0.2,
              ease: "elastic.out(1, 0.6)",
            },
            0.6
          )
          .to(
            ".logo-frame",
            {
              boxShadow: "0px 0px 40px rgba(239, 68, 68, 0.4)",
              borderColor: "rgba(239, 68, 68, 0.6)",
              duration: 0.5,
            },
            1.5
          );

        // ── TECH SECTION: title + nav animate in on scroll ──
        const tlTech = gsap.timeline({
          scrollTrigger: {
            trigger: ".tech-section",
            start: "top 85%",
            end: "bottom 15%",
            scrub: 1,
          },
        });
        tlTech
          .fromTo(".tech-title", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
          .fromTo(
            ".tech-nav-pill",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.08, duration: 0.6 },
            "<0.2"
          )
          .fromTo(
            ".tech-card",
            { y: 50, scale: 0.8, opacity: 0 },
            { y: 0, scale: 1, opacity: 1, stagger: 0.07, duration: 1 },
            "<0.2"
          )
          .to(".tech-title", { y: 0, opacity: 1, duration: 1.5 })
          .to(".tech-card", { y: 0, opacity: 1, scale: 1, duration: 1.5 }, "<")
          .to(".tech-title", { y: -50, opacity: 0, duration: 1 })
          .to(
            ".tech-card",
            { y: -50, scale: 0.8, opacity: 0, stagger: 0.1, duration: 1 },
            "<"
          );

        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: ".story-1",
            start: "top 85%",
            end: "bottom 15%",
            scrub: 1,
          },
        });
        tl1
          .fromTo(".foto-depan", { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1 })
          .fromTo(".teks-depan", { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, "<")
          .to(".foto-depan", { x: 0, opacity: 1, duration: 1.5 })
          .to(".teks-depan", { x: 0, opacity: 1, duration: 1.5 }, "<")
          .to(".foto-depan", { x: -100, opacity: 0, duration: 1 })
          .to(".teks-depan", { x: 100, opacity: 0, duration: 1 }, "<");

        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: ".story-2",
            start: "top 85%",
            end: "bottom 15%",
            scrub: 1,
          },
        });
        tl2
          .fromTo(
            ".foto-kiri",
            { x: -150, opacity: 0, rotation: -10 },
            { x: 0, opacity: 1, rotation: 0, duration: 1 }
          )
          .fromTo(
            ".teks-tengah",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 },
            "-=0.5"
          )
          .fromTo(
            ".foto-kanan",
            { x: 150, opacity: 0, rotation: 10 },
            { x: 0, opacity: 1, rotation: 0, duration: 1 },
            "-=0.5"
          )
          .to(".foto-kiri", { x: 0, opacity: 1, rotation: 0, duration: 1.5 })
          .to(".teks-tengah", { y: 0, opacity: 1, duration: 1.5 }, "<")
          .to(".foto-kanan", { x: 0, opacity: 1, rotation: 0, duration: 1.5 }, "<")
          .to(".foto-kiri", { x: -150, opacity: 0, rotation: -10, duration: 1 })
          .to(".teks-tengah", { y: -50, opacity: 0, duration: 1 }, "<")
          .to(".foto-kanan", { x: 150, opacity: 0, rotation: 10, duration: 1 }, "<");
      }
    },
    { scope: container, dependencies: [isLoggedIn] }
  );

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://dummyjson.com/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed. Cek lagi username/password lo.");
      }

      setUserData({
        firstName: data.firstName,
        lastName: data.lastName,
        image: data.image,
        username: data.username,
      });

      gsap.fromTo(
        ".profile-badge",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
      gsap.fromTo(
        ".project-card",
        { scale: 0.95 },
        { scale: 1, duration: 0.8, ease: "expo.out", stagger: 0.1 }
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan yang tidak terduga.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      ref={container}
      className="bg-zinc-950 text-zinc-50 min-h-screen font-sans overflow-x-hidden selection:bg-red-500 selection:text-white relative"
    >

      {/* ── HEADER ── */}
      <nav className="absolute top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50">
        <div className="hero-elem bg-white px-5 py-2.5 rounded-full shadow-lg shadow-white/10 flex items-center justify-center">
          <Image
            src="/assets/Logo Cretivox - Black.png"
            alt="Cretivox Logo"
            width={100}
            height={30}
            className="object-contain"
            priority
          />
        </div>

        {/* ── USER BADGE (GUEST & LOGGED IN) ── */}
        <div className="hero-elem profile-badge flex items-center gap-3 bg-zinc-900/80 px-4 py-2 rounded-full border border-zinc-800 shadow-xl backdrop-blur-md transition-all duration-300">
          {isLoggedIn && userData ? (
            <>
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-red-500 bg-white shrink-0">
                <Image
                  src={userData.image}
                  alt={userData.firstName}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="hidden md:flex flex-col pr-2 text-left">
                <span className="text-xs text-zinc-400 leading-none">Authenticated as</span>
                <span className="text-sm font-bold text-zinc-100 mt-0.5">
                  {userData.firstName} {userData.lastName}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full border-2 border-zinc-700 bg-zinc-800 flex items-center justify-center shrink-0 text-zinc-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="hidden md:flex flex-col pr-2 text-left">
                <span className="text-xs text-zinc-500 leading-none">Status</span>
                <span className="text-sm font-bold text-zinc-400 mt-0.5">Guest</span>
              </div>
            </>
          )}
        </div>
      </nav>

      {/* ── SECTION 1: HERO ── */}
      <section className="min-h-screen flex flex-col items-center justify-center max-w-5xl mx-auto px-6 text-center">
        <h1 className="hero-elem text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tighter leading-none mb-6">
          Hi, I&apos;m{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
            Billy.
          </span>
        </h1>
        <p className="hero-elem text-xl md:text-2xl text-zinc-400 max-w-2xl leading-relaxed">
          Front-End Developer. I don&apos;t just write code, I craft living, breathing digital
          experiences.
        </p>
        <div className="hero-elem absolute bottom-10 animate-bounce text-zinc-500">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* ── SECTION 1.5: INTRO ── */}
      <section className="intro-section min-h-screen flex items-center justify-center relative overflow-hidden py-24 px-6">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(239,68,68,1) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            animation: "gridShift 20s linear infinite",
          }}
        />
        <style>{`@keyframes gridShift { 0% { background-position: 0 0; } 100% { background-position: 60px 60px; } }`}</style>
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-red-600 rounded-full blur-[130px] opacity-[0.08] animate-pulse pointer-events-none" />
        <div
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-500 rounded-full blur-[100px] opacity-[0.08] animate-pulse pointer-events-none"
          style={{ animationDelay: "2s" }}
        />

        <div className="relative z-10 max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="intro-left flex flex-col gap-6">
            <div className="flex items-center gap-2 text-red-500 text-xs font-bold tracking-[0.2em] uppercase">
              <span className="w-6 h-0.5 bg-red-500 block" /> About Me
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-[1.02]">
              Ilmu Komputer,{" "}
              <span
                className="block"
                style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
              >
                Semester 4.
              </span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Mahasiswa aktif di{" "}
              <strong className="text-zinc-100">Universitas Cakrawala</strong>, Jakarta. Pernah
              terjun langsung sebagai{" "}
              <strong className="text-zinc-100">Front-End Developer di Seeds</strong>, ngolah UI
              dari nol sampai jadi antarmuka yang solid dan bernyawa.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Front-End Dev", "UI Enthusiast", "Seeds Alumni", "Jakarta 🇮🇩"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/5 text-red-400 text-xs font-semibold tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="intro-right flex flex-col gap-4">
            {[
              { icon: "🎓", label: "University", value: "Cakrawala" },
              { icon: "💼", label: "Experience", value: "Front-End @ Seeds" },
              { icon: "⚡", label: "Focus", value: "UI / Motion" },
              { icon: "📍", label: "Location", value: "Jakarta, ID" },
            ].map((item) => (
              <div
                key={item.label}
                className="group flex items-center gap-4 p-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-red-500/40 hover:bg-red-500/5 transition-all duration-300 cursor-default"
              >
                <div className="w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center text-xl flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-0.5">
                    {item.label}
                  </div>
                  <div className="text-zinc-100 font-bold text-lg leading-tight">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LOCKED ZONE
      ══════════════════════════════════════════ */}
      <div className="relative">
        <div
          className={`transition-[filter,opacity] duration-700 ${
            !isLoggedIn ? "blur-md opacity-60 pointer-events-none select-none" : ""
          }`}
        >

          {/* ── SECTION 1.55: PURPOSE / CRETIVOX ── */}
          <section className="purpose-wrapper relative min-h-screen bg-zinc-950 flex items-center justify-center overflow-hidden border-t border-zinc-900 py-12 md:py-16">
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[250%] pointer-events-none z-0">
              <h2
                className="cretivox-bg text-[15vw] md:text-[12vw] font-black leading-none opacity-10 uppercase tracking-tighter"
                style={{ color: "transparent", WebkitTextStroke: "2px rgba(239, 68, 68, 0.5)" }}
              >
                CRETIVOX ENDURANCE TEST S2B5
              </h2>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 w-full flex flex-col gap-12 md:gap-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
                <div style={{ perspective: "1000px" }}>
                  <div className="logo-frame relative p-10 md:p-14 rounded-[2rem] border border-zinc-800 bg-zinc-900/50 backdrop-blur-md shadow-2xl flex items-center justify-center group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-full max-w-[250px] aspect-[3/1] invert opacity-90">
                      <Image
                        src="/assets/Logo Cretivox - Black.png"
                        alt="Cretivox Logo"
                        fill
                        className="object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start text-left">
                  <div className="purpose-text-item inline-flex items-center gap-3 text-red-500 text-xs font-bold tracking-[0.2em] uppercase mb-6 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20 backdrop-blur-md">
                    The Target
                  </div>
                  <h2 className="purpose-text-item text-4xl md:text-5xl font-black text-white mb-6 tracking-tight drop-shadow-xl">
                    Apa itu Cretivox?
                  </h2>
                  <p className="purpose-text-item text-lg md:text-xl text-zinc-300 mb-4 leading-relaxed drop-shadow-lg">
                    <strong className="text-red-500">Cretivox</strong> adalah ekosistem media
                    kreatif yang selalu mendobrak batasan. Tempat di mana ide-ide segar dieksekusi
                    dengan *craftsmanship* yang tajam dan presisi tinggi.
                  </p>
                  <p className="purpose-text-item text-lg text-zinc-400 leading-relaxed drop-shadow-lg">
                    Website ini bukan sekadar portofolio biasa, melainkan dedikasi dan jawaban gue
                    untuk <strong className="text-zinc-100">Endurance Test S2B5</strong>. Pembuktian
                    nyata sejauh mana gue bisa *push* batas slicing UI, animasi GSAP, dan *logical
                    thinking*.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 justify-center w-full">
                {[
                  {
                    title: "Pushing Limits",
                    desc: "Mengeksplorasi perpaduan Next.js & GSAP untuk UI yang fluid.",
                    icon: "🔥",
                  },
                  {
                    title: "Detail Oriented",
                    desc: "Memastikan animasi dan transisi sempurna di mata.",
                    icon: "📐",
                  },
                  {
                    title: "Ready for Cretivox",
                    desc: "Pembuktian nyata kalau gue siap jadi bagian dari tim.",
                    icon: "🚀",
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="purpose-card relative p-8 bg-zinc-900/80 backdrop-blur-lg border border-zinc-700/50 rounded-3xl text-left flex-1 hover:border-red-500/80 hover:bg-zinc-800 hover:-translate-y-3 transition-all duration-300 shadow-2xl"
                  >
                    <div className="absolute top-2 right-4 opacity-10 text-7xl pointer-events-none">
                      {card.icon}
                    </div>
                    <div className="text-4xl mb-5">{card.icon}</div>
                    <h3 className="text-2xl font-bold text-zinc-100 mb-2">{card.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{card.desc}</p>
                    <div className="absolute inset-0 bg-gradient-to-tr from-red-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════
              SECTION 1.6: TECH STACK — dengan filter nav
          ══════════════════════════════════════════ */}
          <section className="tech-section min-h-screen flex flex-col items-center justify-center py-20 px-6 relative bg-zinc-950">
            <div className="max-w-5xl w-full">

              {/* Title */}
              <div className="tech-title text-center mb-10">
                <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">The Arsenal.</h2>
                <p className="text-zinc-400 text-lg">
                  Bahasa, framework, dan tools yang gue pakai buat ngebangun digital experience.
                </p>
              </div>

              {/* ── Category Nav Pills ── */}
              <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
                {techCategories.map((cat) => {
                  const count =
                    cat.id === "all"
                      ? myTechStack.length
                      : myTechStack.filter((t) => t.category === cat.id).length;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySwitch(cat.id)}
                      className={`tech-nav-pill relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold tracking-wide border transition-all duration-300 cursor-pointer
                        ${
                          isActive
                            ? "bg-red-500/10 border-red-500/40 text-white shadow-lg shadow-red-500/10"
                            : "bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
                        }`}
                    >
                      {/* Active indicator dot */}
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 block animate-pulse" />
                      )}
                      {cat.label}
                      <span
                        className={`text-xs font-semibold px-1.5 py-0.5 rounded-full transition-colors duration-300
                          ${isActive ? "bg-red-500/20 text-red-400" : "bg-zinc-800 text-zinc-600"}`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}

                {/* Divider line */}
                <div className="hidden md:block w-px h-5 bg-zinc-800 mx-1" />

                {/* Total counter */}
                <span className="hidden md:flex items-center gap-1.5 text-xs text-zinc-600 font-semibold tracking-widest uppercase">
                  <span className="w-1 h-1 rounded-full bg-zinc-700 block" />
                  {filteredTech.length} items
                </span>
              </div>

              {/* ── Tech Cards Grid ── */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                {filteredTech.map((tech, idx) => (
                  <div
                    key={`${tech.name}-${idx}`}
                    className="tech-card group flex flex-col items-start p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-red-500/50 hover:bg-zinc-800/60 hover:-translate-y-1 transition-all duration-300 shadow-md relative overflow-hidden"
                  >
                    {/* Subtle category badge */}
                    <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest text-zinc-700 group-hover:text-zinc-500 transition-colors duration-300">
                      {tech.category === "language"
                        ? "lang"
                        : tech.category === "framework"
                        ? "fw"
                        : "tool"}
                    </span>

                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

                    {/* Icon */}
                    <div className="text-2xl md:text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 origin-bottom-left z-10">
                      {tech.icon}
                    </div>

                    {/* Name */}
                    <h3 className="text-sm md:text-base font-bold text-zinc-100 group-hover:text-red-400 transition-colors duration-300 z-10">
                      {tech.name}
                    </h3>

                    {/* Desc */}
                    <p className="text-xs text-zinc-500 mt-0.5 z-10">{tech.desc}</p>
                  </div>
                ))}
              </div>

            </div>
          </section>
          {/* ══ end tech section ══ */}

          {/* ── SECTION 2: STORY 1 ── */}
          <section className="story-1 min-h-screen flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-6 py-20 gap-12 md:gap-20">
            <div className="foto-depan relative w-64 h-[455px] md:w-80 md:h-[568px] rounded-3xl overflow-hidden shadow-2xl shadow-red-500/20 border border-zinc-800 shrink-0">
              <Image src="/images/depan.jpg" alt="Fierce Depan" fill className="object-cover" />
            </div>
            <div className="teks-depan max-w-lg text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                The Journey <br /> So Far.
              </h2>
              <div className="w-12 h-1 bg-red-500 mb-6 mx-auto md:mx-0" />
              <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
                Sebagai mahasiswa Ilmu Komputer dan developer yang pernah terjun langsung memoles
                UI/UX di industri, gue sadar kalau tampilan aja gak cukup.
              </p>
            </div>
          </section>

          {/* ── SECTION 3: STORY 2 ── */}
          <section className="story-2 min-h-screen flex flex-col md:flex-row items-center justify-center py-32 px-6 relative bg-zinc-900/50">
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 max-w-7xl mx-auto w-full">
              <div className="foto-kiri relative w-56 h-[400px] rounded-2xl overflow-hidden shadow-xl border border-zinc-800 hidden md:block z-10">
                <Image
                  src="/images/kiri.jpg"
                  alt="Fierce Kiri"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="teks-tengah max-w-md text-center z-20 px-4">
                <h3 className="text-3xl font-bold mb-4">Detail Matters.</h3>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Gimana cara elemen muncul, cara transisi bekerja, dan ngasih feel interaktif ke
                  pengunjung. This page is literally who I am: structural, edgy, and dynamic.
                </p>
              </div>
              <div className="foto-kanan relative w-56 h-[400px] rounded-2xl overflow-hidden shadow-xl border border-zinc-800 z-10 mt-10 md:mt-0">
                <Image
                  src="/images/kanan.jpg"
                  alt="Fierce Kanan"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </section>

          {/* ── SECTION 4: PROJECTS ── */}
          <section className="flex flex-col items-center py-24 px-6 relative bg-zinc-950 border-t border-zinc-900">
            <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center md:text-left">
                  Featured Projects
                </h2>
                <p className="text-zinc-400 text-sm mt-1 text-center md:text-left">
                  Koleksi aplikasi dan sistem yang udah gue kembangin.
                </p>
              </div>
            </div>

            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
              {myProjects.map((project, idx) => (
                <div
                  key={idx}
                  className="project-card bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col group hover:border-zinc-700 transition-all duration-300"
                >
                  <div className="relative w-full h-48 bg-zinc-950">
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-zinc-600 font-bold tracking-widest text-xs uppercase">
                      {project.title} Preview
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col gap-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-zinc-100 group-hover:text-red-500 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">{project.description}</p>
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-white flex items-center gap-1 hover:text-red-400 transition-colors w-fit"
                    >
                      View Repository
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
        {/* ── end blurred content ── */}

        {/* ── STICKY LOGIN GATE ── */}
        {!isLoggedIn && (
          <div className="absolute inset-0 z-30 flex justify-center items-start pointer-events-none">
            <div className="sticky top-[calc(50vh-220px)] mt-32 pointer-events-auto w-full max-w-sm mx-4">
              <div className="bg-zinc-900/95 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-zinc-800 flex flex-col items-center text-center">
                {!showLogin ? (
                  <>
                    <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mb-5">
                      <svg
                        className="w-7 h-7 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Konten Terkunci</h3>
                    <p className="text-zinc-400 text-sm mb-2 leading-relaxed">
                      Section ini hanya bisa diakses setelah login.
                    </p>
                    <p className="text-zinc-500 text-xs mb-6 max-w-[260px]">
                      Silakan login menggunakan API Intern untuk membuka semua konten di bawah ini.
                    </p>
                    <button
                      onClick={() => setShowLogin(true)}
                      className="w-full py-3 bg-white text-black font-bold text-sm rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-md active:scale-95"
                    >
                      Login untuk Lanjut
                    </button>
                  </>
                ) : (
                  <form onSubmit={handleLogin} className="w-full flex flex-col gap-4 text-left">
                    <h4 className="text-lg font-bold text-center mb-1">API Authentication</h4>
                    {error && (
                      <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs text-center">
                        {error}
                      </div>
                    )}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-zinc-400">Username</label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="px-4 py-2.5 text-sm rounded-lg bg-zinc-950 border border-zinc-800 focus:border-red-500 focus:outline-none transition-all"
                        placeholder="e.g., emilys"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-zinc-400">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-2.5 text-sm rounded-lg bg-zinc-950 border border-zinc-800 focus:border-red-500 focus:outline-none transition-all"
                        placeholder="e.g., emilyspass"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-2 w-full py-3 bg-red-600 text-white font-bold text-sm rounded-xl hover:bg-red-500 transition-all flex justify-center items-center shadow-lg shadow-red-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? "Verifying..." : "Login & Unlock"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
      {/* ── end locked zone ── */}

    </main>
  );
}