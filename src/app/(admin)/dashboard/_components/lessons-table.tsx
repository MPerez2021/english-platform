"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DataTable } from "@/components/ui/data-table";
import { CefrLevelBadge } from "@/components/ui/cefr-level-badge";
import { Lesson } from "@/lib/types/lesson.types";
import { Subcategory } from "@/lib/types/category.types";
import { ColumnDef, ActionDef } from "@/lib/types/table.types";
import { lessonsService } from "@/lib/services/lessons.service";
import { Edit, Plus, Eye, Clock } from "lucide-react";
import { toast } from "sonner";

interface LessonsTableProps {
  initialLessons: Lesson[];
  subcategories: Subcategory[];
}

export function LessonsTable({
  initialLessons,
  subcategories,
}: LessonsTableProps) {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);

  const handleTogglePublished = async (lessonId: string) => {
    try {
      const updatedLesson = await lessonsService.togglePublished(lessonId);
      if (updatedLesson) {
        const updatedLessons = await lessonsService.getAll();
        setLessons(updatedLessons);
        toast.success("Lesson status updated successfully");
      }
    } catch (error) {
      console.error("Error toggling lesson published status:", error);
      toast.error("Failed to update lesson status", {
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    }
  };

  const getSubcategoryName = (subcategoryId: string): string => {
    const subcategory = subcategories.find((s) => s.id === subcategoryId);
    return subcategory?.name || "Unknown Subcategory";
  };


  const formatEstimatedTime = (minutes: number | null): string => {
    if (!minutes) return "—";
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours}h ${remainingMinutes}m`
      : `${hours}h`;
  };

  const columns: ColumnDef<Lesson>[] = [
    {
      key: "title",
      label: "Title",
    },
    {
      key: "sub-category",
      label: "Sub Category",
      render: (value: unknown, lesson: Lesson) => (
        <div>{getSubcategoryName(lesson.subcategory_id)}</div>
      ),
    },
    {
      key: "cefr_level",
      label: "Level",
      width: "w-20",
      className: "text-center",
      render: (value: unknown) => <CefrLevelBadge level={value as string} />,
    },
    {
      key: "estimated_time",
      label: "Duration",
      width: "w-24",
      className: "text-center",
      render: (value: unknown) => (
        <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-3 w-3" />
          {formatEstimatedTime(value as number | null)}
        </div>
      ),
    },
    {
      key: "slug",
      label: "Slug",
      responsive: "xl:table-cell",
      className: "text-muted-foreground font-mono text-sm",
    },
    {
      key: "is_published",
      label: "Published",
      width: "w-24",
      render: (value: unknown, lesson: Lesson) => (
        <div className="flex items-center justify-center">
          <Switch
            checked={value as boolean}
            onCheckedChange={() => handleTogglePublished(lesson.id)}
            aria-label={`Toggle ${lesson.title} published status`}
          />
        </div>
      ),
    },
    {
      key: "created_at",
      label: "Created at",
      responsive: "xl:table-cell",
      className: "text-sm text-muted-foreground",
    },
  ];

  const actions: ActionDef<Lesson>[] = [
    {
      label: "View lesson",
      icon: <Eye className="h-4 w-4" />,
      href: (lesson: Lesson) => `/lessons/${lesson.slug}`,
      variant: "ghost",
    },
    {
      label: "Edit lesson",
      icon: <Edit className="h-4 w-4" />,
      href: (lesson: Lesson) => `/dashboard/lessons/${lesson.id}`,
      variant: "ghost",
    },
  ];

  return (
    <div>
      <div className="flex flex-col items-start gap-4 mb-6 md:flex-row md:justify-between md:items-center">
        <h1 className="text-3xl font-bold tracking-tight">Lessons</h1>
        <Button size="sm" asChild>
          <Link href="/dashboard/lessons/create">
            <Plus className="h-4 w-4"/>
            Add Lesson
          </Link>
        </Button>
      </div>

      <DataTable data={lessons} columns={columns} actions={actions} />
    </div>
  );
}
