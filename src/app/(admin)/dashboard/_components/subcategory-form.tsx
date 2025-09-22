"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
  subcategoryFormSchema,
  SubcategoryFormSchema,
} from "@/lib/validations/category.schema";
import { Subcategory, Category } from "@/lib/types/category.types";
import { subcategoriesService } from "@/lib/services/subcategories.service";

interface SubcategoryFormProps {
  subcategory?: Subcategory;
  categories: Category[];
  mode: "create" | "edit";
}

export function SubcategoryForm({
  subcategory,
  categories,
  mode,
}: SubcategoryFormProps) {
  const router = useRouter();

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
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/subcategories");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value ? field.value.toString() : ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  The category this subcategory belongs to
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

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              {mode === "create"
                ? "Create Subcategory"
                : "Update Subcategory"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
