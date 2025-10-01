import { lessonsService } from "@/lib/services/lessons.service";
import { LessonsTable } from "../_components/lessons-table";

export default async function LessonsPage() {
  const lessons = await lessonsService.getAllWithSubcategoriesAndCategories();
  return (
    <div className="space-y-6 pt-8 px-4">
      <LessonsTable initialLessons={lessons}/>
    </div>
  );
}