import React, { useEffect } from "react";
import { IconLock } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

import { AuthLayout } from "@src/app/auth/auth-layout";
import { postResetPassword } from "@src/app/auth/requests";
import { fetchPasswordComplexity } from "@src/app/password-complexity/requests";
import { LoadingFallback } from "@src/components/fallbacks";
import { useDocumentTitle } from "@src/hooks/use-document-title";
import { useMutation } from "@src/hooks/use-mutation";
import { validatePassword } from "@src/lib/password-complexity";
import { Button } from "@src/ui/button";
import { ErrorMessage, Field, Label } from "@src/ui/field";
import { Form } from "@src/ui/form";
import { InputGroup, InputPassword } from "@src/ui/input";

export function ResetPasswordPage() {
  useDocumentTitle("Sign In");

  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  );
}

function ResetPasswordForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");

  const { errorField, status, submit } = useMutation({
    mutationFn: postResetPassword,
    onSuccess: () => {
      window.location.replace("/");
    },
  });

  React.useEffect(() => {
    if (errorField) setErrors(errorField);
  }, [errorField]);

  useEffect(() => {
    // Parse query parameters
    const queryParams = new URLSearchParams(location.search);
    const tokenParam = queryParams.get("token") || "";
    const emailParam = queryParams.get("email") || "";

    // Redirect to Sign In if token or email is missing
    if (!tokenParam || !emailParam) {
      navigate("/sign-in");
    }

    setToken(tokenParam);
    setEmail(emailParam);
  }, [location, navigate]);

  const [errors, setErrors] = React.useState<Map<string, string>>(
    errorField ?? new Map(),
  );

  const { data: passwordComplexity } = useQuery({
    queryKey: ["fetch-password-complexity"],
    queryFn: fetchPasswordComplexity,
    throwOnError: true,
  });

  if (!passwordComplexity) {
    return <LoadingFallback />;
  }

  const handlePasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const password = e.target.value;
    let newErrors = new Map(errors);
    newErrors = validatePassword(passwordComplexity, password, newErrors);
    setErrors(newErrors);
  };

  const handlePasswordConfirmBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const form = e.currentTarget.form; // Access the form element
    const passwordInput = form?.elements.namedItem(
      "password",
    ) as HTMLInputElement;
    const confirmPassword = e.target.value;
    const password = passwordInput?.value || "";

    const newErrors = new Map(errors);

    if (confirmPassword !== password) {
      newErrors.set("password_confirmation", "Passwords do not match.");
    } else {
      newErrors.delete("password_confirmation");
    }

    setErrors(newErrors);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const body = new FormData(e.currentTarget);
    body.set("email", email);
    body.set("token", token);

    submit(body, e.target);
  }

  return (
    <Form onSubmit={handleSubmit} className="mt-4.5">
      <Field className="mt-4">
        <Label>Password baru</Label>
        <InputGroup>
          <IconLock />
          <InputPassword
            name="password"
            placeholder="Masukan password baru"
            isInvalid={errors?.has("password")}
            onBlur={handlePasswordBlur}
            required={true}
          />
        </InputGroup>
        <ErrorMessage>{errors?.get("password")}</ErrorMessage>
      </Field>
      <Field className="mt-4">
        <Label>Konfirmasi Password Baru</Label>
        <InputGroup>
          <IconLock />
          <InputPassword
            name="password_confirmation"
            placeholder="Masukan ulang password baru anda"
            isInvalid={errors?.has("password_confirmation")}
            required={true}
            onBlur={handlePasswordConfirmBlur}
          />
        </InputGroup>
        <ErrorMessage>{errors?.get("password_confirmation")}</ErrorMessage>
      </Field>
      <Button
        type="submit"
        className="mt-4 w-full"
        isLoading={status === "pending" || status === "success"}
      >
        Reset Password
      </Button>
    </Form>
  );
}
