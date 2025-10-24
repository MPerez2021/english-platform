import { topicsService } from "@/lib/services/topics.service";
import type { Metadata } from "next";
import { Suspense } from "react";
import { LessonRender } from "../lessons/_components/LessonRender";
import { LessonToc } from "@/components/lessons/LessonToc";

interface PageProps {
  params: Promise<{ topic: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  "use cache";
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

export default async function Page({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const result = await getText(topic);
  return (
    <>
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          <LessonRender html={result.overview} />
          <div className="hidden lg:block">
            <LessonToc htmlContent={result.overview} />
          </div>
        </div>
      </div>
    </>
  );
}
async function getText(slug: string) {
  const result = await topicsService.getTopicBySlug(slug);
  return result;
}
