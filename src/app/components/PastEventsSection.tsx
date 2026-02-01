"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Mic } from "lucide-react";
import eventsData from "../events/Events.json";

// GSAP Import
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PAST_EVENTS = (eventsData.Events || []).slice(0, 5);

export default function PastEventsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Create a context to handle scope and cleanup automatically
    const ctx = gsap.context(() => {
      
      // 1. Reveal Header
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

      // 2. Staggered reveal for cards
      gsap.from(".event-card", {
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

    }, containerRef); // Scope all selectors to the containerRef

    return () => ctx.revert(); // Cleanup: kills animations and triggers on unmount
  }, []);

  return (
    <section ref={containerRef} className="bg-[#0f0720] py-12 border-t border-white/5 overflow-hidden">
      <div className="px-6 md:px-12">
        {/* Magazine Header */}
        <div className="section-header flex items-baseline justify-between mb-8 border-b border-white/10 pb-4">
          <div>
            <p className="text-purple-500 font-mono text-[10px] tracking-[0.3em] uppercase mb-1">Archive_Vol.01</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white">
              Past <span className="text-purple-500">Events</span>
            </h2>
          </div>
        </div>

        {/* The Scroll Track */}
        <div className="scroll-track flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory">
          {PAST_EVENTS.map((event, i) => (
            <div 
              key={`${event.title}-${i}`} 
              className="event-card min-w-[280px] md:min-w-[320px] snap-start group"
            >
              <div className="relative h-48 mb-4 overflow-hidden bg-purple-900/20">
                <div className="absolute top-3 left-3 z-10 bg-white text-black px-2 py-1 text-[10px] font-black uppercase italic shadow-lg">
                  {event.date}
                </div>
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mic size={12} className="text-purple-500" />
                  <span className="text-[10px] font-mono font-bold text-purple-300 uppercase tracking-tight">
                    {event.speaker}
                  </span>
                </div>
                <h3 className="text-xl font-black uppercase leading-[0.9] text-white tracking-tighter group-hover:text-purple-400 transition-colors">
                  {event.title}
                </h3>
                <p className="text-white/50 text-xs leading-relaxed line-clamp-2 font-light italic">
                  {event.description}
                </p>
              </div>
            </div>
          ))}

          <Link
            href="/events"
            className="event-card min-w-[200px] flex items-center justify-center border-2 border-dashed border-white/10 group hover:border-purple-500/50 transition-colors cursor-pointer"
          >
            <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-purple-400">
                Full<br />Archive
              </p>
              <ArrowRight className="mx-auto mt-2 text-white/10 group-hover:text-purple-400" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}