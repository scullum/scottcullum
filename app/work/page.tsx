import GlitchCard from "@/components/glitch-card";
import workData from "@/data/work.json";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

// Import SkewedContainer for unique skew effects
const SkewedContainer = dynamic(() => import("@/components/skewed-container"), {
  ssr: true,
});

export default function Work() {
  return (
    <div className="py-12">
      <h1 className="text-5xl md:text-6xl mb-12">Work</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {workData.projects.map((project, index) => {
          // Generate a unique skew intensity based on the project index
          const skewIntensity = index % 3 === 0 ? "light" : index % 3 === 1 ? "medium" : "heavy";
          
          return (
            <SkewedContainer 
              key={project.id} 
              intensity={skewIntensity} 
              skewOnLoad={true}
            >
              <GlitchCard className={`${index % 2 === 0 ? "md:translate-y-8" : ""}`} glitchEffect={true}>
                <div className="relative w-full h-48 mb-4 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                <h2 className="text-2xl mb-2">{project.title}</h2>
                <p className="text-accent font-mono mb-4">{project.subtitle}</p>
                <p className="mb-6">{project.summary}</p>

                <Link
                  href={`/work/${project.id}`}
                  className="inline-flex items-center font-mono text-accent hover:underline"
                >
                  View details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </GlitchCard>
            </SkewedContainer>
          );
        })}
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

