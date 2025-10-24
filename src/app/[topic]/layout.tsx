import { AppSidebar } from "@/components/topics/TopicSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Suspense } from "react";
import SidebarHeader from "../lessons/_components/LessonSidebarHeader";

interface TopicLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    topic: string;
  }>;
}

export default async function TopicLayout({
  children,
  params,
}: TopicLayoutProps) {
  return (
    <SidebarProvider>
      <AppSideBarWrapper params={params} />
      <SidebarInset>
        <SidebarHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

async function AppSideBarWrapper({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  return <AppSidebar params={{ topic }} />;
}
