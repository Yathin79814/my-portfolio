"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Shield, Medal } from "lucide-react";
import Image from "next/image";

const achievements = [
  {
    title: "Built a 30K+ Audience",
    icon: Users,
    description: "Scaled @designpreneurss to over 30,000 engaged followers through pure organic UI/UX content strategy.",
    mediaType: "image",
    mediaSrc: "/achievements/instagram.png",
    mediaAlt: "Instagram Profile Mockup",
  },
  {
    title: "Elite Leadership Excellence",
    icon: Shield,
    description: "Earned the rank of Senior Under Officer in the NCC, leading major operations and training large contingents.",
    mediaType: "image",
    mediaSrc: "/achievements/ncc.jpg",
    mediaAlt: "NCC Leadership Photo",
  },
  {
    title: "2nd Place – IBCN Innovation",
    icon: Medal,
    description: "Secured 2nd place by crafting highly engaging presentation visuals. Blended visual storytelling with generative AI and tools like CapCut and ElevenLabs to create high-impact, real-world media.",
    mediaType: "video",
    mediaSrc: "/achievements/ibcn.mp4",
    mediaAlt: "IBCN Innovation Video",
  },
];

export const Achievements = () => {
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const [videoError, setVideoError] = useState<Record<number, boolean>>({});

  const handleImageError = (index: number) => {
    setImageError((prev) => ({ ...prev, [index]: true }));
  };

  const handleVideoError = (index: number) => {
    setVideoError((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <section id="achievements" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      <div className="mb-24 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Milestones & Achievements</h2>
        <p className="text-[var(--color-secondary)] text-lg">Measurable impact beyond the screen.</p>
      </div>

      <div className="space-y-32">
        {achievements.map((item, idx) => {
          const Icon = item.icon;
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col gap-12 items-center justify-between ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Text Column (Spans half the page: md:w-1/2) */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/30 flex items-center justify-center text-[var(--color-accent)] mb-6 shadow-[0_0_15px_rgba(235,94,40,0.1)]">
                  <Icon size={26} />
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#FFFCF2] tracking-tight mb-4">
                  {item.title}
                </h3>
                <p className="text-[var(--color-secondary)] text-base md:text-lg leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Media Showcase Column (Spans half the page: md:w-1/2) */}
              <div className="w-full md:w-1/2 rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-md aspect-video relative flex items-center justify-center shadow-2xl hover:border-[var(--color-accent)]/30 hover:shadow-[0_20px_50px_rgba(235,94,40,0.15)] transition-all duration-500">
                {item.mediaType === "image" ? (
                  <div className="relative w-full h-full">
                    {!imageError[idx] ? (
                      <Image
                        src={item.mediaSrc}
                        alt={item.mediaAlt}
                        fill
                        onError={() => handleImageError(idx)}
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    ) : (
                      /* Visual placeholder fallback overlay - shown if image fails to load */
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-white/[0.06] flex flex-col items-center justify-center p-6 text-center pointer-events-none">
                        <span className="text-xs text-white/30 tracking-wider uppercase font-semibold mb-2">Image Preview Slot (Half Page)</span>
                        <span className="text-xs text-white/20 font-mono select-all bg-black/40 px-3 py-1 rounded border border-white/5">{item.mediaSrc}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center">
                    {!videoError[idx] ? (
                      <video
                        src={item.mediaSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        ref={(el) => {
                          if (el) el.muted = true; // Programmatic override
                        }}
                        onEnded={(e) => {
                          e.currentTarget.currentTime = 0;
                          e.currentTarget.play().catch(() => {});
                        }}
                        onError={() => handleVideoError(idx)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      /* Visual placeholder fallback overlay - shown if video fails to load */
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-white/[0.06] flex flex-col items-center justify-center p-6 text-center pointer-events-none">
                        <span className="text-xs text-white/30 tracking-wider uppercase font-semibold mb-2">Video Loop Slot (Half Page)</span>
                        <span className="text-xs text-white/20 font-mono select-all bg-black/40 px-3 py-1 rounded border border-white/5">{item.mediaSrc}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
