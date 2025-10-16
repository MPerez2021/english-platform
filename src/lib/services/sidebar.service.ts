import { createClient } from "@/lib/supabase/client";
import { SidebarData } from "../types/sidebar.type";

const supabase = createClient();

export const sidebarService = {
  /** Get sidebar content */
  getSidebarTopicData: async (topicName: string): Promise<SidebarData[]> => {
    const { data, error } = await supabase.rpc(
      "get_sidebar_topic_categories_with_subcategories",
      {
        topic_slug: topicName,
      }
    );
    if (error) {
      console.error('Error fetching sidebar topic data:', error)
      throw new Error(`Failed to fetch sidebar topic data: ${error.message}`)
    }

    const sidebarData: SidebarData[] = data!.map((data) => ({
      topicName: data.topic_name,
      categoryId: data.category_id,
      categoryName: data.category_name,
      categorySlug: data.category_slug,
      subcategories: (data.subcategories ?? []) as {
        name: string;
        slug: string;
      }[],
    }));

    return sidebarData;
  },
};
