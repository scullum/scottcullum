"use client";

import dynamic from 'next/dynamic'
import { ColorProvider } from '@/contexts/color-context'

// Simple wrapper component that includes all client components
export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ColorProvider>
      <NoiseOverlay />
      <Navigation />
      {children}
    </ColorProvider>
  )
}

// Static fallback components
const NoiseOverlayFallback = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-5 bg-black" />
)

const NavigationFallback = () => (
  <header className="py-6 md:py-8 fixed top-0 left-0 right-0 z-40">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="h-8 w-40 bg-gray-800 animate-pulse rounded"></div>
        <div className="h-8 w-64 bg-gray-800 animate-pulse rounded"></div>
      </div>
    </div>
  </header>
)

// Import actual components with fallbacks
const NoiseOverlay = dynamic(
  () => import('./noise-overlay'),
  { loading: () => <NoiseOverlayFallback /> }
)

const Navigation = dynamic(
  () => import('./navigation'),
  { loading: () => <NavigationFallback /> }
)
