import { lessonsService } from "@/lib/services/lessons.service";
import { subcategoriesService } from "@/lib/services/subcategories.service";
import { LessonsTable } from "../_components/lessons-table";

export default async function LessonsPage() {
  const [lessons, subcategories] = await Promise.all([
    lessonsService.getAll(),
    subcategoriesService.getAll(),
  ]);

  return (
    <div className="space-y-6 pt-8 px-4">
      <LessonsTable initialLessons={lessons} subcategories={subcategories} />
    </div>
  );
}