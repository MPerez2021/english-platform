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
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {TOPICS.map((topic) => {
            // Topic engagement style and learning approach info
            const topicInfo = {
              vocabulary: { style: 'Interactive', approach: 'Visual Learning', color: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800' },
              grammar: { style: 'Systematic', approach: 'Rule-Based', color: 'bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-800' },
              reading: { style: 'Immersive', approach: 'Text Analysis', color: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800' },
              writing: { style: 'Creative', approach: 'Guided Practice', color: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800' },
            };
            const info = topicInfo[topic.id as keyof typeof topicInfo];
            return (
              <div
                key={topic.id}
                className="group bg-card shadow-sm rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:border-muted-foreground/40 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] bg-muted/30 overflow-hidden">
                  <Image
                    src={topic.image}
                    alt={`${topic.name} learning illustration`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />

                  {/* Topic Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${info.color}`}>
                      {info.style}
                    </span>
                  </div>

                  {/* Gradient Overlay for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      {topic.name}
                    </h3>
                    <span className="text-xs text-muted-foreground font-medium">
                      {info.approach}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                    {topic.description}
                  </p>

                  <a
                    href="#"
                    className="group/link inline-flex items-center text-sm font-bold text-primary hover:text-primary/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 rounded-sm"
                    tabIndex={0}
                    role="button"
                    aria-label={`Learn more about ${topic.name}`}
                  >
                    Read More
                    <ArrowUpRight className="h-4 w-4 ml-2 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
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
