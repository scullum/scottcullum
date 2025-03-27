"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

// Dynamically import the SkewedContainer component
const SkewedContainer = dynamic(() => import("@/components/skewed-container"), {
  ssr: true,
});

// Common props interface for all skewed elements
interface SkewedElementProps {
  children: ReactNode;
  className?: string;
  intensity?: "light" | "medium" | "heavy";
}

/**
 * Skewed heading components for consistent glitch aesthetic
 */
export function SkewedH1({ children, className = "", intensity = "medium" }: SkewedElementProps) {
  return (
    <SkewedContainer intensity={intensity} skewOnLoad={true}>
      <h1 className={className}>{children}</h1>
    </SkewedContainer>
  );
}

export function SkewedH2({ children, className = "", intensity = "medium" }: SkewedElementProps) {
  return (
    <SkewedContainer intensity={intensity} skewOnLoad={true}>
      <h2 className={className}>{children}</h2>
    </SkewedContainer>
  );
}

export function SkewedH3({ children, className = "", intensity = "light" }: SkewedElementProps) {
  return (
    <SkewedContainer intensity={intensity} skewOnLoad={true}>
      <h3 className={className}>{children}</h3>
    </SkewedContainer>
  );
}

/**
 * Skewed text components for consistent glitch aesthetic
 */
export function SkewedP({ children, className = "", intensity = "light" }: SkewedElementProps) {
  return (
    <SkewedContainer intensity={intensity} skewOnLoad={true}>
      <p className={className}>{children}</p>
    </SkewedContainer>
  );
}

export function SkewedDiv({ children, className = "", intensity = "light" }: SkewedElementProps) {
  return (
    <SkewedContainer intensity={intensity} skewOnLoad={true}>
      <div className={className}>{children}</div>
    </SkewedContainer>
  );
}

export function SkewedSection({
  children,
  className = "",
  intensity = "light",
}: SkewedElementProps) {
  return (
    <SkewedContainer intensity={intensity} skewOnLoad={true}>
      <section className={className}>{children}</section>
    </SkewedContainer>
  );
}

/**
 * Skewed card component for content blocks
 */
export function SkewedCard({ children, className = "", intensity = "medium" }: SkewedElementProps) {
  return (
    <SkewedContainer intensity={intensity} skewOnLoad={true}>
      <div className={`p-4 ${className}`}>{children}</div>
    </SkewedContainer>
  );
}
