import { SubcategoriesTable } from "../_components/subcategories-table";
import { subcategoriesService } from "@/lib/data/mock-subcategories";
import { categoriesService } from "@/lib/data/mock-categories";

export default function SubcategoriesPage() {
  const subcategories = subcategoriesService.getAll();
  const categories = categoriesService.getAll();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subcategories</h1>
        <p className="text-muted-foreground">
          Manage the learning subcategories within your categories.
        </p>
      </div>
      <SubcategoriesTable initialSubcategories={subcategories} categories={categories} />
    </div>
  );
}