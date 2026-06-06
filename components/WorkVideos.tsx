"use client";

import { motion } from "framer-motion";
import { Play, Sparkles, ExternalLink } from "lucide-react";

const localVideos = [
  {
    title: "Cinematic AI Short Film",
    desc: "An experimental short film merging generative AI visuals, dynamic camera synthesis, and neural audio elements.",
    src: "/videos/Ai_shortfilm.mp4",
    href: "https://drive.google.com/file/d/1MdAZjSVvP8dPbimkPF0SYsIQSIjgbQep/view?usp=sharing",
    tag: "Gen-AI Narrative",
  },
  {
    title: "Savara Creative Campaign",
    desc: "Premium campaign editing utilizing advanced neural stylization, voice synthesis, and multi-track pacing.",
    src: "/videos/Savara vvAi edit.mp4",
    href: "https://drive.google.com/file/d/1R4kHgt4TYyX2ham2NvRDsKDo5oJbf8YA/view?usp=sharing",
    tag: "AI Editing",
  },
  {
    title: "AI Product Ad — Holi Campaign",
    desc: "A festive AI-generated brand commercial created with neural visual generation, tailored for digital social marketing.",
    src: "/videos/Task3.mp4",
    href: "/videos/Task3.mp4",
    tag: "AI Ad Generation",
  },
  {
    title: "AI Product Ad — Spices Campaign",
    desc: "A premium AI-generated product commercial for organic spices, combining sensory visual stylization with motion editing.",
    src: "/videos/Task2.mp4",
    href: "/videos/Task2.mp4",
    tag: "AI Ad Generation",
  },
];

export const WorkVideos = () => {
  return (
    <section id="videos" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3">
          Featured Motion & AI Work <Sparkles className="text-[var(--color-accent)] w-8 h-8" />
        </h2>
        <p className="text-[var(--color-secondary)] text-lg">
          Looping landscape reels showcasing AI generation, advanced video editing, and motion design. Click any video to play the full version.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {localVideos.map((video, idx) => (
          <motion.a
            key={idx}
            href={video.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative block rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-[var(--color-accent)]/50 hover:shadow-[0_0_40px_rgba(235,94,40,0.15)] cursor-pointer"
          >
            {/* Landscape Video Container */}
            <div className="relative aspect-video w-full overflow-hidden bg-black/40">
              <video
                src={video.src}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                ref={(el) => {
                  if (el) el.muted = true; // Programmatic override to solve React JSX muted property bugs
                }}
                onEnded={(e) => {
                  e.currentTarget.currentTime = 0;
                  e.currentTarget.play().catch((err) => console.warn("Fallback video loop failed:", err));
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 pointer-events-none" />
              
              {/* Play Badge */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-[var(--color-accent)] flex items-center gap-1.5 shadow-lg select-none">
                <Play className="w-2.5 h-2.5 fill-current" /> Playing Preview
              </div>

              {/* Tag Badge */}
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-white select-none">
                {video.tag}
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-[#FFFCF2] group-hover:text-[var(--color-accent)] transition-colors">
                  {video.title}
                </h3>
                <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-[var(--color-accent)] transition-colors mt-1 flex-shrink-0 ml-2" />
              </div>
              <p className="text-sm text-[var(--color-secondary)] leading-relaxed">
                {video.desc}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};
