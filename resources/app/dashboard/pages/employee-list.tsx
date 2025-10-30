/**
 * Employee List Page - Detailed Employee View
 * Shows employee list with filtering by division and sub-division
 */

import { useState } from "react";
import {
  IconArrowLeft,
  IconBuilding,
  IconFilter,
  IconSearch,
  IconUsers,
} from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";

import { Card } from "@src/ui/card";
import { View } from "@src/ui/view";

import {
  getDivisionByCode,
  getEmployeesByDivision,
  getSubDivisionsByDivision,
  SAMPLE_EMPLOYEES,
} from "../data/employee-mock-data";
import type {
  DivisionCode,
  Employee,
  SubDivisionInfo,
} from "../types/employee.types";

export function EmployeeListPage() {
  const navigate = useNavigate();
  const { divisionCode } = useParams<{ divisionCode: DivisionCode }>();
  const [selectedSubDivision, setSelectedSubDivision] = useState<
    string | "all"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  if (!divisionCode) {
    navigate("/employees");
    return null;
  }

  const division = getDivisionByCode(divisionCode);
  const subDivisions = getSubDivisionsByDivision(divisionCode);
  const allEmployees = getEmployeesByDivision(divisionCode);

  // Filter employees by sub-division and search query
  const filteredEmployees = allEmployees.filter((emp) => {
    const matchesSubDivision =
      selectedSubDivision === "all" || emp.subDivision === selectedSubDivision;
    const matchesSearch =
      searchQuery === "" ||
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.nip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubDivision && matchesSearch;
  });

  const handleBackToOverview = () => {
    navigate("/employees");
  };

  return (
    <View>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-3">
              <button
                onClick={handleBackToOverview}
                className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                aria-label="Kembali ke Ringkasan"
              >
                <IconArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {division.name}
                </h1>
                <p className="text-gray-600">
                  {division.fullName} - {division.director}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-blue-50 px-6 py-3">
            <IconUsers className="h-8 w-8 text-blue-600" />
            <div>
              <div className="text-sm text-gray-600">Total Karyawan</div>
              <div className="text-2xl font-bold text-gray-900">
                {filteredEmployees.length.toLocaleString("id-ID")}
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Divisions Overview */}
        <div>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            Sub-Divisi & Kepala Divisi
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {subDivisions.map((subDiv) => (
              <SubDivisionCard
                key={subDiv.code}
                subDivision={subDiv}
                isSelected={selectedSubDivision === subDiv.code}
                onClick={() => setSelectedSubDivision(subDiv.code)}
              />
            ))}
          </div>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-col gap-4 md:flex-row">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <IconSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari nama, NIP, atau posisi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>

            {/* Sub-Division Filter */}
            <div className="md:w-64">
              <div className="relative">
                <IconFilter className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <select
                  value={selectedSubDivision}
                  onChange={(e) => setSelectedSubDivision(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary"
                >
                  <option value="all">Semua Sub-Divisi</option>
                  {subDivisions.map((subDiv) => (
                    <option key={subDiv.code} value={subDiv.code}>
                      {subDiv.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Reset Button */}
            {(selectedSubDivision !== "all" || searchQuery !== "") && (
              <button
                onClick={() => {
                  setSelectedSubDivision("all");
                  setSearchQuery("");
                }}
                className="rounded-lg px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                Reset Filter
              </button>
            )}
          </div>
        </Card>

        {/* Employee Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    NIP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Posisi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Sub-Divisi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Atasan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Lokasi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <IconUsers className="h-12 w-12 text-gray-300" />
                        <p className="text-gray-500">
                          Tidak ada karyawan ditemukan
                        </p>
                        <p className="text-sm text-gray-400">
                          Coba ubah filter atau kata kunci pencarian
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((employee) => (
                    <EmployeeRow key={employee.id} employee={employee} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Footer Info */}
        <Card className="border-gray-200 bg-gray-50 p-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Menampilkan {filteredEmployees.length} dari {allEmployees.length}{" "}
              karyawan
            </span>
            <span>💡 Data ini adalah sampel representatif untuk prototype</span>
          </div>
        </Card>
      </div>
    </View>
  );
}

interface SubDivisionCardProps {
  subDivision: SubDivisionInfo;
  isSelected: boolean;
  onClick: () => void;
}

function SubDivisionCard({
  subDivision,
  isSelected,
  onClick,
}: SubDivisionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border-2 p-4 text-left transition-all ${
        isSelected
          ? "border-brand-primary bg-brand-primary/5"
          : "bg-white border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex items-start gap-3">
        <IconBuilding
          className={`mt-0.5 h-5 w-5 ${
            isSelected ? "text-brand-primary" : "text-gray-400"
          }`}
        />
        <div className="min-w-0 flex-1">
          <h3
            className={`mb-1 font-semibold ${
              isSelected ? "text-brand-primary" : "text-gray-900"
            }`}
          >
            {subDivision.name}
          </h3>
          <p className="mb-2 text-sm text-gray-600">
            {subDivision.head} - {subDivision.headPosition}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              {subDivision.headcount.toLocaleString("id-ID")} karyawan
            </span>
            {subDivision.departments && (
              <span className="text-xs text-gray-500">
                {subDivision.departments.length} dept.
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

interface EmployeeRowProps {
  employee: Employee;
}

function EmployeeRow({ employee }: EmployeeRowProps) {
  const getStatusBadge = (status: Employee["status"]) => {
    const statusConfig = {
      active: { label: "Aktif", color: "bg-green-100 text-green-800" },
      on_leave: { label: "Cuti", color: "bg-yellow-100 text-yellow-800" },
      sick_leave: { label: "Sakit", color: "bg-orange-100 text-orange-800" },
      business_trip: { label: "Dinas", color: "bg-blue-100 text-blue-800" },
      inactive: { label: "Non-Aktif", color: "bg-gray-100 text-gray-800" },
    };

    const config = statusConfig[status];
    return (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  // Find sub-division name
  const subDivName =
    SAMPLE_EMPLOYEES.find((e) => e.id === employee.id)?.subDivision || "-";

  return (
    <tr className="transition-colors hover:bg-gray-50">
      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
        {employee.nip}
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
        {employee.email && (
          <div className="text-xs text-gray-500">{employee.email}</div>
        )}
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900">{employee.position}</div>
        <div className="text-xs capitalize text-gray-500">
          {employee.level.replace("_", " ")}
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {subDivName}
        {employee.department && (
          <div className="text-xs text-gray-400">{employee.department}</div>
        )}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {employee.manager || "-"}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {employee.location}
        {employee.regional && (
          <div className="text-xs text-gray-400">{employee.regional}</div>
        )}
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        {getStatusBadge(employee.status)}
      </td>
    </tr>
  );
}
