"use client";

import React, { useEffect, useRef } from "react";
import { Eye, Target, Compass } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Pillar {
  id: string;
  tag: string;
  title: string;
  icon: React.ElementType;
  description: string;
}

// DEFINING OUTSIDE THE COMPONENT:
// This is the most ESLint-friendly way to handle static data. 
// It prevents the need for useMemo and keeps useEffect dependencies clean.
const PILLARS_DATA: Pillar[] = [
  {
    id: "01",
    tag: "VISION_CORE",
    title: "Vision",
    icon: Eye,
    description:
      "Women In FOSS is an all girls society with its members being female students from the Faculty of Computing of SLIIT. The society provides a supportive environment to help girls grow as professionals in the field of IT.",
  },
  {
    id: "02",
    tag: "MISSION_GOAL",
    title: "Mission",
    icon: Target,
    description:
      "The purpose of the SLIIT Women In FOSS Community is to empower the potential and the contribution of women towards Free/Open-Source Software by providing opportunities and encouraging active engagement.",
  },
  {
    id: "03",
    tag: "STRATEGY_PLAN",
    title: "Strategy",
    icon: Compass,
    description:
      "Infrastructural and consulting support for FOSS-related initiatives in Sri Lanka. Helping women in tech to develop their technical skills and professional personalities.",
  },
];

export default function AboutUsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if device is mobile
    const isMobile = window.innerWidth < 768;
    
    // gsap.context handles scoping and automatic cleanup of ScrollTriggers
    const ctx = gsap.context(() => {
      const pillarItems = gsap.utils.toArray<HTMLElement>(".pillar-reveal");

      pillarItems.forEach((el) => {
        gsap.fromTo(
          el,
          { 
            y: isMobile ? 20 : 50, // Reduced movement on mobile
            opacity: 0 
          },
          {
            y: 0,
            opacity: 1,
            duration: isMobile ? 0.6 : 1, // Faster animation on mobile
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: isMobile ? "top 95%" : "top 90%", // Earlier trigger on mobile
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef); // Scopes selectors like ".pillar-reveal" to this ref only

    return () => ctx.revert(); // Essential for React 18 Strict Mode
  }, []); // Empty dependency array is now safe because PILLARS_DATA is external

  return (
    <main 
      ref={containerRef}
      className="bg-[#0f0720] text-white selection:bg-purple-500 font-sans overflow-x-hidden min-h-screen relative"
    >
      {/* 1. EDITORIAL HEADER SECTION */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 md:px-6 border-b border-white/5">
        <div className="absolute top-10 -left-5 text-[25vw] font-[1000] text-white/[0.02] select-none leading-none tracking-tighter pointer-events-none uppercase hidden sm:block">
          FOSS
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="relative mb-12 md:mb-16">
            <div className="w-16 md:w-24 h-1 bg-purple-500 mb-6 md:mb-8" />
            <span className="text-purple-400 font-mono tracking-[0.3em] text-[9px] md:text-[10px] uppercase block mb-4">
              Identity // Est. 2018
            </span>
            <h1 className="text-7xl sm:text-8xl md:text-[11vw] font-[1000] leading-[0.85] md:leading-[0.75] tracking-[-0.05em] uppercase italic">
              THE <br />
              <span className="text-transparent stroke-text-white">PILLARS</span>
              <span className="text-purple-500 not-italic">.</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-end">
            <div className="lg:col-span-7">
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[1000] leading-tight md:leading-[0.9] tracking-tighter uppercase">
                Redefining the{" "}
                <span className="italic font-serif text-purple-400 lowercase font-light">
                  technical
                </span>{" "}
                landscape at SLIIT.
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-base md:text-lg leading-relaxed text-purple-100/60 font-light italic border-l border-purple-500/30 pl-4 md:pl-6">
                Beyond the code lies a foundation of vision designed to uplift
                female developers across the nation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PILLARS SECTION */}
      <section className="relative py-12 md:py-24 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          {PILLARS_DATA.map((pillar) => (
            <div
              key={pillar.id}
              className="pillar-reveal group relative border-b border-white/10 py-10 md:py-16 hover:bg-white/[0.01] transition-colors duration-500"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
                <div className="lg:col-span-2 flex lg:block items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-purple-500 block mb-1 tracking-[0.2em] uppercase">
                      {pillar.tag}
                    </span>
                    <span className="text-4xl md:text-6xl font-[1000] text-white/10 group-hover:text-purple-500/20 transition-colors">
                      {pillar.id}
                    </span>
                  </div>
                  <div className="lg:hidden w-10 h-10 bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <pillar.icon size={20} strokeWidth={1.5} />
                  </div>
                </div>

                <div className="lg:col-span-4 flex items-center gap-4 md:gap-6">
                  <div className="hidden lg:flex w-12 h-12 bg-purple-600/10 border border-purple-500/20 items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    <pillar.icon size={24} strokeWidth={1.5} />
                  </div>
                  <h2 className="text-4xl sm:text-5xl md:text-7xl font-[1000] uppercase tracking-tighter leading-none">
                    {pillar.title}
                  </h2>
                </div>

                <div className="lg:col-span-6 lg:pt-2">
                  <p className="text-lg md:text-2xl text-purple-100/60 font-light leading-snug max-w-2xl">
                    {pillar.description}
                  </p>
                </div>
              </div>
              <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/0 to-purple-600/0 group-hover:from-purple-600/[0.03] transition-all duration-700 pointer-events-none" />
            </div>
          ))}
        </div>
      </section>

      <style jsx global>{`
        .pillar-reveal {
          opacity: 0;
          will-change: transform, opacity;
        }

        .stroke-text-white {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.6);
        }

        @media (min-width: 768px) {
          .stroke-text-white {
            -webkit-text-stroke: 2px white;
          }
        }
      `}</style>
    </main>
  );
}