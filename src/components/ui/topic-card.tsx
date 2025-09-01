import { cva } from "class-variance-authority"

const topicCard = cva(
  "group border border-transparent hover:shadow-lg transition-colors duration-300",
  {
    variants: {
      topic: {
        vocabulary: "hover:border-chart-1/30",
        grammar: "hover:border-chart-4/30",
        reading: "hover:border-chart-3/30",
        writing: "hover:border-primary/30",
      },
    },
  }
)

const topicIcon = cva(
  "mb-4 mx-auto p-3 rounded-full transition-colors duration-300 w-fit",
  {
    variants: {
      topic: {
        vocabulary: "bg-chart-1/10 group-hover:bg-chart-1/20 text-chart-1",
        grammar: "bg-chart-4/10 group-hover:bg-chart-4/20 text-chart-4",
        reading: "bg-chart-3/10 group-hover:bg-chart-3/20 text-chart-3",
        writing: "bg-primary/10 group-hover:bg-primary/20 text-primary",
      },
    },
  }
)
const topicButton = cva(
  "w-full mx-auto px-4 py-2 border rounded-full transition-all duration-300 font-semibold",
  {
    variants: {
      topic: {
        vocabulary: "border-chart-1/30 text-chart-1/85 group-hover:text-chart-1 group-hover:border-chart-1",
        grammar: "border-chart-4/30 text-chart-4/85 group-hover:text-chart-4 group-hover:border-chart-4",
        reading: "border-chart-3/30 text-chart-3/85 group-hover:text-chart-3 group-hover:border-chart-3",
        writing: "border-primary/30 text-primary/85 group-hover:text-primary group-hover:border-primary",
      },
    },
  }
)
export { topicCard, topicIcon, topicButton }