import GlitchCard from "@/components/glitch-card";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SkewedH1 } from "@/components/skewed-elements";
import { getWorks, getSanityImageUrl } from "@/lib/sanity";
import { features } from "@/config/features";
import { notFound } from "next/navigation";

// Define interfaces for Work data
interface WorkProject {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage: unknown; // Sanity image reference
  categories: string[];
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
}

export default async function Work() {
  // Check if work section is enabled
  if (!features.showWork) return notFound();

  // Fetch work projects from Sanity
  const workProjects = (await getWorks().catch(() => [])) as WorkProject[];
  return (
    <div className="py-12">
      <SkewedH1 className="text-5xl md:text-6xl mb-12">Work</SkewedH1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {workProjects.map((project, index) => (
          <GlitchCard
            key={project._id}
            className={`${index % 2 === 0 ? "md:translate-y-8" : ""} transform ${
              index % 3 === 0
                ? "skew-x-1 skew-y-0.5"
                : index % 3 === 1
                  ? "skew-x-2 -skew-y-1"
                  : "-skew-x-1.5 skew-y-1.5"
            }`}
            glitchEffect={true}
          >
            <div className="relative w-full h-48 mb-4 overflow-hidden">
              <Image
                src={
                  project.mainImage ? getSanityImageUrl(project.mainImage, 800) : "/placeholder.svg"
                }
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <h2 className="text-2xl mb-2">{project.title}</h2>
            <p className="text-accent font-mono mb-4">
              {project.categories?.join(", ") || "Project"}
            </p>
            <p className="mb-6">{project.excerpt}</p>

            <Link
              href={`/work/${project.slug.current}`}
              className="inline-flex items-center font-mono text-accent hover:underline"
            >
              View details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </GlitchCard>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-xl mb-8">Want to see how we might work together?</p>

        <Link
          href="/contact"
          className="punk-border inline-flex items-center justify-center px-8 py-3 text-lg font-mono uppercase bg-black text-white hover:bg-accent hover:text-black transition-colors duration-200 no-underline"
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
}
