export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center max-w-5xl mx-auto px-6 text-center">
      <h1 className="hero-elem text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tighter leading-none mb-6">
        Hi, I&apos;m{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
          Billy.
        </span>
      </h1>

      <p className="hero-elem text-xl md:text-2xl text-zinc-400 max-w-2xl leading-relaxed">
        Front-End Developer. I don&apos;t just write code, I craft living, breathing digital experiences.
      </p>

      {/* Scroll indicator */}
      <div className="hero-elem absolute bottom-10 animate-bounce text-zinc-500">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}