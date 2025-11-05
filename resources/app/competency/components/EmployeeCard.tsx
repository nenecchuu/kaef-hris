import clsx from "clsx";

import type { Employee } from "@src/types/competency";

import { StatusBadge } from "./StatusBadge";

interface EmployeeCardProps {
  employee: Employee;
  onClick?: () => void;
}

export const EmployeeCard = ({ employee, onClick }: EmployeeCardProps) => {
  const borderColors = {
    "✅ Fit": "border-l-green-500",
    "⚠️ Gap": "border-l-orange-500",
    "⬆️ Exceed": "border-l-blue-500",
  };

  return (
    <div
      onClick={onClick}
      className={clsx(
        "bg-white cursor-pointer rounded-lg border border-l-4 border-gray-200 p-4 shadow-sm transition hover:shadow-md",
        borderColors[employee.status_kompetensi],
      )}
    >
      <div className="flex items-center gap-4">
        <img
          src={employee.photo || "https://i.pravatar.cc/150"}
          alt={employee.nama}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="font-semibold text-gray-900">{employee.nama}</div>
          <div className="text-sm text-gray-600">{employee.jabatan}</div>
          <div className="text-xs text-gray-500">{employee.fungsi}</div>
        </div>
        <div className="text-right">
          <StatusBadge status={employee.status_kompetensi} />
          <div className="mt-1 text-sm font-medium text-gray-700">
            {employee.fit_rate_overall}%
          </div>
        </div>
      </div>
    </div>
  );
};
