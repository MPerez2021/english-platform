import { Input } from "@/components/ui/input";
import { exercisesService } from "@/lib/services/exercises.service";

interface LessonExerciseProps {
  lessonId: string;
}
// Add this small delay function
export default async function LessonExercises({
  lessonId,
}: LessonExerciseProps) {
  const result = await exercisesService.getByLessonId(lessonId);
  if (!result || result.length === 0) return null;

  const fillBlankFree = result
    .filter((e) => e.content?.question_parts)
    .map((e) => e.content.question_parts);

  if (fillBlankFree.length === 0) return null;

  return (
    <div className="w-full">
      <h2 className="text-2xl mb-6">Practice Exercises</h2>
      {fillBlankFree.map((exerciseParts, exerciseIndex) => (
        <div
          key={exerciseIndex}
          className="flex flex-wrap items-center gap-2 mb-4 text-base leading-relaxed"
        >
            {exerciseIndex + 1}.
          {exerciseParts?.map((part, partIndex) => {
            if (part.type === "text") {
              return (
                <span key={part.id || partIndex} className="text-foreground">
                  {part.value}
                </span>
              );
            }
            if (part.type === "blank") {
              return (
                <div key={part.id || partIndex} className="inline-flex items-center">
                  <Input
                    data-blank-id={part.id}
                    aria-label={`Fill in the blank${
                      part.hint ? `: ${part.hint}` : ""
                    }`}
                    className="w-32 sm:w-40 text-center inline-block border-none"
                  />
                  {part.hint && (
                    <span className="text-muted-foreground ml-1">
                      ({part.hint})
                    </span>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
}
