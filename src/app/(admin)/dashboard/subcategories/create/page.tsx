import { SubcategoryForm } from "../../_components/subcategory-form";
import { categoriesService } from "@/lib/services/categories.service";

export default async function CreateSubcategoryPage() {
  const allCategories = await categoriesService.getAll();
  const categories = allCategories.filter(category => category.is_active);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Create Subcategory</h1>
      </div>
      <SubcategoryForm mode="create" categories={categories} />
    </div>
  );
}