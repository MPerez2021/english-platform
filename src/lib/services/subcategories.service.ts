import { createClient } from '@/lib/supabase/client'
import { generateSlug } from '@/lib/utils'
import type { Subcategory, CreateSubcategoryInput, UpdateSubcategoryInput } from '@/lib/types/category.types'
import type { Database } from '@/lib/supabase/database.types'

type SubcategoryRow = Database['public']['Tables']['subcategories']['Row']
type SubcategoryInsert = Database['public']['Tables']['subcategories']['Insert']
type SubcategoryUpdate = Database['public']['Tables']['subcategories']['Update']

const supabase = createClient()

// Helper function to convert database row to Subcategory type
const mapRowToSubcategory = (row: SubcategoryRow): Subcategory => ({
  id: row.id,
  category_id: row.category_id,
  name: row.name,
  slug: generateSlug(row.name),
  description: row.description,
  display_order: row.display_order,
  is_active: row.is_active,
  created_at: new Date(row.created_at),
  updated_at: new Date(row.updated_at),
})

export const subcategoriesService = {
  /**
   * Get all subcategories ordered by category_id and display_order
   */
  getAll: async (): Promise<Subcategory[]> => {
    const { data, error } = await supabase
      .from('subcategories')
      .select('*')
      .order('category_id', { ascending: true })
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching subcategories:', error)
      throw new Error(`Failed to fetch subcategories: ${error.message}`)
    }

    return data.map(mapRowToSubcategory)
  },

  /**
   * Get a single subcategory by ID
   */
  getById: async (id: string): Promise<Subcategory | null> => {
    const { data, error } = await supabase
      .from('subcategories')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Subcategory not found
      }
      console.error('Error fetching subcategory:', error)
      throw new Error(`Failed to fetch subcategory: ${error.message}`)
    }

    return mapRowToSubcategory(data)
  },

  /**
   * Create a new subcategory
   */
  create: async (input: CreateSubcategoryInput): Promise<void> => {
    const insertData: SubcategoryInsert = {
      ...input,
      slug: generateSlug(input.name),
    }

    const { error } = await supabase
      .from('subcategories')
      .insert(insertData)

    if (error) {
      console.error('Error creating subcategory:', error)
      throw new Error(`Failed to create subcategory: ${error.message}`)
    }
  },

  /**
   * Update an existing subcategory
   */
  update: async (input: UpdateSubcategoryInput): Promise<void> => {
    const { id, ...updateData } = input
    const updatePayload: SubcategoryUpdate = {
      ...updateData,
      ...(updateData.name && { slug: generateSlug(updateData.name) }),
    }

    const { error } = await supabase
      .from('subcategories')
      .update(updatePayload)
      .eq('id', id)

    if (error) {
      if (error.code === 'PGRST116') {
        throw new Error('Subcategory not found')
      }
      console.error('Error updating subcategory:', error)
      throw new Error(`Failed to update subcategory: ${error.message}`)
    }
  },

  /**
   * Toggle the active status of a subcategory
   */
  toggleActive: async (id: string): Promise<Subcategory | null> => {
    // First get the current subcategory to toggle its status
    const currentSubcategory = await subcategoriesService.getById(id)
    if (!currentSubcategory) {
      return null
    }

    const { data, error } = await supabase
      .from('subcategories')
      .update({ is_active: !currentSubcategory.is_active })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error toggling subcategory active status:', error)
      throw new Error(`Failed to toggle subcategory active status: ${error.message}`)
    }

    return mapRowToSubcategory(data)
  },
}