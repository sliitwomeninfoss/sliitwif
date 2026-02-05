"use client";

import React, { useEffect, useRef } from "react";
import { 
  ShieldCheck, 
  Send,
  Gavel,
  Clock,
  UserCheck,
  Search
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BEHAVIOR_DATA = [
  { id: "01", title: "Be Considerate", tag: "EMPATHY", desc: "Your work affects users and colleagues. Take consequences into account when making decisions." },
  { id: "02", title: "Be Patient", tag: "GROWTH", desc: "Patience helps build empathy towards others within the learning environment." },
  { id: "03", title: "Be Respectful", tag: "SAFETY", desc: "Respect helps us feel safe and empowered to express our ideas freely." },
  { id: "04", title: "Be Nice", tag: "KINDNESS", desc: "Treat others as you would like to be treated in your quest for knowledge." },
  { id: "05", title: "Communicate", tag: "CLARITY", desc: "Effective communication fosters good working relationships with all peers." },
  { id: "06", title: "Ask for Help", tag: "SUPPORT", desc: "Don't be afraid to ask for help when unsure; we learn together." },
];

export default function CodeOfConduct() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    
    const ctx = gsap.context(() => {
      // Main reveal sections
      const reveals = gsap.utils.toArray<HTMLElement>(".reveal-section");
      reveals.forEach((el) => {
        gsap.fromTo(el, 
          { opacity: 0, y: isMobile ? 30 : 50 }, 
          {
            opacity: 1, 
            y: 0, 
            duration: isMobile ? 0.7 : 1, 
            ease: "expo.out",
            scrollTrigger: { 
              trigger: el, 
              start: isMobile ? "top 92%" : "top 85%", 
              toggleActions: "play none none none" 
            }
          }
        );
      });

      // Behavior cards stagger animation
      const behaviorCards = gsap.utils.toArray<HTMLElement>(".behavior-card");
      behaviorCards.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, scale: 0.9, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: isMobile ? 0.5 : 0.8,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              start: isMobile ? "top 95%" : "top 90%",
              toggleActions: "play none none none"
            },
            delay: isMobile ? index * 0.05 : index * 0.1
          }
        );
      });

      // Reporting section elements
      const reportingElements = gsap.utils.toArray<HTMLElement>(".reporting-element");
      reportingElements.forEach((el, index) => {
        gsap.fromTo(el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              toggleActions: "play none none none"
            },
            delay: index * 0.15
          }
        );
      });

      // Mobile interactions
      if (isMobile) {
        behaviorCards.forEach((card) => {
          const startScale = () => gsap.to(card, { scale: 0.98, duration: 0.1 });
          const endScale = () => gsap.to(card, { scale: 1, duration: 0.2, ease: "back.out(2)" });
          
          card.addEventListener("touchstart", startScale);
          card.addEventListener("touchend", endScale);
        });
      }

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-[#0f0720] text-white selection:bg-purple-500 font-sans overflow-x-hidden min-h-screen pt-40 pb-24">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        <header className="mb-24 reveal-section">
          <div className="w-24 h-1 bg-purple-500 mb-8" />
          <span className="text-purple-400 font-mono tracking-[0.4em] text-[10px] uppercase block mb-4">
            Safety // Excellence // Respect
          </span>
          <h1 className="text-[12vw] lg:text-[10vw] font-[1000] leading-[0.8] tracking-[-0.08em] uppercase italic mb-12">
            CODE OF <br />
            <span className="text-transparent stroke-text-white">CONDUCT</span>
            <span className="text-purple-500 not-italic">.</span>
          </h1>
        </header>

        <section className="reveal-section mb-40 border-l border-purple-500/30 pl-8 md:pl-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-3">
               <ShieldCheck className="text-purple-500 mb-6" size={56} />
               <p className="text-[10px] font-mono text-purple-400 uppercase tracking-widest leading-loose">
                 Scope: Forums, Wiki, Repositories, IRC, Private Correspondence, and Public Meetings.
               </p>
            </div>
            <div className="lg:col-span-9">
              <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8 leading-none">
                Ensure <span className="text-purple-400">excellence</span> in <br className="hidden md:block" /> every interaction.
              </h2>
              <div className="space-y-6 text-xl md:text-3xl font-light text-purple-100/60 leading-tight max-w-5xl">
                <p>
                  The purpose of our Code of Conduct is to ensure all participants have the best possible experience. 
                  Diversity is our strength, but it requires ground rules to ensure we remain an excellent space for collaboration.
                </p>
                <p className="text-lg md:text-xl italic border-t border-white/10 pt-6">
                  &quot;Take it in the spirit in which it&apos;s intended a guide to make it easier to be excellent to one another. Follow it in spirit as much as in the letter.&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="reveal-section mb-40">
          <div className="flex items-center gap-4 mb-12">
            <UserCheck size={32} className="text-purple-500" />
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">Expected Behavior</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {BEHAVIOR_DATA.map((item) => (
              <div key={item.id} className="behavior-card p-10 bg-[#0f0720] md:hover:bg-white/[0.02] transition-colors group active:bg-white/[0.03] touch-manipulation">
                <span className="text-[10px] font-mono text-purple-500 block mb-4 tracking-widest uppercase">
                  {item.tag} {" // "} {item.id}
                </span>
                <h3 className="text-2xl font-black uppercase italic mb-4 md:group-hover:text-purple-400 transition-colors">{item.title}</h3>
                <p className="text-purple-100/50 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>


      </div>

      <style jsx global>{`
        .reveal-section { will-change: transform, opacity; }
        .behavior-card { will-change: transform, opacity; }
        .reporting-element { will-change: transform, opacity; }
        
        .stroke-text-white {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.8);
        }
        @media (min-width: 768px) {
          .stroke-text-white { -webkit-text-stroke: 2px white; }
        }

        @media (max-width: 767px) {
          .behavior-card {
            -webkit-tap-highlight-color: transparent;
          }
        }
      `}</style>
    </main>
  );
}