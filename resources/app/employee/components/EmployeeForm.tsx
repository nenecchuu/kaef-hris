/**
 * EmployeeForm Component
 *
 * Form component for creating/editing employees with validation
 */

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconUpload, IconX } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SelectDivision } from "@src/components/select-division/select-division";
import { SelectJobPosition } from "@src/components/select-job-position";
import { Button } from "@src/ui/button";
import { Label } from "@src/ui/field";
import { Input } from "@src/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@src/ui/select";
import { Textarea } from "@src/ui/textarea";

import { EMPLOYMENT_STATUS_LABELS, EMPLOYMENT_TYPE_LABELS } from "../config";
import type {
  CreateEmployeeData,
  Employee,
  EmploymentStatus,
  EmploymentType,
  UpdateEmployeeData,
} from "../types";

// Validation schema
const employeeFormSchema = z.object({
  nomor_karyawan: z.string().optional(),
  nama_lengkap: z.string().min(1, "Nama lengkap wajib diisi"),
  nama_panggilan: z.string().optional(),
  email: z.string().email("Format email tidak valid"),
  telepon: z.string().min(1, "Nomor telepon wajib diisi"),
  nik: z
    .string()
    .length(16, "NIK harus 16 digit")
    .regex(/^\d+$/, "NIK harus berupa angka"),
  npwp: z
    .string()
    .length(15, "NPWP harus 15 digit")
    .regex(/^\d+$/, "NPWP harus berupa angka")
    .optional()
    .or(z.literal("")),
  tanggal_lahir: z.string().min(1, "Tanggal lahir wajib diisi"),
  tanggal_masuk: z.string().min(1, "Tanggal masuk wajib diisi"),
  tanggal_keluar: z.string().optional(),
  status_kepegawaian: z.string().min(1, "Status kepegawaian wajib dipilih"),
  jenis_kepegawaian: z.string().min(1, "Jenis kepegawaian wajib dipilih"),
  alamat: z.string().optional(),
  foto_url: z.string().optional(),
  divisi_id: z.number().min(1, "Divisi wajib dipilih"),
  jabatan_id: z.number().min(1, "Jabatan wajib dipilih"),
  manager_id: z.number().optional(),
});

type EmployeeFormData = z.infer<typeof employeeFormSchema>;

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (data: CreateEmployeeData | UpdateEmployeeData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  mode: "create" | "edit";
}

/**
 * Employee Form Component
 */
export function EmployeeForm({
  employee,
  onSubmit,
  onCancel,
  isSubmitting = false,
  mode,
}: EmployeeFormProps) {
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(
    employee?.foto_url || null,
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: employee
      ? {
          nomor_karyawan: employee.nomor_karyawan,
          nama_lengkap: employee.nama_lengkap,
          nama_panggilan: employee.nama_panggilan || "",
          email: employee.email,
          telepon: employee.telepon,
          nik: employee.nik,
          npwp: employee.npwp || "",
          tanggal_lahir: employee.tanggal_lahir,
          tanggal_masuk: employee.tanggal_masuk,
          tanggal_keluar: employee.tanggal_keluar || "",
          status_kepegawaian: employee.status_kepegawaian,
          jenis_kepegawaian: employee.jenis_kepegawaian,
          alamat: employee.alamat || "",
          foto_url: employee.foto_url || "",
          divisi_id: employee.divisi.id,
          jabatan_id: employee.jabatan.id,
          manager_id: employee.manager?.id,
        }
      : undefined,
  });

  const divisiId = watch("divisi_id");
  const jabatanId = watch("jabatan_id");
  const statusKepegawaian = watch("status_kepegawaian");
  const jenisKepegawaian = watch("jenis_kepegawaian");

  const handleFormSubmit = (data: EmployeeFormData) => {
    if (mode === "edit" && employee) {
      const updateData: UpdateEmployeeData = {
        id: employee.id,
        ...data,
        npwp: data.npwp || undefined,
        nama_panggilan: data.nama_panggilan || undefined,
        alamat: data.alamat || undefined,
        tanggal_keluar: data.tanggal_keluar || undefined,
      };
      onSubmit(updateData);
    } else {
      const createData: CreateEmployeeData = {
        ...data,
        npwp: data.npwp || undefined,
        nama_panggilan: data.nama_panggilan || undefined,
        alamat: data.alamat || undefined,
        tanggal_keluar: data.tanggal_keluar || undefined,
        status_kepegawaian: data.status_kepegawaian as EmploymentStatus,
        jenis_kepegawaian: data.jenis_kepegawaian as EmploymentType,
      };
      onSubmit(createData);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In production, upload to server and get URL
      // For now, create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setValue("foto_url", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Photo Upload Section */}
      <div className="bg-white rounded-lg border p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">Foto Karyawan</h3>
        <div className="flex items-center gap-4">
          {photoPreview && (
            <div className="relative h-24 w-24">
              <img
                src={photoPreview}
                alt="Preview"
                className="h-full w-full rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setPhotoPreview(null);
                  setValue("foto_url", "");
                }}
                className="text-white absolute -right-2 -top-2 rounded-full bg-red-500 p-1 hover:bg-red-600"
              >
                <IconX className="h-4 w-4" />
              </button>
            </div>
          )}
          <div>
            <Label htmlFor="photo-upload">
              <Button type="button" variant="outline" size="sm" asChild={true}>
                <span className="cursor-pointer">
                  <IconUpload className="mr-2 h-4 w-4" />
                  Upload Foto
                </span>
              </Button>
            </Label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <p className="mt-1 text-xs text-gray-500">
              Format: JPG, PNG. Maksimal 2MB
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="bg-white rounded-lg border p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">Informasi Pribadi</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="nomor_karyawan">Nomor Karyawan</Label>
            <Input
              id="nomor_karyawan"
              {...register("nomor_karyawan")}
              placeholder="Otomatis jika kosong"
              disabled={mode === "edit"}
            />
            {errors.nomor_karyawan && (
              <p className="mt-1 text-sm text-red-600">
                {errors.nomor_karyawan.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="nama_lengkap">Nama Lengkap *</Label>
            <Input
              id="nama_lengkap"
              {...register("nama_lengkap")}
              placeholder="Masukkan nama lengkap"
            />
            {errors.nama_lengkap && (
              <p className="mt-1 text-sm text-red-600">
                {errors.nama_lengkap.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="nama_panggilan">Nama Panggilan</Label>
            <Input
              id="nama_panggilan"
              {...register("nama_panggilan")}
              placeholder="Masukkan nama panggilan"
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="email@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="telepon">Telepon *</Label>
            <Input
              id="telepon"
              {...register("telepon")}
              placeholder="08xxxxxxxxxx"
            />
            {errors.telepon && (
              <p className="mt-1 text-sm text-red-600">
                {errors.telepon.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="nik">NIK (16 digit) *</Label>
            <Input
              id="nik"
              {...register("nik")}
              placeholder="1234567890123456"
              maxLength={16}
            />
            {errors.nik && (
              <p className="mt-1 text-sm text-red-600">{errors.nik.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="npwp">NPWP (15 digit)</Label>
            <Input
              id="npwp"
              {...register("npwp")}
              placeholder="123456789012345"
              maxLength={15}
            />
            {errors.npwp && (
              <p className="mt-1 text-sm text-red-600">{errors.npwp.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="tanggal_lahir">Tanggal Lahir *</Label>
            <Input
              id="tanggal_lahir"
              type="date"
              {...register("tanggal_lahir")}
            />
            {errors.tanggal_lahir && (
              <p className="mt-1 text-sm text-red-600">
                {errors.tanggal_lahir.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="alamat">Alamat</Label>
            <Textarea
              id="alamat"
              {...register("alamat")}
              placeholder="Masukkan alamat lengkap"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Employment Information Section */}
      <div className="bg-white rounded-lg border p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">Informasi Pekerjaan</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="tanggal_masuk">Tanggal Masuk *</Label>
            <Input
              id="tanggal_masuk"
              type="date"
              {...register("tanggal_masuk")}
            />
            {errors.tanggal_masuk && (
              <p className="mt-1 text-sm text-red-600">
                {errors.tanggal_masuk.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="tanggal_keluar">Tanggal Keluar</Label>
            <Input
              id="tanggal_keluar"
              type="date"
              {...register("tanggal_keluar")}
            />
          </div>

          <div>
            <Label htmlFor="status_kepegawaian">Status Kepegawaian *</Label>
            <Select
              value={statusKepegawaian}
              onValueChange={(value) => setValue("status_kepegawaian", value)}
            >
              <SelectTrigger id="status_kepegawaian">
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(EMPLOYMENT_STATUS_LABELS).map(
                  ([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
            {errors.status_kepegawaian && (
              <p className="mt-1 text-sm text-red-600">
                {errors.status_kepegawaian.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="jenis_kepegawaian">Jenis Kepegawaian *</Label>
            <Select
              value={jenisKepegawaian}
              onValueChange={(value) => setValue("jenis_kepegawaian", value)}
            >
              <SelectTrigger id="jenis_kepegawaian">
                <SelectValue placeholder="Pilih jenis" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(EMPLOYMENT_TYPE_LABELS).map(
                  ([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
            {errors.jenis_kepegawaian && (
              <p className="mt-1 text-sm text-red-600">
                {errors.jenis_kepegawaian.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="divisi_id">Divisi *</Label>
            <SelectDivision
              value={divisiId}
              onChange={(value) => setValue("divisi_id", value || 0)}
              placeholder="Pilih divisi"
            />
            {errors.divisi_id && (
              <p className="mt-1 text-sm text-red-600">
                {errors.divisi_id.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="jabatan_id">Jabatan *</Label>
            <SelectJobPosition
              value={jabatanId}
              onChange={(value) => setValue("jabatan_id", value || 0)}
              placeholder="Pilih jabatan"
            />
            {errors.jabatan_id && (
              <p className="mt-1 text-sm text-red-600">
                {errors.jabatan_id.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Batal
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Menyimpan..."
            : mode === "create"
              ? "Simpan"
              : "Perbarui"}
        </Button>
      </div>
    </form>
  );
}

export default EmployeeForm;
