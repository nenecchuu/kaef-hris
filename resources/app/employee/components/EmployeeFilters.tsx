/**
 * EmployeeFilters Component
 *
 * Filter controls for employee list
 */

import React from "react";
import { IconFilter, IconX } from "@tabler/icons-react";

import { SelectDivision } from "@src/components/select-division/select-division";
import { SelectJobPosition } from "@src/components/select-job-position";
import { Button } from "@src/ui/button";
import { Label } from "@src/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@src/ui/select";

import { EMPLOYMENT_STATUS_LABELS } from "../config";
import type { EmploymentStatus } from "../types";

interface EmployeeFiltersProps {
  statusKepegawaian?: EmploymentStatus;
  divisiId?: number;
  jabatanId?: number;
  onStatusChange: (status?: EmploymentStatus) => void;
  onDivisionChange: (divisionId?: number) => void;
  onJobPositionChange: (jobPositionId?: number) => void;
  onReset: () => void;
}

/**
 * Employee Filters Component
 */
export function EmployeeFilters({
  statusKepegawaian,
  divisiId,
  jabatanId,
  onStatusChange,
  onDivisionChange,
  onJobPositionChange,
  onReset,
}: EmployeeFiltersProps) {
  const hasActiveFilters = !!(statusKepegawaian || divisiId || jabatanId);

  return (
    <div className="flex flex-wrap items-end gap-4">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <IconFilter className="h-4 w-4" />
        <span>Filter:</span>
      </div>

      {/* Status Kepegawaian Filter */}
      <div className="min-w-[200px]">
        <Label htmlFor="status-filter">Status Kepegawaian</Label>
        <Select
          value={statusKepegawaian || ""}
          onValueChange={(value) =>
            onStatusChange(value ? (value as EmploymentStatus) : undefined)
          }
        >
          <SelectTrigger id="status-filter">
            <SelectValue placeholder="Semua Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Semua Status</SelectItem>
            {Object.entries(EMPLOYMENT_STATUS_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Division Filter */}
      <div className="min-w-[200px]">
        <Label htmlFor="division-filter">Divisi</Label>
        <SelectDivision
          value={divisiId}
          onChange={(value) => onDivisionChange(value)}
          placeholder="Semua Divisi"
          allowClear={true}
        />
      </div>

      {/* Job Position Filter */}
      <div className="min-w-[200px]">
        <Label htmlFor="job-position-filter">Jabatan</Label>
        <SelectJobPosition
          value={jabatanId}
          onChange={(value) => onJobPositionChange(value)}
          placeholder="Semua Jabatan"
          allowClear={true}
        />
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onReset}
          className="gap-2"
        >
          <IconX className="h-4 w-4" />
          Reset Filter
        </Button>
      )}
    </div>
  );
}

export default EmployeeFilters;
