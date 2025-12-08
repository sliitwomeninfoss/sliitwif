"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Navigation links with proper labels
  const links = [
    { path: "/", label: "Home" },
    { path: "/about-us", label: "About Us" },
    { path: "/events", label: "Events" },
    { path: "/blog", label: "Blog" },
    { path: "/code-of-conduct", label: "Code of Conduct" },
    { path: "/contact", label: "Contact Us" },
  ];

  // Active link styling
  const linkClasses = (path: string) =>
    pathname === path
      ? "px-8 py-2 rounded-lg font-semibold text-white bg-[#7e05ec] transition-all"
      : "px-6 py-2 font-semibold text-gray-800 hover:text-purple-600 transition-colors";

  return (
    <header className="bg-gray-100 border-b-4 ">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="container mx-auto px-6 py-4"
      >
        <div className="flex items-center justify-between">

          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Image
                src="/sliitwif/assets/logo.png"
                alt="SLIIT WIF Logo"
                width={110}
                height={110}
                className="object-contain"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.1 }}
              >
                <Link href={link.path} className={linkClasses(link.path)}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-3xl font-bold"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white shadow-lg p-6 mt-4 flex flex-col gap-4 rounded-lg"
          >
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={linkClasses(link.path)}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </motion.div>
    </header>
  );
}
