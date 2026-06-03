"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp } from "lucide-react";
import Image from "next/image";

// Programmatically generate the list of 25 pins from the new folder
const pins = Array.from({ length: 25 }, (_, i) => `/pins/pin-${i + 1}.png`);

// Duplicate the array to create a seamless infinite loop
const doublePins = [...pins, ...pins];

export const PinterestAds = () => {
  return (
    <section id="marketing" className="py-24 bg-[#121212] overflow-hidden relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3">
              AI Product Marketing <TrendingUp className="text-[var(--color-accent)] w-8 h-8" />
            </h2>
            <p className="text-[var(--color-secondary)] text-lg max-w-2xl">
              Pinterest Affiliate Campaigns featuring high-converting visual assets generated using custom diffusion pipelines.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] border border-[var(--color-accent)]/30 flex items-center gap-1.5 shadow-sm">
              <Sparkles size={12} /> 25 Creative Variations
            </span>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Scroll Container */}
      <div className="w-full relative py-4">
        {/* Edge Gradient Fades */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-[#121212] via-[#121212]/90 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-[#121212] via-[#121212]/90 to-transparent z-20 pointer-events-none" />

        <div className="flex w-max">
          <motion.div
            className="flex gap-6 px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 120, // Significantly slowed down (120s instead of 45s) for a slow, premium glide
              repeat: Infinity,
            }}
          >
            {doublePins.map((pinSrc, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02, y: -4 }}
                // Responsive card widths designed to show exactly 4 images on desktop (w-[calc((100vw-168px)/4)])
                className="relative h-[480px] w-[calc(100vw-32px)] sm:w-[calc((100vw-80px)/2)] md:w-[calc((100vw-120px)/3)] lg:w-[calc((100vw-168px)/4)] lg:max-w-[320px] flex-shrink-0 rounded-2xl border border-white/5 overflow-hidden bg-white/[0.02] backdrop-blur-md shadow-lg hover:border-[var(--color-accent)]/30 hover:shadow-[0_10px_30px_rgba(235,94,40,0.1)] transition-all duration-300 cursor-pointer"
              >
                <Image
                  src={pinSrc}
                  alt={`AI Pinterest Marketing Pin ${idx % 25 + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain p-2 transition-transform duration-500" // Set to object-contain with padding to ensure full-size rendering without cropping
                  loading="lazy"
                />
                
                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
