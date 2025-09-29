import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";

import { ForgotPasswordPage } from "@src/app/auth/pages/forgot-password";
import { ResetPasswordPage } from "@src/app/auth/pages/reset-password";
import { SignInPage } from "@src/app/auth/pages/sign-in";
import { RootFallback } from "@src/components/fallbacks";

export const authRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<RootFallback />}>
      <Route index={true} element={<Navigate to="sign-in" />} />
      <Route path="sign-in" element={<SignInPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
    </Route>,
  ),
  { basename: "/auth" },
);
