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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { topicsService } from "@/lib/services/topics.service";
import { Topic } from "@/lib/types/topic.types";
import { topicFormSchema, TopicFormSchema } from "@/lib/validations/topic.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormActionButtons } from "./form-action-buttons";

interface TopicFormProps {
  topic?: Topic;
  mode: "create" | "edit";
}

export function TopicForm({ topic, mode }: TopicFormProps) {
  const router = useRouter();

  const form = useForm<TopicFormSchema>({
    resolver: zodResolver(topicFormSchema),
    defaultValues: {
      name: topic?.name || "",
      description: topic?.description || "",
      is_active: topic?.is_active ?? true,
    },
  });

  const onSubmit = async (data: TopicFormSchema) => {
    try {
      if (mode === "create") {
        await topicsService.create(data);
        toast.success("Topic created successfully", {
          description: data.name,
        });
      } else if (topic) {
        await topicsService.update({
          id: topic.id,
          ...data,
        });
        toast.success("Topic updated successfully", {
          description: data.name,
        });
      }
      router.push("/dashboard/topics");
      router.refresh();
    } catch (error) {
      console.error("Error saving topic:", error);

      const isDuplicateError = error instanceof Error &&
        (error.message.includes("duplicate key value violates unique constraint") ||
         error.message.includes("unique constraint"));

      toast.error("Failed to save topic", {
        description: isDuplicateError
          ? "A topic with this name already exists. Please use a different name."
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
    <div className="max-w-2xl mx-auto space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter topic name" {...field} />
                </FormControl>
                <FormDescription>
                  The display name for this topic (e.g., &ldquo;Grammar&rdquo;, &ldquo;Vocabulary&rdquo;)
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
                    placeholder="Enter topic description"
                    className="min-h-20"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A detailed description of what this topic covers
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
                    Whether this topic is visible to users
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
            entityName="Topic"
            isSubmitting={form.formState.isSubmitting}
            onCancel={handleCancel}
          />
        </form>
      </Form>
    </div>
  );
}