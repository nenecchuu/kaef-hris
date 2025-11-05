import * as React from "react";
import { useNavigate } from "react-router-dom";

import { LoadingFallback } from "@src/components/fallbacks";
import { Input } from "@src/ui/input";

import { BottomNavLeader } from "../components/BottomNavLeader";
import { EmployeeCard } from "../components/EmployeeCard";
import { useLeaderTeam } from "../hooks/useLeaderTeam";

export function LeaderTeam() {
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

  const { team_members } = data;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">Tim Saya</h1>
        <div className="text-sm text-gray-600">
          {team_members.length} Anggota
        </div>
      </div>

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
        {team_members.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onClick={() => navigate(`/leader/team/${employee.id}`)}
          />
        ))}
      </div>

      <BottomNavLeader />
    </div>
  );
}
