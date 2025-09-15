import { SubcategoriesTable } from "../_components/subcategories-table";
import { subcategoriesService } from "@/lib/services/subcategories.service";
import { categoriesService } from "@/lib/services/categories.service";

export default async function SubcategoriesPage() {
  const subcategories = await subcategoriesService.getAll();
  const categories = await categoriesService.getAll();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subcategories</h1>
        <p className="text-muted-foreground">
          Manage the learning subcategories within the categories.
        </p>
      </div>
      <SubcategoriesTable initialSubcategories={subcategories} categories={categories} />
    </div>
  );
}