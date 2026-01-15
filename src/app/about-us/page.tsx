"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { Eye, Target, Compass } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register ScrollTrigger only on the client side
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

export default function AboutUsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoize pillars to prevent unnecessary effect re-runs and satisfy ESLint deps
  const pillars: Pillar[] = useMemo(
    () => [
      {
        id: "01",
        tag: "VISION_CORE",
        title: "Vision",
        icon: Eye,
        description:
          "Women In FOSS is an all girls society with its members being female students from the Faculty of Computing of SLIIT. The society provides a supportive environment to help girls grow as professionals in the field of IT with attention to Free/Open-Source Software.",
      },
      {
        id: "02",
        tag: "MISSION_GOAL",
        title: "Mission",
        icon: Target,
        description:
          "The purpose of the SLIIT Women In FOSS Community is to empower the potential and the contribution of women towards Free/Open-Source Software by providing opportunities and encouraging women to actively engage in Free/Open-Source Software development.",
      },
      {
        id: "03",
        tag: "STRATEGY_PLAN",
        title: "Strategy",
        icon: Compass,
        description:
          "Infrastructural and consulting support for FOSS-related initiatives and groups in Sri Lanka. And to help women in the field of tech to develop their personalities.",
      },
    ],
    []
  );

  useEffect(() => {
    // gsap.context handles scoping and easy cleanup
    const ctx = gsap.context(() => {
      const pillarItems = gsap.utils.toArray<HTMLElement>(".pillar-reveal");

      pillarItems.forEach((el) => {
        gsap.fromTo(
          el,
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef); // Scope selectors to this container

    return () => ctx.revert(); // Clean up animations on unmount
  }, [pillars]);

  return (
    <main 
      ref={containerRef}
      className="bg-[#0f0720] text-white selection:bg-purple-500 font-sans overflow-x-hidden min-h-screen relative"
    >
      {/* 1. EDITORIAL HEADER SECTION */}
      <section className="relative pt-32 pb-24 px-6 border-b border-white/5">
        <div className="absolute top-20 -left-10 text-[20vw] font-[1000] text-white/[0.02] select-none leading-none tracking-tighter pointer-events-none uppercase">
          Foundation
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="relative mb-16">
            <div className="w-24 h-1 bg-purple-500 mb-8" />
            <span className="text-purple-400 font-mono tracking-[0.4em] text-[10px] uppercase block mb-4">
              Identity // Est. 2018
            </span>
            <h1 className="text-[14vw] lg:text-[11vw] font-[1000] leading-[0.75] tracking-[-0.08em] uppercase italic">
              THE <br />
              <span className="text-transparent stroke-text-white">PILLARS</span>
              <span className="text-purple-500 not-italic">.</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <p className="text-3xl md:text-5xl lg:text-6xl font-[1000] leading-[0.9] tracking-tighter uppercase">
                Redefining the{" "}
                <span className="italic font-serif text-purple-400 lowercase font-light">
                  technical
                </span>{" "}
                landscape at SLIIT.
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-lg leading-relaxed text-purple-100/60 font-light italic border-l border-purple-500/30 pl-6">
                Beyond the code lies a foundation of vision designed to uplift
                female developers across the nation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PILLARS SECTION */}
      <section className="relative py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="pillar-reveal group relative border-b border-white/10 py-16 hover:bg-white/[0.01] transition-colors duration-500"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* ID & TAG */}
                <div className="lg:col-span-2">
                  <span className="text-xs font-mono text-purple-500 block mb-2 tracking-[0.3em] uppercase">
                    {pillar.tag}
                  </span>
                  <span className="text-6xl font-[1000] text-white/10 group-hover:text-purple-500/20 transition-colors">
                    {pillar.id}
                  </span>
                </div>

                {/* ICON & TITLE */}
                <div className="lg:col-span-4 flex items-center gap-6">
                  <div className="w-12 h-12 bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    <pillar.icon size={24} strokeWidth={1.5} />
                  </div>
                  <h2 className="text-5xl md:text-7xl font-[1000] uppercase tracking-tighter leading-none">
                    {pillar.title}
                  </h2>
                </div>

                {/* DESCRIPTION */}
                <div className="lg:col-span-6 lg:pt-2">
                  <p className="text-xl md:text-2xl text-purple-100/60 font-light leading-snug max-w-2xl">
                    {pillar.description}
                  </p>
                </div>
              </div>

              {/* HOVER GLOW EFFECT */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/0 to-purple-600/0 group-hover:from-purple-600/[0.03] transition-all duration-700 pointer-events-none" />
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
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.8);
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