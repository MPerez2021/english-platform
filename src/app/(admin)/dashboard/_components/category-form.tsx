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
import { categoriesService } from "@/lib/services/categories.service";
import { Category } from "@/lib/types/category.types";
import { TopicOption } from "@/lib/types/topic.types";
import { categoryFormSchema, CategoryFormSchema } from "@/lib/validations/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormActionButtons } from "./form-action-buttons";

interface CategoryFormProps {
  category?: Category;
  topics: TopicOption[];
  mode: "create" | "edit";
}

export function CategoryForm({ category, topics, mode }: CategoryFormProps) {
  const router = useRouter();

  const form = useForm<CategoryFormSchema>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      topic_id: category?.topic_id || "",
      name: category?.name || "",
      description: category?.description || "",
      display_order: category?.display_order || 1,
      is_active: category?.is_active ?? true,
    },
  });

  const onSubmit = async (data: CategoryFormSchema) => {
    try {
      if (mode === "create") {
        await categoriesService.create(data);
        toast.success("Category created successfully", {
          description: data.name,
        });
      } else if (category) {
        await categoriesService.update({
          id: category.id,
          ...data,
        });
        toast.success("Category updated successfully", {
          description: data.name,
        });
      }
      router.push("/dashboard/categories");
      router.refresh();
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error("Failed to save category", {
        description: error instanceof Error ? error.message : "An unexpected error occurred",
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
          <FormField
            control={form.control}
            name="topic_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value ? field.value.toString() : ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {topics.map((topic) => (
                      <SelectItem key={topic.id} value={topic.id.toString()}>
                        {topic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  The topic this category belongs to
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category name" {...field} />
                </FormControl>
                <FormDescription>
                  The display name for this category (e.g., &ldquo;Tenses&rdquo;, &ldquo;Daily Life&rdquo;)
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
                    placeholder="Enter category description"
                    className="min-h-20"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A detailed description of what this category covers
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
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                  />
                </FormControl>
                <FormDescription>
                  The order in which this category appears within its topic (lower numbers appear first)
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
                    Whether this category is visible to users
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
            entityName="Category"
            isSubmitting={form.formState.isSubmitting}
            onCancel={handleCancel}
          />
        </form>
      </Form>
    </div>
  );
}