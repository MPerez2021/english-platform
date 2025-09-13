import { notFound } from "next/navigation";
import { SubcategoryForm } from "../../_components/subcategory-form";
import { subcategoriesService } from "@/lib/data/mock-subcategories";
import { categoriesService } from "@/lib/data/mock-categories";

interface EditSubcategoryPageProps {
  params: {
    id: string;
  };
}

export default function EditSubcategoryPage({ params }: EditSubcategoryPageProps) {
  const subcategoryId = parseInt(params.id);
  const subcategory = subcategoriesService.getById(subcategoryId);
  const categories = categoriesService.getAll().filter(category => category.is_active);

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