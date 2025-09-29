import React from "react";
import { IconArrowLeft, IconMail } from "@tabler/icons-react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Link } from "react-router-dom";

import { AuthLayout } from "@src/app/auth/auth-layout";
import { postForgotPassword, postVerifyForgotPasswordMFA } from "@src/app/auth/requests";
import { useDocumentTitle } from "@src/hooks/use-document-title";
import { useMutation } from "@src/hooks/use-mutation";
import { Button, ButtonPrimitive } from "@src/ui/button";
import { ErrorMessage, Field, Label } from "@src/ui/field";
import { Form } from "@src/ui/form";
import { Input, InputGroup } from "@src/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@src/ui/input-otp";

export function ForgotPasswordPage() {
  useDocumentTitle("Forgot Password");

  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}

function ForgotPasswordForm() {
  const [requiresMFA, setRequiresMFA] = React.useState(false);
  const [email, setEmail] = React.useState<string>("");

  const forgotPasswordMutation = useMutation({
    mutationFn: postForgotPassword,
    onSuccess: ({ data }) => {
      /* eslint-disable @typescript-eslint/no-unsafe-member-access */
      if (data?.requires_mfa) {
        setRequiresMFA(true);
        return;
      }
      // Optional: redirect if no MFA is required
      window.location.replace("/");
    },
  });

  const otpMutation = useMutation({
    mutationFn: postVerifyForgotPasswordMFA,
    onSuccess: () => {
      window.location.replace("/");
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const body = new FormData(form);

    // Persist the email from the first form so it can be reused
    const submittedEmail = (body.get("email") as string) ?? "";
    setEmail(submittedEmail);

    forgotPasswordMutation.submit(body, form);
  }

  function handleOtpSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const body = new FormData(form);

    // Attach the previously submitted email
    body.set("email", email);

    otpMutation.submit(body, form);
  }

  return !requiresMFA ? (
    <Form onSubmit={handleSubmit} className="mt-4.5">
      <Field>
        <Label>Email</Label>
        <InputGroup>
          <IconMail />
          <Input
            type="text"
            name="email"
            placeholder="Contoh: user@example.com"
            isInvalid={forgotPasswordMutation.errorField?.has("email")}
            required={true}
            // Keep local state in sync if user edits the email
            onChange={(e) => setEmail(e.currentTarget.value)}
            defaultValue={email}
          />
        </InputGroup>
        <ErrorMessage>
          {forgotPasswordMutation.errorField?.get("email")}
        </ErrorMessage>
      </Field>

      <Button
        type="submit"
        className="mt-4 w-full"
        isLoading={
          forgotPasswordMutation.status === "pending" ||
          forgotPasswordMutation.status === "success"
        }
      >
        Submit Email
      </Button>

      <Link
        to="/sign-in"
        className="items-font-center mt-4 flex justify-center gap-2 font-semibold"
      >
        <IconArrowLeft />
        Kembali
      </Link>
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
        <InputOTP name="otp" maxLength={6} pattern={REGEXP_ONLY_DIGITS as string}>
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
          forgotPasswordMutation.reset();
          otpMutation.reset();
          setRequiresMFA(false);
          // Optional: clear email if you want a fresh start
          // setEmail("");
        }}
      >
        Ganti Akun
      </ButtonPrimitive>
    </Form>
  );
}
