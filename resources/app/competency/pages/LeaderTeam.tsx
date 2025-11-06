import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IconBuilding, IconFilter } from "@tabler/icons-react";

import { LoadingFallback } from "@src/components/fallbacks";
import { Input } from "@src/ui/input";

import { BottomNavLeader } from "../components/BottomNavLeader";
import { EmployeeCard } from "../components/EmployeeCard";
import { useLeaderTeam } from "../hooks/useLeaderTeam";
import type { CompetencyStatus } from "@src/types/competency";

export function LeaderTeam() {
  const { data, isLoading } = useLeaderTeam();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filterStatus = searchParams.get("filter") as CompetencyStatus | null;

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
    leader_division,
    leader_function,
    team_members
  } = data;

  // Filter team members by status if filter is applied
  const filteredMembers = filterStatus
    ? team_members.filter((member) => member.status_kompetensi === filterStatus)
    : team_members;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header with Division Context */}
      {/* DESIGN DECISION: Show division prominently with gradient and icon */}
      {/* BOD BENEFIT: Immediately understand organizational context - "This is the HRD team" */}
      <div className="bg-gradient-to-br from-kf-blue to-kf-blue-dark p-6 text-gray-50 shadow-lg">
        <div className="flex items-start gap-3 mb-3">
          <div className="rounded-full bg-kf-orange/20 p-2">
            <IconBuilding size={24} className="text-kf-orange" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-50/80 mb-1">{leader_function || "Human Resources"}</div>
            <h1 className="text-2xl font-bold text-gray-50 mb-1">
              {leader_division || "Divisi Human Capital"}
            </h1>
            <div className="text-sm text-gray-50/90">
              Dipimpin oleh {leader_name}
            </div>
          </div>
        </div>

        {/* Team Stats */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold text-gray-50">{team_members.length}</div>
            <div className="text-xs text-gray-50/80">Total Tim</div>
          </div>
          <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold text-gray-50">
              {team_members.filter(m => m.status_kompetensi === "fit").length}
            </div>
            <div className="text-xs text-gray-50/80">Fit</div>
          </div>
          <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold text-gray-50">
              {team_members.filter(m => m.status_kompetensi === "gap").length}
            </div>
            <div className="text-xs text-gray-50/80">Gap</div>
          </div>
        </div>
      </div>

      {/* Filter Status Indicator */}
      {filterStatus && (
        <div className="bg-kf-orange px-4 py-2 text-gray-50 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IconFilter size={16} />
              <span className="text-sm font-medium">
                Filter: Status {filterStatus.toUpperCase()}
              </span>
            </div>
            <button
              onClick={() => navigate("/leader/team")}
              className="text-xs underline"
            >
              Hapus Filter
            </button>
          </div>
        </div>
      )}

      {/* Search Bar (non-functional for demo) */}
      <div className="bg-white mb-4 p-4 shadow-sm">
        <Input
          type="text"
          placeholder="🔍 Cari nama karyawan..."
          className="w-full"
          disabled={true}
        />
      </div>

      {/* Employee List */}
      <div className="space-y-3 px-4">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onClick={() => navigate(`/leader/team/${employee.id}`)}
            />
          ))
        ) : (
          <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-8 text-center">
            <div className="text-gray-500">
              Tidak ada anggota tim dengan status {filterStatus}
            </div>
          </div>
        )}
      </div>

      <BottomNavLeader />
    </div>
  );
}
