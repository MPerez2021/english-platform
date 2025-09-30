import {
  Target,
  BarChart3,
  PlayCircle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";

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
        {/* Two Column Layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Content */}
            <div>
              {/* Headline */}
              <div className="mb-8 lg:mb-12">
                <h3 id="how-it-works-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  How it Works
                </h3>
                <p className="text-lg text-muted-foreground">
                  Getting started is as easy as 1, 2, 3...
                </p>
              </div>

              {/* Steps List */}
              <div className="space-y-6 mb-8" role="list" aria-label="Learning process steps">
                {HOW_IT_WORKS_STEPS.map((step, index) => {
                  const IconComponent = iconMap[step.icon];
                  return (
                    <div
                      key={step.step}
                      className="flex items-start gap-4 group"
                      role="listitem"
                      aria-label={`Step ${index + 1}: ${step.title}`}
                    >
                      {/* Icon Container */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 flex items-center justify-center" aria-hidden="true">
                          <IconComponent className="h-6 w-6 text-primary" aria-hidden="true" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-1">
                        <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
                          <span className="text-foreground">{index + 1}.</span>
                          {step.title}
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link href="/vocabulary" className="group flex items-center px-6 py-3 border border-primary text-primary-foreground bg-primary hover:bg-primary/90 transition-colors duration-200 font-medium rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2" aria-label="Browse all English learning topics available">
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

            {/* Right Side - Image */}
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <Image
                src="/images/benefits/learning_with_no_limit.jpg"
                alt="English learning experience"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
