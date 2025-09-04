"use client"
import { TopicContent } from "@/components/topics/TopicContent";
import { AppSidebar } from "@/components/topics/TopicSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getTopicData } from "@/lib/topic-data";
import { notFound, useSearchParams } from "next/navigation";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = use(params);

  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const selectedSubcategory = searchParams.get("subcategory");


  const topicData = getTopicData(topic)
  if (!topicData) {
    notFound()
  }

  return (
    <SidebarProvider>
      <AppSidebar params={{ topic }} />
      <SidebarInset>
        <header className="bg-background sticky flex top-16 h-16 shrink-0 items-center gap-2 border-b px-4 z-50">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href={`/${topic}`}>
                  {topicData.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              {selectedCategory && <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink>
                  {selectedCategory}
                </BreadcrumbLink>
              </BreadcrumbItem>}
              {selectedCategory &&<BreadcrumbSeparator className="hidden md:block" />}<BreadcrumbItem>
                <BreadcrumbPage>{selectedSubcategory}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 mt-16">
          {/* {Array.from({ length: 24 }).map((_, index) => (
            <div
              key={index}
              className="bg-muted/50 aspect-video h-12 w-full rounded-lg"
            />
          ))} */}
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
