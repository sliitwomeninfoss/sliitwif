'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RecruitmentPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('recruitment-popup-seen');
    if (!seen) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('recruitment-popup-seen', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[999]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[1000] flex items-center justify-center px-4 pointer-events-none"
          >
            <div className="relative w-full max-w-2xl bg-[#0b0518] border border-purple-500/20 overflow-hidden pointer-events-auto selection:bg-purple-500">

              {/* Close button */}
              <button
                onClick={handleClose}
                aria-label="Close"
                className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center border border-white/10 hover:border-purple-500/50 text-white/40 hover:text-white transition-all duration-200"
              >
                <X size={13} />
              </button>

              {/* Banner image */}
              <div className="relative w-full h-52 md:h-64 overflow-hidden">
                <Image
                  src="/images/Board_image.png"
                  alt="SLIIT WIF — We Are Recruiting"
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-purple-950/40 via-transparent to-[#0b0518]" />

                {/* Status badge over image */}
                <div className="absolute bottom-4 left-6">
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-purple-300">
                      Now Recruiting — 2026 Intake
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">

                  {/* Left: text + CTA */}
                  <div className="flex-1 space-y-5">
                    <h2 className="text-[11vw] md:text-5xl font-[1000] uppercase leading-[0.85] tracking-[-0.04em] text-white">
                      WE ARE <br />
                      <span className="text-purple-500 italic">RECRUITING.</span>
                    </h2>

                    <div className="h-px w-12 bg-purple-500" />

                    <p className="text-purple-100/55 text-sm leading-relaxed font-light max-w-xs">
                      We&apos;re looking for passionate girls to learn, build, and lead in tech together. Join SLIIT Women in FOSS and be part of something real.
                    </p>

                    {/* Pill tags */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-1.5 rounded-full bg-purple-600/15 border border-purple-500/25 text-purple-300 text-[10px] font-mono uppercase tracking-widest">
                        Open to all girls
                      </span>
                      <span className="px-4 py-1.5 rounded-full bg-purple-600/15 border border-purple-500/25 text-purple-300 text-[10px] font-mono uppercase tracking-widest">
                        All skill levels
                      </span>
                    </div>

                    {/* CTA */}
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSf8FzkPDOKkh6pSdmB03U05So2HvuNVDph64iXbSIKDBO7GHw/viewform"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleClose}
                      className="group relative inline-flex px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-[10px] overflow-hidden transition-all duration-300"
                    >
                      <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                        Apply Now
                      </span>
                      <div className="absolute inset-0 bg-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]" />
                    </a>
                  </div>

                  {/* Right: QR code */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-2 md:pt-2">
                    <div className="relative w-28 h-28 md:w-[130px] md:h-[130px] bg-white p-2 border border-purple-500/20">
                      <Image
                        src="/images/QRCode.png"
                        alt="Scan to Apply"
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-purple-400/50">
                      Scan to Apply
                    </span>
                  </div>

                </div>
              </div>

              {/* Bottom accent */}
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
