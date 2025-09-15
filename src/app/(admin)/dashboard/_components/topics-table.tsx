"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Topic } from "@/lib/types/topic.types";
import { ColumnDef, ActionDef } from "@/lib/types/table.types";
import { topicsService } from "@/lib/services/topics.service";
import { Edit, Plus } from "lucide-react";

interface TopicsTableProps {
  initialTopics: Topic[];
}

export function TopicsTable({ initialTopics }: TopicsTableProps) {
  const [topics, setTopics] = useState<Topic[]>(initialTopics);

  const handleToggleActive = async (topicId: string) => {
    try {
      const updatedTopic = await topicsService.toggleActive(topicId);
      if (updatedTopic) {
        const updatedTopics = await topicsService.getAll();
        setTopics(updatedTopics);
      }
    } catch (error) {
      console.error('Error toggling topic status:', error);
      // Optionally show user-friendly error message here
    }
  };

  const columns: ColumnDef<Topic>[] = [
    {
      key: "name",
      label: "Name",
      className: "font-medium",
    },
    {
      key: "slug",
      label: "Slug",
      className: "text-muted-foreground font-mono text-sm",
    },
    {
      key: "description",
      label: "Description",
      responsive: "md:table-cell",
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
      width: "w-24",
      className: "text-center",
    },
    {
      key: "is_active",
      label: "Status",
      width: "w-20",
      render: (value: unknown, topic: Topic) => (
        <Switch
          checked={value as boolean}
          onCheckedChange={() => handleToggleActive(topic.id)}
          aria-label={`Toggle ${topic.name} active status`}
        />
      ),
    },
    {
      key: "created_at",
      label: "Created at",
      responsive: "lg:table-cell",
      className: "text-sm text-muted-foreground",
    },
  ];

  const actions: ActionDef<Topic>[] = [
    {
      label: `Edit topic`,
      icon: <Edit className="h-4 w-4" />,
      href: (topic: Topic) => `/dashboard/topics/${topic.id}`,
      variant: "ghost",
      size: "sm",
      className: "h-8 w-8 p-0",
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-0">
        <CardTitle>Topics Management</CardTitle>
        <Button size="sm" asChild>
          <Link href="/dashboard/topics/create">
            <Plus className="h-4 w-4" />
            Create New Topic
          </Link>
        </Button>
      </CardHeader>
      <DataTable
        data={topics}
        columns={columns}
        actions={actions}
        emptyMessage="No topics found. Create your first topic to get started."
        itemCountLabel="topic"
      />
    </Card>
  );
}