import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  PenTool,
  FileText,
  Edit3,
  Users,
  Target,
  Clock,
  Award,
  Check,
} from "lucide-react";
import { TOPICS } from "@/lib/constants";
import { topicCard, topicIcon, topicButton } from "@/components/ui/topic-card";

const iconMap = {
  BookOpen,
  PenTool,
  FileText,
  Edit3,
} as const;

export function TopicsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Master All English Skills
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Comprehensive learning paths designed to improve every aspect of
            your English proficiency
          </p>

          {/* Learning Statistics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            <div className="text-center">
              <div className="mb-2 mx-auto w-12 h-12 bg-chart-1/10 rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-chart-1" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                500+
              </div>
              <div className="text-sm text-muted-foreground">
                Interactive Exercises
              </div>
            </div>

            <div className="text-center">
              <div className="mb-2 mx-auto w-12 h-12 bg-chart-4/10 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-chart-4" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">4</div>
              <div className="text-sm text-muted-foreground">
                Core English Skills
              </div>
            </div>

            <div className="text-center">
              <div className="mb-2 mx-auto w-12 h-12 bg-chart-3/10 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-chart-3" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                Self-Paced
              </div>
              <div className="text-sm text-muted-foreground">Learning</div>
            </div>

            <div className="text-center">
              <div className="mb-2 mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                100%
              </div>
              <div className="text-sm text-muted-foreground">Free Access</div>
            </div>
          </div>
        </div>

        {/* All Levels Simple Badge */}
        <div className="flex items-center justify-center mb-16">
          <div className="flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3 border border-primary/20">
            <Check className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              All Skill Levels Supported
            </span>
          </div>
        </div>

        {/* Topic Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {TOPICS.map((topic) => {
            const IconComponent = iconMap[topic.icon];

            return (
              <Card key={topic.id} className={topicCard({ topic: topic.id })}>
                <CardContent className="p-6 text-center h-full flex flex-col">
                  {/* Icon */}
                  <div className={topicIcon({ topic: topic.id })}>
                    <IconComponent className={`h-8 w-8 `} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {topic.name}
                  </h3>

                  {/* Description */}
                  <p className="text-foreground mb-4 text-base">
                    {topic.description}
                  </p>

                  {/* Practice Summary */}
                  <div className="mb-6 flex-grow">
                    <p
                      className={`text-xs text-muted-foreground leading-relaxed italic`}
                    >
                      {topic.summary}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <a className={topicButton({ topic: topic.id })}>
                    Start Learning
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center">
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Start Your English Journey?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of learners who have improved their English skills
              with our comprehensive platform
            </p>

            {/* Popular Learning Paths */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <div className="bg-chart-1/5 rounded-lg p-4 border border-chart-1/20">
                <div className="text-sm font-semibold text-chart-1 mb-1">
                  Popular Choice
                </div>
                <div className="text-foreground font-medium">
                  Start with Vocabulary
                </div>
                <div className="text-xs text-muted-foreground">
                  Build your foundation
                </div>
              </div>

              <div className="bg-chart-4/5 rounded-lg p-4 border border-chart-4/20">
                <div className="text-sm font-semibold text-chart-4 mb-1">
                  Recommended
                </div>
                <div className="text-foreground font-medium">
                  Grammar Foundations
                </div>
                <div className="text-xs text-muted-foreground">
                  Perfect for beginners
                </div>
              </div>

              <div className="bg-chart-3/5 rounded-lg p-4 border border-chart-3/20">
                <div className="text-sm font-semibold text-chart-3 mb-1">
                  Challenge Mode
                </div>
                <div className="text-foreground font-medium">
                  Full Skills Assessment
                </div>
                <div className="text-xs text-muted-foreground">
                  Test your level first
                </div>
              </div>
            </div>

            {/* Main CTA */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-chart-4 hover:from-primary/90 hover:to-chart-4/90 text-white px-8 py-4 text-lg font-semibold"
              >
                Begin Learning Today - It&apos;s Free!
              </Button>

              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-1 text-chart-1" />
                  No Account Required
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-chart-4" />
                  Start in 30 Seconds
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-chart-3" />
                  Join 10,000+ Learners
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
