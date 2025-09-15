"use client";

import {
    BookOpen,
    Bot,
    LayoutDashboard,
    Settings2,
    SquareTerminal
} from "lucide-react";
import * as React from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Topics",
      url: "/dashboard/topics",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: Bot,
    },
    {
      title: "Subcategories",
      url: "/dashboard/subcategories",
      icon: BookOpen,
    },
    {
      title: "Lessons",
      url: "/dashboard/lessons",
      icon: Settings2,
    },
    {
        title: "Exercises",
        url: "#",
        icon: Settings2,
        subMenu: [
          {
            title: "Types",
            url: "#",
          },
        ],
      },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <LayoutDashboard />
            <h2 className="text-sidebar-foreground text-lg font-bold px-2">
              Dashboard
            </h2>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
