"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Category } from "@/lib/types/category.types";
import { Topic } from "@/lib/types/topic.types";
import { ColumnDef, ActionDef } from "@/lib/types/table.types";
import { categoriesService } from "@/lib/services/categories.service";
import { Edit, Plus } from "lucide-react";

interface CategoriesTableProps {
  initialCategories: Category[];
  topics: Topic[];
}

export function CategoriesTable({ initialCategories, topics }: CategoriesTableProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const handleToggleActive = async (categoryId: string) => {
    try {
      const updatedCategory = await categoriesService.toggleActive(categoryId);
      if (updatedCategory) {
        const updatedCategories = await categoriesService.getAll();
        setCategories(updatedCategories);
      }
    } catch (error) {
      console.error('Error toggling category status:', error);
    }
  };

  const getTopicName = (topicId: string): string => {
    const topic = topics.find(t => t.id === topicId);
    return topic?.name || "Unknown Topic";
  };

  const columns: ColumnDef<Category>[] = [
    {
      key: "name",
      label: "Name",
      className: "font-medium",
    },
    {
      key: "topic_id",
      label: "Topic",
      render: (value: unknown) => getTopicName(value as string),
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
      render: (value: unknown, category: Category) => (
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

  const actions: ActionDef<Category>[] = [
    {
      label: "Edit category",
      icon: <Edit className="h-4 w-4" />,
      href: (category: Category) => `/dashboard/categories/${category.id}`,
      variant: "ghost",
      size: "sm",
      className: "h-8 w-8 p-0",
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-0">
        <CardTitle>Categories Management</CardTitle>
        <Button size="sm" asChild>
          <Link href="/dashboard/categories/create">
            <Plus className="h-4 w-4" />
            Create New Category
          </Link>
        </Button>
      </CardHeader>
      <DataTable
        data={categories}
        columns={columns}
        actions={actions}
        emptyMessage="No categories found. Create your first category to get started."
        itemCountLabel="category"
      />
    </Card>
  );
}