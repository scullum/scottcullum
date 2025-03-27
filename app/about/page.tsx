import GlitchCard from "@/components/glitch-card";
import { FileText } from "lucide-react";
import { SkewedH1, SkewedH2 } from "@/components/skewed-elements";
import dynamic from "next/dynamic";
import { SkewedParagraphGroup } from "@/components/skewed-paragraph-group";
import { features } from "@/config/features";
import { getAboutContent, getSanityImageUrl } from "@/lib/sanity";
import { notFound } from "next/navigation";

// Define interfaces for About page data
interface Duration {
  startDate: string;
  endDate: string;
}

interface Position {
  company: string;
  title: string;
  description?: string;
  duration?: Duration;
}

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

interface Photo {
  image: SanityImageReference;
  caption?: string;
}

interface AboutData {
  title: string;
  intro: {
    title: string;
    paragraphs: string[];
    photo?: Photo;
  };
  experience: {
    title: string;
    positions: Position[];
  };
}

// Import SkewedContainer for unique skew effects
const SkewedContainer = dynamic(() => import("@/components/skewed-container"), {
  ssr: true,
});

// Import the DistortedImage component dynamically
const DistortedImage = dynamic(() => import("@/components/distorted-image"), {
  ssr: true,
});

export default async function About() {
  // Fetch about content from Sanity
  const aboutData = await getAboutContent().catch(() => null) as AboutData | null;
  
  // If no data is found, show 404
  if (!aboutData) return notFound();
  
  // Use local data as fallback if needed
  return (
    <div className="py-12">
      <SkewedH1 className="text-5xl md:text-6xl mb-12">About</SkewedH1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <SkewedH2 className="text-2xl md:text-3xl mb-6 text-accent">{aboutData.intro.title}</SkewedH2>

          <SkewedParagraphGroup className="space-y-8" intensity="medium">
            {aboutData.intro.paragraphs.map((paragraph: string, index: number) => (
              <p key={index} className="text-lg paragraph-container">
                <span dangerouslySetInnerHTML={{ __html: paragraph }} />
              </p>
            ))}
          </SkewedParagraphGroup>
        </div>

        <div>
          <GlitchCard className="h-full">
            <div className="relative w-full h-[400px] mb-4 overflow-hidden">
              <DistortedImage
                src={aboutData.intro.photo?.image 
                  ? getSanityImageUrl(aboutData.intro.photo.image, 800)
                  : "/me.webp"}
                alt="Scott M. Cullum"
                width={600}
                height={800}
                className="w-full h-full object-cover"
                distortionIntensity="medium"
                priority
              />
            </div>
          </GlitchCard>
        </div>
      </div>

      <div className="mt-24 pt-12 border-t border-[var(--border)]">
        <div className="flex justify-between items-center mb-6">
          <SkewedH2 className="text-2xl md:text-3xl text-accent">{aboutData.experience.title}</SkewedH2>

          {features.showResume && (
            <a
              href="/scott-cullum-resume.pdf"
              download
              className="punk-border inline-flex items-center px-4 py-2 text-sm font-mono uppercase bg-black text-white hover:bg-accent hover:text-black transition-colors duration-200 no-underline"
            >
              <FileText size={16} className="mr-2" />
              Download Resume
            </a>
          )}
        </div>

        <div className="space-y-8">
          {aboutData.experience.positions.map((position: Position, index: number) => {
            // Generate a unique skew intensity based on the position index
            const skewIntensity = index % 3 === 0 ? "light" : index % 3 === 1 ? "medium" : "heavy";

            return (
              <SkewedContainer
                key={index}
                intensity={skewIntensity}
                skewOnLoad={true}
                className="border-l-2 border-accent pl-6 py-2"
              >
                {position.duration && (
                  <span className="text-sm font-mono text-[var(--muted)] block mb-1">
                    {position.duration.startDate} — {position.duration.endDate}
                  </span>
                )}
                <h3 className="text-xl mb-1">{position.company}</h3>
                <p className="text-accent mb-2">{position.title}</p>
                {position.description && <p>{position.description}</p>}
              </SkewedContainer>
            );
          })}
        </div>
      </div>
    </div>
  );
}
