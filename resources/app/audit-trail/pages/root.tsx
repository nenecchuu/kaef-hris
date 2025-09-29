import { IconCalendar, IconFileExcel, IconFilter } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "react-router-dom";

import { queryKeyFactory } from "@src/app/audit-trail/config";
import {
  downloadAuditTrail,
  fetchAuditTrails,
} from "@src/app/audit-trail/requests";
import type { AuditTrail } from "@src/app/audit-trail/schemas";
import { LoadingFallback } from "@src/components/fallbacks";
import { Select } from "@src/components/forms";
import {
  LimitSelector,
  Record,
  RecordFilterDialog,
  RecordInfo,
  RecordPagination,
  RecordTable,
  SearchBox,
  TableHeadSort,
} from "@src/components/record";
import { SelectUser } from "@src/components/select-user/select-user";
import { useRecord, useRecordSearchParams } from "@src/hooks/use-record";
import { Button } from "@src/ui/button";
import { DatePicker } from "@src/ui/date-picker";
import { Field, Label } from "@src/ui/field";
import { InputGroup } from "@src/ui/input";
import { Header, Title } from "@src/ui/page";
import { TableCell, TableHead } from "@src/ui/table";
import { View } from "@src/ui/view";

const auditTrailColumns = (from: number): ColumnDef<AuditTrail>[] => {
  const columns: ColumnDef<AuditTrail>[] = [
    {
      id: "no",
      cell: (info) => (
        <TableCell data-numeric="">{info.row.index + from}</TableCell>
      ),
      header: () => <TableHead data-slot="no">No</TableHead>,
    },
    {
      accessorKey: "formatted_created_at",
      cell: (info) => (
        <TableCell>{info.row.original.formatted_created_at}</TableCell>
      ),
      header: () => <TableHead className="w-64">Tanggal dan Waktu</TableHead>,
    },
    {
      accessorKey: "performed_by_name",
      cell: (info) => (
        <TableCell>{info.row.original.performed_by_name}</TableCell>
      ),
      header: ({ column }) => (
        <TableHeadSort column={column}>Nama User</TableHeadSort>
      ),
    },
    {
      accessorKey: "action",
      cell: (info) => <TableCell>{info.row.original.action}</TableCell>,
      header: ({ column }) => (
        <TableHeadSort column={column}>Action</TableHeadSort>
      ),
    },
    {
      accessorKey: "formatted_description",
      cell: (info) => (
        <TableCell>{info.row.original.formatted_description}</TableCell>
      ),
      header: ({ column }) => (
        <TableHeadSort column={column}>Deskripsi</TableHeadSort>
      ),
    },
  ];

  return columns;
};

export function AuditTrailRootPage() {
  const [filter, setFilter] = useRecordSearchParams();

  const { data } = useRecord({
    queryKey: queryKeyFactory.list(filter),
    queryFn: fetchAuditTrails,
  });

  if (!data) {
    return <LoadingFallback />;
  }

  const { data: assets, pagination } = data;

  return (
    <>
      <Header>
        <Title>Audit Trail</Title>
        <ExportAuditTrails />
      </Header>
      <Record
        filter={filter}
        pagination={pagination}
        onFilterChange={setFilter}
        toolbar={
          <>
            <LimitSelector />
            <div className="flex items-center gap-3">
              <AuditTrailRecordFilter />
              <SearchBox />
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
        <View>
          <RecordTable
            emptyState="No audit trails available"
            columns={auditTrailColumns(pagination?.from ?? 1)}
            data={assets}
          />
        </View>
      </Record>
    </>
  );
}

function AuditTrailRecordFilter() {
  const [filter] = useRecordSearchParams();
  const actionItems = [
    {
      label: "Tambah Data",
      value: "create",
    },
    {
      label: "Update",
      value: "update",
    },
    {
      label: "Delete",
      value: "delete",
    },
    {
      label: "Login",
      value: "login",
    },
    {
      label: "Logout",
      value: "logout",
    },
    {
      label: "Login Gagal",
      value: "login_failed",
    },
    {
      label: "Download",
      value: "download",
    },
  ];

  return (
    <RecordFilterDialog
      filterKeys={["performed_by_id", "action", "start_date", "end_date"]}
      trigger={
        <Button type="button" variant="outline" color="default">
          <IconFilter /> Filter
        </Button>
      }
      onReset={() => {
        return undefined;
      }}
    >
      {() => (
        <>
          <div className="flex w-full flex-col gap-2">
            <SelectUser
              label="Nama User"
              id="performed_by_id"
              name="performed_by_id"
              defaultValue={filter.user_id?.toString()}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <Select
              label="Action"
              id="action"
              name="action"
              defaultValue={filter.action?.toString()}
              emptyOptionsText="No action available."
              options={actionItems}
            />
          </div>
          <div id="start-date-container">
            <Field>
              <Label>Mulai Dari</Label>
              <InputGroup>
                <DatePicker
                  name="start_date"
                  placeholder="Pilih mulai dari"
                  defaultValue={filter?.start_date?.toString() ?? undefined}
                  portalId="start-date-container"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2">
                  <IconCalendar className="h-5 w-5 text-gray-400" />
                </div>
              </InputGroup>
            </Field>
          </div>
          <div id="end-date-container">
            <Field>
              <Label>Sampai Dengan</Label>
              <InputGroup>
                <DatePicker
                  name="end_date"
                  placeholder="Pilih sampai dengan"
                  defaultValue={filter?.end_date?.toString() ?? undefined}
                  portalId="end-date-container"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2">
                  <IconCalendar className="h-5 w-5 text-gray-400" />
                </div>
              </InputGroup>
            </Field>
          </div>
        </>
      )}
    </RecordFilterDialog>
  );
}

export function ExportAuditTrails() {
  const [searchParams] = useSearchParams();

  const mutation = useMutation({
    mutationFn: downloadAuditTrail({
      params: searchParams,
    }),
  });
  return (
    <Button
      color="success"
      onClick={() => {
        mutation.mutate();
      }}
      isLoading={mutation.isPending}
    >
      <IconFileExcel /> Download Excel
    </Button>
  );
}
