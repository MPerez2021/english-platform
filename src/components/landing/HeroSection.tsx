import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

export function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br bg-primary/10 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              {SITE_CONFIG.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              {SITE_CONFIG.description}
            </p>
            <Button size="lg" className="text-lg px-8 py-4 h-auto bg-gradient-to-r from-primary to-chart-4 hover:from-primary/90 hover:to-chart-4/90">
              Start your Journey Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Hero Image Placeholder */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg aspect-square">
              {/* Placeholder for hero image */}
              <div className="w-full h-full bg-gradient-to-br from-chart-1/15 via-primary/10 to-chart-3/15 rounded-3xl border-2 border-dashed border-primary/30 flex flex-col items-center justify-center text-center p-8">
                <div className="mb-4 p-4 rounded-full bg-gradient-to-br from-primary/20 to-chart-1/20">
                  <svg 
                    className="w-12 h-12 text-primary" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground">
                  Hero Image Placeholder
                  <br />
                  Recommended: 512x512px
                  <br />
                  Learning illustration or students studying
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}