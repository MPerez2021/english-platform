import { Card, CardContent } from "@/components/ui/card"
import { Target, BarChart3, PlayCircle, CheckCircle, ArrowRight } from "lucide-react"
import { HOW_IT_WORKS_STEPS } from "@/lib/constants"

const iconMap = {
  Target,
  BarChart3,
  PlayCircle, 
  CheckCircle,
} as const

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start your English learning journey in four simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const IconComponent = iconMap[step.icon]
            const isLastStep = index === HOW_IT_WORKS_STEPS.length - 1
            
            return (
              <div key={step.step} className="relative">
                {/* Step Card */}
                <Card className="text-center h-full hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6">
                    {/* Step Number */}
                    <div className="mb-4 mx-auto w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>
                    
                    {/* Icon */}
                    <div className="mb-4 mx-auto p-3 rounded-full bg-primary/10 w-fit">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Arrow connector for desktop */}
                {!isLastStep && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="bg-background rounded-full p-2 border shadow-sm">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                )}

                {/* Vertical connector for mobile/tablet */}
                {!isLastStep && (
                  <div className="lg:hidden flex justify-center mt-4 mb-4">
                    <div className="w-px h-8 bg-border"></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-2">Ready to get started?</p>
          <p className="text-sm text-muted-foreground">
            Choose your first topic and begin your learning journey today!
          </p>
        </div>
      </div>
    </section>
  )
}