import clsx from "clsx";
import { IconCheck, IconAlertTriangle, IconTrendingUp } from "@tabler/icons-react";

import type { CompetencyStatus } from "@src/types/competency";

interface StatusBadgeProps {
  status: CompetencyStatus;
  className?: string;
}

/**
 * StatusBadge Component - Professional status indicator with icons
 *
 * DESIGN DECISION: Using Tabler icons instead of emoji for:
 * - Consistent rendering across all devices and browsers
 * - Professional appearance suitable for BOD presentation
 * - Better color customization and size control
 * - Accessibility improvements with semantic colors
 *
 * COLOR SCHEME:
 * - Fit (green): Indicates competency meets or exceeds expectations
 * - Gap (orange): Warning state requiring attention/development
 * - Exceed (blue): Outstanding performance, using KF brand blue
 */
export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config: Record<CompetencyStatus, {
    bg: string;
    text: string;
    border: string;
    icon: typeof IconCheck;
    label: string;
  }> = {
    fit: {
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-200",
      icon: IconCheck,
      label: "Fit",
    },
    gap: {
      bg: "bg-orange-100",
      text: "text-orange-800",
      border: "border-orange-200",
      icon: IconAlertTriangle,
      label: "Gap",
    },
    exceed: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-200",
      icon: IconTrendingUp,
      label: "Exceed",
    },
  };

  const { bg, text, border, icon: Icon, label } = config[status];

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium transition-all",
        bg,
        text,
        border,
        className,
      )}
    >
      <Icon size={16} className="flex-shrink-0" />
      <span>{label}</span>
    </span>
  );
};
