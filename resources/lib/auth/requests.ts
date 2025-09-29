import { AuthenticatedUserSchema } from "@src/lib/auth/schema";
import { httpClient, type SuccessResponse } from "@src/lib/http-client";

export const queryKeyFactory = {
  authenticatedUser: ["authenticatedUser"],
};

export async function fetchAuthenticatedUser() {
  const { data } = await httpClient.get<never, SuccessResponse>("/user");
  return AuthenticatedUserSchema.parse(data);
}

export function postSignOut() {
  return httpClient.postForm("/sign-out");
}
