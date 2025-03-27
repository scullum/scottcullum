import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const documentType = searchParams.get("type");

  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  // Enable Draft Mode by setting the cookie
  draftMode().enable();

  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  if (documentType === "work" && slug) {
    redirect(`/work/${slug}`);
  }

  if (documentType === "thought" && slug) {
    redirect(`/thoughts/${slug}`);
  }

  // If no slug was provided, redirect to the home page
  redirect("/");
}
