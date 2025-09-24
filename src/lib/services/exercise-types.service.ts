import { createClient } from '@/lib/supabase/client'
import type {
  ExerciseType,
  CreateExerciseTypeInput,
  UpdateExerciseTypeInput,
  ExerciseTypeRow
} from '@/lib/types/exercise.types'
import type { Database } from '@/lib/supabase/database.types'

type ExerciseTypeInsert = Database['public']['Tables']['exercise_types']['Insert']
type ExerciseTypeUpdate = Database['public']['Tables']['exercise_types']['Update']

const supabase = createClient()

// Helper function to convert database row to ExerciseType
const mapRowToExerciseType = (row: ExerciseTypeRow): ExerciseType => ({
  id: row.id,
  code: row.code,
  name: row.name,
  description: row.description,
  json_schema: row.json_schema,
  is_active: row.is_active,
  created_at: new Date(row.created_at),
  updated_at: new Date(row.updated_at),
})

export const exerciseTypesService = {
  /**
   * Get all exercise types ordered by created_at
   */
  getAll: async (): Promise<ExerciseType[]> => {
    const { data, error } = await supabase
      .from('exercise_types')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching exercise types:', error)
      throw new Error(`Failed to fetch exercise types: ${error.message}`)
    }

    return data.map(mapRowToExerciseType)
  },

  /**
   * Get only active exercise types
   */
  getActive: async (): Promise<ExerciseType[]> => {
    const { data, error } = await supabase
      .from('exercise_types')
      .select('*')
      .eq('is_active', true)
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching active exercise types:', error)
      throw new Error(`Failed to fetch active exercise types: ${error.message}`)
    }

    return data.map(mapRowToExerciseType)
  },

  /**
   * Get a single exercise type by ID
   */
  getById: async (id: string): Promise<ExerciseType | null> => {
    const { data, error } = await supabase
      .from('exercise_types')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Exercise type not found
      }
      console.error('Error fetching exercise type:', error)
      throw new Error(`Failed to fetch exercise type: ${error.message}`)
    }

    return mapRowToExerciseType(data)
  },

  /**
   * Get a single exercise type by code
   */
  getByCode: async (code: string): Promise<ExerciseType | null> => {
    const { data, error } = await supabase
      .from('exercise_types')
      .select('*')
      .eq('code', code)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Exercise type not found
      }
      console.error('Error fetching exercise type by code:', error)
      throw new Error(`Failed to fetch exercise type by code: ${error.message}`)
    }

    return mapRowToExerciseType(data)
  },

  /**
   * Create a new exercise type
   */
  create: async (input: CreateExerciseTypeInput): Promise<ExerciseType> => {
    const insertData: ExerciseTypeInsert = {
      ...input,
    }

    const { data, error } = await supabase
      .from('exercise_types')
      .insert(insertData)
      .select()
      .single()

    if (error) {
      console.error('Error creating exercise type:', error)
      throw new Error(`Failed to create exercise type: ${error.message}`)
    }

    return mapRowToExerciseType(data)
  },

  /**
   * Update an existing exercise type
   */
  update: async (input: UpdateExerciseTypeInput): Promise<ExerciseType | null> => {
    const { id, ...updateData } = input
    const updatePayload: ExerciseTypeUpdate = {
      ...updateData,
    }

    const { data, error } = await supabase
      .from('exercise_types')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Exercise type not found
      }
      console.error('Error updating exercise type:', error)
      throw new Error(`Failed to update exercise type: ${error.message}`)
    }

    return mapRowToExerciseType(data)
  },

  /**
   * Delete an exercise type
   */
  delete: async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from('exercise_types')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting exercise type:', error)
      throw new Error(`Failed to delete exercise type: ${error.message}`)
    }

    return true
  },

  /**
   * Toggle the active status of an exercise type
   */
  toggleActive: async (id: string): Promise<ExerciseType | null> => {
    // First get the current exercise type to toggle its status
    const currentExerciseType = await exerciseTypesService.getById(id)
    if (!currentExerciseType) {
      return null
    }

    const { data, error } = await supabase
      .from('exercise_types')
      .update({ is_active: !currentExerciseType.is_active })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error toggling exercise type active status:', error)
      throw new Error(`Failed to toggle exercise type active status: ${error.message}`)
    }

    return mapRowToExerciseType(data)
  },

  /**
   * Check if an exercise type code already exists
   */
  existsByCode: async (code: string, excludeId?: string): Promise<boolean> => {
    let query = supabase
      .from('exercise_types')
      .select('id')
      .eq('code', code)

    if (excludeId) {
      query = query.neq('id', excludeId)
    }

    const { data, error } = await query.limit(1)

    if (error) {
      console.error('Error checking exercise type code existence:', error)
      throw new Error(`Failed to check exercise type code existence: ${error.message}`)
    }

    return data.length > 0
  },

  /**
   * Get exercise types with pagination and filtering
   */
  getPaginated: async (
    limit: number = 10,
    offset: number = 0,
    filters?: {
      is_active?: boolean
      search?: string
    }
  ): Promise<{ exerciseTypes: ExerciseType[]; total: number }> => {
    let query = supabase
      .from('exercise_types')
      .select('*', { count: 'exact' })

    // Apply filters
    if (filters?.is_active !== undefined) {
      query = query.eq('is_active', filters.is_active)
    }
    if (filters?.search) {
      query = query.or(
        `name.ilike.%${filters.search}%,code.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
      )
    }

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Error fetching paginated exercise types:', error)
      throw new Error(`Failed to fetch paginated exercise types: ${error.message}`)
    }

    return {
      exerciseTypes: data.map(mapRowToExerciseType),
      total: count || 0,
    }
  },
}