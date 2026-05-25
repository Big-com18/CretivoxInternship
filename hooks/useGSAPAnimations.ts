import { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseGSAPAnimationsProps {
  container: RefObject<HTMLElement | null> ;
  isLoggedIn: boolean;
}

export function useGSAPAnimations({ container, isLoggedIn }: UseGSAPAnimationsProps) {
  useGSAP(
    () => {
      // ── Hero entrance ──
      gsap.fromTo(
        ".hero-elem",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out", delay: 0.2 }
      );

      const tlIntro = gsap.timeline({
        scrollTrigger: {
          trigger: ".intro-section",
          start: "top 85%", end: "bottom 15%", scrub: 1,
        },
      });
      tlIntro
        .fromTo(".intro-left",  { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1 })
        .fromTo(".intro-right", { x: 100,  opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, "<")
        .to(".intro-left",  { x: 0, opacity: 1, duration: 1.5 })
        .to(".intro-right", { x: 0, opacity: 1, duration: 1.5 }, "<")
        .to(".intro-left",  { x: -100, opacity: 0, duration: 1 })
        .to(".intro-right", { x: 100,  opacity: 0, duration: 1 }, "<");

      // Locked sections — only when logged in
      if (!isLoggedIn) return;

      // ── Purpose / Cretivox: pinned parallax ──
      const tlPurpose = gsap.timeline({
        scrollTrigger: {
          trigger: ".purpose-wrapper",
          start: "center center", end: "+=150%", scrub: 1, pin: true,
        },
      });
      tlPurpose
        .to(".cretivox-bg", { yPercent: -15, ease: "none" }, 0)
        .fromTo(
          ".logo-frame",
          { opacity: 0, scale: 0.8, rotateY: 45, x: -50 },
          { opacity: 1, scale: 1, rotateY: 0, x: 0, duration: 1, ease: "power3.out" }, 0
        )
        .fromTo(
          ".purpose-text-item",
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }, 0.2
        )
        .fromTo(
          ".purpose-card",
          { opacity: 0, y: 150, scale: 0.8, rotation: (i: number) => [-15, 0, 15][i] },
          { opacity: 1, y: 0, scale: 1, rotation: 0, duration: 1.2, stagger: 0.2, ease: "elastic.out(1, 0.6)" },
          0.6
        )
        .to(
          ".logo-frame",
          { boxShadow: "0px 0px 40px rgba(239, 68, 68, 0.4)", borderColor: "rgba(239, 68, 68, 0.6)", duration: 0.5 },
          1.5
        );

      // ── Tech section: title + cards scroll in/out ──
      const tlTech = gsap.timeline({
        scrollTrigger: {
          trigger: ".tech-section",
          start: "top 85%", end: "bottom 15%", scrub: 1,
        },
      });
      tlTech
        .fromTo(".tech-title",    { y: 50, opacity: 0 },             { y: 0, opacity: 1, duration: 1 })
        .fromTo(".tech-nav-pill", { y: 20, opacity: 0 },             { y: 0, opacity: 1, stagger: 0.08, duration: 0.6 }, "<0.2")
        .fromTo(".tech-card",     { y: 50, scale: 0.8, opacity: 0 }, { y: 0, scale: 1, opacity: 1, stagger: 0.07, duration: 1 }, "<0.2")
        .to(".tech-title", { y: 0,   opacity: 1, duration: 1.5 })
        .to(".tech-card",  { y: 0,   opacity: 1, scale: 1, duration: 1.5 }, "<")
        .to(".tech-title", { y: -50, opacity: 0, duration: 1 })
        .to(".tech-card",  { y: -50, scale: 0.8, opacity: 0, stagger: 0.1, duration: 1 }, "<");

      // ── Story 1: foto + teks horizontal slide ──
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: ".story-1",
          start: "top 85%", end: "bottom 15%", scrub: 1,
        },
      });
      tl1
        .fromTo(".foto-depan", { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1 })
        .fromTo(".teks-depan", { x: 100,  opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, "<")
        .to(".foto-depan", { x: 0, opacity: 1, duration: 1.5 })
        .to(".teks-depan", { x: 0, opacity: 1, duration: 1.5 }, "<")
        .to(".foto-depan", { x: -100, opacity: 0, duration: 1 })
        .to(".teks-depan", { x: 100,  opacity: 0, duration: 1 }, "<");

      // ── Story 2: tiga elemen fan in/out ──
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".story-2",
          start: "top 85%", end: "bottom 15%", scrub: 1,
        },
      });
      tl2
        .fromTo(".foto-kiri",   { x: -150, opacity: 0, rotation: -10 }, { x: 0, opacity: 1, rotation: 0, duration: 1 })
        .fromTo(".teks-tengah", { y: 50,   opacity: 0 },                 { y: 0, opacity: 1, duration: 1 }, "-=0.5")
        .fromTo(".foto-kanan",  { x: 150,  opacity: 0, rotation: 10 },  { x: 0, opacity: 1, rotation: 0, duration: 1 }, "-=0.5")
        .to(".foto-kiri",   { x: 0, opacity: 1, rotation: 0, duration: 1.5 })
        .to(".teks-tengah", { y: 0, opacity: 1, duration: 1.5 }, "<")
        .to(".foto-kanan",  { x: 0, opacity: 1, rotation: 0, duration: 1.5 }, "<")
        .to(".foto-kiri",   { x: -150, opacity: 0, rotation: -10, duration: 1 })
        .to(".teks-tengah", { y: -50,  opacity: 0, duration: 1 }, "<")
        .to(".foto-kanan",  { x: 150,  opacity: 0, rotation: 10, duration: 1 }, "<");
    },
    { scope: container, dependencies: [isLoggedIn] }
  );
}