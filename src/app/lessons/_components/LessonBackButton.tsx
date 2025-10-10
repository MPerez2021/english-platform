"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export function LessonBackButton() {
  const router = useRouter();

  const handleBackToLessons = () => {
      router.back();

  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBackToLessons}
      className="gap-2"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </Button>
  );
}
