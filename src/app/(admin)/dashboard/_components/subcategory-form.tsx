"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { subcategoriesService } from "@/lib/services/subcategories.service";
import { Subcategory } from "@/lib/types/category.types";
import {
  subcategoryFormSchema,
  SubcategoryFormSchema,
} from "@/lib/validations/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormActionButtons } from "./form-action-buttons";
import { TopicOption } from "@/lib/types/topic.types";
import { useState, useEffect } from "react";
import { categoriesService } from "@/lib/services/categories.service";
import { CategoryOption } from "@/lib/types/category.types";

interface SubcategoryFormProps {
  subcategory?: Subcategory;
  topics: TopicOption[];
  mode: "create" | "edit";
}

export function SubcategoryForm({
  subcategory,
  topics,
  mode,
}: SubcategoryFormProps) {
  const router = useRouter();
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    subcategory?.topicOption?.id || ""
  );
  const [filteredCategories, setFilteredCategories] = useState<
    CategoryOption[]
  >([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  const form = useForm<SubcategoryFormSchema>({
    resolver: zodResolver(subcategoryFormSchema),
    defaultValues: {
      category_id: subcategory?.category_id || "",
      name: subcategory?.name || "",
      description: subcategory?.description || "",
      display_order: subcategory?.display_order || 1,
      is_active: subcategory?.is_active ?? true,
    },
  });

  // Fetch categories based on selected topic
  useEffect(() => {
    const fetchCategories = async () => {
      if (!selectedTopicId) {
        setFilteredCategories([]);
        return;
      }
      setIsLoadingCategories(true);
      try {
        const categoryOptions =
          await categoriesService.getCategoryOptionsByTopicId(selectedTopicId);
        setFilteredCategories(categoryOptions);
      } catch (error) {
        console.error("Error fetching categories options:", error);
        toast.error("Failed to fetch categories options");
        setFilteredCategories([]);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [selectedTopicId]);

  // Handle topic change - clear category selection when topic changes
  const handleTopicChange = (value: string) => {
    setSelectedTopicId(value);
    form.setValue("category_id", ""); // Clear category selection
  };

  const onSubmit = async (data: SubcategoryFormSchema) => {
    try {
      if (mode === "create") {
        await subcategoriesService.create(data);
        toast.success("Subcategory created successfully", {
          description: data.name,
        });
      } else if (subcategory) {
        await subcategoriesService.update({
          id: subcategory.id,
          ...data,
        });
        toast.success("Subcategory updated successfully", {
          description: data.name,
        });
      }
      router.push("/dashboard/subcategories");
      router.refresh();
    } catch (error) {
      console.error("Error saving subcategory:", error);
      toast.error("Failed to save subcategory", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Topic Filter (not part of form validation) */}
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <FormItem>
              <FormLabel>Topic</FormLabel>
              <Select onValueChange={handleTopicChange} value={selectedTopicId}>
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

            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value ? field.value.toString() : ""}
                    disabled={!selectedTopicId || isLoadingCategories}
                  >
                    <FormControl>
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
                    </FormControl>
                    <SelectContent>
                      {filteredCategories.length > 0 ? (
                        filteredCategories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
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
                    The category this subcategory belongs to
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter subcategory name" {...field} />
                </FormControl>
                <FormDescription>
                  The display name for this subcategory (e.g., &ldquo;Present
                  Simple&rdquo;, &ldquo;Food&rdquo;)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter subcategory description"
                    className="min-h-20"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A detailed description of what this subcategory covers
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="display_order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Order</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    placeholder="Enter display order"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 1)
                    }
                  />
                </FormControl>
                <FormDescription>
                  The order in which this subcategory appears within its
                  category (lower numbers appear first)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_active"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Active Status</FormLabel>
                  <FormDescription>
                    Whether this subcategory is visible to users
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

          <FormActionButtons
            mode={mode}
            entityName="Subcategory"
            isSubmitting={form.formState.isSubmitting}
            onCancel={handleCancel}
          />
        </form>
      </Form>
    </div>
  );
}
