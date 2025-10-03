"use client";
import { ThemeToggleButton } from "@/components/layout/ThemeToggleButton";
import { TopicContent } from "@/components/topics/TopicContent";
import { AppSidebar } from "@/components/topics/TopicSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getTopicData } from "@/lib/topic-data";
import { notFound, useSearchParams } from "next/navigation";
import { use } from "react";

export default function TopicPageClient({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = use(params);

  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const selectedSubcategory = searchParams.get("subcategory");

  const topicData = getTopicData(topic);
  if (!topicData) {
    notFound();
  }

  return (
    <SidebarProvider>
      <AppSidebar params={{ topic }} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1 flex sticky md:hidden bg-background" />
          <ThemeToggleButton />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 relative">
          <TopicContent
            topicData={topicData}
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
