import type { Database } from '@/lib/supabase/database.types'

// Database types from Supabase
export type ExerciseRow = Database['public']['Tables']['exercises']['Row']
export type ExerciseType = Database['public']['Enums']['exercise_types']

// Exercise Content Schema Types
export interface FillBlankContent {
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
  | FillBlankContent
  | FillBlankFreeContent
  | ReadingComprehensionContent

// Exercise Interfaces
export interface Exercise {
  id: string
  lesson_id: string
  exercise_types: ExerciseType
  content: ExerciseContent
  instructions: string
  display_order: number | null
  created_at: Date
  updated_at: Date
}

export interface CreateExerciseInput {
  lesson_id: string
  exercise_types: ExerciseType
  content: ExerciseContent
  instructions: string
  display_order?: number | null
}

export interface UpdateExerciseInput {
  id: string
  lesson_id: string
  exercise_types: ExerciseType
  content: ExerciseContent
  instructions: string
  display_order?: number | null
}

// Form data types for admin interface
export interface ExerciseFormData {
  lesson_id: string
  exercise_types: ExerciseType
  content: ExerciseContent
  instructions: string
  display_order?: number | null
}

// Exercise type constants matching the enum
export const EXERCISE_TYPE_CODES = {
  FILL_BLANK: 'FILL_BLANK',
  FILL_BLANK_FREE: 'FILL_BLANK_FREE',
  READING_COMPREHENSION: 'READING_COMPREHENSION',
} as const

// Exercise type display names
export const EXERCISE_TYPE_NAMES = {
  FILL_BLANK: 'Fill Blank - Multiple Choice',
  FILL_BLANK_FREE: 'Fill Blank - Free Text',
  READING_COMPREHENSION: 'Reading Comprehension',
} as const

// Helper type guards
export function isFillBlankContent(content: ExerciseContent): content is FillBlankContent {
  return Array.isArray((content as FillBlankContent).options) &&
         (content as FillBlankContent).options !== null
}

export function isFillBlankFreeContent(content: ExerciseContent): content is FillBlankFreeContent {
  return (content as FillBlankFreeContent).options === null
}

export function isReadingComprehensionContent(content: ExerciseContent): content is ReadingComprehensionContent {
  return Array.isArray((content as ReadingComprehensionContent).options) &&
         (content as ReadingComprehensionContent).options !== null &&
         (content as ReadingComprehensionContent).options.length > 0
}