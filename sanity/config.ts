/**
 * Sanity configuration for Scott Cullum's portfolio site
 */
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { draftMode } from "next/headers";

// Sanity configuration
export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03", // Use the latest API version
  useCdn: process.env.NODE_ENV === "production",
};

/**
 * Set up a helper function for generating Sanity clients
 */
export function getSanityClient(preview = false) {
  const client = createClient({
    ...config,
    useCdn: !preview,
    perspective: preview ? "previewDrafts" : "published",
    token: preview ? process.env.SANITY_API_READ_TOKEN : undefined,
  });
  
  return client;
}

/**
 * Helper function to get the appropriate Sanity client based on current mode
 */
export function getClient() {
  // Check if we're in draft mode
  const { isEnabled } = draftMode();
  return getSanityClient(isEnabled);
}

/**
 * Helper function to generate image URLs from Sanity image references
 */
export function urlForImage(source: SanityImageSource) {
  // Create a new builder for each request to ensure we're using the correct client
  const client = getClient();
  const builder = imageUrlBuilder(client);
  return builder.image(source);
}
