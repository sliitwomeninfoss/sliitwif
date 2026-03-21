"use client";

import React, { useEffect, useState } from "react";
import {
  ShieldCheck,
  ChevronRight,
  Fingerprint,
  Activity,
  Lock,
} from "lucide-react";

const DEADLINE = new Date("2026-03-21T23:59:00+05:30").getTime();

type TimelineItemProps = {
  title: string;
  description: string;
};

type InfoRowProps = {
  label: string;
  value: string;
  valueClass?: string;
};

type ImpactPoint = {
  title: string;
  description: string;
};

type Sponsor = {
  id: string;
  name: string;
  logo?: string;
  tier?: "platinum" | "golden" | "default";
};

type Speaker = {
  id: number;
  name: string;
  role: string;
  image: string;
  status: "hidden" | "revealed";
};

const TimelineItem: React.FC<TimelineItemProps> = ({ title, description }) => (
  <div className="group relative">
    {/* timeline dot */}
    <div className="absolute -left-[26px] top-2 w-4 h-4 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50 transition group-hover:scale-125" />

    {/* card */}
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 backdrop-blur-md transition hover:border-purple-500/40 hover:bg-purple-500/5">
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/70 leading-relaxed">{description}</p>
    </div>
  </div>
);

const InfoRow: React.FC<InfoRowProps> = ({
  label,
  value,
  valueClass = "text-white",
}) => (
  <div className="flex justify-between border-b border-white/10 pb-2">
    <span className="font-mono text-[10px] text-purple-400 tracking-widest">
      {label}
    </span>
    <span className={`font-bold ${valueClass}`}>{value}</span>
  </div>
);

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

  const IMPACT_POINTS: ImpactPoint[] = [
    {
      title: "Hear from Experienced Women in tech",
      description:
        "Listen to inspiring stories and real career journeys shared by successful women in the tech industry.",
    },
    {
      title: "Understand Industry Expectations",
      description:
        "Learn what companies actually expect from future engineers, developers, and innovators.",
    },
    {
      title: "Bring Your Tech Questions",
      description:
        "An open environment where you can ask questions about careers, technology, and opportunities.",
    },
    {
      title: "Connect with tech Professionals",
      description:
        "Build connections with mentors, engineers, and industry leaders in the tech ecosystem.",
    },
    {
      title: "Find Your Direction in Tech",
      description:
        "Discover the tech paths that match your passion — from AI and cloud to open source and cybersecurity.",
    },
  ];

  const SPONSORS: Sponsor[] = [
    {
      id: "sliit",
      name: "SLIIT",
      logo: "/assets/logo.png",
      tier: "default",
    },
    {
      id: "sp-1-platinum",
      name: "Perituza Software Solutions - Platinum Partner",
      logo: "/images/sponsors/perituza.png",
      tier: "platinum",
    },
    {
      id: "sp-2-golden",
      name: "SoftSora(Pvt) Ltd - Golden Partner",
      logo: "/images/sponsors/softsora.png",
      tier: "golden",
    },
    {
      id: "sp-3",
      name: "Media Unit-FOC SLIIT",
      logo: "/images/sponsors/media.png",
      tier: "default",
    },
  ];

  const speakers: Speaker[] = [
    {
      id: 1,
      name: "Yuka La Tulippe",
      role: "Co-CEO & General Manager of APAC operations at Perituza Software Solutions",
      image: "/images/speakers/Yuka.jpeg",
      status: "revealed",
    },
    {
      id: 2,
      name: "Dr.Kalpani Manathunga",
      role: "Head of Department of Software Engineering at SLIIT",
      image: "/images/speakers/Kalpani.png",
      status: "revealed",
    },
    {
      id: 3,
      name: "Thilanka Abeywardena",
      role: "Asia Cloud & AI integrated Marketing Lead - Migration & Modernization at Microsoft",
      image: "/images/speakers/Thilanka.jpeg",
      status: "revealed",
    },
    {
      id: 4,
      name: "Wyomi Ranasinghe",
      role: "Head of Research & Innovation at Platned",
      image: "/images/speakers/Wyomi.png",
      status: "revealed",
    },
    {
      id: 5,
      name: "Anjalie Gamage",
      role: "Senior Lecturer at Faculty of Computing at SLIIT",
      image: "/images/speakers/Anjalie.png",
      status: "revealed",
    },
    {
      id: 6,
      name: "Udara Thewarahannadige",
      role: "Co-Founder, Cheif Operating Officer at STEM Link",
      image: "/images/speakers/Udara.png",
      status: "revealed",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = DEADLINE - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          expired: true,
        });
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
          <h1 className="text-6xl sm:text-8xl md:text-[10vw] font-[1000] leading-[0.8] tracking-[-0.07em] md:tracking-[-0.09em] uppercase italic text-white mb-8 md:mb-10">
            I m p a c t
            <span className="outlined-text"> X</span>
            <span className="text-purple-500 not-italic ml-[-0.05em]">.</span>
          </h1>
          <p className="mt-6 md:mt-8 max-w-2xl text-lg md:text-xl font-bold uppercase italic text-white/70 leading-snug">
            The industry is quiet; it&apos;s time to create some noise. Document
            your story and secure your place.
          </p>
        </header>

        {/* IMPACT X EVENT DETAILS */}
        <section className="mb-24 mt-16">
          <h2 className="text-3xl md:text-4xl font-black italic uppercase mb-16 text-center">
            What is Impact X
          </h2>

          <div className="grid md:grid-cols-2 gap-16 items-stretch max-w-6xl mx-auto">
            {/* LEFT - TIMELINE */}
            <div className="relative border-l border-purple-500/30 pl-10 space-y-6">
              {IMPACT_POINTS.map((point) => (
                <TimelineItem
                  key={point.title}
                  title={point.title}
                  description={point.description}
                />
              ))}
            </div>

            {/* RIGHT - EVENT CARD */}
            <div className="relative h-full flex flex-col justify-between bg-white/[0.04] border border-white/10 rounded-2xl p-10 backdrop-blur-md overflow-hidden">
              <div className="absolute inset-0 bg-purple-500/5 animate-glitch-blink pointer-events-none" />

              <div className="mb-8 h-1 w-full bg-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-purple-500 w-1/4 animate-scan" />
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-black italic uppercase mb-6 text-center">
                  Impact X Event
                </h2>

                <p className="text-white/70 leading-relaxed mb-8 text-center max-w-md mx-auto">
                  Impact X is a special initiative by SLIIT Women in FOSS that
                  brings together innovators, developers, and aspiring
                  technologists. The event highlights the voices of women in
                  open-source, leadership, and emerging technologies.
                </p>

                <div className="space-y-5">
                  <InfoRow
                    label="STATUS"
                    value="ACTIVE"
                    valueClass="text-purple-400 animate-pulse"
                  />
                  <InfoRow label="COMMUNITY" value="WOMEN IN FOSS" />
                  <InfoRow label="EVENT TYPE" value="TECH + OPEN SOURCE" />
                </div>
              </div>

              <div className="mt-10">
                <div className="text-center text-white/40 text-xs font-mono tracking-widest mb-4">
                  LIVE EVENT • NETWORK • LEARN • GROW
                </div>

                <div className="h-1 w-full bg-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-purple-500 w-1/4 animate-scan" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SPONSORS */}
        <section className="mt-24 overflow-hidden">
          <h2 className="text-3xl font-black italic uppercase mb-10 flex items-center gap-4">
            Partners
            <span className="w-full h-[1px] bg-gradient-to-r from-purple-500/50 to-transparent" />
          </h2>

          <div className="relative w-full">
            <div className="absolute left-0 top-0 w-40 h-full bg-gradient-to-r from-[#0d0b14] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 w-40 h-full bg-gradient-to-l from-[#0d0b14] to-transparent z-20 pointer-events-none" />

            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-10 py-6">
              {[...SPONSORS, ...SPONSORS].map((sponsor, index) => {
                const isRevealed = Boolean(sponsor.logo);

                const glowStyles: Record<string, string> = {
                  golden: "from-yellow-400/20",
                  platinum: "from-gray-300/20",
                  default: "from-purple-500/10",
                };

                const borderStyles: Record<string, string> = {
                  golden: "hover:border-yellow-400/50",
                  platinum: "hover:border-gray-300/50",
                  default: "hover:border-purple-500/50",
                };

                const shadowStyles: Record<string, string> = {
                  golden:
                    "group-hover:drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]",
                  platinum:
                    "group-hover:drop-shadow-[0_0_15px_rgba(200,200,200,0.6)]",
                  default:
                    "group-hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]",
                };

                const tier = sponsor.tier ?? "default";

                return (
                  <div
                    key={`${sponsor.id}-${index}`}
                    className={`group relative flex items-center justify-center h-28 w-64 border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent rounded-2xl transition-all duration-500 hover:scale-[1.02] ${borderStyles[tier]}`}
                  >
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] ${glowStyles[tier]}`}
                    />

                    {isRevealed ? (
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name ?? "Sponsor logo"}
                        className={`h-12 w-auto object-contain grayscale brightness-200 opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 filter drop-shadow-[0_0_10px_rgba(168,85,247,0)] ${shadowStyles[tier]}`}
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <div className="relative">
                          <span className="text-5xl font-[900] text-white/10 group-hover:text-purple-500/20 transition-colors duration-500 italic">
                            ?
                          </span>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-1 bg-white/10 group-hover:bg-purple-500/40 transition-all duration-900 group-hover:w-full group-hover:rotate-12" />
                          </div>
                        </div>
                        <span className="mt-2 font-mono text-[8px] text-white/30 tracking-[0.3em] uppercase">
                          Hidden
                        </span>
                      </div>
                    )}

                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all">
                      <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse" />
                    </div>

                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-bottom-1 transition-all">
                      <span className="font-mono text-[8px] text-purple-400 uppercase tracking-[0.3em] bg-[#0d0b14] px-2 py-0.5 border border-purple-500/20 rounded-full">
                        {isRevealed
                          ? tier === "golden"
                            ? "Gold_Partner"
                            : tier === "platinum"
                            ? "Platinum_Partner"
                            : "Organizer"
                          : "Classified"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SPEAKERS */}
        <section className="mt-24 mb-24">
          <h2 className="text-3xl font-black italic uppercase mb-10">
            Speakers
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {speakers.map((speaker, index) => (
              <div
                key={speaker.id}
                className="group relative h-72 rounded-xl border border-white/10 overflow-hidden bg-white/[0.02] transition-all duration-500 hover:border-purple-500/50 hover:bg-purple-500/[0.03]"
              >
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-3">
                  {speaker.status === "hidden" ? (
                    <>
                      <div className="relative">
                        <span className="text-7xl font-[1000] text-white/5 group-hover:text-purple-500/20 italic transition-colors duration-500">
                          ?
                        </span>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-1 bg-white/10 group-hover:bg-purple-500/40 transition-all duration-700 group-hover:w-full group-hover:rotate-12" />
                        </div>
                      </div>
                      <div className="mt-4 flex flex-col items-center">
                        <Lock
                          size={16}
                          className="text-white/20 group-hover:text-purple-500/50 mb-2"
                        />
                        <span className="font-mono text-[8px] text-white/30 tracking-[0.3em] uppercase">
                          Encrypted
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src={speaker.image || undefined}
                        alt={speaker.name}
                        className="w-24 h-24 rounded-full object-cover border border-white/10 mb-3"
                      />
                      <p className="text-xs text-white/50">{speaker.role}</p>
                      <div className="mt-6" />
                      <br/>
                      <br/>
                      <br/>
                    </>
                  )}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <div className="flex flex-col gap-1">
                    <p className="font-mono text-[9px] text-purple-400 tracking-[0.2em] uppercase opacity-60">
                      _0{index + 1}
                    </p>
                    <p className="text-sm font-black italic uppercase tracking-tighter text-white/40 group-hover:text-white/70 transition-colors">
                      {speaker.status === "hidden"
                        ? "Identity_Hidden"
                        : speaker.name}
                    </p>
                  </div>

                  <div className="mt-3 h-[2px] w-full bg-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-purple-600 w-1/3 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />
                  </div>
                </div>

                <div className="absolute inset-0 pointer-events-none">
                  <div className="h-20 w-full bg-gradient-to-b from-transparent via-purple-500/10 to-transparent -translate-y-full group-hover:animate-scan" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-stretch">
          {/* LEFT COLUMN: INTEL */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="bg-white/[0.03] border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-sm h-full flex flex-col">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-purple-400 mb-6 md:mb-8 flex items-center gap-2">
                <Activity size={14} className="animate-pulse" aria-hidden="true" />{" "}
                Briefing_Note
              </h2>

              <div className="mb-8 md:mb-10 p-4 border-l-2 border-purple-500/30 bg-purple-500/5">
                <p className="text-xs font-bold text-purple-400 uppercase mb-2">
                  Why Medium?
                </p>
                <p className="text-sm text-white/60 leading-relaxed italic">
                  Medium is a global stage. This competition isn&apos;t just a
                  contest; it&apos;s a &quot;Proof of Work&quot; for your career.
                </p>
              </div>

              <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-purple-400 mb-6 flex items-center gap-2">
                <ShieldCheck size={14} aria-hidden="true" /> Submission Rules
              </h2>
              <div className="space-y-6">
                {RULES.map((rule, idx) => (
                  <div key={`rule-${idx}`} className="group">
                    <p className="text-[9px] font-mono text-white/30 mb-1 font-bold">
                      PROTOCOL_0{idx + 1}
                    </p>
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
                      <Fingerprint
                        size={28}
                        className="animate-flicker"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-[1000] uppercase italic tracking-tighter">
                        Transmission Portal
                      </h2>
                      <p className="font-mono text-[8px] md:text-[9px] text-purple-400 uppercase tracking-[0.4em]">
                        Uplink_Status: Stable
                      </p>
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
                      <li
                        key={`topic-${idx}`}
                        className="border-l-2 border-purple-500/40 pl-3"
                      >
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
                      {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m
                      : {timeLeft.seconds}s
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
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.2;
          }
          60% {
            opacity: 0.1;
          }
        }
        @keyframes glitch-blink {
          0%,
          20%,
          90%,
          100% {
            opacity: 1;
            filter: brightness(1);
          }
          5% {
            opacity: 0.5;
            filter: brightness(2);
          }
          95% {
            opacity: 0.2;
          }
        }
        @keyframes scan {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(300%);
          }
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
        .animate-flicker {
          animation: flicker 3s linear infinite;
        }
        .animate-glitch-blink {
          animation: glitch-blink 0.8s ease-in-out infinite;
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </main>
  );
}