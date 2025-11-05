import type { ReactNode } from "react";
import clsx from "clsx";

interface KPICardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  trend?: string;
  valueColor?: "default" | "success" | "warning" | "danger";
  className?: string;
}

export const KPICard = ({
  icon,
  title,
  value,
  trend,
  valueColor = "default",
  className,
}: KPICardProps) => {
  const valueColors = {
    default: "text-gray-900",
    success: "text-green-600",
    warning: "text-orange-600",
    danger: "text-red-600",
  };

  return (
    <div
      className={clsx(
        "bg-white rounded-lg border border-gray-200 p-6 shadow-sm transition hover:shadow-md",
        className,
      )}
    >
      <div className="mb-2 text-kf-blue">{icon}</div>
      <div className="text-sm text-gray-600">{title}</div>
      <div className={clsx("mt-1 text-3xl font-bold", valueColors[valueColor])}>
        {value}
      </div>
      {trend && <div className="mt-2 text-xs text-gray-500">{trend}</div>}
    </div>
  );
};
