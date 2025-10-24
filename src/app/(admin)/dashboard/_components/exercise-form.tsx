"use client";

import { Button } from "@/components/ui/button";
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
import { exercisesService } from "@/lib/services/exercises.service";
import {
  Exercise,
  EXERCISE_TYPE_CODES,
  EXERCISE_TYPE_NAMES,
} from "@/lib/types/exercise.types";
import { Lesson } from "@/lib/types/lesson.types";
import {
  exerciseFormSchema,
  ExerciseFormSchema,
} from "@/lib/validations/exercise.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { FormActionButtons } from "./form-action-buttons";
import QuestionEditor, { QuestionPart } from "./question-editor";
import { useState, useEffect } from "react";

interface ExerciseFormProps {
  exercise?: Exercise;
  lessons: Lesson[];
  mode: "create" | "edit";
}

export function ExerciseForm({ exercise, lessons, mode }: ExerciseFormProps) {
  const router = useRouter();
  const [questionParts, setQuestionParts] = useState<QuestionPart[]>([]);

  const form = useForm<ExerciseFormSchema>({
    resolver: zodResolver(exerciseFormSchema),
    defaultValues: (() => {
      const base = {
        lesson_id: exercise?.lesson_id || "",
        exercise_types: exercise?.exercise_types || "FILL_BLANK",
        instructions: exercise?.instructions || "",
      };

      // --- FILL_BLANK (multiple choice type) ---
      if (
        exercise?.exercise_types === "FILL_BLANK" ||
        exercise?.exercise_types == "READING_COMPREHENSION"
      ) {
        return {
          ...base,
          content: {
            question: exercise?.content?.question || "",
            answers: exercise?.content?.answers?.length
              ? exercise.content.answers
              : [{ value: "" }],
            options: exercise?.content?.options?.length
              ? exercise.content.options
              : undefined,
            answer_explanation: exercise?.content?.answer_explanation || "",
          },
        } as ExerciseFormSchema;
      }

      // --- FILL_BLANK_FREE (user fills input manually) ---
      if (exercise?.exercise_types === "FILL_BLANK_FREE") {
        return {
          ...base,
          content: {
            question_parts: exercise?.content?.question_parts || [
              { id: "", type: "text", value: "" },
            ],
            answers: exercise?.content?.answers?.length
              ? exercise.content.answers
              : [{ value: "" }],
            options: exercise?.content?.options?.length
              ? exercise.content.options
              : undefined,
            answer_explanation: exercise?.content?.answer_explanation || "",
          },
        } as ExerciseFormSchema;
      }
    })(),
  });
  const handleQuestionPartChange = (index: number, part: QuestionPart) => {
    setQuestionParts((prev) => {
      const newParts = [...prev];
      if (index >= newParts.length) {
        newParts.push(part);
      } else {
        newParts[index] = part;
      }
      return newParts;
    });
  };

  const handleQuestionPartRemove = (index: number) => {
    setQuestionParts((prev) => prev.filter((_, i) => i !== index));
  };
  // for answer
  const {
    fields: answerFields,
    append: appendAnswer,
    remove: removeAnswer,
  } = useFieldArray({
    control: form.control,
    name: "content.answers",
  });

  // for options
  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control: form.control,
    name: "content.options",
  });

  const watchedExerciseType = useWatch({
    control: form.control,
    name: "exercise_types",
  });

  // Sync questionParts state to form when it changes
  useEffect(() => {
    if (watchedExerciseType === EXERCISE_TYPE_CODES.FILL_BLANK_FREE && questionParts.length > 0) {
      const formattedParts = questionParts.map((p) => {
        if (p.type === "text") {
          return { type: "text" as const, id: crypto.randomUUID(), value: p.value };
        } else {
          return { type: "blank" as const, id: p.id, hint: p.hint };
        }
      });
      form.setValue("content.question_parts", formattedParts, { shouldValidate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionParts, watchedExerciseType]);

  // Reset form content when exercise type changes and sync questionParts state
  useEffect(() => {
    if (!watchedExerciseType) return;

    // Reset common fields
    form.setValue("content.answers", [{ value: "" }]);
    form.setValue("content.answer_explanation", "");

    if (watchedExerciseType === EXERCISE_TYPE_CODES.FILL_BLANK_FREE) {
      // FILL_BLANK_FREE: use question_parts, no options
      const initialQuestionParts = [
        { id: crypto.randomUUID(), type: "text" as const, value: "" },
      ];
      form.setValue("content.question_parts", initialQuestionParts);
      // @ts-expect-error - Setting undefined for discriminated union transition
      form.setValue("content.question", undefined);
      form.setValue("content.options", undefined);

      // Sync questionParts state after form is updated
      setQuestionParts([{ type: "text", value: "" }]);
    } else {
      // FILL_BLANK / READING_COMPREHENSION: use question string, with options
      form.setValue("content.question", "");
      form.setValue("content.options", [{ value: "" }]);

      // Clear questionParts state when not in FILL_BLANK_FREE mode
      setQuestionParts([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedExerciseType]);

  const requiresOptions =
    watchedExerciseType === EXERCISE_TYPE_CODES.FILL_BLANK ||
    watchedExerciseType === EXERCISE_TYPE_CODES.READING_COMPREHENSION;

  const MAX_OPTIONS =
    watchedExerciseType === EXERCISE_TYPE_CODES.FILL_BLANK ||
    watchedExerciseType === EXERCISE_TYPE_CODES.READING_COMPREHENSION
      ? 3
      : 0;

  const MAX_ANSWERS = 1;

  const handleCancel = () => {
    router.back();
  };

  const onSubmit = async (data: ExerciseFormSchema) => {
    try {
      // Transform form data to match database expectations
      const transformedData = {
        ...data,
        content: {
          ...data.content,
          options: data.content.options || null,
        },
      };

      if (mode === "create") {
        console.log(transformedData);
         await exercisesService.create(transformedData);
        toast.success("Exercise created successfully");
      } else if (exercise) {
        await exercisesService.update({
          id: exercise.id,
          ...transformedData,
        });
        toast.success("Exercise updated successfully");
      }
      /*   router.push("/dashboard/exercises");
      router.refresh(); */
    } catch (error) {
      console.error("Error saving exercise:", error);

      const isDuplicateError = error instanceof Error &&
        (error.message.includes("duplicate key value violates unique constraint") ||
         error.message.includes("unique constraint"));

      toast.error("Failed to save exercise", {
        description: isDuplicateError
          ? "An exercise with this configuration already exists. Please modify the exercise details."
          : error instanceof Error
            ? error.message
            : "An unexpected error occurred",
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
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an exercise type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(EXERCISE_TYPE_NAMES).map(
                        ([code, name]) => (
                          <SelectItem key={code} value={code}>
                            {name}
                          </SelectItem>
                        )
                      )}
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

          {/* Exercise Content Section */}
          {watchedExerciseType && (
            <div className="space-y-6 border rounded-lg p-6">
              <h3 className="text-lg font-medium">Exercise Content</h3>

              {!requiresOptions ? (
                <FormField
                  control={form.control}
                  name="content.question_parts"
                  render={() => (
                    <FormItem>
                      <FormLabel>Question</FormLabel>
                      <FormControl>
                        <QuestionEditor
                          questionParts={questionParts}
                          onChange={handleQuestionPartChange}
                          onRemove={handleQuestionPartRemove}
                        />
                      </FormControl>
                      <FormDescription>
                        Build your question by combining text and blanks
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
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
                        />
                      </FormControl>
                      <FormDescription>
                        The main question or prompt for this exercise
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Options (only for choice-based exercises) */}
              {requiresOptions && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <FormLabel>Options</FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={optionFields.length === MAX_OPTIONS}
                      className="disabled:pointer-events-none"
                      onClick={() => appendOption({ value: "" })}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Option
                    </Button>
                  </div>
                  <FormDescription>
                    Maximum {MAX_OPTIONS} answer(s) allowed (
                    {optionFields.length}/{MAX_OPTIONS})
                  </FormDescription>
                  <div className="space-y-2">
                    {requiresOptions &&
                      optionFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2">
                          <FormField
                            control={form.control}
                            name={`content.options.${index}.value`}
                            render={({ field: inputField }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input
                                    placeholder={`Option ${index + 1}`}
                                    {...inputField}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            disabled={optionFields.length === 1}
                            className="disabled:pointer-events-none"
                            onClick={() => removeOption(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
                  <FormLabel>Correct Answer(s)</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={answerFields.length === MAX_ANSWERS}
                    className="disabled:pointer-events-none"
                    onClick={() => appendAnswer({ value: "" })}
                  >
                    <Plus className="h-4 w-4" />
                    Add Answer
                  </Button>
                </div>
                <FormDescription>
                  Maximum {MAX_ANSWERS} answer(s) allowed ({answerFields.length}
                  /{MAX_ANSWERS})
                </FormDescription>

                <div className="space-y-2">
                  {answerFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                      <FormField
                        control={form.control}
                        name={`content.answers.${index}.value`}
                        render={({ field: inputField }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder={`Answer ${index + 1}`}
                                {...inputField}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        disabled={answerFields.length === 1}
                        className="disabled:pointer-events-none"
                        onClick={() => removeAnswer(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <FormDescription>
                  The correct answer(s) for this exercise. Multiple answers are
                  accepted.
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
                      />
                    </FormControl>
                    <FormDescription>
                      An explanation of why the answer is correct (shown to
                      students after they answer)
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
