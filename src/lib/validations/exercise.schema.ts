import { z } from "zod";

// Base content schema that all exercise types share
const baseContentSchema = z.object({
  answers: z.array(
    z.object({
      value: z.string().trim().min(3, "Answer must be at least 3 characters"),
    })
  ),
  options: z
    .array(
      z.object({
        value: z
          .string()
          .trim()
          .min(3, "Option must bet at least 3 characters"),
      })
    )
    .optional(),
  answer_explanation: z
    .string()
    .min(10, "Answer explanation must be at least 10 characters")
    .max(500, "Answer explanation must be less than 500 characters")
    .trim(),
});

const fillBlankSchema = baseContentSchema.extend({
  question_parts: z
    .array(
      z.object({
        type: z.enum(["text", "blank"]),
        value: z.string().optional(),
        id: z.string(),
        hint: z.string().optional(),
      })
    )
    .min(1, "At least one question part is required"),
});

const multipleChoiceSchema = baseContentSchema.extend({
  question: z
    .string()
    .min(5, "Question must be at least 5 characters")
    .max(1000, "Question must be less than 1000 characters")
    .trim(),
  question_parts: z.array(z.any()).optional(),
});

const sharedExerciseMeta = {
  lesson_id: z.string().min(1, "Please select a lesson"),
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
};

// Exercise Schemas
export const exerciseFormSchema = z.discriminatedUnion("exercise_types", [
  z.object({
    ...sharedExerciseMeta,
    exercise_types: z.enum(["FILL_BLANK_FREE"], {
      required_error: "Please select an exercise type",
    }),
    content: fillBlankSchema,
  }),

  z.object({
   ...sharedExerciseMeta,
    exercise_types: z.enum(["FILL_BLANK", "READING_COMPREHENSION"], {
      required_error: "Please select an exercise type",
    }),
    content: multipleChoiceSchema,
  }),
]);

export const createExerciseSchema = exerciseFormSchema;
export const updateExerciseSchema = z.intersection(
  exerciseFormSchema,
  z.object({
    id: z.string(),
  })
);

// Multiple exercises form schema
export const multipleExerciseFormSchema = z.object({
  lesson_id: z.string().min(1, "Please select a lesson"),
  exercises: z
    .array(exerciseFormSchema)
    .min(1, "At least one exercise is required")
    .max(10, "Maximum 10 exercises allowed per batch"),
});

export const createMultipleExercisesSchema = multipleExerciseFormSchema;

// Type inference
export type ExerciseFormSchema = z.infer<typeof exerciseFormSchema>;
export type CreateExerciseSchema = z.infer<typeof createExerciseSchema>;
export type UpdateExerciseSchema = z.infer<typeof updateExerciseSchema>;
export type MultipleExerciseFormSchema = z.infer<
  typeof multipleExerciseFormSchema
>;
export type CreateMultipleExercisesSchema = z.infer<
  typeof createMultipleExercisesSchema
>;
