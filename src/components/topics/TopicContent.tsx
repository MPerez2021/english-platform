"use client";

import { Button } from "@/components/ui/button";
import {
  type Exercise,
  getExercisesByCategory,
  getExercisesBySubcategory,
  type TopicData,
} from "@/lib/topic-data";
import { BookOpen, Clock } from "lucide-react";
import Link from "next/link";

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
          <div
            className="flex items-center gap-6 text-sm text-muted-foreground"
            role="list"
            aria-label="Exercise statistics"
          >
            <div className="flex items-center gap-2" role="listitem">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              <span
                aria-label={`${filteredExercises.length} exercises available`}
              >
                {filteredExercises.length} exercises
              </span>
            </div>
            <div className="flex items-center gap-2" role="listitem">
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span
                aria-label={`Average time per exercise is ${Math.round(
                  filteredExercises.reduce(
                    (total, exercise) =>
                      total +
                      parseInt(exercise.estimatedTime.replace(" min", "")),
                    0
                  ) / filteredExercises.length
                )} minutes`}
              >
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

        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Available exercises"
        >
          {filteredExercises.map((exercise) => (
            <Button
              variant={"outline"}
              key={exercise.id}
              className="h-full w-full py-6 px-6 "
              asChild
            >
              <Link
                href={"https://google.com"}
                className="flex items-center gap-6 w-full !hover:!bg-red-500"
              >
                {/* Left Section: Text Content */}
                <div className="flex flex-col w-full text-wrap gap-3">
                  <div className="flex justify-between">
                    <h2 className="text-xl font-semibold text-foreground leading-tight">{exercise.title}</h2>
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-2xl w-fit">{exercise.level}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {exercise.description}
                  </p>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
