import { lessonsService } from "@/lib/services/lessons.service";
import { MultiExerciseForm } from "../../_components/multi-exercise-form";

export default async function CreateMultipleExercisesPage() {
  const lessons = await lessonsService.getAll();
  return (
    <div className="space-y-6">
      <MultiExerciseForm lessons={lessons} />
    </div>
  );
}