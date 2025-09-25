import { exercisesService } from "@/lib/services/exercises.service";
import { lessonsService } from "@/lib/services/lessons.service";
import { notFound } from "next/navigation";
import { ExerciseForm } from "../../_components/exercise-form";

interface EditExercisePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditExercisePage({
  params,
}: EditExercisePageProps) {
  const { id } = await params;

  const [exercise, lessons] = await Promise.all([
    exercisesService.getById(id),
    lessonsService.getAll(),
  ]);

  if (!exercise) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Exercise</h1>
        <p className="text-muted-foreground">
          Update the exercise information and content
        </p>
      </div>

      <ExerciseForm exercise={exercise} lessons={lessons} mode="edit" />
    </div>
  );
}
