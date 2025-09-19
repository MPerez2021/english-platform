import { TopicsTable } from "../_components/topics-table";
import { topicsService } from "@/lib/services/topics.service";

export default async function TopicsPage() {
  const topics = await topicsService.getAll();

  return (
    <div className="space-y-6 pt-8 px-4">
      <TopicsTable initialTopics={topics} />
    </div>
  );
}