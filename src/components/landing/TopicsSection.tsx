import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, PenTool, FileText, Edit3 } from "lucide-react"
import { TOPICS } from "@/lib/constants"

const iconMap = {
  BookOpen,
  PenTool, 
  FileText,
  Edit3,
} as const

export function TopicsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Master All English Skills
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive learning paths designed to improve every aspect of your English proficiency
          </p>
        </div>

        {/* Topic Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TOPICS.map((topic) => {
            const IconComponent = iconMap[topic.icon]
            
            return (
              <Card key={topic.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                <CardContent className="p-6 text-center h-full flex flex-col">
                  {/* Icon */}
                  <div className="mb-4 mx-auto p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 w-fit">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {topic.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground mb-6 flex-grow">
                    {topic.description}
                  </p>
                  
                  {/* CTA Button */}
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                  >
                    Learn
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}