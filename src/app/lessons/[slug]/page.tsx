import { notFound } from "next/navigation";
import { lessonsService } from "@/lib/services/lessons.service";
import { LessonPreview } from "./_components/lesson-preview";
import { Header } from "@/components/layout/Header";

interface LessonPageProps {
  params: Promise<{ slug: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const result = await lessonsService.getBySlugWithBreadcrumb(slug);

  if (!result) {
    notFound();
  }

  const { lesson, breadcrumb } = result;

  // Only show published lessons to non-admin users
  // For now, we'll show all lessons, but you can add auth check here
  if (!lesson.is_published) {
    notFound();
  }

  return (
    <>
      <Header />
      <div className="mt-16">
      <LessonPreview lesson={lesson} breadcrumb={breadcrumb} />
      </div>
    </>
  );
}

export async function generateMetadata({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = await lessonsService.getBySlug(slug);

  if (!lesson) {
    return {
      title: "Lesson Not Found",
    };
  }

  return {
    title: `${lesson.title} - ${lesson.cefr_level} Level`,
    description: `Learn English with this ${lesson.cefr_level} level lesson: ${lesson.title}`,
  };
}
