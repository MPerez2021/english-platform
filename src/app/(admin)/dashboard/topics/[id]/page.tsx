import { notFound } from "next/navigation";
import { TopicForm } from "../../_components/topic-form";
import { topicsService } from "@/lib/services/topics.service";

interface EditTopicPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTopicPage({ params }: EditTopicPageProps) {
  const topicId = (await params).id;
  const topic = await topicsService.getById(topicId);

  if (!topic) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Edit Topic</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Update the details for {topic.name}.
        </p>
      </div>
      <TopicForm topic={topic} mode="edit" />
    </div>
  );
}
