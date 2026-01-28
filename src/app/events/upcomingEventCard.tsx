"use client";

import React from "react";
import { Calendar, Clock, Mic } from "lucide-react";

interface UpcomingEventProps {
  date: string;
  time: string;
  image: string;
  title: string;
  speaker: string;
  description: string;
}

export default function UpcomingEventCard({
  date,
  time,
  image,
  title,
  speaker,
  description,
}: UpcomingEventProps) {
  // 1. Safer Date Extraction (ESLint & Runtime Friendly)
  const dateParts = String(date).split(" ");
  const day = dateParts[0] || "00";
  const month = (dateParts[1]?.substring(0, 3) || "MAY").toUpperCase();

  return (
    <div className="relative group mx-auto max-w-5xl">
      {/* Background Decorative Element */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-sm blur opacity-10 group-hover:opacity-25 transition duration-1000" />
      
      <div className="relative flex flex-col lg:flex-row bg-[#1a0b35]/50 backdrop-blur-xl border border-white/10 overflow-hidden">
        
        {/* DATE SECTION */}
        {/* Using 'flex' utilities to handle alignment across different screen sizes */}
        <div className="flex flex-row lg:flex-col items-center justify-center bg-purple-600 px-8 py-6 lg:w-32">
          <span className="text-4xl lg:text-5xl font-[1000] tracking-tighter leading-none text-white uppercase">
            {day}
          </span>
          <span className="text-sm lg:text-xl font-black tracking-[0.2em] uppercase text-white/80 lg:mt-2 ml-4 lg:ml-0">
            {month}
          </span>
        </div>

        {/* IMAGE SECTION */}
        <div className="relative lg:w-1/3 aspect-video lg:aspect-auto overflow-hidden border-y lg:border-y-0 lg:border-x border-white/5">
          <img
            src={image}
            alt={`Cover image for ${title}`} // Improved Alt Text for Accessibility
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            loading="lazy" // Performance best practice
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0720]/80 to-transparent lg:hidden" />
        </div>

        {/* CONTENT SECTION */}
        <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-purple-400">
              <Calendar size={14} aria-hidden="true" /> {date}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-purple-400/60">
              <Clock size={14} aria-hidden="true" /> {time}
            </div>
          </div>

          <h2 className="text-3xl lg:text-5xl font-black uppercase italic tracking-tighter leading-[0.9] mb-6 group-hover:text-purple-400 transition-colors">
            {title}
          </h2>

          <div className="flex items-center gap-3 mb-6 bg-white/5 w-fit px-4 py-2 border-l-2 border-purple-500">
            <Mic size={16} className="text-purple-400" aria-hidden="true" />
            <span className="text-xs font-mono uppercase tracking-widest font-bold">
              {speaker}
            </span>
          </div>

          <p className="text-white/50 text-sm leading-relaxed max-w-xl line-clamp-3 lg:line-clamp-none font-sans italic">
            {description}
          </p>
          
          <button 
            type="button" // ESLint rule: buttons should have an explicit type
            className="mt-8 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] group/btn"
          >
            Register Now 
            <span className="w-8 h-[1px] bg-purple-500 group-hover/btn:w-16 transition-all duration-500" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}