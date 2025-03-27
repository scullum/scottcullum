import workData from "@/data/work.json";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import GlitchCard from "@/components/glitch-card";

// Define the params type for this specific page
type WorkDetailPageParams = {
  id: string;
};

export function generateStaticParams() {
  return workData.projects.map((project) => ({
    id: project.id,
  }));
}

export default function WorkDetailPage({ params }: { params: WorkDetailPageParams }) {
  const project = workData.projects.find((p) => p.id === params.id);

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
        <Image src="/me.webp" alt={project.title} fill className="object-cover" priority />
      </div>

      <h1 className="text-5xl md:text-6xl mb-4">{project.title}</h1>
      <p className="text-xl text-accent font-mono mb-12">{project.subtitle}</p>

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
        <p className="text-lg mb-4">{project.summary}</p>
        <p className="text-lg mb-4">
          This project exemplifies my approach to technology and strategy—focusing on what&apos;s
          possible rather than just what&apos;s feasible, and ensuring that technical decisions
          support broader business goals.
        </p>
        <p className="text-lg">
          Working across disciplines, I was able to bridge gaps between design, engineering, and
          business stakeholders to create a cohesive solution that addressed complex challenges
          while maintaining clarity of purpose.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl mb-6">Key Contributions</h2>

        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="text-accent mr-2">→</span>
            <span>
              Strategic direction and technical leadership throughout the project lifecycle
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2">→</span>
            <span>
              Cross-functional collaboration to align technical implementation with business
              objectives
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2">→</span>
            <span>Rapid prototyping to validate concepts and create stakeholder alignment</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2">→</span>
            <span>Implementation oversight to ensure technical excellence and maintainability</span>
          </li>
        </ul>
      </div>

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
