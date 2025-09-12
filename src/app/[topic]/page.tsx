import type { Metadata } from "next"
import { getTopicData } from "@/lib/topic-data"
import TopicPageClient from "@/app/[topic]/TopicPageClient"

interface PageProps {
  params: Promise<{ topic: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { topic } = await params

  const topicData = getTopicData(topic)

  if (!topicData) {
    return {
      title: "Topic Not Found",
      description: "The requested topic could not be found.",
    }
  }

  return {
    title: `${topicData.name}`,
    description: `${topicData.description}`,
    keywords: [
      "English learning",
      topicData.name.toLowerCase(),
      "English exercises",
      "free English learning",
    ],
    openGraph: {
      title: `${topicData.name}`,
      description: topicData.description,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${topicData.name}`,
      description: topicData.description,
    },
  }
}

export default function Page({ params }: PageProps) {
  return <TopicPageClient params={params} />
}