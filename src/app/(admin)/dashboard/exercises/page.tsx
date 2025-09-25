import { exercisesService } from "@/lib/services/exercises.service";
import { lessonsService } from "@/lib/services/lessons.service";
import { ExercisesTable } from "../_components/exercises-table";

export default async function ExercisesPage() {
  const [exercises, lessons] = await Promise.all([
    exercisesService.getAll(),
    lessonsService.getAll(),
  ]);

  return (
    <ExercisesTable
      initialExercises={exercises}
      lessons={lessons}
    />
  );
}