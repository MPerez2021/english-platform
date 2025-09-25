export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      topics: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          display_order: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          id: string
          topic_id: string
          slug:string,
          name: string
          description: string
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          topic_id: string
          slug:string,
          name: string
          description: string
          display_order: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          topic_id?: string
          slug?:string,
          name?: string
          description?: string
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          }
        ]
      }
      subcategories: {
        Row: {
          id: string
          category_id: string
          slug:string,
          name: string
          description: string
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id: string
          slug:string,
          name: string
          description: string
          display_order: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          slug?:string,
          name?: string
          description?: string
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subcategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      lessons: {
        Row: {
          id: string
          subcategory_id: string
          title: string
          explanation_content: string
          slug: string
          cefr_level: Database["public"]["Enums"]["cefr_level"]
          estimated_time: number | null
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          subcategory_id: string
          title: string
          explanation_content: string
          slug: string
          cefr_level: Database["public"]["Enums"]["cefr_level"]
          estimated_time?: number | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          subcategory_id?: string
          title?: string
          explanation_content?: string
          slug?: string
          cefr_level?: Database["public"]["Enums"]["cefr_level"]
          estimated_time?: number | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "subcategories"
            referencedColumns: ["id"]
          }
        ]
      }
      exercises: {
        Row: {
          id: string
          lesson_id: string
          exercise_types: Database["public"]["Enums"]["exercise_types"]
          content: Json
          instructions: string
          display_order: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          lesson_id: string
          exercise_types: Database["public"]["Enums"]["exercise_types"]
          content: Json
          instructions: string
          display_order?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          lesson_id?: string
          exercise_types?: Database["public"]["Enums"]["exercise_types"]
          content?: Json
          instructions?: string
          display_order?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercises_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      cefr_level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2"
      exercise_types: "FILL_BLANK" | "FILL_BLANK_FREE" | "READING_COMPREHENSION"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}