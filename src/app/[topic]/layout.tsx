"use client"

import { Header } from "@/components/layout/Header"
import { isValidTopic } from "@/lib/topic-data"
import { notFound } from "next/navigation"
import { use } from "react"

interface TopicLayoutProps {
  children: React.ReactNode
  params: Promise<{
    topic: string
  }>
}

export default function TopicLayout({ children, params }: TopicLayoutProps) {
  const { topic } = use(params)
  
  // Validate the topic parameter
  if (!isValidTopic(topic)) {
    notFound()
  }

  return (
    <>
      <div className="flex min-h-screen w-full">
        {children}
      </div>
    </>
  )
}