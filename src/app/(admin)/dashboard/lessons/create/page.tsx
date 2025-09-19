import { subcategoriesService } from "@/lib/services/subcategories.service";
import { LessonForm } from "../../_components/lesson-form";

export default async function NewLessonPage() {
  const subcategories = await subcategoriesService.getAll();

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Create New Lesson</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Create engaging lesson content to help students learn effectively.
        </p>
      </div>
      <LessonForm subcategories={subcategories} mode="create" />
    </div>
  );
}