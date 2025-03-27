"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Mail } from "lucide-react";
import { InlineToggleControls } from "./inline-toggle-controls";

const Navigation = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHomePage = pathname === "/";

  useEffect(() => {
    // Debounced scroll handler for better performance
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        if (window.scrollY > 10) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }, 10); // Small timeout for debouncing
    };

    // Use passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Memoize links array to prevent unnecessary re-renders
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/work", label: "Work" },
    { href: "/thoughts", label: "Thoughts" },
    { href: "mailto:scott@scullum.com", label: "Contact", isExternal: true },
  ];

  return (
    <header
      className={`py-6 md:py-8 fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-[var(--background)]/50 backdrop-blur-sm" : ""}`}
      style={{
        borderBottom: "1px solid var(--nav-border)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {!isHomePage ? (
              <Link
                href="/"
                className="font-mono text-xl md:text-2xl font-bold uppercase tracking-tighter transition-colors duration-200 text-accent"
              >
                Scott M. Cullum
              </Link>
            ) : (
              <div className="hidden md:flex items-center">
                <InlineToggleControls />
              </div>
            )}
          </div>

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
                      className={`nav-link hover:text-accent text-[var(--foreground)] flex items-center`}
                      rel="noopener noreferrer"
                    >
                      <Mail size={16} className="mr-2" />
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className={`nav-link hover:text-accent text-[var(--foreground)] ${pathname === link.href ? "active" : ""}`}
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
          <div className="md:hidden mt-4 pb-4 border-b border-[var(--border)]">
            <nav>
              <ul className="flex flex-col space-y-4">
                {links.map((link) => (
                  <li key={link.href}>
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        className={`nav-link hover:text-accent text-[var(--foreground)] flex items-center`}
                        rel="noopener noreferrer"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Mail size={16} className="mr-2" />
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className={`nav-link hover:text-accent text-[var(--foreground)] ${pathname === link.href ? "active" : ""}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Show toggle controls in mobile menu on homepage */}
            {isHomePage && (
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-center">
                <InlineToggleControls />
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
