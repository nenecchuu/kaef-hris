import type { RecordFilter } from "@src/hooks/use-record";
import type { BreadcrumbType } from "@src/ui/breadcrumbs";

export const MODULE_NAME = "user";

export const NEW_PAGE_BREADCRUMBS: BreadcrumbType[] = [
  { label: "User", name: "user", to: ".." },
  { label: "Tambah Data", name: "user_new" },
];

export const DETAILS_PAGE_BREADCRUMBS: BreadcrumbType[] = [
  { label: "User", name: "user", to: ".." },
  { label: "Detail", name: "user_details" },
];

export const EDIT_PAGE_BREADCRUMBS: BreadcrumbType[] = [
  { label: "User", name: "user", to: "../.." },
  { label: "Detail", name: "user_details", to: ".." },
  { label: "Ubah", name: "user_edit" },
];

export const CONFIRM_DIALOG_PROPS = {
  create: {
    title: "Tambah User?",
    description:
      "Anda akan menambah user baru ke dalam sistem. Pastikan data sudah terisi dengan benar.",
  },
  edit: {
    title: "Ubah User?",
    description:
      "Anda akan menyimpan perubahan data user ke dalam sistem. Pastikan data sudah terisi dengan benar.",
  },
  delete: {
    title: "Hapus User?",
    description:
      "Anda akan menghapus user dari dalam sistem. Pastikan kembali sebelum menghapus.",
  },
  setActive: {
    title: "Aktifkan User?",
    description:
      "Anda akan mengaktifkan user, pastikan kembali sebelum melakukan aksi ini.",
  },
  setInactive: {
    title: "Nonaktifkan User?",
    description:
      "Anda akan menonaktifkan user, pastikan kembali sebelum melakukan aksi ini.",
  },
  resetPassword: {
    title: "Reset password?",
    description:
      "Anda akan melakukan reset password user untuk user ini, link reset password akan dikirim lewat email.",
  },
  unbindMFA: {
    title: "Unbind MFA?",
    description:
      "Anda akan melakukan unbind MFA, pastikan kembali sebelum melakukan aksi ini.",
  },
  unblock: {
    title: "Unblock User?",
    description:
      "Anda akan melakukan unblock user, pastikan kembali sebelum melakukan aksi ini.",
  },
};

export const ALERT_TOAST_PROPS = {
  create: {
    title: "Berhasil!",
    description: "User baru berhasil disimpan.",
  },
  edit: {
    title: "Berhasil!",
    description: "Perubahan user berhasil disimpan.",
  },
  delete: {
    title: "Berhasil!",
    description: "User berhasil dihapus.",
  },
  setActive: {
    title: "Berhasil!",
    description: "User berhasil diaktifkan",
  },
  setInactive: {
    title: "Berhasil!",
    description: "User berhasil dinonaktifkan",
  },
  resetPassword: {
    title: "Berhasil!",
    description: "Link reset password sudah dikirim",
  },
  bindMFA: {
    title: "Berhasil!",
    description: "Sudah berhasil bind MFA",
  },
  unbindMFA: {
    title: "Berhasil!",
    description: "Sudah berhasil unbind MFA",
  },
  unblock: {
    title: "Berhasil!",
    description: "User berhasil diunblock",
  },
};

export const queryKeyFactory = {
  all: [{ module: MODULE_NAME }] as const,
  list: (filter: RecordFilter) =>
    [{ ...queryKeyFactory.all[0], type: "list", filter }] as const,
  view: (userId: string) =>
    [{ ...queryKeyFactory.all[0], type: "view", userId }] as const,
};
