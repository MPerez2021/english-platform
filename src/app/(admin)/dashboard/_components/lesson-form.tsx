"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  lessonFormSchema,
  LessonFormSchema,
} from "@/lib/validations/lesson.schema";
import { Lesson, CEFR_LEVELS } from "@/lib/types/lesson.types";
import { Subcategory } from "@/lib/types/category.types";
import { lessonsService } from "@/lib/services/lessons.service";
import { FormSimpleEditor } from "../../_components/text-editor/form-simple-editor";
import HtmlWrapper from "@/components/lessons/html-wrapper";

interface LessonFormProps {
  lesson?: Lesson;
  subcategories: Subcategory[];
  mode: "create" | "edit";
}

export function LessonForm({ lesson, subcategories, mode }: LessonFormProps) {
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

  // Monitor form errors for tab indicators
  const { errors } = form.formState;

  // Check if lesson details tab has errors
  const hasDetailsErrors = !!(
    errors.title ||
    errors.subcategory_id ||
    errors.cefr_level ||
    errors.estimated_time
  );

  // Check if content creation tab has errors
  const hasContentErrors = !!errors.explanation_content;

  const onSubmit = async (data: LessonFormSchema) => {
    try {
      if (mode === "create") {
        await lessonsService.create(data);
        toast.success("Lesson created successfully", {
          description: data.title,
        });
      } else if (lesson) {
        await lessonsService.update({
          id: lesson.id,
          ...data,
        });
        toast.success("Lesson updated successfully", {
          description: data.title,
        });
      }
      router.push("/dashboard/lessons");
      router.refresh();
    } catch (error) {
      console.error("Error saving lesson:", error);
      toast.error("Failed to save lesson", {
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="details" className="space-y-6">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="details" className="relative">
                Lesson Details
                {hasDetailsErrors && (
                  <span className="ml-2 h-2 w-2 rounded-full bg-destructive"></span>
                )}
              </TabsTrigger>
              <TabsTrigger value="content" className="relative">
                Content Creation
                {hasContentErrors && (
                  <span className="ml-2 h-2 w-2 rounded-full bg-destructive"></span>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Lesson Details</h2>
                <p className="text-muted-foreground">
                  Set up the basic information
                </p>
              </div>

              <div className="space-y-6">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title *</FormLabel>
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
                <div className="grid grid-cols-3 gap-4">
                  {/* Subcategory Selection */}
                  <div className="col-span-3 lg:col-span-1">
                    <FormField
                      control={form.control}
                      name="subcategory_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subcategory *</FormLabel>
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
                                <SelectItem
                                  key={subcategory.id}
                                  value={subcategory.id}
                                >
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
                  </div>
                  {/* CEFR Level */}
                  <div className="col-span-3 lg:col-span-1">
                    <FormField
                      control={form.control}
                      name="cefr_level"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>CEFR Level *</FormLabel>
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
                                    <span>{level.label}</span>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Choose the appropriate difficulty level
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  {/* Estimated Time */}
                  <div className="col-span-3 lg:col-span-1">
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
                              className="w-fit"
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(
                                  value ? parseInt(value, 10) : null
                                );
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
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Content Creation</h2>
                <p className="text-muted-foreground">
                  Write the lesson content - this preview matches the final
                  lesson width
                </p>
              </div>

              <div className="min-h-[600px]">
                <FormField
                  control={form.control}
                  name="explanation_content"
                  render={({ field }) => (
                    <FormItem className="h-full">
                      <FormControl>
                        <HtmlWrapper>
                          <FormSimpleEditor
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Write your lesson content here..."
                            className="min-h-[500px] border"
                          />
                        </HtmlWrapper>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pb-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit">
              {mode === "create" ? "Create Lesson" : "Update Lesson"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
