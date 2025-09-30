/**
 * Employee Create Page
 *
 * Page for creating new employee
 */

import React from "react";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import { alertToast } from "@src/ui/alert-toast";
import { Button } from "@src/ui/button";
import { Header, Title } from "@src/ui/page";

import { EmployeeForm } from "../components/EmployeeForm";
import { useCreateEmployee } from "../hooks";
import type { CreateEmployeeData } from "../types";

export default function EmployeeCreatePage() {
  const navigate = useNavigate();
  const { mutate: createEmployee, isPending } = useCreateEmployee();

  const handleSubmit = (data: CreateEmployeeData) => {
    createEmployee(data, {
      onSuccess: (response) => {
        alertToast({
          title: "Berhasil",
          description: `Karyawan ${data.nama_lengkap} berhasil ditambahkan`,
          variant: "success",
        });
        // Navigate to detail page
        navigate(`/employees/${response.data.id}`);
      },
      onError: (error) => {
        alertToast({
          title: "Gagal menambahkan karyawan",
          description: error.message,
          variant: "error",
        });
      },
    });
  };

  const handleCancel = () => {
    navigate("/employees");
  };

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
          <Title>Tambah Karyawan Baru</Title>
        </div>
      </Header>

      <EmployeeForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isPending}
      />
    </>
  );
}
