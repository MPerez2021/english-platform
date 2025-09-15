import { lessonsService } from "@/lib/services/lessons.service";
import { subcategoriesService } from "@/lib/services/subcategories.service";
import { LessonsTable } from "../_components/lessons-table";

export default async function LessonsPage() {
  const [lessons, subcategories] = await Promise.all([
    lessonsService.getAll(),
    subcategoriesService.getAll(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Lessons</h1>
        <p className="text-muted-foreground">
          Manage all lessons
        </p>
      </div>
      <LessonsTable initialLessons={lessons} subcategories={subcategories} />
    </div>
  );
}