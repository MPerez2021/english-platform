import { z } from "zod"
import { EXERCISE_TYPE_CODES } from "@/lib/types/exercise.types"

// Base content schema that all exercise types share
const baseContentSchema = z.object({
  question: z
    .string()
    .min(5, "Question must be at least 5 characters")
    .max(1000, "Question must be less than 1000 characters")
    .trim(),
  answer: z
    .array(z.string().min(1, "Answer cannot be empty"))
    .min(1, "At least one answer is required")
    .max(10, "Maximum 10 answers allowed"),
  answer_explanation: z
    .string()
    .min(10, "Answer explanation must be at least 10 characters")
    .max(500, "Answer explanation must be less than 500 characters")
    .trim(),
})

// Fill Blank Content Schema (with options)
export const fillBlankContentSchema = baseContentSchema.extend({
  options: z
    .array(z.string().min(1, "Option cannot be empty"))
    .min(2, "At least 2 options are required")
    .max(6, "Maximum 6 options allowed"),
})

// Fill Blank Free Content Schema (no options)
export const fillBlankFreeContentSchema = baseContentSchema.extend({
  options: z.literal(null),
})

// Reading Comprehension Content Schema (with options)
export const readingComprehensionContentSchema = baseContentSchema.extend({
  options: z
    .array(z.string().min(1, "Option cannot be empty"))
    .min(2, "At least 2 options are required")
    .max(6, "Maximum 6 options allowed"),
})

// Union schema for all exercise content types
export const exerciseContentSchema = z.union([
  fillBlankContentSchema,
  fillBlankFreeContentSchema,
  readingComprehensionContentSchema,
])


// Exercise Schemas
export const exerciseFormSchema = z.object({
  lesson_id: z
    .string()
    .min(1, "Please select a lesson"),
  exercise_types: z.enum(['FILL_BLANK', 'FILL_BLANK_FREE', 'READING_COMPREHENSION'], {
    required_error: "Please select an exercise type",
  }),
  content: exerciseContentSchema,
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
})

export const createExerciseSchema = exerciseFormSchema
export const updateExerciseSchema = exerciseFormSchema.extend({
  id: z.string(),
})

// Validation schemas for specific exercise type content
export const validateExerciseContentByType = (
  content: unknown,
  exerciseType: string
) => {
  switch (exerciseType) {
    case EXERCISE_TYPE_CODES.FILL_BLANK:
      return fillBlankContentSchema.parse(content)
    case EXERCISE_TYPE_CODES.FILL_BLANK_FREE:
      return fillBlankFreeContentSchema.parse(content)
    case EXERCISE_TYPE_CODES.READING_COMPREHENSION:
      return readingComprehensionContentSchema.parse(content)
    default:
      throw new Error(`Unknown exercise type: ${exerciseType}`)
  }
}

// Type inference
export type ExerciseFormSchema = z.infer<typeof exerciseFormSchema>
export type CreateExerciseSchema = z.infer<typeof createExerciseSchema>
export type UpdateExerciseSchema = z.infer<typeof updateExerciseSchema>

export type FillBlankContentSchema = z.infer<typeof fillBlankContentSchema>
export type FillBlankFreeContentSchema = z.infer<typeof fillBlankFreeContentSchema>
export type ReadingComprehensionContentSchema = z.infer<typeof readingComprehensionContentSchema>
export type ExerciseContentSchema = z.infer<typeof exerciseContentSchema>