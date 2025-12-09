"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { path: "/", label: "Home" },
    { path: "/about-us", label: "About Us" },
    { path: "/events", label: "Events" },
    { path: "/blog", label: "Blog" },
    { path: "/code-of-conduct", label: "Code of Conduct" },
    { path: "/contact", label: "Contact Us" },
  ];

  const linkClasses = (path: string) =>
    pathname === path
      ? "px-5 py-2 rounded-md font-semibold text-white bg-[#7e05ec] transition-all whitespace-nowrap"
      : "px-4 py-2 font-semibold text-gray-800 hover:text-purple-600 transition-colors whitespace-nowrap";

  return (
    <header className="bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-screen-xl mx-auto px-6 lg:px-10 py-4"
      >
        <div className="flex items-center justify-between">

          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.08 }}
            >
              <Image
                src="/sliitwif/assets/logo.png"
                alt="SLIIT WIF Logo"
                width={105}
                height={105}
                className="object-contain"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + index * 0.08 }}
              >
                <Link href={link.path} className={linkClasses(link.path)}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-3xl font-bold text-gray-800"
          >
            ☰
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white shadow-xl p-5 mt-4 flex flex-col gap-3 rounded-lg border border-gray-200"
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
