"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { SITE_CONFIG, NAVIGATION_ITEMS } from "@/lib/constants"
import Link from "next/link"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Prevent hydration mismatch by only rendering theme-dependent content after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background" role="banner">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold text-primary">
                {SITE_CONFIG.name}
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
              {NAVIGATION_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={`Navigate to ${item.name} section`}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Right side - Theme toggle and mobile menu */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            {mounted ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="h-9 w-9 relative"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                aria-pressed={theme === "dark"}
              >
                <Sun className={`h-4 w-4 absolute transition-all duration-300 ${theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"}`} aria-hidden="true" />
                <Moon className={`h-4 w-4 absolute transition-all duration-300 ${theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`} aria-hidden="true" />
              </Button>
            ) : (
              <div className="h-9 w-9 flex items-center justify-center">
                <div className="h-4 w-4 animate-pulse bg-muted rounded" />
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={`${isMobileMenuOpen ? "Close" : "Open"} mobile menu`}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t" id="mobile-navigation">
            <nav className="flex flex-col space-y-3" role="navigation" aria-label="Mobile navigation">
              {NAVIGATION_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label={`Navigate to ${item.name} section`}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}