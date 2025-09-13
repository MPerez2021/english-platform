import { TopicsTable } from "../_components/topics-table";
import { topicsService } from "@/lib/data/mock-topics";

export default function TopicsPage() {
  const topics = topicsService.getAll();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Topics</h1>
        <p className="text-muted-foreground">
          Manage the learning topics available on your platform.
        </p>
      </div>
      <TopicsTable initialTopics={topics} />
    </div>
  );
}