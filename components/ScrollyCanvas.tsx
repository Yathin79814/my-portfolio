"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useScrollFrames } from "@/lib/useScrollFrames";
import { FRAME_COUNT } from "@/lib/preloadImages";
import { useMotionValueEvent, motion, AnimatePresence } from "framer-motion";
import { Overlay } from "./Overlay";

let globalLoaded = false;

export const ScrollyCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(globalLoaded);
  const [firstFrameDrawn, setFirstFrameDrawn] = useState(false);

  const { scrollYProgress, frameIndex } = useScrollFrames(containerRef, FRAME_COUNT);

  // Preload and track progress of all images
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (globalLoaded) {
      setIsLoaded(true);
      setLoadProgress(100);
      return;
    }

    const preloaded: HTMLImageElement[] = [];
    const loadedIndices = new Set<number>();

    // Safety fallback timeout: force page load if preloading stalls for more than 4 seconds
    const safetyTimeout = setTimeout(() => {
      console.warn("Preloading timed out. Forcing page load.");
      setIsLoaded(true);
      globalLoaded = true;
    }, 4000);

    const recordLoad = (index: number) => {
      if (loadedIndices.has(index)) return;
      loadedIndices.add(index);

      const count = loadedIndices.size;
      const progress = Math.round((count / FRAME_COUNT) * 100);
      setLoadProgress(progress);

      if (count >= FRAME_COUNT) {
        setIsLoaded(true);
        globalLoaded = true;
        clearTimeout(safetyTimeout);
      }
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();

      // Attach handlers before setting src to ensure cached image hits are captured
      img.onload = () => recordLoad(i);
      img.onerror = () => recordLoad(i); // Count errors as resolved so page doesn't stall

      const idx = (i + 1).toString().padStart(3, "0");
      img.src = `/sequence/ezgif-frame-${idx}.png`;

      if (img.complete) {
        recordLoad(i);
      }
      preloaded.push(img);
    }

    setImages(preloaded);

    return () => {
      clearTimeout(safetyTimeout);
    };
  }, []);

  // Lock scroll bar until loading is complete
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoaded]);

  const drawFrame = (index: number) => {
    if (!canvasRef.current || images.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    if (!img) return;

    const render = () => {
      const imgRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let drawX = 0;
      let drawY = 0;

      if (imgRatio > canvasRatio) {
        drawWidth = canvas.height * imgRatio;
        drawX = (canvas.width - drawWidth) / 2;
      } else {
        drawHeight = canvas.width / imgRatio;
        drawY = (canvas.height - drawHeight) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

      if (!firstFrameDrawn) {
        setFirstFrameDrawn(true);
      }
    };

    if (img.complete) {
      render();
    } else {
      img.onload = render;
    }
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    requestAnimationFrame(() => drawFrame(Math.round(latest)));
  });

  // Handle resizing and initial frame draw
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      drawFrame(Math.round(frameIndex.get()));
    };

    window.addEventListener("resize", handleResize);

    // Set initial size
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }

    if (images.length > 0) {
      drawFrame(0);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [images]);

  return (
    <div id="home" ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]">
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121212] text-[#FFFCF2]"
          >
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#EB5E28] opacity-10 blur-[120px] pointer-events-none" />

            <div className="relative flex flex-col items-center max-w-xs w-full px-6 z-10">
              {/* Logo / Brand Name */}
              <motion.h2
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="text-lg font-medium tracking-[0.2em] uppercase mb-8 text-[#FFFCF2]/80"
              >
                Damalla Yathin
              </motion.h2>

              {/* Progress Container */}
              <div className="w-full bg-[#FFFCF2]/10 h-[3px] rounded-full overflow-hidden mb-3 relative">
                <motion.div
                  className="bg-[#EB5E28] h-full shadow-[0_0_10px_#EB5E28]"
                  style={{ width: `${loadProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* Progress Percentage */}
              <span className="text-xs font-mono tracking-widest text-[#CCC5B9]">
                {loadProgress}% LOADED
              </span>

              <p className="text-[10px] text-[#CCC5B9]/50 tracking-wider uppercase mt-8 text-center">
                Preparing Interactive Experience
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative sticky top-0 h-screen w-full overflow-hidden">
        {/* Prioritize the first frame for immediate loading before the canvas is ready */}
        <Image
          src="/sequence/ezgif-frame-001.png"
          alt="Hero background"
          fill
          priority
          className={`object-cover object-center transition-opacity duration-300 ${firstFrameDrawn ? 'opacity-0' : 'opacity-100'}`}
        />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-black/40" />
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
};
