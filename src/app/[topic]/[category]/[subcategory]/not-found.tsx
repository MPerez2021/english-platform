"use client"
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex min-h m-auto flex-col items-center justify-center px-4">
      <div className="flex max-w-md flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-6 rounded-full bg-muted/50 p-6">
          <FileQuestion className="size-16 text-muted-foreground" />
        </div>

        {/* Heading */}
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="mb-8 text-base text-muted-foreground">
          We couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
        </p>

        {/* Action Button */}
        <Button  size="lg" onClick={() => router.back()}>
          <ArrowLeft/> Go Back
        </Button>
      </div>
    </div>
  );
}
