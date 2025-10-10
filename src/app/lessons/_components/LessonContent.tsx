import { LessonBreadcrumb } from "@/components/lessons/LessonBreadcrumb";
import { LessonToc } from "@/components/lessons/LessonToc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CefrLevelBadge } from "@/components/ui/cefr-level-badge";
import { Separator } from "@/components/ui/separator";
import { lessonsService } from "@/lib/services/lessons.service";
import { Clock, Share2, Tag } from "lucide-react";
import { notFound } from "next/navigation";
import { LessonBackButton } from "./LessonBackButton";
import { LessonRender } from "./LessonRender";

interface LessonContentProps {
  subcategory: string;
}

export default async function LessonContent({subcategory}: LessonContentProps) {
  const result = await lessonsService.getBySlugWithBreadcrumb(subcategory);
  if (!result) {
    notFound();
  }
  const {lesson, breadcrumb} = result;

  const formatEstimatedTime = (minutes: number | null): string => {
    if (!minutes) return "—";
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours}h ${remainingMinutes}m`
      : `${hours}h`;
  };
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb Navigation */}
        <LessonBreadcrumb
          topic={breadcrumb.topic}
          topicSlug={breadcrumb.topicSlug}
          category={breadcrumb.category}
          subcategory={breadcrumb.subcategory}
          className="mb-6"
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          {/* Left Column - Main Content */}
          <div className="space-y-6">
            {/* Header Section */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">
                {lesson.title}
              </h1>

              {/* Metadata Cards */}
              <div className="flex flex-wrap items-center gap-3">
                <LessonBackButton />
                <Badge variant="secondary" className="gap-1.5">
                  <Tag className="h-3.5 w-3.5" />
                  {breadcrumb.topic}
                </Badge>
                <CefrLevelBadge level={lesson.cefr_level} />
                {lesson.estimated_time && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{formatEstimatedTime(lesson.estimated_time)}</span>
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Share this lesson"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Separator />
            {/* Lesson Content */}
            <LessonRender html={lesson.explanation_content} />
          </div>

          {/* Right Column - Table of Contents */}
          <div className="hidden lg:block">
            <LessonToc htmlContent={lesson.explanation_content} />
          </div>
        </div>
      </div>
    </div>
  );
}
