"use client";

import dynamic from "next/dynamic";

// Import the CursorFix component with ssr: false in a client component
const CursorFix = dynamic(() => import("@/components/cursor-fix"), {
  ssr: false
});

export function CursorFixWrapper() {
  return <CursorFix />;
}

export default CursorFixWrapper;
