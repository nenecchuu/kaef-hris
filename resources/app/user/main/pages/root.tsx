import React from "react";
import {
  IconDotsVertical,
  IconEdit,
  IconFilter,
  IconInfoCircle,
  IconLockOpen,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { Link, useNavigate } from "react-router-dom";

import { UserConfirmRemoval } from "@src/app/user/main/components";
import {
  ALERT_TOAST_PROPS,
  CONFIRM_DIALOG_PROPS,
  queryKeyFactory,
} from "@src/app/user/main/config";
import {
  fetchUsers,
  setUserActiveStatus,
  unblockUser,
} from "@src/app/user/main/requests";
import type { User } from "@src/app/user/main/schemas";
import { LoadingFallback } from "@src/components/fallbacks";
import { RadioGroup, RadioGroupButton } from "@src/components/forms";
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
import { SelectDivision } from "@src/components/select-division/select-division";
import { SelectJobPosition } from "@src/components/select-job-position";
import { useRecord, useRecordSearchParams } from "@src/hooks/use-record";
import { alertToast } from "@src/ui/alert-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@src/ui/avatar";
import { Button, ButtonLink } from "@src/ui/button";
import {
  ConfirmDialog,
  ConfirmDialogTrigger,
  ConfirmRemoval,
} from "@src/ui/confirm-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@src/ui/dropdown-menu";
import { Label } from "@src/ui/field";
import { Header, Title } from "@src/ui/page";
import { Switch } from "@src/ui/switch";
import { TableCell, TableHead, TableHeadVisuallyHidden } from "@src/ui/table";
import { View } from "@src/ui/view";
import { useAuth } from "@src/lib/auth";

const userColumns = (
  from: number,
  isBlockedUserPage: boolean,
): ColumnDef<User>[] => {
  const columns: ColumnDef<User>[] = [
    {
      id: "no",
      cell: (info) => (
        <TableCell data-numeric="">{info.row.index + from}</TableCell>
      ),
      header: () => <TableHead data-slot="no">No</TableHead>,
    },
    {
      accessorKey: "avatar_path",
      cell: (info) => (
        <TableCell>
          <Avatar className="mx-auto rounded-full">
            <AvatarImage
              src={info.row.original.avatar_path}
              alt={`${info.row.original.name}'s image`}
            />
            <AvatarFallback>{info.row.original.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </TableCell>
      ),
      header: () => <TableHead className="w-16">Foto</TableHead>,
    },
    {
      accessorKey: "name",
      cell: (info) => <TableCell>{info.row.original.name}</TableCell>,
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
      accessorKey: "division_name",
      cell: (info) => <TableCell>{info.row.original.division_name}</TableCell>,
      header: ({ column }) => (
        <TableHeadSort column={column}>Divisi</TableHeadSort>
      ),
    },
    {
        accessorKey: "is_administrator",
        cell: (info) => <TableCell>{info.row.original.is_administrator == true ? 'User UMS' : 'User'}</TableCell>,
        header: ({ column }) => (
          <TableHeadSort column={column}>Role</TableHeadSort>
        ),
      },
    {
      accessorKey: "job_position_name",
      cell: (info) => (
        <TableCell>{info.row.original.job_position_name}</TableCell>
      ),
      header: ({ column }) => (
        <TableHeadSort column={column}>Jabatan</TableHeadSort>
      ),
    },
    {
      accessorKey: "id",
      cell: (info) => (
        <TableCell>
          <UserItemMenu
            isBlockedUserPage={isBlockedUserPage}
            user={info.row.original}
          />
        </TableCell>
      ),
      header: () => <TableHeadVisuallyHidden>Action</TableHeadVisuallyHidden>,
    },
  ];

  // Add the status column only if isBlockedUserPage is false
  if (!isBlockedUserPage) {
    columns.splice(6, 0, {
      accessorKey: "status",
      cell: (info) => (
        <TableCell>
          <ConfirmDialog>
            <ConfirmDialogTrigger>
              <Switch
                checked={info.row.original.is_active}
                disabled={info.row.original.is_administrator ?? true}
              />
            </ConfirmDialogTrigger>
            <UserConfirmSetStatus
              setActive={!info.row.original.is_active}
              userId={info.row.original.id}
            />
          </ConfirmDialog>
        </TableCell>
      ),
      header: ({ column }) => (
        <TableHeadSort column={column}>Status</TableHeadSort>
      ),
    });
  }

  return columns;
};

interface UserRootPageProps {
  isBlockedUserPage?: boolean;
}

export function UserRootPage({ isBlockedUserPage }: UserRootPageProps) {
  const [filter, setFilter] = useRecordSearchParams(
    isBlockedUserPage ? { is_blocked: "1" } : undefined,
  );
  React.useState<boolean>(false);

  const { data } = useRecord({
    queryKey: queryKeyFactory.list(filter),
    queryFn: fetchUsers,
  });

  if (!data) {
    return <LoadingFallback />;
  }

  const { data: assets, pagination } = data;

  return (
    <>
      <Header>
        <Title>{isBlockedUserPage ? "Blocked User" : "Management User"}</Title>
        {!isBlockedUserPage && (
          <ButtonLink to="./new">
            <IconPlus /> Tambah User
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
            <div className="flex items-center gap-3">
              <UserRecordFilter />
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
            emptyState="No users available"
            columns={userColumns(
              pagination?.from ?? 1,
              isBlockedUserPage ?? false,
            )}
            data={assets}
          />
        </View>
      </Record>
    </>
  );
}

function UserRecordFilter() {
  const [filter] = useRecordSearchParams();

  return (
    <RecordFilterDialog
      filterKeys={["division_id", "job_position_id", "is_active", "is_blocked"]}
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
            <SelectDivision
              label="Divisi"
              id="division_id"
              defaultValue={filter.division_id?.toString()}
              name="division_id"
              options={[]}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <SelectJobPosition
              label="Jabatan"
              id="job_position_id"
              name="job_position_id"
              defaultValue={filter.job_position_id?.toString()}
              options={[]}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full items-center justify-between">
              <Label>Status</Label>
            </div>
            <RadioGroup
              defaultValue={filter.is_active?.toString()}
              id="is_active"
              name="is_active"
              label=""
            >
              <RadioGroupButton label="Semua" value="" />
              <RadioGroupButton label="Aktif" value="1" />
              <RadioGroupButton label="Non Aktif" value="0" />
            </RadioGroup>
          </div>
        </>
      )}
    </RecordFilterDialog>
  );
}

interface UserItemMenuProps {
  user: User;
  isBlockedUserPage: boolean;
}

interface UserConfirmSetStatusProps {
  userId: number;
  setActive: boolean;
}
export function UserConfirmSetStatus({
  userId,
  setActive,
}: UserConfirmSetStatusProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return (
    <ConfirmRemoval
      variant="warning"
      confirmButtonLabel={setActive ? "Akfikan" : "Nonaktifkan"}
      {...CONFIRM_DIALOG_PROPS[setActive ? "setActive" : "setInactive"]}
      onConfirm={setUserActiveStatus(userId, setActive)}
      onSuccess={() => {
        alertToast.success({
          ...ALERT_TOAST_PROPS[setActive ? "setActive" : "setInactive"],
          onClose: () => {
            navigate("..");
            queryClient
              .invalidateQueries({
                queryKey: queryKeyFactory.all,
              })
              .catch((e) => console.error(e));
          },
        });
      }}
    />
  );
}

interface UserConfirmUnblockProps {
  userId: number;
}
export function UserUnblock({ userId }: UserConfirmUnblockProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return (
    <ConfirmRemoval
      variant="warning"
      confirmButtonLabel="Unblock"
      {...CONFIRM_DIALOG_PROPS.unblock}
      onConfirm={unblockUser(userId)}
      onSuccess={() => {
        alertToast.success({
          ...ALERT_TOAST_PROPS.unblock,
          onClose: () => {
            navigate("..");
            queryClient
              .invalidateQueries({
                queryKey: queryKeyFactory.all,
              })
              .catch((e) => console.error(e));
          },
        });
      }}
    />
  );
}

function UserItemMenu({ user, isBlockedUserPage }: UserItemMenuProps) {
    const { user : authUser } = useAuth();
  return (
    <ConfirmDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild={true}>
          <Button
            type="button"
            variant="ghost"
            color="default"
            aria-label="Item action"
            isSquare={true}
          >
            <IconDotsVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-32" align="end">
          <DropdownMenuItem asChild={true}>
            <Link to={`./${user.id}`}>
              <IconInfoCircle />
              Detail
            </Link>
          </DropdownMenuItem>
          {!isBlockedUserPage ? (
            (!user.is_administrator || authUser?.is_superadmin) && (
              <>
                <DropdownMenuItem asChild={true}>
                  <Link to={`./${user.id}/edit`}>
                    <IconEdit />
                    Ubah
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild={true}>
                  <ConfirmDialogTrigger>
                    <IconTrash /> Hapus
                  </ConfirmDialogTrigger>
                </DropdownMenuItem>
              </>
            )
          ) : (
            <DropdownMenuItem asChild={true}>
              <ConfirmDialogTrigger>
                <IconLockOpen /> Unblock
              </ConfirmDialogTrigger>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {isBlockedUserPage ? (
        <UserUnblock userId={user.id} />
      ) : (
        <UserConfirmRemoval userId={user.id} />
      )}
    </ConfirmDialog>
  );
}
