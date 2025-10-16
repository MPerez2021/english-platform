import { notFound } from "next/navigation";
import { SubcategoryForm } from "../../_components/subcategory-form";
import { subcategoriesService } from "@/lib/services/subcategories.service";
import { topicsService } from "@/lib/services/topics.service";

interface EditSubcategoryPageProps {
  params:  Promise<{ id: string}>
}

export default async function EditSubcategoryPage({ params }: EditSubcategoryPageProps) {
  const subcategoryId = (await params).id;
  const subcategory = await subcategoriesService.getById(subcategoryId);
  const topics = await topicsService.getTopicOptions();

  if (!subcategory) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Edit Subcategory</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Update the details of &ldquo;{subcategory.name}&rdquo; subcategory.
        </p>
      </div>
      <SubcategoryForm subcategory={subcategory} mode="edit" topics={topics} />
    </div>
  );
}