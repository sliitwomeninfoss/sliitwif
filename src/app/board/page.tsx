"use client";

import React, { useEffect, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ChevronDown, Facebook, Linkedin } from "lucide-react";
import { rawBoardData, type BoardMember } from "./boardConfig";
import Image from "next/image";

export default function CreativeBoard() {
  const availableYears = useMemo(() => Object.keys(rawBoardData).sort((a, b) => Number(b) - Number(a)), []);
  const [year, setYear] = useState(availableYears[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeMember, setActiveMember] = useState<string | null>(null);

  const getPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const radiusX = 38; 
    const radiusY = 40; 
    return {
      top: `${50 + radiusY * Math.sin(angle)}%`,
      left: `${50 + radiusX * Math.cos(angle)}%`,
    };
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".floating-node", 
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.05, duration: 0.8, ease: "power2.out" }
      );

      // Fix: Cast to HTMLElement[] to avoid 'any' error
      (gsap.utils.toArray(".floating-node") as HTMLElement[]).forEach((node) => {
        gsap.to(node, {
          y: Math.random() * 12 - 6,
          x: Math.random() * 12 - 6,
          duration: 6 + Math.random() * 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });
    });
    return () => ctx.revert();
  }, [year]);

  return (
    <section className="relative bg-[#0f0720] min-h-screen py-20 px-4 overflow-hidden flex items-center justify-center">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          <div className="w-full lg:w-1/3 text-center lg:text-left z-20">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase italic text-white leading-[0.8]">
              THE <br/> <span className="text-transparent stroke-text-purple">CORE</span> <br/> TEAM
            </h2>
            <div className="h-1.5 w-24 bg-purple-500 mt-10 mb-4 mx-auto lg:mx-0" />
          </div>

          <div className="w-full lg:w-2/3 relative h-[600px] md:h-[750px] flex items-center justify-center">
            
            {/* CENTRAL YEAR SELECTOR */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60]">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40 bg-purple-900/40 backdrop-blur-xl border-2 border-purple-500/50 rounded-full text-white hover:bg-purple-500/20 transition-all shadow-2xl"
              >
                <span className="text-[10px] uppercase tracking-[0.3em] text-purple-400 font-bold">Batch</span>
                <span className="text-3xl md:text-4xl font-black">{year}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-28 bg-[#1a0b35] border border-purple-500/30 rounded-xl overflow-hidden shadow-2xl z-[100]">
                  {availableYears.map((y) => (
                    <button key={y} onClick={() => { setYear(y); setIsOpen(false); }} className="w-full py-2 text-white hover:bg-purple-600/40 transition-colors border-b border-purple-500/10 last:border-0 font-bold">
                      {y}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* MEMBER NODES */}
            {rawBoardData[year]?.map((member: BoardMember, index: number) => {
              const pos = getPosition(index, rawBoardData[year].length);
              const isActive = activeMember === member.NAME;

              return (
                <div 
                  key={member.NAME} 
                  className={`floating-node absolute transition-transform duration-500 ease-out ${isActive ? 'z-[70]' : 'z-10'}`}
                  style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)' }}
                  onClick={() => setActiveMember(isActive ? null : member.NAME)}
                >
                  <div className="flex flex-col items-center cursor-pointer">
                    <div className={`relative rounded-full overflow-hidden border-2 h-24 w-24 md:h-32 md:w-32 transition-all duration-300 ${isActive ? 'border-purple-400 scale-110 shadow-[0_0_40px_rgba(168,85,247,0.5)]' : 'border-purple-500/30'}`}>
                      {/* FIX: Using Next.js Image Component */}
                      <Image 
                        src={member.IMAGE_SRC} 
                        alt={member.NAME} 
                        fill
                        sizes="(max-width: 768px) 96px, 128px"
                        className="object-cover"
                        priority={index < 4}
                      />
                      
                      <div className={`absolute inset-0 bg-purple-950/90 backdrop-blur-md flex items-center justify-center gap-4 transition-opacity z-20 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <a href={member.LINKEDIN} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-blue-600 text-white"><Linkedin size={18} /></a>
                        <a href={member.FACEBOOK} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-blue-800 text-white"><Facebook size={18} /></a>
                      </div>
                    </div>

                    <div className={`mt-4 text-center transition-all duration-300 bg-[#1a0b35]/95 backdrop-blur-md p-2 px-4 rounded-full border border-purple-500/30 w-max min-w-[120px] ${isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}`}>
                      <p className="text-white font-bold text-xs md:text-sm uppercase tracking-tight whitespace-nowrap">
                        {member.NAME}
                      </p>
                      <p className="text-purple-400 text-[9px] uppercase tracking-widest mt-0.5 font-medium whitespace-nowrap">
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

      <style jsx>{`
        .stroke-text-purple { color: transparent; -webkit-text-stroke: 1.5px #a855f7; }
      `}</style>
    </section>
  );
}