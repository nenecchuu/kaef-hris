/**
 * Division Overview Component
 * Displays workforce distribution across Kimia Farma's business divisions
 */

import { useNavigate } from "react-router-dom";

import { cn } from "@src/lib/styling";
import { Card } from "@src/ui/card";

import { formatNumber } from "../data/mock-data";
import type { DivisionData } from "../types/dashboard.types";

interface DivisionOverviewProps {
  divisions: DivisionData[];
  className?: string;
  onDivisionClick?: (divisionId: string) => void;
}

export function DivisionOverview({
  divisions,
  className,
  onDivisionClick,
}: DivisionOverviewProps) {
  const navigate = useNavigate();

  const handleDivisionClick = (divisionId: string) => {
    if (onDivisionClick) {
      onDivisionClick(divisionId);
    } else {
      navigate(`/employees/${divisionId}`);
    }
  };

  const getStatusColor = (status: DivisionData["status"]) => {
    switch (status) {
      case "healthy":
        return "bg-green-500";
      case "attention":
        return "bg-yellow-500";
      case "critical":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusLabel = (status: DivisionData["status"]) => {
    switch (status) {
      case "healthy":
        return "Optimal";
      case "attention":
        return "Perhatian";
      case "critical":
        return "Kritis";
      default:
        return "Normal";
    }
  };

  return (
    <Card className={cn("p-6", className)}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Distribusi Karyawan per Divisi
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Breakdown tenaga kerja berdasarkan unit bisnis
        </p>
      </div>

      <div className="space-y-4">
        {divisions.map((division) => (
          <div
            key={division.id}
            className="-mx-3 cursor-pointer space-y-2 rounded-lg p-3 transition-colors hover:bg-gray-50"
            onClick={() => handleDivisionClick(division.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleDivisionClick(division.id);
              }
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "h-2 w-2 rounded-full",
                    getStatusColor(division.status),
                  )}
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {division.name}
                  </p>
                  {division.facilities && (
                    <p className="text-xs text-gray-500">
                      {formatNumber(division.facilities)} lokasi
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {formatNumber(division.headcount)}
                </p>
                <p className="text-xs text-gray-500">
                  {division.percentage.toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className={cn(
                  "h-full transition-all duration-500",
                  getStatusColor(division.status),
                )}
                style={{ width: `${division.percentage}%` }}
              />
            </div>

            {/* Additional info */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">
                Cost/Employee: Rp {division.costPerEmployee.toFixed(1)}M/tahun
              </span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 font-medium",
                  division.status === "healthy"
                    ? "bg-green-50 text-green-700"
                    : division.status === "attention"
                      ? "bg-yellow-50 text-yellow-700"
                      : "bg-red-50 text-red-700",
                )}
              >
                {getStatusLabel(division.status)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-600">Total Karyawan</span>
          <span className="text-lg font-bold text-gray-900">
            {formatNumber(
              divisions.reduce((sum, div) => sum + div.headcount, 0),
            )}
          </span>
        </div>
      </div>
    </Card>
  );
}
