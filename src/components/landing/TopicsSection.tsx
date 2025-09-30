import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { TOPICS } from "@/lib/constants";
import Link from "next/link";
import { Separator } from "../ui/separator";

export function TopicsSection() {
  return (
    <section className="py-16 bg-background" aria-labelledby="topics-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="text-center mb-12">
          <h3
            id="topics-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Master All English Skills
          </h3>
          <p className="text-base text-muted-foreground max-w-xl mx-auto mb-4">
            Comprehensive learning paths designed to improve every aspect of
            your English proficiency
          </p>
        </div>

        {/* Topics Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          role="list"
          aria-label="English learning topics"
        >
          {TOPICS.map((topic) => {
            return (
              <div key={topic.id} className="p-2">
                {/* Image Container */}
                <div className="relative aspect-[5/3] rounded-lg overflow-hidden">
                  <Image
                    src={topic.image}
                    alt={`${topic.name} learning illustration`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                </div>
                <div
                  key={topic.id}
                  className="group overflow-hidden"
                  role="listitem"
                >
                  {/* Content */}
                  <div className="pt-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-2xl font-semibold text-foreground">
                        {topic.name}
                      </h4>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 pr-4">
                      {topic.description}
                    </p>
                    <Separator className="my-4"/>

                    <Link
                      href={`/${topic.id}`}
                      className="group/link w-full mb-3 inline-flex justify-between items-center text-sm font-bold text-primary hover:text-primary/80 transition-colors duration-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                      aria-label={`Start learning ${topic.name} - ${topic.description}`}
                    >
                      Learn
                      <ArrowUpRight
                        className="h-4 w-4 ml-2 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h4 className="text-xl font-semibold text-foreground mb-4">
            Ready to Start Learning?
          </h4>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Join thousands of learners improving their English skills with our
            comprehensive platform
          </p>

          <Button
            size="lg"
            className="px-8 py-3 font-semibold"
            aria-label="Begin learning English today - completely free"
          >
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
