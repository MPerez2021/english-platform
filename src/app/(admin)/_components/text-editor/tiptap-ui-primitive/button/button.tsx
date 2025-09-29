"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

// --- Tiptap UI Primitive ---
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/(admin)/_components/text-editor/tiptap-ui-primitive/tooltip"

// --- Lib ---
import { cn, parseShortcutKeys } from "@/app/(admin)/_components/text-editor/tiptap-utils"

const buttonVariants = cva(
  // Base styles
  "text-muted-foreground inline-flex items-center justify-start gap-1 font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-muted/50 hover:bg-muted hover:text-foreground data-[active-state=on]:bg-muted data-[active-state=on]:text-primary data-[active-state=on]:hover:bg-accent",
        ghost: "bg-transparent hover:bg-muted hover:text-foreground data-[active-state=on]:bg-accent/50 data-[active-state=on]:text-primary",
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 data-[active-state=on]:bg-primary/80",
      },
      size: {
        default: "h-7 min-w-7 px-1.5 text-sm rounded-md",
        small: "h-6 min-w-6 px-1 text-xs rounded-sm",
        large: "h-8 min-w-8 px-2 text-sm rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  showTooltip?: boolean
  tooltip?: React.ReactNode
  shortcutKeys?: string
  "data-style"?: "default" | "ghost" | "primary"
}

export const ShortcutDisplay: React.FC<{ shortcuts: string[] }> = ({
  shortcuts,
}) => {
  if (shortcuts.length === 0) return null

  return (
    <div>
      {shortcuts.map((key, index) => (
        <React.Fragment key={index}>
          {index > 0 && <kbd>+</kbd>}
          <kbd>{key}</kbd>
        </React.Fragment>
      ))}
    </div>
  )
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      tooltip,
      showTooltip = true,
      shortcutKeys,
      "aria-label": ariaLabel,
      "data-style": dataStyle,
      ...props
    },
    ref
  ) => {
    const shortcuts = React.useMemo(
      () => parseShortcutKeys({ shortcutKeys }),
      [shortcutKeys]
    )

    // Map data-style to variant if provided (for backward compatibility)
    const resolvedVariant = dataStyle
      ? (dataStyle as "default" | "ghost" | "primary")
      : variant

    if (!tooltip || !showTooltip) {
      return (
        <button
          className={cn(buttonVariants({ variant: resolvedVariant, size }), className)}
          ref={ref}
          aria-label={ariaLabel}
          data-style={dataStyle}
          {...props}
        >
          {children}
        </button>
      )
    }

    return (
      <Tooltip delay={200}>
        <TooltipTrigger
          className={cn(buttonVariants({ variant: resolvedVariant, size }), className)}
          ref={ref}
          aria-label={ariaLabel}
          data-style={dataStyle}
          {...props}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent>
          {tooltip}
          <ShortcutDisplay shortcuts={shortcuts} />
        </TooltipContent>
      </Tooltip>
    )
  }
)

Button.displayName = "Button"

export const ButtonGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    orientation?: "horizontal" | "vertical"
  }
>(({ className, children, orientation = "vertical", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex gap-0.5",
        orientation === "horizontal" ? "flex-row" : "flex-col",
        className
      )}
      data-orientation={orientation}
      role="group"
      {...props}
    >
      {children}
    </div>
  )
})
ButtonGroup.displayName = "ButtonGroup"

export default Button
