import { cva } from "class-variance-authority"

const topicCard = cva(
  "!border-transparent hover:!border-muted-foreground/30 !hover:shadow-sm transition-colors duration-200 bg-card",
  {
    variants: {
      topic: {
        vocabulary: "",
        grammar: "",
        reading: "",
        writing: "",
      },
    },
  }
)

const topicIcon = cva(
  "",
  {
    variants: {
      topic: {
        vocabulary: "",
        grammar: "",
        reading: "",
        writing: "",
      },
    },
  }
)

const topicButton = cva(
  "",
  {
    variants: {
      topic: {
        vocabulary: "",
        grammar: "",
        reading: "",
        writing: "",
      },
    },
  }
)

export { topicCard, topicIcon, topicButton }