import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface CefrLevelBadgeProps {
  /** The CEFR level (A1, A2, B1, B2, C1, C2) */
  level: string;
  /** Badge variant */
  variant?: "default" | "secondary" | "destructive" | "outline";
  /** Additional CSS classes */
  className?: string;
}

/**
 * A reusable badge component for displaying CEFR (Common European Framework of Reference) language levels.
 * Provides consistent styling and color coding across the application.
 */
export function CefrLevelBadge({
  level,
  variant = "secondary",
  className
}: CefrLevelBadgeProps) {
  const colorMap: Record<string, string> = {
    A1: "bg-chart-1 text-primary-foreground",
    A2: "bg-chart-2 text-primary-foreground",
    B1: "bg-chart-3 text-primary-foreground",
    B2: "bg-chart-4 text-primary-foreground",
    C1: "bg-destructive text-destructive-foreground",
    C2: "bg-primary text-primary-foreground",
  };

  const levelColors = colorMap[level] || "";

  return (
    <Badge
      variant={variant}
      className={cn(levelColors, className)}
      aria-label={`CEFR Level ${level}`}
    >
      {level}
    </Badge>
  );
}