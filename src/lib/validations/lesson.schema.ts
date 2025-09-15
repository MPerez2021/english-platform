import { z } from "zod";

export const lessonFormSchema = z.object({
  subcategory_id: z
    .string()
    .min(1, "Please select a subcategory"),
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(255, "Title must be less than 255 characters")
    .trim(),
  explanation_content: z
    .string()
    .min(50, "Explanation content must be at least 50 characters")
    .trim(),
  cefr_level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"], {
    required_error: "Please select a CEFR level",
  }),
  estimated_time: z
    .number()
    .min(1, "Estimated time must be at least 1 minute")
    .max(300, "Estimated time must be less than 300 minutes")
    .int("Estimated time must be a whole number")
    .optional()
    .nullable(),
  is_published: z.boolean(),
});

export const createLessonSchema = lessonFormSchema;

export const updateLessonSchema = lessonFormSchema.extend({
  id: z.string(),
});

export type LessonFormSchema = z.infer<typeof lessonFormSchema>;
export type CreateLessonSchema = z.infer<typeof createLessonSchema>;
export type UpdateLessonSchema = z.infer<typeof updateLessonSchema>;