"use client";

import {
  Boxes,
  ClipboardCheck,
  FolderKanban,
  FolderOpen,
  GraduationCap,
  Layers,
  LayoutDashboard,
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import Link from "next/link";
import { NavUser } from "./nav-user";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Topics",
      url: "/dashboard/topics",
      icon: Layers,
      isActive: true,
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: FolderOpen,
    },
    {
      title: "Subcategories",
      url: "/dashboard/subcategories",
      icon: Boxes,
    },
    {
      title: "Lessons",
      url: "/dashboard/lessons",
      icon: GraduationCap,
    },
    {
      title: "Exercises",
      url: "/dashboard/exercises",
      icon: ClipboardCheck,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton asChild tooltip={"Dashboard"}>
          <Link href="/dashboard">
            <LayoutDashboard />
            Dashboard
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{name:'Jorge Lucas', email:'jorge@hotmail.com', avatar:'https://github.com/evilrabbit.png'}}/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
