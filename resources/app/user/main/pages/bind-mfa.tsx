import { IconArrowLeft } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";

import { postVerifyMFA } from "@src/app/auth/requests";
import { ALERT_TOAST_PROPS } from "@src/app/user/main/config";
import { useUser } from "@src/app/user/main/hooks";
import { generateMFA } from "@src/app/user/main/requests";
import { LinkButton } from "@src/components/button";
import { LoadingFallback } from "@src/components/fallbacks";
import { alertToast } from "@src/ui/alert-toast";
import { Button } from "@src/ui/button";
import { Card, CardContent, CardHeader } from "@src/ui/card";
import { ErrorMessage, Field, Label } from "@src/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@src/ui/input-otp";
import { MutationForm, MutationFormProvider } from "@src/ui/mutation-form";
import { Header, Title } from "@src/ui/page";

export function UserBindMfaPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const userId = user.id;

  const { data } = useQuery({
    queryKey: ["generate-mfa"],
    queryFn: generateMFA,
  });

  if (!data) {
    return <LoadingFallback />;
  }

  if (!user) {
    return <LoadingFallback />;
  }

  return (
    <>
      <Header className="flex justify-between">
        <Title>Bind MFA</Title>
        <LinkButton to=".." color="default" variant="secondary">
          <IconArrowLeft />
          Kembali
        </LinkButton>
      </Header>
      <MutationFormProvider>
        <MutationForm
          mutationFn={postVerifyMFA}
          encType="multipart/form-data"
          className="flex flex-col gap-6"
          //   mutateBody={(body) => {}}
          onSuccess={() => {
            alertToast.success({
              ...ALERT_TOAST_PROPS.bindMFA,
              onClose: () => {
                navigate(user ? ".." : `../${userId}`);
              },
            });
          }}
        >
          {({ error }) => (
            <>
              <Card>
                <CardHeader title="Scan QR" />
                <CardContent className="flex flex-col items-center justify-center gap-6">
                  <QRCode value={data.url} size={256} />

                  <Field className="flex flex-col items-center justify-center text-center">
                    <Label className="text-xl">OTP Verification</Label>
                    <p className="mb-4 text-sm text-gray-600">
                      Masukkan OTP yang dikirimkan pada akun Microsoft
                      Authenticator Anda
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
                    <ErrorMessage>{error?.get("otp")}</ErrorMessage>
                  </Field>
                  <Button type="submit" className="mt-6 w-1/2">
                    Bind MFA
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </MutationForm>
      </MutationFormProvider>
    </>
  );
}
