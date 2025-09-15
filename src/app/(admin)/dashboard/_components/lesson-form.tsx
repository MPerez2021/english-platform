"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  lessonFormSchema,
  LessonFormSchema,
} from "@/lib/validations/lesson.schema";
import { Lesson, CEFR_LEVELS } from "@/lib/types/lesson.types";
import { Subcategory } from "@/lib/types/category.types";
import { lessonsService } from "@/lib/services/lessons.service";

interface LessonFormProps {
  lesson?: Lesson;
  subcategories: Subcategory[];
  mode: "create" | "edit";
}

export function LessonForm({
  lesson,
  subcategories,
  mode,
}: LessonFormProps) {
  const router = useRouter();

  const form = useForm<LessonFormSchema>({
    resolver: zodResolver(lessonFormSchema),
    defaultValues: {
      subcategory_id: lesson?.subcategory_id || "",
      title: lesson?.title || "",
      explanation_content: lesson?.explanation_content || "",
      cefr_level: lesson?.cefr_level || "A1",
      estimated_time: lesson?.estimated_time || null,
      is_published: lesson?.is_published ?? true,
    },
  });

  const onSubmit = async (data: LessonFormSchema) => {
    try {
      if (mode === "create") {
        await lessonsService.create(data);
      } else if (lesson) {
        await lessonsService.update({
          id: lesson.id,
          ...data,
        });
      }
      router.push("/dashboard/lessons");
      router.refresh();
    } catch (error) {
      console.error("Error saving lesson:", error);
    }
  };

  return (
    <Card className="mx-auto max-w-4xl">
      <CardHeader>
        <CardTitle>
          {mode === "create" ? "Create New Lesson" : "Edit Lesson"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Subcategory Selection */}
            <FormField
              control={form.control}
              name="subcategory_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcategory</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subcategory" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subcategories.map((subcategory) => (
                        <SelectItem key={subcategory.id} value={subcategory.id}>
                          {subcategory.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the subcategory this lesson belongs to
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Present Simple Basics"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The main title for this lesson
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Explanation Content */}
            <FormField
              control={form.control}
              name="explanation_content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Explanation Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide detailed explanation of the lesson content..."
                      className="min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The main content and explanation for this lesson
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CEFR Level */}
              <FormField
                control={form.control}
                name="cefr_level"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>CEFR Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CEFR_LEVELS.map((level) => (
                            <SelectItem
                              key={level.value}
                              value={level.value}
                              className="cursor-pointer"
                            >
                              <span >{level.label}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription className="space-y-1">
                        <FormLabel>Choose the appropriate difficulty level</FormLabel>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              {/* Estimated Time */}
              <FormField
                control={form.control}
                name="estimated_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Time (minutes)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="300"
                        placeholder="30"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value ? parseInt(value, 10) : null);
                        }}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription>
                      Expected completion time in minutes (optional)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Published Status */}
            <FormField
              control={form.control}
              name="is_published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Published</FormLabel>
                    <FormDescription>
                      Make this lesson visible to students
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? "Saving..."
                  : mode === "create"
                  ? "Create Lesson"
                  : "Update Lesson"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}