"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState, useRef } from "react"
import { usePathname } from "next/navigation"

// Define our color options
export const colorOptions = [
  { name: "orange", value: "#ff3c00" },
  { name: "electric-blue", value: "#00f0ff" },
  { name: "acid-green", value: "#aaff00" },
  { name: "hot-pink", value: "#ff00aa" },
  { name: "yellow", value: "#ffcc00" },
]

type ColorContextType = {
  accentColor: string
  accentColorName: string
  setColor: (color: string) => void
}

const ColorContext = createContext<ColorContextType>({
  accentColor: colorOptions[0].value,
  accentColorName: colorOptions[0].name,
  setColor: () => {},
})

// Helper function to update CSS with the accent color
function updateAccentColorStyles(colorValue: string) {
  if (typeof window === "undefined") return
  
  // Update CSS variable
  document.documentElement.style.setProperty("--accent", colorValue)
  
  // Apply to all hover states
  const existingStyle = document.querySelector("style[data-accent-hover]")
  if (existingStyle) {
    existingStyle.remove()
  }
  
  const style = document.createElement("style")
  style.setAttribute("data-accent-hover", "true")
  style.innerHTML = `
    .hover\\:text-accent:hover { color: ${colorValue} !important; }
    .hover\\:bg-accent:hover { background-color: ${colorValue} !important; }
    .hover\\:border-accent:hover { border-color: ${colorValue} !important; }
  `
  document.head.appendChild(style)
}

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [accentColor, setAccentColor] = useState(colorOptions[0].value)
  const [accentColorName, setAccentColorName] = useState(colorOptions[0].name)
  const pathname = usePathname()
  const previousColorRef = useRef<string>(colorOptions[0].value)

  // Change color on initial load and on pathname change
  useEffect(() => {
    // Only run on client-side
    if (typeof window !== "undefined") {
      // Get a random color that's different from the previous one
      let randomIndex: number
      let selectedColor: (typeof colorOptions)[0]

      do {
        randomIndex = Math.floor(Math.random() * colorOptions.length)
        selectedColor = colorOptions[randomIndex]
      } while (selectedColor.value === previousColorRef.current && colorOptions.length > 1)

      setAccentColor(selectedColor.value)
      setAccentColorName(selectedColor.name)
      previousColorRef.current = selectedColor.value

      // Update CSS styles with the new color
      updateAccentColorStyles(selectedColor.value)
    }
  }, [pathname]) // Re-run when pathname changes

  const setColor = (colorValue: string) => {
    const colorOption = colorOptions.find((c) => c.value === colorValue)
    if (colorOption) {
      setAccentColor(colorOption.value)
      setAccentColorName(colorOption.name)
      previousColorRef.current = colorOption.value
      
      // Update CSS styles with the new color
      updateAccentColorStyles(colorOption.value)
    }
  }

  return <ColorContext.Provider value={{ accentColor, accentColorName, setColor }}>{children}</ColorContext.Provider>
}

export function useAccentColor() {
  return useContext(ColorContext)
}

