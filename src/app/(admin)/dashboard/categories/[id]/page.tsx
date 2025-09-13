import { notFound } from "next/navigation";
import { CategoryForm } from "../../_components/category-form";
import { categoriesService } from "@/lib/data/mock-categories";
import { topicsService } from "@/lib/data/mock-topics";

interface EditCategoryPageProps {
  params: {
    id: string;
  };
}

export default function EditCategoryPage({ params }: EditCategoryPageProps) {
  const categoryId = parseInt(params.id);
  const category = categoriesService.getById(categoryId);
  const topics = topicsService.getAll().filter(topic => topic.is_active);

  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Category</h1>
        <p className="text-muted-foreground">
          Update the details of &ldquo;{category.name}&rdquo; category.
        </p>
      </div>
      <CategoryForm category={category} mode="edit" topics={topics} />
    </div>
  );
}