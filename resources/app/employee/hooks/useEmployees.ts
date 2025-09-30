/**
 * useEmployees Hook
 *
 * TanStack Query hook for fetching paginated employee list with filters
 */

import { useQuery } from "@tanstack/react-query";

import { EMPLOYEE_API, employeeKeys } from "../config";
import type { ApiResponse, Employee, EmployeeFilters } from "../types";

/**
 * Fetch employees from API with filters and pagination
 */
async function fetchEmployees(
  filters: EmployeeFilters = {},
): Promise<ApiResponse<Employee[]>> {
  const params = new URLSearchParams();

  // Add filter parameters
  if (filters.search) params.append("search", filters.search);
  if (filters.status_kepegawaian)
    params.append("status_kepegawaian", filters.status_kepegawaian);
  if (filters.divisi_id)
    params.append("divisi_id", filters.divisi_id.toString());
  if (filters.jabatan_id)
    params.append("jabatan_id", filters.jabatan_id.toString());
  if (filters.page) params.append("page", filters.page.toString());
  if (filters.per_page) params.append("per_page", filters.per_page.toString());
  if (filters.sort_by) params.append("sort_by", filters.sort_by);
  if (filters.sort_order) params.append("sort_order", filters.sort_order);

  const url = `${EMPLOYEE_API.base}?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization header will be added by existing auth interceptor
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Gagal mengambil data karyawan");
  }

  return response.json();
}

/**
 * Hook to fetch employees with filters and pagination
 *
 * @param filters - Filter parameters for employee list
 * @param options - Additional query options
 */
export function useEmployees(
  filters: EmployeeFilters = {},
  options?: {
    enabled?: boolean;
    refetchOnWindowFocus?: boolean;
  },
) {
  return useQuery({
    queryKey: employeeKeys.list(filters),
    queryFn: () => fetchEmployees(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    enabled: options?.enabled ?? true,
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false,
  });
}

export { fetchEmployees };
