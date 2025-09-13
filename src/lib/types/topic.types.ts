export interface Topic {
  id: number;
  name: string;
  slug: string;
  description: string;
  display_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTopicInput {
  name: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

export interface UpdateTopicInput {
  id: number;
  name: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

export interface TopicFormData {
  name: string;
  description: string;
  display_order: number;
  is_active: boolean;
}