import { createClient } from '@/lib/supabase/client'
import type { Database, Json } from '@/lib/supabase/database.types'
import type {
  CreateExerciseInput,
  Exercise,
  ExerciseContent,
  ExerciseRow,
  UpdateExerciseInput
} from '@/lib/types/exercise.types'
import type { CreateMultipleExercisesSchema } from '@/lib/validations/exercise.schema'

type ExerciseInsert = Database['public']['Tables']['exercises']['Insert']
type ExerciseUpdate = Database['public']['Tables']['exercises']['Update']

const supabase = createClient()

// Helper function to convert database row to Exercise
const mapRowToExercise = (row: ExerciseRow): Exercise => ({
  id: row.id,
  lesson_id: row.lesson_id,
  exercise_types: row.exercise_types,
  content: row.content as unknown as ExerciseContent,
  instructions: row.instructions,
  display_order: row.display_order,
  created_at: new Date(row.created_at),
  updated_at: new Date(row.updated_at),
})

export const exercisesService = {
  /**
   * Get all exercises ordered by display_order and created_at
   */
  getAll: async (): Promise<Exercise[]> => {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .order('display_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching exercises:', error)
      throw new Error(`Failed to fetch exercises: ${error.message}`)
    }

    return data.map(mapRowToExercise)
  },

  /**
   * Get a single exercise by ID
   */
  getById: async (id: string): Promise<Exercise | null> => {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Exercise not found
      }
      console.error('Error fetching exercise:', error)
      throw new Error(`Failed to fetch exercise: ${error.message}`)
    }

    return mapRowToExercise(data)
  },


  /**
   * Get exercises by lesson ID
   */
  getByLessonId: async (lessonId: string): Promise<Exercise[]> => {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('lesson_id', lessonId)
      .order('display_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching exercises by lesson:', error)
      throw new Error(`Failed to fetch exercises by lesson: ${error.message}`)
    }

    return data.map(mapRowToExercise)
  },


  /**
   * Create a new exercise
   */
  create: async (input: CreateExerciseInput): Promise<void> => {
    const insertData: ExerciseInsert = {
      ...input,
      content: input.content as unknown as Json,
    }

    const { error } = await supabase
      .from('exercises')
      .insert(insertData)

    if (error) {
      console.error('Error creating exercise:', error)
      throw new Error(`Failed to create exercise: ${error.message}`)
    }
  },

  /**
   * Update an existing exercise
   */
  update: async (input: UpdateExerciseInput): Promise<void> => {
    const { id, ...updateData } = input
    const updatePayload: ExerciseUpdate = {
      ...updateData,
      content: updateData.content as unknown as Json,
    }

    const { error } = await supabase
      .from('exercises')
      .update(updatePayload)
      .eq('id', id)

    if (error) {
      if (error.code === 'PGRST116') {
        throw new Error('Exercise not found')
      }
      console.error('Error updating exercise:', error)
      throw new Error(`Failed to update exercise: ${error.message}`)
    }
  },

  /**
   * Create multiple exercises at once
   */
  createMultiple: async (input: CreateMultipleExercisesSchema): Promise<void> => {
    const { lesson_id, exercises } = input;

    // Get the current max display order for the lesson
    const existingExercises = await exercisesService.getByLessonId(lesson_id);
    const maxOrder = Math.max(0, ...existingExercises.map(ex => ex.display_order || 0));

    // Prepare insert data for each exercise
    const insertData: ExerciseInsert[] = exercises.map((exercise, index) => ({
      lesson_id,
      exercise_types: exercise.exercise_types,
      content: exercise.content as unknown as Json,
      instructions: exercise.instructions,
      display_order: maxOrder + index + 1,
    }));

    const { error } = await supabase
      .from('exercises')
      .insert(insertData);

    if (error) {
      console.error('Error creating multiple exercises:', error);
      throw new Error(`Failed to create multiple exercises: ${error.message}`);
    }
  },
}