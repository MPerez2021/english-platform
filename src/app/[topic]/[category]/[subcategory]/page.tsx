import LessonContent from "@/app/lessons/_components/LessonContent";
import { lessonsService } from "@/lib/services/lessons.service";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ topic: string; category: string; subcategory: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { subcategory } = await params;
  const result = await lessonsService.getBySlugWithBreadcrumb(subcategory);

  if (!result) {
    return {
      title: "Lesson Not Found",
      description: "The requested lesson could not be found.",
    };
  }
  const { lesson, description, breadcrumb } = result;
  return {
    title: `${lesson.title}`,
    description: description,
    keywords: [
      "English learning",
      lesson.title,
      breadcrumb.category,
      breadcrumb.topic,
      "English exercises",
    ],
    openGraph: {
      title: `${breadcrumb.subcategory} - ${breadcrumb.category} - ${breadcrumb.topic}`,
      description: description,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${breadcrumb.subcategory} - ${breadcrumb.category} - ${breadcrumb.topic}`,
      description: description,
    },
  };
}

export default async function SubcategoryPage({ params }: PageProps) {
  const { subcategory } = await params;

  return (
    <>
        <LessonContent subcategory={subcategory} />
    </>
  );
}
