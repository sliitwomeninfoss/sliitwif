"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Calendar, ExternalLink } from "lucide-react";
import Image from "next/image";

// --- Types ---
interface MediumPost {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  thumbnail: string;
  description: string;
  categories: string[];
}

interface BlogState {
  items: MediumPost[];
  error: string | null;
  isLoading: boolean;
}

const MEDIUM_BLOG_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/sliitwif';
const PROFILE_URL = 'https://medium.com/sliitwif';
const GENERIC_BLOG_IMAGE = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop";

export default function Blogs() {
  const [blog, setBlog] = useState<BlogState>({
    items: [],
    error: null,
    isLoading: true
  });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(MEDIUM_BLOG_URL);
        if (!res.ok) throw new Error("Failed to fetch journal entries");
        const data = await res.json();

        const posts: MediumPost[] = data.items.map((post: MediumPost) => {
          let discoveredImg = post.thumbnail;
          // Medium RSS often puts tracking pixels in thumbnail; we check for valid images
          if (!discoveredImg || discoveredImg === "" || discoveredImg.includes("stat?event")) {
            const imgRegExp = /<img[^>]+src="([^">]+)"/;
            const match = post.description.match(imgRegExp);
            discoveredImg = match ? match[1] : GENERIC_BLOG_IMAGE;
          }
          
          // Clean up HTML entities in titles (like &amp; or &quot;)
          const cleanTitle = post.title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

          return { ...post, title: cleanTitle, thumbnail: discoveredImg };
        });

        setBlog({ items: posts, error: null, isLoading: false });
      } catch (err) {
        setBlog({ 
          items: [], 
          error: err instanceof Error ? err.message : "An error occurred", 
          isLoading: false 
        });
      }
    };

    fetchBlogs();
  }, []);

  return (
    <main className="bg-[#0f0720] text-white selection:bg-purple-500 font-sans overflow-x-hidden min-h-screen pt-40 pb-24 relative">
      
      {/* GLOBAL AMBIENT DNA */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div 
          className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 blur-[150px] rounded-full transition-all duration-1000"
          style={{ 
            transform: hoveredIndex !== null 
              ? `scale(1.2) translate(${hoveredIndex * 10}px)` 
              : 'none' 
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <header className="mb-24">
          <div className="w-24 h-1 bg-purple-500 mb-8" />
          <span className="text-purple-400 font-mono tracking-[0.4em] text-[10px] uppercase block mb-4">
            Insights // Stories // Knowledge
          </span>
          <h1 className="text-[12vw] lg:text-[10vw] font-[1000] leading-[0.8] tracking-[-0.08em] uppercase italic mb-12">
            OUR <br />
            <span className="text-transparent stroke-text-white">JOURNAL</span>
            <span className="text-purple-500 not-italic">.</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blog.isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={`skeleton-${i}`} className="bg-white/[0.02] border border-white/10 h-[500px] animate-pulse" />
            ))
          ) : (
            blog.items.map((item, index) => (
              <article 
                key={item.guid || `blog-${index}`} 
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative bg-white/[0.01] backdrop-blur-sm border border-white/5 overflow-hidden flex flex-col transition-all duration-500 hover:border-purple-500 hover:bg-white/[0.04] hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden bg-[#1a0b35]">
                  <Image 
                    src={item.thumbnail} 
                    alt={item.title} 
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                  
                  {/* Branding Overlay if using generic image */}
                  {item.thumbnail === GENERIC_BLOG_IMAGE && (
                    <div className="absolute inset-0 bg-purple-900/40 flex items-center justify-center">
                       <span className="text-5xl font-black opacity-20 italic select-none">WIF</span>
                    </div>
                  )}

                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-purple-600 text-white text-[9px] font-mono uppercase tracking-widest px-3 py-1">
                      {item.categories?.[0] || 'WIF Journal'}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-4 text-purple-400/60">
                    <Calendar size={12} />
                    <span className="text-[10px] font-mono uppercase tracking-widest">
                      {item.pubDate.split(" ")[0]}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-tight mb-6 group-hover:text-purple-400 transition-colors line-clamp-3">
                    {item.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                    {item.categories?.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[8px] font-mono border border-white/10 px-2 py-0.5 opacity-40 uppercase">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full p-4 bg-white text-black font-black uppercase tracking-widest text-[10px] transition-all hover:bg-purple-500 hover:text-white"
                  >
                    Read Article <ArrowUpRight size={14} />
                  </a>
                </div>
              </article>
            ))
          )}
        </div>

        {/* BOTTOM CTA */}
        <footer className="mt-32 border-t border-white/10 pt-20 text-center">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8">
            Hungry for <span className="text-purple-500">More?</span>
          </h2>
          <p className="text-white/50 font-mono text-sm mb-12 max-w-xl mx-auto">
            Deep dive into our full archive over on Medium for more technical insights.
          </p>
          <a 
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-4 px-12 py-6 border-2 border-white hover:border-purple-500 transition-all duration-300"
          >
            <span className="font-black uppercase tracking-[0.2em] text-sm">Follow on Medium</span>
            <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </footer>
      </div>

      <style jsx global>{`
        .stroke-text-white {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.4);
        }
        @media (min-width: 768px) {
          .stroke-text-white { -webkit-text-stroke: 2px rgba(255, 255, 255, 0.6); }
        }
      `}</style>
    </main>
  );
}