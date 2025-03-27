/**
 * Utility functions for fetching data from Sanity
 */
import { sanityClient } from "@/sanity/config";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlForImage } from "@/sanity/config";

/**
 * Fetch all work items with optional filtering
 */
export async function getWorks() {
  return sanityClient.fetch(
    `*[_type == "work"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      categories,
      publishedAt,
      technologies,
      projectUrl,
      githubUrl
    }`
  );
}

/**
 * Fetch a single work item by slug
 */
export async function getWorkBySlug(slug: string) {
  return sanityClient.fetch(
    `*[_type == "work" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      categories,
      publishedAt,
      body,
      technologies,
      projectUrl,
      githubUrl
    }`,
    { slug }
  );
}

/**
 * Fetch all thoughts/blog posts with optional filtering
 */
export async function getThoughts() {
  return sanityClient.fetch(
    `*[_type == "thought"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      categories,
      publishedAt,
      tags
    }`
  );
}

/**
 * Fetch a single thought/blog post by slug
 */
export async function getThoughtBySlug(slug: string) {
  return sanityClient.fetch(
    `*[_type == "thought" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      categories,
      publishedAt,
      body,
      tags
    }`,
    { slug }
  );
}

/**
 * Fetch about page content
 */
export async function getAboutContent() {
  return sanityClient.fetch(`*[_type == "about"][0]`);
}

/**
 * Fetch one-liners for rotating text component
 */
export async function getOneLiners() {
  return sanityClient.fetch(
    `*[_type == "oneLiner" && active == true] {
      _id,
      text,
      category
    }`
  );
}

/**
 * Helper to format Sanity image URL with size parameters
 */
export function getSanityImageUrl(source: SanityImageSource, width = 800) {
  return urlForImage(source).width(width).url();
}
