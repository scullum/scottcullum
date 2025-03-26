import GlitchCard from "@/components/glitch-card"
import Image from "next/image"
import { FileText } from "lucide-react"
import aboutData from "@/data/about.json"

export default function About() {
  return (
    <div className="py-12">
      <h1 className="text-5xl md:text-6xl mb-12">About</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl md:text-3xl mb-6">{aboutData.intro.title}</h2>

          <div className="space-y-8">
            {aboutData.intro.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg" dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>
        </div>

        <div>
          <GlitchCard className="h-full">
            <div className="relative w-full h-[400px] mb-4 overflow-hidden">
              <Image
                src={aboutData.intro.photo.src || "/placeholder.svg"}
                alt={aboutData.intro.photo.alt}
                fill
                className="object-cover"
                priority
              />
            </div>
            <p className="text-sm font-mono text-center">{aboutData.intro.photo.caption}</p>
          </GlitchCard>
        </div>
      </div>

      <div className="mt-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl">{aboutData.experience.title}</h2>

          <a
            href="/scott-cullum-resume.pdf"
            download
            className="punk-border inline-flex items-center px-4 py-2 text-sm font-mono uppercase bg-black text-white hover:bg-accent hover:text-black transition-colors duration-200 no-underline"
          >
            <FileText size={16} className="mr-2" />
            Download Resume
          </a>
        </div>

        <div className="space-y-8">
          {aboutData.experience.positions.map((position, index) => (
            <div key={index} className="border-l-2 border-accent pl-6 py-2">
              <h3 className="text-xl mb-1">{position.company}</h3>
              <p className="text-accent mb-2">{position.title}</p>
              <p>{position.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

