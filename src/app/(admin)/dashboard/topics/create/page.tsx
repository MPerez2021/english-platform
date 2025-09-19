import { TopicForm } from "../../_components/topic-form";

export default function CreateTopicPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Create New Topic</h1>
      </div>
      <TopicForm mode="create" />
    </div>
  );
}