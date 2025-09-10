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
import { use, useMemo } from "react";

export default function Page({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = use(params);

  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const selectedSubcategory = searchParams.get("subcategory");


  const topicData = getTopicData(topic)
  if (!topicData) {
    notFound()
  }

  // Memoize category and subcategory lookups to avoid redundant operations
  const { categoryName, subcategoryName } = useMemo(() => {
    const category = selectedCategory 
      ? topicData.categories.find(c => c.id === selectedCategory)
      : null;
    
    const subcategory = selectedSubcategory && category
      ? category.subcategories.find(s => s.id === selectedSubcategory)
      : null;

    return {
      categoryName: category?.name || null,
      subcategoryName: subcategory?.name || null
    };
  }, [selectedCategory, selectedSubcategory, topicData.categories]);

  // Get the current page title for mobile display
  const getCurrentPageTitle = () => {
    if (selectedSubcategory && subcategoryName) {
      return subcategoryName
    } else if (selectedCategory) {
      // Don't show category name on mobile - return null to hide breadcrumb
      return null
    }
    return topicData.name
  }

  return (
    <SidebarProvider>
      <AppSidebar params={{ topic }} />
      <SidebarInset>
        <header className="bg-background sticky flex top-16 h-16 shrink-0 items-center border-b gap-2 px-4 z-50">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              {/* Mobile: Show current page title only when there's a meaningful title */}
              {getCurrentPageTitle() && (
                <BreadcrumbItem className="md:hidden">
                  <BreadcrumbPage>{getCurrentPageTitle()}</BreadcrumbPage>
                </BreadcrumbItem>
              )}
              {/* Desktop: Show full breadcrumb navigation */}
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href={`/${topic}`}>
                  {topicData.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {selectedCategory && (
                <>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href={`/${topic}?category=${selectedCategory}`}>
                      {categoryName || selectedCategory}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              {selectedSubcategory && (
                <>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbPage>
                      {subcategoryName || selectedSubcategory}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
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
