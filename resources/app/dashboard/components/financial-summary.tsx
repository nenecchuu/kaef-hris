/**
 * Financial Summary Component
 * Displays HR financial metrics and utilisasi anggaran
 */

import {
  IconCurrencyDollar,
  IconSchool,
  IconTrendingUp,
  IconUsers,
} from "@tabler/icons-react";

import { cn } from "@src/lib/styling";
import { Card } from "@src/ui/card";

import { formatIDR, formatPercentage } from "../data/mock-data";
import type { FinancialMetrics } from "../types/dashboard.types";

interface FinancialSummaryProps {
  metrics: FinancialMetrics;
  className?: string;
}

export function FinancialSummary({
  metrics,
  className,
}: FinancialSummaryProps) {
  return (
    <Card className={cn("p-6", className)}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Ringkasan Keuangan SDM
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Ringkasan biaya SDM dan utilisasi anggaran
        </p>
      </div>

      {/* Main Metric - Total Biaya SDM */}
      <div className="mb-6 rounded-lg border-2 border-brand-primary/20 bg-brand-primary/5 p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-brand-primary/10 p-4">
            <IconCurrencyDollar className="h-8 w-8 text-brand-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Biaya SDM</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">
              {formatIDR(metrics.totalHRCost, true)}
            </p>
            <p className="mt-1 text-xs text-gray-500">Per tahun (FY 2024)</p>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="flex items-center gap-2">
            <IconUsers className="h-5 w-5 text-blue-600" />
            <p className="text-xs font-medium text-gray-600">
              Biaya per Karyawan
            </p>
          </div>
          <p className="mt-2 text-xl font-bold text-gray-900">
            {formatIDR(metrics.costPerEmployee, true)}
          </p>
          <p className="mt-1 text-xs text-gray-500">Per tahun</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="flex items-center gap-2">
            <IconTrendingUp className="h-5 w-5 text-green-600" />
            <p className="text-xs font-medium text-gray-600">
              Gaji % dari Pendapatan
            </p>
          </div>
          <p className="mt-2 text-xl font-bold text-gray-900">
            {formatPercentage(metrics.payrollPercentOfRevenue)}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Rata-rata industri: 11-13%
          </p>
        </div>
      </div>

      {/* Utilisasi Anggaran Pelatihan */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconSchool className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">
              Utilisasi Anggaran Pelatihan
            </span>
          </div>
          <span className="text-sm font-semibold text-gray-900">
            {formatPercentage(metrics.trainingBudgetUtilization)}
          </span>
        </div>
        <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-purple-500 transition-all duration-500"
            style={{ width: `${metrics.trainingBudgetUtilization}%` }}
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Target: 85% | Sisa budget: Rp{" "}
          {formatIDR(
            (100 - metrics.trainingBudgetUtilization) * 1000000000,
            true,
          )}
        </p>
      </div>

      {/* Recruitment Cost */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">
              Biaya Rekrutmen per Karyawan
            </p>
            <p className="mt-1 text-xl font-bold text-gray-900">
              {formatIDR(metrics.recruitmentCostPerHire, true)}
            </p>
          </div>
          <div className="rounded-full bg-green-100 px-3 py-1">
            <p className="text-xs font-medium text-green-700">-8% vs Q1</p>
          </div>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Biaya rata-rata untuk rekrutmen karyawan baru (termasuk training)
        </p>
      </div>

      {/* Cost Efficiency Note */}
      <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-3">
        <p className="text-xs font-medium text-blue-800">
          Efisiensi biaya SDM dalam target BUMN. Gaji sebagai % dari pendapatan
          berada di bawah rata-rata industri, menunjukkan efisiensi operasional
          yang baik.
        </p>
      </div>
    </Card>
  );
}
