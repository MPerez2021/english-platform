import { LessonWithSubcategoryAndCategory } from './../types/lesson.types';
import { createClient } from '@/lib/supabase/client'
import { generateSlug } from '@/lib/utils'
import type { Lesson, CreateLessonInput, UpdateLessonInput } from '@/lib/types/lesson.types'
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

  getAllWithSubcategoriesAndCategories: async():Promise<LessonWithSubcategoryAndCategory[]> => {
    const {data,error} = await supabase
    .from('lessons')
    .select('id,title, slug, cefr_level, estimated_time, is_published,created_at, subcategories(name, categories(name, topics(name)))')
    .order('created_at',{ascending:false})

    if(error){
      console.error('Error fetching lessons with subcategories and categories:',error)
      throw new Error(`Failed to fetch lessons with subcategories and categories: ${error.message}`)
    }

    const lessonWithSubcategoryAndCategory: LessonWithSubcategoryAndCategory[] = data.map((lesson)=>({
      id: lesson.id,
      topic: lesson.subcategories.categories.topics.name,
      subcategory: lesson.subcategories.name,
      category: lesson.subcategories.categories.name,
      title: lesson.title,
      slug: lesson.slug,
      cefr_level: lesson.cefr_level,
      estimated_time: lesson.estimated_time,
      is_published: lesson.is_published,
      created_at: new Date(lesson.created_at),
    }));
    return lessonWithSubcategoryAndCategory;
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
   * Get a single lesson by slug with breadcrumb data (topic, category, subcategory)
   */
  getBySlugWithBreadcrumb: async (slug: string) => {
    const { data, error } = await supabase
      .from('lessons')
      .select('*, subcategories(name, categories(name, topics(name)))')
      .eq('slug', slug)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Lesson not found
      }
      console.error('Error fetching lesson by slug with breadcrumb:', error)
      throw new Error(`Failed to fetch lesson by slug with breadcrumb: ${error.message}`)
    }

    return {
      lesson: mapRowToLesson(data),
      breadcrumb: {
        topic: data.subcategories.categories.topics.name,
        category: data.subcategories.categories.name,
        subcategory: data.subcategories.name,
      }
    }
  },

  /**
   * Create a new lesson
   */
  create: async (input: CreateLessonInput): Promise<void> => {
    const insertData: LessonInsert = {
      ...input,
      slug: generateSlug(input.title),
    }

    const { error } = await supabase
      .from('lessons')
      .insert(insertData)

    if (error) {
      console.error('Error creating lesson:', error)
      throw new Error(`Failed to create lesson: ${error.message}`)
    }
  },

  /**
   * Update an existing lesson
   */
  update: async (input: UpdateLessonInput): Promise<void> => {
    const { id, ...updateData } = input
    const updatePayload: LessonUpdate = {
      ...updateData,
      ...(updateData.title && { slug: generateSlug(updateData.title) }),
    }

    const { error } = await supabase
      .from('lessons')
      .update(updatePayload)
      .eq('id', id)

    if (error) {
      if (error.code === 'PGRST116') {
        throw new Error('Lesson not found')
      }
      console.error('Error updating lesson:', error)
      throw new Error(`Failed to update lesson: ${error.message}`)
    }
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

}