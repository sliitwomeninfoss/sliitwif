"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Youtube, Play } from "lucide-react";
import webinarsData from "../events/Webinars.json";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface WebinarItem {
  title: string;
  image: string;
  youtube_link: string;
}

// Newest first, limit to 5
const PAST_WEBINARS: WebinarItem[] = (webinarsData.Webinars || []).slice(0, 5);

export default function PastWebinarsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".section-header", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".section-header",
          start: "top 90%",
        },
      });

      gsap.from(".webinar-card", {
        x: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".scroll-track",
          start: "top 85%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-[#0f0720] py-16 md:py-24 border-t border-white/5 overflow-hidden"
    >
      <div className="px-4 md:px-12">
        {/* Header */}
        <div className="section-header flex flex-col md:flex-row md:items-baseline justify-between mb-10 border-b border-white/10 pb-6">
          <div>
            <p className="text-purple-500 font-mono text-[10px] tracking-[0.3em] uppercase mb-1">
              Archive_Vol.02
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white">
              Past <span className="text-purple-500">Webinars</span>
            </h2>
          </div>
        </div>

        {/* Scroll Track */}
        <div className="scroll-track flex gap-4 md:gap-8 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory px-2">
          {PAST_WEBINARS.map((webinar) => (
            <a
              key={webinar.youtube_link} // ✅ unique key
              href={webinar.youtube_link}
              target="_blank"
              rel="noopener noreferrer"
              className="webinar-card min-w-[75vw] sm:min-w-[300px] md:min-w-[350px] snap-center md:snap-start group"
            >
              <div className="relative h-44 md:h-56 mb-5 overflow-hidden bg-purple-900/20 rounded-sm">
                <img
                  src={webinar.image}
                  alt={webinar.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100"
                  loading="lazy"
                />

                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <Play size={42} className="text-white" />
                </div>
              </div>

              <div className="space-y-3 px-1">
                <div className="flex items-center gap-2 text-purple-400">
                  <Youtube size={14} />
                  <span className="text-[10px] font-mono uppercase tracking-widest">
                    Webinar
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-black uppercase leading-[0.9] text-white tracking-tighter group-hover:text-purple-400 transition-colors">
                  {webinar.title}
                </h3>

                <p className="text-white/40 text-xs italic">
                  Watch on YouTube →
                </p>
              </div>
            </a>
          ))}

          {/* View All */}
          <Link
            href="/events"
            className="webinar-card min-w-[60vw] sm:min-w-[200px] flex items-center justify-center border border-dashed border-white/10 group hover:border-purple-500/50 transition-colors snap-center"
          >
            <div className="text-center p-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-purple-400">
                Full<br /> Archive
              </p>
              <div className="mt-4 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center mx-auto group-hover:border-purple-500 transition-colors">
                <ArrowRight size={18} className="text-white/20 group-hover:text-purple-400" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
