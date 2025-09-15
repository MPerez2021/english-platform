import { CategoriesTable } from "../_components/categories-table";
import { categoriesService } from "@/lib/services/categories.service";
import { topicsService } from "@/lib/services/topics.service";

export default async function CategoriesPage() {
  const categories = await categoriesService.getAll();
  const topics = await topicsService.getAll();

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