import { topicsService } from "@/lib/services/topics.service";
import type { Metadata } from "next";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ topic: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  'use cache'
  const { topic } = await params;
  const result = await topicsService.getTopicBySlug(topic);

  if (!result) {
    return {
      title: "Topic Not Found",
      description: "The requested topic could not be found.",
    };
  }

  return {
    title: `${result.name}`,
description: `${result.description}`,
    keywords: [
      "English learning",
      result.name,
      "English exercises",
      "free English learning",
    ],
    openGraph: {
      title: `${result.name}`,
      description: result.description,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${result.name}`,
      description: result.description,
    },
  };
}

export default async function Page() {
  const result = await getText();
  return (
    <>
    <h1>fasdfasdfas</h1>
    <p>{result.name}</p>
      <p>{result.slug}</p>
      <p>{result.description}</p>
    </>
  );
}
async function getText(){
  'use cache'
  const result = await topicsService.getTopicBySlug('grammar');
  return result;
}