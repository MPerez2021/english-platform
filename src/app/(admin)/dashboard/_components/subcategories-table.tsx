"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DataTable } from "@/components/ui/data-table";
import { Subcategory, Category } from "@/lib/types/category.types";
import { ColumnDef, ActionDef } from "@/lib/types/table.types";
import { subcategoriesService } from "@/lib/services/subcategories.service";
import { Edit, Plus } from "lucide-react";
import { toast } from "sonner";

interface SubcategoriesTableProps {
  initialSubcategories: Subcategory[];
  categories: Category[];
}

export function SubcategoriesTable({ initialSubcategories, categories }: SubcategoriesTableProps) {
  const [subcategories, setSubcategories] = useState<Subcategory[]>(initialSubcategories);

  const handleToggleActive = async (subcategoryId: string) => {
    try {
      const updatedSubcategory = await subcategoriesService.toggleActive(subcategoryId);
      if (updatedSubcategory) {
        const updatedSubcategories = await subcategoriesService.getAll();
        setSubcategories(updatedSubcategories);
        toast.success("Subcategory status updated successfully");
      }
    } catch (error) {
      console.error('Error toggling subcategory status:', error);
      toast.error("Failed to update subcategory status", {
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    }
  };

  const getCategoryName = (categoryId: string): string => {
    const category = categories.find(c => c.id === categoryId);
    return category?.name || "Unknown Category";
  };

  const columns: ColumnDef<Subcategory>[] = [
    {
      key: "name",
      label: "Name",
      className: "font-medium",
    },
    {
      key: "category_id",
      label: "Category",
      render: (value: unknown) => getCategoryName(value as string),
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
      key: "display_order",
      label: "Order",
      width: "w-20",
      className: "text-center",
    },
    {
      key: "is_active",
      label: "Status",
      width: "w-20",
      render: (value: unknown, subcategory: Subcategory) => (
        <Switch
          checked={value as boolean}
          onCheckedChange={() => handleToggleActive(subcategory.id)}
          aria-label={`Toggle ${subcategory.name} active status`}
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

  const actions: ActionDef<Subcategory>[] = [
    {
      label: "Edit subcategory",
      icon: <Edit className="h-4 w-4" />,
      href: (subcategory: Subcategory) => `/dashboard/subcategories/${subcategory.id}`,
      variant: "ghost",
      size: "sm",
      className: "h-8 w-8 p-0",
    },
  ];

  return (
    <div>
      <div className="flex flex-col items-start gap-4 mb-6 md:flex-row md:justify-between md:items-center">
        <h1 className="text-3xl font-bold tracking-tight">Subcategories</h1>
        <Button size="sm" asChild>
          <Link href="/dashboard/subcategories/create">
            <Plus className="h-4 w-4"/>
            Add Subcategory
          </Link>
        </Button>
      </div>

      <DataTable
        data={subcategories}
        columns={columns}
        actions={actions}
        emptyMessage="No subcategories found. Create your first subcategory to get started."
        itemCountLabel="subcategory"
      />
    </div>
  );
}