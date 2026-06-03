"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    category: "Design",
    skills: ["UI/UX Design", "Design Systems", "Branding", "Iconography"]
  },
  {
    category: "Design Tools",
    skills: ["Figma", "Canva", "Photoshop"]
  },
  {
    category: "AI Audio & Video",
    skills: ["CapCut", "ElevenLabs (Voice)", "Suno AI BGM"]
  },
  {
    category: "Domains & Strategy",
    skills: ["Creative Technology", "AI Content Creation", "Digital Marketing", "Audience Growth"]
  }
];

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
            <h3 className="text-xl font-semibold mb-6 text-[var(--color-accent)] border-b border-white/10 pb-4">{group.category}</h3>
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
    </section>
  );
};
