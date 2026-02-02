"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

// GSAP
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------------- TYPES ---------------- */
interface MediumPost {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  thumbnail: string;
  description: string;
  categories: string[];
}

/* ---------------- CONSTANTS ---------------- */
const MEDIUM_RSS_URL =
  "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/sliitwif";

const FALLBACK_IMAGE = "/sliitwif/assets/logo.png";

/* ---------------- COMPONENT ---------------- */
export default function BlogPreviewSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [blogs, setBlogs] = useState<MediumPost[]>([]);

  /* ---------------- FETCH BLOGS ---------------- */
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(MEDIUM_RSS_URL);
        if (!res.ok) throw new Error("Failed to fetch blogs");

        const data = await res.json();

        const cleanedPosts: MediumPost[] = data.items
          .slice(0, 5)
          .map((post: MediumPost) => {
            let image = post.thumbnail;

            const invalidImage =
              !image ||
              image.trim() === "" ||
              image.includes("stat?event") ||
              image.includes("medium.com/_/stat");

            if (invalidImage) {
              const match = post.description?.match(
                /<img[^>]+src="([^">]+)"/
              );
              image = match?.[1] || FALLBACK_IMAGE;
            }

            return {
              ...post,
              title: post.title.replace(/&amp;/g, "&"),
              thumbnail: image || FALLBACK_IMAGE,
            };
          });

        setBlogs(cleanedPosts);
      } catch (error) {
        console.error("Error loading blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  /* ---------------- GSAP ---------------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".blog-header", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".blog-header",
          start: "top 90%",
        },
      });

      gsap.from(".blog-card", {
        x: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".blog-scroll-track",
          start: "top 85%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [blogs]);

  /* ---------------- JSX ---------------- */
  return (
    <section
      ref={containerRef}
      className="bg-[#0f0720] py-16 md:py-24 border-t border-white/5 overflow-hidden"
    >
      <div className="px-4 md:px-12">
        {/* HEADER */}
        <div className="blog-header flex flex-col md:flex-row md:items-baseline justify-between mb-10 border-b border-white/10 pb-6">
          <div>
            <p className="text-purple-500 font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-1">
              Journal_Vol.03
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white">
              Latest <span className="text-purple-500">Blogs</span>
            </h2>
          </div>
        </div>

        {/* SCROLL TRACK */}
        <div className="blog-scroll-track flex gap-4 md:gap-8 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory px-2">
          {blogs.map((blog) => (
            <a
              key={blog.guid}
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-card min-w-[75vw] sm:min-w-[300px] md:min-w-[350px] snap-center md:snap-start group"
            >
              <div className="relative h-44 md:h-56 mb-5 overflow-hidden bg-purple-900/20 rounded-sm">
                <div className="absolute top-3 left-3 z-10 bg-white text-black px-2 py-1 text-[9px] md:text-[10px] font-black uppercase italic shadow-lg">
                  {blog.categories?.[0] || "WIF Journal"}
                </div>

                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100"
                  loading="lazy"
                />

                {blog.thumbnail === FALLBACK_IMAGE && (
                  <div className="absolute inset-0 bg-purple-900/40 flex items-center justify-center">
                    <span className="text-5xl font-black opacity-20 italic">
                      WIF
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-3 px-1">
                <div className="flex items-center gap-2">
                  <Calendar size={12} className="text-purple-500 shrink-0" />
                  <span className="text-[10px] font-mono font-bold text-purple-300/80 uppercase tracking-tight">
                    {blog.pubDate.split(" ")[0]}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-black uppercase leading-[0.9] text-white tracking-tighter group-hover:text-purple-400 transition-colors line-clamp-3">
                  {blog.title}
                </h3>
              </div>
            </a>
          ))}

          {/* VIEW ALL */}
          <Link
            href="/blog"
            className="blog-card min-w-[60vw] sm:min-w-[200px] flex items-center justify-center border border-dashed border-white/10 group hover:border-purple-500/50 transition-colors cursor-pointer snap-center"
          >
            <div className="text-center p-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-purple-400">
                View<br className="hidden md:block" /> All Blogs
              </p>
              <div className="mt-4 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center mx-auto group-hover:border-purple-500 transition-colors">
                <ArrowRight
                  className="text-white/20 group-hover:text-purple-400"
                  size={18}
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
