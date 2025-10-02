import Link from "next/link";
import { Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface LessonBreadcrumbProps {
  /** Topic name */
  topic: string;
  /** Category name */
  category: string;
  /** Subcategory name */
  subcategory: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Breadcrumb navigation component for lesson pages
 * Displays the navigation path: Home → Topic → Category → Subcategory
 */
export function LessonBreadcrumb({
  topic,
  category,
  subcategory,
  className = "",
}: LessonBreadcrumbProps) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" aria-label="Go to home page">
              <Home className="h-4 w-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/topics/${topic.toLowerCase().replace(/\s+/g, "-")}`}>
              {topic}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/topics/${topic.toLowerCase().replace(/\s+/g, "-")}`}>
              {category}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbPage>{subcategory}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
