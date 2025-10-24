import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";
import type {
  Category,
  CategoryOption,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@/lib/types/category.types";
import { generateSlug } from "@/lib/utils";
import { CategoryWithTopic } from "./../types/category.types";
import { cache } from "react";

type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];
type CategoryInsert = Database["public"]["Tables"]["categories"]["Insert"];
type CategoryUpdate = Database["public"]["Tables"]["categories"]["Update"];

const supabase = createClient();

// Helper function to convert database row to Category type
const mapRowToCategory = (row: CategoryRow): Category => ({
  id: row.id,
  topic_id: row.topic_id,
  name: row.name,
  slug: generateSlug(row.name),
  description: row.description,
  is_active: row.is_active,
  created_at: new Date(row.created_at),
  updated_at: new Date(row.updated_at),
});

export const categoriesService = {
  /**
   * Get all categories ordered by topic_id and name
   */
  getAll: async (): Promise<Category[]> => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("topic_id", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching categories:", error);
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }

    return data.map(mapRowToCategory);
  },

  getAllWithTopics: async (): Promise<CategoryWithTopic[]> => {
    const { data, error } = await supabase
      .from("categories")
      .select("*, topics(name)")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(
        `Failed to fetch categories with topics: ${error.message}`
      );
    }
    const categoriesWithTopics: CategoryWithTopic[] = data.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      topic: category.topics.name,
      is_active: category.is_active,
      created_at: new Date(category.created_at),
    }));
    return categoriesWithTopics;
  },
  /**
   * Get a single category by ID
   */
  getById: async (id: string): Promise<Category | null> => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null; // Category not found
      }
      console.error("Error fetching category:", error);
      throw new Error(`Failed to fetch category: ${error.message}`);
    }

    return mapRowToCategory(data);
  },

  /**
   * Create a new category
   */
  create: async (input: CreateCategoryInput): Promise<void> => {
    const insertData: CategoryInsert = {
      ...input,
      slug: generateSlug(input.name),
    };

    const { error } = await supabase.from("categories").insert(insertData);

    if (error) {
      console.error("Error creating category:", error);
      throw new Error(`Failed to create category: ${error.message}`);
    }
  },

  /**
   * Update an existing category
   */
  update: async (input: UpdateCategoryInput): Promise<void> => {
    const { id, ...updateData } = input;
    const updatePayload: CategoryUpdate = {
      ...updateData,
      ...(updateData.name && { slug: generateSlug(updateData.name) }),
    };

    const { error } = await supabase
      .from("categories")
      .update(updatePayload)
      .eq("id", id);

    if (error) {
      if (error.code === "PGRST116") {
        throw new Error("Category not found");
      }
      console.error("Error updating category:", error);
      throw new Error(`Failed to update category: ${error.message}`);
    }
  },

  /**
   * Toggle the active status of a category
   */
  toggleActive: async (id: string): Promise<Category | null> => {
    // First get the current category to toggle its status
    const currentCategory = await categoriesService.getById(id);
    if (!currentCategory) {
      return null;
    }

    const { data, error } = await supabase
      .from("categories")
      .update({ is_active: !currentCategory.is_active })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error toggling category active status:", error);
      throw new Error(
        `Failed to toggle category active status: ${error.message}`
      );
    }
    return mapRowToCategory(data);
  },

  getCategoryOptionsByTopicId: cache(async (id: string): Promise<CategoryOption[]> => {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name")
      .eq("topic_id", id)
      .eq("is_active", true);

    if (error) {
      console.error("Error fetching categories:", error);
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }
    return data as CategoryOption[];
  }),
};
