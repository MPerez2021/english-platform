import { SubcategoryForm } from "../../_components/subcategory-form";
import { categoriesService } from "@/lib/data/mock-categories";

export default function CreateSubcategoryPage() {
  const categories = categoriesService.getAll().filter(category => category.is_active);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Subcategory</h1>
        <p className="text-muted-foreground">
          Add a new learning subcategory to organize your content.
        </p>
      </div>
      <SubcategoryForm mode="create" categories={categories} />
    </div>
  );
}