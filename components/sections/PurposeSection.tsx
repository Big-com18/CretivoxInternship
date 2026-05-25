import Image from "next/image";
import { PURPOSE_CARDS } from "@/constants/data";

export default function PurposeSection() {
  return (
    <section className="purpose-wrapper relative min-h-screen bg-zinc-950 flex items-center justify-center overflow-hidden border-t border-zinc-900 py-12 md:py-16">

      {/* Large watermark text */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[250%] pointer-events-none z-0">
        <h2
          className="cretivox-bg text-[15vw] md:text-[12vw] font-black leading-none opacity-10 uppercase tracking-tighter"
          style={{ color: "transparent", WebkitTextStroke: "2px rgba(239, 68, 68, 0.5)" }}
        >
          CRETIVOX ENDURANCE TEST S2B5
        </h2>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full flex flex-col gap-12 md:gap-16">

        {/* Logo + text row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">

          {/* Logo frame */}
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

          {/* Text */}
          <div className="flex flex-col items-start text-left">
            <div className="purpose-text-item inline-flex items-center gap-3 text-red-500 text-xs font-bold tracking-[0.2em] uppercase mb-6 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20 backdrop-blur-md">
              The Target
            </div>
            <h2 className="purpose-text-item text-4xl md:text-5xl font-black text-white mb-6 tracking-tight drop-shadow-xl">
              Apa itu Cretivox?
            </h2>
            <p className="purpose-text-item text-lg md:text-xl text-zinc-300 mb-4 leading-relaxed drop-shadow-lg">
              <strong className="text-red-500">Cretivox</strong> adalah ekosistem media kreatif
              yang selalu mendobrak batasan. Tempat di mana ide-ide segar dieksekusi dengan{" "}
              <em>craftsmanship</em> yang tajam dan presisi tinggi.
            </p>
            <p className="purpose-text-item text-lg text-zinc-400 leading-relaxed drop-shadow-lg">
              Website ini bukan sekadar portofolio biasa, melainkan dedikasi dan jawaban gue untuk{" "}
              <strong className="text-zinc-100">Endurance Test S2B5</strong>. Pembuktian nyata
              sejauh mana gue bisa <em>push</em> batas slicing UI, animasi GSAP, dan{" "}
              <em>logical thinking</em>.
            </p>
          </div>
        </div>

        {/* Purpose cards row */}
        <div className="flex flex-col md:flex-row gap-6 justify-center w-full">
          {PURPOSE_CARDS.map((card, i) => (
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
  );
}