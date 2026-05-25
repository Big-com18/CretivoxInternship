import Image from "next/image";

export default function StorySection() {
  return (
    <>
      {/* ── Story 1: foto depan + teks ── */}
      <section className="story-1 min-h-screen flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-6 py-20 gap-12 md:gap-20">
        <div className="foto-depan relative w-64 h-[455px] md:w-80 md:h-[568px] rounded-3xl overflow-hidden shadow-2xl shadow-red-500/20 border border-zinc-800 shrink-0">
          <Image src="/assets/DSC04024.JPG.jpeg" alt="Fierce Depan" fill className="object-cover" />
        </div>
        <div className="teks-depan max-w-lg text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            The Journey <br /> So Far.
          </h2>
          <div className="w-12 h-1 bg-red-500 mb-6 mx-auto md:mx-0" />
          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
            Sebagai mahasiswa Ilmu Komputer dan developer yang pernah terjun langsung memoles
            UI/UX di industri, saya sadar kalau tampilan aja gak cukup.
          </p>
        </div>
      </section>

      {/* ── Story 2: tiga elemen fan ── */}
      <section className="story-2 min-h-screen flex flex-col md:flex-row items-center justify-center py-32 px-6 relative bg-zinc-900/50">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 max-w-7xl mx-auto w-full">

          <div className="foto-kiri relative w-56 h-[400px] rounded-2xl overflow-hidden shadow-xl border border-zinc-800 hidden md:block z-10">
            <Image
              src="/assets/DSC04028.JPG.jpeg"
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
              src="/assets/DSC04025.JPG.jpeg"
              alt="Fierce Kanan"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

        </div>
      </section>
    </>
  );
}