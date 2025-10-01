import { subcategoriesService } from "@/lib/services/subcategories.service";
import { SubcategoriesTable } from "../_components/subcategories-table";

export default async function SubcategoriesPage() {
  const subcategories = await subcategoriesService.getAllWithCategories();
  return (
    <div className="space-y-6 pt-8 px-4">
      <SubcategoriesTable initialSubcategories={subcategories}/>
    </div>
  );
}