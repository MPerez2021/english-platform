import { ArrowRight, Check } from "lucide-react";
import { BENEFITS } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";

export function BenefitsSection() {
  return (
    <section className="py-20 bg-background" aria-labelledby="benefits-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-Column Layout */}
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16">
          {/* Left Side - Image */}
          <div className="hidden lg:flex w-full">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/benefits/learning_with_no_limit.jpg"
                alt="English learning platform interface"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="w-full  space-y-8">
            {/* Headline */}
            <div>
              <h3
                id="benefits-heading"
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
              >
                Why Choose Our Platform?
              </h3>
              <p className="text-lg text-muted-foreground lg:w-2/3">
                Experience the advantages of modern, accessible English
                education designed for every learning style and level.
              </p>
            </div>

            {/* Benefits Checklist */}
            <ul
              className="space-y-4"
              role="list"
              aria-label="Platform benefits"
            >
              {BENEFITS.map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3"
                  role="listitem"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check
                      className="w-4 h-4 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-lg text-foreground font-medium">
                    {benefit.title}
                  </span>
                </li>
              ))}
            </ul>

            {/* Call to Action */}
            <div className="pt-4">
              <Link
                href="/vocabulary"
                className="group inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity duration-300 font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Get started with English learning today"
              >
                Start Learning Free
                <ArrowRight
                  className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
