import { Skeleton } from "@/components/ui/skeleton";

export function LessonExerciseSkeleton() {
  return (
    <div className="w-full">
      {/* Title Skeleton */}
      <Skeleton className="h-8 w-48 mb-6 bg-muted" />

      {/* Exercise Row 1 */}
      <div className="flex flex-wrap items-center gap-2 mb-4 ">
        <Skeleton className="h-4 w-4 bg-muted" /> {/* Number */}
        <Skeleton className="h-4 w-1/2 bg-muted" /> {/* Text segment */}
      </div>

      {/* Exercise Row 2 */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Skeleton className="h-4 w-4 bg-muted" /> {/* Number */}
        <Skeleton className="h-4 w-1/3 bg-muted" /> {/* Text segment */}

      </div>

      {/* Exercise Row 3 */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Skeleton className="h-4 w-4 bg-muted" /> {/* Number */}
        <Skeleton className="h-4 w-1/4 bg-muted" /> {/* Text segment */}
      </div>
    </div>
  );
}
