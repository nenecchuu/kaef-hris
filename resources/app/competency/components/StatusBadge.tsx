import clsx from "clsx";

import type { CompetencyStatus } from "@src/types/competency";

interface StatusBadgeProps {
  status: CompetencyStatus;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const variants: Record<CompetencyStatus, string> = {
    "✅ Fit": "bg-green-100 text-green-800 border-green-200",
    "⚠️ Gap": "bg-orange-100 text-orange-800 border-orange-200",
    "⬆️ Exceed": "bg-blue-100 text-blue-800 border-blue-200",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium",
        variants[status],
        className,
      )}
    >
      {status}
    </span>
  );
};
