import { z } from "zod";

export const categoryFormSchema = z.object({
  topic_id: z
    .string()
    .min(1, "Please select a topic"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .trim(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters")
    .trim(),
  display_order: z
    .number()
    .min(1, "Display order must be a positive number")
    .int("Display order must be a whole number"),
  is_active: z.boolean(),
});

export const createCategorySchema = categoryFormSchema;

export const updateCategorySchema = categoryFormSchema.extend({
  id: z.string(),
});

export const subcategoryFormSchema = z.object({
  category_id: z
    .string()
    .min(1, "Please select a category"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .trim(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters")
    .trim(),
  display_order: z
    .number()
    .min(1, "Display order must be a positive number")
    .int("Display order must be a whole number"),
  is_active: z.boolean(),
});

export const createSubcategorySchema = subcategoryFormSchema;

export const updateSubcategorySchema = subcategoryFormSchema.extend({
  id: z.string(),
});

export type CategoryFormSchema = z.infer<typeof categoryFormSchema>;
export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>;

export type SubcategoryFormSchema = z.infer<typeof subcategoryFormSchema>;
export type CreateSubcategorySchema = z.infer<typeof createSubcategorySchema>;
export type UpdateSubcategorySchema = z.infer<typeof updateSubcategorySchema>;