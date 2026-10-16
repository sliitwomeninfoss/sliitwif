"use client";

import React, { useState, useMemo } from 'react';
import { Linkedin, Facebook, Instagram, Zap, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import boardData from "./board.json";
import subcommitteeData from "./subcommittee.json";

// --- Types ---
export interface BoardMember {
  role?: string;
  ROLE?: string;
  name?: string;
  NAME?: string;
  imageSrc?: string;
  IMAGE_SRC?: string;
  facebook?: string;
  FACEBOOK?: string;
  instagram?: string;
  INSTAGRAM?: string;
  linkedin?: string;
  LINKEDIN?: string;
}

export interface SubcommitteeMember extends BoardMember {
  team: string;
}

const rawBoardData = boardData as Record<string, BoardMember[]>;
const rawSubcommitteeData = subcommitteeData as Record<string, SubcommitteeMember[]>;

function SubcommitteeCard({ member }: { member: SubcommitteeMember }) {
  const displayName = member.name || member.NAME || "Subcommittee Member";
  const imageSrc = member.imageSrc || member.IMAGE_SRC || "#";
  const linkedin = member.linkedin || member.LINKEDIN || "#";
  const facebook = member.facebook || member.FACEBOOK || "#";
  const instagram = member.instagram || member.INSTAGRAM || "#";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  const hasImage = Boolean(imageSrc && imageSrc !== "#");
  const hasLinkedin = Boolean(linkedin && linkedin !== "#");
  const hasFacebook = Boolean(facebook && facebook !== "#");
  const hasInstagram = Boolean(instagram && instagram !== "#");

  return (
    <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex flex-col group transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-500/60 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:bg-white/[0.04] w-[calc(50%-12px)] sm:w-[168px] max-w-[170px]">
      {/* Image Box */}
      <div className="relative aspect-square rounded-lg overflow-hidden mb-4 shadow-xl">
        {hasImage ? (
          <Image
            src={imageSrc}
            alt={displayName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 30vw, 150px"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-purple-950/60 text-2xl font-black text-white/20 select-none">
            {initials}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 pointer-events-none" />
      </div>

      {/* Text Info */}
      <div className="flex flex-col flex-grow text-center">
        <h4 className="text-[11px] sm:text-xs font-black uppercase italic tracking-tight leading-tight mb-4 min-h-[2.4em] flex items-center justify-center">
          {displayName}
        </h4>

        {/* Socials */}
        <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between">
          <div className="flex gap-3">
            {hasLinkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white transition-colors"
                aria-label={`${displayName} LinkedIn`}
              >
                <Linkedin size={12} />
              </a>
            )}
            {hasFacebook && (
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white transition-colors"
                aria-label={`${displayName} Facebook`}
              >
                <Facebook size={12} />
              </a>
            )}
            {hasInstagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white transition-colors"
                aria-label={`${displayName} Instagram`}
              >
                <Instagram size={12} />
              </a>
            )}
            {!hasLinkedin && !hasFacebook && !hasInstagram && (
              <div className="flex gap-2.5 text-white/10">
                <Linkedin size={12} />
                <Instagram size={12} />
                <Facebook size={12} />
              </div>
            )}
          </div>
          <ArrowUpRight size={10} className="text-white/10 group-hover:text-purple-500 transition-colors" />
        </div>
      </div>
    </div>
  );
}

export default function BoardPage() {
  const years = useMemo(() => {
    return Object.keys(rawBoardData)
      .filter((key) => /^\d{4}$/.test(key))
      .reverse();
  }, []);

  const [activeYear, setActiveYear] = useState(years[0] || "2026");

  const subcommitteeMembers = useMemo(() => {
    return rawSubcommitteeData[activeYear] || [];
  }, [activeYear]);

  const groupedSubcommittee = useMemo(() => {
    const predefinedOrder = [
      "Development",
      "Graphic Design",
      "Event Management",
      "Content Creation",
      "Social Media"
    ];

    const groups: { team: string; members: SubcommitteeMember[] }[] = [];

    predefinedOrder.forEach((teamName) => {
      const members = subcommitteeMembers.filter(
        (m) => m.team?.trim().toLowerCase() === teamName.toLowerCase()
      );
      if (members.length > 0) {
        groups.push({ team: teamName, members });
      }
    });

    subcommitteeMembers.forEach((m) => {
      if (
        m.team &&
        !groups.some((g) => g.team.toLowerCase() === m.team.trim().toLowerCase())
      ) {
        const teamName = m.team.trim();
        const members = subcommitteeMembers.filter(
          (item) => item.team?.trim().toLowerCase() === teamName.toLowerCase()
        );
        groups.push({ team: teamName, members });
      }
    });

    return groups;
  }, [subcommitteeMembers]);

  const currentBoardList = useMemo(() => {
    return rawBoardData[activeYear] || [];
  }, [activeYear]);

  return (
    <main className="bg-[#0b041a] text-white selection:bg-purple-500 font-sans min-h-screen pt-32 pb-24 relative overflow-x-hidden">
      {/* AMBIENCE */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-purple-600/30 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-[1300px] mx-auto px-8 relative z-10">
        <header className="mb-20">
          <div className="w-16 h-1 bg-purple-500 mb-6" />
          <span className="text-purple-400 font-mono tracking-[0.4em] text-[10px] uppercase block mb-3">
            Board Members // Vision
          </span>
          <h1 className="text-[10vw] lg:text-[7vw] font-[1000] leading-[0.8] tracking-[-0.08em] uppercase italic mb-12">
            THE <br />
            <span className="text-transparent stroke-text-white">FORCE</span>
            <span className="text-purple-500 not-italic">.</span>
          </h1>

          <nav className="flex flex-wrap gap-4">
            {years.map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => setActiveYear(year)}
                className={`px-8 py-2.5 transition-all duration-300 ${
                  activeYear === year 
                  ? "bg-white text-black font-black italic uppercase text-xs shadow-lg" 
                  : "bg-white/5 text-white/40 hover:bg-white/10 text-xs uppercase font-bold"
                }`}
              >
                {year}
              </button>
            ))}
          </nav>
        </header>

        {/* SPACED GRID */}
        <div className="flex flex-wrap justify-center gap-y-16 gap-x-10">
          {currentBoardList.map((member, index) => {
            const displayRole = member.role || member.ROLE || "";
            const displayName = member.name || member.NAME || "Board Member";
            const imageSrc = member.imageSrc || member.IMAGE_SRC || "#";
            const linkedin = member.linkedin || member.LINKEDIN || "#";
            const facebook = member.facebook || member.FACEBOOK || "#";
            const instagram = member.instagram || member.INSTAGRAM || "#";
            const initials = displayName
              .split(" ")
              .filter(Boolean)
              .map((part) => part[0])
              .join("")
              .slice(0, 2);
            const hasImage = Boolean(imageSrc && imageSrc !== "#");
            const hasLinkedin = Boolean(linkedin && linkedin !== "#");
            const hasFacebook = Boolean(facebook && facebook !== "#");
            const hasInstagram = Boolean(instagram && instagram !== "#");

            return (
              <div 
                key={`${activeYear}-${displayName}-${index}`}
                className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex flex-col group transition-all duration-500 hover:border-purple-500/30 hover:bg-white/[0.04] w-[calc(50%-20px)] md:w-[calc(33.33%-27px)] lg:w-[calc(20%-32px)] max-w-[210px]"
              >
                {/* Image Box */}
                <div className="relative aspect-square rounded-xl overflow-hidden mb-6 shadow-2xl">
                  {hasImage ? (
                    <Image 
                      src={imageSrc} 
                      alt={displayName}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 30vw, 12vw"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-purple-950/60 text-4xl font-black text-white/20">
                      {initials}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
                </div>

                {/* Text Info */}
                <div className="flex flex-col flex-grow text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-2">
                    <Zap size={8} className="text-purple-500 fill-purple-500" />
                    <span className="text-purple-400 font-mono text-[8px] uppercase tracking-[0.2em] leading-none">
                      {displayRole}
                    </span>
                  </div>
                  
                  <h3 className="text-xs md:text-[13px] font-black uppercase italic tracking-tight leading-tight mb-6 min-h-[2.5em] flex items-center justify-center">
                    {displayName}
                  </h3>

                  {/* Socials */}
                  <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex gap-4">
                      {hasLinkedin && (
                        <a 
                          href={linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-white/30 hover:text-white transition-colors"
                          aria-label={`${displayName} LinkedIn`}
                        >
                          <Linkedin size={15} />
                        </a>
                      )}
                      {hasFacebook && (
                        <a 
                          href={facebook} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-white/30 hover:text-white transition-colors"
                          aria-label={`${displayName} Facebook`}
                        >
                          <Facebook size={15} />
                        </a>
                      )}
                      {hasInstagram && (
                        <a 
                          href={instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-white/30 hover:text-white transition-colors"
                          aria-label={`${displayName} Instagram`}
                        >
                          <Instagram size={15} />
                        </a>
                      )}
                    </div>
                    <ArrowUpRight size={12} className="text-white/10 group-hover:text-purple-500 transition-colors" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SUB COMMITTEE SECTION - Only displayed when 2026 tab is active */}
        {activeYear === "2026" && groupedSubcommittee.length > 0 && (
          <section className="mt-36 pt-20 border-t border-purple-500/20 relative">
            <div className="mb-20">
              <div className="w-16 h-1 bg-purple-500 mb-6" />
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-purple-400 font-mono tracking-[0.4em] text-[10px] uppercase">
                  Subcommittee // Structure
                </span>
                <span className="inline-flex items-center px-3 py-1 bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-[10px] tracking-[0.2em] rounded-full uppercase font-bold">
                  2026 / 27
                </span>
              </div>
              <h2 className="text-[10vw] lg:text-[7vw] font-[1000] leading-[0.8] tracking-[-0.08em] uppercase italic">
                SUB <br />
                <span className="text-transparent stroke-text-white">COMMITTEE</span>
                <span className="text-purple-500 not-italic">.</span>
              </h2>
            </div>

            {/* Desktop layout: 2 team groups per row, Social Media centered on bottom row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-20">
              {groupedSubcommittee.map((group) => {
                const isSocialMedia = group.team.toLowerCase() === "social media";
                return (
                  <div
                    key={group.team}
                    className={`flex flex-col items-center ${isSocialMedia ? "lg:col-span-2" : ""}`}
                  >
                    {/* Team Header */}
                    <div className="flex items-center justify-center gap-2.5 mb-8">
                      <span className="text-purple-500/40 font-mono tracking-widest select-none">———</span>
                      <div className="flex items-center gap-2 text-purple-400 font-mono text-xs sm:text-sm font-black tracking-[0.25em] uppercase">
                        <Zap size={13} className="text-purple-500 fill-purple-500" />
                        <span>{group.team}</span>
                      </div>
                      <span className="text-purple-500/40 font-mono tracking-widest select-none">———</span>
                    </div>

                    {/* Member Cards */}
                    <div className="flex flex-wrap justify-center gap-6 w-full">
                      {group.members.map((member, mIdx) => (
                        <SubcommitteeCard
                          key={`${group.team}-${member.name}-${mIdx}`}
                          member={member}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>

      <style jsx global>{`
        .stroke-text-white {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        }
        @media (min-width: 768px) {
          .stroke-text-white { -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.4); }
        }
      `}</style>
    </main>
  );
}
