/**
 * Employee Module Configuration
 *
 * Query keys factory and module constants
 */

import type { EmployeeFilters, EmployeeQueryKeys } from "./types";

/**
 * TanStack Query key factory for employee queries
 * Follows existing pattern from user module
 */
export const employeeKeys: EmployeeQueryKeys = {
  all: ["employees"] as const,
  lists: () => [...employeeKeys.all, "list"] as const,
  list: (filters: EmployeeFilters) =>
    [...employeeKeys.lists(), filters] as const,
  details: () => [...employeeKeys.all, "detail"] as const,
  detail: (id: number) => [...employeeKeys.details(), id] as const,
};

/**
 * API endpoints
 */
export const EMPLOYEE_API = {
  base: "/api/v1/employees",
  detail: (id: number) => `/api/v1/employees/${id}`,
  education: (id: number) => `/api/v1/employees/${id}/pendidikan`,
  certifications: (id: number) => `/api/v1/employees/${id}/sertifikasi`,
  licenses: (id: number) => `/api/v1/employees/${id}/lisensi`,
} as const;

/**
 * Default pagination settings
 */
export const DEFAULT_PER_PAGE = 25;
export const PER_PAGE_OPTIONS = [10, 25, 50, 100] as const;

/**
 * Search debounce delay in milliseconds
 */
export const SEARCH_DEBOUNCE_MS = 500;

/**
 * Employment status labels in Indonesian
 */
export const EMPLOYMENT_STATUS_LABELS = {
  active: "Aktif",
  inactive: "Tidak Aktif",
  terminated: "Berhenti",
  on_leave: "Cuti",
  probation: "Masa Percobaan",
  contract: "Kontrak",
  suspended: "Ditangguhkan",
} as const;

/**
 * Employment type labels in Indonesian
 */
export const EMPLOYMENT_TYPE_LABELS = {
  permanent: "Tetap",
  contract: "Kontrak",
  intern: "Magang",
  consultant: "Konsultan",
} as const;
