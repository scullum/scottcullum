import type { Metadata } from "next";

// Base metadata that applies to all pages
export const baseMetadata: Metadata = {
  title: {
    default: "Scott M. Cullum | Creative Technologist & Strategist",
    template: "%s | Scott M. Cullum",
  },
  description:
    "Scott M. Cullum is a creative technologist and strategist with 20+ years of experience in design, engineering, and leadership.",
  keywords: ["creative technologist", "strategist", "design", "engineering", "leadership"],
  authors: [{ name: "Scott M. Cullum" }],
  creator: "Scott M. Cullum",
  publisher: "Scott M. Cullum",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://scullum.com",
    siteName: "Scott M. Cullum",
    title: "Scott M. Cullum | Creative Technologist & Strategist",
    description:
      "Scott M. Cullum is a creative technologist and strategist with 20+ years of experience in design, engineering, and leadership.",
    images: [
      {
        url: "/og-image.jpg", // You'll need to create this image
        width: 1200,
        height: 630,
        alt: "Scott M. Cullum",
      },
    ],
  },
  // No Twitter metadata as requested
};

// Helper to generate metadata for specific pages
export function createMetadata({
  title,
  description,
  path,
  ogImage,
}: {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  return {
    ...baseMetadata,
    ...(title && { title }),
    ...(description && { description }),
    ...(path && {
      alternates: {
        canonical: `https://scullum.com${path}`,
      },
      openGraph: {
        ...baseMetadata.openGraph,
        url: `https://scullum.com${path}`,
      },
    }),
    ...(ogImage && {
      openGraph: {
        ...baseMetadata.openGraph,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: title || "Scott M. Cullum",
          },
        ],
      },
      twitter: {
        ...baseMetadata.twitter,
        images: [ogImage],
      },
    }),
  };
}
