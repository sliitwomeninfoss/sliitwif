"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Trophy,
  Camera,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface GalleryPhoto {
  id: number;
  src: string;
  alt: string;
  wide?: boolean;
  full?: boolean;
  heightClass?: string;
}

const PHOTOS: GalleryPhoto[] = [
  {
    id: 1,
    src: "/images/impactx/photo1.jpg",
    alt: "ImpactX 2026 opening group photo on stage",
    wide: true,
    heightClass: "h-60 sm:h-72 md:h-80",
  },
  {
    id: 2,
    src: "/images/impactx/photo2.jpg",
    alt: "ImpactX 3D logo and backdrop",
    wide: false,
    heightClass: "h-60 sm:h-72 md:h-80",
  },
  {
    id: 3,
    src: "/images/impactx/photo3.jpg",
    alt: "ImpactX panel discussion with tech leaders",
    wide: true,
    heightClass: "h-48 sm:h-56 md:h-60",
  },
  {
    id: 4,
    src: "/images/impactx/photo4.jpg",
    alt: "Keynote speaker addressing the audience",
    wide: false,
    heightClass: "h-48 sm:h-56 md:h-60",
  },
  {
    id: 5,
    src: "/images/impactx/photo5.jpg",
    alt: "Audience and participants group photo in the auditorium",
    wide: true,
    full: true,
    heightClass: "h-52 sm:h-64 md:h-72",
  },
  {
    id: 6,
    src: "/images/impactx/photo6.jpg",
    alt: "Award presentation to participant",
    wide: false,
    heightClass: "h-56 sm:h-64 md:h-72",
  },
  {
    id: 7,
    src: "/images/impactx/photo7.jpg",
    alt: "Thank You token display for Thilanka Abeywardena",
    wide: false,
    heightClass: "h-56 sm:h-64 md:h-72",
  },
  {
    id: 8,
    src: "/images/impactx/photo8.jpg",
    alt: "Certificate handover to student winner",
    wide: false,
    heightClass: "h-56 sm:h-64 md:h-72",
  },
  {
    id: 9,
    src: "/images/impactx/photo9.jpg",
    alt: "ImpactX organizing team and speakers on stage",
    wide: true,
    heightClass: "h-60 sm:h-72 md:h-80",
  },
  {
    id: 10,
    src: "/images/impactx/photo10.jpg",
    alt: "Raffle draw session host and winner",
    wide: false,
    heightClass: "h-60 sm:h-72 md:h-80",
  },
];

export default function ImpactXGalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = "ImpactX 2026 | SLIIT Women in FOSS";
  }, []);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev === 0 ? PHOTOS.length - 1 : prev - 1) : null
    );
  }, []);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev === PHOTOS.length - 1 ? 0 : prev + 1) : null
    );
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedIndex, handleClose, handlePrev, handleNext]);

  return (
    <div className="bg-[#0b0518] text-white selection:bg-purple-500/30 font-sans min-h-screen pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[140px] rounded-full" />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-[1320px] mx-auto px-6 md:px-10 relative z-10">
        {/* TOP BAR: BACK LINK */}
        <div className="mb-4">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm md:text-base font-medium transition-colors group"
          >
            <ArrowLeft
              size={18}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            <span>Back to Events</span>
          </Link>
        </div>

        {/* HERO TITLE */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-4">
          ImpactX 2026
        </h1>

        {/* META ROW */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-white/80 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/40 bg-purple-950/40 text-purple-200 font-medium">
            <Trophy size={14} className="text-purple-300" />
            Hackathons
          </span>

          <span
            className="w-1.5 h-1.5 rounded-full bg-purple-400/80"
            aria-hidden="true"
          />

          <span className="inline-flex items-center gap-1.5 text-white/80">
            <Camera size={15} className="text-purple-400" />
            10 Photos
          </span>

          <span
            className="w-1.5 h-1.5 rounded-full bg-purple-400/80"
            aria-hidden="true"
          />

          <span className="inline-flex items-center gap-1.5 text-white/80">
            <Calendar size={15} className="text-purple-400" />
            June 2026
          </span>
        </div>

        {/* SHORT DESCRIPTION */}
        <p className="max-w-3xl text-sm sm:text-base text-white/70 leading-relaxed mb-10 md:mb-12 font-normal">
          Impact X is a special initiative by SLIIT Women in FOSS that brings
          together innovators, developers, and aspiring technologists. The event
          highlights the voices of women in open-source, leadership, and emerging
          technologies.
        </p>

        {/* PHOTO GALLERY GRID (Bento Layout) */}
        <section aria-label="ImpactX 2026 photo gallery">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {PHOTOS.map((photo, index) => {
              const colSpanClass = photo.full
                ? "col-span-1 sm:col-span-2 md:col-span-3"
                : photo.wide
                ? "col-span-1 sm:col-span-2 md:col-span-2"
                : "col-span-1";

              return (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`Open photo ${photo.id}: ${photo.alt}`}
                  className={`group relative text-left w-full overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] focus:outline-none focus:ring-2 focus:ring-purple-500 ${colSpanClass} ${
                    photo.heightClass || "h-60 sm:h-72 md:h-80"
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo Lightbox"
          onClick={handleClose}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8 select-none"
        >
          {/* Top Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-[210] font-mono text-xs md:text-sm text-white/80 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-lg">
            {selectedIndex + 1} / {PHOTOS.length}
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            aria-label="Close photo preview"
            className="absolute top-4 right-4 md:top-6 md:right-6 z-[210] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hover:scale-110 active:scale-95 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <X size={24} />
          </button>

          {/* Previous Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous photo"
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-[210] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hover:scale-110 active:scale-95 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-xl"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next photo"
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-[210] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hover:scale-110 active:scale-95 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-xl"
          >
            <ChevronRight size={28} />
          </button>

          {/* Active Image and Caption */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center px-4"
          >
            <div className="relative max-w-full max-h-[75vh]">
              <Image
                src={PHOTOS[selectedIndex].src}
                alt={PHOTOS[selectedIndex].alt}
                width={1200}
                height={800}
                priority
                className="max-w-full max-h-[75vh] w-auto h-auto object-contain rounded-xl md:rounded-2xl shadow-2xl border border-white/10"
              />
            </div>
            <p className="mt-4 text-center text-xs sm:text-sm text-white/70 italic px-4 font-sans max-w-2xl">
              {PHOTOS[selectedIndex].alt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
