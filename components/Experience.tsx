"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Sparkles,
  Zap,
  Palette,
  Layers,
  Briefcase,
  Shield,
  Megaphone,
  Camera,
  Calendar,
  ArrowRight,
  X,
  Image as ImageIcon,
  Play
} from "lucide-react";

const experiences = {
  professional: [
    {
      role: "Founder & Creative Lead",
      company: "@designpreneurss",
      duration: "2020 - Present",
      icon: Users,
      short: "@designpreneurss",
      description: "Founded and scaled an organic design community to 30,000+ followers on Instagram. Directing content strategy, producing high-impact UI/UX tutorials, and designing visual templates that teach design principles through engaging short-form media.",
      media: [
        { type: "image", src: "/achievements/instagram.png", alt: "Instagram Platform Showcase" },
        { type: "image", src: "/pins/pin-1.png", alt: "Canva Tutorial Hack" },
        { type: "image", src: "/pins/pin-2.png", alt: "Photoshop Design Tutorial" },
        { type: "image", src: "/pins/pin-3.png", alt: "UI Design Tip Carousel" },
        { type: "image", src: "/pins/pin-4.png", alt: "UX Architecture Tutorial" }
      ]
    },
    {
      role: "Creative Design, AI Content & Digital Marketing Intern",
      company: "Attacked AI",
      duration: "Aug 2025 – Dec 2025",
      icon: Sparkles,
      short: "Attacked AI",
      description: "Shot and edited high-converting reels/videos using CapCut, and produced AI-generated images/videos for daily marketing campaigns. Designed branded website banners and contributed to AI-based podcast and creative media production workflows.",
      media: [
        { type: "image", src: "/experience/attacked_ai.png", alt: "AI Generated Brand Concept" },
        { type: "video", src: "/videos/Ai_shortfilm.mp4", alt: "AI Cinematic Narrative Short" }
      ]
    },
    {
      role: "Digital Marketing Intern",
      company: "EVtron Tech",
      duration: "May 2025 – Aug 2025",
      icon: Zap,
      short: "EVtron Tech",
      description: "Supported digital marketing and brand visibility campaigns for EV charging solutions. Managed content asset libraries and secured 2nd Place at the IBCN Innovation Challenge by delivering compelling visuals and pitch presentation designs.",
      media: [
        { type: "image", src: "/experience/evtron.png", alt: "EVtron Branding Board" },
        { type: "video", src: "/achievements/ibcn.mp4", alt: "IBCN Innovation Pitch Presentation" }
      ]
    },
    {
      role: "UI Visual Designer & Branding Lead Intern",
      company: "Viberr",
      duration: "May 2025 – Jul 2025",
      icon: Palette,
      short: "Viberr",
      description: "Developed brand identity, UI graphics, and cohesive visual design systems for a digital social media platform. Created iconography and assets, collaborating with a fast-paced team to deliver high-quality design assets on tight timelines.",
      media: [
        { type: "image", src: "/experience/viberr.png", alt: "Viberr Social Media UI Designs" }
      ]
    }
  ],
  campus: [
    {
      role: "Design Lead",
      company: "Samgatha / Vashisht Fest",
      duration: "2023 - Present",
      icon: Layers,
      short: "Samgatha Fest",
      description: "Leading the design & media team for the annual college fests, creating promotional graphics, reels, and branding materials. Directing real-time event coverage and producing highly viewed behind-the-scenes video content.",
      media: [
        { type: "image", src: "/experience/samgatha.png", alt: "Samgatha Cultural Fest Branding" }
      ]
    },
    {
      role: "Student Coordinator",
      company: "Placement Cell Coordinator",
      duration: "2023 - Present",
      icon: Briefcase,
      short: "Placement Cell",
      description: "Coordinating logistics and communications between recruiters and a student body of 200+. Organizing professional sessions and managing placement event coordination under tight timelines.",
      media: [
        { type: "image", src: "/experience/placement.png", alt: "Campus Recruitment drive visual layout" }
      ]
    },
    {
      role: "Senior Under Officer (SUO)",
      company: "National Cadet Corps (NCC)",
      duration: "Nov 2022 – May 2025",
      icon: Shield,
      short: "NCC SUO",
      description: "Commanded and mentored a unit of 52+ cadets, representing the institute at the national NCC EBSB camp. Led drills, training sessions, and institutional events to build discipline and leadership.",
      media: [
        { type: "image", src: "/achievements/ncc.jpg", alt: "NCC Leadership contingent" }
      ]
    },
    {
      role: "Publicity Lead",
      company: "SAVA Fest",
      duration: "2024 - Present",
      icon: Megaphone,
      short: "SAVA Fest",
      description: "Directing outreach and publicity campaigns for SAVARa across digital and on-campus platforms. Managed social media marketing, content strategy, and community engagement to drive event participation.",
      media: [
        { type: "video", src: "/videos/Savara vvAi edit.mp4", alt: "SAVA Fest Publicity Video" }
      ]
    },
    {
      role: "Core Member",
      company: "Photography Club — IMAGIX",
      duration: "2022 - Present",
      icon: Camera,
      short: "IMAGIX Club",
      description: "Providing extensive photography and videography coverage for college fests and institutional events. Managing lighting, framing, and post-shoot editing optimized for college social media channels.",
      media: [
        { type: "image", src: "/experience/photography.png", alt: "Photography Lens Reflection Bokeh Shot" }
      ]
    }
  ]
};

// Computes nodes along a right-facing semi-circular arc matching the design coordinates
const getCoordinates = (count: number) => {
  if (count <= 1) {
    return [{ x: 190, y: 200, labelAlign: "right" as const }];
  }
  const coords = [];
  for (let i = 0; i < count; i++) {
    // Distribute y coordinates between 40 and 360
    const y = 40 + i * (320 / (count - 1));
    // Quadratic equation x = 190 - (y-200)^2 / 160
    const x = 190 - Math.pow(y - 200, 2) / 160;
    const labelAlign = x > 100 ? ("right" as const) : ("left" as const);
    coords.push({ x: Math.round(x), y: Math.round(y), labelAlign });
  }
  return coords;
};

export const Experience = () => {
  const [activeTab, setActiveTab] = useState<"professional" | "campus">("professional");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedExpForGallery, setSelectedExpForGallery] = useState<any | null>(null);
  const [lightboxMedia, setLightboxMedia] = useState<any | null>(null);

  const activeList = experiences[activeTab];
  const activeExp = activeList[activeIndex] || activeList[0];
  const ActiveIcon = activeExp.icon;
  const coords = getCoordinates(activeList.length);

  const handleTabChange = (tab: "professional" | "campus") => {
    setActiveTab(tab);
    setActiveIndex(0);
  };

  // Lock body scroll when media gallery or lightbox is open
  useEffect(() => {
    if (selectedExpForGallery || lightboxMedia) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedExpForGallery, lightboxMedia]);

  return (
    <section id="experience" className="py-32 px-6 md:px-12 max-w-6xl mx-auto relative z-10">
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Experience</h2>
        <p className="text-[var(--color-secondary)] text-lg">Where I've delivered impact.</p>
      </div>

      {/* Category Tab Selector */}
      <div className="flex justify-center mb-16 relative z-30">
        <div className="flex bg-[#161616]/90 backdrop-blur-md border border-white/10 p-1.5 rounded-full relative shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
          <button
            onClick={() => handleTabChange("professional")}
            className={`relative px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wider uppercase transition-colors duration-300 focus:outline-none ${
              activeTab === "professional" ? "text-white" : "text-white/50 hover:text-white/80"
            }`}
          >
            {activeTab === "professional" && (
              <motion.div
                layoutId="active-experience-tab"
                className="absolute inset-0 bg-[var(--color-accent)] rounded-full -z-10 shadow-[0_0_15px_rgba(235,94,40,0.3)]"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            Professional Experience
          </button>
          <button
            onClick={() => handleTabChange("campus")}
            className={`relative px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wider uppercase transition-colors duration-300 focus:outline-none ${
              activeTab === "campus" ? "text-white" : "text-white/50 hover:text-white/80"
            }`}
          >
            {activeTab === "campus" && (
              <motion.div
                layoutId="active-experience-tab"
                className="absolute inset-0 bg-[var(--color-accent)] rounded-full -z-10 shadow-[0_0_15px_rgba(235,94,40,0.3)]"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            Campus & Leadership
          </button>
        </div>
      </div>

      {/* Desktop Grid Layout (Semi-Circle Arc + Detail Card) */}
      <div className="hidden md:grid grid-cols-12 gap-12 items-center">
        {/* Left Column: Interactive Semi-Circle Arc Timeline */}
        <div className="col-span-5 relative w-[260px] h-[400px] mx-auto select-none">
          {/* SVG Arc Path representing the semi-circle */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 400" fill="none">
            <defs>
              <linearGradient id="arc-glow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.05)" />
                <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
              </linearGradient>
            </defs>
            {/* Background thin track */}
            <path
              d="M 30 40 A 180 180 0 0 1 30 360"
              stroke="white"
              strokeOpacity="0.05"
              strokeWidth="3"
              fill="none"
            />
            {/* Active glowing gradient track */}
            <path
              d="M 30 40 A 180 180 0 0 1 30 360"
              stroke="url(#arc-glow)"
              strokeWidth="3"
              strokeDasharray="6 6"
              fill="none"
            />
          </svg>

          {/* Sliding active glow ring under the active node */}
          <motion.div
            className="absolute w-16 h-16 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 blur-md pointer-events-none"
            style={{ x: -32, y: -32, left: 0, top: 0 }}
            animate={{
              x: coords[activeIndex]?.x ?? 30,
              y: coords[activeIndex]?.y ?? 40,
            }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
          />
          <motion.div
            className="absolute w-10 h-10 rounded-full border border-[var(--color-accent)] shadow-[0_0_15px_rgba(235,94,40,0.4)] pointer-events-none"
            style={{ x: -20, y: -20, left: 0, top: 0 }}
            animate={{
              x: coords[activeIndex]?.x ?? 30,
              y: coords[activeIndex]?.y ?? 40,
            }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
          />

          {/* Interactive Node Buttons along the arc */}
          {activeList.map((exp, idx) => {
            const Icon = exp.icon;
            const isActive = activeIndex === idx;
            const coord = coords[idx] || { x: 30, y: 40, labelAlign: "left" };

            return (
              <div
                key={idx}
                className="absolute transition-all duration-500"
                style={{
                  left: `${coord.x}px`,
                  top: `${coord.y}px`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Node Interactive Circle */}
                <button
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 focus:outline-none ${
                    isActive
                      ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-white scale-110 shadow-[0_0_20px_rgba(235,94,40,0.5)]"
                      : "bg-[#161616] border-white/10 text-white/50 hover:text-white hover:border-white/30"
                  }`}
                  aria-label={`View ${exp.role} experience`}
                >
                  <Icon size={20} />
                </button>

                {/* Node Short Label */}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-semibold tracking-wider uppercase transition-colors duration-300 pointer-events-none ${
                    coord.labelAlign === "left" ? "left-16 text-left" : "right-16 text-right"
                  } ${isActive ? "text-[var(--color-accent)]" : "text-white/40"}`}
                >
                  {exp.short}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Experience Content Card */}
        <div className="col-span-7 min-h-[300px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${activeIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full bg-white/[0.03] border border-white/10 backdrop-blur-xl p-10 rounded-3xl hover:border-white/15 transition-colors shadow-2xl relative overflow-hidden group"
            >
              {/* Decorative background glow matching current selection */}
              <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-[var(--color-accent)] opacity-5 blur-[80px] pointer-events-none group-hover:opacity-10 transition-opacity" />

              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap items-center gap-4 justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/30 flex items-center justify-center text-[var(--color-accent)]">
                    <ActiveIcon size={24} />
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-secondary)] bg-white/5 px-4 py-1.5 rounded-full border border-white/5 shadow-inner">
                    <Calendar size={14} className="text-[var(--color-accent)]" /> {activeExp.duration}
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl font-extrabold text-[#FFFCF2] tracking-tight mb-2">
                    {activeExp.role}
                  </h3>
                  <span className="inline-block text-base font-semibold tracking-wider text-[var(--color-accent)] uppercase">
                    {activeExp.company}
                  </span>
                </div>

                <p className="text-[var(--color-secondary)] leading-relaxed text-lg pt-4 border-t border-white/5">
                  {activeExp.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
                  <button
                    onClick={() => setSelectedExpForGallery(activeExp)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(235,94,40,0.05)] cursor-pointer"
                  >
                    <ImageIcon size={14} /> View Project Media & Photos
                  </button>

                  <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[var(--color-accent)] uppercase group-hover:translate-x-1 transition-transform select-none">
                    Active Milestone <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Stacked Layout (Degrades gracefully on smaller screens) */}
      <div className="md:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {activeList.map((exp, idx) => {
              const Icon = exp.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/[0.03] border border-white/10 p-8 rounded-2xl relative"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/20 border border-[var(--color-accent)]/30 flex items-center justify-center text-[var(--color-accent)]">
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-medium text-[var(--color-secondary)] bg-white/5 px-3 py-1 rounded-full border border-white/5">
                      {exp.duration}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#FFFCF2] mb-1">{exp.role}</h3>
                  <p className="text-sm font-semibold text-[var(--color-accent)] mb-4 uppercase tracking-wider">
                    {exp.company}
                  </p>
                  <p className="text-[var(--color-secondary)] leading-relaxed text-sm mb-6">
                    {exp.description}
                  </p>

                  <button
                    onClick={() => setSelectedExpForGallery(exp)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    <ImageIcon size={14} /> View Media & Photos
                  </button>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modern High-Fidelity Collage Gallery Modal */}
      <AnimatePresence>
        {selectedExpForGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-2xl overflow-y-auto"
          >
            {/* Inner Content Box */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-[#121212]/80 border border-white/10 p-6 md:p-10 rounded-3xl shadow-2xl flex flex-col gap-8 my-auto"
            >
              {/* Header */}
              <div className="flex justify-between items-start border-b border-white/10 pb-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-[#FFFCF2] mb-1">
                    {selectedExpForGallery.role}
                  </h3>
                  <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                    {selectedExpForGallery.company} · Media Gallery
                  </p>
                </div>
                <button
                  onClick={() => setSelectedExpForGallery(null)}
                  className="text-white/50 hover:text-white bg-white/5 border border-white/10 p-2.5 rounded-full hover:scale-105 transition-all duration-300 focus:outline-none cursor-pointer"
                  aria-label="Close Gallery"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Collage Grid Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {selectedExpForGallery.media?.map((item: any, idx: number) => {
                  const isSingle = selectedExpForGallery.media.length === 1;
                  const isDouble = selectedExpForGallery.media.length === 2;
                  
                  // Premium Pinterest/Masonry dynamic sizing
                  let gridClasses = "col-span-1 aspect-video";
                  if (isSingle) {
                    gridClasses = "col-span-1 sm:col-span-2 md:col-span-3 aspect-[16/10] max-w-3xl mx-auto w-full";
                  } else if (isDouble) {
                    gridClasses = "col-span-1 sm:col-span-1 md:col-span-1 aspect-square";
                  } else if (idx === 0) {
                    gridClasses = "col-span-1 sm:col-span-2 md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-video";
                  }

                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02, y: -4 }}
                      onClick={() => setLightboxMedia(item)}
                      className={`group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-lg cursor-pointer ${gridClasses}`}
                    >
                      {item.type === "image" ? (
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="relative w-full h-full">
                          <video
                            src={item.src}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded text-[8px] font-semibold uppercase tracking-wider text-[var(--color-accent)] flex items-center gap-1 shadow-md">
                            <Play size={8} className="fill-current" /> Video
                          </div>
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white text-xs font-semibold tracking-wider uppercase bg-black/60 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md transform scale-90 group-hover:scale-100 transition-all duration-300">
                          Expand Preview
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Mode Viewer */}
      <AnimatePresence>
        {lightboxMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-4 md:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxMedia(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/5 border border-white/10 p-3 rounded-full hover:scale-105 transition-all duration-300 focus:outline-none cursor-pointer z-[210]"
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>

            {/* Media Container */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center rounded-2xl overflow-hidden border border-white/5 shadow-2xl relative"
            >
              {lightboxMedia.type === "image" ? (
                <img
                  src={lightboxMedia.src}
                  alt={lightboxMedia.alt}
                  className="max-w-full max-h-full object-contain select-none"
                />
              ) : (
                <video
                  src={lightboxMedia.src}
                  controls
                  autoPlay
                  loop
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
