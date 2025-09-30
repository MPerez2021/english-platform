"use client";
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
        <div className="flex flex-1 flex-col gap-4 p-4 mt-16 relative">
          <SidebarTrigger className="-ml-1 flex sticky top-16 md:hidden bg-background" />
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
