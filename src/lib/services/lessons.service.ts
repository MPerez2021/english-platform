import { createClient } from '@/lib/supabase/client'
import { generateSlug } from '@/lib/utils'
import type { Lesson, CreateLessonInput, UpdateLessonInput, CefrLevel } from '@/lib/types/lesson.types'
import type { Database } from '@/lib/supabase/database.types'

type LessonRow = Database['public']['Tables']['lessons']['Row']
type LessonInsert = Database['public']['Tables']['lessons']['Insert']
type LessonUpdate = Database['public']['Tables']['lessons']['Update']

const supabase = createClient()

// Helper function to convert database row to Lesson type
const mapRowToLesson = (row: LessonRow): Lesson => ({
  id: row.id,
  subcategory_id: row.subcategory_id,
  title: row.title,
  explanation_content: row.explanation_content,
  slug: row.slug,
  cefr_level: row.cefr_level,
  estimated_time: row.estimated_time,
  is_published: row.is_published,
  created_at: new Date(row.created_at),
  updated_at: new Date(row.updated_at),
})

export const lessonsService = {
  /**
   * Get all lessons ordered by created_at
   */
  getAll: async (): Promise<Lesson[]> => {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching lessons:', error)
      throw new Error(`Failed to fetch lessons: ${error.message}`)
    }

    return data.map(mapRowToLesson)
  },

  /**
   * Get a single lesson by ID
   */
  getById: async (id: string): Promise<Lesson | null> => {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Lesson not found
      }
      console.error('Error fetching lesson:', error)
      throw new Error(`Failed to fetch lesson: ${error.message}`)
    }

    return mapRowToLesson(data)
  },

  /**
   * Get a single lesson by slug
   */
  getBySlug: async (slug: string): Promise<Lesson | null> => {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Lesson not found
      }
      console.error('Error fetching lesson by slug:', error)
      throw new Error(`Failed to fetch lesson by slug: ${error.message}`)
    }

    return mapRowToLesson(data)
  },

  /**
   * Get lessons by subcategory ID
   */
  getBySubcategoryId: async (subcategoryId: string): Promise<Lesson[]> => {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('subcategory_id', subcategoryId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching lessons by subcategory:', error)
      throw new Error(`Failed to fetch lessons by subcategory: ${error.message}`)
    }

    return data.map(mapRowToLesson)
  },

  /**
   * Get published lessons by subcategory ID
   */
  getPublishedBySubcategoryId: async (subcategoryId: string): Promise<Lesson[]> => {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('subcategory_id', subcategoryId)
      .eq('is_published', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching published lessons by subcategory:', error)
      throw new Error(`Failed to fetch published lessons by subcategory: ${error.message}`)
    }

    return data.map(mapRowToLesson)
  },

  /**
   * Create a new lesson
   */
  create: async (input: CreateLessonInput): Promise<Lesson> => {
    const insertData: LessonInsert = {
      ...input,
      slug: generateSlug(input.title),
    }

    const { data, error } = await supabase
      .from('lessons')
      .insert(insertData)
      .select()
      .single()

    if (error) {
      console.error('Error creating lesson:', error)
      throw new Error(`Failed to create lesson: ${error.message}`)
    }

    return mapRowToLesson(data)
  },

  /**
   * Update an existing lesson
   */
  update: async (input: UpdateLessonInput): Promise<Lesson | null> => {
    const { id, ...updateData } = input
    const updatePayload: LessonUpdate = {
      ...updateData,
      ...(updateData.title && { slug: generateSlug(updateData.title) }),
    }

    const { data, error } = await supabase
      .from('lessons')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Lesson not found
      }
      console.error('Error updating lesson:', error)
      throw new Error(`Failed to update lesson: ${error.message}`)
    }

    return mapRowToLesson(data)
  },

  /**
   * Delete a lesson
   */
  delete: async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from('lessons')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting lesson:', error)
      throw new Error(`Failed to delete lesson: ${error.message}`)
    }

    return true
  },

  /**
   * Toggle the published status of a lesson
   */
  togglePublished: async (id: string): Promise<Lesson | null> => {
    // First get the current lesson to toggle its status
    const currentLesson = await lessonsService.getById(id)
    if (!currentLesson) {
      return null
    }

    const { data, error } = await supabase
      .from('lessons')
      .update({ is_published: !currentLesson.is_published })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error toggling lesson published status:', error)
      throw new Error(`Failed to toggle lesson published status: ${error.message}`)
    }

    return mapRowToLesson(data)
  },

  /**
   * Get lessons with pagination and filtering
   */
  getPaginated: async (
    limit: number = 10,
    offset: number = 0,
    filters?: {
      subcategory_id?: string
      cefr_level?: CefrLevel
      is_published?: boolean
    }
  ): Promise<{ lessons: Lesson[]; total: number }> => {
    let query = supabase
      .from('lessons')
      .select('*', { count: 'exact' })

    // Apply filters
    if (filters?.subcategory_id) {
      query = query.eq('subcategory_id', filters.subcategory_id)
    }
    if (filters?.cefr_level) {
      query = query.eq('cefr_level', filters.cefr_level)
    }
    if (filters?.is_published !== undefined) {
      query = query.eq('is_published', filters.is_published)
    }

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Error fetching paginated lessons:', error)
      throw new Error(`Failed to fetch paginated lessons: ${error.message}`)
    }

    return {
      lessons: data.map(mapRowToLesson),
      total: count || 0,
    }
  },
}