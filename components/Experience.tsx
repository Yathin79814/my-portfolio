"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Briefcase, Shield, Calendar, ArrowRight } from "lucide-react";

const experiences = [
  {
    role: "Founder & Creative Lead",
    company: "@designpreneurss",
    duration: "2023 - Present",
    icon: Users,
    short: "Creative Lead",
    description: "Founded an educational design platform, conceptualizing and executing high-impact visual content strategies. Scaled an organic audience to 30,000+ followers by translating complex UI/UX principles into highly digestible, premium digital media."
  },
  {
    role: "Placement Cell Coordinator",
    company: "IIITDM Kancheepuram",
    duration: "2024 - Present",
    icon: Briefcase,
    short: "Placement Lead",
    description: "Orchestrated end-to-end communication and logistics between a talented student body and top-tier industry recruiters. Streamlined placement workflows, significantly improving recruiter engagement and institutional placement metrics."
  },
  {
    role: "Senior Under Officer",
    company: "National Cadet Corps (NCC)",
    duration: "2022 - 2025",
    icon: Shield,
    short: "NCC SUO",
    description: "Directed and trained large cadet contingents, enforcing strict disciplinary frameworks and operational excellence. Led cross-functional teams to execute major institutional events with zero logistical friction."
  }
];

// Coordinates representing nodes along a right-facing semi-circular arc
// within a 240px wide by 400px tall bounding box.
const nodeCoordinates = [
  { x: 30, y: 40, labelAlign: "left" },    // Top Node
  { x: 190, y: 200, labelAlign: "right" },  // Mid Node (curves furthest right)
  { x: 30, y: 360, labelAlign: "left" }    // Bottom Node
];

export const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeExp = experiences[activeIndex];
  const ActiveIcon = activeExp.icon;

  return (
    <section id="experience" className="py-32 px-6 md:px-12 max-w-6xl mx-auto relative z-10">
      <div className="mb-20 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Experience</h2>
        <p className="text-[var(--color-secondary)] text-lg">Where I've delivered impact.</p>
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
              x: nodeCoordinates[activeIndex].x,
              y: nodeCoordinates[activeIndex].y,
            }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
          />
          <motion.div
            className="absolute w-10 h-10 rounded-full border border-[var(--color-accent)] shadow-[0_0_15px_rgba(235,94,40,0.4)] pointer-events-none"
            style={{ x: -20, y: -20, left: 0, top: 0 }}
            animate={{
              x: nodeCoordinates[activeIndex].x,
              y: nodeCoordinates[activeIndex].y,
            }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
          />

          {/* Interactive Node Buttons along the arc */}
          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            const isActive = activeIndex === idx;
            const coord = nodeCoordinates[idx];

            return (
              <div
                key={idx}
                className="absolute"
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
              key={activeIndex}
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

                <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[var(--color-accent)] uppercase group-hover:translate-x-1 transition-transform pt-4 select-none">
                  Active Milestone <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Stacked Layout (Degrades gracefully on smaller screens) */}
      <div className="md:hidden space-y-8">
        {experiences.map((exp, idx) => {
          const Icon = exp.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
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
              <p className="text-[var(--color-secondary)] leading-relaxed text-sm">
                {exp.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
