/**
 * Employee Type Definitions
 *
 * TypeScript interfaces for Employee Master Data
 * Based on Story 1.2 API Response Format
 */

// Employee status enums
export type EmploymentStatus =
  | "active"
  | "inactive"
  | "terminated"
  | "on_leave"
  | "probation"
  | "contract"
  | "suspended";

export type EmploymentType = "permanent" | "contract" | "intern" | "consultant";

// Division interface
export interface Division {
  id: number;
  nama: string;
  kode: string;
}

// Job Position interface
export interface JobPosition {
  id: number;
  nama: string;
  level: number;
}

// Manager interface (simplified employee reference)
export interface Manager {
  id: number;
  nama_lengkap: string;
  nomor_karyawan: string;
}

// Education History interface
export interface EducationHistory {
  id: number;
  employee_id: number;
  institution_name: string;
  degree_level: string;
  field_of_study: string | null;
  graduation_year: number | null;
  gpa: number | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

// Certification interface
export interface Certification {
  id: number;
  employee_id: number;
  certification_name: string;
  issuing_organization: string;
  issue_date: string;
  expiry_date: string | null;
  certification_number: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Professional License interface
export interface ProfessionalLicense {
  id: number;
  employee_id: number;
  license_name: string;
  license_number: string;
  issuing_authority: string;
  issue_date: string;
  expiry_date: string;
  license_status: "active" | "expired" | "suspended" | "revoked";
  created_at: string;
  updated_at: string;
}

// Main Employee interface
export interface Employee {
  id: number;
  nomor_karyawan: string;
  nama_lengkap: string;
  nama_panggilan: string | null;
  email: string;
  telepon: string;
  nik: string;
  npwp: string | null;
  tanggal_lahir: string; // YYYY-MM-DD
  tanggal_masuk: string; // YYYY-MM-DD
  tanggal_keluar: string | null; // YYYY-MM-DD
  status_kepegawaian: EmploymentStatus;
  jenis_kepegawaian: EmploymentType;
  alamat: string | null;
  foto_url: string | null;
  divisi: Division;
  jabatan: JobPosition;
  manager: Manager | null;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

// Employee detail with child records
export interface EmployeeDetail extends Employee {
  education_history?: EducationHistory[];
  certifications?: Certification[];
  professional_licenses?: ProfessionalLicense[];
}

// API Response Format
export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
  meta?: PaginationMeta;
  errors?: Record<string, string[]>;
}

// Pagination metadata
export interface PaginationMeta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  from?: number;
  to?: number;
}

// Filter parameters for employee list
export interface EmployeeFilters {
  search?: string;
  status_kepegawaian?: EmploymentStatus;
  divisi_id?: number;
  jabatan_id?: number;
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

// Form data for creating employee
export interface CreateEmployeeData {
  nomor_karyawan?: string;
  nama_lengkap: string;
  nama_panggilan?: string;
  email: string;
  telepon: string;
  nik: string;
  npwp?: string;
  tanggal_lahir: string;
  tanggal_masuk: string;
  tanggal_keluar?: string;
  status_kepegawaian: EmploymentStatus;
  jenis_kepegawaian: EmploymentType;
  alamat?: string;
  foto_url?: string;
  divisi_id: number;
  jabatan_id: number;
  manager_id?: number;
}

// Form data for updating employee
export interface UpdateEmployeeData extends Partial<CreateEmployeeData> {
  id: number;
}

// Query key factory type
export interface EmployeeQueryKeys {
  all: readonly ["employees"];
  lists: () => readonly ["employees", "list"];
  list: (
    filters: EmployeeFilters,
  ) => readonly ["employees", "list", EmployeeFilters];
  details: () => readonly ["employees", "detail"];
  detail: (id: number) => readonly ["employees", "detail", number];
}
