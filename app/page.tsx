import Link from "next/link";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import { features } from "@/config/features";
import oneLiners from "@/data/one-liners.json";
import RotatingTextWithSanity from "@/components/rotating-text-with-sanity";

// Import client components dynamically
const ClientHomeContent = dynamic(() => import("@/components/client-home-content"), {
  ssr: true,
});

// Dynamically import the SkewedContainer component
const SkewedContainer = dynamic(() => import("@/components/skewed-container"), {
  ssr: true,
});

export default function Home() {
  return (
    <div className="min-h-[90vh] flex flex-col justify-center pt-20">
      <div className="max-w-4xl">
        <ClientHomeContent>
          <div className="text-xl md:text-2xl mb-12 font-mono">
            <RotatingTextWithSanity
              fallbackPhrases={oneLiners.phrases}
              interval={5000}
              glitchOnRotate={true}
            />
          </div>
        </ClientHomeContent>

        <SkewedContainer intensity="light" skewOnLoad={true}>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl">
            Creative technologist with 20+ years of experience delivering high-impact work at the
            intersection of design, engineering, and strategy.
          </p>
        </SkewedContainer>

        <div className="flex flex-col sm:flex-row gap-6">
          {features.showWork && (
            <SkewedContainer intensity="medium" skewOnLoad={true}>
              <Link
                href="/work"
                className="punk-border inline-flex items-center justify-center px-8 py-3 text-lg font-mono uppercase bg-black text-white hover:bg-accent hover:text-black transition-colors duration-200 no-underline"
              >
                See my work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </SkewedContainer>
          )}

          {features.showThoughts && (
            <SkewedContainer intensity="medium" skewOnLoad={true}>
              <Link
                href="/thoughts"
                className="punk-border inline-flex items-center justify-center px-8 py-3 text-lg font-mono uppercase bg-black text-white hover:bg-accent hover:text-black transition-colors duration-200 no-underline"
              >
                Read my thoughts
              </Link>
            </SkewedContainer>
          )}

          {!features.showWork && !features.showThoughts && (
            <SkewedContainer intensity="medium" skewOnLoad={true}>
              <Link
                href="mailto:scott@scullum.com"
                className="punk-border inline-flex items-center justify-center px-8 py-3 text-lg font-mono uppercase bg-black text-white hover:bg-accent hover:text-black transition-colors duration-200 no-underline"
              >
                Get in touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </SkewedContainer>
          )}
        </div>
      </div>
    </div>
  );
}
