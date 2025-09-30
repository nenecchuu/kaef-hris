/**
 * Employee Mutation Hooks
 *
 * TanStack Query mutation hooks for create, update, delete operations
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { EMPLOYEE_API, employeeKeys } from "../config";
import type {
  ApiResponse,
  CreateEmployeeData,
  Employee,
  UpdateEmployeeData,
} from "../types";

/**
 * Create new employee
 */
async function createEmployee(
  data: CreateEmployeeData,
): Promise<ApiResponse<Employee>> {
  const response = await fetch(EMPLOYEE_API.base, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Gagal membuat karyawan baru");
  }

  return response.json();
}

/**
 * Update existing employee
 */
async function updateEmployee(
  data: UpdateEmployeeData,
): Promise<ApiResponse<Employee>> {
  const { id, ...updateData } = data;

  const response = await fetch(EMPLOYEE_API.detail(id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Gagal memperbarui data karyawan");
  }

  return response.json();
}

/**
 * Delete employee (soft delete)
 */
async function deleteEmployee(id: number): Promise<ApiResponse<void>> {
  const response = await fetch(EMPLOYEE_API.detail(id), {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Gagal menghapus karyawan");
  }

  // 204 No Content response
  if (response.status === 204) {
    return {
      status: "success",
      message: "Karyawan berhasil dihapus",
      data: undefined as any,
    };
  }

  return response.json();
}

/**
 * Hook to create new employee
 */
export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      // Invalidate employee lists to refetch
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
    },
  });
}

/**
 * Hook to update employee
 */
export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEmployee,
    onSuccess: (data, variables) => {
      // Invalidate specific employee detail
      queryClient.invalidateQueries({
        queryKey: employeeKeys.detail(variables.id),
      });
      // Invalidate employee lists
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
    },
  });
}

/**
 * Hook to delete employee
 */
export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: (_, employeeId) => {
      // Remove deleted employee from cache
      queryClient.removeQueries({
        queryKey: employeeKeys.detail(employeeId),
      });
      // Invalidate employee lists
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
    },
  });
}

export { createEmployee, updateEmployee, deleteEmployee };
