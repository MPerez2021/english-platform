import {
  Target,
  BarChart3,
  PlayCircle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

const iconMap = {
  Target,
  BarChart3,
  PlayCircle,
  CheckCircle,
} as const;

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How it Works?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple steps to get you started on your English learning journey
          </p>
        </div>

        {/* Steps Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS_STEPS.map((step, index) => {
              const IconComponent = iconMap[step.icon];
              return (
                <div
                  key={step.step}
                  className="text-center group hover:shadow-sm transition-all duration-300 p-4 rounded-sm relative"
                >
                  {/* Icon Container with Corner Number */}
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-primary/5 rounded-sm flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_4px_6px_-1px_oklch(0.5393_0.2713_286.7462_/_0.2)] relative">
                      <IconComponent className="h-8 w-8 text-primary" />
                      {/* Step Number Badge */}
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                        <span className="text-primary-foreground text-xs font-semibold">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
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
          <h3 className="text-2xl font-bold text-foreground mb-3">
            Ready to Get Started?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Choose your preferred starting point and begin learning immediately
          </p>
          {/* Quick Start Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <a className="group flex items-center px-6 py-3 border border-primary text-primary hover:bg-primary/90 hover:text-primary-foreground transition-colors duration-200 font-medium rounded-lg cursor-pointer">
              <Target className="h-4 w-4 mr-2" />
              Browse All Topics
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a className="group flex items-center px-6 py-3 border border-border text-foreground hover:bg-muted/50 transition-colors duration-200 font-medium rounded-lg cursor-pointer">
              <BarChart3 className="h-4 w-4 mr-2" />
              Take Assessment
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
