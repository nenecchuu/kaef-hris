import type { RecordFilter } from "@src/hooks/use-record";

export const MODULE_NAME = "audit_trail";

export const queryKeyFactory = {
  all: [{ module: MODULE_NAME }] as const,
  list: (filter: RecordFilter) =>
    [{ ...queryKeyFactory.all[0], type: "list", filter }] as const,
};
