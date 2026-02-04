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

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (menuOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "unset";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    }
  }, [menuOpen]);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

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
        scrolled && !menuOpen ? "bg-[#0f0720]/90 backdrop-blur-2xl border-b border-white/5 py-3" : "bg-transparent py-6"
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
              src="/assets/logo.png"
              alt="SLIIT WIF Logo"
              width={65}
              height={65}
              className="object-contain brightness-110 transition-transform duration-700 group-hover:scale-105 md:w-[80px]"
              priority
            />
          </motion.div>
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
                  <span className={`text-[11px] xl:text-[13px] uppercase tracking-[0.2em] font-black transition-all duration-300 ${
                    isActive ? "text-purple-400" : "text-white/40 hover:text-white"
                  }`}>
                    {link.label}
                  </span>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="nav-dot"
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* CTA BUTTON */}
        <div className="hidden lg:block">
          <Link 
            href="/registrations"
            className="relative group inline-block px-8 py-3 bg-white text-black font-black uppercase tracking-widest text-[10px] overflow-hidden transition-all duration-500 rounded-full"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">Get Involved</span>
            <div className="absolute inset-0 bg-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button 
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={toggleMenu}
          className="lg:hidden relative z-[110] text-white p-2 transition-transform active:scale-90"
        >
          {menuOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
        </button>

        {/* MOBILE FULL-SCREEN MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, clipPath: "circle(0% at 90% 10%)" }}
              animate={{ opacity: 1, clipPath: "circle(150% at 90% 10%)" }}
              exit={{ opacity: 0, clipPath: "circle(0% at 90% 10%)" }}
              transition={{ duration: 0.7, ease: [0.87, 0, 0.13, 1] }}
              className="fixed inset-0 bg-[#0a0515] z-[100] flex flex-col justify-between px-6 sm:px-8 py-24 overflow-y-auto"
            >
              {/* Watermark */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center opacity-[0.02] pointer-events-none select-none">
                <span className="text-[30vw] sm:text-[25vw] font-black text-white leading-none uppercase italic">WIF</span>
              </div>

              {/* Navigation Links - Better mobile spacing */}
              <nav className="flex flex-col gap-5 sm:gap-6 relative z-10 mt-8">
                {links.map((link, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    key={link.path}
                  >
                    <Link
                      href={link.path}
                      onClick={closeMenu}
                      className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight block transition-all ${
                        pathname === link.path 
                          ? "text-purple-500 italic translate-x-3 sm:translate-x-4" 
                          : "text-white hover:text-purple-400 hover:translate-x-2 active:text-purple-400"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative z-10 mt-8"
              >
                <Link
                  href="/registrations"
                  onClick={closeMenu}
                  className="block w-full text-center px-8 py-4 sm:py-5 bg-purple-600 text-white font-black uppercase tracking-widest text-xs sm:text-sm rounded-full hover:bg-purple-700 transition-all active:scale-95"
                >
                  Get Involved
                </Link>
              </motion.div>

              {/* Mobile Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-4 border-t border-white/5 pt-6 mt-8"
              >
                <div>
                  <p className="font-mono text-[9px] sm:text-[10px] text-purple-400 uppercase tracking-widest mb-3">Follow Us</p>
                  <div className="flex gap-4 sm:gap-5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/40">
                    <a 
                      href="https://www.instagram.com/sliitwif/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-white transition-colors"
                      aria-label="Instagram"
                    >
                      IG
                    </a>
                    <a 
                      href="https://www.linkedin.com/company/sliit-wif/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-white transition-colors"
                      aria-label="LinkedIn"
                    >
                      LN
                    </a>
                    <a 
                      href="https://github.com/SLIIT-Women-in-FOSS" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-white transition-colors"
                      aria-label="GitHub"
                    >
                      GH
                    </a>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-[9px] sm:text-[10px] text-white/20 uppercase tracking-[0.2em]">© 2026 SLIIT WIF</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}