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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How Learning Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Follow our proven learning pathway designed by education experts
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="max-w-7xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            {/* Timeline Line */}
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-border"></div>
              {/* Step Points */}
              <div className="flex justify-around">
                {HOW_IT_WORKS_STEPS.map((step) => {
                  return (
                    <div key={step.step} className="relative flex flex-col items-center">
                      {/* Large Step Number */}
                      <div className={`w-16 h-16 ${step.color} text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg mb-8 -mt-8`}>
                        {step.step}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            {/* Step Content Blocks */}
            <div className="grid grid-cols-4 gap-8">
              {HOW_IT_WORKS_STEPS.map((step) => {
                const IconComponent = iconMap[step.icon]
                return (
                  <div key={step.step} className="border-l-4 border border-t-transparent border-b-transparent border-r-transparent pl-6">
                    {/* Fixed Height Title Container */}
                    <div className="h-20 flex items-center mb-6">
                      <IconComponent className={`h-8 w-8 ${step.textColor} mr-3 flex-shrink-0`} />
                      <h3 className="text-2xl font-bold text-foreground leading-tight">
                        {step.title}
                      </h3>
                    </div>
                    {/* Description - now aligned across all columns */}
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mobile/Tablet Vertical Layout */}
          <div className="lg:hidden space-y-12">
            {HOW_IT_WORKS_STEPS.map((step, index) => {
              const IconComponent = iconMap[step.icon]
              const isLastStep = index === HOW_IT_WORKS_STEPS.length - 1

              return (
                <div key={step.step} className="relative">
                  <div className="flex items-start">
                    {/* Step Number & Icon */}
                    <div className="flex flex-col items-center mr-6">
                      <div className={`w-14 h-14 ${step.color} text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg`}>
                        {step.step}
                      </div>
                      {!isLastStep && (
                        <div className="w-1 h-12 bg-border mt-4"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      {/* Fixed Height Title Container for Mobile */}
                      <div className="h-16 flex items-center mb-4">
                        <IconComponent className={`h-6 w-6 ${step.textColor} mr-3 flex-shrink-0`} />
                        <h3 className="text-xl font-bold text-foreground leading-tight">
                          {step.title}
                        </h3>
                      </div>

                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick Start Section */}
        <div className="text-center mt-20">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Choose your preferred starting point and begin learning immediately
          </p>
          {/* Quick Start Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a className="group flex items-center px-6 py-3 border-2 rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 font-semibold cursor-pointer">
              <Target className="h-5 w-5 mr-2" />
              Browse All Topics
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a className="group flex items-center px-6 py-3 border-2 rounded-full text-foreground hover:bg-muted/50 transition-all duration-300 font-semibold cursor-pointer">
              <BarChart3 className="h-5 w-5 mr-2" />
              Take Assessment
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}