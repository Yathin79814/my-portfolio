import fs from "fs";
import path from "path";
import { ScrollyCanvas } from "@/components/ScrollyCanvas";
import { ToolMarquee } from "@/components/ToolMarquee";
import { Projects } from "@/components/Projects";
import { WorkVideos } from "@/components/WorkVideos";
import { PinterestAds } from "@/components/PinterestAds";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Achievements } from "@/components/Achievements";
import { Experience } from "@/components/Experience";
import { CombinedGallery } from "@/components/CombinedGallery";
import { CTA } from "@/components/CTA";

export default async function Home() {
  const categories = ["ncc", "savara", "imagix", "cvip"];
  let galleryFiles: string[] = [];

  try {
    categories.forEach((category) => {
      const dirPath = path.join(process.cwd(), "public", "work", category);
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath)
          .filter((file) => !file.startsWith("."))
          .map((file) => `/work/${category}/${file}`);
        galleryFiles = [...galleryFiles, ...files];
      }
    });
  } catch (error) {
    console.error("Error reading gallery files in Home page:", error);
  }

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
        <CombinedGallery files={galleryFiles} />
        <CTA />
      </div>
    </main>
  );
}
