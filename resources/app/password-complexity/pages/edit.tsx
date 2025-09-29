import { IconDeviceFloppy, IconKey } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";

import { PasswordComplexityForm } from "@src/app/password-complexity/components";
import { CONFIRM_DIALOG_PROPS } from "@src/app/password-complexity/config";
import { fetchPasswordComplexity } from "@src/app/password-complexity/requests";
import { LoadingFallback } from "@src/components/fallbacks";
import { Button } from "@src/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@src/ui/card";
import {
  ConfirmSubmitTrigger,
  MutationFormProvider,
} from "@src/ui/mutation-form";
import { Header, Title } from "@src/ui/page";

export function PasswordComplexityEditPage() {
  const { data: passwordComplexity } = useQuery({
    queryKey: ["fetch-password-complexity"],
    queryFn: fetchPasswordComplexity,
    throwOnError: true,
  });

  if (!passwordComplexity) {
    return <LoadingFallback />;
  }

  return (
    <>
      <Header>
        <Title>Password Complexity Setup</Title>
      </Header>
      <MutationFormProvider>
        <Card>
          <CardHeader title="Complexity Properties" />
          <CardContent>
            <PasswordComplexityForm paswordComplexity={passwordComplexity} />
          </CardContent>
          <CardFooter className="flex justify-end gap-3">
            <ConfirmSubmitTrigger
              {...CONFIRM_DIALOG_PROPS.save}
              confirmSubmitId="save"
            >
              <Button color="info" variant="secondary">
                <IconDeviceFloppy /> Simpan
              </Button>
            </ConfirmSubmitTrigger>
            <ConfirmSubmitTrigger
              {...CONFIRM_DIALOG_PROPS.saveAndResetPassword}
              confirmSubmitId="saveAndResetPassword"
            >
              <Button>
                <IconKey /> Simpan & Reset Password User
              </Button>
            </ConfirmSubmitTrigger>
          </CardFooter>
        </Card>
      </MutationFormProvider>
    </>
  );
}
