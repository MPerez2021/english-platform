import { createClient } from '@/lib/supabase/client'
import type {
  Exercise,
  CreateExerciseInput,
  UpdateExerciseInput,
  ExerciseRow,
  ExerciseContent,
  ExerciseType
} from '@/lib/types/exercise.types'
import type { Database, Json } from '@/lib/supabase/database.types'

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
   * Get exercises by exercise type
   */
  getByExerciseType: async (exerciseType: ExerciseType): Promise<Exercise[]> => {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('exercise_types', exerciseType)
      .order('display_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching exercises by exercise type:', error)
      throw new Error(`Failed to fetch exercises by exercise type: ${error.message}`)
    }

    return data.map(mapRowToExercise)
  },

  /**
   * Create a new exercise
   */
  create: async (input: CreateExerciseInput): Promise<Exercise> => {
    const insertData: ExerciseInsert = {
      ...input,
      content: input.content as unknown as Json,
    }

    const { data, error } = await supabase
      .from('exercises')
      .insert(insertData)
      .select()
      .single()

    if (error) {
      console.error('Error creating exercise:', error)
      throw new Error(`Failed to create exercise: ${error.message}`)
    }

    return mapRowToExercise(data)
  },

  /**
   * Update an existing exercise
   */
  update: async (input: UpdateExerciseInput): Promise<Exercise | null> => {
    const { id, ...updateData } = input
    const updatePayload: ExerciseUpdate = {
      ...updateData,
      content: updateData.content as unknown as Json,
    }

    const { data, error } = await supabase
      .from('exercises')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Exercise not found
      }
      console.error('Error updating exercise:', error)
      throw new Error(`Failed to update exercise: ${error.message}`)
    }

    return mapRowToExercise(data)
  },

  /**
   * Delete an exercise
   */
  delete: async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from('exercises')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting exercise:', error)
      throw new Error(`Failed to delete exercise: ${error.message}`)
    }

    return true
  },

  /**
   * Reorder exercises within a lesson
   */
  reorderInLesson: async (
    lessonId: string,
    exerciseIds: string[]
  ): Promise<Exercise[]> => {
    // Update display_order for each exercise
    const updatePromises = exerciseIds.map((exerciseId, index) =>
      supabase
        .from('exercises')
        .update({ display_order: index + 1 })
        .eq('id', exerciseId)
        .eq('lesson_id', lessonId) // Ensure we only update exercises in this lesson
    )

    const results = await Promise.all(updatePromises)

    // Check for errors
    results.forEach((result, index) => {
      if (result.error) {
        console.error(`Error reordering exercise ${exerciseIds[index]}:`, result.error)
        throw new Error(`Failed to reorder exercise ${exerciseIds[index]}: ${result.error.message}`)
      }
    })

    // Return the updated exercises
    return await exercisesService.getByLessonId(lessonId)
  },

  /**
   * Duplicate an exercise within the same lesson or to a different lesson
   */
  duplicate: async (
    exerciseId: string,
    targetLessonId?: string
  ): Promise<Exercise> => {
    const originalExercise = await exercisesService.getById(exerciseId)
    if (!originalExercise) {
      throw new Error(`Exercise ${exerciseId} not found`)
    }

    // Get the next display order for the target lesson
    const targetLesson = targetLessonId || originalExercise.lesson_id
    const existingExercises = await exercisesService.getByLessonId(targetLesson)
    const maxOrder = Math.max(0, ...existingExercises.map(ex => ex.display_order || 0))

    const duplicateData: CreateExerciseInput = {
      lesson_id: targetLesson,
      exercise_types: originalExercise.exercise_types,
      content: originalExercise.content,
      instructions: `${originalExercise.instructions} (Copy)`,
      display_order: maxOrder + 1,
    }

    return await exercisesService.create(duplicateData)
  },

  /**
   * Get exercises with pagination and filtering
   */
  getPaginated: async (
    limit: number = 10,
    offset: number = 0,
    filters?: {
      lesson_id?: string
      exercise_types?: ExerciseType
    }
  ): Promise<{ exercises: Exercise[]; total: number }> => {
    let query = supabase
      .from('exercises')
      .select('*', { count: 'exact' })

    // Apply filters
    if (filters?.lesson_id) {
      query = query.eq('lesson_id', filters.lesson_id)
    }
    if (filters?.exercise_types) {
      query = query.eq('exercise_types', filters.exercise_types)
    }

    const { data, error, count } = await query
      .order('display_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Error fetching paginated exercises:', error)
      throw new Error(`Failed to fetch paginated exercises: ${error.message}`)
    }

    return {
      exercises: data.map(mapRowToExercise),
      total: count || 0,
    }
  },

  /**
   * Count exercises by lesson
   */
  countByLessonId: async (lessonId: string): Promise<number> => {
    const { count, error } = await supabase
      .from('exercises')
      .select('*', { count: 'exact', head: true })
      .eq('lesson_id', lessonId)

    if (error) {
      console.error('Error counting exercises by lesson:', error)
      throw new Error(`Failed to count exercises by lesson: ${error.message}`)
    }

    return count || 0
  },

  /**
   * Count exercises by exercise type
   */
  countByExerciseType: async (exerciseType: ExerciseType): Promise<number> => {
    const { count, error } = await supabase
      .from('exercises')
      .select('*', { count: 'exact', head: true })
      .eq('exercise_types', exerciseType)

    if (error) {
      console.error('Error counting exercises by exercise type:', error)
      throw new Error(`Failed to count exercises by exercise type: ${error.message}`)
    }

    return count || 0
  },
}