/**
 * KPI Card Component
 * Reusable card for displaying key performance indicators
 */

import {
  IconArrowDown,
  IconArrowUp,
  IconMinus,
  type TablerIcon,
} from "@tabler/icons-react";

import { cn } from "@src/lib/styling";
import { Card } from "@src/ui/card";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    period: string;
    trend: "up" | "down" | "neutral";
  };
  icon?: TablerIcon;
  status?: "success" | "warning" | "error" | "neutral";
  subtitle?: string;
  className?: string;
  onClick?: () => void;
}

export function KPICard({
  title,
  value,
  change,
  icon: Icon,
  status = "neutral",
  subtitle,
  className,
  onClick,
}: KPICardProps) {
  const getTrendIcon = () => {
    if (!change) return null;

    switch (change.trend) {
      case "up":
        return <IconArrowUp className="h-4 w-4" />;
      case "down":
        return <IconArrowDown className="h-4 w-4" />;
      default:
        return <IconMinus className="h-4 w-4" />;
    }
  };

  const getTrendColor = () => {
    if (!change) return "";

    // For most metrics, up is good (green), but context matters
    // This is a simplified version
    switch (change.trend) {
      case "up":
        return "text-green-600 bg-green-50";
      case "down":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "border-l-4 border-l-green-500";
      case "warning":
        return "border-l-4 border-l-yellow-500";
      case "error":
        return "border-l-4 border-l-red-500";
      default:
        return "border-l-4 border-l-gray-300";
    }
  };

  const cardContent = (
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
          {change && (
            <div
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                getTrendColor(),
              )}
            >
              {getTrendIcon()}
              <span>
                {change.value > 0 ? "+" : ""}
                {change.value}%
              </span>
            </div>
          )}
        </div>
        {subtitle && <p className="mt-1 text-xs text-gray-500">{subtitle}</p>}
        {change && (
          <p className="mt-2 text-xs text-gray-500">vs {change.period}</p>
        )}
      </div>

      {Icon && (
        <div className="rounded-lg bg-brand-primary/10 p-3">
          <Icon className="h-6 w-6 text-brand-primary" />
        </div>
      )}
    </div>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "w-full text-left",
          "cursor-pointer transition-transform hover:scale-[1.02]",
        )}
      >
        <Card className={cn("p-6", getStatusColor(), className)}>
          {cardContent}
        </Card>
      </button>
    );
  }

  return (
    <Card className={cn("p-6", getStatusColor(), className)}>
      {cardContent}
    </Card>
  );
}
