import { artificialDelay } from "@src/utils";

import { apiClient } from "./api-client";

export function postSignIn(body) {
  return artificialDelay(apiClient.post("/sign-in", body));
}

export function postSignOut() {
  return apiClient.post("/sign-out");
}
