/**
 * Employee Hooks Exports
 *
 * Barrel file for clean imports
 */

export { useEmployees, fetchEmployees } from "./useEmployees";
export { useEmployee, fetchEmployee } from "./useEmployee";
export {
  useCreateEmployee,
  useUpdateEmployee,
  useDeleteEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "./useEmployeeMutations";
