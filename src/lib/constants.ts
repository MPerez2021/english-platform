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
    description: "Select from Vocabulary, Grammar, Reading, or Writing",
    icon: "Target" as const,
  },
  {
    step: 2, 
    title: "Choose Level",
    description: "Pick Beginner, Intermediate, or Advanced difficulty",
    icon: "BarChart3" as const,
  },
  {
    step: 3,
    title: "Interactive Lessons",
    description: "Learn through engaging, step-by-step lessons",
    icon: "PlayCircle" as const,
  },
  {
    step: 4,
    title: "Practice Exercises",
    description: "Reinforce learning with hands-on practice activities",
    icon: "CheckCircle" as const,
  },
] as const

export const BENEFITS = [
  {
    title: "100% Free Access",
    description: "Quality English education accessible to everyone, everywhere.",
    icon: "Gift" as const,
  },
  {
    title: "Self-Paced Learning",
    description: "Learn at your own speed with no pressure or deadlines.", 
    icon: "Clock" as const,
  },
  {
    title: "Academic Quality",
    description: "Content designed by education experts following proven methodologies.",
    icon: "Award" as const,
  },
  {
    title: "Interactive Practice",
    description: "Engaging exercises that make learning enjoyable and effective.",
    icon: "Zap" as const,
  },
  {
    title: "Progress Tracking",
    description: "Monitor your improvement with detailed learning analytics.",
    icon: "TrendingUp" as const,
  },
  {
    title: "Mobile Friendly",
    description: "Learn anywhere, anytime on any device with responsive design.",
    icon: "Smartphone" as const,
  },
] as const