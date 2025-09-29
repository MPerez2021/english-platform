"use client"

import * as React from "react"
import { cn } from "@/app/(admin)/_components/text-editor/tiptap-utils"

export type Orientation = "horizontal" | "vertical"

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: Orientation
  decorative?: boolean
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ decorative, orientation = "vertical", className, ...divProps }, ref) => {
    const ariaOrientation = orientation === "vertical" ? orientation : undefined
    const semanticProps = decorative
      ? { role: "none" }
      : { "aria-orientation": ariaOrientation, role: "separator" }

    return (
      <div
        className={cn(
          "shrink-0 bg-border",
          orientation === "horizontal"
            ? "h-px w-full my-1.5"
            : "h-5 w-px",
          className
        )}
        data-orientation={orientation}
        {...semanticProps}
        {...divProps}
        ref={ref}
      />
    )
  }
)

Separator.displayName = "Separator"
