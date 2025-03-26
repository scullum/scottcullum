import type React from "react";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import { baseMetadata } from "@/lib/metadata";

// Import client components dynamically
import dynamic from "next/dynamic";

// Import the client wrapper components
const ClientWrapper = dynamic(
  () => import("@/components/client-components").then(mod => mod.ClientWrapper),
  { ssr: true }
);

// Import the SkewProvider for site-wide glitch aesthetics
const SkewProvider = dynamic(
  () => import("@/app/skew-provider").then(mod => mod.SkewProvider),
  { ssr: true }
);

// SVG Filters for glitch effects
const GlitchFilters = () => (
  <svg className="absolute -z-10 opacity-0 pointer-events-none" aria-hidden="true">
    <defs>
      <filter id="redFilter">
        <feColorMatrix
          type="matrix"
          values="1 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 1 0"
        />
      </filter>
      <filter id="greenFilter">
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0
                  0 1 0 0 0
                  0 0 0 0 0
                  0 0 0 1 0"
        />
      </filter>
      <filter id="blueFilter">
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0
                  0 0 0 0 0
                  0 0 1 0 0
                  0 0 0 1 0"
        />
      </filter>
      <filter id="glitchFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
);

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const metadata = baseMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceMono.variable} font-sans bg-black text-white min-h-screen relative`}
      >
        <ClientWrapper>
          <GlitchFilters />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <main>
              <SkewProvider>
                {children}
              </SkewProvider>
            </main>
          </div>
          <Footer />
        </ClientWrapper>
      </body>
    </html>
  );
}
