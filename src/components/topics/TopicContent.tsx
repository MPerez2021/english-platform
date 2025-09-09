"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  type Exercise,
  getExercisesByCategory,
  getExercisesBySubcategory,
  type TopicData
} from "@/lib/topic-data";
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
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            {getContentTitle()}
          </h1>
          <p className="text-muted-foreground mb-4">
            {getContentDescription()}
          </p>
          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground" role="list" aria-label="Exercise statistics">
            <div className="flex items-center gap-2" role="listitem">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              <span aria-label={`${filteredExercises.length} exercises available`}>{filteredExercises.length} exercises</span>
            </div>
            <div className="flex items-center gap-2" role="listitem">
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span aria-label={`Average time per exercise is ${Math.round(
                  filteredExercises.reduce(
                    (total, exercise) =>
                      total +
                      parseInt(exercise.estimatedTime.replace(" min", "")),
                    0
                  ) / filteredExercises.length
                )} minutes`}>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 gap-6" role="list" aria-label="Available exercises">
          {filteredExercises.map((exercise) => (
            <Card
              key={exercise.id}
              className="group hover:shadow-sm transition-shadow duration-200 border border-border/40 bg-card/50 h-full"
              role="listitem"
            >
              <CardContent className="p-6 h-full flex flex-col">
                {/* Exercise Image - Smaller and at top */}
                <div className="aspect-[16/9] bg-muted/20 rounded-lg mb-4 overflow-hidden">
                  <Image
                    src="/images/topics/grammar.webp"
                    width={320}
                    height={180}
                    alt="Exercise illustration"
                    className="object-cover w-full h-full opacity-80"
                  />
                </div>

                {/* Exercise Title */}
                <h2 className="text-xl font-semibold text-foreground mb-2 leading-tight">
                  {exercise.title}
                </h2>

                {/* Exercise Description - Flexible height */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2 flex-1">
                  {exercise.description}
                </p>

                {/* Exercise Meta - Simplified single line */}
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-6" role="list" aria-label="Exercise details">
                  <div className="flex items-center gap-1" role="listitem">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    <span aria-label={`Estimated time: ${exercise.estimatedTime}`}>{exercise.estimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-2" role="listitem">
                    <span className="font-medium" aria-label={`Proficiency level: ${exercise.level}`}>{exercise.level}</span>
                    <span className="w-1 h-1 bg-muted-foreground rounded-full" aria-hidden="true"></span>
                    <span aria-label={`Difficulty: ${exercise.difficulty}`}>{exercise.difficulty}</span>
                  </div>
                </div>

                {/* Action Button - Full width, minimal, pushed to bottom */}
                <Button
                  variant="outline"
                  className="cursor-pointer w-full border-border/50 hover:bg-accent/5 hover:border-accent/30 hover:text-primary mx-auto"
                  aria-label={`Start ${exercise.title} exercise - ${exercise.description}`}
                >
                  <Play className="h-4 w-4 mr-2" aria-hidden="true" />
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
