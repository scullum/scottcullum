import type React from "react";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import { baseMetadata } from "@/lib/metadata";

// Import client components dynamically
import dynamic from "next/dynamic";

// Import the client wrapper component
const ClientWrapper = dynamic(
  () => import("@/components/client-components").then(mod => mod.ClientWrapper),
  { ssr: true }
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <main>{children}</main>
          </div>
          <Footer />
        </ClientWrapper>
      </body>
    </html>
  );
}
