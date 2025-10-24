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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { topicsService } from "@/lib/services/topics.service";
import { Topic } from "@/lib/types/topic.types";
import { topicFormSchema, TopicFormSchema } from "@/lib/validations/topic.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import DOMPurify from "isomorphic-dompurify";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormSimpleEditor } from "../../_components/text-editor/form-simple-editor";
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
      overview: topic?.overview || "",
      is_active: topic?.is_active ?? true,
    },
  });

  // Monitor form errors for tab indicators
  const { errors } = form.formState;

  // Check if details tab has errors
  const hasDetailsErrors = !!(
    errors.name ||
    errors.description ||
    errors.is_active
  );

  // Check if overview tab has errors
  const hasOverviewErrors = !!errors.overview;

  const onSubmit = async (data: TopicFormSchema) => {
    try {
      data.overview = DOMPurify.sanitize(data.overview);
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
    <div className="mx-auto max-w-4xl space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="details" className="space-y-6">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="details" className="relative">
                Topic Details
                {hasDetailsErrors && (
                  <span className="ml-2 h-2 w-2 rounded-full bg-destructive"></span>
                )}
              </TabsTrigger>
              <TabsTrigger value="overview" className="relative">
                Overview Content
                {hasOverviewErrors && (
                  <span className="ml-2 h-2 w-2 rounded-full bg-destructive"></span>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Topic Details</h2>
                <p className="text-muted-foreground">
                  Set up the basic information
                </p>
              </div>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Grammar, Vocabulary" {...field} />
                      </FormControl>
                      <FormDescription>
                        The display name for this topic
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
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter a brief description of the topic"
                          className="min-h-20"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A short description of what this topic covers
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
              </div>
            </TabsContent>

            <TabsContent value="overview" className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Overview Content</h2>
                <p className="text-muted-foreground">
                  Write the topic overview - this will be displayed to users
                </p>
              </div>

              <div className="min-h-[600px]">
                <FormField
                  control={form.control}
                  name="overview"
                  render={({ field }) => (
                    <FormItem className="h-full">
                      <FormControl>
                        <HtmlWrapper>
                          <FormSimpleEditor
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Write your topic overview here..."
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
            entityName="Topic"
            isSubmitting={form.formState.isSubmitting}
            onCancel={handleCancel}
          />
        </form>
      </Form>
    </div>
  );
}