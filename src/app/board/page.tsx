"use client";

import React, { useState, useMemo } from 'react';
import { Linkedin, Facebook, Zap, ArrowUpRight } from "lucide-react";
import Image from "next/image";

// --- Types ---
export interface BoardMember {
  role: string;
  name: string;
  imageSrc: string;
  facebook: string;
  linkedin: string;
}

const rawBoardData: Record<string, BoardMember[]> = {
  "2021": [
    { role: "CLUB LEAD", name: "Sewvandi Wickramasinghe", imageSrc: "/assets/2021/Sewvandi.JPG", facebook: "https://www.facebook.com/sewvandi.wickramasinghe.3", linkedin: "https://www.linkedin.com/in/sewvandi-promodya-wickramasinghe/" },
    { role: "DEVELOPING TEAM LEAD", name: "Hansi Pabasara", imageSrc: "/assets/2021/Hansi.jpg", facebook: "#", linkedin: "#" },
    { role: "WEB AND GRAPHIC TEAM LEAD", name: "Uvini Wijesinghe", imageSrc: "/assets/2021/Uvini.jpg", facebook: "#", linkedin: "https://www.linkedin.com/in/uvini-wijesinghe/" },
    { role: "CONTENT WRITING TEAM LEAD", name: "Thathsarani Wickramaarachchi", imageSrc: "/assets/2021/Thathsarani.jpg", facebook: "https://www.facebook.com/thathsarani.wickramaarachchi", linkedin: "https://www.linkedin.com/in/thathsarani-wickramaarachchi/" },
    { role: "MEMBERSHIP AND RECRUITING LEAD", name: "Nishiki Yapa", imageSrc: "/assets/2021/Nishiki.jpeg", facebook: "https://www.facebook.com/nishiki.yapa.7", linkedin: "https://www.linkedin.com/in/nishiki-yapa-361778168/" },
    { role: "TECHNICAL LEAD", name: "Renu Harshatha", imageSrc: "/assets/2021/Renu.jpg", facebook: "https://www.facebook.com/renu.harshatha", linkedin: "https://www.linkedin.com/in/renu.harshatha/" },
    { role: "MARKETING AND PUBLICITY LEAD", name: "Oshadi Ranathunga", imageSrc: "/assets/2021/Oshadi.jpeg", facebook: "https://www.facebook.com/dilini.ranathunga.520", linkedin: "#" }
  ],
  "2022": [
    { role: "CLUB LEAD", name: "Bhagya Indimagedara", imageSrc: "/assets/2022/Bhagya.jpeg", facebook: "https://web.facebook.com/kithminiii/", linkedin: "https://www.linkedin.com/in/bhagya-indimagedara/" },
    { role: "DEVELOPMENT LEAD", name: "Dulya Perera", imageSrc: "/assets/2022/Dulya.jpg", facebook: "https://www.facebook.com/dul.perera.56/", linkedin: "https://www.linkedin.com/in/dulya-perera-188ab31b9" },
    { role: "DESIGN LEAD", name: "Sandali Kalavitigoda", imageSrc: "/assets/2022/Sanali.jpg", facebook: "#", linkedin: "https://www.linkedin.com/in/sandali-kalavitigoda/" },
    { role: "CONTENT WRITING LEAD", name: "Sheikha Hanna", imageSrc: "/assets/2022/Sheikha hannah.jpeg", facebook: "#", linkedin: "https://www.linkedin.com/in/sheikha-hanna-7127761b5/" },
    { role: "PROJECT COORDINATOR", name: "Dulakshi Hansani", imageSrc: "/assets/2022/Dulakshi.jpeg", facebook: "#", linkedin: "https://www.linkedin.com/in/dulakshi-senevirathne-439bb1215" },
    { role: "EVENT COORDINATOR", name: "Methmi Nugawela", imageSrc: "/assets/2022/Methmi.png", facebook: "#", linkedin: "https://www.linkedin.com/in/methmi-nugawela/" },
    { role: "MEMBERSHIP LEAD", name: "Senara Perera", imageSrc: "/assets/2022/Senara.jpg", facebook: "#", linkedin: "https://www.linkedin.com/in/senaraperera/" },
    { role: "MARKETING LEAD", name: "Modeesha Kalani", imageSrc: "/assets/2022/Modeesha.jpeg", facebook: "https://www.facebook.com/modeesha.kalani.3", linkedin: "https://www.linkedin.com/in/modeesha-kalani-b22043199" }
  ],
  "2023": [
    { role: "COMMUNITY LEAD", name: "Sheikha Hanna", imageSrc: "/assets/2023/SheikhaHanna.jpeg", facebook: "https://web.facebook.com/art.mode.7739/?_rdc=1&_rdr", linkedin: "https://www.linkedin.com/in/sheikha-hanna-7127761b5/" },
    { role: "DEVELOPMENT LEAD", name: "Sandalika Ariyarathna", imageSrc: "/assets/2023/Sandalika.jpg", facebook: "https://www.facebook.com/profile.php?id=100009407160156", linkedin: "https://www.linkedin.com/in/dilini-sandalika96" },
    { role: "DESIGN LEAD", name: "Shavidini Ekanayake", imageSrc: "/assets/2023/Shavidini.png", facebook: "https://web.facebook.com/shavi.dilunika/", linkedin: "https://www.linkedin.com/in/shavidini-ekanayake-9368a51ba/" },
    { role: "CONTENT WRITING LEAD", name: "AKILA PERERA", imageSrc: "/assets/2023/AkilaPerera.jpeg", facebook: "#", linkedin: "#" },
    { role: "EVENT COORDINATOR", name: "Kavindu Chethani", imageSrc: "/assets/2023/Chethani.jpg", facebook: "#", linkedin: "#" },
    { role: "MARKETING LEAD", name: "Irushi Gunawardana", imageSrc: "/assets/2023/Irushi .jpg", facebook: "#", linkedin: "#" }
  ],
  "2024": [
    { role: "COMMUNITY LEAD", name: "AKILA PERERA", imageSrc: "/assets/2024/AkilaPerera.jpeg", facebook: "#", linkedin: "#" },
    { role: "DEVELOPMENT LEAD", name: "Sandalika Ariyarathna", imageSrc: "/assets/2024/Sandalika.jpg", facebook: "https://www.facebook.com/profile.php?id=100009407160156", linkedin: "https://www.linkedin.com/in/dilini-sandalika96" },
    { role: "DESIGN LEAD", name: "Shavidini Ekanayake", imageSrc: "/assets/2024/Shavidini.png", facebook: "https://web.facebook.com/shavi.dilunika/", linkedin: "https://www.linkedin.com/in/shavidini-ekanayake-9368a51ba/" },
    { role: "CONTENT WRITING LEAD", name: "Sarah Iyoob", imageSrc: "/assets/2024/Sarah.jpeg", facebook: "#", linkedin: "https://www.linkedin.com/in/sarah-ayoob-306231232/" },
    { role: "EVENT COORDINATOR", name: "Dhanushi Piyaratne", imageSrc: "/assets/2024/Dhanushi.jpg", facebook: "#", linkedin: "#" },
    { role: "MARKETING LEAD", name: "Irushi Gunawardana", imageSrc: "/assets/2024/Irushi.jpg", facebook: "#", linkedin: "https://www.linkedin.com/in/irushi-gunawardana-941893250" }
  ],
  "2025": [
    { role: "PRESIDENT", name: "Irushi Gunawardana", imageSrc: "/assets/2025/irushi.jpeg", facebook: "#", linkedin: "https://www.linkedin.com/in/irushigunawardana/" },
    { role: "VICE PRESIDENT", name: "Leashaniya Krishnapillai", imageSrc: "/assets/2025/Leashaniya Krishnapillai.jpg", facebook: "#", linkedin: "https://www.linkedin.com/in/leashaniya-krishnapillai-36b20a247/" },
    { role: "SECRETARY", name: "Dinithi Wickramaarachchi", imageSrc: "/assets/2025/Dinithi_Wickramaarachchi_cvphoto.png", facebook: "#", linkedin: "https://www.linkedin.com/in/dinithi-wickramaarachchi/" },
    { role: "ASSISTANT SECRETARY", name: "Maleesha Wijerathne", imageSrc: "/assets/2025/Maleesha_Photo.jpg", facebook: "#", linkedin: "https://www.linkedin.com/in/maleesha-wijerathne-46b397249" },
    { role: "DEV LEAD", name: "Nujaba Irfan", imageSrc: "/assets/2025/Nujaba_Irfan.jpeg", facebook: "#", linkedin: "https://www.linkedin.com/in/nujaba-irfan/" },
    { role: "DESIGN LEAD", name: "Gimhani Navodya", imageSrc: "/assets/2025/Gimhani navodya.jpg", facebook: "#", linkedin: "https://www.linkedin.com/in/gimhaninavodya/" },
    { role: "PROJECT COORDINATOR", name: "Manushi Katipearachchi", imageSrc: "/assets/2025/ManushiKatipearachchi.jpg", facebook: "https://www.facebook.com/profile.php?id=100092984103364", linkedin: "https://www.linkedin.com/in/manushi-katipearachchi-b8481627a/" },
    { role: "EVENT COORDINATOR", name: "Dilni Nishshanka ", imageSrc: "/assets/2025/Dilni Nishshanka.jpg", facebook: "#", linkedin: "https://www.linkedin.com/in/dilni-nishshanka-b889b82b1/" }
  ]
};

export default function BoardPage() {
  const years = useMemo(() => Object.keys(rawBoardData).reverse(), []);
  const [activeYear, setActiveYear] = useState(years[0]);

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
          {rawBoardData[activeYear].map((member, index) => (
            <div 
              key={`${activeYear}-${member.name}-${index}`}
              className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex flex-col group transition-all duration-500 hover:border-purple-500/30 hover:bg-white/[0.04] w-[calc(50%-20px)] md:w-[calc(33.33%-27px)] lg:w-[calc(20%-32px)] max-w-[210px]"
            >
              {/* Image Box - Removed Grayscale */}
              <div className="relative aspect-square rounded-xl overflow-hidden mb-6 shadow-2xl">
                <Image 
                  src={member.imageSrc} 
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 30vw, 12vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
              </div>

              {/* Text Info */}
              <div className="flex flex-col flex-grow text-center">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <Zap size={8} className="text-purple-500 fill-purple-500" />
                  <span className="text-purple-400 font-mono text-[8px] uppercase tracking-[0.2em] leading-none">
                    {member.role}
                  </span>
                </div>
                
                <h3 className="text-xs md:text-[13px] font-black uppercase italic tracking-tight leading-tight mb-6 min-h-[2.5em] flex items-center justify-center">
                  {member.name}
                </h3>

                {/* Socials - ESLint Friendly (rel="noopener noreferrer") */}
                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex gap-4">
                    {member.linkedin !== "#" && (
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white/30 hover:text-white transition-colors"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <Linkedin size={15} />
                      </a>
                    )}
                    {member.facebook !== "#" && (
                      <a 
                        href={member.facebook} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white/30 hover:text-white transition-colors"
                        aria-label={`${member.name} Facebook`}
                      >
                        <Facebook size={15} />
                      </a>
                    )}
                  </div>
                  <ArrowUpRight size={12} className="text-white/10 group-hover:text-purple-500 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
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