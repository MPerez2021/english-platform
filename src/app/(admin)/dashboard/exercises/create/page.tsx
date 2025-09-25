import { lessonsService } from "@/lib/services/lessons.service";
import { ExerciseForm } from "../../_components/exercise-form";

export default async function CreateExercisePage() {
  const lessons = await lessonsService.getAll();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Exercise</h1>
        <p className="text-muted-foreground">
          Add a new exercise to a lesson
        </p>
      </div>

      <ExerciseForm
        lessons={lessons}
        mode="create"
      />
    </div>
  );
}