'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';

export default function RegistrationsAwaiting() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance: Content slides up with a smooth delay
      gsap.from(contentRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.2
      });

      // Individual text element reveals
      gsap.from(".reveal-element", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 0.5
      });

      // Mascot floating loop
      gsap.to(mascotRef.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Horizontal scanning beam
      gsap.fromTo(scannerRef.current, 
        { top: '0%' }, 
        { top: '100%', duration: 3.5, repeat: -1, ease: "none" }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main 
      ref={containerRef} 
      className="min-h-screen bg-[#0f0720] text-white px-6 overflow-hidden selection:bg-purple-500 font-sans"
    >
      {/* BACKGROUND DECOR - Grid and Large Text */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
        <div className="absolute top-40 left-10 text-[20vw] font-black leading-none text-purple-500">
          WAIT
        </div>
      </div>

      {/* WRAPPER WITH TOP SPACING */}
      <div ref={contentRef} className="max-w-7xl mx-auto pt-32 md:pt-48 pb-20 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: THE SIGNAL (Mascot) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative group max-w-[450px] mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-purple-600/10 blur-[100px] rounded-full scale-110" />
              
              <div ref={mascotRef} className="relative z-10 aspect-square w-full">
                <div ref={scannerRef} className="absolute left-0 w-full h-[2px] bg-purple-400 shadow-[0_0_20px_#a855f7] z-20 pointer-events-none" />
                
                <Image 
                  src="/images/mascot-nifi.png" 
                  alt="Nifi Standing By" 
                  width={600} 
                  height={600}
                  priority // Optimization for LCP image
                  className="w-full h-full object-contain filter drop-shadow-[0_0_40px_rgba(168,85,247,0.15)]"
                />
              </div>

              <div className="absolute -bottom-4 -left-4 font-mono text-[10px] text-purple-400/40 space-y-1">
                <p>LAT: 6.9147&deg; N</p>
                <p>LNG: 79.9733&deg; E</p>
                <p>MODE: STANDBY</p>
              </div>
            </div>
          </div>

          {/* RIGHT: THE MESSAGE */}
          <div className="lg:col-span-7 space-y-12 text-center lg:text-left order-1 lg:order-2">
            <div className="space-y-6">
              <div className="reveal-element inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/5 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-purple-300">Syncing Frequency...</span>
              </div>

              <h1 className="reveal-element text-[13vw] lg:text-[9vw] font-[1000] uppercase leading-[0.8] tracking-[-0.07em]">
                AWAIT <br/>
                <span className="text-transparent stroke-text-white">FOR THE</span> <br/>
                <span className="text-purple-500 italic">UPLINK.</span>
              </h1>
            </div>

            <div className="reveal-element max-w-xl space-y-6 mx-auto lg:mx-0">
              <div className="h-px w-24 bg-purple-500 mb-8 mx-auto lg:mx-0" />
              <p className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white italic">
                The terminal is being prepared for the next intake.
              </p>
              {/* Note the use of &apos; to satisfy ESLint react/no-unescaped-entities */}
              <p className="text-purple-100/50 text-base leading-relaxed font-light">
                Registration protocols are currently restricted. Nifi is monitoring the network; once the encryption breaks, the gates will open. Stay tuned to our official channels for the decryption key.
              </p>
            </div>

            {/* BUTTONS */}
            <div className="reveal-element flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <Link href="/">
                <button
                  type="button"
                  className="group relative px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] overflow-hidden transition-all duration-300"
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">Return Home</span>
                  <div className="absolute inset-0 bg-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]" />
                </button>
              </Link>

              <div className="px-8 py-5 border border-white/10 text-purple-400 font-mono text-[10px] uppercase tracking-widest flex items-center">
                System Status: <span className="text-white ml-2">Awaiting Signals</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        .stroke-text-white { 
          color: transparent; 
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.4); 
        }
        @media (min-width: 1024px) {
          .stroke-text-white { -webkit-text-stroke: 2.5px rgba(255,255,255,0.6); }
        }
      `}</style>
    </main>
  );
}