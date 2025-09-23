"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

interface FormActionButtonsProps {
  mode: "create" | "edit";
  entityName: string;
  isSubmitting: boolean;
  onCancel: () => void;
  submitText?: {
    create: string;
    edit: string;
  };
}

export function FormActionButtons({
  mode,
  entityName,
  isSubmitting,
  onCancel,
  submitText,
}: FormActionButtonsProps) {
  const defaultSubmitText = {
    create: `Create ${entityName}`,
    edit: `Update ${entityName}`,
  };

  const buttonText = submitText || defaultSubmitText;
  const loadingText = {
    create: "Creating",
    edit: "Updating",
  };

  return (
    <div className="flex justify-end space-x-4 pb-6">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            {loadingText[mode]}
          </>
        ) : (
          buttonText[mode]
        )}
      </Button>
    </div>
  );
}