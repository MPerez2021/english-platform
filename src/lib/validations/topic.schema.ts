import { z } from "zod";

export const topicFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .trim(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters")
    .trim(),
  overview: z
    .string()
    .min(10, "Overview must be at least 10 characters")
    .trim(),
  is_active: z.boolean(),
});

export const createTopicSchema = topicFormSchema;

export const updateTopicSchema = topicFormSchema.extend({
  id: z.number().positive(),
});

export type TopicFormSchema = z.infer<typeof topicFormSchema>;
export type CreateTopicSchema = z.infer<typeof createTopicSchema>;
export type UpdateTopicSchema = z.infer<typeof updateTopicSchema>;