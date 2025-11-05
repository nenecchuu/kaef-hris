import { artificialDelay, httpClient } from "@src/lib/http-client";

export function postSignIn(body: FormData) {
  return artificialDelay(httpClient.postForm("/sign-in", body));
}

export function postForgotPassword(body: FormData) {
  return artificialDelay(httpClient.postForm("/forgot-password", body));
}

export function postResetPassword(body: FormData) {
  return artificialDelay(httpClient.postForm("/reset-password", body));
}

export function postVerifyMFA(body: FormData) {
  return artificialDelay(httpClient.postForm("/verify-mfa", body));
}

export function postUnbindMFA(userId: number) {
  return artificialDelay(httpClient.postForm(`/unbind-mfa/${userId}`));
}

export function postVerifyLoginMFA(body: FormData) {
  return artificialDelay(httpClient.postForm("/verify-login-mfa", body));
}

export function postVerifyForgotPasswordMFA(body: FormData) {
  return artificialDelay(
    httpClient.postForm("/verify-forgot-password-mfa", body),
  );
}
