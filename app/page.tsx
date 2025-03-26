import RotatingText from "@/components/rotating-text"
import oneLiners from "@/data/one-liners.json"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import the SkewedContainer component since it uses client-side features
const SkewedContainer = dynamic(() => import("@/components/skewed-container"), {
  ssr: true
})

export default function Home() {
  return (
    <div className="min-h-[90vh] flex flex-col justify-center pt-20">
      <div className="max-w-4xl">
        <SkewedContainer intensity="light" skewOnLoad={true}>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="block">Scott M. Cullum</span>
            <span className="block text-3xl md:text-4xl mt-4 max-w-3xl" style={{ color: "var(--accent)" }}>
              <RotatingText phrases={oneLiners.phrases} className="glitch" />
            </span>
          </h1>
        </SkewedContainer>

        <SkewedContainer intensity="light" skewOnLoad={true}>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl">
            Creative technologist and strategist with 20+ years of experience in design, engineering, and leadership.
          </p>
        </SkewedContainer>

        <div className="flex flex-col sm:flex-row gap-6">
          <SkewedContainer intensity="medium" skewOnLoad={true}>
            <Link
              href="/work"
              className="punk-border inline-flex items-center justify-center px-8 py-3 text-lg font-mono uppercase bg-black text-white hover:bg-accent hover:text-black transition-colors duration-200 no-underline"
            >
              See my work
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </SkewedContainer>

          <SkewedContainer intensity="medium" skewOnLoad={true}>
            <Link
              href="/thoughts"
              className="punk-border inline-flex items-center justify-center px-8 py-3 text-lg font-mono uppercase bg-black text-white hover:bg-accent hover:text-black transition-colors duration-200 no-underline"
            >
              Read my thoughts
            </Link>
          </SkewedContainer>
        </div>
      </div>
    </div>
  )
}

