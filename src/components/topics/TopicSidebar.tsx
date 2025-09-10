"use client"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from "@/components/ui/sidebar"
import { TOPIC_DATA, TopicType } from "@/lib/topic-data"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import * as React from "react"
type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  params: { topic: string };
};


export function AppSidebar({ params, ...props }: AppSidebarProps) {
  // Ensure params.topic is a string and exists in TOPIC_DATA
  const topic = params.topic as TopicType;
  const topicData = TOPIC_DATA[topic];
  const searchParams = useSearchParams();
  const selectedSubcategory = searchParams.get("subcategory");
  // Add error handling for undefined topicData
  if (!topicData) {
    console.error(`No topic data found for topic: ${topic}`);
    console.error("Available topics:", Object.keys(TOPIC_DATA));
    return (
      <Sidebar {...props} className="pt-16">
        <SidebarContent>
          <div className="p-4 text-red-500">
            Error: Topic &quot;{topic}&quot; not found
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }


  return (
    <Sidebar {...props} className="pt-16">
      <SidebarHeader className="bg-background">
        <h2 className="text-sidebar-foreground text-lg font-bold px-2">{topicData.name}</h2>
      </SidebarHeader>
      <SidebarContent className="gap-0 bg-background">
        <SidebarGroup>
          <h3 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sidebar-foreground group-data-[collapsible=icon]:hidden px-2 py-1.5">Table of Contents</h3>
        </SidebarGroup>
        {/* We create a collapsible SidebarGroup for each parent. */}
        {topicData.categories.map((item) => (
          <Collapsible
            key={item.id}
            title={item.name}
            defaultOpen={false}
            className="group/collapsible"
            aria-label={`${item.name} category`}
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger aria-label={`Toggle ${item.name} subcategories`}>
                  <h4 className="text-sm font-medium">
                    {item.name}
                  </h4>
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" aria-hidden="true" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenuSub role="list" aria-label={`${item.name} subcategories`}>
                    {item.subcategories.map((subcategory) => (
                      <SidebarMenuSubItem key={subcategory.id} role="listitem">
                        <SidebarMenuSubButton asChild isActive={subcategory.id === selectedSubcategory}>
                          <Link
                            href={`/${params.topic}?category=${item.id}&subcategory=${subcategory.id}`}
                            aria-label={`Go to ${subcategory.name} exercises in ${item.name}`}
                            aria-current={subcategory.id === selectedSubcategory ? "page" : undefined}
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
      <SidebarRail />
    </Sidebar>
  )
}
