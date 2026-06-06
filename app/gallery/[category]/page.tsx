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
    description: "Visual highlights of contingent operations, national camps (EBSB), ceremonial drills, and training sessions commanding 52+ cadets.",
  },
  savara: {
    title: "Savara Publicity",
    subtitle: "Outreach & Event Branding",
    description: "Creative visual campaigns, promotional highlights, and marketing materials engineered for SAVA Fest and SAVARa.",
  },
  imagix: {
    title: "IMAGIX Photography",
    subtitle: "On-Ground Event & Fest Coverage",
    description: "Candid event capture, motion highlights, lighting tests, and festival photography produced for campus event coverages.",
  }
};

export function generateStaticParams() {
  return [
    { category: "ncc" },
    { category: "savara" },
    { category: "imagix" }
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
    <main className="relative min-h-screen bg-[#121212] text-[#FFFCF2] py-20 px-6 md:px-12 selection:bg-[var(--color-accent)] selection:text-white overflow-hidden">
      {/* Background radial glowing effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[var(--color-accent)] opacity-[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[var(--color-accent)] opacity-[0.02] blur-[150px] pointer-events-none" />
      <div className="noise-bg" />

      <GalleryClient 
        category={category} 
        files={files} 
        meta={meta} 
      />
    </main>
  );
}
