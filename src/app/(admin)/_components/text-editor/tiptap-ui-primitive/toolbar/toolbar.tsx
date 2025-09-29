"use client"

import * as React from "react"
import { Separator } from "@/app/(admin)/_components/text-editor/tiptap-ui-primitive/separator"
import { cn } from "@/app/(admin)/_components/text-editor/tiptap-utils"
import { useMenuNavigation } from "@/app/(admin)/_components/text-editor/hooks/use-menu-navigation"
import { useComposedRef } from "@/app/(admin)/_components/text-editor/hooks/use-composed-ref"

type BaseProps = React.HTMLAttributes<HTMLDivElement>

interface ToolbarProps extends BaseProps {
  variant?: "floating" | "fixed"
}

const useToolbarNavigation = (
  toolbarRef: React.RefObject<HTMLDivElement | null>
) => {
  const [items, setItems] = React.useState<HTMLElement[]>([])

  const collectItems = React.useCallback(() => {
    if (!toolbarRef.current) return []
    return Array.from(
      toolbarRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [role="button"]:not([disabled]), [tabindex="0"]:not([disabled])'
      )
    )
  }, [toolbarRef])

  React.useEffect(() => {
    const toolbar = toolbarRef.current
    if (!toolbar) return

    const updateItems = () => setItems(collectItems())

    updateItems()
    const observer = new MutationObserver(updateItems)
    observer.observe(toolbar, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [collectItems, toolbarRef])

  const { selectedIndex } = useMenuNavigation<HTMLElement>({
    containerRef: toolbarRef,
    items,
    orientation: "horizontal",
    onSelect: (el) => el.click(),
    autoSelectFirstItem: false,
  })

  React.useEffect(() => {
    const toolbar = toolbarRef.current
    if (!toolbar) return

    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement
      if (toolbar.contains(target))
        target.setAttribute("data-focus-visible", "true")
    }

    const handleBlur = (e: FocusEvent) => {
      const target = e.target as HTMLElement
      if (toolbar.contains(target)) target.removeAttribute("data-focus-visible")
    }

    toolbar.addEventListener("focus", handleFocus, true)
    toolbar.addEventListener("blur", handleBlur, true)

    return () => {
      toolbar.removeEventListener("focus", handleFocus, true)
      toolbar.removeEventListener("blur", handleBlur, true)
    }
  }, [toolbarRef])

  React.useEffect(() => {
    if (selectedIndex !== undefined && items[selectedIndex]) {
      items[selectedIndex].focus()
    }
  }, [selectedIndex, items])
}

export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  ({ children, className, variant = "fixed", ...props }, ref) => {
    const toolbarRef = React.useRef<HTMLDivElement>(null)
    const composedRef = useComposedRef(toolbarRef, ref)
    useToolbarNavigation(toolbarRef)

    return (
      <div
        ref={composedRef}
        role="toolbar"
        aria-label="toolbar"
        data-variant={variant}
        className={cn(
          "flex items-center gap-2 bg-background",
          variant === "fixed" &&
            "sticky top-0 z-50 w-full min-h-11 border-b border-border px-1.5 overflow-x-auto overscroll-x-contain scrollbar-hide max-sm:absolute max-sm:top-auto max-sm:bottom-0 max-sm:h-[calc(2.5rem+env(safe-area-inset-bottom,0px))] max-sm:border-t max-sm:border-b-0 max-sm:pb-[env(safe-area-inset-bottom,0px)] max-sm:flex-nowrap max-sm:justify-start",
          variant === "floating" &&
            "p-0.5 rounded-lg border border-border bg-background shadow-lg outline-none overflow-hidden max-sm:w-full max-sm:rounded-none max-sm:border-none max-sm:shadow-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Toolbar.displayName = "Toolbar"

export const ToolbarGroup = React.forwardRef<HTMLDivElement, BaseProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={cn(
        "flex items-center gap-0.5 empty:hidden [&:empty+[role=separator]]:hidden [&+[role=separator]:has(+&:empty)]:hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
ToolbarGroup.displayName = "ToolbarGroup"

export const ToolbarSeparator = React.forwardRef<HTMLDivElement, BaseProps>(
  ({ ...props }, ref) => (
    <Separator ref={ref} orientation="vertical" decorative {...props} />
  )
)
ToolbarSeparator.displayName = "ToolbarSeparator"
