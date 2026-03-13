"use client";

import React, { useEffect, useState } from "react";
import {
  ShieldCheck, Sparkles, ChevronRight,
  Fingerprint, AlertTriangle, Activity
} from "lucide-react";

const DEADLINE = new Date("2026-03-15T23:59:00+05:30").getTime();

export default function MediumCompetitionPage() {
  const RULES = [
    "AUTHENTICITY: MUST BE ORIGINAL WORK. NO PLAGIARISM.",
    "AI POLICY: DO NOT USE AI TO WRITE YOUR SUBMISSION.",
    "THEME: FOCUS ON WOMEN IN FOSS OR TECH EMPOWERMENT.",
    "PLATFORM: MUST BE PUBLISHED ON MEDIUM.COM.",
    "TAGGING: USE #SLIITWIF AND #WOMENINTECH TAGS.",
    "ELIGIBILITY: OPEN TO UNDERGRADUATES OF SLIIT.",
    "TIMELINE: ARTICLES MUST BE PUBLISHED ON OR AFTER 06TH MARCH 2026.",
    "DEADLINE: SUBMISSIONS CLOSE ON 15TH MARCH 2026, 11:59 PM.",
  ];

  const TOPIC_CATEGORIES = [
    {
      title: "Artificial Intelligence and the Future of Work",
      description:
        "How AI tools are transforming industries, jobs, and the way we build software.",
    },
    {
      title:
        "The Rise of Cloud Computing: Building Scalable Applications in the Modern Era",
      description:
        "How cloud platforms enable modern software systems and startups to scale globally.",
    },
    {
      title:
        "Cybersecurity in the Digital Age: Protecting Systems in an AI-Driven World",
      description:
        "Emerging threats, security practices, and the importance of secure development.",
    },
    {
      title: "How Open Source Is Shaping the Future of Technology Innovation",
      description:
        "The role of global open-source communities in building modern software.",
    },
    {
      title: "The Next Generation of Technologies: AI, IoT, and Edge Computing",
      description:
        "How emerging technologies are transforming industries and digital ecosystems.",
    },
  ];

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  const IMPACT_POINTS = [
    {
      title: "Hear from Experienced Women in tech",
      description:
        "Listen to inspiring stories and real career journeys shared by successful women in the tech industry."
    },
    {
      title: "Understand Industry Expectations",
      description:
        "Learn what companies actually expect from future engineers, developers, and innovators."
    },
    {
      title: "Bring Your Tech Questions",
      description:
        "An open environment where you can ask questions about careers, technology, and opportunities."
    },
    {
      title: "Connect with tech Professionals",
      description:
        "Build connections with mentors, engineers, and industry leaders in the tech ecosystem."
    },
    {
      title: "Find Your Direction in Tech",
      description:
        "Discover the tech paths that match your passion — from AI and cloud to open source and cybersecurity."
    }
  ];

  const SPONSORS = [
    {
      name: "SLIIT",
      logo: "assets/logo.png",
    },
    {
      name: "Sponsor Name",
      logo: "/sponsors/sponsor2.png",
    },
    {
      name: "Sponsor Name",
      logo: "/sponsors/sponsor2.png",
    },
    {
      name: "Sponsor Name",
      logo: "/sponsors/sponsor2.png",
    },
  ];

  const SPEAKERS = [
    {
      name: "Speaker Name",
      role: "AI Engineer",
      image: "/speakers/speaker1.jpg",
    },
    {
      name: "Speaker Name",
      role: "Cloud Architect",
      image: "/speakers/speaker2.jpg",
    },
    {
      name:"Aisha Khan",
      role:"Cybersecurity Researcher",
      image:"/speakers/aisha.jpg"
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = DEADLINE - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        expired: false,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);



  return (
    <main className="bg-[#0d0b14] text-white selection:bg-purple-500 font-sans min-h-screen pt-20 md:pt-32 pb-12 md:pb-24 relative overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-purple-600/10 blur-[80px] md:blur-[150px] rounded-full" />
        <div className="absolute top-[10%] right-[-5%] w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-blue-500/10 blur-[60px] md:blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1300px] mx-auto px-6 md:px-8 relative z-10">

        {/* HEADER */}
        <header className="relative">
          <div className="w-16 md:w-24 h-[2px] bg-purple-500 mb-6 md:mb-8" />
          <span className="text-purple-400 font-mono tracking-[0.3em] md:tracking-[0.5em] text-[9px] md:text-[10px] uppercase block mb-4 animate-flicker">
            Phase_02 // Content_Manifesto
          </span>
          {/* Hero Title: Reduced tracking-tighter for that brutalist overlap */}
          <h1 className="text-6xl sm:text-8xl md:text-[10vw] font-[1000] leading-[0.8] tracking-[-0.07em] md:tracking-[-0.09em] uppercase italic text-white mb-8 md:mb-10">
            I m p a c t
            <span className="outlined-text"> X</span>
            <span className="text-purple-500 not-italic ml-[-0.05em]">.</span>
          </h1>
          <p className="mt-6 md:mt-8 max-w-2xl text-lg md:text-xl font-bold uppercase italic text-white/70 leading-snug">
            The industry is quiet; it&apos;s time to create some noise.
            Document your story and secure your place.
          </p>
        </header>

        {/* IMPACT X EVENT DETAILS */}
        <section className="mb-24">

          {/* WHAT IS IMPACT X */}
          <section className="mt-20 max-w-4xl mx-auto">

            <h2 className="text-3xl md:text-4xl font-black italic uppercase mb-12 text-center">
              What is Impact X
            </h2>

            <div className="relative border-l border-purple-500/30 pl-10 space-y-6">

              {IMPACT_POINTS.map((point, i) => (
                <div key={i} className="group relative">

                  {/* timeline dot */}
                  <div className="absolute -left-[26px] top-2 w-4 h-4 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50 group-hover:scale-125 transition"/>

                  {/* card */}
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 backdrop-blur-md transition hover:border-purple-500/40 hover:bg-purple-500/5">

                    <h3 className="text-xl font-bold text-white mb-2">
                      {point.title}
                    </h3>

                    <p className="text-white/70 leading-relaxed">
                      {point.description}
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </section>


          {/* EVENT DESCRIPTION */}
          <section className="mt-24 flex justify-center">

            <div className="relative max-w-2xl w-full bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-md overflow-hidden">

              {/* animated glow */}
              <div className="mb-8 h-1 w-full bg-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-purple-500 w-1/4 animate-scan" />
              </div>

              <div className="absolute inset-0 bg-purple-500/5 animate-glitch-blink pointer-events-none"/>

              <h2 className="text-3xl md:text-4xl font-black italic uppercase mb-6 text-center">
                Impact X Event
              </h2>

              <p className="text-white/70 leading-relaxed mb-6 text-center">
                Impact X is a special initiative by SLIIT Women in FOSS that brings
                together innovators, developers, and aspiring technologists.
                The event highlights the voices of women in open-source,
                leadership, and emerging technologies.
              </p>

              {/* Info rows */}
              <div className="space-y-4">

                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="font-mono text-[10px] text-purple-400 tracking-widest">
                    STATUS
                  </span>
                  <span className="font-bold text-purple-400 animate-pulse">
                    ACTIVE
                  </span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="font-mono text-[10px] text-purple-400 tracking-widest">
                    COMMUNITY
                  </span>
                  <span className="font-bold text-white">
                    WOMEN IN FOSS
                  </span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="font-mono text-[10px] text-purple-400 tracking-widest">
                    EVENT TYPE
                  </span>
                  <span className="font-bold text-white">
                    TECH + OPEN SOURCE
                  </span>
                </div>

              </div>

              <div className="mt-8 h-1 w-full bg-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-purple-500 w-1/4 animate-scan" />
              </div>

            </div>

          </section>

        </section>

        {/* SPONSORS */}
        <section className="mt-24 overflow-hidden">
          <h2 className="text-3xl font-black italic uppercase mb-10">
            Sponsors
          </h2>

          <div className="relative w-full overflow-hidden">

            {/* gradient fade edges */}
            <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-[#3a3448] to-transparent z-10"/>
            <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-[#3a3448] to-transparent z-10"/>

            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-12">

              {[...SPONSORS, ...SPONSORS].map((sponsor, i) => (
                <div className="group flex items-center justify-center h-24 w-48 border border-white/10 rounded-xl bg-white/[0.02] hover:bg-purple-500/10 transition">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-h-10 opacity-70 group-hover:opacity-100 transition"
                  />
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* SPEAKERS */}
        <section className="mt-24 mb-24 ">
          <h2 className="text-3xl font-black italic uppercase mb-10">
            Speakers
          </h2>

          <div className="grid md:grid-cols-5 gap-6">

            {SPEAKERS.length === 0
              ? [...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-64 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-center text-white/40 uppercase tracking-widest"
                  >
                    Reveal Soon
                  </div>
                ))
              : SPEAKERS.map((speaker, i) => (
                  <div
                    key={i}
                    className="group relative h-64 rounded-xl border border-white/10 overflow-hidden bg-white/[0.02]"
                  >
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-110 transition duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    <div className="absolute bottom-4 left-4">
                      <p className="text-white font-bold text-lg">
                        {speaker.name}
                      </p>

                      <p className="text-purple-400 text-sm">
                        {speaker.role}
                      </p>
                    </div>

                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500 transition" />
                  </div>
                ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-stretch">
          {/* LEFT COLUMN: INTEL */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="bg-white/[0.03] border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-sm h-full flex flex-col">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-purple-400 mb-6 md:mb-8 flex items-center gap-2">
                <Activity size={14} className="animate-pulse" aria-hidden="true" /> Briefing_Note
              </h2>

              <div className="mb-8 md:mb-10 p-4 border-l-2 border-purple-500/30 bg-purple-500/5">
                <p className="text-xs font-bold text-purple-400 uppercase mb-2">Why Medium?</p>
                <p className="text-sm text-white/60 leading-relaxed italic">
                  Medium is a global stage. This competition isn&apos;t just a contest; it&apos;s a &quot;Proof of Work&quot; for your career.
                </p>
              </div>

              <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-purple-400 mb-6 flex items-center gap-2">
                <ShieldCheck size={14} aria-hidden="true" /> Submission Rules
              </h2>
              <div className="space-y-6">
                {RULES.map((rule, idx) => (
                  <div key={`rule-${idx}`} className="group">
                    <p className="text-[9px] font-mono text-white/30 mb-1 font-bold">PROTOCOL_0{idx + 1}</p>
                    <p className="text-xs md:text-sm font-black uppercase italic tracking-wide group-hover:text-purple-400 transition-colors leading-tight">
                      {rule}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: UPLINK */}
          <div className="lg:col-span-8 order-1 lg:order-2 group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[2rem] md:rounded-[3rem] blur opacity-10" />
            <div className="relative h-full bg-white/[0.02] border border-white/10 p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] overflow-hidden backdrop-blur-md">
              <div className="flex flex-col h-full justify-between relative z-10">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500">
                      <Fingerprint size={28} className="animate-flicker" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-[1000] uppercase italic tracking-tighter">Transmission Portal</h2>
                      <p className="font-mono text-[8px] md:text-[9px] text-purple-400 uppercase tracking-[0.4em]">Uplink_Status: Stable</p>
                    </div>
                  </div>
                  <div className="mt-8 md:mt-12">
                    <p className="text-3xl md:text-4xl lg:text-5xl font-black uppercase italic leading-[1.1]">
                      READY TO UPLINK <br />
                      YOUR <span className="text-purple-500">MANIFESTO?</span>
                    </p>
                  </div>
                </div>

                <div className="mt-8 md:mt-10 rounded-2xl border border-purple-500/20 bg-white/[0.02] p-5 md:p-6">
                  <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.35em] text-purple-400 mb-4">
                    Topic Categories
                  </p>

                  <ul className="space-y-4">
                    {TOPIC_CATEGORIES.map((item, idx) => (
                      <li key={`topic-${idx}`} className="border-l-2 border-purple-500/40 pl-3">
                        <p className="text-sm md:text-[1rem] font-black italic text-white leading-snug">
                          {item.title}
                        </p>
                        <p className="text-sm md:text-l text-white/65 italic mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 md:mt-10 rounded-2xl border border-purple-500/30 bg-white/[0.02] p-5 md:p-6">
                  <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.35em] text-purple-400 mb-3">
                    Deadline Countdown
                  </p>

                  {timeLeft.expired ? (
                    <p className="text-sm md:text-base font-black italic uppercase text-red-400">
                      Submission closed
                    </p>
                  ) : (
                    <p className="text-lg md:text-2xl font-black italic uppercase text-white tracking-wide">
                      {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
                    </p>
                  )}
                </div>

                <div className="mt-12 md:mt-16">
                  <a
                    href="https://forms.gle/QFKJE49p99mVrEnS8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full group/btn relative items-center justify-between bg-white p-6 md:p-8 text-black transition-all hover:bg-purple-600 hover:text-white rounded-xl md:rounded-2xl"
                  >
                    <span className="relative z-10 font-[1000] uppercase italic tracking-[0.1em] md:tracking-[0.2em] text-lg md:text-2xl flex items-center gap-4">
                      Initiate Submission
                    </span>
                    <ChevronRight className="relative z-10 group-hover/btn:translate-x-2 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>

      <style jsx>{`
        .outlined-text {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.6);
        }
        .stroke-text-white {
          -webkit-text-stroke: 1px white;
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
          60% { opacity: 0.1; }
        }
        @keyframes glitch-blink {
          0%, 20%, 90%, 100% { opacity: 1; filter: brightness(1); }
          5% { opacity: 0.5; filter: brightness(2); }
          95% { opacity: 0.2; }
        }
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-flicker { animation: flicker 3s linear infinite; }
        .animate-glitch-blink { animation: glitch-blink 0.8s ease-in-out infinite; }
        .animate-scan { animation: scan 2s linear infinite; }
      `}</style>
    </main>
  );
}