import React from "react";
import { IconLock, IconMail } from "@tabler/icons-react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Link, useNavigate } from "react-router-dom";

import { AuthLayout } from "@src/app/auth/auth-layout";
import { postSignIn, postVerifyLoginMFA } from "@src/app/auth/requests";
import { useDocumentTitle } from "@src/hooks/use-document-title";
import { useMutation } from "@src/hooks/use-mutation";
import { Button, ButtonPrimitive } from "@src/ui/button";
import { ErrorMessage, Field, Label } from "@src/ui/field";
import { Form } from "@src/ui/form";
import { Input, InputGroup, InputPassword } from "@src/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@src/ui/input-otp";

export function SignInPage() {
  useDocumentTitle("Sign In");

  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
}

function SignInForm() {
  const navigate = useNavigate();
  const [requiresMFA, setRequiresMFA] = React.useState(false);
  const signInMutation = useMutation({
    mutationFn: postSignIn,
    onSuccess: ({ data }) => {
      /* eslint-disable @typescript-eslint/no-unsafe-member-access */
      if (data?.requires_mfa) {
        setRequiresMFA(true);
        return;
      }

      if (data?.requires_reset_password) {
        const url = `/reset-password?token=${data?.token}&email=${data?.email}`;
        navigate(url);
        return;
      }

      let intendedUrl = data?.intended;

      if (intendedUrl) {
        try {
          const parsed = new URL(intendedUrl);
          if (parsed.pathname === "/profile/bind-mfa") {
            intendedUrl = "/";
          }
        } catch {
          // Fallback if it's a relative path
          if (intendedUrl === "/profile/bind-mfa") {
            intendedUrl = "/";
          }
        }
        window.location.replace(intendedUrl);
      } else {
        window.location.replace("/");
      }
    },
  });

  const otpMutation = useMutation({
    mutationFn: postVerifyLoginMFA,
    onSuccess: ({ data }) => {
      window.location.replace(data.intended);
    },
  });

  function handleSignInSubmit(e: React.FormEvent<HTMLFormElement>) {
    const body = new FormData(e.currentTarget);

    signInMutation.submit(body, e.target);
  }

  function handleOtpSubmit(e: React.FormEvent<HTMLFormElement>) {
    const body = new FormData(e.currentTarget);

    otpMutation.submit(body, e.target);
  }

  return !requiresMFA ? (
    <Form onSubmit={handleSignInSubmit} className="mt-4.5">
      <Field>
        <Label>Email</Label>
        <InputGroup>
          <IconMail />
          <Input
            type="text"
            name="email"
            placeholder="Contoh: example@mail.com"
            isInvalid={signInMutation.errorField?.has("email")}
            required={true}
          />
        </InputGroup>
        <ErrorMessage>{signInMutation.errorField?.get("email")}</ErrorMessage>
      </Field>
      <Field className="mt-4">
        <Label>Password</Label>
        <InputGroup>
          <IconLock />
          <InputPassword
            name="password"
            placeholder="Masukan password"
            isInvalid={signInMutation.errorField?.has("password")}
            required={true}
          />
        </InputGroup>
        <ErrorMessage>
          {signInMutation.errorField?.get("password")}
        </ErrorMessage>
      </Field>
      <div className="mt-4 flex w-full justify-end text-sm">
        <Link
          to="/forgot-password"
          className="font-semibold text-icon-base-primary"
        >
          Lupa Kata Sandi?
        </Link>
      </div>

      <Button
        type="submit"
        className="mt-12 w-full"
        isLoading={
          signInMutation.status === "pending" ||
          signInMutation.status === "success"
        }
      >
        Masuk
      </Button>
    </Form>
  ) : (
    <Form
      onSubmit={handleOtpSubmit}
      className="mt-4.5 flex flex-col items-center justify-center text-center"
    >
      <Field className="flex flex-col items-center justify-center text-center">
        <Label className="text-xl">OTP Verification</Label>
        <p className="mb-4 text-sm text-gray-600">
          Masukkan OTP yang dikirimkan pada akun Microsoft Authenticator Anda
        </p>
        <InputOTP
          name="otp"
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS as string}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <ErrorMessage>{otpMutation.errorField?.get("otp")}</ErrorMessage>
      </Field>

      <Button
        type="submit"
        className="mt-6 w-full"
        isLoading={
          otpMutation.status === "pending" || otpMutation.status === "success"
        }
      >
        Konfirmasi OTP
      </Button>
      <ButtonPrimitive
        className="mt-4 font-semibold text-icon-base-primary"
        onClick={() => {
          signInMutation.reset();
          otpMutation.reset();
          setRequiresMFA(false);
        }}
      >
        Ganti Akun
      </ButtonPrimitive>
    </Form>
  );
}
