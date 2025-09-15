import { subcategoriesService } from "@/lib/services/subcategories.service";
import { LessonForm } from "../../_components/lesson-form";

export default async function NewLessonPage() {
  const subcategories = await subcategoriesService.getAll();

  return <LessonForm subcategories={subcategories} mode="create" />;
}