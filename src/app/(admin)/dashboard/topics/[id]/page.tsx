import { notFound } from "next/navigation";
import { TopicForm } from "../../_components/topic-form";
import { topicsService } from "@/lib/data/mock-topics";

interface EditTopicPageProps {
  params: {
    id: string;
  };
}

export default function EditTopicPage({ params }: EditTopicPageProps) {
  const topicId = parseInt(params.id);
  const topic = topicsService.getById(topicId);

  if (!topic) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Topic</h1>
        <p className="text-muted-foreground">
          Update the details for {topic.name}.
        </p>
      </div>
      <TopicForm topic={topic} mode="edit" />
    </div>
  );
}