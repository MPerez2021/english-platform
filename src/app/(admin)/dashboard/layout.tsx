"use client";
import { AppSidebar } from "@/app/(admin)/_components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            {mounted ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="h-9 w-9 relative"
                aria-label={`Switch to ${
                  theme === "dark" ? "light" : "dark"
                } theme`}
                aria-pressed={theme === "dark"}
              >
                <Sun
                  className={`h-4 w-4 absolute transition-all duration-300 ${
                    theme === "dark"
                      ? "rotate-90 scale-0"
                      : "rotate-0 scale-100"
                  }`}
                  aria-hidden="true"
                />
                <Moon
                  className={`h-4 w-4 absolute transition-all duration-300 ${
                    theme === "dark"
                      ? "rotate-0 scale-100"
                      : "-rotate-90 scale-0"
                  }`}
                  aria-hidden="true"
                />
              </Button>
            ) : (
              <div className="h-9 w-9 flex items-center justify-center">
                <div className="h-4 w-4 animate-pulse bg-muted rounded" />
              </div>
            )}
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
