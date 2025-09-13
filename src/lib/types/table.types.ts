import { ReactNode } from "react";

export interface TableColumn<T = Record<string, unknown>> {
  key: keyof T | string;
  label: string;
  render?: (value: unknown, item: T, index: number) => ReactNode;
  className?: string;
  headerClassName?: string;
  responsive?: "hidden" | "md:table-cell" | "lg:table-cell" | "xl:table-cell";
  width?: string;
  sortable?: boolean;
}

export interface TableAction<T = Record<string, unknown>> {
  label: string;
  icon?: ReactNode;
  onClick?: (item: T, index: number) => void;
  href?: string | ((item: T) => string);
  variant?: "default" | "ghost" | "outline" | "secondary";
  size?: "default" | "sm" | "lg";
  className?: string;
  disabled?: (item: T) => boolean;
  asChild?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  actions?: TableAction<T>[];
  emptyMessage?: string;
  showItemCount?: boolean;
  itemCountLabel?: string;
  className?: string;
  onRowClick?: (item: T, index: number) => void;
}

export type ColumnDef<T> = TableColumn<T>;
export type ActionDef<T> = TableAction<T>;