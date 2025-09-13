export interface Category {
  id: number;
  topic_id: number;
  name: string;
  slug: string;
  description: string;
  display_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateCategoryInput {
  topic_id: number;
  name: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

export interface UpdateCategoryInput {
  id: number;
  topic_id: number;
  name: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

export interface CategoryFormData {
  topic_id: number;
  name: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

export interface Subcategory {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string;
  display_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateSubcategoryInput {
  category_id: number;
  name: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

export interface UpdateSubcategoryInput {
  id: number;
  category_id: number;
  name: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

export interface SubcategoryFormData {
  category_id: number;
  name: string;
  description: string;
  display_order: number;
  is_active: boolean;
}