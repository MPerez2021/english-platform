import { Gift, Clock, Award, Zap, TrendingUp, Smartphone, Target, ArrowRight } from "lucide-react"
import { BENEFITS } from "@/lib/constants"
import Link from "next/link"

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
    <section className="py-20 bg-background" aria-labelledby="benefits-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="text-center mb-16">
          <h3 id="benefits-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Our Platform?
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the advantages of modern, accessible English education
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12" role="list" aria-label="Platform benefits">
          {BENEFITS.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon]
            const iconColor = benefitColors[index]

            return (
              <div key={index} className={`text-center sm:text-left p-6 rounded-2xl `} role="listitem">
                {/* Icon */}
                <div className="flex justify-center sm:justify-start mb-4">
                  <IconComponent className={`h-8 w-8 ${iconColor}`} aria-hidden="true" />
                </div>

                {/* Title */}
                <h4 className="text-xl font-semibold text-foreground mb-3">
                  {benefit.title}
                </h4>

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
        <Link href="/vocabulary" className="group flex items-center px-6 py-3 border-2 rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2" aria-label="Get started with English learning today">
              <Target className="h-5 w-5 mr-2" aria-hidden="true" />
              Get Started
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
        </div>
      </div>
    </section>
  )
}