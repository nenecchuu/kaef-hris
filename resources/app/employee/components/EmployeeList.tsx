/**
 * EmployeeList Component
 *
 * Table component for displaying paginated employee list
 * Follows existing RecordTable pattern from user module
 */

import React from "react";
import {
  IconDotsVertical,
  IconEdit,
  IconEye,
  IconTrash,
} from "@tabler/icons-react";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

import { RecordTable, TableHeadSort } from "@src/components/record";
import { Avatar, AvatarFallback, AvatarImage } from "@src/ui/avatar";
import { Button } from "@src/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@src/ui/dropdown-menu";
import { TableCell, TableHead } from "@src/ui/table";

import { EMPLOYMENT_STATUS_LABELS } from "../config";
import type { Employee } from "../types";

interface EmployeeListProps {
  employees: Employee[];
  from: number;
  onDelete?: (employee: Employee) => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

/**
 * Define table columns for employee list
 */
const employeeColumns = (
  from: number,
  onDelete?: (employee: Employee) => void,
  canEdit = true,
  canDelete = true,
): ColumnDef<Employee>[] => {
  const columns: ColumnDef<Employee>[] = [
    {
      id: "no",
      cell: (info) => (
        <TableCell data-numeric="">{info.row.index + from}</TableCell>
      ),
      header: () => <TableHead data-slot="no">No</TableHead>,
    },
    {
      accessorKey: "foto_url",
      cell: (info) => (
        <TableCell>
          <Avatar className="mx-auto rounded-full">
            <AvatarImage
              src={info.row.original.foto_url || undefined}
              alt={`${info.row.original.nama_lengkap}'s photo`}
            />
            <AvatarFallback>
              {info.row.original.nama_lengkap.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </TableCell>
      ),
      header: () => <TableHead className="w-16">Foto</TableHead>,
    },
    {
      accessorKey: "nomor_karyawan",
      cell: (info) => (
        <TableCell>
          <Link
            to={`/employees/${info.row.original.id}`}
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            {info.row.original.nomor_karyawan}
          </Link>
        </TableCell>
      ),
      header: ({ column }) => (
        <TableHeadSort column={column}>Nomor Karyawan</TableHeadSort>
      ),
    },
    {
      accessorKey: "nama_lengkap",
      cell: (info) => <TableCell>{info.row.original.nama_lengkap}</TableCell>,
      header: ({ column }) => (
        <TableHeadSort column={column}>Nama Lengkap</TableHeadSort>
      ),
    },
    {
      accessorKey: "email",
      cell: (info) => <TableCell>{info.row.original.email}</TableCell>,
      header: ({ column }) => (
        <TableHeadSort column={column}>Email</TableHeadSort>
      ),
    },
    {
      accessorKey: "divisi",
      cell: (info) => <TableCell>{info.row.original.divisi.nama}</TableCell>,
      header: ({ column }) => (
        <TableHeadSort column={column}>Divisi</TableHeadSort>
      ),
    },
    {
      accessorKey: "jabatan",
      cell: (info) => <TableCell>{info.row.original.jabatan.nama}</TableCell>,
      header: ({ column }) => (
        <TableHeadSort column={column}>Jabatan</TableHeadSort>
      ),
    },
    {
      accessorKey: "status_kepegawaian",
      cell: (info) => (
        <TableCell>
          <span
            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
              info.row.original.status_kepegawaian === "active"
                ? "bg-green-100 text-green-700"
                : info.row.original.status_kepegawaian === "terminated"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
            }`}
          >
            {EMPLOYMENT_STATUS_LABELS[info.row.original.status_kepegawaian]}
          </span>
        </TableCell>
      ),
      header: ({ column }) => (
        <TableHeadSort column={column}>Status</TableHeadSort>
      ),
    },
  ];

  // Add actions column if user has edit or delete permissions
  if (canEdit || canDelete) {
    columns.push({
      id: "actions",
      cell: (info) => (
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild={true}>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                aria-label={`Menu aksi untuk ${info.row.original.nama_lengkap}`}
              >
                <span className="sr-only">Buka menu aksi</span>
                <IconDotsVertical className="h-4 w-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild={true}>
                <Link to={`/employees/${info.row.original.id}`}>
                  <IconEye className="mr-2 h-4 w-4" />
                  Lihat Detail
                </Link>
              </DropdownMenuItem>
              {canEdit && (
                <DropdownMenuItem asChild={true}>
                  <Link to={`/employees/${info.row.original.id}/edit`}>
                    <IconEdit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
              )}
              {canDelete && onDelete && (
                <DropdownMenuItem
                  onClick={() => onDelete(info.row.original)}
                  className="text-red-600"
                >
                  <IconTrash className="mr-2 h-4 w-4" />
                  Hapus
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      ),
      header: () => <TableHead className="w-12">Aksi</TableHead>,
    });
  }

  return columns;
};

/**
 * Employee List Component
 */
export function EmployeeList({
  employees,
  from,
  onDelete,
  canEdit = true,
  canDelete = true,
}: EmployeeListProps) {
  const columns = React.useMemo(
    () => employeeColumns(from, onDelete, canEdit, canDelete),
    [from, onDelete, canEdit, canDelete],
  );

  return <RecordTable columns={columns} data={employees} />;
}

export default EmployeeList;
