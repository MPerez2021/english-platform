"use client"
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const pathName = usePathname();
  const lesson = pathName.split("/")[3];
  return (
    <div className="flex min-h m-auto flex-col items-center justify-center px-4">
      <div className="flex max-w-md flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-6 rounded-full bg-muted/50 p-6">
          <FileQuestion className="size-16 text-muted-foreground" />
        </div>

        {/* 404 Number */}
        <div className="mb-4 text-8xl font-bold tracking-tighter text-muted-foreground/20">
          404
        </div>

        {/* Heading */}
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
          Content Not Found
        </h1>

        {/* Description */}
        <p className="mb-8 text-base text-muted-foreground">
          The lesson <span className="font-bold uppercase">{lesson}</span> you&apos;re looking for doesn&apos;t exist or may have been
          moved. Please check the URL or return to explore available content.
        </p>

        {/* Action Button */}
        <Button  size="lg" onClick={() => router.back()}>
          <ArrowLeft/> Go Back
        </Button>
      </div>
    </div>
  );
}
