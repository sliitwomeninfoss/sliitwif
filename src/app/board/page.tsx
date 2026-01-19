"use client";

import React, { useState, useMemo, useRef } from "react";
import { ChevronDown, Facebook, Linkedin } from "lucide-react";
import { rawBoardData, type BoardMember } from "./boardConfig";
import Image from "next/image";

export default function CreativeBoard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const availableYears = useMemo(() => Object.keys(rawBoardData).sort((a, b) => Number(b) - Number(a)), []);
  
  const [year, setYear] = useState(availableYears[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeMember, setActiveMember] = useState<string | null>(null);

  const getPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const radiusX = 28; 
    const radiusY = 30; 
    return {
      top: `${50 + radiusY * Math.sin(angle)}%`,
      left: `${50 + radiusX * Math.cos(angle)}%`,
    };
  };

  return (
    <main ref={containerRef} className="bg-[#0f0720] text-white selection:bg-purple-500 font-sans overflow-x-hidden min-h-screen pt-40 pb-24 relative border-none">
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          
          <header className="w-full lg:w-1/3">
            <div className="w-24 h-1 bg-purple-500 mb-8" />
            <span className="text-purple-400 font-mono tracking-[0.4em] text-[10px] uppercase block mb-4">
              Leadership // Vision // Community
            </span>
            <h2 className="text-[10vw] lg:text-[7vw] font-[1000] leading-[0.8] tracking-[-0.08em] uppercase italic mb-8">
              THE <br />
              <span className="text-transparent stroke-text-white">CORE</span> <br />
              TEAM<span className="text-purple-500 not-italic">.</span>
            </h2>
            <p className="text-purple-100/50 font-light leading-relaxed max-w-sm">
              The driving force behind the SLIIT Women In FOSS community, dedicated to open-source excellence and empowerment.
            </p>
          </header>

          <div className="w-full lg:w-2/3 relative h-[600px] md:h-[800px] flex items-center justify-center">
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60]">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40 bg-purple-900/20 backdrop-blur-xl border border-purple-500/30 rounded-full text-white hover:border-purple-500 transition-all shadow-2xl active:scale-95"
              >
                <span className="text-[9px] uppercase tracking-[0.4em] text-purple-400 font-mono mb-1"></span>
                <span className="text-3xl md:text-4xl font-black italic tracking-tighter">{year}</span>
                <ChevronDown className={`w-4 h-4 mt-2 text-purple-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
              </button>

              {isOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-32 bg-[#1a0b35] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-[100]">
                  {availableYears.map((y) => (
                    <button 
                      key={y} 
                      onClick={() => { setYear(y); setIsOpen(false); }} 
                      className="w-full py-3 text-sm text-white hover:bg-purple-600 transition-colors border-b border-white/5 last:border-0 font-bold uppercase tracking-widest"
                    >
                      {y}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {rawBoardData[year]?.map((member: BoardMember, index: number) => {
              const pos = getPosition(index, rawBoardData[year].length);
              const isActive = activeMember === member.NAME;

              return (
                <div 
                  key={member.NAME} 
                  className={`absolute transition-all duration-300 animate-bloom ${isActive ? "z-[70]" : "z-10"}`}
                  style={{ 
                    top: pos.top, 
                    left: pos.left, 
                    transform: "translate(-50%, -50%)",
                    animationDelay: `${index * 0.08}s` 
                  } as React.CSSProperties}
                  onClick={() => setActiveMember(isActive ? null : member.NAME)}
                >
                  <div className="flex flex-col items-center cursor-pointer">
                    <div className={`relative rounded-full overflow-hidden border transition-all duration-300 h-16 w-16 md:h-24 md:w-24 ${isActive ? "border-purple-400 scale-125 shadow-[0_0_30px_rgba(168,85,247,0.4)]" : "border-white/10 hover:border-purple-500/50 hover:scale-105"}`}>
                      <Image 
                        src={member.IMAGE_SRC} 
                        alt={member.NAME} 
                        fill
                        sizes="(max-width: 768px) 64px, 96px"
                        className="object-cover"
                        priority={index < 4}
                      />
                      
                      <div className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-3 transition-opacity z-20 ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                        <a href={member.LINKEDIN} target="_blank" rel="noopener noreferrer" className="p-2 bg-white text-black rounded-full hover:bg-purple-500 hover:text-white transition-colors"><Linkedin size={12} /></a>
                        <a href={member.FACEBOOK} target="_blank" rel="noopener noreferrer" className="p-2 bg-white text-black rounded-full hover:bg-purple-500 hover:text-white transition-colors"><Facebook size={12} /></a>
                      </div>
                    </div>

                    <div className={`mt-4 text-center transition-all duration-300 bg-white text-black p-1 px-3 italic font-black uppercase tracking-tighter w-max min-w-[100px] ${isActive ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-95 pointer-events-none"}`}>
                      <p className="text-[9px] md:text-xs whitespace-nowrap">
                        {member.NAME}
                      </p>
                      <p className="text-[7px] tracking-[0.2em] mt-0.5 font-mono text-purple-600 block not-italic">
                        {member.ROLE}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .stroke-text-white {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.8);
        }
        @keyframes bloom {
          0% { 
            opacity: 0; 
            margin-top: calc(50% - var(--target-top, 50%));
            margin-left: calc(50% - var(--target-left, 50%));
            transform: translate(-50%, -50%) scale(0);
          }
          100% { 
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        .animate-bloom {
          opacity: 0;
          animation: bloom 0.7s cubic-bezier(0.2, 1, 0.3, 1) forwards;
        }
        @media (min-width: 768px) {
          .stroke-text-white { -webkit-text-stroke: 2px white; }
        }
      `}</style>
    </main>
  );
}