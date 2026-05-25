"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTACTS } from "@/constants/data";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // 1. Premium Title Animation (dengan Skew Y)
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60, skewY: 3 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 1.2,
          ease: "expo.out", // Ease yang lebih modern (cepat di awal, melambat di akhir)
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      // 2. 3D Card Stagger Animation
      const cards = cardsRef.current?.querySelectorAll(".contact-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { 
            opacity: 0, 
            y: 50, 
            rotationX: -25, // Efek kartu terlipat ke belakang
            transformPerspective: 1000, 
            transformOrigin: "top center" 
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.15, // Jeda kemunculan antar kartu
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            },
            onComplete: () => {
              // 3. Breathing Icons Effect (Berjalan terus-menerus setelah kartu muncul)
              gsap.to(".contact-icon", {
                y: -4,
                duration: 2,
                ease: "sine.inOut",
                yoyo: true, // Bolak-balik
                repeat: -1, // Infinite loop
                stagger: {
                  amount: 1.5,
                  from: "random", // Bikin pergerakan naik-turunnya acak antar icon
                },
              });
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 px-6 md:px-12 overflow-hidden"
    >
      {/* Background decorative line */}
      <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-4xl mx-auto">
        {/* Section label */}
        <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-4 font-medium">
          Contact
        </p>

        {/* Title */}
        <div className="overflow-hidden">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
          >
            Let&apos;s{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
              Connect.
            </span>
          </h2>
        </div>

        <p className="text-white/40 text-base mb-12 max-w-md leading-relaxed">
         Saya terbuka untuk peluang baru, kolaborasi, atau sekadar ngobrol
          soal tech dan desain.
        </p>

        {/* Contact cards grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {CONTACTS.map((contact) => (
            <a
              key={contact.platform}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card group relative flex items-center gap-4 p-5 rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300"
            >
              {/* Icon container - Ditambah class 'contact-icon' untuk target animasi ke-3 */}
              <div
                className="contact-icon w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: contact.iconBg }}
              >
                <img 
                  src={contact.icon} 
                  alt={`${contact.platform} icon`} 
                  className="w-5 h-5 object-contain" 
                />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium leading-none mb-1">
                  {contact.platform}
                </p>
                <p className="text-white/40 text-xs truncate">
                  {contact.handle}
                </p>
              </div>

              {/* Arrow */}
              <svg
                className="w-4 h-4 text-white/20 flex-shrink-0 transition-all duration-300 group-hover:text-white/60 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Background decorative line bottom */}
      <div className="absolute left-0 bottom-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}