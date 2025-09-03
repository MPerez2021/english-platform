import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Trophy,
  Lightbulb,
  Target,
  Users,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 flex flex-col justify-center items-center bg-gradient-to-br min-h-screen overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top left floating circle */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-sm animate-float" />

        {/* Top right gradient orb */}
        <div className="absolute top-32 right-20 w-48 h-48 bg-gradient-to-br from-primary/8 to-purple-500/8 rounded-full blur-md animate-float-reverse" />

        {/* Bottom left shape */}
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-accent/10 rounded-full animate-pulse" />

        {/* Middle right floating element */}
        <div className="absolute top-1/2 right-8 w-16 h-16 bg-primary/10 rounded-full animate-float-slow" />

        {/* Bottom center subtle pattern */}
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-lg animate-float" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              className="w-fit flex items-center mx-auto text-base md:text-lg lg:mx-0 px-8 py-4 h-auto bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground/90 transition-colors duration-200 font-medium rounded-[0.8rem] group"
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

          {/* Hero Image with Information */}
          <div className="relative flex justify-center items-center">
            <div className="w-full max-w-4xl relative">
              {/* Main content area - overlapping layout */}
                {/* Hero Image - Full width */}
                <div className="relative mx-auto max-w-4xl">
                  {/* Hero Image */}
                  <div className="relative z-10 ">
                    <Image
                      src="/images/hero/hero_section.webp"
                      alt="English learning platform hero illustration showing students studying"
                      width={600}
                      height={600}
                      className="w-full h-auto max-h-[250px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-[550px] xl:max-h-[650px] object-contain mx-auto"
                      priority
                    />
                  </div>

                  {/* Floating decorative elements - responsive */}
                  <div className="hidden sm:block absolute top-12 left-8 sm:top-16 sm:left-12 md:top-10 md:left-24 p-2 sm:p-2.5 md:p-3 bg-card/90 backdrop-blur-sm rounded-full shadow-xl border border-border/50 hover:scale-110 transition-transform duration-200">
                    <Lightbulb className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-chart-3" />
                  </div>

                  <div className="hidden md:block absolute top-20 right-12 md:top-24 md:right-12 p-2 md:p-3 bg-card/90 backdrop-blur-sm rounded-full shadow-xl border border-border/50 hover:scale-110 transition-transform duration-200">
                    <Trophy className="w-4 h-4 md:w-5 md:h-5 text-chart-3" />
                  </div>

                  <div className="hidden sm:block absolute bottom-20 left-12 sm:bottom-24 sm:left-16 md:bottom-32 md:left-15 p-2 sm:p-2.5 bg-card/90 backdrop-blur-sm rounded-full shadow-xl border border-border/50 hover:scale-110 transition-transform duration-200">
                    <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-chart-4" />
                  </div>

                  <div className="hidden sm:block absolute bottom-8 right-12 sm:bottom-12 sm:right-16 md:bottom-16 md:right-16 p-2 bg-card/90 backdrop-blur-sm rounded-full shadow-xl border border-border/50 hover:scale-110 transition-transform duration-200">
                    <Target className="w-3 h-3 sm:w-4 sm:h-4 text-chart-4" />
                  </div>
                </div>

                {/* Join Community Card - Bottom Left */}
                <div className="absolute -top-5 left-0 sm:top-auto sm:bottom-4 sm:left-4 md:bottom-4 md:left-25 lg:bottom-5 lg:left-8 flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-muted/50 backdrop-blur-xl rounded-lg sm:rounded-xl border border-primary/20 shadow-xl z-20">
                  <div className="p-1 sm:p-1.5 bg-primary/20 rounded-full border border-primary/10">
                    <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-background-foreground">
                      Join Community
                    </div>
                    <div className="text-xs text-muted-foreground hidden sm:block">
                      Learn together
                    </div>
                  </div>
                </div>

                {/* All Levels Card - Top Right */}
                <div className="absolute -top-5 right-0 sm:top-4 sm:right-4 md:top-4 md:right-20 lg:top-8 lg:right-8 xl:top-8 xl:right-10 flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-muted/50 backdrop-blur-xl rounded-lg sm:rounded-xl border border-chart-4/20 shadow-xl z-20">
                  <div className="p-1 sm:p-1.5 bg-chart-4/20 rounded-full border border-chart-4/10">
                    <GraduationCap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-chart-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-background-foreground">
                      All Levels
                    </div>
                    <div className="text-xs text-muted-foreground hidden sm:block">
                      Start anywhere
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
