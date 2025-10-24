"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import { sidebarService } from "@/lib/services/sidebar.service";
import { SidebarData } from "@/lib/types/sidebar.type";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggleButton } from "../layout/ThemeToggleButton";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  params: { topic: string };
};

export function AppSidebar({ ...props }: AppSidebarProps) {
  // Ensure params.topic is a string and exists in TOPIC_DATA
  const { topic, subcategory } = useParams<{
    topic: string;
    subcategory?: string;
  }>();

  const [sidebarData, setTopicData] = useState<SidebarData[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setLoading(true);
    setError(null);
    sidebarService
      .getSidebarTopicData(topic)
      .then((data) => {
        if (data) {
          setTopicData(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching sidebar data:", error);
        setError("Failed to load sidebar content.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [topic]);

  const menu = NAVIGATION_ITEMS.filter((item) => {
    return item.href.replace("/", "") != topic;
  });

  if (loading) {
    return (
      <Sidebar {...props}>
        <SidebarContent>
          <div className="flex flex-col space-y-3">
            <SidebarMenuSkeleton showIcon />
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }

  // Error state
  if (error) {
    return (
      <Sidebar {...props}>
        <SidebarContent>
          <div className="p-4 text-red-500 text-sm">{error}</div>
        </SidebarContent>
      </Sidebar>
    );
  }

  // Add error handling for undefined topicData
  if (!sidebarData || sidebarData.length == 0) {
    return notFound();
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className="bg-background">
        <div className="flex justify-between items-center">
          <Link
            href={`/${topic}`}
            className="text-sidebar-foreground text-lg font-bold px-2"
          >
            {sidebarData.at(0)?.topicName}
          </Link>
          <ThemeToggleButton />
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        {/* Topics for mobile */}
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
        {sidebarData.map((item, i) => (
          <div key={i}>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarGroupLabel className="text-sm">{item.categoryName}</SidebarGroupLabel>
                  <SidebarMenuSub
                    role="list"
                    aria-label={`${item.categoryName} subcategories`}
                  >
                    {item.subcategories.map((sub) => (
                      <SidebarMenuSubItem key={sub.name} role="listitem">
                        <SidebarMenuSubButton
                          asChild
                          className="data-[active=true]:bg-transparent data-[active=true]:text-primary"
                          isActive={sub.slug === subcategory}
                        >
                          <Link
                            href={`/${topic}/${item.categorySlug}/${sub.slug}`}
                            aria-label={`Go to ${sub.name} exercises in ${item.categoryName}`}
                            /* aria-current={} */
                          >
                            {sub.name}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </div>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
