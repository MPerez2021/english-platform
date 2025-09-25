import type { Database } from '@/lib/supabase/database.types'

// Database types from Supabase
export type ExerciseRow = Database['public']['Tables']['exercises']['Row']
export type ExerciseType = Database['public']['Enums']['exercise_types']

export interface ExerciseContent {
  question: string
  answers: { value: string }[]
  options: { value: string }[] | null
  answer_explanation: string
}

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