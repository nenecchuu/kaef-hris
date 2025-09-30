/**
 * useEmployee Hook
 *
 * TanStack Query hook for fetching single employee detail
 */

import { useQuery } from '@tanstack/react-query';
import { employeeKeys, EMPLOYEE_API } from '../config';
import type { EmployeeDetail, ApiResponse } from '../types';

/**
 * Fetch single employee detail from API
 */
async function fetchEmployee(id: number): Promise<ApiResponse<EmployeeDetail>> {
  const response = await fetch(EMPLOYEE_API.detail(id), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Karyawan tidak ditemukan');
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Gagal mengambil detail karyawan');
  }

  return response.json();
}

/**
 * Hook to fetch single employee by ID
 *
 * @param id - Employee ID
 * @param options - Additional query options
 */
export function useEmployee(
  id: number | undefined,
  options?: {
    enabled?: boolean;
    refetchOnWindowFocus?: boolean;
  }
) {
  return useQuery({
    queryKey: employeeKeys.detail(id!),
    queryFn: () => fetchEmployee(id!),
    enabled: (options?.enabled ?? true) && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false,
  });
}

export { fetchEmployee };