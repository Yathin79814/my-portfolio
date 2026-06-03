"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, User, Briefcase, Layers, Mail, FileText, Play, TrendingUp } from "lucide-react";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: Layers },
  { id: "videos", label: "Motion", icon: Play },
  { id: "marketing", label: "Marketing", icon: TrendingUp },
  { id: "about", label: "About", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "contact", label: "Contact", icon: Mail },
];

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");

  // Highlight active section based on scroll using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: "-20% 0px -20% 0px" } // Adjust to trigger comfortably before section is fully centered
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop Vertical Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -20, x: 20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-6 right-6 md:top-10 md:right-10 z-[100] hidden md:block"
      >
        <div className="flex flex-col gap-4 bg-white/5 backdrop-blur-xl border border-white/10 p-3 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                aria-label={item.label}
                className="relative group p-3 rounded-full flex items-center justify-center transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-[var(--color-accent)]/20 border border-[var(--color-accent)]/50 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon 
                  size={20} 
                  strokeWidth={isActive ? 2.5 : 1.5}
                  className={`relative z-10 transition-colors duration-300 ${isActive ? "text-[var(--color-accent)]" : "text-white/60 group-hover:text-white"}`} 
                />
                
                {/* Tooltip on hover */}
                <div className="absolute right-full mr-4 px-3 py-1.5 rounded-md bg-[#1a1a1a] border border-white/10 text-xs font-medium text-white/90 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl">
                  {item.label}
                </div>
              </button>
            );
          })}
          
          <div className="w-6 h-px bg-white/20 mx-auto my-1" />
          
          <a
            href="/Yatthin_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Resume"
            className="relative group p-3 rounded-full flex items-center justify-center transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          >
            <FileText 
              size={20} 
              strokeWidth={1.5}
              className="relative z-10 text-[var(--color-accent)]/80 group-hover:text-[var(--color-accent)] transition-colors duration-300" 
            />
            
            <div className="absolute right-full mr-4 px-3 py-1.5 rounded-md bg-[#1a1a1a] border border-[var(--color-accent)]/30 text-xs font-medium text-[var(--color-accent)] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-[0_0_15px_rgba(235,94,40,0.2)]">
              View Resume
            </div>
          </a>
        </div>
      </motion.nav>

      {/* Mobile Horizontal Nav (Top Pill) */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] md:hidden w-[90%] max-w-sm pointer-events-none"
      >
        <div className="flex justify-around items-center bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 px-4 py-3 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.8)] pointer-events-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                aria-label={item.label}
                className="relative p-2.5 rounded-full flex items-center justify-center transition-all duration-300 outline-none"
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-pill"
                    className="absolute inset-0 bg-[var(--color-accent)]/20 border border-[var(--color-accent)]/50 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon 
                  size={18} 
                  strokeWidth={isActive ? 2.5 : 1.5}
                  className={`relative z-10 transition-colors duration-300 ${isActive ? "text-[var(--color-accent)]" : "text-white/60"}`} 
                />
              </button>
            );
          })}
          
          <div className="h-6 w-px bg-white/20 mx-1" />
          
          <a
            href="/Yatthin_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Resume"
            className="relative p-2.5 rounded-full flex items-center justify-center transition-all duration-300 outline-none bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 shadow-[0_0_10px_rgba(235,94,40,0.2)]"
          >
            <FileText 
              size={18} 
              strokeWidth={1.5}
              className="relative z-10 text-[var(--color-accent)]" 
            />
          </a>
        </div>
      </motion.nav>
    </>
  );
};
