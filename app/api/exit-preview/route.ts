import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") || "/";

  // Exit Draft Mode by clearing the cookie
  draftMode().disable();

  // Redirect to the path specified in the query
  redirect(path);
}
