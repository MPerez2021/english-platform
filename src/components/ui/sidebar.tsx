"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const SidebarContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean) => void
  isMobile: boolean
}>({
  open: true,
  setOpen: () => {},
  isMobile: false,
})

export const useSidebar = () => {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SidebarProvider({
  children,
  defaultOpen = true,
  open: openProp,
  onOpenChange,
}: SidebarProviderProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const [isMobile, setIsMobile] = React.useState(false)

  const open = openProp ?? internalOpen
  const setOpen = onOpenChange ?? setInternalOpen

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  return (
    <SidebarContext.Provider value={{ open, setOpen, isMobile }}>
      <div className="flex min-h-screen">
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

interface SidebarProps {
  children: React.ReactNode
  className?: string
  side?: "left" | "right"
}

export function Sidebar({ 
  children, 
  className,
  side = "left" 
}: SidebarProps) {
  const { open, isMobile } = useSidebar()

  if (isMobile && !open) return null

  return (
    <aside
      className={cn(
        "flex h-screen w-64 flex-col border-r bg-background",
        side === "right" && "border-l border-r-0",
        !open && !isMobile && "w-16",
        isMobile && "fixed inset-y-0 z-50 w-64",
        className
      )}
    >
      {children}
    </aside>
  )
}

export function SidebarHeader({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex h-16 items-center border-b px-4", className)}>
      {children}
    </div>
  )
}

export function SidebarContent({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string
}) {
  return (
    <ScrollArea className={cn("flex-1 px-2 py-2", className)}>
      {children}
    </ScrollArea>
  )
}

export function SidebarFooter({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("border-t p-4", className)}>
      {children}
    </div>
  )
}

export function SidebarGroup({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  )
}

export function SidebarGroupLabel({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string
}) {
  return (
    <h4 className={cn("mb-2 px-2 text-sm font-semibold text-muted-foreground", className)}>
      {children}
    </h4>
  )
}

export function SidebarGroupContent({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("space-y-1", className)}>
      {children}
    </div>
  )
}

export function SidebarMenu({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string
}) {
  return (
    <nav className={cn("space-y-1", className)}>
      {children}
    </nav>
  )
}

export function SidebarMenuItem({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  )
}

interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  isActive?: boolean
}

export function SidebarMenuButton({ 
  children, 
  className, 
  isActive = false,
  ...props 
}: SidebarMenuButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 px-3 py-2 h-auto font-medium",
        isActive && "bg-accent text-accent-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

export function SidebarTrigger({ 
  className,
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen, open } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setOpen(!open)}
      className={cn("h-9 w-9", className)}
      {...props}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  )
}