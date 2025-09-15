import { notFound } from "next/navigation";
import { lessonsService } from "@/lib/services/lessons.service";
import { subcategoriesService } from "@/lib/services/subcategories.service";
import { LessonForm } from "../../_components/lesson-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditLessonPage({ params }: Props) {
  const { id } = await params;

  const [lesson, subcategories] = await Promise.all([
    lessonsService.getById(id),
    subcategoriesService.getAll(),
  ]);

  if (!lesson) {
    notFound();
  }

  return (
    <LessonForm
      lesson={lesson}
      subcategories={subcategories}
      mode="edit"
    />
  );
}