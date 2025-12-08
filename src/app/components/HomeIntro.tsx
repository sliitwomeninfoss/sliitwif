"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HomeIntro() {
  const ref = useRef(null);

  // Parallax blobs
  const { scrollYProgress } = useScroll({ target: ref });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 160]);

  return (
    <section ref={ref} className="w-full overflow-hidden">

      {/* ================================================================================= */}
      {/*                                   HERO SECTION                                    */}
      {/* ================================================================================= */}

      <div className="relative w-full bg-[#E9E1FF] px-6 md:px-20 py-40">

        <div className="relative z-30 max-w-[1100px] mx-auto text-center">

          {/* Heading animation (fade + slide up) */}
          <motion.h1
            className="text-3xl md:text-6xl font-extrabold text-[#8a1df0] leading-tight text-center"
            initial={{ opacity: 1 }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
            }}
          >
            {"SLIIT Women in FOSS Community".split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 25, rotate: -5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: index * 0.04, type: "spring", stiffness: 200 }}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>




          {/* Paragraph animation (soft fade + slight rise) */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-gray-700 text-xl md:text-1xl max-w-3xl mx-auto leading-relaxed"
          >
            Empowering Women with Open Source at SLIIT A community of passionate volunteers promoting, inspiring, 
            and diversifying the use of Free Open Source Software among women.
          </motion.p>

          {/* Button animation (fade + slight zoom-in) */}
          {/* ===== FLOATING BUTTON ===== */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.button
              initial={{
                opacity: 0,
                x: 200,        // from RIGHT 
                rotate: 180    // spinning while coming
              }}
              animate={{
                opacity: 1,
                x: 0,
                rotate: 0      // stops rotation when landing
              }}
              transition={{
                duration: 0.6,   // FAST
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 bg-[#8a1df0] text-white px-10 py-4 rounded-xl text-lg shadow-lg hover:shadow-2xl transition"
            >
              Become A Member
            </motion.button>

          </motion.div>


        </div>
      </div>



      {/* ================================================================================= */}
      {/*                                   WHO WE ARE SECTION                              */}
      {/* ================================================================================= */}

      <div className="w-full bg-white py-20 px-6 md:px-16">
        <div className="max-w-[1200px] mx-auto">

          {/* Heading - fade + slide UP */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-3xl md:text-4xl font-semibold text-[#7e05ec] mb-8 text-center"
          >
            Who We Are?
          </motion.h2>

          {/* Box container - float up with spring bounce */}
          {/* BOX container - comes first */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-[#EEE6FF] p-8 rounded-2xl shadow-md md:max-w-[900px] mx-auto"
          >

            {/* PARAGRAPH - comes later */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.3,     // <-- delay so it starts after the box appears
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-gray-700 text-lg text-center"
            >
              Women In FOSS is an all girls society with its members being female students
              from the Faculty of Computing of SLIIT. The society provides a supportive
              environment to help girls grow as professionals in the field of IT with
              attention to Free/Open-Source Software.
            </motion.p>

          </motion.div>


        </div>
      </div>



      {/* ================================================================================= */}
      {/*                                   MASCOT SECTION                                  */}
      {/* ================================================================================= */}

      <div className="relative w-full bg-white px-6 md:px-16 py-20 overflow-visible z-[10]">

        {/* Floating Wave ABOVE the white background - hidden on mobile */}
        <motion.div
          className="hidden md:block absolute inset-0 z-[5] pointer-events-none"
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/sliitwif/images/nifi-wave.png"
            width={3000}
            height={800}
            alt="Wave"
            className="w-full object-cover"
          />
        </motion.div>


        {/* CONTENT */}
        <div className="relative max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 items-center z-[20]">

          {/* Floating Mascot */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="flex justify-center -mt-20"
          >
            <Image
              src="/sliitwif/images/mascot-nifi.png"
              width={360}
              height={360}
              alt="Nifi Mascot"
              className="drop-shadow-xl"
            />
          </motion.div>

          {/* Text */}
          {/* Text Section - Jump from Top + Slide from Right */}
          <motion.div
            initial={{ opacity: 0, y: -60, x: 40 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            transition={{
              duration: 1.6,
              type: "spring",
              stiffness: 60,
              damping: 18
            }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center md:text-left"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-[#7e05ec] mb-4"
            >
              Meet Nifi — Our Official Mascot
            </motion.h2>

            <motion.p className="text-gray-700 text-lg">
              Nifi is thrilled to be a part of women tech enthusiasts as our
              cute, fluffy official mascot of the SLIIT Women In FOSS Community.
              Join hands with her and the community to explore the world of
              Women In FOSS.
            </motion.p>
          </motion.div>


        </div>
      </div>


    </section>
  );
}
