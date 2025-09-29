import { PasswordComplexitySchema } from "@src/app/password-complexity/schemas";
import {
  artificialDelay,
  httpClient,
  type SuccessResponse,
} from "@src/lib/http-client";

export async function fetchPasswordComplexity() {
  const { data } = await httpClient.get<never, SuccessResponse>(
    "/password-complexity",
  );

  return PasswordComplexitySchema.parse(data);
}

export async function updatePasswordComplexity(body: FormData) {
  body.set("_method", "PUT");

  const payload = Object.fromEntries(body.entries());
  const processedPayload = {
    ...payload,
  };

  const { data } = await artificialDelay(
    httpClient.post<never, SuccessResponse>(
      `/password-complexity`,
      processedPayload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    ),
  );

  return PasswordComplexitySchema.parse(data);
}
