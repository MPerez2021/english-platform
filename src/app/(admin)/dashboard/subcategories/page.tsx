import { SubcategoriesTable } from "../_components/subcategories-table";
import { subcategoriesService } from "@/lib/services/subcategories.service";
import { categoriesService } from "@/lib/services/categories.service";

export default async function SubcategoriesPage() {
  const subcategories = await subcategoriesService.getAll();
  const categories = await categoriesService.getAll();

  return (
    <div className="space-y-6 pt-8 px-4">
      <SubcategoriesTable initialSubcategories={subcategories} categories={categories} />
    </div>
  );
}