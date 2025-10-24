import { TopicOption } from "./topic.types";

export interface Category {
  id: string;
  topic_id: string;
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateCategoryInput {
  topic_id: string;
  name: string;
  description: string;
  is_active: boolean;
}

export interface UpdateCategoryInput {
  id: string;
  topic_id: string;
  name: string;
  description: string;
  is_active: boolean;
}

export interface CategoryFormData {
  topic_id: string;
  name: string;
  description: string;
  is_active: boolean;
}

export interface Subcategory {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  topicOption?: TopicOption
}

export interface CreateSubcategoryInput {
  category_id: string;
  name: string;
  description: string;
  is_active: boolean;
}

export interface UpdateSubcategoryInput {
  id: string;
  category_id: string;
  name: string;
  description: string;
  is_active: boolean;
}

export interface SubcategoryFormData {
  category_id: string;
  name: string;
  description: string;
  is_active: boolean;
}

export interface CategoryWithTopic {
  id: string;
  name: string;
  topic: string;
  slug: string;
  description: string;
  is_active: boolean;
  created_at: Date;
}

export interface SubcategoryWithCategory {
  id: string;
  category_id: string;
  name: string;
  category: string;
  slug: string;
  description: string;
  is_active: boolean;
}

export type CategoryOption = Pick<Category,'id' | 'name'>

export type SubcategoryOption = Pick<Subcategory, 'id' |'name'>