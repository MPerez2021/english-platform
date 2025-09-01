export const SITE_CONFIG = {
  name: "EnglishPlatform",
  title: "Master English with Confidence",
  description: "Free, high-quality English learning platform with structured practice across Vocabulary, Grammar, Reading, and Writing skills.",
} as const

export const NAVIGATION_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Vocabulary", href: "/vocabulary" },
  { name: "Grammar", href: "/grammar" },
  { name: "Reading", href: "/reading" },
  { name: "Writing", href: "/writing" },
  { name: "Resources", href: "/resources" },
] as const

export const TOPICS = [
  {
    id: "vocabulary",
    name: "Vocabulary",
    description: "Build your word knowledge with interactive exercises and contextual learning.",
    summary: "Practice word meanings, context usage, and synonyms",
      icon: "BookOpen" as const,
  },
  {
    id: "grammar",
    name: "Grammar",
    description: "Master English grammar rules through practical examples and engaging activities.",
    summary: "Master tense practice, error correction, and sentence building",
    icon: "PenTool" as const,
  },
  {
    id: "reading",
    name: "Reading",
    description: "Improve comprehension skills with diverse texts and guided reading exercises.",
    summary: "Develop comprehension, speed reading, and analysis skills",
    icon: "FileText" as const,
  },
  {
    id: "writing",
    name: "Writing",
    description: "Develop writing skills from sentences to essays with structured guidance.",
    summary: "Improve essay writing, grammar, and style techniques",
    icon: "Edit3" as const,
  },
] as const

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Choose Topic",
    description: "Select the English skill you want to improve - Vocabulary, Grammar, Reading, or Writing",
    icon: "Target" as const,
    color: "bg-primary",
    textColor: "text-primary",
  },
  {
    step: 2,
    title: "Choose Level",
    description: "Start with Beginner, Intermediate, or Advanced based on your current ability",
    icon: "BarChart3" as const,
    color: "bg-chart-3",
    textColor: "text-chart-3",
  },
  {
    step: 3,
    title: "Interactive Lessons",
    description: "Engage with dynamic lessons designed to make learning enjoyable and effective",
    icon: "PlayCircle" as const,
    color: "bg-chart-1",
    textColor: "text-chart-1",
  },
  {
    step: 4,
    title: "Practice Exercises",
    description: "Apply what you've learned through interactive exercises and track your progress",
    icon: "CheckCircle" as const,
    color: "bg-chart-4",
    textColor: "text-chart-4",
  },
] as const

export const BENEFITS = [
  {
    title: "Learn Without Limits",
    description: "Access premium English education at no cost. Quality learning shouldn't depend on your budget.",
    icon: "Gift" as const,
  },
  {
    title: "Your Schedule, Your Progress",
    description: "Master English at your own pace. No deadlines, no pressure—just steady improvement when it works for you.",
    icon: "Clock" as const,
  },
  {
    title: "Expert-Designed Content",
    description: "Every lesson crafted by education professionals using proven teaching methodologies that actually work.",
    icon: "Award" as const,
  },
  {
    title: "Learn by Doing",
    description: "Interactive exercises that engage your mind. Learning through practice, not passive reading.",
    icon: "Zap" as const,
  },
  {
    title: "See Your Growth",
    description: "Watch your English skills improve with detailed progress insights that celebrate your achievements.",
    icon: "TrendingUp" as const,
  },
  {
    title: "Learn Anywhere",
    description: "Perfect experience on any device. Your English lessons adapt to your lifestyle, not the other way around.",
    icon: "Smartphone" as const,
  },
] as const