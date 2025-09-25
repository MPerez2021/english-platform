"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { exercisesService } from "@/lib/services/exercises.service";
import { Exercise, EXERCISE_TYPE_CODES, EXERCISE_TYPE_NAMES } from "@/lib/types/exercise.types";
import { Lesson } from "@/lib/types/lesson.types";
import {
  exerciseFormSchema,
  ExerciseFormSchema,
  validateExerciseContentByType,
} from "@/lib/validations/exercise.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { FormActionButtons } from "./form-action-buttons";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface ExerciseFormProps {
  exercise?: Exercise;
  lessons: Lesson[];
  mode: "create" | "edit";
}

export function ExerciseForm({ exercise, lessons, mode }: ExerciseFormProps) {
  const router = useRouter();
  const [options, setOptions] = useState<string[]>(
    exercise?.content && "options" in exercise.content && Array.isArray(exercise.content.options)
      ? exercise.content.options
      : ["", ""]
  );
  const [answers, setAnswers] = useState<string[]>(
    exercise?.content && "answer" in exercise.content && Array.isArray(exercise.content.answer)
      ? exercise.content.answer
      : [""]
  );

  const form = useForm<ExerciseFormSchema>({
    resolver: zodResolver(exerciseFormSchema),
    defaultValues: {
      lesson_id: exercise?.lesson_id || "",
      exercise_types: exercise?.exercise_types,
      instructions: exercise?.instructions || "",
      display_order: exercise?.display_order || 1,
      content: exercise?.content || {
        question: "",
        answer: [""],
        options: null,
        answer_explanation: "",
      },
    },
  });

  const watchedExerciseType = useWatch({
    control: form.control,
    name: "exercise_types",
  });


  const requiresOptions = watchedExerciseType === EXERCISE_TYPE_CODES.FILL_BLANK ||
                         watchedExerciseType === EXERCISE_TYPE_CODES.READING_COMPREHENSION;

  const handleCancel = () => {
    router.back();
  };

  const addOption = () => {
    const newOptions = [...options, ""];
    setOptions(newOptions);
    updateFormContent({ options: newOptions });
  };

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    updateFormContent({ options: newOptions });
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    updateFormContent({ options: newOptions });
  };

  const addAnswer = () => {
    const newAnswers = [...answers, ""];
    setAnswers(newAnswers);
    updateFormContent({ answer: newAnswers });
  };

  const removeAnswer = (index: number) => {
    const newAnswers = answers.filter((_, i) => i !== index);
    setAnswers(newAnswers);
    updateFormContent({ answer: newAnswers });
  };

  const updateAnswer = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    updateFormContent({ answer: newAnswers });
  };

  const updateFormContent = (updates: Partial<Record<string, unknown>>) => {
    const currentContent = form.getValues("content");
    const newContent = {
      ...currentContent,
      ...updates,
    };

    // Set options to null for free text exercises
    if (!requiresOptions) {
      newContent.options = null;
    }

    form.setValue("content", newContent);
  };

  const onSubmit = async (data: ExerciseFormSchema) => {
    try {
      // Validate content against exercise type
      console.log("ans: " + options)
      if(!answers.length){
        toast.error("Exercise content validation failed", {
          description: "Answers cannot be empty",
        });
        return;
      }
      if (data.exercise_types) {
        try {
          validateExerciseContentByType(data.content, data.exercise_types);
        } catch (validationError) {
          toast.error("Exercise content validation failed", {
            description: validationError instanceof Error ? validationError.message : "Invalid content structure",
          });
          return;
        }
      }

      if (mode === "create") {
        await exercisesService.create(data);
        toast.success("Exercise created successfully");
      } else if (exercise) {
        await exercisesService.update({
          id: exercise.id,
          ...data,
        });
        toast.success("Exercise updated successfully");
      }
      router.push("/dashboard/exercises");
      router.refresh();
    } catch (error) {
      console.error("Error saving exercise:", error);
      toast.error("Failed to save exercise", {
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="lesson_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a lesson" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lessons.map((lesson) => (
                        <SelectItem key={lesson.id} value={lesson.id}>
                          {lesson.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The lesson this exercise belongs to
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="exercise_types"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exercise Type</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      // Reset content when exercise type changes
                      if (value === EXERCISE_TYPE_CODES.FILL_BLANK_FREE) {
                        setOptions([]);
                      } else {
                        setOptions(["", ""]);
                      }
                      setAnswers([""]);
                      updateFormContent({
                        question: "",
                        answer: [""],
                        options: value === EXERCISE_TYPE_CODES.FILL_BLANK_FREE ? null : ["", ""],
                        answer_explanation: "",
                      });
                    }}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an exercise type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(EXERCISE_TYPE_NAMES).map(([code, name]) => (
                        <SelectItem key={code} value={code}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The type of exercise to create
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter student-facing instructions (e.g., 'Choose the correct verb form')"
                    className="min-h-20"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Instructions that students will see for this exercise
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="display_order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Order</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    placeholder="Enter display order"
                    {...field}
                    value={field.value?.toString() || ""}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                  />
                </FormControl>
                <FormDescription>
                  The order in which this exercise appears within the lesson
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Exercise Content Section */}
          {watchedExerciseType && (
            <div className="space-y-6 border rounded-lg p-6">
              <h3 className="text-lg font-medium">Exercise Content</h3>

              <FormField
                control={form.control}
                name="content.question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter the exercise question"
                        className="min-h-20"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          updateFormContent({ question: e.target.value });
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      The main question or prompt for this exercise
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Options (only for choice-based exercises) */}
              {requiresOptions && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <FormLabel>Answer Options</FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addOption}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Option
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {options.map((option, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) => updateOption(index, e.target.value)}
                        />
                        {options.length > 2 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeOption(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  <FormDescription>
                    The multiple choice options for students to select from
                  </FormDescription>
                </div>
              )}

              {/* Answers */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <FormLabel>Correct Answers</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addAnswer}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Answer
                  </Button>
                </div>

                <div className="space-y-2">
                  {answers.map((answer, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Answer ${index + 1}`}
                        value={answer}
                        onChange={(e) => updateAnswer(index, e.target.value)}
                      />
                      {answers.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeAnswer(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <FormDescription>
                  The correct answer(s) for this exercise. Multiple answers are accepted.
                </FormDescription>
              </div>

              <FormField
                control={form.control}
                name="content.answer_explanation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer Explanation</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Explain why this is the correct answer"
                        className="min-h-20"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          updateFormContent({ answer_explanation: e.target.value });
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      An explanation of why the answer is correct (shown to students after they answer)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <FormActionButtons
            mode={mode}
            entityName="Exercise"
            isSubmitting={form.formState.isSubmitting}
            onCancel={handleCancel}
          />
        </form>
      </Form>
    </div>
  );
}