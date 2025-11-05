import type { QueryFunctionContext } from "@tanstack/react-query";
import { z } from "zod";

import type { queryKeyFactory } from "@src/app/user/main/config";
import {
  GenerateMfaSchema,
  SelectOptionListSchema,
  UserEntryRelatedDataSchema,
  UserSchema,
} from "@src/app/user/main/schemas";
import {
  artificialDelay,
  httpClient,
  type SuccessResponse,
  type SuccessResponseWithMetaPagination,
} from "@src/lib/http-client";

export async function fetchUsers({
  signal,
  queryKey: [{ filter }],
}: QueryFunctionContext<ReturnType<(typeof queryKeyFactory)["list"]>>) {
  const { data, ...response } = await httpClient.get<
    never,
    SuccessResponseWithMetaPagination
  >("/users", { signal, params: filter });

  if (!response.meta) {
    return { data: z.array(UserSchema).parse(data) };
  }

  const { pagination } = response.meta;

  return { data: z.array(UserSchema).parse(data), pagination };
}

export async function createUser(body: FormData) {
  const supervisorIds = body.getAll("supervisor_ids[]").map((id) => Number(id));
  body.delete("supervisor_ids[]");

  const payload = Object.fromEntries(body.entries());
  const processedPayload = {
    ...payload,
    supervisor_ids: supervisorIds.length > 0 ? supervisorIds : [],
  };

  const { data } = await artificialDelay(
    httpClient.post<never, SuccessResponse>("/users", processedPayload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  );

  return UserSchema.parse(data);
}

export async function fetchUser({
  signal,
  queryKey: [{ userId }],
}: QueryFunctionContext<ReturnType<(typeof queryKeyFactory)["view"]>>) {
  const { data } = await httpClient.get<never, SuccessResponse>(
    `/users/${userId}`,
    { signal },
  );

  return UserSchema.parse(data);
}

export async function updateUser(body: FormData) {
  body.set("_method", "PUT");

  const userId = body.get("id")! as string;
  body.delete("id");

  const supervisorIds = body.getAll("supervisor_ids[]").map((id) => Number(id));
  body.delete("supervisor_ids[]");

  const payload = Object.fromEntries(body.entries());
  const processedPayload = {
    ...payload,
    supervisor_ids: supervisorIds.length > 0 ? supervisorIds : [],
  };

  const { data } = await artificialDelay(
    httpClient.post<never, SuccessResponse>(
      `/users/${userId}`,
      processedPayload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    ),
  );

  return UserSchema.parse(data);
}

export function deleteUser(userId: number) {
  return () => artificialDelay(httpClient.delete(`/users/${userId}`));
}

export function setUserActiveStatus(userId: number, active: boolean) {
  return () =>
    artificialDelay(
      httpClient.put(`/users/${userId}/set-active/${active ? 1 : 0}`),
    );
}

export async function getUserEntryRelatedData() {
  const { data } = await httpClient.get<never, SuccessResponse>(
    "/users/entry-related-data",
  );

  return UserEntryRelatedDataSchema.parse(data);
}

export async function getAllMasterApplications() {
  const { data } = await httpClient.get<never, SuccessResponse>(
    "/master-applications",
  );

  return SelectOptionListSchema.parse(data);
}

export async function generateMFA() {
  const { data } = await httpClient.get<never, SuccessResponse>(
    "/generate-mfa",
  );

  return GenerateMfaSchema.parse(data);
}

export function unblockUser(userId: number) {
  return () => artificialDelay(httpClient.put(`/users/${userId}/unblock`));
}

export function postForgotPasswordWithUserId(
  userId: number | null | undefined,
) {
  const body = new FormData();
  if (userId) body.set("id", userId.toString());

  return () =>
    artificialDelay(httpClient.postForm("users/forgot-password", body));
}
