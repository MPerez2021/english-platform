"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DataTableProps,
  TableAction,
  TableColumn,
} from "@/lib/types/table.types";
import Link from "next/link";

function getNestedValue(obj: unknown, key: string): unknown {
  return key
    .split(".")
    .reduce((value, k) => (value as Record<string, unknown>)?.[k], obj);
}

export function DataTable<T>({
  data,
  columns,
  actions = [],
  emptyMessage = "No data found.",
  onRowClick,
}: DataTableProps<T>) {
  const totalColumns = columns.length + (actions.length > 0 ? 1 : 0);

  const renderCell = (column: TableColumn<T>, item: T, index: number) => {
    if (column.render) {
      return column.render(
        getNestedValue(item, column.key as string),
        item,
        index
      );
    }

    const value = getNestedValue(item, column.key as string);

    if (value instanceof Date) {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(value);
    }

    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }

    return value?.toString() || "";
  };

  const renderAction = (action: TableAction<T>, item: T, index: number) => {
    const isDisabled = action.disabled?.(item) ?? false;

    if (action.href && !isDisabled) {
      const href =
        typeof action.href === "function" ? action.href(item) : action.href;

      return (
        <Button
          key={action.label}
          variant={action.variant || "ghost"}
          size={action.size || "sm"}
          asChild={action.asChild ?? true}
          className={action.className}
          disabled={isDisabled}
        >
          <Link href={href}>
            {action.icon}
            {action.label && <span className="sr-only">{action.label}</span>}
          </Link>
        </Button>
      );
    }

    return (
      <Button
        key={action.label}
        variant={action.variant || "ghost"}
        size={action.size || "sm"}
        onClick={() => action.onClick?.(item, index)}
        className={action.className}
        disabled={isDisabled}
      >
        {action.icon}
        {action.label && <span className="sr-only">{action.label}</span>}
      </Button>
    );
  };

  return (
    <CardContent>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key as string}
                  className={`${column.headerClassName || ""} ${
                    column.responsive === "hidden" ? "hidden" : ""
                  } ${
                    column.responsive && column.responsive !== "hidden"
                      ? `hidden ${column.responsive}`
                      : ""
                  }`}
                  style={{ width: column.width }}
                >
                  {column.label}
                </TableHead>
              ))}
              {actions.length > 0 && (
                <TableHead className="w-20">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={totalColumns}
                  className="text-center py-8 text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, index) => (
                <TableRow
                  key={index}
                  className={
                    onRowClick ? "cursor-pointer hover:bg-muted/50" : ""
                  }
                  onClick={() => onRowClick?.(item, index)}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.key as string}
                      className={`${column.className || ""} ${
                        column.responsive === "hidden" ? "hidden" : ""
                      } ${
                        column.responsive && column.responsive !== "hidden"
                          ? `hidden ${column.responsive}`
                          : ""
                      }`}
                    >
                      {renderCell(column, item, index)}
                    </TableCell>
                  ))}
                  {actions.length > 0 && (
                    <TableCell>
                      <div className="flex gap-1">
                        {actions.map((action) =>
                          renderAction(action, item, index)
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  );
}
