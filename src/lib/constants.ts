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
    image: "/images/topics/vocabulary.webp",
  },
  {
    id: "grammar",
    name: "Grammar",
    description: "Master English grammar rules through practical examples and engaging activities.",
    summary: "Master tense practice, error correction, and sentence building",
    icon: "PenTool" as const,
    image: "/images/topics/grammar.webp",
  },
  {
    id: "reading",
    name: "Reading",
    description: "Improve comprehension skills with diverse texts and guided reading exercises.",
    summary: "Develop comprehension, speed reading, and analysis skills",
    icon: "FileText" as const,
    image: "/images/topics/reading.webp",
  },
  {
    id: "writing",
    name: "Writing",
    description: "Develop writing skills from sentences to essays with structured guidance.",
    summary: "Improve essay writing, grammar, and style techniques",
    icon: "Edit3" as const,
    image: "/images/topics/writing.webp",
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

export const FAQ_ITEMS = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "Is this platform really 100% free?",
        answer: "Yes! Our core English learning content is completely free with no hidden costs, ads, or subscription requirements. You can access vocabulary, grammar, reading, and writing exercises without creating an account or providing payment information."
      },
      {
        question: "Do I need to create an account to start learning?",
        answer: "No account required! You can immediately start using all our interactive exercises, self-paced lessons, and practice materials. Simply visit our website and begin learning right away."
      },
      {
        question: "What English levels do you support?",
        answer: "Our platform caters to all proficiency levels, from complete beginners to advanced learners. Our content is designed to help you progress naturally through different difficulty levels."
      },
      {
        question: "What devices can I use to access the platform?",
        answer: "Our platform works seamlessly on any web browser and is fully optimized for mobile devices. You can learn on your computer, tablet, or smartphone, wherever and whenever it's convenient for you."
      }
    ]
  },
  {
    category: "Learning Content", 
    questions: [
      {
        question: "What types of English skills can I improve?",
        answer: "Our platform focuses on four core areas: Vocabulary (build and expand your word knowledge), Grammar (master English grammar rules and usage), Reading (improve comprehension and reading speed), and Writing (develop your written communication skills)."
      },
      {
        question: "What learning formats do you offer?",
        answer: "We offer interactive exercises for hands-on practice, self-paced lessons you can complete at your own speed, and educational resources for additional learning support. All content is accessible whenever you want to dive deeper into any topic."
      },
      {
        question: "Can I track my learning progress?",
        answer: "Currently, progress tracking isn't available since no account is required. However, we're planning to introduce comprehensive progress tracking and additional features in future updates."
      }
    ]
  },
  {
    category: "Future Features",
    questions: [
      {
        question: "Will the platform always be free?",
        answer: "Our core learning content will remain free forever. We're committed to providing accessible English education to everyone. In the future, we plan to add premium AI-powered features through an optional subscription system, but all current content will stay free."
      },
      {
        question: "What premium features are you planning?",
        answer: "We're developing AI-enhanced features that will provide personalized learning experiences, advanced feedback, and smart recommendations. These premium features will require a subscription, but all existing free content will remain available to everyone."
      }
    ]
  },
  {
    category: "Community & Support",
    questions: [
      {
        question: "Do you have a learning community?",
        answer: "We're launching a Discord community where learners can connect, practice together, and support each other's learning journey. Stay tuned for updates!"
      },
      {
        question: "How can I get help or suggest improvements?",
        answer: "Contact us through our support channels. Once our Discord community launches, it will be another great place to get help and share feedback with fellow learners and our team."
      }
    ]
  }
] as const