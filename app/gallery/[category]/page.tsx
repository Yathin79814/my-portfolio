import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { GalleryClient } from "@/components/GalleryClient";

interface GalleryPageProps {
  params: Promise<{
    category: string;
  }>;
}

const categoryMeta: Record<string, { title: string; subtitle: string; description: string }> = {
  ncc: {
    title: "NCC Leadership",
    subtitle: "National Cadet Corps (SUO)",
    description: "Commanded a unit of 52+ cadets, representing our campus at the national EBSB camp and receiving the 'Best Cadet' award. I learned contingent team building, drills coordination, and cross-cultural communication. This leadership role is useful in managing large engineering teams, coordinating delegation, and building strict operational discipline under high-pressure environments.",
  },
  savara: {
    title: "Savara Publicity",
    subtitle: "Outreach & Event Branding",
    description: "Spearheaded publicity campaigns and social media outreach for SAVA Fest across digital channels. I learned digital campaign design, growth marketing, scheduling automation, and audience reach analytics. This experience is useful for driving product marketing, planning brand visibility strategies, and capturing audience growth.",
  },
  imagix: {
    title: "IMAGIX Photography",
    subtitle: "On-Ground Event & Fest Coverage",
    description: "Captured and edited event candids, highlights, and promotional videos for college fests and institutional platforms. I mastered lighting, composition, creative direction, and rapid editing using CapCut and Adobe tools. This is useful for creating premium visual branding, high-end content systems, and pixel-perfect UI designs.",
  },
  cvip: {
    title: "CVIP 2024 Conference",
    subtitle: "Volunteering & Organizing Committee",
    description: "Organized logistics and coordinated operations for the International Conference on Computer Vision and Image Processing hosted at IIITDM. Under Dr. Jagadeesh Kakarla's guidance, I hosted distinguished leaders like Prof. Umapada Pal and Prof. Vikram M. Gadre. I learned scientific event coordination, hospitality logistics, and executive communication. This is useful for stakeholder relations and corporate event management.",
  }
};

export function generateStaticParams() {
  return [
    { category: "ncc" },
    { category: "savara" },
    { category: "imagix" },
    { category: "cvip" }
  ];
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const resolvedParams = await params;
  const category = resolvedParams.category.toLowerCase();

  const meta = categoryMeta[category];
  if (!meta) {
    return notFound();
  }

  // Path to the public category directory
  const categoryDir = path.join(process.cwd(), "public", "work", category);
  
  let files: string[] = [];
  try {
    if (fs.existsSync(categoryDir)) {
      files = fs.readdirSync(categoryDir)
        .filter(file => !file.startsWith(".")) // Ignore hidden files like .DS_Store
        .map(file => `/work/${category}/${file}`);
    }
  } catch (error) {
    console.error(`Error reading gallery files for ${category}:`, error);
  }

  return (
    <main className="relative min-h-screen bg-[#121212] text-[#FFFCF2] py-20 px-6 md:px-12 selection:bg-[var(--color-accent)] selection:text-white overflow-hidden gallery-page">
      {/* Background radial glowing effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[var(--color-accent)] opacity-[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[var(--color-accent)] opacity-[0.02] blur-[150px] pointer-events-none" />

      <GalleryClient 
        category={category} 
        files={files} 
        meta={meta} 
      />
    </main>
  );
}
