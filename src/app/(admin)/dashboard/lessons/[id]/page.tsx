import { notFound } from "next/navigation";
import { lessonsService } from "@/lib/services/lessons.service";
import { LessonForm } from "../../_components/lesson-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditLessonPage({ params }: Props) {
  const { id } = await params;

  const lesson = await lessonsService.getById(id);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Edit Lesson</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Update the content and details for &ldquo;{lesson.title}&rdquo;.
        </p>
      </div>
      <LessonForm
        lesson={lesson}
        mode="edit"
      />
    </div>
  );
}