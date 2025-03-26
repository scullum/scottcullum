import RotatingText from "@/components/rotating-text"
import oneLiners from "@/data/one-liners.json"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-[90vh] flex flex-col justify-center pt-20">
      <div className="max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          <span className="block">Scott M. Cullum</span>
          <span className="block text-3xl md:text-4xl mt-4" style={{ color: "var(--accent)" }}>
            <RotatingText phrases={oneLiners.phrases} className="inline-block glitch" />
          </span>
        </h1>

        <p className="text-xl md:text-2xl mb-12 max-w-2xl">
          Creative technologist and strategist with 20+ years of experience in design, engineering, and leadership.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <Link
            href="/work"
            className="punk-border inline-flex items-center justify-center px-8 py-3 text-lg font-mono uppercase bg-black text-white hover:bg-accent hover:text-black transition-colors duration-200 no-underline"
          >
            See my work
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>

          <Link
            href="/thoughts"
            className="punk-border inline-flex items-center justify-center px-8 py-3 text-lg font-mono uppercase bg-black text-white hover:bg-accent hover:text-black transition-colors duration-200 no-underline"
          >
            Read my thoughts
          </Link>
        </div>
      </div>
    </div>
  )
}

