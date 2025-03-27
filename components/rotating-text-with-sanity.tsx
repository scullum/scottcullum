/**
 * Server component that fetches one-liners from Sanity CMS
 * and passes them to the client component for rotation
 */
import { getOneLiners } from "@/lib/sanity";
import RotatingText from "./rotating-text";
import { cache } from "react";

// Cache the getOneLiners function to avoid redundant requests
const cachedGetOneLiners = cache(getOneLiners);

interface RotatingTextWithSanityProps {
  fallbackPhrases: string[];
  interval?: number;
  className?: string;
  glitchOnRotate?: boolean;
}

export default async function RotatingTextWithSanity({
  fallbackPhrases,
  interval,
  className,
  glitchOnRotate,
}: RotatingTextWithSanityProps) {
  // Fetch one-liners from Sanity
  const oneLiners = await cachedGetOneLiners().catch(() => null);
  
  // Extract text from one-liners or use fallback phrases
  const phrases = oneLiners?.length 
    ? oneLiners.map((liner: { text: string }) => liner.text)
    : fallbackPhrases;
  
  return (
    <RotatingText
      phrases={phrases}
      interval={interval}
      className={className}
      glitchOnRotate={glitchOnRotate}
    />
  );
}
