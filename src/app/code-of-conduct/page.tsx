"use client";

import React, { useEffect, useRef } from "react";
import { 
  ShieldCheck, 
  MessageSquareWarning, 
  AlertOctagon, 
  Scale, 
  Send 
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CodeOfConduct() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal sections on scroll
      const sections = gsap.utils.toArray<HTMLElement>(".reveal-section");
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main 
      ref={containerRef}
      className="bg-[#0f0720] text-white selection:bg-purple-500 font-sans overflow-x-hidden min-h-screen pt-40 pb-24"
    >
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* 1. HERO HEADER */}
        <header className="mb-32 reveal-section">
          <div className="w-24 h-1 bg-purple-500 mb-8" />
          <span className="text-purple-400 font-mono tracking-[0.4em] text-[10px] uppercase block mb-4">
            Safety // Excellence // Respect
          </span>
          <h1 className="text-[12vw] lg:text-[10vw] font-[1000] leading-[0.8] tracking-[-0.08em] uppercase italic mb-12">
            CODE OF <br />
            <span className="text-transparent stroke-text-white">CONDUCT</span>
            <span className="text-purple-500 not-italic">.</span>
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <p className="lg:col-span-7 text-2xl md:text-3xl font-light text-purple-100/80 leading-tight">
              To ensure diversity remains our strength, we adhere to ground rules that foster a safe, collaborative, and excellent technical space.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* LEFT COLUMN: GUIDELINES */}
          <div className="lg:col-span-7 space-y-32">
            
            {/* PURPOSE SECTION */}
            <section className="reveal-section">
              <div className="flex items-center gap-4 mb-8">
                <ShieldCheck className="text-purple-500" size={32} />
                <h2 className="text-4xl font-black uppercase tracking-tighter italic">Purpose</h2>
              </div>
              <div className="space-y-6 text-xl text-purple-100/60 font-light leading-relaxed">
                <p>
                  The purpose of our Community Code of Conduct is to ensure that all participants in the SLIIT Women In FOSS community have the best possible experience. 
                  We are all here to help each other learn, grow our skill sets, and have a good time!
                </p>
                <p className="border-l-2 border-purple-500/30 pl-8 italic">
                  &quot;Take it in the spirit in which it&apos;s intended — a guide to make it easier to be excellent to one another.&quot;
                </p>
              </div>
            </section>

            {/* EXPECTED BEHAVIOR */}
            <section className="reveal-section">
              <div className="flex items-center gap-4 mb-12">
                <Scale className="text-purple-500" size={32} />
                <h2 className="text-4xl font-black uppercase tracking-tighter italic">Ground Rules</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
                {[
                  { title: "Be Considerate", desc: "Your decisions affect users and colleagues; account for consequences." },
                  { title: "Be Patient", desc: "Empathy is built through patience with others' learning curves." },
                  { title: "Be Respectful", desc: "Foster a safe environment where everyone can express themselves." },
                  { title: "Communicate", desc: "Effective communication builds better working relationships." },
                ].map((item, idx) => (
                  <div key={idx} className="bg-[#0f0720] p-8 hover:bg-white/[0.02] transition-colors group">
                    <h3 className="text-purple-400 font-mono text-xs tracking-widest uppercase mb-4 group-hover:text-purple-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-purple-100/60 font-light leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* UNACCEPTABLE BEHAVIOR */}
            <section className="reveal-section">
              <div className="flex items-center gap-4 mb-8">
                <AlertOctagon className="text-red-500" size={32} />
                <h2 className="text-4xl font-black uppercase tracking-tighter italic">Zero Tolerance</h2>
              </div>
              <ul className="space-y-4">
                {[
                  "Violent threats directed against another person.",
                  "Discriminatory jokes and language.",
                  "Doxing (Posting personally identifiable information).",
                  "Personal insults and harassment.",
                  "Unwelcome sexual attention.",
                ].map((text, idx) => (
                  <li key={idx} className="flex items-center gap-6 p-6 border border-white/5 bg-white/[0.01] hover:border-red-500/30 transition-all group">
                    <span className="text-red-500/40 group-hover:text-red-500 font-mono text-xs">0{idx + 1}</span>
                    <span className="text-xl font-light text-purple-100/70">{text}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* RIGHT COLUMN: REPORTING (STICKY) */}
          <aside className="lg:col-span-5">
            <div className="sticky top-40 space-y-8">
              <div className="p-10 border border-purple-500/20 bg-purple-500/[0.03] backdrop-blur-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <MessageSquareWarning size={120} />
                </div>
                
                <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-6">Reporting Guide</h2>
                <p className="text-purple-100/60 mb-8 leading-relaxed">
                  If you believe someone is violating the code of conduct, report it immediately. We promise to take action within 24 hours.
                </p>

                <div className="space-y-6 mb-10">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">Direct Email</span>
                    <a href="mailto:infowifsliit@gmail.com" className="text-xl font-bold hover:text-purple-400 transition-colors break-all">
                      infowifsliit@gmail.com
                    </a>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-purple-100/40 font-mono uppercase tracking-tight">
                  <p className="">Include in your report:</p>
                  <ul className="space-y-2">
                    <li>• Your contact information</li>
                    <li>• Time and location of incident</li>
                    <li>• Context and specific details</li>
                    <li>• If the incident is ongoing</li>
                  </ul>
                </div>

                <button className="mt-10 w-full flex items-center justify-between p-4 bg-white text-black font-black uppercase tracking-widest text-[11px] group transition-all hover:bg-purple-500 hover:text-white">
                  Report Violation
                  <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* CONSEQUENCES CARD */}
              <div className="p-10 border border-white/5 bg-white/[0.02]">
                <h3 className="text-xs font-mono text-purple-500 uppercase tracking-[0.3em] mb-6">Enforcement</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-end border-b border-white/5 pb-2">
                    <span className="text-purple-100/60 italic font-light">Warning</span>
                    <span className="text-[10px] font-mono opacity-30">LEVEL 01</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/5 pb-2">
                    <span className="text-purple-100/60 italic font-light">Suspension</span>
                    <span className="text-[10px] font-mono opacity-30">LEVEL 02</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/5 pb-2">
                    <span className="text-red-400 italic font-light">Permanent Ban</span>
                    <span className="text-[10px] font-mono opacity-30 text-red-400">FINAL</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style jsx global>{`
        .reveal-section {
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