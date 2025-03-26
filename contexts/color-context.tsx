"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState, useRef } from "react"
import { usePathname } from "next/navigation"

// Define our color options with RGB values for transparency effects
export const colorOptions = [
  { name: "orange", value: "#ff3c00", rgb: "255, 60, 0" },
  { name: "electric-blue", value: "#00f0ff", rgb: "0, 240, 255" },
  { name: "acid-green", value: "#aaff00", rgb: "170, 255, 0" },
  { name: "hot-pink", value: "#ff00aa", rgb: "255, 0, 170" },
  { name: "yellow", value: "#ffcc00", rgb: "255, 204, 0" },
]

type ColorContextType = {
  accentColor: string
  accentColorRgb: string
  accentColorName: string
  setColor: (color: string) => void
}

const ColorContext = createContext<ColorContextType>({
  accentColor: colorOptions[0].value,
  accentColorRgb: colorOptions[0].rgb,
  accentColorName: colorOptions[0].name,
  setColor: () => {},
})

// Helper function to update CSS with the accent color
function updateAccentColorStyles(colorValue: string, colorRgb: string) {
  if (typeof window === "undefined") return
  
  // Update CSS variables
  document.documentElement.style.setProperty("--accent", colorValue)
  document.documentElement.style.setProperty("--accent-rgb", colorRgb)
  
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
  const [accentColorRgb, setAccentColorRgb] = useState(colorOptions[0].rgb)
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
      setAccentColorRgb(selectedColor.rgb)
      setAccentColorName(selectedColor.name)
      previousColorRef.current = selectedColor.value

      // Update CSS styles with the new color
      updateAccentColorStyles(selectedColor.value, selectedColor.rgb)
    }
  }, [pathname]) // Re-run when pathname changes

  const setColor = (colorValue: string) => {
    const colorOption = colorOptions.find((c) => c.value === colorValue)
    if (colorOption) {
      setAccentColor(colorOption.value)
      setAccentColorRgb(colorOption.rgb)
      setAccentColorName(colorOption.name)
      previousColorRef.current = colorOption.value
      
      // Update CSS styles with the new color
      updateAccentColorStyles(colorOption.value, colorOption.rgb)
    }
  }

  return <ColorContext.Provider value={{ accentColor, accentColorRgb, accentColorName, setColor }}>{children}</ColorContext.Provider>
}

export function useAccentColor() {
  return useContext(ColorContext)
}

