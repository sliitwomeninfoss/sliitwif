"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Calendar, ArrowUpRight } from "lucide-react";
import { motion, HTMLMotionProps } from "framer-motion";

// Data Imports
import EventsData from "./Events.json";
import WebinarsData from "./Webinars.json";
import UpcomingEventCard from "./upcomingEventCard";

const DELAY = 7000;

const fadeInUp: HTMLMotionProps<"section"> = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

interface EventItem {
  title: string;
  date: string;
  image: string;
  description: string;
}

interface WebinarItem {
  title: string;
  image: string;
  youtube_link: string;
}

interface UpcomingEvent {
  date: string;
  time: string;
  image: string;
  title: string;
  speaker: string;
  description: string;
}

export default function PastEvents() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const events: EventItem[] = EventsData.Events;
  const webinars: WebinarItem[] = WebinarsData.Webinars;
  
  const validUpcomingEvents = (EventsData.Upcoming_Events as UpcomingEvent[]).filter(
    (event) => event.date !== "" && event.time !== ""
  );

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    resetTimeout();
    if (validUpcomingEvents.length <= 1) return;

    timeoutRef.current = setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex === validUpcomingEvents.length - 1 ? 0 : prevIndex + 1
      );
    }, DELAY);

    return () => resetTimeout();
  }, [index, validUpcomingEvents.length, resetTimeout]);

  return (
    <main className="bg-[#0b0518] text-white selection:bg-purple-500/30 font-sans overflow-x-hidden min-h-screen pt-20 md:pt-32 pb-24 relative">
      
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* SECTION 1: UPCOMING */}
        {validUpcomingEvents.length > 0 && (
          <motion.section 
            {...fadeInUp}
            className="mb-32 md:mb-48"
          >
            <header className="mb-10">
              <div className="w-12 h-[2px] bg-purple-500 mb-8" />
              <span className="text-purple-400 font-mono tracking-[0.4em] text-[10px] uppercase block mb-6">
                Next Chapters // Live Soon
              </span>
              <h2 className="text-[13vw] md:text-[8vw] font-black leading-[0.8] tracking-tighter uppercase italic">
                UPCOMING <br />
                <span className="text-transparent stroke-text-white opacity-80">EXPERIENCES</span>
                <span className="text-purple-500">.</span>
              </h2>
            </header>

            <div className="relative group">
              <div className="overflow-hidden rounded-sm bg-white/[0.02] border border-white/5 backdrop-blur-3xl">
                <div 
                  className="flex transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ transform: `translateX(-${index * 100}%)` }}
                >
                  {validUpcomingEvents.map((event, idx) => (
                    <div key={`upcoming-${idx}`} className="min-w-full p-1">
                      <UpcomingEventCard {...event} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-row gap-4 mt-8">
                {validUpcomingEvents.map((_, dotIdx) => (
                  <button
                    key={`dot-${dotIdx}`}
                    onClick={() => { resetTimeout(); setIndex(dotIdx); }}
                    aria-label={`Go to event ${dotIdx + 1}`}
                    className={`h-[3px] transition-all duration-500 ${
                      index === dotIdx ? "w-12 bg-purple-500" : "w-4 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* SECTION 2: PAST EVENTS */}
        <section className="mb-32 md:mb-48">
          <motion.header 
             initial={fadeInUp.initial}
             whileInView={fadeInUp.whileInView}
             transition={fadeInUp.transition}
             className="mb-14"
          >
            <span className="text-purple-400 font-mono tracking-[0.4em] text-[10px] uppercase block mb-4">
              History // Archives
            </span>
            <h2 className="text-[13vw] md:text-[8vw] font-black leading-[0.8] tracking-tighter uppercase italic">
              Past <span className="text-transparent stroke-text-white opacity-80">Events</span>
              <span className="text-purple-500">.</span>
            </h2>
          </motion.header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {events.map((event, idx) => (
              <motion.article 
                key={`event-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col cursor-pointer border-t border-white/10 pt-8 hover:border-purple-500/50 transition-colors"
              >
                <div className="relative aspect-[10/12] overflow-hidden mb-6 bg-white/5 rounded-sm">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0518] via-transparent to-transparent opacity-40" />
                </div>
                
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-purple-400">
                    <Calendar size={12} /> {event.date}
                  </div>
                  <h3 className="text-xl font-black uppercase italic leading-none group-hover:text-purple-400 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-white/50 text-xs leading-relaxed line-clamp-2 italic border-l-2 border-white/10 pl-4 group-hover:border-purple-500/30 transition-all">
                    {event.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* SECTION 3: WEBINARS */}
        <section className="pb-32">
          <motion.header 
            initial={fadeInUp.initial}
            whileInView={fadeInUp.whileInView}
            className="mb-14"
          >
            <h2 className="text-[13vw] md:text-[8vw] font-black leading-[0.8] tracking-tighter uppercase italic">
              Digital <span className="text-transparent stroke-text-white opacity-80">Webinars</span>
            </h2>
          </motion.header>

          <div className="border-t border-white/10">
            {webinars.map((webinar, idx) => (
              <motion.a 
                key={`webinar-${idx}`}
                href={webinar.youtube_link} 
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="group flex flex-col md:flex-row items-start md:items-center justify-between py-8 border-b border-white/5 hover:bg-white/[0.02] transition-all gap-6"
              >
                <div className="flex flex-row items-center gap-6 md:gap-12">
                  <span className="font-mono text-xs text-purple-500/40">0{idx + 1}</span>
                  <div className="w-24 h-14 md:w-40 md:h-24 overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                    <img 
                      src={webinar.image} 
                      alt={`Thumbnail for ${webinar.title}`} 
                      className="object-cover w-full h-full group-hover:scale-110 transition-all duration-700" 
                    />
                  </div>
                  <h4 className="text-2xl md:text-5xl font-black uppercase italic tracking-tighter group-hover:translate-x-4 transition-transform duration-500">
                    {webinar.title}
                  </h4>
                </div>
                <div className="flex flex-row items-center gap-3 text-xs font-mono text-white/30 group-hover:text-white uppercase tracking-[0.2em]">
                  Play Session <ArrowUpRight size={20} className="group-hover:rotate-45 transition-all" />
                </div>
              </motion.a>
            ))}
          </div>
        </section>
      </div>

      <style jsx global>{`
        .stroke-text-white {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        }
        @media (min-width: 768px) {
          .stroke-text-white { -webkit-text-stroke: 2px rgba(255, 255, 255, 0.4); }
        }
      `}</style>
    </main>
  );
}