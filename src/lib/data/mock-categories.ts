import { Category, CreateCategoryInput, UpdateCategoryInput } from "@/lib/types/category.types";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

let nextId = 1;

const categoriesData: Category[] = [
  {
    id: nextId++,
    topic_id: 1, // Grammar
    name: "Tenses",
    slug: "tenses",
    description: "Learn about different English tenses including present, past, and future forms",
    display_order: 1,
    is_active: true,
    created_at: new Date("2024-01-15T10:00:00Z"),
    updated_at: new Date("2024-01-15T10:00:00Z"),
  },
  {
    id: nextId++,
    topic_id: 1, // Grammar
    name: "Articles",
    slug: "articles",
    description: "Master the use of articles: a, an, and the in English sentences",
    display_order: 2,
    is_active: true,
    created_at: new Date("2024-01-16T11:00:00Z"),
    updated_at: new Date("2024-01-16T11:00:00Z"),
  },
  {
    id: nextId++,
    topic_id: 2, // Vocabulary
    name: "Daily Life",
    slug: "daily-life",
    description: "Essential vocabulary for everyday situations and activities",
    display_order: 1,
    is_active: true,
    created_at: new Date("2024-01-17T12:00:00Z"),
    updated_at: new Date("2024-01-17T12:00:00Z"),
  },
  {
    id: nextId++,
    topic_id: 2, // Vocabulary
    name: "Business",
    slug: "business",
    description: "Professional vocabulary for workplace and business communication",
    display_order: 2,
    is_active: true,
    created_at: new Date("2024-01-18T13:00:00Z"),
    updated_at: new Date("2024-01-18T13:00:00Z"),
  },
  {
    id: nextId++,
    topic_id: 3, // Reading
    name: "News Articles",
    slug: "news-articles",
    description: "Practice reading comprehension with current news articles",
    display_order: 1,
    is_active: true,
    created_at: new Date("2024-01-19T14:00:00Z"),
    updated_at: new Date("2024-01-19T14:00:00Z"),
  },
  {
    id: nextId++,
    topic_id: 4, // Writing
    name: "Essay Types",
    slug: "essay-types",
    description: "Learn different types of essays: argumentative, descriptive, narrative",
    display_order: 1,
    is_active: false,
    created_at: new Date("2024-01-20T15:00:00Z"),
    updated_at: new Date("2024-01-20T15:00:00Z"),
  },
];

export const categoriesService = {
  getAll: (): Category[] => {
    return categoriesData.sort((a, b) => {
      if (a.topic_id === b.topic_id) {
        return a.display_order - b.display_order;
      }
      return a.topic_id - b.topic_id;
    });
  },

  getById: (id: number): Category | undefined => {
    return categoriesData.find(category => category.id === id);
  },

  getByTopicId: (topicId: number): Category[] => {
    return categoriesData
      .filter(category => category.topic_id === topicId)
      .sort((a, b) => a.display_order - b.display_order);
  },

  create: (input: CreateCategoryInput): Category => {
    const newCategory: Category = {
      id: nextId++,
      ...input,
      slug: generateSlug(input.name),
      created_at: new Date(),
      updated_at: new Date(),
    };
    categoriesData.push(newCategory);
    return newCategory;
  },

  update: (input: UpdateCategoryInput): Category | null => {
    const index = categoriesData.findIndex(category => category.id === input.id);
    if (index === -1) return null;

    const updatedCategory: Category = {
      ...categoriesData[index],
      ...input,
      slug: generateSlug(input.name),
      updated_at: new Date(),
    };
    categoriesData[index] = updatedCategory;
    return updatedCategory;
  },

  delete: (id: number): boolean => {
    const index = categoriesData.findIndex(category => category.id === id);
    if (index === -1) return false;

    categoriesData.splice(index, 1);
    return true;
  },

  toggleActive: (id: number): Category | null => {
    const category = categoriesData.find(cat => cat.id === id);
    if (!category) return null;

    category.is_active = !category.is_active;
    category.updated_at = new Date();
    return category;
  },
};