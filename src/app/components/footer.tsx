"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

const SOCIAL_LINKS = [
  { id: "fb", icon: faFacebook, url: "https://facebook.com/sliitwif", label: "Facebook" },
  { id: "ig", icon: faInstagram, url: "https://instagram.com/sliitwif", label: "Instagram" },
  { id: "tk", icon: faTiktok, url: "https://tiktok.com/@sliitwif", label: "TikTok" },
  { id: "tw", icon: faTwitter, url: "https://twitter.com/sliitwif", label: "Twitter" },
  { id: "li", icon: faLinkedin, url: "https://linkedin.com/company/sliit-women-in-foss-community/", label: "LinkedIn" },
];

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about-us" },
  { name: "Contact", path: "/contact" },
  { name: "Events", path: "/events" },
  { name: "Conduct", path: "/code-of-conduct" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="relative bg-[#0b0518] text-white/40 border-t border-white/5 overflow-hidden py-8">
      
      {/* Background Shadow Text */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span className="text-[12vw] font-black text-white/[0.02] whitespace-nowrap leading-none uppercase tracking-tighter">
          Women In FOSS SLIIT
        </span>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Logo & Socials */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" aria-label="Go to homepage">
              <Image 
                src="/sliitwif/assets/logo.png"
                alt="SLIIT Women In FOSS Logo" 
                width={80} 
                height={32}
                className="h-8 w-auto object-contain opacity-60" 
              />
            </Link>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a 
                  key={social.id} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="transition-opacity hover:opacity-100"
                >
                  <FontAwesomeIcon icon={social.icon} className="text-sm opacity-30" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-[9px] uppercase tracking-[0.2em]">
            {NAV_LINKS.map((link) => (
              <Link key={link.path} href={link.path} className="hover:text-white transition-colors">
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <div className="text-[9px] font-mono tracking-[0.2em] opacity-20 text-center md:text-right">
            <p>© {currentYear} SLIIT WIF</p>
            <p>ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </div>
    </footer>
  );
}