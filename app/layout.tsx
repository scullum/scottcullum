import type React from "react";
import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import NoiseOverlay from "@/components/noise-overlay";
import { ColorProvider } from "@/contexts/color-context";
import Footer from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Scott M. Cullum | Creative Technologist & Strategist",
  description:
    "Scott M. Cullum is a creative technologist and strategist with 20+ years of experience in design, engineering, and leadership.",
};

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
        <ColorProvider>
          <NoiseOverlay />
          <Navigation />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <main>{children}</main>
          </div>
          <Footer />
        </ColorProvider>
      </body>
    </html>
  );
}
