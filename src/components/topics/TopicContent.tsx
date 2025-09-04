"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type Exercise,
  getExercisesByCategory,
  getExercisesBySubcategory,
  type Level,
  type TopicData
} from "@/lib/topic-data";
import { cn } from "@/lib/utils";
import { BookOpen, Clock, Play } from "lucide-react";
import Image from "next/image";
interface TopicContentProps {
  topicData: TopicData;
  //selectedLevel: Level | null
  selectedCategory: string | null;
  selectedSubcategory: string | null;
}

export function TopicContent({
  topicData,
  selectedCategory,
  selectedSubcategory,
}: TopicContentProps) {
  // Get filtered exercises based on selections
  const getFilteredExercises = (): Exercise[] => {
    let exercises: Exercise[] = [];

    if (selectedSubcategory && selectedCategory) {
      exercises = getExercisesBySubcategory(
        topicData,
        selectedCategory,
        selectedSubcategory
      );
    } else if (selectedCategory) {
      exercises = getExercisesByCategory(topicData, selectedCategory);
    } /* else if (selectedLevel) {
      exercises = getExercisesByLevel(topicData, selectedLevel)
    } */ else {
      // Show all exercises from all categories
      exercises = topicData.categories.flatMap((category) =>
        category.subcategories.flatMap((subcategory) => subcategory.exercises)
      );
    }

    // Apply level filter if selected
    /*     if (selectedLevel) {
      exercises = exercises.filter(exercise => exercise.level === selectedLevel)
    } */

    return exercises;
  };

  const filteredExercises = getFilteredExercises();

  const getDifficultyColor = (difficulty: Exercise["difficulty"]) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800";
    }
  };

  const getLevelColor = (level: Level) => {
    const colors = {
      A1: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
      A2: "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800",
      B1: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800",
      B2: "bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-950 dark:text-pink-300 dark:border-pink-800",
      C1: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800",
      C2: "bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
    };
    return colors[level];
  };

  const getContentTitle = () => {
    if (selectedSubcategory && selectedCategory) {
      const category = topicData.categories.find(
        (c) => c.id === selectedCategory
      );
      const subcategory = category?.subcategories.find(
        (s) => s.id === selectedSubcategory
      );
      return `${category?.name} - ${subcategory?.name}`;
    } else if (selectedCategory) {
      const category = topicData.categories.find(
        (c) => c.id === selectedCategory
      );
      return category?.name;
    } /* else if (selectedLevel) {
      return `${selectedLevel} Level Exercises`
    }  */ else {
      return `All ${topicData.name} Exercises`;
    }
  };

  const getContentDescription = () => {
    if (selectedSubcategory && selectedCategory) {
      const category = topicData.categories.find(
        (c) => c.id === selectedCategory
      );
      const subcategory = category?.subcategories.find(
        (s) => s.id === selectedSubcategory
      );
      return subcategory?.description;
    } else if (selectedCategory) {
      const category = topicData.categories.find(
        (c) => c.id === selectedCategory
      );
      return category?.description;
    } /*  else if (selectedLevel) {
      return `Practice exercises designed for ${selectedLevel} proficiency level`
    } */ else {
      return topicData.bannerSubtitle;
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}

      {/* Content */}
      <div className="flex-1 lg:p-6">
        {/* Content Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            {getContentTitle()}
          </h2>
          <p className="text-muted-foreground mb-4">
            {getContentDescription()}
          </p>
          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>{filteredExercises.length} exercises</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>
                {Math.round(
                  filteredExercises.reduce(
                    (total, exercise) =>
                      total +
                      parseInt(exercise.estimatedTime.replace(" min", "")),
                    0
                  ) / filteredExercises.length
                )}{" "}
                min avg
              </span>
            </div>
          </div>
        </div>

        {/* Exercises Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 gap-4">
          {filteredExercises.map((exercise) => (
            <Card
              key={exercise.id}
              className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-border/50 hover:border-primary/20"
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {exercise.title}
                  </CardTitle>
                  <div className="flex items-center gap-1 ml-2">
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs border",
                        getLevelColor(exercise.level)
                      )}
                    >
                      {exercise.level}
                    </Badge>
                  </div>
                </div>

                <CardDescription className="text-sm leading-relaxed">
                  {exercise.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Exercise Meta Information */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {exercise.estimatedTime}
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-xs border",
                      getDifficultyColor(exercise.difficulty)
                    )}
                  >
                    {exercise.difficulty}
                  </Badge>
                </div>

                {/* Exercise Image Placeholder */}
                <div className="aspect-[4/3] bg-muted/30 rounded-md mb-3 flex items-center justify-center group-hover:bg-muted/50 transition-colors overflow-hidden">
                  <Image
                    src="/images/topics/grammar.webp"
                    width={300}
                    height={225}
                    alt="Grammar exercise illustration"
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Action Button */}
                <Button variant="outline">
                  <Play className="h-4 w-4 mr-2" />
                  Start Exercise
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
