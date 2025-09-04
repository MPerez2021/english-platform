"use client"

import { useState, use } from "react"
import { notFound } from "next/navigation"
import { getTopicData, isValidTopic, type Level } from "@/lib/topic-data"
import { TopicSidebar } from "@/components/topics/TopicSidebar"
import { TopicContent } from "@/components/topics/TopicContent"

interface TopicPageProps {
  params: Promise<{
    topic: string
  }>
}

export default function TopicPage({ params }: TopicPageProps) {
  const { topic } = use(params)
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)

  // Validate the topic parameter
  if (!isValidTopic(topic)) {
    notFound()
  }

  const topicData = getTopicData(topic)
  if (!topicData) {
    notFound()
  }

  return (
    <>
      <TopicSidebar
        topicData={topicData}
        selectedLevel={selectedLevel}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        onLevelChange={setSelectedLevel}
        onCategoryChange={setSelectedCategory}
        onSubcategoryChange={setSelectedSubcategory}
      />
      <TopicContent
        topicData={topicData}
        selectedLevel={selectedLevel}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
      />
    </>
  )
}