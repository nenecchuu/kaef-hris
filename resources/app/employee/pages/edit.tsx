/**
 * Employee Edit Page
 *
 * Page for editing existing employee
 */

import React from 'react';
import { IconArrowLeft } from '@tabler/icons-react';
import { useParams, useNavigate } from 'react-router-dom';

import { useEmployee, useUpdateEmployee } from '../hooks';
import { EmployeeForm } from '../components/EmployeeForm';
import type { UpdateEmployeeData } from '../types';
import { LoadingFallback } from '@src/components/fallbacks';
import { Button, ButtonLink } from '@src/ui/button';
import { Header, Title } from '@src/ui/page';
import { alertToast } from '@src/ui/alert-toast';

export default function EmployeeEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const employeeId = id ? parseInt(id, 10) : undefined;
  const { data, isLoading, isError, error } = useEmployee(employeeId);
  const { mutate: updateEmployee, isPending } = useUpdateEmployee();

  const handleSubmit = (data: UpdateEmployeeData) => {
    updateEmployee(data, {
      onSuccess: () => {
        alertToast({
          title: 'Berhasil',
          description: 'Data karyawan berhasil diperbarui',
          variant: 'success',
        });
        // Navigate back to detail page
        navigate(`/employees/${employeeId}`);
      },
      onError: (error) => {
        alertToast({
          title: 'Gagal memperbarui data karyawan',
          description: error.message,
          variant: 'destructive',
        });
      },
    });
  };

  const handleCancel = () => {
    navigate(`/employees/${employeeId}`);
  };

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {error?.message.includes('tidak ditemukan') ? 'Karyawan Tidak Ditemukan' : 'Terjadi Kesalahan'}
          </h2>
          <p className="mt-2 text-gray-600">{error?.message}</p>
          <ButtonLink to="/employees" className="mt-4" variant="default">
            <IconArrowLeft className="h-4 w-4" />
            Kembali ke Daftar Karyawan
          </ButtonLink>
        </div>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Data Tidak Tersedia</h2>
          <ButtonLink to="/employees" className="mt-4" variant="default">
            <IconArrowLeft className="h-4 w-4" />
            Kembali ke Daftar Karyawan
          </ButtonLink>
        </div>
      </div>
    );
  }

  const employee = data.data;

  return (
    <>
      <Header>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="gap-2"
          >
            <IconArrowLeft className="h-4 w-4" />
            Kembali
          </Button>
          <Title>Edit Karyawan: {employee.nama_lengkap}</Title>
        </div>
      </Header>

      <EmployeeForm
        mode="edit"
        employee={employee}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isPending}
      />
    </>
  );
}