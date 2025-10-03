"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "@/components/ui/sidebar";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import { TOPIC_DATA, TopicType } from "@/lib/topic-data";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { ThemeToggleButton } from "../layout/ThemeToggleButton";
type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  params: { topic: string };
};

export function AppSidebar({ params, ...props }: AppSidebarProps) {
  // Ensure params.topic is a string and exists in TOPIC_DATA
  const topic = params.topic as TopicType;
  const topicData = TOPIC_DATA[topic];
  const searchParams = useSearchParams();
  const selectedSubcategory = searchParams.get("subcategory");
  const menu = NAVIGATION_ITEMS.filter((item) => {
    return item.href.replace("/", "") != topic;
  });
  // Add error handling for undefined topicData
  if (!topicData) {
    console.error(`No topic data found for topic: ${topic}`);
    console.error("Available topics:", Object.keys(TOPIC_DATA));
    return (
      <Sidebar {...props}>
        <SidebarContent>
          <div className="p-4 text-red-500">
            Error: Topic &quot;{topic}&quot; not found
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className="bg-background">
        <div className="flex justify-between items-center">
        <h2 className="text-sidebar-foreground text-lg font-bold px-2">
          {topicData.name}
        </h2>
        <ThemeToggleButton />
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <SidebarGroup className="flex xl:hidden">
          <div className="flex flex-col pl-3 gap-2">
            {menu.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors"
                aria-label={`Navigate to ${item.name} section`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </SidebarGroup>
        {/* We create a collapsible SidebarGroup for each parent. */}
        {topicData.categories.map((item) => (
          <Collapsible
            key={item.id}
            title={item.name}
            defaultOpen={true}
            className="group/collapsible"
            aria-label={`${item.name} category`}
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger
                  aria-label={`Toggle ${item.name} subcategories`}
                >
                  {item.name}
                  <ChevronRight
                    className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
                    aria-hidden="true"
                  />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenuSub
                    role="list"
                    aria-label={`${item.name} subcategories`}
                  >
                    {item.subcategories.map((subcategory) => (
                      <SidebarMenuSubItem key={subcategory.id} role="listitem">
                        <SidebarMenuSubButton
                          asChild
                          isActive={subcategory.id === selectedSubcategory}
                        >
                          <Link
                            href={`/${params.topic}?category=${item.id}&subcategory=${subcategory.id}`}
                            aria-label={`Go to ${subcategory.name} exercises in ${item.name}`}
                            aria-current={
                              subcategory.id === selectedSubcategory
                                ? "page"
                                : undefined
                            }
                          >
                            {subcategory.name}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
