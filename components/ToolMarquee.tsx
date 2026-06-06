"use client";

import { motion } from "framer-motion";
import {
  SiFigma,
  SiCanva,
  SiOpenai,
  SiGooglegemini,
  SiAnthropic,
  SiNotion,
  SiInstagram,
  SiPinterest,
  SiYoutube
} from "react-icons/si";
import { TbBrandAdobePhotoshop, TbBrandAdobePremier } from "react-icons/tb";

const CapCutIcon = (props: any) => (
  <svg viewBox="0 0 512 512" fill="currentColor" {...props}>
    <path opacity="0.4" d="M116.971 2.475h278.058c62.971 0 114.494 51.522 114.494 114.494v275.722c0 62.971-51.523 114.493-114.494 114.493H116.971c-62.972 0-114.494-51.522-114.494-114.493V116.969c0-62.972 51.522-114.494 114.494-114.494z"/>
    <path d="M116.97-.001h278.06C459.366-.001 512 52.633 512 116.969v275.722c0 64.335-52.634 116.969-116.97 116.969H116.97C52.636 509.66 0 457.026 0 392.691V116.969C0 52.633 52.636-.001 116.97-.001zm278.06 4.953H116.97C55.364 4.952 4.953 55.363 4.953 116.969v275.722c0 61.605 50.411 112.017 112.017 112.017h278.06c61.607 0 112.017-50.411 112.017-112.017V116.969c0-61.607-50.41-112.017-112.017-112.017z"/>
    <path d="M109.095 181.505c-.123 8.897 0 17.813 0 26.71a5.41 5.41 0 003.225 4.917 23898.407 23898.407 0 0084.108 41.646c-27.832 13.672-55.563 27.526-83.353 41.259a5.938 5.938 0 00-4.081 4.876v26.771c1.854 18.195 15.823 32.817 33.913 35.503 3.509.326 7.02.266 10.529.266l155.85.001a45.08 45.08 0 0011.224-.92 40.825 40.825 0 0026.137-20.015 63.699 63.699 0 004.288-11.226c15.997 8.325 32.341 16.079 48.462 24.179.385.291.857.447 1.343.447a2.266 2.266 0 002.265-2.265v-.016-27.669a4.695 4.695 0 00-3.143-4.079l-135.323-67.112c45.203-22.431 90.412-44.876 135.63-67.335a4.573 4.573 0 002.754-4.082v-27.628a2.183 2.183 0 00-3.142-1.673l-49.135 24.363a42.189 42.189 0 00-6.388-14.917 40.613 40.613 0 00-30.097-17.422l-167.133-.001c-19.615.91-35.688 15.918-37.933 35.424v-.002z"/>
    <path d="M140.049 181.689a10.082 10.082 0 019.345-5.55h161.545l.106-.001c5.066 0 9.368 3.72 10.096 8.734.205 2.714.102 5.428 0 8.162l-90.597 44.891c-30.608-15.018-61.03-30.22-91.535-45.339.142-3.632-.633-7.53 1.04-10.897zM139.009 317.095a24846.007 24846.007 0 0191.351-45.319c30.322 14.773 60.521 29.954 90.802 44.89-.204 3.918.755 8.162-1.305 11.773a10.085 10.085 0 01-8.755 5.08h-.082l-161.605.002-.277.002a10.202 10.202 0 01-9.007-5.411c-1.796-3.386-.98-7.345-1.122-11.017z"/>
  </svg>
);

const LightroomIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M7 8v8h4" />
    <path d="M14 11v5" />
    <path d="M14 12.5c0.5 -1 1.5 -1.5 2 -1" />
  </svg>
);

const tools = [
  { name: "Figma", Icon: SiFigma },
  { name: "Photoshop", Icon: TbBrandAdobePhotoshop },
  { name: "Lightroom", Icon: LightroomIcon },
  { name: "Premiere Pro", Icon: TbBrandAdobePremier },
  { name: "Canva", Icon: SiCanva },
  { name: "CapCut", Icon: CapCutIcon },
  { name: "ChatGPT", Icon: SiOpenai },
  { name: "Gemini", Icon: SiGooglegemini },
  { name: "Claude", Icon: SiAnthropic },
  { name: "Notion", Icon: SiNotion },
  { name: "Instagram", Icon: SiInstagram },
  { name: "Pinterest", Icon: SiPinterest },
  { name: "YouTube", Icon: SiYoutube }
];

export const ToolMarquee = () => {
  return (
    <div className="py-5 w-full overflow-hidden relative border-y border-white/5 bg-white/[0.01] backdrop-blur-sm">
      {/* Gradient fades on the edges for smooth entry/exit */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-[#121212] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-[#121212] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max">
        <motion.div
          className="flex space-x-12 md:space-x-20 px-6 md:px-12 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 32, // Controlled smooth speed for infinite scroll
            repeat: Infinity,
          }}
        >
          {/* Repeat tools multiple times to create a seamless infinite scroll */}
          {[...tools, ...tools, ...tools, ...tools].map((tool, idx) => {
            const IconComponent = tool.Icon;
            return (
              <div 
                key={idx} 
                className="group relative flex flex-col items-center justify-center px-4"
              >
                <IconComponent 
                  className="w-7 h-7 md:w-8 md:h-8 text-white/40 transition-all duration-300 group-hover:text-[var(--color-accent)] group-hover:scale-115 group-hover:opacity-100" 
                />
                <span className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-all duration-300 text-[10px] md:text-xs font-semibold text-white/90 whitespace-nowrap tracking-wider uppercase">
                  {tool.name}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};
