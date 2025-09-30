/**
 * Employee Index Page
 *
 * Main employee management page with list, search, and filters
 */

import React from 'react';
import { IconPlus, IconFilter } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { useEmployees } from '../hooks';
import { EmployeeList } from '../components/EmployeeList';
import { EmployeeSearch } from '../components/EmployeeSearch';
import { EmployeeFilters } from '../components/EmployeeFilters';
import { DEFAULT_PER_PAGE } from '../config';
import type { EmployeeFilters as FilterType } from '../types';
import { LoadingFallback } from '@src/components/fallbacks';
import {
  Record,
  RecordInfo,
  RecordPagination,
  LimitSelector,
} from '@src/components/record';
import { useRecord, useRecordSearchParams } from '@src/hooks/use-record';
import { Button, ButtonLink } from '@src/ui/button';
import { Header, Title } from '@src/ui/page';
import { View } from '@src/ui/view';
import { useAuth } from '@src/lib/auth';
import { alertToast } from '@src/ui/alert-toast';
import { useDeleteEmployee } from '../hooks/useEmployeeMutations';
import {
  ConfirmDialog,
  ConfirmRemoval,
} from '@src/ui/confirm-dialog';
import type { Employee } from '../types';

export default function EmployeeIndexPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useRecordSearchParams();
  const [deleteEmployee, setDeleteEmployee] = React.useState<Employee | null>(null);

  // Build filters for API
  const apiFilters: FilterType = {
    search: filter.search as string | undefined,
    status_kepegawaian: filter.status_kepegawaian as any,
    divisi_id: filter.divisi_id ? Number(filter.divisi_id) : undefined,
    jabatan_id: filter.jabatan_id ? Number(filter.jabatan_id) : undefined,
    page: filter.page ? Number(filter.page) : 1,
    per_page: filter.limit ? Number(filter.limit) : DEFAULT_PER_PAGE,
  };

  // Fetch employees
  const { data, isLoading, isError, error } = useEmployees(apiFilters);

  const { mutate: handleDelete, isPending: isDeleting } = useDeleteEmployee();

  // Permission checks (simplified - adjust based on your RBAC)
  const canEdit = user?.is_administrator || false;
  const canDelete = user?.is_administrator || false;
  const canCreate = user?.is_administrator || false;

  // Handle search change
  const handleSearchChange = (search: string) => {
    setFilter({ ...filter, search, page: '1' });
  };

  // Handle status filter change
  const handleStatusChange = (status_kepegawaian?: string) => {
    setFilter({ ...filter, status_kepegawaian, page: '1' });
  };

  // Handle division filter change
  const handleDivisionChange = (divisi_id?: number) => {
    setFilter({
      ...filter,
      divisi_id: divisi_id?.toString(),
      page: '1',
    });
  };

  // Handle job position filter change
  const handleJobPositionChange = (jabatan_id?: number) => {
    setFilter({
      ...filter,
      jabatan_id: jabatan_id?.toString(),
      page: '1',
    });
  };

  // Handle filter reset
  const handleResetFilters = () => {
    setFilter({
      page: '1',
      limit: filter.limit,
    });
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (!deleteEmployee) return;

    handleDelete(deleteEmployee.id, {
      onSuccess: () => {
        alertToast({
          title: 'Berhasil',
          description: `Karyawan ${deleteEmployee.nama_lengkap} berhasil dihapus`,
          variant: 'success',
        });
        setDeleteEmployee(null);
      },
      onError: (error) => {
        alertToast({
          title: 'Gagal menghapus karyawan',
          description: error.message,
          variant: 'destructive',
        });
      },
    });
  };

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-red-600">
            Terjadi kesalahan saat memuat data karyawan
          </p>
          <p className="mt-2 text-sm text-gray-600">{error?.message}</p>
        </div>
      </div>
    );
  }

  const employees = data?.data || [];
  const pagination = data?.meta;

  return (
    <>
      <Header>
        <Title>Manajemen Karyawan</Title>
        {canCreate && (
          <ButtonLink to="/employees/new" variant="default">
            <IconPlus /> Tambah Karyawan Baru
          </ButtonLink>
        )}
      </Header>

      <Record
        filter={filter}
        pagination={pagination}
        onFilterChange={setFilter}
        toolbar={
          <>
            <LimitSelector />
            <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-end">
              <div className="flex-1">
                <EmployeeSearch
                  value={(filter.search as string) || ''}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </>
        }
        footer={
          <>
            <RecordInfo />
            <RecordPagination />
          </>
        }
      >
        <div className="mb-4">
          <EmployeeFilters
            statusKepegawaian={filter.status_kepegawaian as any}
            divisiId={filter.divisi_id ? Number(filter.divisi_id) : undefined}
            jabatanId={filter.jabatan_id ? Number(filter.jabatan_id) : undefined}
            onStatusChange={handleStatusChange}
            onDivisionChange={handleDivisionChange}
            onJobPositionChange={handleJobPositionChange}
            onReset={handleResetFilters}
          />
        </div>

        <View>
          {employees.length === 0 ? (
            <div className="flex h-64 items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-medium text-gray-600">
                  Tidak ada data karyawan
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  {filter.search || filter.status_kepegawaian || filter.divisi_id
                    ? 'Coba ubah filter pencarian Anda'
                    : 'Mulai dengan menambahkan karyawan baru'}
                </p>
              </div>
            </div>
          ) : (
            <EmployeeList
              employees={employees}
              from={pagination?.from ?? 1}
              onDelete={(employee) => setDeleteEmployee(employee)}
              canEdit={canEdit}
              canDelete={canDelete}
            />
          )}
        </View>
      </Record>

      {/* Delete Confirmation Dialog */}
      {deleteEmployee && (
        <ConfirmDialog
          open={!!deleteEmployee}
          onOpenChange={(open) => !open && setDeleteEmployee(null)}
        >
          <ConfirmRemoval
            onConfirm={handleDeleteConfirm}
            onCancel={() => setDeleteEmployee(null)}
            isLoading={isDeleting}
            title="Hapus Karyawan"
            description={`Apakah Anda yakin ingin menghapus karyawan ${deleteEmployee.nama_lengkap}? Tindakan ini akan menonaktifkan karyawan dari sistem.`}
            confirmText="Hapus"
            cancelText="Batal"
          />
        </ConfirmDialog>
      )}
    </>
  );
}