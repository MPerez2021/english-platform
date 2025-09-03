import { ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-2">
              Master{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-800/75">
                English
              </span>{" "}
              with Confidence
            </h1>

            <p className="text-lg md:text-2xl text-foreground font-semibold mb-4 text-center lg:text-left">
              Perfect for beginners, intermediate, and advanced learners
            </p>

            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl">
              {SITE_CONFIG.description}
            </p>
            <a
              href="https://www.google.com"
              target="_blank"
              className="w-fit flex items-center mx-auto text-base md:text-lg lg:mx-0 px-8 py-4 h-auto bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground/90 transition-colors duration-200 font-medium rounded-lg group"
            >
              Start your Journey Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Separator Line */}
            <div className="flex items-center justify-center mt-12 mb-8">
              <div className="flex-1 h-px bg-muted-foreground/10"></div>
            </div>

            {/* Statistics */}
            <div className="flex justify-center lg:justify-start">
              <div className="grid grid-cols-3 gap-8 text-center">
                <div className="hover:scale-105 transition-transform duration-200">
                  <div className="text-3xl font-bold mb-1 text-primary">
                    500+
                  </div>
                  <div className="text-xs text-muted-foreground tracking-wide">
                    Exercises
                  </div>
                </div>
                <div className="hover:scale-105 transition-transform duration-200">
                  <div className="text-3xl font-bold mb-1 text-primary">4</div>
                  <div className="text-xs text-muted-foreground tracking-wide">
                    Core Skills
                  </div>
                </div>
                <div className="hover:scale-105 transition-transform duration-200">
                  <div className="text-3xl font-bold mb-1 text-primary">
                    100%
                  </div>
                  <div className="text-xs text-muted-foreground tracking-wide">
                    Free
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-2xl">
              <Image
                src="/images/hero/hero_section.webp"
                alt="English learning platform hero illustration showing students studying"
                width={800}
                height={800}
                className="w-full h-auto max-h-[500px] md:max-h-[600px] lg:max-h-[700px] object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
