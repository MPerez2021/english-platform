import { z } from "zod";

// Base content schema that all exercise types share
const baseContentSchema = z.object({
  question: z
    .string()
    .min(5, "Question must be at least 5 characters")
    .max(1000, "Question must be less than 1000 characters")
    .trim(),
  answers: z.array(
    z.object({
      value: z.string().trim().min(3, "Answer must be at least 3 characters")
    })
  ),
  options:  z.array(
    z.object({
      value: z.string().trim().min(3, "Option must bet at least 3 characters"),
    })
  ),
  answer_explanation: z
    .string()
    .min(10, "Answer explanation must be at least 10 characters")
    .max(500, "Answer explanation must be less than 500 characters")
    .trim(),
});

// Exercise Schemas
export const exerciseFormSchema = z.object({
  lesson_id: z.string().min(1, "Please select a lesson"),
  exercise_types: z.enum(
    ["FILL_BLANK", "FILL_BLANK_FREE", "READING_COMPREHENSION"],
    {
      required_error: "Please select an exercise type",
    }
  ),
  content: baseContentSchema,
  instructions: z
    .string()
    .min(5, "Instructions must be at least 5 characters")
    .max(500, "Instructions must be less than 500 characters")
    .trim(),
  display_order: z
    .number()
    .min(1, "Display order must be at least 1")
    .max(1000, "Display order must be less than 1000")
    .int("Display order must be a whole number")
    .optional()
    .nullable(),
});

export const createExerciseSchema = exerciseFormSchema;
export const updateExerciseSchema = exerciseFormSchema.extend({
  id: z.string(),
});

// Type inference
export type ExerciseFormSchema = z.infer<typeof exerciseFormSchema>;
export type CreateExerciseSchema = z.infer<typeof createExerciseSchema>;
export type UpdateExerciseSchema = z.infer<typeof updateExerciseSchema>;