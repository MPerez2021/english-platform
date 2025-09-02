import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { TOPICS } from "@/lib/constants";

export function TopicsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Master All English Skills
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto mb-4">
            Comprehensive learning paths designed to improve every aspect of
            your English proficiency
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="px-3 py-1.5 bg-muted/50 text-muted-foreground rounded-full border border-border">
              500+ Exercises
            </span>
            <span className="px-3 py-1.5 bg-muted/50 text-muted-foreground rounded-full border border-border">
              4 Core Skills
            </span>
            <span className="px-3 py-1.5 bg-muted/50 text-muted-foreground rounded-full border border-border">
              Self-Paced
            </span>
            <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-full border border-primary/20 font-medium">
              100% Free
            </span>
            <span className="px-3 py-1.5 bg-chart-1/10 text-chart-1 rounded-full border border-chart-1/20 font-medium">
              All Levels
            </span>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {TOPICS.map((topic) => {
            return (
              <div
                key={topic.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 hover:border-muted-foreground/30"
              >
                {/* Image Placeholder */}
                <div className="relative aspect-[4/3] bg-muted/30">
                  <Image
                    src={topic.image}
                    alt={`${topic.name} learning illustration`}
                    fill
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {topic.name}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {topic.description}
                  </p>

                  <a className="w-full text-sm font-bold text-primary flex items-center justify-start">
                    Read More
                    <ArrowUpRight className="h-4   w-4 ml-2" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Ready to Start Learning?
          </h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Join thousands of learners improving their English skills with our
            comprehensive platform
          </p>

          <Button size="lg" className="px-8 py-3 font-semibold">
            Begin Learning Today - It&apos;s Free!
          </Button>

          <p className="text-xs text-muted-foreground mt-3">
            No account required • Start in 30 seconds
          </p>
        </div>
      </div>
    </section>
  );
}
