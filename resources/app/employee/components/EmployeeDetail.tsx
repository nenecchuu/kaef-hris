/**
 * EmployeeDetail Component
 *
 * Detailed employee view with tabbed interface
 */

import React from "react";
import {
  IconBriefcase,
  IconCertificate,
  IconEdit,
  IconLicense,
  IconSchool,
  IconUser,
} from "@tabler/icons-react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@src/ui/avatar";
import { Badge } from "@src/ui/badge";
import { ButtonLink } from "@src/ui/button";
import { Tabs, TabsContent, TabsList, Tab } from "@src/ui/tabs";

import { EMPLOYMENT_STATUS_LABELS, EMPLOYMENT_TYPE_LABELS } from "../config";
import type { EmployeeDetail as EmployeeDetailType } from "../types";

interface EmployeeDetailProps {
  employee: EmployeeDetailType;
  canEdit?: boolean;
}

/**
 * Format date to Indonesian format
 */
function formatDate(dateString: string): string {
  try {
    return format(new Date(dateString), "dd MMMM yyyy", { locale: idLocale });
  } catch {
    return dateString;
  }
}

/**
 * Employee Detail Component with Tabs
 */
export function EmployeeDetail({
  employee,
  canEdit = false,
}: EmployeeDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg border p-4 shadow-sm sm:p-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-6">
          {/* Avatar */}
          <Avatar className="h-20 w-20 flex-shrink-0 rounded-lg sm:h-24 sm:w-24">
            <AvatarImage
              src={employee.foto_url || undefined}
              alt={`Foto ${employee.nama_lengkap}`}
            />
            <AvatarFallback
              className="rounded-lg text-xl sm:text-2xl"
              aria-label="Avatar default"
            >
              {employee.nama_lengkap.charAt(0)}
            </AvatarFallback>
          </Avatar>

          {/* Basic Info */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
              <div className="min-w-0 flex-1">
                <h2 className="break-words text-xl font-bold text-gray-900 sm:text-2xl">
                  {employee.nama_lengkap}
                </h2>
                {employee.nama_panggilan && (
                  <p className="text-sm text-gray-600">
                    ({employee.nama_panggilan})
                  </p>
                )}
                <p className="mt-1 text-sm font-medium text-gray-600">
                  {employee.nomor_karyawan}
                </p>
              </div>
              {canEdit && (
                <ButtonLink
                  to={`/employees/${employee.id}/edit`}
                  variant="default"
                  size="sm"
                  aria-label={`Edit data ${employee.nama_lengkap}`}
                >
                  <IconEdit className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Edit</span>
                </ButtonLink>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge
                variant={
                  employee.status_kepegawaian === "active"
                    ? "success"
                    : "secondary"
                }
              >
                {EMPLOYMENT_STATUS_LABELS[employee.status_kepegawaian]}
              </Badge>
              <Badge variant="outline">
                {EMPLOYMENT_TYPE_LABELS[employee.jenis_kepegawaian]}
              </Badge>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{employee.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Telepon</p>
                <p className="font-medium">{employee.telepon}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Divisi</p>
                <p className="font-medium">{employee.divisi.nama}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Jabatan</p>
                <p className="font-medium">{employee.jabatan.nama}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
          <Tab value="personal" aria-label="Tab informasi pribadi">
            <IconUser className="h-4 w-4 sm:mr-2" aria-hidden="true" />
            <span className="hidden sm:inline">Info Pribadi</span>
            <span className="text-xs sm:hidden">Pribadi</span>
          </Tab>
          <Tab value="employment" aria-label="Tab informasi pekerjaan">
            <IconBriefcase className="h-4 w-4 sm:mr-2" aria-hidden="true" />
            <span className="hidden sm:inline">Info Pekerjaan</span>
            <span className="text-xs sm:hidden">Kerja</span>
          </Tab>
          <Tab value="education" aria-label="Tab riwayat pendidikan">
            <IconSchool className="h-4 w-4 sm:mr-2" aria-hidden="true" />
            <span className="hidden sm:inline">Pendidikan</span>
            <span className="text-xs sm:hidden">Edu</span>
          </Tab>
          <Tab value="certifications" aria-label="Tab sertifikasi">
            <IconCertificate className="h-4 w-4 sm:mr-2" aria-hidden="true" />
            <span className="hidden sm:inline">Sertifikasi</span>
            <span className="text-xs sm:hidden">Sertif</span>
          </Tab>
          <Tab value="licenses" aria-label="Tab lisensi profesional">
            <IconLicense className="h-4 w-4 sm:mr-2" aria-hidden="true" />
            <span className="hidden sm:inline">Lisensi</span>
            <span className="text-xs sm:hidden">Lisensi</span>
          </Tab>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="mt-4">
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">Informasi Pribadi</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-gray-600">NIK</p>
                <p className="font-medium">{employee.nik}</p>
              </div>
              {employee.npwp && (
                <div>
                  <p className="text-sm text-gray-600">NPWP</p>
                  <p className="font-medium">{employee.npwp}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-600">Tanggal Lahir</p>
                <p className="font-medium">
                  {formatDate(employee.tanggal_lahir)}
                </p>
              </div>
              {employee.alamat && (
                <div className="sm:col-span-2">
                  <p className="text-sm text-gray-600">Alamat</p>
                  <p className="font-medium">{employee.alamat}</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Employment Information Tab */}
        <TabsContent value="employment" className="mt-4">
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">Informasi Pekerjaan</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-gray-600">Tanggal Masuk</p>
                <p className="font-medium">
                  {formatDate(employee.tanggal_masuk)}
                </p>
              </div>
              {employee.tanggal_keluar && (
                <div>
                  <p className="text-sm text-gray-600">Tanggal Keluar</p>
                  <p className="font-medium">
                    {formatDate(employee.tanggal_keluar)}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-600">Status Kepegawaian</p>
                <p className="font-medium">
                  {EMPLOYMENT_STATUS_LABELS[employee.status_kepegawaian]}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Jenis Kepegawaian</p>
                <p className="font-medium">
                  {EMPLOYMENT_TYPE_LABELS[employee.jenis_kepegawaian]}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Divisi</p>
                <p className="font-medium">
                  {employee.divisi.nama} ({employee.divisi.kode})
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Jabatan</p>
                <p className="font-medium">
                  {employee.jabatan.nama} (Level {employee.jabatan.level})
                </p>
              </div>
              {employee.manager && (
                <div className="sm:col-span-2">
                  <p className="text-sm text-gray-600">Manager</p>
                  <Link
                    to={`/employees/${employee.manager.id}`}
                    className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {employee.manager.nama_lengkap} (
                    {employee.manager.nomor_karyawan})
                  </Link>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Education History Tab */}
        <TabsContent value="education" className="mt-4">
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">Riwayat Pendidikan</h3>
            {employee.education_history &&
            employee.education_history.length > 0 ? (
              <div className="space-y-4">
                {employee.education_history.map((edu) => (
                  <div key={edu.id} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold">{edu.degree_level}</p>
                        <p className="text-sm text-gray-600">
                          {edu.institution_name}
                        </p>
                        {edu.field_of_study && (
                          <p className="text-sm text-gray-600">
                            {edu.field_of_study}
                          </p>
                        )}
                      </div>
                      {edu.is_verified && (
                        <Badge variant="success">Terverifikasi</Badge>
                      )}
                    </div>
                    <div className="mt-2 flex gap-4 text-sm text-gray-600">
                      {edu.graduation_year && (
                        <span>Lulus: {edu.graduation_year}</span>
                      )}
                      {edu.gpa && <span>IPK: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                Belum ada riwayat pendidikan
              </p>
            )}
          </div>
        </TabsContent>

        {/* Certifications Tab */}
        <TabsContent value="certifications" className="mt-4">
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">Sertifikasi</h3>
            {employee.certifications && employee.certifications.length > 0 ? (
              <div className="space-y-4">
                {employee.certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="border-l-4 border-green-500 pl-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold">
                          {cert.certification_name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {cert.issuing_organization}
                        </p>
                        {cert.certification_number && (
                          <p className="text-sm text-gray-600">
                            No: {cert.certification_number}
                          </p>
                        )}
                      </div>
                      <Badge variant={cert.is_active ? "success" : "secondary"}>
                        {cert.is_active ? "Aktif" : "Tidak Aktif"}
                      </Badge>
                    </div>
                    <div className="mt-2 flex gap-4 text-sm text-gray-600">
                      <span>Terbit: {formatDate(cert.issue_date)}</span>
                      {cert.expiry_date && (
                        <span>
                          Berlaku sampai: {formatDate(cert.expiry_date)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">Belum ada sertifikasi</p>
            )}
          </div>
        </TabsContent>

        {/* Professional Licenses Tab */}
        <TabsContent value="licenses" className="mt-4">
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">Lisensi Profesional</h3>
            {employee.professional_licenses &&
            employee.professional_licenses.length > 0 ? (
              <div className="space-y-4">
                {employee.professional_licenses.map((license) => (
                  <div
                    key={license.id}
                    className="border-l-4 border-purple-500 pl-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold">{license.license_name}</p>
                        <p className="text-sm text-gray-600">
                          {license.issuing_authority}
                        </p>
                        <p className="text-sm text-gray-600">
                          No: {license.license_number}
                        </p>
                      </div>
                      <Badge
                        variant={
                          license.license_status === "active"
                            ? "success"
                            : license.license_status === "expired"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {license.license_status === "active"
                          ? "Aktif"
                          : license.license_status === "expired"
                            ? "Kadaluarsa"
                            : license.license_status === "suspended"
                              ? "Ditangguhkan"
                              : "Dicabut"}
                      </Badge>
                    </div>
                    <div className="mt-2 flex gap-4 text-sm text-gray-600">
                      <span>Terbit: {formatDate(license.issue_date)}</span>
                      <span>
                        Berlaku sampai: {formatDate(license.expiry_date)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                Belum ada lisensi profesional
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default EmployeeDetail;
