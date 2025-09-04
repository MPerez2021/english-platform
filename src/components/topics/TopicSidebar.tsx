"use client"
import * as React from "react"
import { ChevronRight } from "lucide-react"
import { TOPIC_DATA, TopicType } from "@/lib/topic-data"
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
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  params: { topic: string };
};


export function AppSidebar({ params, ...props }: AppSidebarProps) {
  // Ensure params.topic is a string and exists in TOPIC_DATA
  const topic = params.topic as TopicType;
  const topicData = TOPIC_DATA[topic];
  const router = useRouter();
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
      <SidebarHeader>
        <SidebarGroupLabel className="text-sidebar-foreground text-lg font-bold">{topicData.name}</SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarGroup>
          <SidebarGroupLabel>Table of Contents</SidebarGroupLabel>
        </SidebarGroup>
        {/* We create a collapsible SidebarGroup for each parent. */}
        {topicData.categories.map((item) => (
          <Collapsible
            key={item.id}
            title={item.name}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger>
                  {item.name}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.subcategories.map((subcategory) => (
                      <SidebarMenuItem key={subcategory.id}>
                        <SidebarMenuButton asChild isActive={subcategory.id === selectedSubcategory}>
                          {/* <a href={item.url}>{item.name}</a> */}
                          <Link href={`/${params.topic}?category=${item.id}&subcategory=${subcategory.id}`}>{subcategory.name}</Link>
                          {/* <a onClick={() => router.push(`/${params.topic}?category=${item.id}&subcategory=${subcategory.id}`)}>{subcategory.name}</a> */}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
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
