import { categoriesService } from "@/lib/services/categories.service";
import { CategoriesTable } from "../_components/categories-table";

export default async function CategoriesPage() {
  const categories = await categoriesService.getAllWithTopics();
  return (
    <div className="space-y-6 pt-8 px-4">
      <CategoriesTable initialCategories={categories} />
    </div>
  );
}