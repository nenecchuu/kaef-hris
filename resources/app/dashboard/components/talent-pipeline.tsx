/**
 * Talent Pipeline Component
 * Displays succession planning and leadership pipeline data
 */

import { IconTarget, IconTrendingUp, IconUsers } from "@tabler/icons-react";

import { cn } from "@src/lib/styling";
import { Card } from "@src/ui/card";

import { formatNumber } from "../data/mock-data";
import type { TalentPipelineData } from "../types/dashboard.types";

interface TalentPipelineProps {
  data: TalentPipelineData;
  className?: string;
}

export function TalentPipeline({ data, className }: TalentPipelineProps) {
  const getReadinessColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className={cn("p-6", className)}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Pengembangan Talenta & Regenerasi
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Perencanaan regenerasi & pengembangan kepemimpinan
        </p>
      </div>

      {/* Key Metrics Row */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
          <IconUsers className="mx-auto mb-2 h-8 w-8 text-brand-primary" />
          <p className="text-2xl font-bold text-gray-900">
            {formatNumber(data.totalHighPotential)}
          </p>
          <p className="mt-1 text-xs text-gray-600">Karyawan Potensial</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
          <IconTarget className="mx-auto mb-2 h-8 w-8 text-green-600" />
          <p className="text-2xl font-bold text-gray-900">
            {data.successionReadiness.toFixed(1)}%
          </p>
          <p className="mt-1 text-xs text-gray-600">Perencanaan Regenerasi</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
          <IconTrendingUp className="mx-auto mb-2 h-8 w-8 text-blue-600" />
          <p className="text-2xl font-bold text-gray-900">
            {data.criticalRoleCoverage.toFixed(1)}%
          </p>
          <p className="mt-1 text-xs text-gray-600">Cakupan Posisi Penting</p>
        </div>
      </div>

      {/* Perencanaan Regenerasi Progress */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Perencanaan Regenerasi
          </span>
          <span className="text-sm font-semibold text-gray-900">
            {data.successionReadiness.toFixed(1)}%
          </span>
        </div>
        <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className={cn(
              "h-full transition-all duration-500",
              getReadinessColor(data.successionReadiness),
            )}
            style={{ width: `${data.successionReadiness}%` }}
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Target: 85% | Saat ini: {data.successionReadiness.toFixed(1)}%
        </p>
      </div>

      {/* Leadership Bench Breakdown */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-gray-900">
          Cadangan Pimpinan
        </h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Siap Promosi</span>
                <span className="text-sm font-semibold text-green-600">
                  {formatNumber(data.leadershipBench.ready)}
                </span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full bg-green-500"
                  style={{
                    width: `${(data.leadershipBench.ready / data.totalHighPotential) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  Sedang Dikembangkan
                </span>
                <span className="text-sm font-semibold text-yellow-600">
                  {formatNumber(data.leadershipBench.developing)}
                </span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full bg-yellow-500"
                  style={{
                    width: `${(data.leadershipBench.developing / data.totalHighPotential) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  Sudah Teridentifikasi
                </span>
                <span className="text-sm font-semibold text-blue-600">
                  {formatNumber(data.leadershipBench.identified)}
                </span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full bg-blue-500"
                  style={{
                    width: `${(data.leadershipBench.identified / data.totalHighPotential) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-3">
        <p className="text-sm font-medium text-green-800">
          Status: Pengembangan talenta dalam kondisi baik untuk mendukung
          strategi pertumbuhan perusahaan
        </p>
      </div>
    </Card>
  );
}
