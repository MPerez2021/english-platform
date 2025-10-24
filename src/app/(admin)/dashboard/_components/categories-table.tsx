"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Switch } from "@/components/ui/switch";
import { categoriesService } from "@/lib/services/categories.service";
import { CategoryWithTopic } from "@/lib/types/category.types";
import { ActionDef, ColumnDef } from "@/lib/types/table.types";
import { Edit, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface CategoriesTableProps {
  initialCategories: CategoryWithTopic[];
}

export function CategoriesTable({
  initialCategories,
}: CategoriesTableProps) {
  const [categories, setCategories] = useState<CategoryWithTopic[]>(initialCategories);

  const handleToggleActive = async (categoryId: string) => {
    try {
      const updatedCategory = await categoriesService.toggleActive(categoryId);
      if (updatedCategory) {
        const updatedCategories = await categoriesService.getAllWithTopics();
        setCategories(updatedCategories);
        toast.success("Category status updated successfully");
      }
    } catch (error) {
      console.error("Error toggling category status:", error);
      toast.error("Failed to update category status", {
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    }
  };

  const columns: ColumnDef<CategoryWithTopic>[] = [
    {
      key: "name",
      label: "Name",
      className: "font-medium",
    },
    {
      key: "topic_id",
      label: "Topic",
      render: (value: unknown, category:CategoryWithTopic) => (
        <div>
          {category.topic}
        </div>
      ),
      className: "text-muted-foreground",
    },
    {
      key: "slug",
      label: "Slug",
      responsive: "md:table-cell",
      className: "text-muted-foreground font-mono text-sm",
    },
    {
      key: "description",
      label: "Description",
      responsive: "lg:table-cell",
      className: "max-w-xs",
      render: (value: unknown) => (
        <div className="truncate" title={value as string}>
          {value as string}
        </div>
      ),
    },
    {
      key: "is_active",
      label: "Status",
      width: "w-20",
      render: (value: unknown, category: CategoryWithTopic) => (
        <Switch
          checked={value as boolean}
          onCheckedChange={() => handleToggleActive(category.id)}
          aria-label={`Toggle ${category.name} active status`}
        />
      ),
    },
    {
      key: "created_at",
      label: "Created at",
      responsive: "xl:table-cell",
      className: "text-sm text-muted-foreground",
    },
  ];

  const actions: ActionDef<CategoryWithTopic>[] = [
    {
      label: "Edit category",
      icon: <Edit className="h-4 w-4" />,
      href: (category: CategoryWithTopic) => `/dashboard/categories/${category.id}`,
      variant: "ghost",
      size: "sm",
      className: "h-8 w-8 p-0",
    },
  ];

  return (
    <div>
      <div className="flex flex-col items-start gap-4 mb-6 md:flex-row md:justify-between md:items-center">
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <Button size="sm" asChild>
          <Link href="/dashboard/categories/create">
            <Plus className="h-4 w-4"/>
            Add Category
          </Link>
        </Button>
      </div>

      <DataTable
        data={categories}
        columns={columns}
        actions={actions}
        emptyMessage="No categories found. Create your first category to get started."
        itemCountLabel="category"
      />
    </div>
  );
}
