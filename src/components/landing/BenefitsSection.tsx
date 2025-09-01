import { Gift, Clock, Award, Zap, TrendingUp, Smartphone, Target, ArrowRight } from "lucide-react"
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
  // Strategic color assignment based on benefit themes and existing design patterns
  const benefitColors = [
    'text-primary',    // Learn Without Limits (Gift) - accessibility theme
    'text-chart-3',    // Your Schedule (Clock) - time/progress theme
    'text-chart-4',    // Expert Content (Award) - quality/achievement theme
    'text-chart-1',    // Learn by Doing (Zap) - interactive/energy theme
    'text-chart-4',    // See Your Growth (TrendingUp) - progress/achievement
    'text-primary',    // Learn Anywhere (Smartphone) - accessibility theme
  ]

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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {BENEFITS.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon]
            const iconColor = benefitColors[index]

            return (
              <div key={index} className={`text-center sm:text-left p-6 rounded-2xl `}>
                {/* Icon */}
                <div className="flex justify-center sm:justify-start mb-4">
                  <IconComponent className={`h-8 w-8 ${iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Enhanced Call to Action */}
        <div className="flex justify-center mt-20">
        <a className="group flex items-center px-6 py-3 border-2 rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 font-semibold cursor-pointer">
              <Target className="h-5 w-5 mr-2" />
              Get Started
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
        </div>
      </div>
    </section>
  )
}