import Link from "next/link";
import { ArrowRight } from "lucide-react";
import thoughtsData from "@/data/thoughts.json";
import GlitchCard from "@/components/glitch-card";
import Image from "next/image";
import dynamic from "next/dynamic";

// Import SkewedContainer for unique skew effects
const SkewedContainer = dynamic(() => import("@/components/skewed-container"), {
  ssr: true,
});

export default function Thoughts() {
  return (
    <div className="py-12">
      <h1 className="text-5xl md:text-6xl mb-12">Thoughts</h1>

      <div className="max-w-4xl">
        <p className="text-xl mb-12">Occasional writing on technology, strategy, and the spaces in between.</p>

        <div className="space-y-8">
          {thoughtsData.posts.map((post, index) => {
            // Generate a unique skew intensity based on the post index
            // Use a different pattern than work page to create variety
            const skewIntensity = index % 3 === 0 ? "medium" : index % 3 === 1 ? "heavy" : "light";
            
            return (
              <SkewedContainer 
                key={post.id} 
                intensity={skewIntensity} 
                skewOnLoad={true}
              >
                <GlitchCard className="block hover:border-accent transition-colors duration-200">
                  <Link href={`/thoughts/${post.id}`} className="no-underline text-white thought-card-link">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3 relative h-48 md:h-auto">
                        <Image
                          src={post.image || `/placeholder.svg?height=400&width=600&text=${post.title}`}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <h2 className="text-2xl mb-2">{post.title}</h2>
                        <p className="text-sm font-mono text-accent mb-3">{post.date}</p>
                        <p className="mb-4">{post.summary}</p>
                        <div className="flex items-center font-mono text-accent">
                          Read more
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </GlitchCard>
              </SkewedContainer>
            );
          })}
        </div>
      </div>
    </div>
  );
}

