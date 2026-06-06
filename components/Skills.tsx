"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    category: "Design & Tools",
    skills: [
      "UI/UX Design",
      "Design Systems",
      "Branding",
      "Iconography",
      "Figma",
      "Canva",
      "Adobe Photoshop",
      "Adobe Lightroom"
    ]
  },
  {
    category: "Video & Photography",
    skills: [
      "Reel Shooting",
      "Mobile Videography",
      "Mobile Photography",
      "Event Photography",
      "CapCut",
      "AI Video Tools",
      "Short-Form Video Editing"
    ]
  },
  {
    category: "Content & Marketing",
    skills: [
      "Instagram Reels",
      "Content Strategy",
      "Trend Research",
      "Social Media Marketing",
      "Community Building",
      "Content Scheduling",
      "Brand Storytelling",
      "Campaign Execution"
    ]
  },
  {
    category: "AI & Automation",
    skills: [
      "AI Content Creation",
      "Notion Scheduling",
      "AI Podcast Production",
      "Pinterest Affiliate Automation",
      "Fast Adaptability to New Tools"
    ]
  }
];

const languages = ["English", "Telugu (Native)", "Hindi"];

export const Skills = () => {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      <h2 className="text-3xl md:text-5xl font-bold mb-16 text-[#FFFCF2] text-center">Core Expertise</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {skillGroups.map((group, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-[var(--color-accent)] border-b border-white/10 pb-4">
              {group.category}
            </h3>
            <ul className="space-y-4">
              {group.skills.map((skill, sIdx) => (
                <li key={sIdx} className="text-[var(--color-secondary)] flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mr-3 opacity-50" />
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Languages Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-20 pt-10 border-t border-white/10 text-center max-w-2xl mx-auto"
      >
        <h3 className="text-lg font-semibold text-[var(--color-accent)] tracking-widest uppercase mb-6">Languages</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {languages.map((lang, idx) => (
            <span
              key={idx}
              className="bg-white/5 border border-white/10 px-6 py-2.5 rounded-full text-[var(--color-secondary)] font-medium text-sm shadow-md"
            >
              {lang}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
