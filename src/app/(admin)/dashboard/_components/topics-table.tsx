"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Topic } from "@/lib/types/topic.types";
import { topicsService } from "@/lib/data/mock-topics";
import { Edit, Plus } from "lucide-react";

interface TopicsTableProps {
  initialTopics: Topic[];
}

export function TopicsTable({ initialTopics }: TopicsTableProps) {
  const [topics, setTopics] = useState<Topic[]>(initialTopics);

  const handleToggleActive = (topicId: number) => {
    const updatedTopic = topicsService.toggleActive(topicId);
    if (updatedTopic) {
      setTopics(topicsService.getAll());
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between  md:gap-0">
        <CardTitle>Topics Management</CardTitle>
        <Button size="sm" asChild>
          <Link href="/dashboard/topics/create">
            <Plus className="h-4 w-4" />
            Create New Topic
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="w-24">Order</TableHead>
                <TableHead className="w-20">Status</TableHead>
                <TableHead className="hidden lg:table-cell">Created at</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topics.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No topics found. Create your first topic to get started.
                  </TableCell>
                </TableRow>
              ) : (
                topics.map((topic) => (
                  <TableRow key={topic.id}>
                    <TableCell className="font-medium">{topic.name}</TableCell>
                    <TableCell className="text-muted-foreground font-mono text-sm">
                      {topic.slug}
                    </TableCell>
                    <TableCell className="hidden md:table-cell max-w-xs">
                      <div className="truncate" title={topic.description}>
                        {topic.description}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{topic.display_order}</TableCell>
                    <TableCell>
                      <Switch
                        checked={topic.is_active}
                        onCheckedChange={() => handleToggleActive(topic.id)}
                        aria-label={`Toggle ${topic.name} active status`}
                      />
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                      {formatDate(topic.created_at)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="h-8 w-8 p-0"
                      >
                        <Link href={`/dashboard/topics/${topic.id}`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit {topic.name}</span>
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {topics.length > 0 && (
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {topics.length} topic{topics.length !== 1 ? "s" : ""}
          </div>
        )}
      </CardContent>
    </Card>
  );
}