"use client";

import { useRef } from "react";
import { useAuth }           from "@/hooks/useAuth";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";
import NavBar    from "@/components/ui/NavBar";
import LoginGate from "@/components/ui/LoginGate";
import HeroSection     from "@/components/sections/HeroSection";
import IntroSection    from "@/components/sections/IntroSection";
import PurposeSection  from "@/components/sections/PurposeSection";
import TechSection     from "@/components/sections/TechSection";
import StorySection    from "@/components/sections/StorySection";
import ProjectsSection from "@/components/sections/ProjectsSection";

export default function Home() {
  const container = useRef<HTMLElement>(null);

  // ── Auth logic (login state, handleLogin, error, loading) ──
  const {
    showLogin, setShowLogin,
    username,  setUsername,
    password,  setPassword,
    loading,
    error,
    userData,
    isLoggedIn,
    handleLogin,
  } = useAuth();

  // ── All GSAP scroll animations ──
  useGSAPAnimations({ container, isLoggedIn });

  return (
    <main
      ref={container}
      className="bg-zinc-950 text-zinc-50 min-h-screen font-sans overflow-x-hidden selection:bg-red-500 selection:text-white relative"
    >

      {/* ── Navbar: logo + profile badge ── */}
      <NavBar userData={userData} />

      {/* ── Section 1: Hero ── */}
      <HeroSection />

      {/* ── Section 1.5: Intro / About Me ── */}
      <IntroSection />

      {/* ══════════════════════════════════════════
          LOCKED ZONE — blurred when guest
      ══════════════════════════════════════════ */}
      <div className="relative">

        {/* Blurred overlay when not logged in */}
        <div
          className={`transition-[filter,opacity] duration-700 ${
            !isLoggedIn ? "blur-md opacity-60 pointer-events-none select-none" : ""
          }`}
        >
          {/* ── Section 1.55: Purpose / Cretivox ── */}
          <PurposeSection />

          {/* ── Section 1.6: Tech Stack ── */}
          <TechSection />

          {/* ── Section 2 + 3: Story 1 & 2 ── */}
          <StorySection />

          {/* ── Section 4: Featured Projects ── */}
          <ProjectsSection />
        </div>

        {/* ── Sticky login gate (shown when guest) ── */}
        {!isLoggedIn && (
          <LoginGate
            showLogin={showLogin}
            username={username}
            password={password}
            loading={loading}
            error={error}
            onShowLogin={() => setShowLogin(true)}
            onUsername={setUsername}
            onPassword={setPassword}
            onSubmit={handleLogin}
          />
        )}

      </div>
      {/* ── end locked zone ── */}

    </main>
  );
}