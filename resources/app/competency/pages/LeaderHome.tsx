import * as React from "react";
import {
  IconAlertTriangle,
  IconChartBar,
  IconUsers,
} from "@tabler/icons-react";

import { LoadingFallback } from "@src/components/fallbacks";

import { BottomNavLeader } from "../components/BottomNavLeader";
import { KPICard } from "../components/KPICard";
import { useLeaderTeam } from "../hooks/useLeaderTeam";

export function LeaderHome() {
  const { data, isLoading } = useLeaderTeam();

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-red-600">Error loading data</div>
      </div>
    );
  }

  const { leader_name, leader_position, team_kpi } = data;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header with Title */}
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">
          Dashboard Kompetensi
        </h1>
      </div>

      {/* Leader Info Card - Background biru, text putih */}
      <div className="bg-kf-blue p-6 text-gray-100">
        <div className="mb-2 text-sm text-gray-100">Selamat Pagi,</div>
        <div className="text-xl font-bold text-gray-100">{leader_name}</div>
        <div className="text-sm text-gray-100 opacity-90">
          {leader_position}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="space-y-4 p-4">
        <KPICard
          icon={<IconUsers size={32} />}
          title="Total Anggota Tim"
          value={team_kpi.total_members}
          trend="+2 dari bulan lalu"
        />
        <KPICard
          icon={<IconChartBar size={32} />}
          title="Rata-rata Fit Rate Tim"
          value={`${team_kpi.avg_fit_rate}%`}
          trend="+5% dari bulan lalu"
          valueColor="success"
        />
        <KPICard
          icon={<IconAlertTriangle size={32} />}
          title="Gap Kritis"
          value={team_kpi.critical_gaps}
          trend="Karyawan perlu development"
          valueColor="warning"
        />

        {/* Status Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="mb-4 font-semibold">Status Distribusi:</div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>✅ Fit</span>
              <span className="font-semibold">
                {team_kpi.status_distribution.fit} (
                {(
                  (team_kpi.status_distribution.fit / team_kpi.total_members) *
                  100
                ).toFixed(1)}
                %)
              </span>
            </div>
            <div className="flex justify-between">
              <span>⚠️ Gap</span>
              <span className="font-semibold">
                {team_kpi.status_distribution.gap} (
                {(
                  (team_kpi.status_distribution.gap / team_kpi.total_members) *
                  100
                ).toFixed(1)}
                %)
              </span>
            </div>
            <div className="flex justify-between">
              <span>⬆️ Exceed</span>
              <span className="font-semibold">
                {team_kpi.status_distribution.exceed} (
                {(
                  (team_kpi.status_distribution.exceed /
                    team_kpi.total_members) *
                  100
                ).toFixed(1)}
                %)
              </span>
            </div>
          </div>
        </div>
      </div>

      <BottomNavLeader />
    </div>
  );
}
