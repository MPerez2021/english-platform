"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/app/(admin)/_components/text-editor/tiptap-utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center border transition-colors font-bold",
  {
    variants: {
      variant: {
        default: "bg-background border-border text-muted-foreground",
        ghost: "bg-transparent border-border text-muted-foreground",
        gray: "bg-muted border-border text-muted-foreground",
        green: "bg-green-100 border-green-200 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-200",
        white: "bg-background border-border text-foreground",
      },
      size: {
        default: "h-5 min-w-5 px-1 text-[0.625rem] leading-tight rounded-sm",
        small: "h-4 min-w-4 px-0.5 text-[0.625rem] leading-none rounded-xs",
        large: "h-6 min-w-6 px-1.5 text-xs leading-normal rounded-md",
      },
      appearance: {
        default: "",
        subdued: "opacity-80",
        emphasized: "font-extrabold border-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      appearance: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  trimText?: boolean
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      variant,
      size,
      appearance,
      trimText = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          badgeVariants({ variant, size, appearance }),
          trimText && "overflow-hidden text-ellipsis",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Badge.displayName = "Badge"

export default Badge
