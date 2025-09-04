"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { isValidTopic } from "@/lib/topic-data"
import { notFound } from "next/navigation"
import { use } from "react"
import { Header } from "@/components/layout/Header"

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
    <Header />
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        {children}
      </div>
    </SidebarProvider>
    </>
  )
}