import { AppSidebar } from "@/components/topics/TopicSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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
  const { topic } = await params;
  return (
    <SidebarProvider>
      <AppSidebar params={{ topic }} />
      <SidebarInset>
        <SidebarHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
