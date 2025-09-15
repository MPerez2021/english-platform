export interface Category {
  id: string;
  topic_id: string;
  name: string;
  slug: string;
  description: string;
  display_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateCategoryInput {
  topic_id: string;
  name: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

export interface UpdateCategoryInput {
  id: string;
  topic_id: string;
  name: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

export interface CategoryFormData {
  topic_id: string;
  name: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

export interface Subcategory {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string;
  display_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateSubcategoryInput {
  category_id: string;
  name: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

export interface UpdateSubcategoryInput {
  id: string;
  category_id: string;
  name: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

export interface SubcategoryFormData {
  category_id: string;
  name: string;
  description: string;
  display_order: number;
  is_active: boolean;
}