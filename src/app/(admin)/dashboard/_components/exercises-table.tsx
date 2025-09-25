"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Exercise, ExerciseType, EXERCISE_TYPE_NAMES } from "@/lib/types/exercise.types";
import { Lesson } from "@/lib/types/lesson.types";
import { ActionDef, ColumnDef } from "@/lib/types/table.types";
import { Edit, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ExercisesTableProps {
  initialExercises: Exercise[];
  lessons: Lesson[];
}

export function ExercisesTable({
  initialExercises,
  lessons,
}: ExercisesTableProps) {
  const [exercises] = useState<Exercise[]>(initialExercises);

  const getLessonTitle = (lessonId: string): string => {
    const lesson = lessons.find((l) => l.id === lessonId);
    return lesson?.title || "Unknown Lesson";
  };

  const getExerciseTypeName = (exerciseType: ExerciseType): string => {
    return EXERCISE_TYPE_NAMES[exerciseType] || exerciseType;
  };

  const columns: ColumnDef<Exercise>[] = [
    {
      key: "lesson_id",
      label: "Lesson",
      render: (value: unknown) => getLessonTitle(value as string),
      className: "font-medium",
    },
    {
      key: "exercise_types",
      label: "Exercise Type",
      render: (value: unknown) => getExerciseTypeName(value as ExerciseType),
      className: "text-muted-foreground",
      responsive: "md:table-cell",
    },
    {
      key: "instructions",
      label: "Instructions",
      responsive: "lg:table-cell",
      className: "max-w-xs",
      render: (value: unknown) => (
        <div className="truncate" title={value as string}>
          {value as string}
        </div>
      ),
    },
    {
      key: "display_order",
      label: "Order",
      width: "w-16",
      className: "text-center text-muted-foreground",
      responsive: "md:table-cell",
      render: (value: unknown) => (
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs">
          {value as number || "-"}
        </span>
      ),
    },
    {
      key: "created_at",
      label: "Created at",
      responsive: "xl:table-cell",
      className: "text-sm text-muted-foreground",
    },
  ];

  const actions: ActionDef<Exercise>[] = [
    {
      label: "Edit exercise",
      icon: <Edit className="h-4 w-4" />,
      href: (exercise: Exercise) => `/dashboard/exercises/${exercise.id}`,
      variant: "ghost",
      size: "sm",
      className: "h-8 w-8 p-0",
    },
  ];

  return (
    <div>
      <div className="flex flex-col items-start gap-4 mb-6 md:flex-row md:justify-between md:items-center">
        <h1 className="text-3xl font-bold tracking-tight">Exercises</h1>
        <Button size="sm" asChild>
          <Link href="/dashboard/exercises/create">
            <Plus className="h-4 w-4" />
            Add Exercise
          </Link>
        </Button>
      </div>

      <DataTable
        data={exercises}
        columns={columns}
        actions={actions}
        emptyMessage="No exercises found. Create your first exercise to get started."
        itemCountLabel="exercise"
      />
    </div>
  );
}