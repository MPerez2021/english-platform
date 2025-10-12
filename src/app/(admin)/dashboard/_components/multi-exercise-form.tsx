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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { exercisesService } from "@/lib/services/exercises.service";
import {
  EXERCISE_TYPE_CODES,
  EXERCISE_TYPE_NAMES,
} from "@/lib/types/exercise.types";
import { Lesson } from "@/lib/types/lesson.types";
import {
  multipleExerciseFormSchema,
  MultipleExerciseFormSchema,
} from "@/lib/validations/exercise.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, Plus, Trash2, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { FormActionButtons } from "./form-action-buttons";

interface MultiExerciseFormProps {
  lessons: Lesson[];
}

const createDefaultExercise = () => ({
  exercise_types: "FILL_BLANK" as "FILL_BLANK" | "FILL_BLANK_FREE" | "READING_COMPREHENSION",
  instructions: "",
  display_order: undefined as number | undefined,
  content: {
    question: "",
    answers: [{ value: "" }],
    options: [{ value: "" }],
    answer_explanation: "",
  },
});

export function MultiExerciseForm({ lessons }: MultiExerciseFormProps) {
  const router = useRouter();

  const form = useForm<MultipleExerciseFormSchema>({
    resolver: zodResolver(multipleExerciseFormSchema),
    defaultValues: {
      lesson_id: "",
      exercises: [createDefaultExercise()],
    },
  });

  const {
    fields: exerciseFields,
    append: appendExercise,
    remove: removeExercise,
  } = useFieldArray({
    control: form.control,
    name: "exercises",
  });

  const handleCancel = () => {
    router.back();
  };

  const addExercise = () => {
    //appendExercise(createDefaultExercise());
  };

  const duplicateExercise = (index: number) => {
    const exerciseToDuplicate = form.getValues(`exercises.${index}`);
    appendExercise({
      ...exerciseToDuplicate,
      instructions: `${exerciseToDuplicate.instructions} (Copy)`,
    });
  };

  const removeExerciseHandler = (index: number) => {
    if (exerciseFields.length > 1) {
      removeExercise(index);
    }
  };

  const onSubmit = async (data: MultipleExerciseFormSchema) => {
    try {
      await exercisesService.createMultiple(data);
      toast.success(`Successfully created ${data.exercises.length} exercises`);
      router.push("/dashboard/exercises");
      router.refresh();
    } catch (error) {
      toast.error("Failed to create exercises", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Create Multiple Exercises</h1>
          <p className="text-muted-foreground">
            Multiple exercises at once for better efficiency
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="h-4 w-4" />
          {exerciseFields.length} exercise{exerciseFields.length !== 1 ? 's' : ''}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Shared Lesson Selection */}
          <div className="bg-muted/30 p-4 rounded-lg border">
            <FormField
              control={form.control}
              name="lesson_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Lesson (Shared by all exercises)</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger className="max-w-md">
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
                    All exercises will be added to this lesson
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Add Exercise Button */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Exercises</h3>
            <Button
              type="button"
              variant="outline"
              onClick={addExercise}
              disabled={exerciseFields.length >= 10}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Exercise
            </Button>
          </div>

          {/* Exercises Accordion */}
          <Accordion type="multiple" className="w-full">
            {exerciseFields.map((field, index) => (
              <AccordionItem
                key={field.id}
                value={`exercise-${index}`}
                className="border !border-b rounded-lg mb-4"
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs">
                      {index + 1}
                    </span>
                    <div className="text-left">
                      <div className="font-medium">
                        Exercise {index + 1}
                        {form.watch(`exercises.${index}.exercise_types`) && (
                          <span className="ml-2 text-muted-foreground font-normal">
                            - {EXERCISE_TYPE_NAMES[form.watch(`exercises.${index}.exercise_types`)]}
                          </span>
                        )}
                      </div>
                      {form.watch(`exercises.${index}.instructions`) && (
                        <div className="text-sm text-muted-foreground truncate max-w-md">
                          {form.watch(`exercises.${index}.instructions`)}
                        </div>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <ExerciseContent
                    form={form}
                    index={index}
                    onDuplicate={() => duplicateExercise(index)}
                    onRemove={() => removeExerciseHandler(index)}
                    canRemove={exerciseFields.length > 1}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <FormActionButtons
            mode="create"
            entityName={`${exerciseFields.length} Exercise${exerciseFields.length !== 1 ? 's' : ''}`}
            isSubmitting={form.formState.isSubmitting}
            onCancel={handleCancel}
          />
        </form>
      </Form>
    </div>
  );
}

interface ExerciseContentProps {
  form: ReturnType<typeof useForm<MultipleExerciseFormSchema>>;
  index: number;
  onDuplicate: () => void;
  onRemove: () => void;
  canRemove: boolean;
}

function ExerciseContent({ form, index, onDuplicate, onRemove, canRemove }: ExerciseContentProps) {
  // Answer field array management
  const {
    fields: answerFields,
    append: appendAnswer,
    remove: removeAnswer,
  } = useFieldArray({
    control: form.control,
    name: `exercises.${index}.content.answers`,
  });

  // Option field array management
  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control: form.control,
    name: `exercises.${index}.content.options`,
  });

  const watchedExerciseType = useWatch({
    control: form.control,
    name: `exercises.${index}.exercise_types`,
  });

  const requiresOptions =
    watchedExerciseType === EXERCISE_TYPE_CODES.FILL_BLANK ||
    watchedExerciseType === EXERCISE_TYPE_CODES.READING_COMPREHENSION;

  const MAX_OPTIONS = requiresOptions ? 3 : 0;
  const MAX_ANSWERS = 1;

  return (
    <div className="space-y-6">
      {/* Exercise Actions */}
      <div className="flex items-center justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onDuplicate}
        >
          <Copy className="h-4 w-4 mr-2" />
          Duplicate
        </Button>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={onRemove}
          disabled={!canRemove}
          className="disabled:pointer-events-none"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Remove
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name={`exercises.${index}.exercise_types`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exercise Type</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  // Reset form content when exercise type changes
                  form.setValue(`exercises.${index}.content.question`, "");
                  form.setValue(`exercises.${index}.content.answers`, [{ value: "" }]);
                  form.setValue(`exercises.${index}.content.answer_explanation`, "");

                  if (value === EXERCISE_TYPE_CODES.FILL_BLANK_FREE) {
                    form.setValue(`exercises.${index}.content.options`, []);
                  } else {
                    form.setValue(`exercises.${index}.content.options`, [{ value: "" }]);
                  }
                }}
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
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name={`exercises.${index}.instructions`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Instructions</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter student-facing instructions"
                className="min-h-20"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Exercise Content Section */}
      {watchedExerciseType && (
        <div className="space-y-6">
          <h4 className="font-medium">Exercise Content</h4>

          <FormField
            control={form.control}
            name={`exercises.${index}.content.question`}
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
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Options (only for choice-based exercises) */}
          {requiresOptions && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel>Options</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={optionFields.length >= MAX_OPTIONS}
                  className="disabled:pointer-events-none"
                  onClick={() => appendOption({ value: "" })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
              </div>
              <div className="space-y-2">
                {optionFields.map((field, optionIndex) => (
                  <div key={field.id} className="flex gap-2">
                    <FormField
                      control={form.control}
                      name={`exercises.${index}.content.options.${optionIndex}.value`}
                      render={({ field: inputField }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              placeholder={`Option ${optionIndex + 1}`}
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
                      disabled={optionFields.length <= 1}
                      className="disabled:pointer-events-none"
                      onClick={() => removeOption(optionIndex)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
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
                disabled={answerFields.length >= MAX_ANSWERS}
                className="disabled:pointer-events-none"
                onClick={() => appendAnswer({ value: "" })}
              >
                <Plus className="h-4 w-4" />
                Add Answer
              </Button>
            </div>

            <div className="space-y-2">
              {answerFields.map((field, answerIndex) => (
                <div key={field.id} className="flex gap-2">
                  <FormField
                    control={form.control}
                    name={`exercises.${index}.content.answers.${answerIndex}.value`}
                    render={({ field: inputField }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder={`Answer ${answerIndex + 1}`}
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
                    disabled={answerFields.length <= 1}
                    className="disabled:pointer-events-none"
                    onClick={() => removeAnswer(answerIndex)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <FormField
            control={form.control}
            name={`exercises.${index}.content.answer_explanation`}
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
}