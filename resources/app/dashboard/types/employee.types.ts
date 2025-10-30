/**
 * Employee TypeScript Type Definitions
 * PT Kimia Farma - Employee Data Structure
 */

export interface Employee {
  id: string;
  nip: string; // Nomor Induk Pegawai
  name: string;
  email: string;
  phone?: string;
  division: DivisionCode;
  subDivision: string;
  department?: string;
  position: string;
  level: EmployeeLevel;
  manager?: string; // Manager ID or name
  joinDate: string;
  status: EmployeeStatus;
  location: string;
  regional?: string;
  photo?: string;
}

export type DivisionCode =
  | "retail"
  | "clinics"
  | "manufacturing"
  | "distribution"
  | "marketing"
  | "corporate";

export interface DivisionInfo {
  code: DivisionCode;
  name: string;
  fullName: string;
  director: string;
  headcount: number;
  subDivisions: SubDivisionInfo[];
}

export interface SubDivisionInfo {
  code: string;
  name: string;
  head: string; // Kepala Sub-Divisi
  headPosition: string;
  headcount: number;
  departments?: DepartmentInfo[];
}

export interface DepartmentInfo {
  code: string;
  name: string;
  head: string;
  headPosition: string;
  headcount: number;
}

export type EmployeeLevel =
  | "director" // Direktur
  | "general_manager" // General Manager
  | "manager" // Manager
  | "assistant_manager" // Assistant Manager
  | "senior_supervisor" // Senior Supervisor
  | "supervisor" // Supervisor
  | "senior_staff" // Senior Staff
  | "staff" // Staff
  | "junior_staff"; // Junior Staff

export type EmployeeStatus =
  | "active" // Aktif
  | "on_leave" // Cuti
  | "sick_leave" // Sakit
  | "business_trip" // Dinas
  | "inactive"; // Tidak Aktif

export interface EmployeeFilters {
  division?: DivisionCode;
  subDivision?: string;
  department?: string;
  level?: EmployeeLevel;
  status?: EmployeeStatus;
  regional?: string;
  search?: string;
}

export interface EmployeeListData {
  employees: Employee[];
  total: number;
  page: number;
  pageSize: number;
  filters: EmployeeFilters;
}

export interface DivisionOverviewData {
  division: DivisionInfo;
  stats: {
    totalEmployees: number;
    byLevel: Record<EmployeeLevel, number>;
    byStatus: Record<EmployeeStatus, number>;
    byRegional?: Record<string, number>;
  };
}
