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

      <div className="relative w-full overflow-hidden">

        {/* 🌈 Light background gradient */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #F3E9FF 0%, #E7D5FF 40%, #D8BBFF 100%)",
            backgroundSize: "200% 200%",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 20,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        {/* 🌟 FULL-SCREEN ROAMING PURPLE BLOB */}
        <motion.div
          className="absolute w-[500px] h-[600px] rounded-full blur-[180px] opacity-35"
          style={{
            background:
              "radial-gradient(circle, #E0D9FB 0%, #7e05ec 90%, transparent 100%)",
          }}
          animate={{
            x: [
              "-20%",
              "70%",
              "10%",
              "80%",
              "40%",
              "-30%",
            ],
            y: [
              "-10%",
              "20%",
              "60%",
              "-5%",
              "50%",
              "10%",
            ],
            scale: [1, 1.15, 1.05, 1.2, 1.1, 1],
            rotate: [0, 15, -10, 20, -5, 0],
          }}
          transition={{
            duration: 12,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        {/* CONTENT */}
        <div className="relative z-30 px-6 md:px-20 py-40 max-w-[1100px] mx-auto text-center">

          {/* 🔤 Heading animation (letter wave) */}
          <motion.h1
            className="text-3xl md:text-6xl font-extrabold text-[#7e05ec] leading-tight 
              whitespace-normal md:whitespace-nowrap"
            initial={{ opacity: 1 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
            }}
          >
            {"SLIIT Women in FOSS Community".split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.045,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 200,
                }}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Empowering Women with Open Source at SLIIT A community of passionate volunteers 
            promoting, inspiring, and diversifying the use of Free Open Source Software among women.
          </motion.p>

          {/* BUTTON */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 bg-[#7e05ec] text-white px-10 py-4 rounded-xl text-lg shadow-lg hover:shadow-2xl transition"
          >
            Become A Member
          </motion.button>

        </div>
      </div>

      {/* ================================================================================= */}
      {/*                                   WHO WE ARE SECTION                              */}
      {/* ================================================================================= */}

      <div className="w-full bg-white py-20 px-6 md:px-16">
        <div className="max-w-[1200px] mx-auto">

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-3xl md:text-4xl font-semibold text-[#7e05ec] mb-8 text-center"
          >
            Who We Are?
          </motion.h2>

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
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.3,
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-gray-700 text-lg text-center"
            >
              Women In FOSS is an all girls society with its members being female students from the Faculty of Computing of SLIIT.
              The society provides a supportive environment to help girls grow as professionals in the field of IT with attention 
              to Free/Open-Source Software.
            </motion.p>
          </motion.div>

        </div>
      </div>

      {/* ================================================================================= */}
      {/*                                   MASCOT SECTION                                  */}
      {/* ================================================================================= */}

      <div className="relative w-full bg-white px-6 md:px-16 py-20 overflow-visible z-[10]">

        {/* FIXED WAVE (NO ANIMATION) */}
        <motion.div
          className="hidden md:block absolute inset-0 z-[5] pointer-events-none"
        >
          <Image
            src="/sliitwif/images/nifi-wave.png"
            width={3000}
            height={900}
            alt="Wave"
            className="w-full object-cover"
          />
        </motion.div>

        {/* CONTENT */}
        <div className="relative max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 items-center z-[20]">

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
  className="text-3xl md:text-4xl font-bold text-[#7e05ec] mb-4 text-center leading-tight"
>
  Meet Nifi <br />
  Our Official Mascot
</motion.h2>


            <motion.p
  className="text-gray-700 text-lg text-center max-w-[650px] mx-auto leading-relaxed"
>
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
