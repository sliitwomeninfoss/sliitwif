"use client";

import React from "react";
import { 
  ShieldCheck, Sparkles, ChevronRight,
  Fingerprint, AlertTriangle, Activity
} from "lucide-react";

export default function MediumCompetitionPage() {
  const RULES = [
    "AUTHENTICITY: MUST BE ORIGINAL WORK. NO PLAGIARISM.",
    "THEME: FOCUS ON WOMEN IN FOSS OR TECH EMPOWERMENT.",
    "PLATFORM: MUST BE PUBLISHED ON MEDIUM.COM.",
    "TAGGING: USE #SLIITWIF AND #WOMENINTECH TAGS.",
    "TIMELINE: ARTICLES MUST BE PUBLISHED ON OR AFTER 1ST OF MARCH 2026.",
    "DEADLINE: ALL ARTICLES MUST BE SUBMITTED VIA THE FORM BY 15TH OF MARCH 2026.",
  ];

  return (
    <main className="bg-[#0d0b14] text-white selection:bg-purple-500 font-sans min-h-screen pt-32 pb-24 relative overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-600/10 blur-[150px] rounded-full" />
        <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1300px] mx-auto px-8 relative z-10">
        {/* --- THE GRAND REVEAL SECTION --- */}
        <section className="mb-24 relative overflow-hidden">
          <div className="pt-8 text-center">
            <h3 className="text-purple-500 font-mono text-[10px] tracking-[0.6em] uppercase mb-6 flex justify-center items-center gap-4 animate-flicker">
              <Sparkles size={14} aria-hidden="true" /> Incoming_Transmission <Sparkles size={14} aria-hidden="true" />
            </h3>
            
            <h2 className="text-[8vw] lg:text-[7vw] font-[1000] uppercase italic leading-none tracking-tighter mb-12">
              THE FINAL <br /> 
              <span className="text-transparent stroke-text-white animate-glitch-blink">UNVEILING</span>
              <span className="text-purple-500 not-italic">.</span>
            </h2>

            <div className="max-w-4xl mx-auto bg-white/[0.03] border border-white/10 rounded-[2rem] p-12 backdrop-blur-xl relative overflow-hidden border-t-purple-500/50">
              <div className="grid md:grid-cols-2 gap-12 items-center text-left">
                <div className="space-y-6">
                  <p className="text-2xl font-black italic uppercase leading-[1.1] tracking-tight">
                    Winning entries are just the beginning. 
                    Your words will soon be 
                    <span className="text-purple-500"> Recognized.</span>
                  </p>
                </div>

                {/* THE BLINKING DATA BOX */}
                <div className="relative p-8 rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden min-h-[200px] flex flex-col justify-center">
                  <div className="absolute inset-0 z-20 pointer-events-none bg-purple-500/5 animate-glitch-blink border-2 border-purple-500/20" />
                  
                  <div className="relative z-10 space-y-4">
                    <div className="flex justify-between font-mono text-[10px] text-purple-400">
                      <span className="animate-flicker">LOCATION_ID:</span>
                      <span className="bg-purple-500 text-black px-1 animate-pulse">REDACTED</span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="h-8 w-full bg-white/10 animate-pulse relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center px-4 font-black italic uppercase text-white/20 tracking-widest text-xl">
                          DECRYPTING...
                        </div>
                      </div>
                      <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] animate-flicker">
                        Syncing with Women&apos;s Day 2026
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-purple-500 mb-2">
                        <AlertTriangle size={14} className="animate-bounce" aria-hidden="true" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Protocol Locked</span>
                      </div>
                      <p className="text-[11px] font-medium text-white/50 italic uppercase leading-tight">
                        The physical manifest will be revealed Soon. Stand by for final coordinates.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 h-1 w-full bg-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-purple-500 w-1/4 animate-scan" />
              </div>
            </div>
          </div>
        </section>
        
        {/* HEADER */}
        <header className="mb-24 relative">
          <div className="w-24 h-[2px] bg-purple-500 mb-8" />
          <span className="text-purple-400 font-mono tracking-[0.5em] text-[10px] uppercase block mb-4 animate-flicker">
            Phase_02 // Content_Manifesto
          </span>
          <h1 className="text-[11vw] lg:text-[9vw] font-[1000] leading-[0.8] tracking-[-0.08em] uppercase italic text-white">
            ARCHITECTS <br /> 
            <span className="outlined-text">OF INFLUENCE</span><span className="text-purple-500 not-italic">.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-xl font-bold uppercase italic text-white/70 leading-tight">
            The industry is quiet; it&apos;s time to create some noise. 
            Document your story and secure your place in the WIF Evolution.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
          {/* LEFT COLUMN: INTEL */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white/[0.03] border border-white/10 p-8 rounded-2xl backdrop-blur-sm h-full flex flex-col">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-purple-400 mb-8 flex items-center gap-2">
                <Activity size={14} className="animate-pulse" aria-hidden="true" /> Briefing_Note
              </h2>
              
              <div className="mb-10 p-4 border-l-2 border-purple-500/30 bg-purple-500/5">
                <p className="text-xs font-bold text-purple-400 uppercase mb-2">Why Medium?</p>
                <p className="text-sm text-white/60 leading-relaxed italic">
                  Medium is a global stage. This competition isn&apos;t just a contest; it&apos;s a &quot;Proof of Work&quot; for your career. Your voice becomes searchable, shareable, and permanent.
                </p>
              </div>

              <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-purple-400 mb-6 flex items-center gap-2">
                <ShieldCheck size={14} aria-hidden="true" /> Submission Rules
              </h2>
              <div className="space-y-6 flex-grow">
                {RULES.map((rule, idx) => (
                  <div key={`rule-${idx}`} className="group">
                    <p className="text-[10px] font-mono text-white/30 mb-1 font-bold">PROTOCOL_0{idx + 1}</p>
                    <p className="text-sm font-black uppercase italic tracking-wide group-hover:text-purple-400 transition-colors">
                      {rule}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: UPLINK */}
          <div className="lg:col-span-8 group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[3rem] blur opacity-10" />
            <div className="relative h-full bg-white/[0.02] border border-white/10 p-10 lg:p-16 rounded-[3rem] overflow-hidden backdrop-blur-md">
              <div className="flex flex-col h-full justify-between relative z-10">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500">
                      <Fingerprint size={32} className="animate-flicker" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-[1000] uppercase italic tracking-tighter">Transmission Portal</h2>
                      <p className="font-mono text-[9px] text-purple-400 uppercase tracking-[0.4em]">Uplink_Status: Stable</p>
                    </div>
                  </div>
                  <div className="space-y-8 mt-12">
                    <p className="text-3xl lg:text-4xl font-black uppercase italic leading-[1.1]">
                      READY TO UPLINK <br /> 
                      YOUR <span className="text-purple-500">MANIFESTO?</span>
                    </p>
                  </div>
                </div>

                <div className="mt-16">
                  <a 
                    href="https://forms.gle/QFKJE49p99mVrEnS8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex w-full group/btn relative items-center justify-between bg-white p-8 text-black transition-all hover:bg-purple-600 hover:text-white rounded-2xl"
                  >
                    <span className="relative z-10 font-[1000] uppercase italic tracking-[0.2em] text-xl lg:text-2xl flex items-center gap-4">
                      Initiate Submission
                    </span>
                    <ChevronRight className="relative z-10 group-hover/btn:translate-x-2 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .outlined-text {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.6);
        }
        .stroke-text-white {
          -webkit-text-stroke: 1px white;
        }
        
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
          55% { opacity: 0.9; }
          60% { opacity: 0.1; }
        }

        @keyframes glitch-blink {
          0% { opacity: 1; filter: brightness(1); }
          5% { opacity: 0.5; filter: brightness(2); }
          10% { opacity: 1; }
          15% { opacity: 0.8; }
          20% { opacity: 1; }
          90% { opacity: 1; }
          95% { opacity: 0.2; }
        }

        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }

        .animate-flicker { animation: flicker 3s linear infinite; }
        .animate-glitch-blink { animation: glitch-blink 0.8s ease-in-out infinite; }
        .animate-scan { animation: scan 2s linear infinite; }
      `}</style>
    </main>
  );
}