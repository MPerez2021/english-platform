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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { topicFormSchema, TopicFormSchema } from "@/lib/validations/topic.schema";
import { Topic } from "@/lib/types/topic.types";
import { topicsService } from "@/lib/data/mock-topics";

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
      display_order: topic?.display_order || 1,
      is_active: topic?.is_active ?? true,
    },
  });

  const onSubmit = (data: TopicFormSchema) => {
    try {
      if (mode === "create") {
        topicsService.create(data);
      } else if (topic) {
        topicsService.update({
          id: topic.id,
          ...data,
        });
      }
      router.push("/dashboard/topics");
    } catch (error) {
      console.error("Error saving topic:", error);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/topics");
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {mode === "create" ? "Create New Topic" : "Edit Topic"}
        </CardTitle>
      </CardHeader>
      <CardContent>
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
                    The order in which this topic appears in lists (lower numbers appear first)
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

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                {mode === "create" ? "Create Topic" : "Update Topic"}
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
      </CardContent>
    </Card>
  );
}