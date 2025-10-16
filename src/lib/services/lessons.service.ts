import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";
import type {
  CreateLessonInput,
  Lesson,
  LessonFormData,
  LessonWithBreadcrumb,
  UpdateLessonInput,
} from "@/lib/types/lesson.types";
import { cache } from "react";
import { LessonWithSubcategoryAndCategory } from "./../types/lesson.types";

type LessonRow = Database["public"]["Tables"]["lessons"]["Row"];
type LessonInsert = Database["public"]["Tables"]["lessons"]["Insert"];
type LessonUpdate = Database["public"]["Tables"]["lessons"]["Update"];

const supabase = createClient();

// Helper function to convert database row to Lesson type
const mapRowToLesson = (row: LessonRow): Lesson => ({
  id: row.id,
  subcategory_id: row.subcategory_id,
  title: row.title,
  explanation_content: row.explanation_content,
  cefr_level: row.cefr_level,
  estimated_time: row.estimated_time,
  is_published: row.is_published,
  created_at: new Date(row.created_at),
  updated_at: new Date(row.updated_at),
});

export const lessonsService = {
  /**
   * Get all lessons ordered by created_at
   */
  getAll: async (): Promise<Lesson[]> => {
    const { data, error } = await supabase
      .from("lessons")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching lessons:", error);
      throw new Error(`Failed to fetch lessons: ${error.message}`);
    }

    return data.map(mapRowToLesson);
  },

  getAllWithSubcategoriesAndCategories: async (): Promise<
    LessonWithSubcategoryAndCategory[]
  > => {
    const { data, error } = await supabase
      .from("lessons")
      .select(
        "id,title, cefr_level, estimated_time, is_published,created_at, subcategories(name, slug, categories(name, topics(name)))"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error(
        "Error fetching lessons with subcategories and categories:",
        error
      );
      throw new Error(
        `Failed to fetch lessons with subcategories and categories: ${error.message}`
      );
    }

    const lessonWithSubcategoryAndCategory: LessonWithSubcategoryAndCategory[] =
      data.map((lesson) => ({
        id: lesson.id,
        topic: lesson.subcategories.categories.topics.name,
        subcategory: lesson.subcategories.name,
        subcategorySlug: lesson.subcategories.slug,
        category: lesson.subcategories.categories.name,
        title: lesson.title,
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
  getById: async (id: string): Promise<LessonFormData | null> => {
    const { data, error } = await supabase
      .from("lessons")
      .select("*, subcategories(id,name, categories(id,name, topics(id,name)))")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null; // Lesson not found
      }
      console.error("Error fetching lesson:", error);
      throw new Error(`Failed to fetch lesson: ${error.message}`);
    }

    const result: LessonFormData = {
      id: data.id,
      subcategory_id: data.subcategory_id,
      title: data.title,
      explanation_content: data.explanation_content,
      cefr_level: data.cefr_level,
      estimated_time: data.estimated_time,
      is_published: data.is_published,
      topicOption: {
        id: data.subcategories.categories.topics.id,
        name: data.subcategories.categories.topics.name
      },
      categoryOption: {
        id: data.subcategories.categories.id,
        name: data.subcategories.categories.name,
      },
      subcategoryOption:{
        id: data.subcategories.id,
        name: data.subcategories.name
      }
    }

    return result;
  },

  /**
   * Get a single lesson by slug
   */
  getBySlug: async (slug: string): Promise<Lesson | null> => {
    const { data, error } = await supabase
      .from("lessons")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null; // Lesson not found
      }
      console.error("Error fetching lesson by slug:", error);
      throw new Error(`Failed to fetch lesson by slug: ${error.message}`);
    }

    return mapRowToLesson(data);
  },

  /**
   * Get a single lesson by slug with breadcrumb data (topic, category, subcategory)
   */

  getBySlugWithBreadcrumb: cache(
    async (slug: string): Promise<LessonWithBreadcrumb | null> => {
      const { data, error } = await supabase
        .from("lessons")
        .select(
          "*, subcategories!inner(name, description, categories(name, slug, topics(id,name, slug)))"
        )
        .eq("is_published", true)
        .eq("subcategories.slug", slug)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          return null; // Lesson not found
        }
        console.error("Error fetching lesson by slug with breadcrumb:", error);
        throw new Error(
          `Failed to fetch lesson by slug with breadcrumb: ${error.message}`
        );
      }
      return {
        lesson: mapRowToLesson(data),
        description: data.subcategories.description,
        breadcrumb: {
          id: data.subcategories.categories.topics.id,
          topic: data.subcategories.categories.topics.name,
          topicSlug: data.subcategories.categories.topics.slug,
          category: data.subcategories.categories.name,
          categorySlug: data.subcategories.categories.slug,
          subcategory: data.subcategories.name,
        },
      };
    }
  ),

  /**
   * Create a new lesson
   */
  create: async (input: CreateLessonInput): Promise<void> => {
    const insertData: LessonInsert = {
      ...input
    };

    const { error } = await supabase.from("lessons").insert(insertData);

    if (error) {
      console.error("Error creating lesson:", error);
      throw new Error(`Failed to create lesson: ${error.message}`);
    }
  },

  /**
   * Update an existing lesson
   */
  update: async (input: UpdateLessonInput): Promise<void> => {
    const { id, ...updateData } = input;
    const updatePayload: LessonUpdate = {
      ...updateData
    };

    const { error } = await supabase
      .from("lessons")
      .update(updatePayload)
      .eq("id", id);

    if (error) {
      if (error.code === "PGRST116") {
        throw new Error("Lesson not found");
      }
      console.error("Error updating lesson:", error);
      throw new Error(`Failed to update lesson: ${error.message}`);
    }
  },

  /**
   * Toggle the published status of a lesson
   */
  togglePublished: async (id: string): Promise<Lesson | null> => {
    // First get the current lesson to toggle its status
    const currentLesson = await lessonsService.getById(id);
    if (!currentLesson) {
      return null;
    }

    const { data, error } = await supabase
      .from("lessons")
      .update({ is_published: !currentLesson.is_published })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error toggling lesson published status:", error);
      throw new Error(
        `Failed to toggle lesson published status: ${error.message}`
      );
    }

    return mapRowToLesson(data);
  },
};
