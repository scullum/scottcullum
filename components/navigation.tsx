"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X, Mail } from "lucide-react"

const Navigation = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/work", label: "Work" },
    { href: "/thoughts", label: "Thoughts" },
    { href: "mailto:scott@scullum.com", label: "Email", isExternal: true },
  ]

  return (
    <header
      className={`py-6 md:py-8 fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-black/50 backdrop-blur-sm" : ""}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {!isHomePage ? (
            <Link
              href="/"
              className="font-mono text-xl md:text-2xl font-bold uppercase tracking-tighter hover:text-accent transition-colors duration-200"
            >
              Scott M. Cullum
            </Link>
          ) : (
            <div className="w-10"></div> /* Spacer for layout balance */
          )}

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {links.map((link) => (
                <li key={link.href}>
                  {link.isExternal ? (
                    <a
                      href={link.href}
                      className={`nav-link hover:text-accent flex items-center`}
                      rel="noopener noreferrer"
                    >
                      <Mail size={16} className="mr-2" />
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className={`nav-link hover:text-accent ${pathname === link.href ? "active" : ""}`}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-b border-white/20">
            <ul className="flex flex-col space-y-4">
              {links.map((link) => (
                <li key={link.href}>
                  {link.isExternal ? (
                    <a
                      href={link.href}
                      className={`nav-link hover:text-accent flex items-center`}
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Mail size={16} className="mr-2" />
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className={`nav-link hover:text-accent ${pathname === link.href ? "active" : ""}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Navigation

