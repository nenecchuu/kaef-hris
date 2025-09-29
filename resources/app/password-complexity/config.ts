import type { RecordFilter } from "@src/hooks/use-record";

export const MODULE_NAME = "pasword-complexity";

export const CONFIRM_DIALOG_PROPS = {
  save: {
    title: "Simpan Pengaturan?",
    description:
      "Pastikan kembali sebelum menyimpan, User baru & User yang akan mengganti Password akan mengikuti setup terbaru ini.",
  },
  saveAndResetPassword: {
    title: "Simpan & Reset Password User?",
    description:
      "User akan mendapatkan email untuk melakukan registrasi password dengan ketentuan terbaru, pastikan kembali sebelum melakukan aksi ini.",
  },
};

export const ALERT_TOAST_PROPS = {
  save: {
    title: "Berhasil!",
    description: "Pengaturan Berhasil Disimpan.",
  },
  saveAndResetPassword: {
    title: "Berhasil!",
    description: "Pengaturan Berhasil Disimpan.",
  },
};

export const queryKeyFactory = {
  all: [{ module: MODULE_NAME }] as const,
  list: (filter: RecordFilter) =>
    [{ ...queryKeyFactory.all[0], type: "list", filter }] as const,
  view: (userId: string) =>
    [{ ...queryKeyFactory.all[0], type: "view", userId }] as const,
};
