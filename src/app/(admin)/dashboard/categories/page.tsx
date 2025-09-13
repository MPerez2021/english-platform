import { CategoriesTable } from "../_components/categories-table";
import { categoriesService } from "@/lib/data/mock-categories";
import { topicsService } from "@/lib/data/mock-topics";

export default function CategoriesPage() {
  const categories = categoriesService.getAll();
  const topics = topicsService.getAll();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <p className="text-muted-foreground">
          Manage the learning categories within your topics.
        </p>
      </div>
      <CategoriesTable initialCategories={categories} topics={topics} />
    </div>
  );
}