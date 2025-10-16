export interface Topic {
  id: string;
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
  id: string;
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

export type TopicOption = Pick<Topic, 'id' | 'name'>