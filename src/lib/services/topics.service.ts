import { createClient } from "@/lib/supabase/client";
import { generateSlug } from "@/lib/utils";
import type {
  Topic,
  CreateTopicInput,
  UpdateTopicInput,
  TopicOption,
} from "@/lib/types/topic.types";
import type { Database } from "@/lib/supabase/database.types";
import { cache } from "react";

type TopicRow = Database["public"]["Tables"]["topics"]["Row"];
type TopicInsert = Database["public"]["Tables"]["topics"]["Insert"];
type TopicUpdate = Database["public"]["Tables"]["topics"]["Update"];

const supabase = createClient();

// Helper function to convert database row to Topic type
const mapRowToTopic = (row: TopicRow): Topic => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
  description: row.description,
  display_order: row.display_order,
  is_active: row.is_active,
  created_at: new Date(row.created_at),
  updated_at: new Date(row.updated_at),
});

export const topicsService = {
  /**
   * Get all topics ordered by display_order
   */
  getAll: async (): Promise<Topic[]> => {
    const { data, error } = await supabase
      .from("topics")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Error fetching topics:", error);
      throw new Error(`Failed to fetch topics: ${error.message}`);
    }

    return data.map(mapRowToTopic);
  },

  /**
   * Get a single topic by ID
   */
  getById: async (id: string): Promise<Topic | null> => {
    const { data, error } = await supabase
      .from("topics")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null; // Topic not found
      }
      console.error("Error fetching topic:", error);
      throw new Error(`Failed to fetch topic: ${error.message}`);
    }

    return mapRowToTopic(data);
  },

  /**
   * Create a new topic
   */
  create: async (input: CreateTopicInput): Promise<void> => {
    const insertData: TopicInsert = {
      ...input,
      slug: generateSlug(input.name),
    };
    console.log(input);
    const { error } = await supabase.from("topics").insert(insertData);

    if (error) {
      console.error("Error creating topic:", error);
      throw new Error(`Failed to create topic: ${error.message}`);
    }
  },

  /**
   * Update an existing topic
   */
  update: async (input: UpdateTopicInput): Promise<void> => {
    const { id, ...updateData } = input;
    const updatePayload: TopicUpdate = {
      ...updateData,
      ...(updateData.name && { slug: generateSlug(updateData.name) }),
    };

    const { error } = await supabase
      .from("topics")
      .update(updatePayload)
      .eq("id", id);

    if (error) {
      if (error.code === "PGRST116") {
        throw new Error("Topic not found");
      }
      console.error("Error updating topic:", error);
      throw new Error(`Failed to update topic: ${error.message}`);
    }
  },

  /**
   * Toggle the active status of a topic
   */
  toggleActive: async (id: string): Promise<Topic | null> => {
    // First get the current topic to toggle its status
    const currentTopic = await topicsService.getById(id);
    if (!currentTopic) {
      return null;
    }

    const { data, error } = await supabase
      .from("topics")
      .update({ is_active: !currentTopic.is_active })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error toggling topic active status:", error);
      throw new Error(`Failed to toggle topic active status: ${error.message}`);
    }

    return mapRowToTopic(data);
  },

  /**
   * Get all active topics with only id and name (lightweight query)
   * Useful for dropdowns, lists, and components that don't need full topic details
   */
  getTopicOptions: cache(async (): Promise<TopicOption[]> => {
    const { data, error } = await supabase
      .from("topics")
      .select("id, name")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Error fetching basic topics:", error);
      throw new Error(`Failed to fetch basic topics: ${error.message}`);
    }

    return data as TopicOption[];
  }),
};
