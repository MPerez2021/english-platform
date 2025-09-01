import { Card, CardContent } from "@/components/ui/card"
import { Gift, Clock, Award, Zap, TrendingUp, Smartphone } from "lucide-react"
import { BENEFITS } from "@/lib/constants"

const iconMap = {
  Gift,
  Clock,
  Award,
  Zap,
  TrendingUp,
  Smartphone,
} as const

export function BenefitsSection() {
  // Distribute chart colors across the 6 benefit cards for visual variety
  const benefitColors = ['chart-1', 'chart-4', 'chart-3', 'primary', 'chart-1', 'chart-4']

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the advantages of modern, accessible English education
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFITS.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon]
            const colorClass = benefitColors[index]
            
            return (
              <Card key={index} className={`group hover:shadow-lg transition-all duration-300 border hover:border-${colorClass}/20`}>
                <CardContent className="p-6">
                  {/* Icon */}
                  <div className={`mb-4 p-3 rounded-full bg-${colorClass}/10 group-hover:bg-${colorClass}/20 transition-colors duration-300 w-fit`}>
                    <IconComponent className={`h-6 w-6 text-${colorClass}`} />
                  </div>
                  
                  {/* Title */}
                  <h3 className={`text-lg font-semibold text-foreground mb-2 group-hover:text-${colorClass} transition-colors duration-300`}>
                    {benefit.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-muted-foreground mb-2">
              Join thousands of learners improving their English skills every day
            </p>
            <p className="text-sm text-muted-foreground">
              Start learning today – it&apos;s completely free and takes less than a minute to begin
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}