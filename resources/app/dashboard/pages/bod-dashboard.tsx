/**
 * Dashboard Eksekutif
 * Analitik SDM tingkat Direksi untuk PT Kimia Farma Tbk
 */

import * as React from "react";
import {
  IconAlertCircle,
  IconChartBar,
  IconTrendingUp,
  IconUsers,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import { View } from "@src/ui/view";

import { ComplianceIndicator } from "../components/compliance-indicator";
import { DivisionOverview } from "../components/division-overview";
import { FinancialSummary } from "../components/financial-summary";
import { KPICard } from "../components/kpi-card";
import { TalentPipeline } from "../components/talent-pipeline";
import {
  BOD_DASHBOARD_DATA,
  formatIDR,
  formatNumber,
  formatPercentage,
} from "../data/mock-data";

export function BODDashboardPage() {
  const navigate = useNavigate();
  const data = BOD_DASHBOARD_DATA;

  // Calculate trend from employee data
  const employeeTrend = React.useMemo(() => {
    const current = data.overview.totalEmployees;
    const previous =
      data.overview.employeeTrend[data.overview.employeeTrend.length - 2]
        ?.value || current;
    const change = ((current - previous) / previous) * 100;
    return {
      value: Number(change.toFixed(1)),
      trend:
        change > 0
          ? ("up" as const)
          : change < 0
            ? ("down" as const)
            : ("neutral" as const),
    };
  }, [data]);

  const lastUpdated = new Date(data.lastUpdated).toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View>
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Eksekutif Sumber Daya Manusia
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            PT Kimia Farma Tbk - Ringkasan Eksekutif untuk Direksi
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Terakhir diperbarui: {lastUpdated}
          </p>
        </div>

        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <KPICard
            title="Total Karyawan"
            value={formatNumber(data.overview.totalEmployees)}
            change={{
              value: employeeTrend.value,
              period: "bulan lalu",
              trend: employeeTrend.trend,
            }}
            icon={IconUsers}
            status="success"
            subtitle="Seluruh divisi"
            onClick={() => navigate("/employees")}
          />

          <KPICard
            title="Utilisasi Anggaran SDM"
            value={`${formatPercentage(data.overview.hrBudgetUtilization)}`}
            change={{
              value: 5.2,
              period: "target tahun berjalan",
              trend: "up",
            }}
            icon={IconChartBar}
            status="success"
            subtitle={`${formatIDR(data.financial.totalHRCost, true)} terpakai`}
          />

          <KPICard
            title="Perencanaan Regenerasi"
            value={`${formatPercentage(data.talent.successionReadiness)}`}
            change={{
              value: 3.1,
              period: "Kuartal I 2024",
              trend: "up",
            }}
            icon={IconTrendingUp}
            status="warning"
            subtitle="Target: 85%"
          />

          <KPICard
            title="Isu yang Memerlukan Tindakan"
            value={data.overview.criticalAlerts}
            icon={IconAlertCircle}
            status="warning"
            subtitle="Memerlukan keputusan Direksi"
          />
        </div>

        {/* Two Column Layout for Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Division Overview */}
            <DivisionOverview divisions={data.divisions} />

            {/* Financial Summary */}
            <FinancialSummary metrics={data.financial} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Talent Pipeline */}
            <TalentPipeline data={data.talent} />

            {/* Compliance Indicator */}
            <ComplianceIndicator metrics={data.compliance} />
          </div>
        </div>

        {/* Strategic Insights Section */}
        <div className="rounded-lg border-2 border-brand-primary/30 bg-brand-primary/5 p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Temuan & Rekomendasi Strategis
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="mb-2 text-sm font-semibold text-green-700">
                Kekuatan
              </h4>
              <ul className="space-y-1 text-xs text-gray-700">
                <li>• Efisiensi biaya SDM sesuai target BUMN</li>
                <li>• Tingkat kepatuhan tinggi di semua kategori</li>
                <li>• Pengembangan SDM berjalan baik untuk pertumbuhan</li>
                <li>• Divisi retail beroperasi optimal</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="mb-2 text-sm font-semibold text-yellow-700">
                Yang Perlu Diperhatikan
              </h4>
              <ul className="space-y-1 text-xs text-gray-700">
                <li>• Efisiensi kepegawaian divisi manufaktur</li>
                <li>• Audit keselamatan tertunda di 3 lokasi</li>
                <li>• Regenerasi kepemimpinan masih di bawah target 85%</li>
                <li>• Anggaran pelatihan belum optimal (82,5%)</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="mb-2 text-sm font-semibold text-blue-700">
                Usulan Tindak Lanjut
              </h4>
              <ul className="space-y-1 text-xs text-gray-700">
                <li>• Percepat program regenerasi kepemimpinan</li>
                <li>
                  • Selesaikan audit keselamatan tertunda sebelum akhir tahun
                </li>
                <li>• Optimalisasi penempatan tenaga kerja manufaktur</li>
                <li>• Tingkatkan partisipasi program pelatihan</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs text-gray-600">
            <strong>Catatan:</strong> Dashboard ini merupakan prototype untuk
            presentasi kepada Direksi. Data yang ditampilkan adalah data
            simulasi berdasarkan skala operasional PT Kimia Farma Tbk (1.300+
            apotek, 400+ klinik). Untuk implementasi produksi, data akan
            terintegrasi dengan sistem HRIS existing dan database real-time.
          </p>
        </div>
      </div>
    </View>
  );
}
