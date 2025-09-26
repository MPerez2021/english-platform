import { CategoriesTable } from "../_components/categories-table";
import { categoriesService } from "@/lib/services/categories.service";
import { topicsService } from "@/lib/services/topics.service";

export default async function CategoriesPage() {
  const categories = await categoriesService.getAll();
  const topics = await topicsService.getAll();
  return (
    <div className="space-y-6 pt-8 px-4">
      <CategoriesTable initialCategories={categories} topics={topics} />
    </div>
  );
}