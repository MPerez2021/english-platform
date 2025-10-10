"use client";

import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TocItem {
  /** Heading text */
  text: string;
  /** Heading level (1-5) */
  level: number;
  /** ID for anchor link */
  id: string;
}

export interface LessonTocProps {
  /** HTML content to extract headings from */
  htmlContent: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Table of Contents component for lesson pages
 * Automatically extracts h1-h5 headings from HTML content
 * Provides smooth scroll navigation and active section highlighting
 */
export function LessonToc({ htmlContent, className = "" }: LessonTocProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    // Extract headings from HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const headings = doc.querySelectorAll("h1, h2, h3, h4, h5");

    const items: TocItem[] = Array.from(headings).map((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const text = heading.textContent || "";
      const id = `heading-${index}`;

      return { text, level, id };
    });

    setTocItems(items);

    // Set up intersection observer for active section tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66%", threshold: 0 }
    );

    // Observe all headings
    const actualHeadings = document.querySelectorAll("h1, h2, h3, h4, h5");
    actualHeadings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [htmlContent]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        "hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto",
        className
      )}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <BookOpen className="h-4 w-4" />
          <span>Table of Contents</span>
        </div>

        <ul className="space-y-2 border-l-2 border-border pl-4">
          {tocItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={cn(
                  "text-sm text-left transition-colors hover:text-foreground w-full cursor-pointer",
                  item.level === 1 && "pl-0",
                  item.level === 2 && "pl-2",
                  item.level === 3 && "pl-4",
                  item.level === 4 && "pl-6",
                  item.level === 5 && "pl-8",
                  activeId === item.id
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                )}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
