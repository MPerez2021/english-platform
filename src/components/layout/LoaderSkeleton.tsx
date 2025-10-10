import { Skeleton } from "@/components/ui/skeleton";

/**
 * LoaderSkeleton component displays a loading placeholder for lesson content
 * Matches the layout structure of LessonContent component
 */
export default function LoaderSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb Skeleton */}
        <div className="mb-6 flex items-center gap-2">
          <Skeleton className="h-4 w-16 bg-muted" />
          <span className="text-muted-foreground">/</span>
          <Skeleton className="h-4 w-24 bg-muted" />
          <span className="text-muted-foreground">/</span>
          <Skeleton className="h-4 w-32 bg-muted" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          {/* Left Column - Main Content */}
          <div className="space-y-6">
            {/* Header Section */}
            <div className="space-y-4">
              {/* Title */}
              <Skeleton className="h-10 w-3/4 bg-muted" />

              {/* Metadata Row */}
              <div className="flex flex-wrap items-center gap-3">
                <Skeleton className="h-9 w-24 bg-muted" /> {/* Back button */}
                <Skeleton className="h-6 w-20 bg-muted" /> {/* Topic badge */}
                <Skeleton className="h-6 w-12 bg-muted" /> {/* CEFR badge */}
                <Skeleton className="h-5 w-16 bg-muted" /> {/* Time indicator */}
                <Skeleton className="h-9 w-9 rounded-md bg-muted" /> {/* Share icon */}
              </div>
            </div>

            {/* Separator */}
            <div className="h-px bg-border" />

            {/* Content Skeletons */}
            <div className="space-y-4">
              {/* Paragraph blocks */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-muted" />
                <Skeleton className="h-4 w-full bg-muted" />
                <Skeleton className="h-4 w-5/6 bg-muted" />
              </div>

              {/* Subheading */}
              <Skeleton className="h-7 w-2/5 mt-6 bg-muted" />

              {/* More paragraphs */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-muted" />
                <Skeleton className="h-4 w-full bg-muted" />
                <Skeleton className="h-4 w-4/5 bg-muted" />
              </div>

              {/* Another subheading */}
              <Skeleton className="h-7 w-1/3 mt-6 bg-muted" />

              {/* Final paragraph block */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-muted" />
                <Skeleton className="h-4 w-full bg-muted" />
                <Skeleton className="h-4 w-3/4 bg-muted" />
              </div>
            </div>
          </div>

          {/* Right Column - Table of Contents Skeleton */}
          <div className="hidden lg:block">
            <div className="sticky top-8 space-y-4">
              {/* TOC Header */}
              <Skeleton className="h-6 w-32 bg-muted" />

              {/* TOC Items */}
              <div className="space-y-3">
                <Skeleton className="h-4 w-full bg-muted" />
                <Skeleton className="h-4 w-5/6 bg-muted" />
                <Skeleton className="h-4 w-4/5 bg-muted" />
                <Skeleton className="h-4 w-full bg-muted" />
                <Skeleton className="h-4 w-3/4 bg-muted" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}