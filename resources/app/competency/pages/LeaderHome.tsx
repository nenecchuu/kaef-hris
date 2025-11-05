import * as React from "react";
import {
  IconAlertTriangle,
  IconChartBar,
  IconUsers,
  IconCheck,
  IconTrendingUp,
  IconMail,
  IconPhone,
  IconBuilding,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import { LoadingFallback } from "@src/components/fallbacks";
import { Avatar, AvatarImage, AvatarFallback } from "@src/ui/avatar";

import { BottomNavLeader } from "../components/BottomNavLeader";
import { KPICard } from "../components/KPICard";
import { useLeaderTeam } from "../hooks/useLeaderTeam";

export function LeaderHome() {
  const { data, isLoading } = useLeaderTeam();
  const navigate = useNavigate();

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

  const {
    leader_name,
    leader_position,
    leader_division,
    leader_email,
    leader_photo,
    leader_phone,
    team_kpi
  } = data;

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Selamat Pagi";
    if (hour < 15) return "Selamat Siang";
    if (hour < 18) return "Selamat Sore";
    return "Selamat Malam";
  };

  // Navigation handlers for interactivity
  const handleTotalMembersClick = () => navigate("/leader/team");
  const handleGapKritisClick = () => navigate("/leader/team?filter=gap");
  const handleFitRateClick = () => navigate("/leader/analysis");
  const handleStatusClick = (status: "fit" | "gap" | "exceed") => {
    navigate(`/leader/team?filter=${status}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Rich Leader Profile Card with Avatar and Details */}
      {/* DESIGN DECISION: Using gradient with brand colors for visual impact */}
      {/* BOD BENEFIT: Professional, executive-level presentation */}
      <div className="bg-gradient-to-br from-kf-blue to-kf-blue-dark p-6 text-white shadow-lg">
        <div className="flex items-start gap-4">
          {/* Large Avatar */}
          <Avatar className="h-20 w-20 border-4 border-white/20 shadow-xl">
            <AvatarImage
              src={leader_photo || "https://i.pravatar.cc/150?u=L001"}
              alt={leader_name}
            />
            <AvatarFallback className="bg-kf-orange text-white text-2xl font-bold">
              {leader_name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>

          {/* Leader Info */}
          <div className="flex-1">
            <div className="mb-1 text-sm text-white/80">{getGreeting()},</div>
            <div className="text-2xl font-bold text-white mb-1">{leader_name}</div>
            <div className="text-sm text-white/90 mb-3">{leader_position}</div>

            {/* Contact Info with Icons - Using secondary color accents */}
            <div className="space-y-1.5">
              {leader_division && (
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <IconBuilding size={16} className="text-kf-orange" />
                  <span>{leader_division}</span>
                </div>
              )}
              {leader_email && (
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <IconMail size={16} className="text-kf-orange" />
                  <span>{leader_email}</span>
                </div>
              )}
              {leader_phone && (
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <IconPhone size={16} className="text-kf-orange" />
                  <span>{leader_phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards - Now Interactive */}
      <div className="space-y-4 p-4">
        {/* Interactivity: Click to navigate to team list */}
        <div onClick={handleTotalMembersClick} className="cursor-pointer">
          <KPICard
            icon={<IconUsers size={32} />}
            title="Total Anggota Tim"
            value={team_kpi.total_members}
            trend="+2 dari bulan lalu"
          />
        </div>
        {/* Interactivity: Click to navigate to analysis page */}
        <div onClick={handleFitRateClick} className="cursor-pointer">
          <KPICard
            icon={<IconChartBar size={32} />}
            title="Rata-rata Fit Rate Tim"
            value={`${team_kpi.avg_fit_rate}%`}
            trend="+5% dari bulan lalu"
            valueColor="success"
          />
        </div>
        {/* Interactivity: Click to navigate to team with gap filter */}
        <div onClick={handleGapKritisClick} className="cursor-pointer">
          <KPICard
            icon={<IconAlertTriangle size={32} />}
            title="Gap Kritis"
            value={team_kpi.critical_gaps}
            trend="Karyawan perlu development"
            valueColor="warning"
          />
        </div>

        {/* Status Distribution with Visual Bars - No More Emoji! */}
        {/* DESIGN DECISION: Using progress bars and proper icons for professional look */}
        {/* BOD BENEFIT: Visual representation makes data easier to digest */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="mb-4 font-semibold text-gray-900">Status Distribusi Tim</div>
          <div className="space-y-4">
            {/* Fit Status - Clickable */}
            <div
              onClick={() => handleStatusClick("fit")}
              className="cursor-pointer rounded-lg border border-green-200 bg-green-50 p-4 transition-all hover:shadow-md"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconCheck size={20} className="text-green-600" />
                  <span className="font-medium text-green-900">Fit</span>
                </div>
                <span className="text-lg font-bold text-green-700">
                  {team_kpi.status_distribution.fit} (
                  {((team_kpi.status_distribution.fit / team_kpi.total_members) * 100).toFixed(1)}%)
                </span>
              </div>
              {/* Progress Bar */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-green-200">
                <div
                  className="h-full rounded-full bg-green-600 transition-all"
                  style={{
                    width: `${(team_kpi.status_distribution.fit / team_kpi.total_members) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Gap Status - Clickable */}
            <div
              onClick={() => handleStatusClick("gap")}
              className="cursor-pointer rounded-lg border border-orange-200 bg-orange-50 p-4 transition-all hover:shadow-md"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconAlertTriangle size={20} className="text-orange-600" />
                  <span className="font-medium text-orange-900">Gap</span>
                </div>
                <span className="text-lg font-bold text-orange-700">
                  {team_kpi.status_distribution.gap} (
                  {((team_kpi.status_distribution.gap / team_kpi.total_members) * 100).toFixed(1)}%)
                </span>
              </div>
              {/* Progress Bar */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-orange-200">
                <div
                  className="h-full rounded-full bg-orange-600 transition-all"
                  style={{
                    width: `${(team_kpi.status_distribution.gap / team_kpi.total_members) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Exceed Status - Clickable */}
            <div
              onClick={() => handleStatusClick("exceed")}
              className="cursor-pointer rounded-lg border border-blue-200 bg-blue-50 p-4 transition-all hover:shadow-md"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconTrendingUp size={20} className="text-blue-600" />
                  <span className="font-medium text-blue-900">Exceed</span>
                </div>
                <span className="text-lg font-bold text-blue-700">
                  {team_kpi.status_distribution.exceed} (
                  {((team_kpi.status_distribution.exceed / team_kpi.total_members) * 100).toFixed(1)}%)
                </span>
              </div>
              {/* Progress Bar */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-blue-200">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{
                    width: `${(team_kpi.status_distribution.exceed / team_kpi.total_members) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>

          {/* Helpful hint for interactivity */}
          <div className="mt-4 text-center text-xs text-gray-500">
            Klik pada status untuk filter tim
          </div>
        </div>
      </div>

      <BottomNavLeader />
    </div>
  );
}
