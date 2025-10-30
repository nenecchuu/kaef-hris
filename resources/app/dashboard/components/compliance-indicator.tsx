/**
 * Compliance Indicator Component
 * Displays regulatory compliance status for pharmaceutical industry
 */

import {
  IconAlertTriangle,
  IconCircleCheck,
  IconShieldCheck,
} from "@tabler/icons-react";

import { cn } from "@src/lib/styling";
import { Card } from "@src/ui/card";

import type { ComplianceMetric } from "../types/dashboard.types";

interface ComplianceIndicatorProps {
  metrics: ComplianceMetric[];
  className?: string;
}

export function ComplianceIndicator({
  metrics,
  className,
}: ComplianceIndicatorProps) {
  const getStatusIcon = (status: ComplianceMetric["status"]) => {
    switch (status) {
      case "compliant":
        return IconCircleCheck;
      case "warning":
        return IconAlertTriangle;
      case "critical":
        return IconAlertTriangle;
      default:
        return IconShieldCheck;
    }
  };

  const getStatusColor = (status: ComplianceMetric["status"]) => {
    switch (status) {
      case "compliant":
        return {
          bg: "bg-green-50",
          text: "text-green-700",
          border: "border-green-200",
          icon: "text-green-600",
        };
      case "warning":
        return {
          bg: "bg-yellow-50",
          text: "text-yellow-700",
          border: "border-yellow-200",
          icon: "text-yellow-600",
        };
      case "critical":
        return {
          bg: "bg-red-50",
          text: "text-red-700",
          border: "border-red-200",
          icon: "text-red-600",
        };
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-700",
          border: "border-gray-200",
          icon: "text-gray-600",
        };
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 95) return "text-green-600";
    if (score >= 85) return "text-yellow-600";
    return "text-red-600";
  };

  const averageScore =
    metrics.reduce((sum, m) => sum + m.score, 0) / metrics.length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Card className={cn("p-6", className)}>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Kepatuhan Regulasi
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Status compliance industri farmasi
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <IconShieldCheck className="h-6 w-6 text-brand-primary" />
              <span
                className={cn(
                  "text-3xl font-bold",
                  getScoreColor(averageScore),
                )}
              >
                {averageScore.toFixed(1)}%
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Rata-rata Score</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {metrics.map((metric, index) => {
          const Icon = getStatusIcon(metric.status);
          const colors = getStatusColor(metric.status);

          return (
            <div
              key={index}
              className={cn(
                "rounded-lg border p-4 transition-all hover:shadow-sm",
                colors.border,
                colors.bg,
              )}
            >
              <div className="flex items-start gap-3">
                <Icon className={cn("mt-0.5 h-5 w-5", colors.icon)} />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900">
                        {metric.category}
                      </h4>
                      <p className="mt-1 text-xs text-gray-600">
                        {metric.details}
                      </p>
                    </div>
                    <div className="ml-4 text-right">
                      <span
                        className={cn(
                          "text-xl font-bold",
                          getScoreColor(metric.score),
                        )}
                      >
                        {metric.score.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Audit terakhir: {formatDate(metric.lastAudit)}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium",
                        colors.text,
                      )}
                    >
                      {metric.status === "compliant"
                        ? "Compliant"
                        : metric.status === "warning"
                          ? "Perlu Perhatian"
                          : "Critical"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Required Summary */}
      <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-start gap-3">
          <IconAlertTriangle className="mt-0.5 h-5 w-5 text-yellow-600" />
          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              Tindakan Diperlukan
            </h4>
            <p className="mt-1 text-xs text-gray-600">
              {metrics.filter((m) => m.status !== "compliant").length} area
              memerlukan perhatian BOD
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
