import type { Database, Json } from '@/lib/supabase/database.types'

// Database types from Supabase
export type ExerciseTypeRow = Database['public']['Tables']['exercise_types']['Row']
export type ExerciseRow = Database['public']['Tables']['exercises']['Row']

// Exercise Type Interfaces
export interface ExerciseType {
  id: string
  code: string
  name: string
  description: string | null
  json_schema: Json
  is_active: boolean | null
  created_at: Date
  updated_at: Date
}

export interface CreateExerciseTypeInput {
  code: string
  name: string
  description?: string | null
  json_schema: Json
  is_active?: boolean | null
}

export interface UpdateExerciseTypeInput {
  id: string
  code: string
  name: string
  description?: string | null
  json_schema: Json
  is_active?: boolean | null
}

// Exercise Content Schema Types
export interface FillBlankChoiceContent {
  question: string
  answer: string[]
  options: string[]
  answer_explanation: string
}

export interface FillBlankFreeContent {
  question: string
  answer: string[]
  options: null
  answer_explanation: string
}

export interface ReadingComprehensionContent {
  question: string
  answer: string[]
  options: string[]
  answer_explanation: string
}

// Union type for all exercise content types
export type ExerciseContent =
  | FillBlankChoiceContent
  | FillBlankFreeContent
  | ReadingComprehensionContent

// Exercise Interfaces
export interface Exercise {
  id: string
  lesson_id: string
  exercise_types_id: string
  content: ExerciseContent
  instructions: string
  display_order: number | null
  created_at: Date
  updated_at: Date
}

// Extended Exercise interface with exercise type information
export interface ExerciseWithType extends Exercise {
  exercise_type: ExerciseType
}

export interface CreateExerciseInput {
  lesson_id: string
  exercise_types_id: string
  content: ExerciseContent
  instructions: string
  display_order?: number | null
}

export interface UpdateExerciseInput {
  id: string
  lesson_id: string
  exercise_types_id: string
  content: ExerciseContent
  instructions: string
  display_order?: number | null
}

// Form data types for admin interface
export interface ExerciseFormData {
  lesson_id: string
  exercise_types_id: string
  content: ExerciseContent
  instructions: string
  display_order?: number | null
}

export interface ExerciseTypeFormData {
  code: string
  name: string
  description?: string | null
  json_schema: Json
  is_active?: boolean | null
}

// Exercise type constants based on the JSON schemas
export const EXERCISE_TYPE_CODES = {
  FILL_BLANK_CHOICE: 'fill_blank_choice',
  FILL_BLANK_FREE: 'fill_blank_free',
  READING_COMPREHENSION: 'reading_comprehension',
} as const

export type ExerciseTypeCode = typeof EXERCISE_TYPE_CODES[keyof typeof EXERCISE_TYPE_CODES]

// Helper type guards
export function isFillBlankChoiceContent(content: ExerciseContent): content is FillBlankChoiceContent {
  return Array.isArray((content as FillBlankChoiceContent).options) &&
         (content as FillBlankChoiceContent).options !== null
}

export function isFillBlankFreeContent(content: ExerciseContent): content is FillBlankFreeContent {
  return (content as FillBlankFreeContent).options === null
}

export function isReadingComprehensionContent(content: ExerciseContent): content is ReadingComprehensionContent {
  return Array.isArray((content as ReadingComprehensionContent).options) &&
         (content as ReadingComprehensionContent).options !== null &&
         (content as ReadingComprehensionContent).options.length > 0
}