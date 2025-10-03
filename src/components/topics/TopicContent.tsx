"use client";

import {
  type Exercise,
  getExercisesByCategory,
  getExercisesBySubcategory,
  type TopicData,
} from "@/lib/topic-data";
import { BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import { CefrLevelBadge } from "../ui/cefr-level-badge";

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
      {/* Content */}
      <div className="flex-1 lg:p-6">
        {/* Content Header */}
        <div className="flex flex-col mb-8">
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
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          role="list"
          aria-label="Available exercises"
        >
          {filteredExercises.map((exercise) => (
            <Link
              href={"https://google.com"}
              className="flex items-center gap-6 w-full h-full p-6 border-b-2 rounded bg-card-background hover:bg-muted"
              key={exercise.id}
            >
              {/* Left Section: Text Content */}
              <span className="flex flex-col w-full text-wrap gap-3">
                <span className="flex justify-between">
                  <h2 className="text-xl font-semibold text-foreground leading-tight">
                    {exercise.title}
                  </h2>
                  <CefrLevelBadge
                    key={exercise.level}
                    level={exercise.level}
                    className="h-full"
                  />
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {exercise.description}
                </p>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
