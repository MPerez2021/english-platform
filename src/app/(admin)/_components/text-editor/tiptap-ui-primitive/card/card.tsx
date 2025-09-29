"use client"

import * as React from "react"
import { cn } from "@/app/(admin)/_components/text-editor/tiptap-utils"

const Card = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg shadow-md bg-card border border-border flex flex-col outline-none items-center relative min-w-0 break-words bg-clip-border",
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "p-1 flex-none flex items-center justify-between w-full border-b border-border",
        className
      )}
      {...props}
    />
  )
})
CardHeader.displayName = "CardHeader"

const CardBody = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("p-1 flex-auto overflow-y-auto", className)}
        {...props}
      />
    )
  }
)
CardBody.displayName = "CardBody"

const CardItemGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    orientation?: "horizontal" | "vertical"
  }
>(({ className, orientation = "vertical", ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-orientation={orientation}
      className={cn(
        "relative flex align-middle min-w-max",
        orientation === "vertical"
          ? "flex-col justify-center"
          : "flex-row items-center gap-1",
        className
      )}
      {...props}
    />
  )
})
CardItemGroup.displayName = "CardItemGroup"

const CardGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "pt-3 px-2 pb-1 leading-normal text-xs font-semibold capitalize text-card-foreground",
        className
      )}
      {...props}
    />
  )
})
CardGroupLabel.displayName = "CardGroupLabel"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("p-1 border-t border-border", className)}
      {...props}
    />
  )
})
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardBody, CardItemGroup, CardGroupLabel }
