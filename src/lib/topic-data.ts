export const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

export type Level = (typeof LEVELS)[number];
export type TopicType = "vocabulary" | "grammar" | "reading" | "writing";

export interface SubCategory {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  subcategories: SubCategory[];
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  level: Level;
  estimatedTime: string;
  difficulty: "Easy" | "Medium" | "Hard";
  image?: string;
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  level: Level;
  slug: string;
  subcategoryTitle: string;
  categoryTitle:string;
  subcategorySlug: string;
  categorySlug: string;
}