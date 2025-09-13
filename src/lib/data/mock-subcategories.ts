import { Subcategory, CreateSubcategoryInput, UpdateSubcategoryInput } from "@/lib/types/category.types";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

let nextId = 1;

const subcategoriesData: Subcategory[] = [
  // Tenses subcategories (category_id: 1)
  {
    id: nextId++,
    category_id: 1,
    name: "Present Simple",
    slug: "present-simple",
    description: "Learn the basic present tense for habits, facts, and general truths",
    display_order: 1,
    is_active: true,
    created_at: new Date("2024-01-15T10:30:00Z"),
    updated_at: new Date("2024-01-15T10:30:00Z"),
  },
  {
    id: nextId++,
    category_id: 1,
    name: "Present Continuous",
    slug: "present-continuous",
    description: "Master the present continuous tense for ongoing actions",
    display_order: 2,
    is_active: true,
    created_at: new Date("2024-01-15T11:00:00Z"),
    updated_at: new Date("2024-01-15T11:00:00Z"),
  },
  {
    id: nextId++,
    category_id: 1,
    name: "Past Simple",
    slug: "past-simple",
    description: "Learn about completed actions in the past",
    display_order: 3,
    is_active: true,
    created_at: new Date("2024-01-15T11:30:00Z"),
    updated_at: new Date("2024-01-15T11:30:00Z"),
  },
  
  // Articles subcategories (category_id: 2)
  {
    id: nextId++,
    category_id: 2,
    name: "Definite Article",
    slug: "definite-article",
    description: "When and how to use 'the' in English sentences",
    display_order: 1,
    is_active: true,
    created_at: new Date("2024-01-16T11:30:00Z"),
    updated_at: new Date("2024-01-16T11:30:00Z"),
  },
  {
    id: nextId++,
    category_id: 2,
    name: "Indefinite Articles",
    slug: "indefinite-articles",
    description: "Understanding when to use 'a' and 'an'",
    display_order: 2,
    is_active: true,
    created_at: new Date("2024-01-16T12:00:00Z"),
    updated_at: new Date("2024-01-16T12:00:00Z"),
  },

  // Daily Life subcategories (category_id: 3)
  {
    id: nextId++,
    category_id: 3,
    name: "Food & Cooking",
    slug: "food-cooking",
    description: "Vocabulary related to food, cooking, and dining",
    display_order: 1,
    is_active: true,
    created_at: new Date("2024-01-17T12:30:00Z"),
    updated_at: new Date("2024-01-17T12:30:00Z"),
  },
  {
    id: nextId++,
    category_id: 3,
    name: "Sports & Exercise",
    slug: "sports-exercise",
    description: "Sports terminology and exercise-related vocabulary",
    display_order: 2,
    is_active: true,
    created_at: new Date("2024-01-17T13:00:00Z"),
    updated_at: new Date("2024-01-17T13:00:00Z"),
  },
  {
    id: nextId++,
    category_id: 3,
    name: "Transportation",
    slug: "transportation",
    description: "Vocabulary for travel, vehicles, and getting around",
    display_order: 3,
    is_active: false,
    created_at: new Date("2024-01-17T13:30:00Z"),
    updated_at: new Date("2024-01-17T13:30:00Z"),
  },

  // Business subcategories (category_id: 4)
  {
    id: nextId++,
    category_id: 4,
    name: "Meeting Vocabulary",
    slug: "meeting-vocabulary",
    description: "Essential terms for business meetings and presentations",
    display_order: 1,
    is_active: true,
    created_at: new Date("2024-01-18T13:30:00Z"),
    updated_at: new Date("2024-01-18T13:30:00Z"),
  },
  {
    id: nextId++,
    category_id: 4,
    name: "Email Writing",
    slug: "email-writing",
    description: "Professional email vocabulary and phrases",
    display_order: 2,
    is_active: true,
    created_at: new Date("2024-01-18T14:00:00Z"),
    updated_at: new Date("2024-01-18T14:00:00Z"),
  },
];

export const subcategoriesService = {
  getAll: (): Subcategory[] => {
    return subcategoriesData.sort((a, b) => {
      if (a.category_id === b.category_id) {
        return a.display_order - b.display_order;
      }
      return a.category_id - b.category_id;
    });
  },

  getById: (id: number): Subcategory | undefined => {
    return subcategoriesData.find(subcategory => subcategory.id === id);
  },

  getByCategoryId: (categoryId: number): Subcategory[] => {
    return subcategoriesData
      .filter(subcategory => subcategory.category_id === categoryId)
      .sort((a, b) => a.display_order - b.display_order);
  },

  create: (input: CreateSubcategoryInput): Subcategory => {
    const newSubcategory: Subcategory = {
      id: nextId++,
      ...input,
      slug: generateSlug(input.name),
      created_at: new Date(),
      updated_at: new Date(),
    };
    subcategoriesData.push(newSubcategory);
    return newSubcategory;
  },

  update: (input: UpdateSubcategoryInput): Subcategory | null => {
    const index = subcategoriesData.findIndex(subcategory => subcategory.id === input.id);
    if (index === -1) return null;

    const updatedSubcategory: Subcategory = {
      ...subcategoriesData[index],
      ...input,
      slug: generateSlug(input.name),
      updated_at: new Date(),
    };
    subcategoriesData[index] = updatedSubcategory;
    return updatedSubcategory;
  },

  delete: (id: number): boolean => {
    const index = subcategoriesData.findIndex(subcategory => subcategory.id === id);
    if (index === -1) return false;

    subcategoriesData.splice(index, 1);
    return true;
  },

  toggleActive: (id: number): Subcategory | null => {
    const subcategory = subcategoriesData.find(sub => sub.id === id);
    if (!subcategory) return null;

    subcategory.is_active = !subcategory.is_active;
    subcategory.updated_at = new Date();
    return subcategory;
  },
};