import { useState } from "react";
import clsx from "clsx";

import type { CompetencyCategory } from "@src/types/competency";

import { StatusBadge } from "./StatusBadge";

interface AssessmentTableProps {
  assessments: CompetencyCategory[];
}

export const AssessmentTable = ({ assessments }: AssessmentTableProps) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  return (
    <div className="bg-white overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-kf-blue bg-gray-50">
            <th className="p-3 text-left font-semibold text-gray-900">
              Kategori Kompetensi
            </th>
            <th className="p-3 text-center font-semibold text-gray-900">
              Expected
            </th>
            <th className="p-3 text-center font-semibold text-gray-900">
              Actual (Avg)
            </th>
            <th className="p-3 text-center font-semibold text-gray-900">
              Fit Rate
            </th>
            <th className="p-3 text-center font-semibold text-gray-900">Gap</th>
            <th className="p-3 text-center font-semibold text-gray-900">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {assessments.map((item) => (
            <>
              <tr
                key={item.kategori}
                onClick={() =>
                  setExpandedRow(
                    expandedRow === item.kategori ? null : item.kategori,
                  )
                }
                className="cursor-pointer border-b transition hover:bg-gray-50"
              >
                <td className="p-3 font-medium text-gray-900">
                  {item.kategori}
                </td>
                <td className="p-3 text-center text-gray-900">
                  {item.expected.toFixed(1)}
                </td>
                <td className="p-3 text-center font-semibold text-gray-900">
                  {item.actual_avg.toFixed(1)}
                </td>
                <td className="p-3 text-center">
                  <span className="rounded-full border border-gray-300 bg-gray-50 px-2 py-1 text-sm text-gray-900">
                    {item.fit_rate}%
                  </span>
                </td>
                <td className="p-3 text-center">
                  <span
                    className={clsx(
                      "font-semibold",
                      item.gap < 0 && "text-orange-600",
                      item.gap === 0 && "text-green-600",
                      item.gap > 0 && "text-blue-600",
                    )}
                  >
                    {item.gap > 0 && "+"}
                    {item.gap}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <StatusBadge status={item.status} />
                </td>
              </tr>

              {/* Expanded Row */}
              {expandedRow === item.kategori && item.items && (
                <tr>
                  <td colSpan={6} className="bg-gray-50 p-4">
                    <div className="mb-2 text-sm font-semibold">
                      Detail Item Kompetensi:
                    </div>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="p-2 text-left">Item</th>
                          <th className="p-2 text-center">Expected</th>
                          <th className="p-2 text-center">Actual</th>
                          <th className="p-2 text-center">Gap</th>
                          <th className="p-2 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.items.map((subItem) => (
                          <tr key={subItem.nama} className="border-b">
                            <td className="p-2">{subItem.nama}</td>
                            <td className="p-2 text-center">
                              {subItem.expected}
                            </td>
                            <td className="p-2 text-center">
                              {subItem.actual}
                            </td>
                            <td className="p-2 text-center">
                              <span
                                className={clsx(
                                  "font-semibold",
                                  subItem.gap < 0 && "text-orange-600",
                                  subItem.gap === 0 && "text-green-600",
                                  subItem.gap > 0 && "text-blue-600",
                                )}
                              >
                                {subItem.gap > 0 && "+"}
                                {subItem.gap}
                              </span>
                            </td>
                            <td className="p-2 text-center">
                              <StatusBadge status={subItem.status} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};
