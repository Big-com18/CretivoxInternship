import Image from "next/image";
import { ABOUT_ITEMS, TAGS } from "@/constants/data";

export default function IntroSection() {
  return (
    <section className="intro-section min-h-screen flex items-center justify-center relative overflow-hidden py-24 px-6">

      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(239,68,68,1) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          animation: "gridShift 20s linear infinite",
        }}
      />
      <style>{`
        @keyframes gridShift {
          0%   { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
      `}</style>

      {/* Ambient blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-red-600 rounded-full blur-[130px] opacity-[0.08] animate-pulse pointer-events-none" />
      <div
        className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-500 rounded-full blur-[100px] opacity-[0.08] animate-pulse pointer-events-none"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Left: bio */}
        <div className="intro-left flex flex-col gap-6">
          <div className="flex items-center gap-2 text-red-500 text-xs font-bold tracking-[0.2em] uppercase">
            <span className="w-6 h-0.5 bg-red-500 block" />About Me
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
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/5 text-red-400 text-xs font-semibold tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: info cards */}
        <div className="intro-right flex flex-col gap-4">
          {ABOUT_ITEMS.map((item) => (
            <div
              key={item.label}
              className="group flex items-center gap-4 p-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-red-500/40 hover:bg-red-500/5 transition-all duration-300 cursor-default"
            >
              <div className="relative w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center text-xl flex-shrink-0 overflow-hidden">
                {/* Pengecekan Kondisi: Render Image jika ada path, render text jika berupa emoji */}
                {item.icon.startsWith("/") || item.icon.includes(".png") ? (
                  <Image 
                    src={item.icon} 
                    alt={`${item.label} icon`} 
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  item.icon
                )}
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
  );
}