import { Lesson } from "@/lib/types/lesson.types";
import { Clock } from "lucide-react";
import { CefrLevelBadge } from "@/components/ui/cefr-level-badge";
import { LessonRender } from "./lesson-render";

interface LessonPreviewProps {
  lesson: Lesson;
}

export async function LessonPreview({ lesson }: LessonPreviewProps) {


  const formatEstimatedTime = (minutes: number | null): string => {
    if (!minutes) return "—";
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours}h ${remainingMinutes}m`
      : `${hours}h`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight">{lesson.title}</h1>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">Level:</span>
                  <CefrLevelBadge level={lesson.cefr_level} />
                </div>

                {lesson.estimated_time && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {formatEstimatedTime(lesson.estimated_time)}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">Created:</span>
                  <span className="text-sm text-muted-foreground">
                    {lesson.created_at.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

         {/*    <LessonContentRenderer
              content={lesson.explanation_content}
              className="leading-relaxed"
            /> */}
            <LessonRender data={lesson.explanation_content}/>
      </div>
    </div>
  );
}