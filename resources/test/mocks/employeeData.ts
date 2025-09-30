/**
 * Mock Employee Data for Testing
 */

import type {
  Division,
  Employee,
  EmployeeDetail,
  JobPosition,
} from "@src/app/employee/types";

export const mockDivision: Division = {
  id: 1,
  kode: "IT",
  nama: "Information Technology",
};

export const mockJobPosition: JobPosition = {
  id: 1,
  kode: "DEV",
  nama: "Software Developer",
  level: 3,
};

export const mockEmployee: Employee = {
  id: 1,
  nomor_karyawan: "KF2024001",
  nama_lengkap: "John Doe",
  nama_panggilan: "John",
  email: "john.doe@kimiafarma.co.id",
  telepon: "081234567890",
  nik: "1234567890123456",
  tanggal_lahir: "1990-01-01",
  tanggal_masuk: "2024-01-01",
  status_kepegawaian: "active",
  jenis_kepegawaian: "permanent",
  divisi: mockDivision,
  jabatan: mockJobPosition,
  foto_url: null,
};

export const mockEmployeeDetail: EmployeeDetail = {
  ...mockEmployee,
  npwp: "123456789012345",
  alamat: "Jl. Test No. 123, Jakarta",
  tanggal_keluar: null,
  manager: null,
  education_history: [
    {
      id: 1,
      employee_id: 1,
      degree_level: "S1",
      institution_name: "Universitas Indonesia",
      field_of_study: "Teknik Informatika",
      graduation_year: 2012,
      gpa: 3.5,
      is_verified: true,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  ],
  certifications: [
    {
      id: 1,
      employee_id: 1,
      certification_name: "AWS Certified Developer",
      issuing_organization: "Amazon Web Services",
      certification_number: "AWS-12345",
      issue_date: "2023-01-01",
      expiry_date: "2026-01-01",
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  ],
  professional_licenses: [
    {
      id: 1,
      employee_id: 1,
      license_name: "Apoteker",
      license_number: "APT-12345",
      issuing_authority: "Ikatan Apoteker Indonesia",
      issue_date: "2022-01-01",
      expiry_date: "2027-01-01",
      license_status: "active",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  ],
};

export const mockEmployees: Employee[] = [
  mockEmployee,
  {
    ...mockEmployee,
    id: 2,
    nomor_karyawan: "KF2024002",
    nama_lengkap: "Jane Smith",
    nama_panggilan: "Jane",
    email: "jane.smith@kimiafarma.co.id",
  },
  {
    ...mockEmployee,
    id: 3,
    nomor_karyawan: "KF2024003",
    nama_lengkap: "Bob Johnson",
    nama_panggilan: "Bob",
    email: "bob.johnson@kimiafarma.co.id",
    status_kepegawaian: "terminated",
  },
];
