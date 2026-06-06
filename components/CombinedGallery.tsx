"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Play, Grid, Layers, Shield, Camera, Globe, ArrowRight } from "lucide-react";

interface CombinedGalleryProps {
  files: string[];
}

const filters = [
  { id: "all", label: "All Work", icon: Grid },
  { id: "ncc", label: "NCC Leadership", icon: Shield },
  { id: "savara", label: "Savara Publicity", icon: Layers },
  { id: "imagix", label: "IMAGIX Club", icon: Camera },
  { id: "cvip", label: "CVIP 2024", icon: Globe }
];

export const CombinedGallery = ({ files }: CombinedGalleryProps) => {
  const [shuffled, setShuffled] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(12);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Shuffle all files on mount for a unique visual order
  useEffect(() => {
    if (files.length === 0) return;
    const array = [...files];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setShuffled(array);
  }, [files]);

  // Handle keyboard navigation for the lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null && prev < filteredFiles.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredFiles.length - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, activeFilter]);

  const getCategoryOfFile = (path: string) => {
    if (path.includes("/work/ncc/")) return "ncc";
    if (path.includes("/work/savara/")) return "savara";
    if (path.includes("/work/imagix/")) return "imagix";
    if (path.includes("/work/cvip/")) return "cvip";
    return "other";
  };

  const isVideo = (url: string) => url.toLowerCase().endsWith(".mp4");

  // Get current list of filtered files
  const filteredFiles = shuffled.filter(
    (file) => activeFilter === "all" || getCategoryOfFile(file) === activeFilter
  );

  const visibleFiles = filteredFiles.slice(0, visibleCount);

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    setVisibleCount(12); // Reset count on filter change
    setLightboxIndex(null);
  };

  const nextItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredFiles.length);
  };

  const prevItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredFiles.length) % filteredFiles.length);
  };

  return (
    <section id="gallery" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10 border-t border-white/5">
      <div className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h2>
          <p className="text-[var(--color-secondary)] text-lg max-w-2xl">
            A combined feed of visual logs, on-ground photography, event coverage, and creative brand designs.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-12">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border focus:outline-none cursor-pointer ${
                isActive
                  ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-white shadow-[0_0_15px_rgba(235,94,40,0.3)]"
                  : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/20"
              }`}
            >
              <Icon size={14} />
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Grid Empty State */}
      {filteredFiles.length === 0 ? (
        <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-md">
          <p className="text-white/40">No media assets found under this filter.</p>
        </div>
      ) : (
        /* CSS columns masonry layout */
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 [column-fill:_balance] box-border w-full">
          <AnimatePresence mode="popLayout">
            {visibleFiles.map((file, idx) => (
              <motion.div
                key={file}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -4 }}
                onClick={() => setLightboxIndex(idx)}
                className="break-inside-avoid mb-6 rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-sm group hover:border-[var(--color-accent)]/30 hover:shadow-[0_10px_30px_rgba(235,94,40,0.1)] transition-all duration-300 cursor-pointer relative"
              >
                {isVideo(file) ? (
                  <div className="relative aspect-video sm:aspect-auto">
                    <video
                      src={file}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-[var(--color-accent)] scale-90 group-hover:scale-100 transition-transform shadow-lg">
                        <Play size={16} className="fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={file}
                      alt={`Combined Work media ${idx + 1}`}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-transparent group-hover:bg-black/5 transition-colors" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Load More Button */}
      {filteredFiles.length > visibleCount && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setVisibleCount((prev) => prev + 12)}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#121212] bg-[#FFFCF2] hover:bg-[var(--color-accent)] hover:text-white hover:shadow-[0_0_20px_rgba(235,94,40,0.4)] transition-all py-3.5 px-7 rounded-full cursor-pointer select-none"
          >
            Load More <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredFiles[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[1000] bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-sm"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all select-none focus:outline-none z-10"
              aria-label="Close Lightbox"
            >
              <X size={24} />
            </button>

            {/* Left navigation arrow */}
            <button
              onClick={prevItem}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:scale-105 transition-all select-none focus:outline-none z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Right navigation arrow */}
            <button
              onClick={nextItem}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:scale-105 transition-all select-none focus:outline-none z-10"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Main Lightbox Content container */}
            <motion.div
              key={filteredFiles[lightboxIndex]}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {isVideo(filteredFiles[lightboxIndex]) ? (
                <video
                  src={filteredFiles[lightboxIndex]}
                  controls
                  autoPlay
                  className="max-w-full max-h-full rounded-lg shadow-2xl object-contain border border-white/10"
                />
              ) : (
                <img
                  src={filteredFiles[lightboxIndex]}
                  alt="Gallery lightbox media"
                  className="max-w-full max-h-full rounded-lg shadow-2xl object-contain border border-white/10"
                />
              )}
            </motion.div>

            {/* Progress counter */}
            <div className="absolute bottom-6 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider text-white/60 select-none">
              {lightboxIndex + 1} / {filteredFiles.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
