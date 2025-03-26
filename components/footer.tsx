"use client"

import { useAccentColor, colorOptions } from "@/contexts/color-context"
import { useState } from "react"
import { Linkedin, FileText } from "lucide-react"

export default function Footer() {
  const { accentColorName, setColor } = useAccentColor()
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)

  return (
    <footer className="border-t border-white/20 mt-20 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-white/70">© {new Date().getFullYear()} Scott M. Cullum</p>
        </div>

        <div className="flex items-center space-x-6 mb-4 md:mb-0">
          <a
            href="https://linkedin.com/in/scottcullum"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-accent transition-colors duration-200 flex items-center"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={20} />
            <span className="ml-2 text-sm font-mono hidden sm:inline">LinkedIn</span>
          </a>

          <a
            href="/scott-cullum-resume.pdf"
            download
            className="text-white hover:text-accent transition-colors duration-200 flex items-center"
            aria-label="Download Resume"
          >
            <FileText size={20} />
            <span className="ml-2 text-sm font-mono hidden sm:inline">Resume</span>
          </a>
        </div>

        <div className="relative">
          <button
            className="flex items-center space-x-2 px-3 py-1 border border-white/30 text-sm font-mono"
            onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
            aria-expanded={isColorPickerOpen}
            aria-haspopup="true"
          >
            <span>Color: </span>
            <span className="inline-block w-4 h-4 rounded-full" style={{ backgroundColor: "var(--accent)" }}></span>
            <span style={{ color: "var(--accent)" }}>{accentColorName}</span>
          </button>

          {isColorPickerOpen && (
            <div className="absolute bottom-full right-0 mb-2 bg-black border border-white p-2 flex flex-col gap-1 z-50">
              {colorOptions.map((color) => (
                <button
                  key={color.name}
                  className="px-3 py-1 text-xs font-mono uppercase cursor-pointer hover:bg-white hover:text-black transition-colors flex items-center space-x-2 text-left"
                  style={{ color: color.value }}
                  onClick={() => {
                    setColor(color.value)
                    setIsColorPickerOpen(false)
                  }}
                >
                  <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: color.value }}></span>
                  <span>{color.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}

