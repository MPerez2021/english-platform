import { notFound } from "next/navigation";
import { SubcategoryForm } from "../../_components/subcategory-form";
import { subcategoriesService } from "@/lib/services/subcategories.service";
import { categoriesService } from "@/lib/services/categories.service";

interface EditSubcategoryPageProps {
  params:  Promise<{ id: string}>
}

export default async function EditSubcategoryPage({ params }: EditSubcategoryPageProps) {
  const subcategoryId = (await params).id;
  const subcategory = await subcategoriesService.getById(subcategoryId);
  const allCategories = await categoriesService.getAll();
  const categories = allCategories.filter(category => category.is_active);

  if (!subcategory) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Subcategory</h1>
        <p className="text-muted-foreground">
          Update the details of &ldquo;{subcategory.name}&rdquo; subcategory.
        </p>
      </div>
      <SubcategoryForm subcategory={subcategory} mode="edit" categories={categories} />
    </div>
  );
}