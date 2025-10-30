/**
 * Employee Overview Page - Bird's Eye View
 * Shows all divisions with key metrics and highlights
 */

import { IconArrowLeft, IconBuilding, IconUsers } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import { Card } from "@src/ui/card";
import { View } from "@src/ui/view";

import { getAllDivisions, SAMPLE_EMPLOYEES } from "../data/employee-mock-data";
import type { DivisionInfo } from "../types/employee.types";

export function EmployeeOverviewPage() {
  const navigate = useNavigate();
  const divisions = getAllDivisions();

  const handleDivisionClick = (divisionCode: string) => {
    navigate(`/employees/${divisionCode}`);
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <View>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <button
                onClick={handleBackToDashboard}
                className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                aria-label="Kembali ke Dashboard"
              >
                <IconArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-3xl font-bold text-gray-900">
                Ringkasan Karyawan
              </h1>
            </div>
            <p className="ml-14 text-gray-600">
              PT Kimia Farma Tbk - Distribusi Karyawan per Divisi
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-blue-50 px-6 py-3">
            <IconUsers className="h-8 w-8 text-blue-600" />
            <div>
              <div className="text-sm text-gray-600">Total Karyawan</div>
              <div className="text-2xl font-bold text-gray-900">
                {SAMPLE_EMPLOYEES.length.toLocaleString("id-ID")}
              </div>
            </div>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card className="p-4">
            <div className="mb-1 text-sm text-gray-600">Jumlah Divisi</div>
            <div className="text-2xl font-bold text-gray-900">
              {divisions.length}
            </div>
            <div className="mt-1 text-xs text-gray-500">Divisi operasional</div>
          </Card>
          <Card className="p-4">
            <div className="mb-1 text-sm text-gray-600">Divisi Terbesar</div>
            <div className="text-lg font-bold text-gray-900">
              Retail & Apotek
            </div>
            <div className="mt-1 text-xs text-gray-500">
              4.235 karyawan (40,2%)
            </div>
          </Card>
          <Card className="p-4">
            <div className="mb-1 text-sm text-gray-600">
              Rata-rata per Divisi
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(10542 / divisions.length).toLocaleString("id-ID")}
            </div>
            <div className="mt-1 text-xs text-gray-500">karyawan</div>
          </Card>
          <Card className="p-4">
            <div className="mb-1 text-sm text-gray-600">Regional</div>
            <div className="text-2xl font-bold text-gray-900">7</div>
            <div className="mt-1 text-xs text-gray-500">Area operasional</div>
          </Card>
        </div>

        {/* Division Cards Grid */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Klik divisi untuk melihat detail karyawan
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {divisions.map((division) => (
              <DivisionCard
                key={division.code}
                division={division}
                onClick={() => handleDivisionClick(division.code)}
              />
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <Card className="border-gray-200 bg-gray-50 p-4">
          <p className="text-center text-sm text-gray-600">
            💡 Klik pada kartu divisi untuk melihat daftar karyawan lengkap
            dengan sub-divisi dan kepala divisi
          </p>
        </Card>
      </div>
    </View>
  );
}

interface DivisionCardProps {
  division: DivisionInfo;
  onClick: () => void;
}

function DivisionCard({ division, onClick }: DivisionCardProps) {
  // Calculate percentage of total employees
  const totalEmployees = 10542;
  const percentage = ((division.headcount / totalEmployees) * 100).toFixed(1);

  // Get status color based on headcount
  const getStatusColor = () => {
    if (division.headcount > 3000) return "text-green-600 bg-green-50";
    if (division.headcount > 1000) return "text-blue-600 bg-blue-50";
    return "text-gray-600 bg-gray-50";
  };

  return (
    <button
      onClick={onClick}
      className="w-full cursor-pointer text-left transition-transform hover:scale-[1.02]"
    >
      <Card className="group p-6 transition-all hover:border-brand-primary/30 hover:shadow-lg">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="mb-1 text-lg font-semibold text-gray-900 transition-colors group-hover:text-brand-primary">
              {division.name}
            </h3>
            <p className="text-sm text-gray-500">{division.fullName}</p>
          </div>
          <IconBuilding className="h-6 w-6 text-gray-400 transition-colors group-hover:text-brand-primary" />
        </div>

        <div className="space-y-3">
          {/* Headcount */}
          <div>
            <div className="mb-1 flex items-baseline justify-between">
              <span className="text-sm text-gray-600">Jumlah Karyawan</span>
              <span className="text-sm font-medium text-gray-500">
                {percentage}%
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {division.headcount.toLocaleString("id-ID")}
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-brand-primary transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Director */}
          <div className="border-t border-gray-100 pt-3">
            <div className="mb-1 text-xs text-gray-500">Penanggung Jawab</div>
            <div className="text-sm font-medium text-gray-700">
              {division.director}
            </div>
          </div>

          {/* Sub-divisions Count */}
          <div className="flex items-center justify-between pt-2">
            <span
              className={`rounded-full px-2 py-1 text-xs ${getStatusColor()}`}
            >
              {division.subDivisions.length} Sub-Divisi
            </span>
            <span className="text-xs text-gray-500 transition-colors group-hover:text-brand-primary">
              Klik untuk detail →
            </span>
          </div>
        </div>
      </Card>
    </button>
  );
}
