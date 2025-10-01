import type { Database } from '@/lib/supabase/database.types'

export type CefrLevel = Database['public']['Enums']['cefr_level']

export interface Lesson {
  id: string;
  subcategory_id: string;
  title: string;
  explanation_content: string;
  slug: string;
  cefr_level: CefrLevel;
  estimated_time: number | null;
  is_published: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateLessonInput {
  subcategory_id: string;
  title: string;
  explanation_content: string;
  cefr_level: CefrLevel;
  estimated_time?: number | null;
  is_published: boolean;
}

export interface UpdateLessonInput {
  id: string;
  subcategory_id: string;
  title: string;
  explanation_content: string;
  cefr_level: CefrLevel;
  estimated_time?: number | null;
  is_published: boolean;
}

export interface LessonFormData {
  subcategory_id: string;
  title: string;
  explanation_content: string;
  cefr_level: CefrLevel;
  estimated_time?: number | null;
  is_published: boolean;
}

export interface LessonWithSubcategoryAndCategory{
  id: string;
  topic: string;
  subcategory: string;
  category:string;
  title: string;
  slug: string;
  cefr_level: CefrLevel;
  estimated_time: number | null;
  is_published: boolean;
  created_at: Date;
}

// Helper constant for CEFR level options
export const CEFR_LEVELS: { value: CefrLevel; label: string; description: string }[] = [
  { value: 'A1', label: 'A1 - Beginner', description: 'Basic level - Can understand and use familiar everyday expressions' },
  { value: 'A2', label: 'A2 - Elementary', description: 'Elementary level - Can communicate in simple and routine tasks' },
  { value: 'B1', label: 'B1 - Intermediate', description: 'Intermediate level - Can deal with most situations while traveling' },
  { value: 'B2', label: 'B2 - Upper Intermediate', description: 'Upper intermediate level - Can interact with degree of fluency' },
  { value: 'C1', label: 'C1 - Advanced', description: 'Advanced level - Can express ideas fluently and spontaneously' },
  { value: 'C2', label: 'C2 - Proficient', description: 'Proficient level - Can understand virtually everything heard or read' },
]