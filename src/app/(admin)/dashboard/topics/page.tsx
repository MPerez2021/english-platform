import { TopicsTable } from "../_components/topics-table";
import { topicsService } from "@/lib/services/topics.service";

export default async function TopicsPage() {
  const topics = await topicsService.getAll();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Topics</h1>
        <p className="text-muted-foreground">
          Manage the learning topics available on the platform.
        </p>
      </div>
      <TopicsTable initialTopics={topics} />
    </div>
  );
}