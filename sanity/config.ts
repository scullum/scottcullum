/**
 * Sanity configuration for Scott Cullum's portfolio site
 */
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Sanity configuration
export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03", // Use the latest API version
  useCdn: process.env.NODE_ENV === "production",
};

// Create a client for fetching data
export const sanityClient = createClient(config);

// Helper function to generate image URLs
const builder = imageUrlBuilder(sanityClient);

/**
 * Helper function to generate image URLs from Sanity image references
 */
export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}
