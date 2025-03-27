import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import GlitchCard from "@/components/glitch-card";
import { getWorkBySlug, getSanityImageUrl } from "@/lib/sanity";
import { features } from "@/config/features";
import { PortableText } from "@portabletext/react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Define interfaces for Work data
interface SanityImageReference {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
  crop?: {
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  hotspot?: {
    height: number;
    width: number;
    x: number;
    y: number;
  };
}

interface WorkProject {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage: SanityImageReference;
  categories: string[];
  publishedAt: string;
  body: any[];
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
}

// Define the params type for this specific page
type WorkDetailPageParams = {
  id: string;
};

// We'll use dynamic rendering for now
// In production, you'd want to implement generateStaticParams
// that fetches all work slugs from Sanity

export default async function WorkDetailPage({ params }: { params: WorkDetailPageParams }) {
  // Check if work section is enabled
  if (!features.showWork) return notFound();
  
  // Fetch work project from Sanity
  const project = await getWorkBySlug(params.id).catch(() => null) as WorkProject | null;

  if (!project) {
    notFound();
  }

  return (
    <div className="py-12">
      <Link
        href="/work"
        className="inline-flex items-center font-mono text-accent hover:underline mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all work
      </Link>

      <div className="relative w-full h-[400px] mb-8 overflow-hidden punk-border">
        <Image 
          src={project.mainImage 
            ? getSanityImageUrl(project.mainImage, 1200)
            : "/placeholder.svg"} 
          alt={project.title} 
          fill 
          className="object-cover" 
          priority 
        />
      </div>

      <h1 className="text-5xl md:text-6xl mb-4">{project.title}</h1>
      <p className="text-xl text-accent font-mono mb-12">{project.categories?.join(", ") || "Project"}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <GlitchCard>
          <h2 className="text-xl mb-4">Challenge</h2>
          <p>
            Every project comes with unique challenges. For {project.title}, we needed to balance
            technical constraints with ambitious business goals while maintaining a focus on user
            experience.
          </p>
        </GlitchCard>

        <GlitchCard>
          <h2 className="text-xl mb-4">Approach</h2>
          <p>
            I took a strategic yet hands-on approach, working closely with stakeholders to
            understand the core needs and develop solutions that addressed both immediate
            requirements and long-term vision.
          </p>
        </GlitchCard>

        <GlitchCard>
          <h2 className="text-xl mb-4">Outcome</h2>
          <p>
            The result was a solution that not only met technical requirements but also aligned with
            business objectives and delivered a compelling user experience that drove measurable
            results.
          </p>
        </GlitchCard>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl mb-6">Project Overview</h2>
        <p className="text-lg mb-4">{project.excerpt}</p>
        {project.body && (
          <div className="text-lg prose prose-invert max-w-none">
            <PortableText value={project.body} />
          </div>
        )}
      </div>

      {project.technologies && project.technologies.length > 0 && (
        <div className="mb-12">
          <h2 className="text-3xl mb-6">Technologies</h2>

          <ul className="space-y-4">
            {project.technologies.map((tech, index) => (
              <li key={index} className="flex items-start">
                <span className="text-accent mr-2">→</span>
                <span>{tech}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="text-center mt-16">
        <p className="text-xl mb-8">Interested in working together on a similar project?</p>

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
