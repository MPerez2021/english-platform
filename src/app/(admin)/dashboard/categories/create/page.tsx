import { CategoryForm } from "../../_components/category-form";
import { topicsService } from "@/lib/services/topics.service";

export default async function CreateCategoryPage() {
  const allTopics = await topicsService.getAll();
  const topics = allTopics.filter(topic => topic.is_active);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Category</h1>
        <p className="text-muted-foreground">
          Add a new learning category to organize your content.
        </p>
      </div>
      <CategoryForm mode="create" topics={topics} />
    </div>
  );
}