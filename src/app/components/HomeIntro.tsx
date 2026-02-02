'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import PastEventsSection from "./PastEventsSection";
import WEBINARSection from "./PastWebinars";
// --- TYPE DEFINITIONS ---
interface Item {
  title: string;
  year: string;
  img: string;
}

// --- DATA ---
const PAST_EVENTS: Item[] = [
  { title: 'Open Source Summit', year: '2024', img: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=800' },
  { title: 'Code with WIF', year: '2023', img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800' },
  { title: 'Git Mastery Lab', year: '2023', img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800' },
  { title: 'FOSS Awareness', year: '2022', img: 'https://images.unsplash.com/photo-1591115765373-520b7a2d7a59?q=80&w=800' },
];

const WEBINARS: Item[] = [
  { title: 'GSoC Guide 2024', year: '2024', img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800' },
  { title: 'UI/UX in FOSS', year: '2024', img: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=800' },
  { title: 'Cloud Native 101', year: '2023', img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800' },
];

const BLOGS: Item[] = [
  { title: 'The Power of PRs', year: '2024', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800' },
  { title: 'Success Stories', year: '2024', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800' },
  { title: 'Mentorship Matters', year: '2023', img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800' },
];

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ItemCard = ({ item }: { item: Item }) => (
  <div className="flex-shrink-0 w-[320px] md:w-[480px] group cursor-pointer">
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all duration-500 group-hover:border-purple-500/50">
      <Image 
        src={item.img} 
        alt={item.title} 
        fill 
        className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0720] via-[#0f0720]/20 to-transparent" />
      <div className="absolute bottom-8 left-8 right-8">
        <span className="text-purple-400 font-mono text-[10px] tracking-[0.3em] uppercase mb-2 block">{item.year}</span>
        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none group-hover:text-purple-300 transition-colors">{item.title}</h3>
      </div>
    </div>
  </div>
);

export default function WomenInFOSS() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const upperTextRef = useRef(null);
  const lowerTextRef = useRef(null);
  const gridRef = useRef(null);
  const magSectionRef = useRef(null);
  const mascotImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Background Grid Animation
      gsap.to(gridRef.current, {
        y: -40,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // 2. Floating Mascot Animation
      if (mascotImgRef.current) {
        gsap.to(mascotImgRef.current, {
          y: -20,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        });
      }

      // 3. Main Hero Reveal (The Sliding Door Effect)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%', 
          scrub: 1,
          pin: true,
          anticipatePin: 1,
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

      // 4. Magazine Section Reveals
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
      
      {/* SECTION 1: HERO & BEYOND THE CODE */}
      <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
        {/* Background Layer (Deep) */}
        <div className="absolute inset-0 flex items-center justify-center bg-[#0f0720] px-6">
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

        {/* Foreground Reveal Layer (White Background with DARKER Grids) */}
        <header ref={heroRef} className="absolute inset-0 z-20 flex items-center justify-center bg-white overflow-hidden" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%, 0 50%, 100% 50%, 100% 100%, 0 100%)' }}>
          <div ref={gridRef} className="absolute inset-0 opacity-[0.25] pointer-events-none select-none h-[140%]">
            <div 
                className="absolute inset-0" 
                style={{ 
                    backgroundImage: `
                        radial-gradient(#1a0b2e 1px, transparent 1px), 
                        linear-gradient(to right, #1a0b2e 0.8px, transparent 0.8px), 
                        linear-gradient(to bottom, #1a0b2e 0.8px, transparent 0.8px)
                    `, 
                    backgroundSize: '40px 40px' 
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
      </section>

      {/* SECTION 2: EDITORIAL CONTENT */}
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

        {/* MARQUEE DIVIDER */}
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

      {/* SECTION 3: MASCOT FEATURE (NIFI) */}
      <section className="relative py-32 px-6 bg-[#0f0720]">
        <div className="max-w-6xl mx-auto">
          <div className="relative group overflow-hidden bg-gradient-to-br from-purple-900/10 to-transparent border border-white/10 rounded-[2rem] md:rounded-[4rem] p-8 md:p-20">
            <div className="absolute top-0 right-0 text-[15vw] font-black text-white/[0.02] select-none leading-none pointer-events-none uppercase">Mascot</div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="relative aspect-square max-w-[400px] mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-purple-500/20 blur-[100px] rounded-full scale-90 group-hover:scale-110 transition-transform duration-1000" />
                <Image 
                  ref={mascotImgRef}
                  src="/sliitwif/images/mascot-nifi.png" 
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
                <button className="group relative px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-xs overflow-hidden hover:text-white transition-colors duration-300">
                  <span className="relative z-10">Join the Community</span>
                  <div className="absolute inset-0 bg-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- HORIZONTAL SECTIONS --- */}
    
      <PastEventsSection />

      <WEBINARSection />
      


      <section className="horizontal-container bg-[#0f0720] overflow-hidden border-t border-white/5">
        <div className="h-screen flex flex-col justify-center">
          <div className="px-6 md:px-20 mb-10">
            <span className="text-purple-400 font-mono tracking-[0.4em] text-[10px] uppercase block mb-2">05_INSIGHTS</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">The Blog</h2>
          </div>
          <div className="scroll-track flex gap-10 px-6 md:px-[10vw] items-center w-max">
            {BLOGS.map((blog, i) => <ItemCard key={i} item={blog} />)}
            <div className="flex-shrink-0 w-[400px] px-20">
              <button className="text-3xl font-black italic uppercase text-white/20 hover:text-purple-400 transition-colors">Read More —&gt;</button>
            </div>
          </div>
        </div>
      </section>

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