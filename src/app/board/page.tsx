"use client";

import React, { useState, useMemo } from 'react';
import { Linkedin, Facebook, Instagram, Zap, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import boardData from "./board.json";

// --- Types ---
export interface BoardMember {
  role?: string;
  ROLE?: string;
  name?: string;
  NAME?: string;
  imageSrc?: string;
  IMAGE_SRC?: string;
  facebook?: string;
  FACEBOOK?: string;
  instagram?: string;
  INSTAGRAM?: string;
  linkedin?: string;
  LINKEDIN?: string;
}

const rawBoardData = boardData as Record<string, BoardMember[]>;

export default function BoardPage() {
  const years = useMemo(() => Object.keys(rawBoardData).reverse(), []);
  const [activeYear, setActiveYear] = useState(years[0]);

  return (
    <main className="bg-[#0b041a] text-white selection:bg-purple-500 font-sans min-h-screen pt-32 pb-24 relative overflow-x-hidden">
      
      {/* AMBIENCE */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-purple-600/30 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-[1300px] mx-auto px-8 relative z-10">
        
        <header className="mb-20">
          <div className="w-16 h-1 bg-purple-500 mb-6" />
          <span className="text-purple-400 font-mono tracking-[0.4em] text-[10px] uppercase block mb-3">
            Board Members // Vision
          </span>
          <h1 className="text-[10vw] lg:text-[7vw] font-[1000] leading-[0.8] tracking-[-0.08em] uppercase italic mb-12">
            THE <br />
            <span className="text-transparent stroke-text-white">FORCE</span>
            <span className="text-purple-500 not-italic">.</span>
          </h1>

          <nav className="flex flex-wrap gap-4">
            {years.map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => setActiveYear(year)}
                className={`px-8 py-2.5 transition-all duration-300 ${
                  activeYear === year 
                  ? "bg-white text-black font-black italic uppercase text-xs shadow-lg" 
                  : "bg-white/5 text-white/40 hover:bg-white/10 text-xs uppercase font-bold"
                }`}
              >
                {year}
              </button>
            ))}
          </nav>
        </header>

        {/* SPACED GRID */}
        <div className="flex flex-wrap justify-center gap-y-16 gap-x-10">
          {rawBoardData[activeYear].map((member, index) => {
            const displayRole = member.role || member.ROLE || "";
            const displayName = member.name || member.NAME || "Board Member";
            const imageSrc = member.imageSrc || member.IMAGE_SRC || "#";
            const linkedin = member.linkedin || member.LINKEDIN || "#";
            const facebook = member.facebook || member.FACEBOOK || "#";
            const instagram = member.instagram || member.INSTAGRAM || "#";
            const initials = displayName
              .split(" ")
              .filter(Boolean)
              .map((part) => part[0])
              .join("")
              .slice(0, 2);
            const hasImage = Boolean(imageSrc && imageSrc !== "#");
            const hasLinkedin = Boolean(linkedin && linkedin !== "#");
            const hasFacebook = Boolean(facebook && facebook !== "#");
            const hasInstagram = Boolean(instagram && instagram !== "#");

            return (
              <div 
                key={`${activeYear}-${displayName}-${index}`}
                className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex flex-col group transition-all duration-500 hover:border-purple-500/30 hover:bg-white/[0.04] w-[calc(50%-20px)] md:w-[calc(33.33%-27px)] lg:w-[calc(20%-32px)] max-w-[210px]"
              >
                {/* Image Box - Removed Grayscale */}
                <div className="relative aspect-square rounded-xl overflow-hidden mb-6 shadow-2xl">
                  {hasImage ? (
                    <Image 
                      src={imageSrc} 
                      alt={displayName}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 30vw, 12vw"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-purple-950/60 text-4xl font-black text-white/20">
                      {initials}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
                </div>

              {/* Text Info */}
              <div className="flex flex-col flex-grow text-center">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <Zap size={8} className="text-purple-500 fill-purple-500" />
                  <span className="text-purple-400 font-mono text-[8px] uppercase tracking-[0.2em] leading-none">
                    {displayRole}
                  </span>
                </div>
                
                <h3 className="text-xs md:text-[13px] font-black uppercase italic tracking-tight leading-tight mb-6 min-h-[2.5em] flex items-center justify-center">
                  {displayName}
                </h3>

                {/* Socials - ESLint Friendly (rel="noopener noreferrer") */}
                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex gap-4">
                    {hasLinkedin && (
                      <a 
                        href={linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white/30 hover:text-white transition-colors"
                        aria-label={`${displayName} LinkedIn`}
                      >
                        <Linkedin size={15} />
                      </a>
                    )}
                    {hasFacebook && (
                      <a 
                        href={facebook} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white/30 hover:text-white transition-colors"
                        aria-label={`${displayName} Facebook`}
                      >
                        <Facebook size={15} />
                      </a>
                    )}
                    {hasInstagram && (
                      <a 
                        href={instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white/30 hover:text-white transition-colors"
                        aria-label={`${displayName} Instagram`}
                      >
                        <Instagram size={15} />
                      </a>
                    )}
                  </div>
                  <ArrowUpRight size={12} className="text-white/10 group-hover:text-purple-500 transition-colors" />
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .stroke-text-white {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        }
        @media (min-width: 768px) {
          .stroke-text-white { -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.4); }
        }
      `}</style>
    </main>
  );
}
