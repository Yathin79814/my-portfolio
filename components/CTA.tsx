"use client";

import { motion } from "framer-motion";

export const CTA = () => {
  return (
    <section id="contact" className="py-32 px-6 md:px-12 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-12 md:p-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent)]/10 to-transparent" />
        
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#FFFCF2]">Let's build something exceptional.</h2>
          <p className="text-xl text-[var(--color-secondary)] mb-10 max-w-xl mx-auto">
            Currently open for AI Content Creation & Graphic Design roles. If you're looking for someone who designs for impact, let's talk.
          </p>
          
          <a
            href="mailto:damallayathin030@gmail.com"
            className="inline-block bg-[#FFFCF2] text-[#121212] font-semibold text-lg px-8 py-4 rounded-full hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(235,94,40,0.4)]"
          >
            Get in Touch
          </a>
        </div>
      </motion.div>
    </section>
  );
};
