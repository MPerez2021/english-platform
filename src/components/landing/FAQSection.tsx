import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQ_ITEMS } from "@/lib/constants"

export function FAQSection() {
  return (
    <section className="py-20 bg-background" aria-labelledby="faq-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h3 id="faq-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get quick answers to common questions about our English learning platform
          </p>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto">
          {FAQ_ITEMS.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16 last:mb-0">
              {/* Category Header */}
              <div className="mb-10">
                <h4 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                  {category.category}
                </h4>
                <div className="w-16 h-0.5 bg-primary" aria-hidden="true"></div>
              </div>

              {/* Questions Accordion */}
              <Accordion type="single" collapsible className="space-y-0" aria-label={`${category.category} questions`}>
                {category.questions.map((item, questionIndex) => {
                  const itemValue = `${categoryIndex}-${questionIndex}`
                  return (
                    <AccordionItem
                      key={itemValue}
                      value={itemValue}
                      className="border-b border-border/50 last:border-b-0 "
                    >
                      <AccordionTrigger className="cursor-pointer" aria-label={`Question: ${item.question}`}>
                        <span className="text-base md:text-lg font-semibold text-foreground pr-8 leading-tight text-left">
                          {item.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-8 -mx-6 px-6" role="region" aria-label={`Answer to: ${item.question}`}>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                          {item.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}