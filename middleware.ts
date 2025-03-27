import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { features } from "./config/features";

/**
 * Middleware to handle feature-flagged routes
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect from disabled feature routes
  if (!features.showWork && pathname.startsWith("/work")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!features.showThoughts && pathname.startsWith("/thoughts")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

/**
 * Configure which paths this middleware runs on
 */
export const config = {
  matcher: ["/work/:path*", "/thoughts/:path*"],
};
