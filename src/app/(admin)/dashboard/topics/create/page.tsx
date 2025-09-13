import { TopicForm } from "../../_components/topic-form";

export default function CreateTopicPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Topic</h1>
        <p className="text-muted-foreground">
          Add a new learning topic to your platform.
        </p>
      </div>
      
      <TopicForm mode="create" />
    </div>
  );
}