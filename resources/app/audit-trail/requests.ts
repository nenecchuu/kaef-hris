import type { QueryFunctionContext } from "@tanstack/react-query";
import { format } from "date-fns";
import { z } from "zod";

import type { queryKeyFactory } from "@src/app/audit-trail/config";
import { AuditTrailSchema } from "@src/app/audit-trail/schemas";
import {
  httpClient,
  type SuccessResponseWithMetaPagination,
} from "@src/lib/http-client";
import { arrayBufferResponse, artificialDelay } from "@src/utils";

export async function fetchAuditTrails({
  signal,
  queryKey: [{ filter }],
}: QueryFunctionContext<ReturnType<(typeof queryKeyFactory)["list"]>>) {
  const { data, ...response } = await httpClient.get<
    never,
    SuccessResponseWithMetaPagination
  >("/audit-trails", { signal, params: filter });

  if (!response.meta) {
    return { data: z.array(AuditTrailSchema).parse(data) };
  }

  const { pagination } = response.meta;

  return { data: z.array(AuditTrailSchema).parse(data), pagination };
}

export function downloadAuditTrail({ params }: { params: URLSearchParams }) {
  const filePrefix = "auditTrails";

  return () =>
    artificialDelay(
      httpClient.get(`/audit-trails/export`, {
        params,
        responseType: "arraybuffer",
      }),
    ).then(({ data }) =>
      arrayBufferResponse(
        data,
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        `${filePrefix}_${format(new Date(), "dd_MMMM_yyyy")}.xlsx`,
      ),
    );
}
