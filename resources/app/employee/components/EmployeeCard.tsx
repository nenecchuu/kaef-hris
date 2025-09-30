/**
 * EmployeeCard Component
 *
 * Mobile-friendly card layout for employee list
 * Used when viewport is too small for table display
 */

import React from "react";
import {
  IconBriefcase,
  IconBuilding,
  IconDotsVertical,
  IconEdit,
  IconEye,
  IconMail,
  IconPhone,
  IconTrash,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@src/ui/avatar";
import { Button } from "@src/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@src/ui/dropdown-menu";

import { EMPLOYMENT_STATUS_LABELS } from "../config";
import type { Employee } from "../types";

interface EmployeeCardProps {
  employee: Employee;
  onDelete?: (employee: Employee) => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

/**
 * Mobile-friendly employee card component
 */
export function EmployeeCard({
  employee,
  onDelete,
  canEdit = true,
  canDelete = true,
}: EmployeeCardProps) {
  return (
    <div
      className="bg-white rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md"
      role="article"
      aria-label={`Kartu karyawan ${employee.nama_lengkap}`}
    >
      {/* Header with Avatar and Actions */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <Avatar className="h-12 w-12 flex-shrink-0">
            <AvatarImage
              src={employee.foto_url || undefined}
              alt={`Foto ${employee.nama_lengkap}`}
            />
            <AvatarFallback aria-label="Avatar default">
              {employee.nama_lengkap.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <Link
              to={`/employees/${employee.id}`}
              className="block truncate font-semibold text-gray-900 hover:text-blue-600"
            >
              {employee.nama_lengkap}
            </Link>
            <p className="truncate text-sm text-gray-600">
              {employee.nomor_karyawan}
            </p>
          </div>
        </div>

        {/* Actions Dropdown */}
        {(canEdit || canDelete) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild={true}>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 flex-shrink-0 p-0"
                aria-label={`Menu aksi untuk ${employee.nama_lengkap}`}
              >
                <span className="sr-only">Buka menu aksi</span>
                <IconDotsVertical className="h-4 w-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild={true}>
                <Link to={`/employees/${employee.id}`}>
                  <IconEye className="mr-2 h-4 w-4" aria-hidden="true" />
                  Lihat Detail
                </Link>
              </DropdownMenuItem>
              {canEdit && (
                <DropdownMenuItem asChild={true}>
                  <Link to={`/employees/${employee.id}/edit`}>
                    <IconEdit className="mr-2 h-4 w-4" aria-hidden="true" />
                    Edit
                  </Link>
                </DropdownMenuItem>
              )}
              {canDelete && onDelete && (
                <DropdownMenuItem
                  onClick={() => onDelete(employee)}
                  className="text-red-600"
                >
                  <IconTrash className="mr-2 h-4 w-4" aria-hidden="true" />
                  Hapus
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Status Badge */}
      <div className="mt-3">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            employee.status_kepegawaian === "active"
              ? "bg-green-100 text-green-700"
              : employee.status_kepegawaian === "terminated"
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-700"
          }`}
          role="status"
          aria-label={`Status: ${EMPLOYMENT_STATUS_LABELS[employee.status_kepegawaian]}`}
        >
          {EMPLOYMENT_STATUS_LABELS[employee.status_kepegawaian]}
        </span>
      </div>

      {/* Contact and Position Info */}
      <div className="mt-3 space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <IconMail className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span className="truncate" title={employee.email}>
            {employee.email}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <IconPhone className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span className="truncate">{employee.telepon}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <IconBuilding className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span className="truncate" title={employee.divisi.nama}>
            {employee.divisi.nama}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <IconBriefcase className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span className="truncate" title={employee.jabatan.nama}>
            {employee.jabatan.nama}
          </span>
        </div>
      </div>
    </div>
  );
}

export default EmployeeCard;
