import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import thoughtsData from "@/data/thoughts.json"
import { notFound } from "next/navigation"
import Image from "next/image"

// Define the params type for this specific page
type ThoughtPageParams = {
  id: string
}

export function generateStaticParams() {
  return thoughtsData.posts.map((post) => ({
    id: post.id,
  }))
}

export default function ThoughtPage({ params }: { params: ThoughtPageParams }) {
  const post = thoughtsData.posts.find((p) => p.id === params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="py-12">
      <Link href="/thoughts" className="inline-flex items-center font-mono text-accent hover:underline mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all thoughts
      </Link>

      <article className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl mb-4">{post.title}</h1>
        <p className="text-accent font-mono mb-8">{post.date}</p>

        <div className="relative w-full h-[300px] mb-8 punk-border">
          <Image
            src={post.image || `/placeholder.svg?height=600&width=1200&text=${post.title}`}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-xl mb-6">{post.summary}</p>

          {post.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-6">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  )
}

