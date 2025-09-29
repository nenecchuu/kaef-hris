import { z } from "zod";

import { ADMIN_TYPE, EMPLOYEE_TYPE } from "@src/lib/constants";

export const AttendanceStatusSchema = z.enum([
  "LATE_CHECK_IN",
  "EARLY_CHECK_OUT",
  "HAS_INCOMPLETE_TASKS",
  "HAS_CHECKED_OUT",
  "CHECKED_IN",
  "CHECKED_OUT",
  "CAN_CHECK_IN",
  "CAN_CHECK_OUT",
]);
export type AttendanceStatus = z.infer<typeof AttendanceStatusSchema>;

export const AdminTypeSchema = z.nativeEnum(ADMIN_TYPE);
export type AdminType = z.infer<typeof AdminTypeSchema>;

export const EmployeeTypeSchema = z.nativeEnum(EMPLOYEE_TYPE);
export type EmployeeType = z.infer<typeof EmployeeTypeSchema>;

export const DepartmentSchema = z.object({
  id: z.number(),
  code: z.string(),
  name: z.string(),
});

export type Department = z.infer<typeof DepartmentSchema>;
