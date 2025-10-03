"use client";
import { TopicContent } from "@/components/topics/TopicContent";
import { AppSidebar } from "@/components/topics/TopicSidebar";
import { Input } from "@/components/ui/input";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import { getTopicData } from "@/lib/topic-data";
import { Search } from "lucide-react";
import Link from "next/link";
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
        <header className="bg-background flex justify-between sticky top-0 h-16 shrink-0 items-center gap-2 border-b px-4 z-50">
          <SidebarTrigger className="-ml-1 flex sticky md:hidden bg-background" />
          <Search className="md:hidden" size={20}/>
          <Input className="hidden w-full md:flex  xl:w-1/3" type="search" placeholder="Find something"/>
          <div className="hidden xl:flex items-center gap-6">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                aria-label={`Navigate to ${item.name} section`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          </header>
        <div className="flex flex-1 flex-col gap-4 p-4 lg:p-0 relative">
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
