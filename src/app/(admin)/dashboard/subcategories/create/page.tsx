import { SubcategoryForm } from "../../_components/subcategory-form";
import { topicsService } from "@/lib/services/topics.service";

export default async function CreateSubcategoryPage() {
  const topics = await topicsService.getTopicOptions();

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Create Subcategory</h1>
      </div>
      <SubcategoryForm mode="create" topics={topics} />
    </div>
  );
}