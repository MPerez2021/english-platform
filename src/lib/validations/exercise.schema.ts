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

// Fill Blank Choice Content Schema
export const fillBlankChoiceContentSchema = baseContentSchema.extend({
  options: z
    .array(z.string().min(1, "Option cannot be empty"))
    .min(2, "At least 2 options are required")
    .max(6, "Maximum 6 options allowed"),
})

// Fill Blank Free Content Schema
export const fillBlankFreeContentSchema = baseContentSchema.extend({
  options: z.literal(null),
})

// Reading Comprehension Content Schema
export const readingComprehensionContentSchema = baseContentSchema.extend({
  options: z
    .array(z.string().min(1, "Option cannot be empty"))
    .min(2, "At least 2 options are required")
    .max(6, "Maximum 6 options allowed"),
})

// Union schema for all exercise content types
export const exerciseContentSchema = z.union([
  fillBlankChoiceContentSchema,
  fillBlankFreeContentSchema,
  readingComprehensionContentSchema,
])

// Exercise Type Schemas
export const exerciseTypeFormSchema = z.object({
  code: z
    .string()
    .min(3, "Code must be at least 3 characters")
    .max(50, "Code must be less than 50 characters")
    .regex(/^[a-z0-9_]+$/, "Code must contain only lowercase letters, numbers, and underscores")
    .trim(),
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .trim()
    .optional()
    .nullable(),
  json_schema: z.any(),
  is_active: z.boolean().default(true),
})

export const createExerciseTypeSchema = exerciseTypeFormSchema
export const updateExerciseTypeSchema = exerciseTypeFormSchema.extend({
  id: z.string(),
})

// Exercise Schemas
export const exerciseFormSchema = z.object({
  lesson_id: z
    .string()
    .min(1, "Please select a lesson"),
  exercise_types_id: z
    .string()
    .min(1, "Please select an exercise type"),
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
  exerciseTypeCode: string
) => {
  switch (exerciseTypeCode) {
    case EXERCISE_TYPE_CODES.FILL_BLANK_CHOICE:
      return fillBlankChoiceContentSchema.parse(content)
    case EXERCISE_TYPE_CODES.FILL_BLANK_FREE:
      return fillBlankFreeContentSchema.parse(content)
    case EXERCISE_TYPE_CODES.READING_COMPREHENSION:
      return readingComprehensionContentSchema.parse(content)
    default:
      throw new Error(`Unknown exercise type code: ${exerciseTypeCode}`)
  }
}

// JSON Schema definitions for database storage
export const EXERCISE_TYPE_JSON_SCHEMAS = {
  [EXERCISE_TYPE_CODES.FILL_BLANK_CHOICE]: {
    type: "object",
    required: ["question", "answer", "options", "answer_explanation"],
    properties: {
      question: {
        type: "string",
        minLength: 5,
        maxLength: 1000
      },
      answer: {
        type: "array",
        items: { type: "string", minLength: 1 },
        minItems: 1,
        maxItems: 10
      },
      options: {
        type: "array",
        items: { type: "string", minLength: 1 },
        minItems: 2,
        maxItems: 6
      },
      answer_explanation: {
        type: "string",
        minLength: 10,
        maxLength: 500
      }
    },
    additionalProperties: false
  },
  [EXERCISE_TYPE_CODES.FILL_BLANK_FREE]: {
    type: "object",
    required: ["question", "answer", "options", "answer_explanation"],
    properties: {
      question: {
        type: "string",
        minLength: 5,
        maxLength: 1000
      },
      answer: {
        type: "array",
        items: { type: "string", minLength: 1 },
        minItems: 1,
        maxItems: 10
      },
      options: {
        type: "null"
      },
      answer_explanation: {
        type: "string",
        minLength: 10,
        maxLength: 500
      }
    },
    additionalProperties: false
  },
  [EXERCISE_TYPE_CODES.READING_COMPREHENSION]: {
    type: "object",
    required: ["question", "answer", "options", "answer_explanation"],
    properties: {
      question: {
        type: "string",
        minLength: 5,
        maxLength: 1000
      },
      answer: {
        type: "array",
        items: { type: "string", minLength: 1 },
        minItems: 1,
        maxItems: 10
      },
      options: {
        type: "array",
        items: { type: "string", minLength: 1 },
        minItems: 2,
        maxItems: 6
      },
      answer_explanation: {
        type: "string",
        minLength: 10,
        maxLength: 500
      }
    },
    additionalProperties: false
  }
} as const

// Type inference
export type ExerciseTypeFormSchema = z.infer<typeof exerciseTypeFormSchema>
export type CreateExerciseTypeSchema = z.infer<typeof createExerciseTypeSchema>
export type UpdateExerciseTypeSchema = z.infer<typeof updateExerciseTypeSchema>

export type ExerciseFormSchema = z.infer<typeof exerciseFormSchema>
export type CreateExerciseSchema = z.infer<typeof createExerciseSchema>
export type UpdateExerciseSchema = z.infer<typeof updateExerciseSchema>

export type FillBlankChoiceContentSchema = z.infer<typeof fillBlankChoiceContentSchema>
export type FillBlankFreeContentSchema = z.infer<typeof fillBlankFreeContentSchema>
export type ReadingComprehensionContentSchema = z.infer<typeof readingComprehensionContentSchema>
export type ExerciseContentSchema = z.infer<typeof exerciseContentSchema>