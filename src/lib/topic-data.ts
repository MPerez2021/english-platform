export const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const

export type Level = (typeof LEVELS)[number]
export type TopicType = "vocabulary" | "grammar" | "reading" | "writing"

export interface SubCategory {
  id: string
  name: string
  description: string
  exercises: Exercise[]
}

export interface Category {
  id: string
  name: string
  description: string
  subcategories: SubCategory[]
}

export interface Exercise {
  id: string
  title: string
  description: string
  level: Level
  estimatedTime: string
  difficulty: "Easy" | "Medium" | "Hard"
  image?: string
}

export interface TopicData {
  id: TopicType
  name: string
  description: string
  bannerTitle: string
  bannerSubtitle: string
  levels: Level[]
  categories: Category[]
  sampleExercises: Exercise[]
}

// Topic-specific data structure
export const TOPIC_DATA: Record<TopicType, TopicData> = {
  vocabulary: {
    id: "vocabulary",
    name: "Vocabulary",
    description: "Expand your vocabulary step by step",
    bannerTitle: "Vocabulary",
    bannerSubtitle: "Expand your vocabulary step by step.",
    levels: [...LEVELS],
    categories: [
      {
        id: "everyday-life",
        name: "Everyday Life",
        description: "Essential vocabulary for daily conversations and activities",
        subcategories: [
          {
            id: "food",
            name: "Food",
            description: "Learn about food items, cooking, and dining vocabulary",
            exercises: [
              {
                id: "basic-food-items",
                title: "Basic Food Items",
                description: "Learn essential vocabulary for common foods and ingredients",
                level: "A1",
                estimatedTime: "15 min",
                difficulty: "Easy",
              },
              {
                id: "cooking-methods",
                title: "Cooking Methods",
                description: "Master vocabulary related to different cooking techniques",
                level: "A2",
                estimatedTime: "20 min",
                difficulty: "Medium",
              },
            ],
          },
          {
            id: "travel",
            name: "Travel",
            description: "Vocabulary for transportation, hotels, and tourism",
            exercises: [
              {
                id: "transportation",
                title: "Transportation Vocabulary",
                description: "Learn words related to buses, trains, planes, and more",
                level: "A1",
                estimatedTime: "12 min",
                difficulty: "Easy",
              },
              {
                id: "hotel-booking",
                title: "Hotel & Accommodation",
                description: "Essential vocabulary for booking and staying at hotels",
                level: "B1",
                estimatedTime: "18 min",
                difficulty: "Medium",
              },
            ],
          },
          {
            id: "shopping",
            name: "Shopping",
            description: "Shopping-related vocabulary and expressions",
            exercises: [
              {
                id: "clothing-items",
                title: "Clothing & Fashion",
                description: "Learn vocabulary for clothes, sizes, and shopping",
                level: "A2",
                estimatedTime: "16 min",
                difficulty: "Easy",
              },
            ],
          },
        ],
      },
      {
        id: "academic",
        name: "Academic",
        description: "Advanced vocabulary for academic and professional contexts",
        subcategories: [
          {
            id: "science",
            name: "Science",
            description: "Scientific terminology and concepts",
            exercises: [
              {
                id: "biology-basics",
                title: "Biology Fundamentals",
                description: "Essential biology vocabulary for academic contexts",
                level: "B2",
                estimatedTime: "25 min",
                difficulty: "Hard",
              },
            ],
          },
          {
            id: "history",
            name: "History",
            description: "Historical terms and concepts",
            exercises: [
              {
                id: "world-history",
                title: "World History Terms",
                description: "Key vocabulary for discussing historical events",
                level: "B2",
                estimatedTime: "30 min",
                difficulty: "Hard",
              },
            ],
          },
          {
            id: "literature",
            name: "Literature",
            description: "Literary terms and analysis vocabulary",
            exercises: [
              {
                id: "literary-devices",
                title: "Literary Devices",
                description: "Learn about metaphors, symbolism, and other literary techniques",
                level: "C1",
                estimatedTime: "35 min",
                difficulty: "Hard",
              },
            ],
          },
        ],
      },
      {
        id: "business",
        name: "Business",
        description: "Professional vocabulary for workplace communication",
        subcategories: [
          {
            id: "meetings",
            name: "Meetings",
            description: "Vocabulary for professional meetings and presentations",
            exercises: [
              {
                id: "meeting-phrases",
                title: "Meeting Expressions",
                description: "Essential phrases for participating in business meetings",
                level: "B1",
                estimatedTime: "22 min",
                difficulty: "Medium",
              },
            ],
          },
          {
            id: "negotiations",
            name: "Negotiations",
            description: "Language for business negotiations and deals",
            exercises: [
              {
                id: "negotiation-skills",
                title: "Negotiation Language",
                description: "Master vocabulary for successful business negotiations",
                level: "B2",
                estimatedTime: "28 min",
                difficulty: "Hard",
              },
            ],
          },
          {
            id: "emails",
            name: "Emails",
            description: "Professional email writing vocabulary",
            exercises: [
              {
                id: "formal-emails",
                title: "Formal Email Writing",
                description: "Learn proper vocabulary for professional email communication",
                level: "B1",
                estimatedTime: "20 min",
                difficulty: "Medium",
              },
            ],
          },
        ],
      },
    ],
    sampleExercises: [
      {
        id: "daily-words",
        title: "Daily Words Challenge",
        description: "Learn 10 new words every day with interactive exercises",
        level: "A2",
        estimatedTime: "10 min",
        difficulty: "Easy",
      },
      {
        id: "context-clues",
        title: "Context Clues Practice",
        description: "Learn to understand word meanings from context",
        level: "B1",
        estimatedTime: "15 min",
        difficulty: "Medium",
      },
    ],
  },
  grammar: {
    id: "grammar",
    name: "Grammar",
    description: "Master English grammar rules and structures",
    bannerTitle: "Grammar",
    bannerSubtitle: "Master English grammar rules and structures.",
    levels: [...LEVELS],
    categories: [
      {
        id: "basics",
        name: "Basics",
        description: "Fundamental grammar concepts",
        subcategories: [
          {
            id: "articles",
            name: "Articles",
            description: "Learn to use a, an, and the correctly",
            exercises: [
              {
                id: "definite-articles",
                title: "Definite Articles",
                description: "Master the use of 'the' in different contexts",
                level: "A1",
                estimatedTime: "15 min",
                difficulty: "Easy",
              },
            ],
          },
          {
            id: "pronouns",
            name: "Pronouns",
            description: "Personal, possessive, and demonstrative pronouns",
            exercises: [
              {
                id: "personal-pronouns",
                title: "Personal Pronouns",
                description: "Practice using I, you, he, she, it, we, they",
                level: "A1",
                estimatedTime: "12 min",
                difficulty: "Easy",
              },
            ],
          },
          {
            id: "prepositions",
            name: "Prepositions",
            description: "Prepositions of time, place, and movement",
            exercises: [
              {
                id: "time-prepositions",
                title: "Prepositions of Time",
                description: "Learn when to use in, on, at for time expressions",
                level: "A2",
                estimatedTime: "18 min",
                difficulty: "Medium",
              },
            ],
          },
        ],
      },
      {
        id: "verb-forms",
        name: "Verb Forms",
        description: "Tenses, aspects, and verb conjugations",
        subcategories: [
          {
            id: "present",
            name: "Present",
            description: "Present simple, continuous, and perfect tenses",
            exercises: [
              {
                id: "present-simple",
                title: "Present Simple Tense",
                description: "Learn to form and use present simple tense",
                level: "A1",
                estimatedTime: "20 min",
                difficulty: "Easy",
              },
            ],
          },
          {
            id: "past",
            name: "Past",
            description: "Past tenses and time expressions",
            exercises: [
              {
                id: "past-simple",
                title: "Past Simple Tense",
                description: "Master regular and irregular past tense forms",
                level: "A2",
                estimatedTime: "25 min",
                difficulty: "Medium",
              },
            ],
          },
          {
            id: "future",
            name: "Future",
            description: "Future tenses and expressions",
            exercises: [
              {
                id: "future-simple",
                title: "Future Simple Tense",
                description: "Learn different ways to express future actions",
                level: "A2",
                estimatedTime: "22 min",
                difficulty: "Medium",
              },
            ],
          },
          {
            id: "conditionals",
            name: "Conditionals",
            description: "If clauses and conditional sentences",
            exercises: [
              {
                id: "first-conditional",
                title: "First Conditional",
                description: "Practice real conditional sentences",
                level: "B1",
                estimatedTime: "30 min",
                difficulty: "Hard",
              },
            ],
          },
        ],
      },
      {
        id: "advanced",
        name: "Advanced",
        description: "Complex grammar structures",
        subcategories: [
          {
            id: "subjunctive",
            name: "Subjunctive",
            description: "Subjunctive mood in English",
            exercises: [
              {
                id: "subjunctive-mood",
                title: "Subjunctive Mood",
                description: "Learn to use subjunctive in formal contexts",
                level: "C1",
                estimatedTime: "40 min",
                difficulty: "Hard",
              },
            ],
          },
          {
            id: "passive-voice",
            name: "Passive Voice",
            description: "Active and passive voice constructions",
            exercises: [
              {
                id: "passive-construction",
                title: "Passive Voice Formation",
                description: "Convert active sentences to passive voice",
                level: "B2",
                estimatedTime: "35 min",
                difficulty: "Hard",
              },
            ],
          },
          {
            id: "reported-speech",
            name: "Reported Speech",
            description: "Direct and indirect speech",
            exercises: [
              {
                id: "indirect-speech",
                title: "Indirect Speech",
                description: "Learn to report what others have said",
                level: "B2",
                estimatedTime: "32 min",
                difficulty: "Hard",
              },
            ],
          },
        ],
      },
    ],
    sampleExercises: [
      {
        id: "grammar-check",
        title: "Grammar Error Detection",
        description: "Find and correct common grammar mistakes",
        level: "B1",
        estimatedTime: "15 min",
        difficulty: "Medium",
      },
    ],
  },
  reading: {
    id: "reading",
    name: "Reading",
    description: "Improve your reading comprehension and speed",
    bannerTitle: "Reading",
    bannerSubtitle: "Improve your reading comprehension and speed.",
    levels: [...LEVELS],
    categories: [
      {
        id: "fiction",
        name: "Fiction",
        description: "Literary texts and storytelling",
        subcategories: [
          {
            id: "short-stories",
            name: "Short Stories",
            description: "Classic and contemporary short fiction",
            exercises: [
              {
                id: "story-comprehension",
                title: "Story Comprehension",
                description: "Read short stories and answer comprehension questions",
                level: "B1",
                estimatedTime: "25 min",
                difficulty: "Medium",
              },
            ],
          },
          {
            id: "novels",
            name: "Novels",
            description: "Excerpts from famous novels",
            exercises: [
              {
                id: "novel-excerpts",
                title: "Novel Analysis",
                description: "Analyze character development and plot in novel excerpts",
                level: "B2",
                estimatedTime: "35 min",
                difficulty: "Hard",
              },
            ],
          },
          {
            id: "poetry",
            name: "Poetry",
            description: "Poems and poetic analysis",
            exercises: [
              {
                id: "poetry-analysis",
                title: "Poetry Interpretation",
                description: "Understand themes and literary devices in poetry",
                level: "C1",
                estimatedTime: "30 min",
                difficulty: "Hard",
              },
            ],
          },
        ],
      },
      {
        id: "non-fiction",
        name: "Non-Fiction",
        description: "Factual and informational texts",
        subcategories: [
          {
            id: "news",
            name: "News",
            description: "Current events and news articles",
            exercises: [
              {
                id: "news-reading",
                title: "News Article Analysis",
                description: "Read and analyze current news articles",
                level: "A2",
                estimatedTime: "20 min",
                difficulty: "Medium",
              },
            ],
          },
          {
            id: "articles",
            name: "Articles",
            description: "Magazine and journal articles",
            exercises: [
              {
                id: "article-comprehension",
                title: "Article Comprehension",
                description: "Understand main ideas and supporting details",
                level: "B1",
                estimatedTime: "28 min",
                difficulty: "Medium",
              },
            ],
          },
          {
            id: "essays",
            name: "Essays",
            description: "Opinion pieces and argumentative essays",
            exercises: [
              {
                id: "essay-analysis",
                title: "Essay Structure Analysis",
                description: "Identify arguments and evidence in essays",
                level: "B2",
                estimatedTime: "40 min",
                difficulty: "Hard",
              },
            ],
          },
        ],
      },
      {
        id: "academic",
        name: "Academic",
        description: "Scholarly and academic texts",
        subcategories: [
          {
            id: "research-papers",
            name: "Research Papers",
            description: "Academic research and studies",
            exercises: [
              {
                id: "research-reading",
                title: "Research Paper Analysis",
                description: "Understand methodology and findings in research",
                level: "C1",
                estimatedTime: "45 min",
                difficulty: "Hard",
              },
            ],
          },
          {
            id: "textbooks",
            name: "Textbooks",
            description: "Educational and instructional texts",
            exercises: [
              {
                id: "textbook-study",
                title: "Textbook Comprehension",
                description: "Extract key information from textbook passages",
                level: "B2",
                estimatedTime: "35 min",
                difficulty: "Hard",
              },
            ],
          },
          {
            id: "reports",
            name: "Reports",
            description: "Business and scientific reports",
            exercises: [
              {
                id: "report-analysis",
                title: "Report Interpretation",
                description: "Analyze data and conclusions in reports",
                level: "C1",
                estimatedTime: "50 min",
                difficulty: "Hard",
              },
            ],
          },
        ],
      },
    ],
    sampleExercises: [
      {
        id: "speed-reading",
        title: "Speed Reading Challenge",
        description: "Improve your reading speed while maintaining comprehension",
        level: "B1",
        estimatedTime: "20 min",
        difficulty: "Medium",
      },
    ],
  },
  writing: {
    id: "writing",
    name: "Writing",
    description: "Develop your written communication skills",
    bannerTitle: "Writing",
    bannerSubtitle: "Develop your written communication skills.",
    levels: [...LEVELS],
    categories: [
      {
        id: "creative",
        name: "Creative",
        description: "Creative and expressive writing",
        subcategories: [
          {
            id: "stories",
            name: "Stories",
            description: "Narrative and creative storytelling",
            exercises: [
              {
                id: "story-writing",
                title: "Creative Story Writing",
                description: "Write engaging short stories with proper structure",
                level: "B1",
                estimatedTime: "45 min",
                difficulty: "Medium",
              },
            ],
          },
          {
            id: "poems",
            name: "Poems",
            description: "Poetry writing and verse",
            exercises: [
              {
                id: "poetry-writing",
                title: "Poetry Composition",
                description: "Create poems using various poetic forms and devices",
                level: "B2",
                estimatedTime: "30 min",
                difficulty: "Hard",
              },
            ],
          },
          {
            id: "scripts",
            name: "Scripts",
            description: "Dialogue and screenplay writing",
            exercises: [
              {
                id: "dialogue-writing",
                title: "Dialogue Creation",
                description: "Write realistic dialogue for different characters",
                level: "B2",
                estimatedTime: "40 min",
                difficulty: "Hard",
              },
            ],
          },
        ],
      },
      {
        id: "academic",
        name: "Academic",
        description: "Formal and academic writing",
        subcategories: [
          {
            id: "essays",
            name: "Essays",
            description: "Argumentative and analytical essays",
            exercises: [
              {
                id: "persuasive-essays",
                title: "Persuasive Essay Writing",
                description: "Write compelling argumentative essays",
                level: "B2",
                estimatedTime: "60 min",
                difficulty: "Hard",
              },
            ],
          },
          {
            id: "reports",
            name: "Reports",
            description: "Research and analytical reports",
            exercises: [
              {
                id: "research-reports",
                title: "Research Report Writing",
                description: "Structure and write comprehensive research reports",
                level: "C1",
                estimatedTime: "90 min",
                difficulty: "Hard",
              },
            ],
          },
          {
            id: "thesis",
            name: "Thesis",
            description: "Academic thesis and dissertation writing",
            exercises: [
              {
                id: "thesis-structure",
                title: "Thesis Organization",
                description: "Learn to structure and organize academic theses",
                level: "C2",
                estimatedTime: "120 min",
                difficulty: "Hard",
              },
            ],
          },
        ],
      },
      {
        id: "professional",
        name: "Professional",
        description: "Business and professional writing",
        subcategories: [
          {
            id: "emails",
            name: "Emails",
            description: "Business email communication",
            exercises: [
              {
                id: "business-emails",
                title: "Professional Email Writing",
                description: "Master formal business email communication",
                level: "B1",
                estimatedTime: "25 min",
                difficulty: "Medium",
              },
            ],
          },
          {
            id: "letters",
            name: "Letters",
            description: "Formal and business letters",
            exercises: [
              {
                id: "formal-letters",
                title: "Formal Letter Writing",
                description: "Write professional business letters",
                level: "B1",
                estimatedTime: "30 min",
                difficulty: "Medium",
              },
            ],
          },
          {
            id: "proposals",
            name: "Proposals",
            description: "Business proposals and presentations",
            exercises: [
              {
                id: "business-proposals",
                title: "Business Proposal Writing",
                description: "Create compelling business proposals",
                level: "C1",
                estimatedTime: "75 min",
                difficulty: "Hard",
              },
            ],
          },
        ],
      },
    ],
    sampleExercises: [
      {
        id: "writing-prompts",
        title: "Daily Writing Prompts",
        description: "Practice writing with creative daily prompts",
        level: "A2",
        estimatedTime: "20 min",
        difficulty: "Easy",
      },
    ],
  },
}

// Helper functions
export function getTopicData(topic: string): TopicData | null {
  if (isValidTopic(topic)) {
    return TOPIC_DATA[topic]
  }
  return null
}

export function isValidTopic(topic: string): topic is TopicType {
  return topic in TOPIC_DATA
}

export function getExercisesByLevel(topicData: TopicData, level: Level): Exercise[] {
  const exercises: Exercise[] = []
  
  topicData.categories.forEach(category => {
    category.subcategories.forEach(subcategory => {
      exercises.push(...subcategory.exercises.filter(exercise => exercise.level === level))
    })
  })
  
  return exercises
}

export function getExercisesByCategory(topicData: TopicData, categoryId: string): Exercise[] {
  const category = topicData.categories.find(cat => cat.id === categoryId)
  if (!category) return []
  
  const exercises: Exercise[] = []
  category.subcategories.forEach(subcategory => {
    exercises.push(...subcategory.exercises)
  })
  
  return exercises
}

export function getExercisesBySubcategory(topicData: TopicData, categoryId: string, subcategoryId: string): Exercise[] {
  const category = topicData.categories.find(cat => cat.id === categoryId)
  if (!category) return []
  
  const subcategory = category.subcategories.find(sub => sub.id === subcategoryId)
  if (!subcategory) return []
  
  return subcategory.exercises
}