/**
 * Employee Detail Page
 *
 * Page component for displaying employee detail
 */

import React from 'react';
import { IconArrowLeft } from '@tabler/icons-react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { useEmployee } from '../hooks';
import { EmployeeDetail } from '../components/EmployeeDetail';
import { LoadingFallback } from '@src/components/fallbacks';
import { Button, ButtonLink } from '@src/ui/button';
import { Header, Title } from '@src/ui/page';
import { useAuth } from '@src/lib/auth';

export default function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const employeeId = id ? parseInt(id, 10) : undefined;
  const { data, isLoading, isError, error } = useEmployee(employeeId);

  // Permission check (simplified - adjust based on your RBAC)
  const canEdit = user?.is_administrator || false;

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
            onClick={() => navigate('/employees')}
            className="gap-2"
          >
            <IconArrowLeft className="h-4 w-4" />
            Kembali
          </Button>
          <Title>Detail Karyawan</Title>
        </div>
      </Header>

      <EmployeeDetail employee={employee} canEdit={canEdit} />
    </>
  );
}