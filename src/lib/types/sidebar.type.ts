export interface SidebarData {
  topicName: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  subcategories: {
    name: string;
    slug: string;
  }[];
}
