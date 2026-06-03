import { ScrollyCanvas } from "@/components/ScrollyCanvas";
import { ToolMarquee } from "@/components/ToolMarquee";
import { Projects } from "@/components/Projects";
import { WorkVideos } from "@/components/WorkVideos";
import { PinterestAds } from "@/components/PinterestAds";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Achievements } from "@/components/Achievements";
import { Experience } from "@/components/Experience";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <main className="relative bg-[#121212] min-h-screen selection:bg-[var(--color-accent)] selection:text-white">
      <ScrollyCanvas />
      
      <div className="relative bg-[#121212] z-20 pt-12 pb-12 shadow-[0_-50px_100px_rgba(18,18,18,1)]">
        <ToolMarquee />
        <Projects />
        <WorkVideos />
        <PinterestAds />
        <About />
        <Experience />
        <Achievements />
        <Skills />
        <CTA />
      </div>
    </main>
  );
}
