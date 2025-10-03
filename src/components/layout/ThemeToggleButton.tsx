"use client";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggleButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Prevent hydration mismatch by only rendering theme-dependent content after mount
  useEffect(() => {
    setMounted(true);
  }, []);
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {mounted ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="h-9 w-9 relative"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          aria-pressed={theme === "dark"}
        >
          <Sun
            className={`h-4 w-4 absolute transition-all duration-300 ${
              theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
            }`}
            aria-hidden="true"
          />
          <Moon
            className={`h-4 w-4 absolute transition-all duration-300 ${
              theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
            }`}
            aria-hidden="true"
          />
        </Button>
      ) : (
        <div className="h-9 w-9 flex items-center justify-center">
          <div className="h-4 w-4 animate-pulse bg-muted rounded" />
        </div>
      )}
    </>
  );
}
