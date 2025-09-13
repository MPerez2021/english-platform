import { Topic, CreateTopicInput, UpdateTopicInput } from "@/lib/types/topic.types";

const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const mockTopics: Topic[] = [
  {
    id: 1,
    name: "Grammar",
    slug: "grammar",
    description: "Master English grammar fundamentals with comprehensive exercises covering tenses, sentence structure, and language rules.",
    display_order: 1,
    is_active: true,
    created_at: new Date("2024-01-15T10:00:00Z"),
    updated_at: new Date("2024-01-15T10:00:00Z"),
  },
  {
    id: 2,
    name: "Vocabulary",
    slug: "vocabulary",
    description: "Expand your English vocabulary with targeted word lists, contextual usage examples, and memory techniques.",
    display_order: 2,
    is_active: true,
    created_at: new Date("2024-01-15T10:15:00Z"),
    updated_at: new Date("2024-01-15T10:15:00Z"),
  },
  {
    id: 3,
    name: "Reading",
    slug: "reading",
    description: "Improve reading comprehension skills through diverse texts, from beginner articles to advanced academic passages.",
    display_order: 3,
    is_active: true,
    created_at: new Date("2024-01-15T10:30:00Z"),
    updated_at: new Date("2024-01-15T10:30:00Z"),
  },
  {
    id: 4,
    name: "Writing",
    slug: "writing",
    description: "Develop writing skills with guided exercises covering sentence construction, paragraph development, and essay composition.",
    display_order: 4,
    is_active: false,
    created_at: new Date("2024-01-15T10:45:00Z"),
    updated_at: new Date("2024-01-15T10:45:00Z"),
  },
];

// eslint-disable-next-line prefer-const
let topicsData = [...mockTopics];
let nextId = 5;

export const topicsService = {
  getAll: (): Topic[] => {
    return topicsData.sort((a, b) => a.display_order - b.display_order);
  },

  getById: (id: number): Topic | undefined => {
    return topicsData.find((topic) => topic.id === id);
  },

  create: (input: CreateTopicInput): Topic => {
    const newTopic: Topic = {
      id: nextId++,
      ...input,
      slug: generateSlug(input.name),
      created_at: new Date(),
      updated_at: new Date(),
    };
    topicsData.push(newTopic);
    return newTopic;
  },

  update: (input: UpdateTopicInput): Topic | null => {
    const index = topicsData.findIndex((topic) => topic.id === input.id);
    if (index === -1) return null;

    const updatedTopic: Topic = {
      ...topicsData[index],
      ...input,
      slug: generateSlug(input.name),
      updated_at: new Date(),
    };
    topicsData[index] = updatedTopic;
    return updatedTopic;
  },

  delete: (id: number): boolean => {
    const index = topicsData.findIndex((topic) => topic.id === id);
    if (index === -1) return false;
    topicsData.splice(index, 1);
    return true;
  },

  toggleActive: (id: number): Topic | null => {
    const topic = topicsData.find((t) => t.id === id);
    if (!topic) return null;

    topic.is_active = !topic.is_active;
    topic.updated_at = new Date();
    return topic;
  },
};