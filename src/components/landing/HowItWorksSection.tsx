import {
  Target,
  BarChart3,
  PlayCircle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import Link from "next/link";

const iconMap = {
  Target,
  BarChart3,
  PlayCircle,
  CheckCircle,
} as const;

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-background" aria-labelledby="how-it-works-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="text-center mb-16">
          <h3 id="how-it-works-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How it Works?
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple steps to get you started on your English learning journey
          </p>
        </div>

        {/* Steps Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" role="list" aria-label="Learning process steps">
            {HOW_IT_WORKS_STEPS.map((step, index) => {
              const IconComponent = iconMap[step.icon];
              return (
                <div
                  key={step.step}
                  className="text-center group hover:shadow-sm transition-all duration-300 p-4 rounded-sm relative"
                  role="listitem"
                  aria-label={`Step ${index + 1}: ${step.title}`}
                >
                  {/* Icon Container with Corner Number */}
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-primary/5 rounded-sm flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_4px_6px_-1px_oklch(0.5393_0.2713_286.7462_/_0.2)] relative" aria-hidden="true">
                      <IconComponent className="h-8 w-8 text-primary" aria-hidden="true" />
                      {/* Step Number Badge */}
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                        <span className="text-primary-foreground text-xs font-semibold" aria-label={`Step ${index + 1}`}>
                          {index + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Content */}
                  <h4 className="text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Start Section */}
        <div className="text-center mt-16">
          <h4 className="text-2xl font-bold text-foreground mb-3">
            Ready to Get Started?
          </h4>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Choose your preferred starting point and begin learning immediately
          </p>
          {/* Quick Start Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/vocabulary" className="group flex items-center px-6 py-3 border border-primary text-primary hover:bg-primary/90 hover:text-primary-foreground transition-colors duration-200 font-medium rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2" aria-label="Browse all English learning topics available">
              <Target className="h-4 w-4 mr-2" aria-hidden="true" />
              Browse All Topics
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>
            <Link href="/assessment" className="group flex items-center px-6 py-3 border border-border text-foreground hover:bg-muted/50 transition-colors duration-200 font-medium rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2" aria-label="Take a skill assessment to find your English level">
              <BarChart3 className="h-4 w-4 mr-2" aria-hidden="true" />
              Take Assessment
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
