'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import PastEventsSection from "./PastEventsSection";
import WEBINARSection from "./PastWebinars";
import BLOGSSection from "./PastBlogs";
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WomenInFOSS() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const upperTextRef = useRef<HTMLDivElement>(null);
  const lowerTextRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const magSectionRef = useRef<HTMLElement>(null);
  const mascotImgRef = useRef<HTMLImageElement>(null);

  // New state to prevent the "Flash of Unwanted Content"
  const [hasRevealed, setHasRevealed] = useState<boolean | null>(null);

  useEffect(() => {
    // 1. Check session storage immediately on mount
    const checkReveal = sessionStorage.getItem('wif_hero_revealed') === 'true';
    setHasRevealed(checkReveal);

    const ctx = gsap.context(() => {
      // 2. Background Grid Animation (Always runs)
      gsap.to(gridRef.current, {
        y: -60,
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // 3. Mascot Float (Always runs)
      if (mascotImgRef.current) {
        gsap.to(mascotImgRef.current, {
          y: -20,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        });
      }

      // 4. Hero Reveal Logic
      if (!checkReveal) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=150%',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onLeave: () => {
              sessionStorage.setItem('wif_hero_revealed', 'true');
              // We don't force a state change here to avoid a re-render 
              // mid-scroll, but the session is set for the next visit.
            }
          }
        });

        tl.to(heroRef.current, {
          clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0 0%, 0 100%, 100% 100%, 100% 100%, 0 100%)',
          ease: 'power2.inOut',
          duration: 1
        }, 0);

        tl.to(upperTextRef.current, { yPercent: -100, opacity: 0, ease: 'power2.inOut' }, 0);
        tl.to(lowerTextRef.current, { yPercent: 100, opacity: 0, ease: 'power2.inOut' }, 0);

        tl.fromTo(".reveal-item", 
          { y: 40, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.1, ease: 'power3.out' }, 
          0.4
        );
      } else {
        // If already revealed, ensure the underlying items are visible
        gsap.set(".reveal-item", { y: 0, opacity: 1 });
      }

      // 5. Magazine Reveal
      gsap.from(".mag-reveal", {
        scrollTrigger: {
          trigger: magSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 80,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power4.out"
      });
      
      // 6. Horizontal Sections
      const horizontalSections = gsap.utils.toArray<HTMLElement>('.horizontal-container');
      horizontalSections.forEach((section) => {
        const track = section.querySelector<HTMLElement>('.scroll-track');
        if (!track) return;
        
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-[#0f0720] text-white selection:bg-purple-500 font-sans overflow-x-hidden">
      
      {/* Container height becomes auto if already revealed to prevent dead scroll space */}
      <section 
        ref={containerRef} 
        className={`relative w-full overflow-hidden ${hasRevealed ? 'h-auto py-20' : 'h-screen'}`}
      >
        {/* DEEP BACKGROUND */}
        <div className={`absolute inset-0 flex items-center justify-center bg-[#0f0720] px-6 ${hasRevealed ? 'relative' : ''}`}>
          <div className="absolute inset-0 flex flex-col justify-around opacity-[0.02] select-none pointer-events-none leading-none">
            {[...Array(6)].map((_, i) => (
              <span key={i} className={`text-[12vw] font-black whitespace-nowrap ${i % 2 === 0 ? '-ml-20' : '-mr-20 text-right'}`}>
                WIF-SLIIT-WIF-SLIIT 
              </span>
            ))}
          </div>

          <div className="max-w-7xl w-full z-10 px-4 mt-16 md:mt-0">
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 md:gap-12 items-start">
              <div className="lg:col-span-7 reveal-item">
                <h2 className="text-5xl md:text-7xl lg:text-[clamp(4rem,8vw,9rem)] font-black leading-[0.85] tracking-tighter uppercase italic">
                  Beyond the <br/>
                  <span className="text-purple-400 not-italic">Community</span><br/>
                  <span className="text-white/20">Is the</span> <span className="text-purple-400">Code</span>
                </h2>
                <div className="mt-8 flex flex-wrap gap-3">
                  {['Est. 2018', 'Open Source', 'Empowerment'].map((tag) => (
                    <span key={tag} className="px-4 py-1 border border-purple-500/30 rounded-full text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-purple-300 backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 reveal-item flex flex-col justify-end h-full">
                <div className="space-y-6">
                  <p className="text-xl md:text-2xl text-white font-bold leading-tight uppercase tracking-tight">
                    We are redefining what it means to be a woman in the digital frontier.
                  </p>
                  <div className="h-px w-full bg-gradient-to-r from-purple-500 to-transparent opacity-50" />
                  <p className="text-sm md:text-base text-purple-100/60 leading-relaxed italic font-light">
                    At SLIIT Women in FOSS, we believe code is just the beginning. We focus on the ecosystem of innovation—mentorship, public speaking, technical leadership, and the collaborative spirit of Open Source. 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* REVEAL LAYER - Hidden immediately if hasRevealed is true */}
        {!hasRevealed && (
          <header 
            ref={heroRef} 
            className="absolute inset-0 z-20 flex items-center justify-center bg-white overflow-hidden" 
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%, 0 50%, 100% 50%, 100% 100%, 0 100%)' }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(147,51,234,0.05)_100%)]" />
            
            <div ref={gridRef} className="absolute inset-0 opacity-[0.6] pointer-events-none select-none h-[150%]">
              <div 
                  className="absolute inset-0" 
                  style={{ 
                      backgroundImage: `
                          linear-gradient(to right, #581c87 1.2px, transparent 1.2px), 
                          linear-gradient(to bottom, #581c87 1.2px, transparent 1.2px)
                      `, 
                      backgroundSize: '50px 50px' 
                  }} 
              />
            </div>

            <div className="relative text-center w-full px-4 z-10">
              <div ref={upperTextRef}>
                  <h1 className="text-[13vw] md:text-[10vw] font-[1000] text-purple-950 leading-[0.8] tracking-[-0.05em] uppercase">
                    SLIIT<br/>WOMEN<br/>IN FOSS
                  </h1>
              </div>
              <div ref={lowerTextRef} className="absolute inset-0 pointer-events-none px-4">
                <h1 className="text-[13vw] md:text-[10vw] font-[1000] text-purple-950 leading-[0.8] tracking-[-0.05em] uppercase">
                    SLIIT<br/>WOMEN<br/>IN FOSS
                </h1>
              </div>
            </div>
          </header>
        )}
      </section>

      {/* IDENTITY SECTION */}
      <section ref={magSectionRef} className="relative bg-[#0f0720] pt-32 pb-48 px-6 -mt-1">
        <div className="absolute top-20 -left-10 text-[25vw] font-black text-white/[0.02] select-none leading-none tracking-tighter pointer-events-none uppercase">Identity</div>
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="mag-reveal relative mb-32 pt-12">
            <div className="absolute top-0 left-0 w-24 h-1 bg-purple-500 mb-8" />
            <h2 className="text-[16vw] lg:text-[12vw] font-[1000] leading-[0.75] tracking-[-0.08em] uppercase italic mix-blend-difference">
              Who <br/> <span className="text-transparent stroke-text-white">We</span> Are<span className="text-purple-500 not-italic">?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">
            <div className="lg:col-span-7 mag-reveal">
              <p className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[0.9] tracking-tighter uppercase border-b-2 border-white/5 pb-12">
                A premier <span className="italic font-serif text-purple-400 lowercase">all-girls</span> society uniting the brightest minds at SLIIT.
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 mag-reveal pt-4">
              <p className="text-lg leading-relaxed text-purple-100/60 font-light mb-8 italic">
                We&apos;re not just a society; we&apos;re a <span className="text-white font-medium underline decoration-purple-500 underline-offset-4">technical movement</span>. By dismantling barriers and fostering high-level contributions, we redefine tech leadership.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mag-reveal mb-24">
            <div className="group relative bg-white/5 p-12 border border-white/10 overflow-hidden hover:bg-purple-500/5 transition-colors duration-500">
              <div className="relative z-10">
                <span className="text-xs font-mono text-purple-400 mb-4 block tracking-[0.4em]">01_MISSION</span>
                <h4 className="text-4xl font-black uppercase mb-6 tracking-tighter">Bridge the Gap</h4>
                <p className="text-purple-100/60 text-sm leading-relaxed max-w-xs">Dismantling the gender divide in open-source through mentorship and real-world contribution.</p>
              </div>
              <div className="absolute top-4 right-8 text-7xl font-black text-white/5">01</div>
            </div>
            <div className="group relative bg-purple-600 p-12 overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <span className="text-xs font-mono text-purple-200 mb-4 block tracking-[0.4em]">02_FOCUS</span>
                <h4 className="text-4xl font-black uppercase mb-6 tracking-tighter">Master the Stack</h4>
                <p className="text-white/80 text-sm leading-relaxed max-w-xs">From Git workflows to cloud architecture, we master the tools that define the digital frontier.</p>
              </div>
              <div className="absolute top-4 right-8 text-7xl font-black text-black/10">02</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden whitespace-nowrap bg-white/5 border-y border-white/10 py-5 rotate-[-1deg] z-30 backdrop-blur-md">
          <div className="flex animate-marquee font-bold text-xl uppercase tracking-[0.2em] text-purple-400/80">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="mx-12">
                SLIIT WOMEN IN FOSS <span className="mx-4 text-white/10">{"//"}</span> REDEFINING THE FUTURE <span className="mx-4 text-white/10">{"//"}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* MASCOT SECTION */}
      <section className="relative py-32 px-6 bg-[#0f0720]">
        <div className="max-w-6xl mx-auto">
          <div className="relative group overflow-hidden bg-gradient-to-br from-purple-900/10 to-transparent border border-white/10 rounded-[2rem] md:rounded-[4rem] p-8 md:p-20">
            <div className="absolute top-0 right-0 text-[15vw] font-black text-white/[0.02] select-none leading-none pointer-events-none uppercase">Mascot</div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="relative aspect-square max-w-[400px] mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-purple-500/20 blur-[100px] rounded-full scale-90 group-hover:scale-110 transition-transform duration-1000" />
                <Image 
                  ref={mascotImgRef}
                  src="/images/mascot-nifi.png" 
                  alt="Nifi Mascot" 
                  width={500}
                  height={500}
                  className="w-full h-full object-contain relative z-20 drop-shadow-[0_0_50px_rgba(168,85,247,0.3)]"
                />
                <div className="absolute -bottom-4 -right-4 bg-purple-600 text-white px-8 py-4 rounded-full font-black italic tracking-tighter shadow-2xl rotate-12 z-30 scale-90 md:scale-100">
                  MEET NIFI!
                </div>
              </div>
              <div className="space-y-8 text-center lg:text-left">
                <div className="space-y-3">
                  <span className="text-purple-400 font-mono tracking-[0.4em] text-[10px] md:text-xs uppercase">Official Mascot</span>
                  <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">The Heart of <br/> <span className="text-transparent stroke-text-white">Our Pulse</span></h3>
                </div>
                <div className="space-y-6 text-purple-100/70 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                  <p>Nifi is thrilled to be a part of women tech enthusiasts as our <span className="text-white font-bold italic">cute, fluffy</span> official mascot.</p>
                </div>
               <div className="reveal-element flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                {/* Wrapped the button in a Link component */}
                <Link href="/registrations"> 
                  <button 
                    type="button" 
                    className="group relative px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-xs overflow-hidden transition-colors duration-300"
                  >
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                      Join the Community
                    </span>
                    <div 
                      className="absolute inset-0 bg-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" 
                    />
                  </button>
                </Link>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PastEventsSection />
      <WEBINARSection />
      <BLOGSSection />

      <style jsx>{`
        .stroke-text-white { color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,0.8); }
        @media (min-width: 768px) { .stroke-text-white { -webkit-text-stroke: 2px white; } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: inline-flex; animation: marquee 40s linear infinite; }
        .ease-expo { transition-timing-function: cubic-bezier(0.87, 0, 0.13, 1); }
      `}</style>
    </main>
  );
}