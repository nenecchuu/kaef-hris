import clsx from "clsx";

import type { CompetencyCategory } from "@src/types/competency";

import { StatusBadge } from "./StatusBadge";

interface AssessmentTableProps {
  assessments: CompetencyCategory[];
}

/**
 * AssessmentTable Component - Auto-Expanded Assessment Display
 *
 * DESIGN DECISION: Show all detail items by default (no click-to-expand)
 * REASONING: BOD doesn't have time to click around. They need instant insight.
 * UX IMPROVEMENT: Eliminates unnecessary interaction, provides complete view immediately
 *
 * Changed from previous version:
 * - Removed expandedRow state
 * - Removed onClick handler
 * - All category details are always visible
 * - Better visual grouping with card-based layout
 */
export const AssessmentTable = ({ assessments }: AssessmentTableProps) => {
  return (
    <div className="space-y-4">
      {assessments.map((category) => (
        <div
          key={category.kategori}
          className="bg-white overflow-hidden rounded-lg border-2 border-gray-200 shadow-sm"
        >
          {/* Category Header - Always Visible */}
          <div className="bg-gradient-to-r from-kf-blue to-kf-blue-light p-4 text-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">{category.kategori}</h3>
              <StatusBadge status={category.status} />
            </div>
            <div className="mt-2 flex gap-6 text-sm">
              <div>
                <span className="text-gray-50/70">Expected: </span>
                <span className="font-semibold">{category.expected.toFixed(1)}</span>
              </div>
              <div>
                <span className="text-gray-50/70">Actual: </span>
                <span className="font-semibold">{category.actual_avg.toFixed(1)}</span>
              </div>
              <div>
                <span className="text-gray-50/70">Fit Rate: </span>
                <span className="font-semibold">{category.fit_rate}%</span>
              </div>
              <div>
                <span className="text-gray-50/70">Gap: </span>
                <span className={clsx(
                  "font-semibold",
                  category.gap < 0 && "text-orange-300",
                  category.gap === 0 && "text-green-300",
                  category.gap > 0 && "text-blue-300",
                )}>
                  {category.gap > 0 && "+"}{category.gap}
                </span>
              </div>
            </div>
          </div>

          {/* Detail Items - Always Expanded */}
          {category.items && category.items.length > 0 && (
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="p-2 text-left font-semibold text-gray-700">
                        Item Kompetensi
                      </th>
                      <th className="p-2 text-center font-semibold text-gray-700">
                        Expected
                      </th>
                      <th className="p-2 text-center font-semibold text-gray-700">
                        Actual
                      </th>
                      <th className="p-2 text-center font-semibold text-gray-700">
                        Gap
                      </th>
                      <th className="p-2 text-center font-semibold text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.items.map((item, idx) => (
                      <tr
                        key={item.nama}
                        className={clsx(
                          "border-b border-gray-100",
                          idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                        )}
                      >
                        <td className="p-2 font-medium text-gray-900">{item.nama}</td>
                        <td className="p-2 text-center text-gray-700">
                          {item.expected}
                        </td>
                        <td className="p-2 text-center font-semibold text-gray-900">
                          {item.actual}
                        </td>
                        <td className="p-2 text-center">
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
                        <td className="p-2 text-center">
                          <StatusBadge status={item.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
