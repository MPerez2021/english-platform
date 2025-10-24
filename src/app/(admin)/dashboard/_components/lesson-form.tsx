"use client";

import HtmlWrapper from "@/components/lessons/HtmlWrapper";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categoriesService } from "@/lib/services/categories.service";
import { lessonsService } from "@/lib/services/lessons.service";
import { subcategoriesService } from "@/lib/services/subcategories.service";
import { topicsService } from "@/lib/services/topics.service";
import { CategoryOption, SubcategoryOption } from "@/lib/types/category.types";
import { CEFR_LEVELS, LessonFormData } from "@/lib/types/lesson.types";
import { TopicOption } from "@/lib/types/topic.types";
import {
  lessonFormSchema,
  LessonFormSchema,
} from "@/lib/validations/lesson.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import DOMPurify from "isomorphic-dompurify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormSimpleEditor } from "../../_components/text-editor/form-simple-editor";
import { FormActionButtons } from "./form-action-buttons";
interface LessonFormProps {
  lesson?: LessonFormData;
  mode: "create" | "edit";
}

export function LessonForm({ lesson, mode }: LessonFormProps) {
  const router = useRouter();
  const [topics, setTopics] = useState<TopicOption[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedSubcategoryId, setSelectedSubcategoryId] =
    useState<string>("");
  const [filteredCategories, setFilteredCategories] = useState<
    CategoryOption[]
  >([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<
    SubcategoryOption[]
  >([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingSubcategories, setIsLoadingSubcategories] = useState(false);
  const [isUserEditing, setIsUserEditing] = useState(false);

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
  // Fetch topics once
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topicOptions = await topicsService.getTopicOptions();
        setTopics(topicOptions);
      } catch (error) {
        console.error("Error fetching topics:", error);
        toast.error("Failed to fetch topics");
      }
    };
    fetchTopics();
  }, []);

  // 2When topics are ready, set topicId
  useEffect(() => {
    if (!lesson || topics.length === 0) return;
    setSelectedTopicId(lesson.topicOption.id);
  }, [lesson, topics]);

  // When selectedTopicId changes, fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      if (!selectedTopicId) return;
      setIsLoadingCategories(true);
      try {
        const categoryOptions =
          await categoriesService.getCategoryOptionsByTopicId(selectedTopicId);
        setFilteredCategories(categoryOptions);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories");
      }
      setIsLoadingCategories(false);

    };
    fetchCategories();
  }, [selectedTopicId]);

  // When categories are ready, set categoryId
useEffect(() => {
  if (!lesson || isUserEditing) return;
  if (filteredCategories.length > 0)
    setSelectedCategoryId(lesson.categoryOption.id);
}, [lesson, filteredCategories, isUserEditing]);

  // When selectedCategoryId changes, fetch subcategories
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!selectedCategoryId) return;
      setIsLoadingSubcategories(true);
      try {
        const subcategoryOptions =
          await subcategoriesService.getAllOptionsByCategoryId(
            selectedCategoryId
          );
        setFilteredSubcategories(subcategoryOptions);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        toast.error("Failed to fetch subcategories");
      }
    setIsLoadingSubcategories(false);

    };
    fetchSubcategories();
  }, [selectedCategoryId]);

  // When subcategories are ready, set subcategoryId
  useEffect(() => {
    if (!lesson || isUserEditing) return;
    if (filteredSubcategories.length > 0)
      setSelectedSubcategoryId(lesson.subcategoryOption.id);
  }, [lesson, filteredSubcategories, isUserEditing]);

  // Handle topic change - clear category and subcategory selections
  const handleTopicChange = (value: string) => {
    setIsUserEditing(true);
    setSelectedTopicId(value);
    setSelectedCategoryId("");
    setSelectedSubcategoryId("");
    form.setValue("subcategory_id", "");
  };
  // Handle category change - clear subcategory selection
  const handleCategoryChange = (value: string) => {
    setIsUserEditing(true);
    setSelectedCategoryId(value);
    setSelectedSubcategoryId("");
    form.setValue("subcategory_id", "");
  };

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
      data.explanation_content = DOMPurify.sanitize(data.explanation_content);
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

      const isDuplicateError = error instanceof Error &&
        (error.message.includes("duplicate key value violates unique constraint") ||
         error.message.includes("unique constraint"));

      toast.error("Failed to save lesson", {
        description: isDuplicateError
          ? "A lesson with this title already exists. Please use a different title."
          : error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    }
  };
  const handleCancel = () => {
    router.back();
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

                {/* Cascading Select Inputs: Topic -> Category -> Subcategory */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
                  {/* Topic Selection */}
                  <FormItem>
                    <FormLabel>Topic * </FormLabel>
                    <Select
                      onValueChange={handleTopicChange}
                      value={selectedTopicId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a topic first" />
                      </SelectTrigger>
                      <SelectContent>
                        {topics.map((topic) => (
                          <SelectItem key={topic.id} value={topic.id}>
                            {topic.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select a topic to load its categories
                    </FormDescription>
                  </FormItem>

                  {/* Category Selection */}
                  <FormItem>
                    <FormLabel>Category </FormLabel>
                    <Select
                      onValueChange={handleCategoryChange}
                      value={selectedCategoryId}
                      disabled={!selectedTopicId || isLoadingCategories}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            !selectedTopicId
                              ? "Select a topic first"
                              : isLoadingCategories
                              ? "Loading categories..."
                              : "Select a category"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredCategories.length > 0 ? (
                          filteredCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="px-2 py-4 text-sm text-muted-foreground text-center">
                            No categories found for this topic
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select a category to load its subcategories
                    </FormDescription>
                  </FormItem>

                  {/* Subcategory Selection */}
                  <FormField
                    control={form.control}
                    name="subcategory_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subcategory *</FormLabel>
                        <Select
                          value={selectedSubcategoryId}
                          onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedSubcategoryId(value);
                          }}
                          disabled={!selectedCategoryId}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  !selectedCategoryId
                              ? "Select a category first"
                              : isLoadingSubcategories
                              ? "Loading subcategories..."
                              : "Select a subcategory"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {filteredSubcategories.length > 0 ? (
                              filteredSubcategories.map((subcategory) => (
                                <SelectItem
                                  key={subcategory.id}
                                  value={subcategory.id}
                                >
                                  {subcategory.name}
                                </SelectItem>
                              ))
                            ) : (
                              <div className="px-2 py-4 text-sm text-muted-foreground text-center">
                                No subcategories found for this category
                              </div>
                            )}
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <FormActionButtons
            mode={mode}
            entityName="Lesson"
            isSubmitting={form.formState.isSubmitting}
            onCancel={handleCancel}
          />
        </form>
      </Form>
    </div>
  );
}
