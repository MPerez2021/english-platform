import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates a URL-friendly slug from a given name
 * @param name - The name to convert to a slug
 * @returns A lowercase, hyphenated string suitable for URLs
 * @example
 * generateSlug("Present Simple Basics") // "present-simple-basics"
 * generateSlug("Advanced C2 Level!") // "advanced-c2-level"
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
