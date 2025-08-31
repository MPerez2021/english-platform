import { Header } from "@/components/layout/Header"
import { HeroSection } from "@/components/landing/HeroSection"
import { TopicsSection } from "@/components/landing/TopicsSection"
import { HowItWorksSection } from "@/components/landing/HowItWorksSection"
import { BenefitsSection } from "@/components/landing/BenefitsSection"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TopicsSection />
        <HowItWorksSection />
        <BenefitsSection />
      </main>
    </div>
  )
}