import { notFound } from "next/navigation";
import { CategoryForm } from "../../_components/category-form";
import { categoriesService } from "@/lib/services/categories.service";
import { topicsService } from "@/lib/services/topics.service";

interface EditCategoryPageProps {
  params:  Promise<{ id: string}>
}

export default async function EditCategoryPage({ params}: EditCategoryPageProps) {
  const categoryId = (await params).id;
  const category = await categoriesService.getById(categoryId);
  const allTopics = await topicsService.getAll();
  const topics = allTopics.filter((topic) => topic.is_active);

  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Edit Category</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Update the details of &ldquo;{category.name}&rdquo; category.
        </p>
      </div>
      <CategoryForm category={category} mode="edit" topics={topics} />
    </div>
  );
}
