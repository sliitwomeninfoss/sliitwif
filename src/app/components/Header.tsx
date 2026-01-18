"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Optimized scroll listener with useCallback
  const handleScroll = useCallback(() => {
    // Don't update scrolled state when mobile menu is open
    if (!menuOpen) {
      setScrolled(window.scrollY > 20);
    }
  }, [menuOpen]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Prevent scrolling when mobile menu is open and lock scroll position
  useEffect(() => {
    if (menuOpen) {
      // Lock body scroll
      document.body.style.overflow = "hidden";
      // Lock body position to prevent iOS Safari bounce
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // Get the scroll position before unlocking
      const scrollY = document.body.style.top;
      document.body.style.overflow = "unset";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      // Restore scroll position
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [menuOpen]);

  const links = [
    { path: "/", label: "Home" },
    { path: "/about-us", label: "About Us" },
    { path: "/board", label: "Board" },
    { path: "/events", label: "Events" },
    { path: "/blog", label: "Blog" },
    { path: "/code-of-conduct", label: "Conduct" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled && !menuOpen ? "bg-[#0f0720]/90 backdrop-blur-2xl border-b border-white/5 py-4" : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-[1500px] mx-auto px-6 md:px-10 flex items-center justify-between">
        
        {/* LOGO SECTION */}
        <Link href="/" className="relative z-[110] group flex items-center gap-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <Image
              src="/sliitwif/assets/logo.png"
              alt="SLIIT WIF Logo"
              width={80}
              height={80}
              className="object-contain brightness-125 transition-transform duration-700 group-hover:scale-110"
              priority // Optimization: Logos should load first
            />
          </motion.div>
          
          <div className="flex flex-col">
            <h1 className="text-white font-[1000] text-2xl md:text-3xl tracking-tighter uppercase leading-none italic">
              WIF<span className="text-purple-500">.</span>
            </h1>
            <span className="text-[10px] text-white/40 font-mono tracking-[0.3em] uppercase mt-1">
              SLIIT Chapter
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-2">
          {links.map((link, index) => {
            const isActive = pathname === link.path;
            return (
              <Link key={link.path} href={link.path} className="relative px-5 py-2">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative"
                >
                  <span className={`text-[13px] uppercase tracking-[0.2em] font-black transition-all duration-300 ${
                    isActive ? "text-purple-400" : "text-white/40 hover:text-white"
                  }`}>
                    {link.label}
                  </span>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="nav-dot"
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* CTA BUTTON - Fixed nesting issue */}
        <div className="hidden lg:block">
          <Link 
            href="/contact"
            className="relative group inline-block px-8 py-3 bg-white text-black font-black uppercase tracking-widest text-[11px] overflow-hidden transition-all duration-500 rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10">Get Involved</span>
            <div className="absolute inset-0 bg-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button 
          aria-label="Toggle Menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden relative z-[110] text-white p-2"
        >
          {menuOpen ? <X size={36} /> : <Menu size={36} />}
        </button>

        {/* MOBILE FULL-SCREEN MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, clipPath: "circle(0% at 90% 10%)" }}
              animate={{ opacity: 1, clipPath: "circle(150% at 90% 10%)" }}
              exit={{ opacity: 0, clipPath: "circle(0% at 90% 10%)" }}
              transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
              className="fixed inset-0 bg-[#0a0515] z-[100] flex flex-col justify-center px-8 overflow-y-auto overscroll-none"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center opacity-[0.02] pointer-events-none select-none">
                <span className="text-[35vw] font-black text-white leading-none uppercase italic">WIF</span>
              </div>

              <div className="flex flex-col gap-6 relative z-10 py-24">
                {links.map((link, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    key={link.path}
                  >
                    <Link
                      href={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={`text-5xl md:text-7xl font-black uppercase tracking-tighter block ${
                        pathname === link.path ? "text-purple-500 italic" : "text-white hover:text-purple-400 transition-colors"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="absolute bottom-12 left-8 right-8 flex justify-between items-end border-t border-white/10 pt-8">
                <div>
                  <p className="font-mono text-[10px] text-purple-400 uppercase tracking-widest mb-2">Socials</p>
                  <div className="flex gap-4 text-xs font-bold uppercase tracking-widest text-white/50">
                    <a href="#" className="hover:text-white transition-colors">IG</a>
                    <a href="#" className="hover:text-white transition-colors">LN</a>
                    <a href="#" className="hover:text-white transition-colors">GH</a>
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-[10px] text-white/20 uppercase tracking-[0.3em]">SLIIT Women in FOSS © 2026</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}