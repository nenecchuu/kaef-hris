import * as React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import {
  ALERT_TOAST_PROPS,
  queryKeyFactory,
} from "@src/app/password-complexity/config";
import { updatePasswordComplexity } from "@src/app/password-complexity/requests";
import type { PasswordComplexity } from "@src/app/password-complexity/schemas";
import { alertToast } from "@src/ui/alert-toast";
import { Checkbox, CheckboxField } from "@src/ui/checkbox";
import { ErrorMessage, Field, Label } from "@src/ui/field";
import { Input, InputGroup } from "@src/ui/input";
import { MutationForm } from "@src/ui/mutation-form";

interface PasswordComplexityFormProps {
  paswordComplexity?: PasswordComplexity;
}

export function PasswordComplexityForm({
  paswordComplexity,
}: PasswordComplexityFormProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [isMinimumLimitCharacter, setIsMinimumLimitCharacter] = React.useState<
    boolean | undefined
  >(paswordComplexity?.is_minimum_limit_character ?? false);
  const [isPasswordReuseLimit, setIsPasswordReuseLimit] = React.useState<
    boolean | undefined
  >(paswordComplexity?.is_password_reuse_limit ?? false);
  const [useCapitalLetter, setUseCapitalLetter] = React.useState<
    boolean | undefined
  >(paswordComplexity?.use_capital_letter ?? undefined);
  const [useSmallLetter, setUseSmallLetter] = React.useState<
    boolean | undefined
  >(paswordComplexity?.use_small_letter ?? undefined);
  const [useNumber, setUseNumber] = React.useState<boolean | undefined>(
    paswordComplexity?.use_number ?? undefined,
  );
  const [useSymbol, setUseSymbol] = React.useState<boolean | undefined>(
    paswordComplexity?.use_symbol ?? undefined,
  );

  return (
    <MutationForm
      mutationFn={updatePasswordComplexity}
      encType="multipart/form-data"
      className="flex flex-col gap-6"
      mutateBody={(body, buttonId) => {
        console.log({ buttonId });
        if (!body.get("is_minimum_limit_character"))
          body.set("is_minimum_limit_character", "0");
        if (!body.get("is_password_reuse_limit"))
          body.set("is_password_reuse_limit", "0");
        if (!body.get("password_expired_period"))
            body.set("password_expired_period", "0");
        if (!body.get("use_capital_letter"))
          body.set("use_capital_letter", "0");
        if (!body.get("use_small_letter")) body.set("use_small_letter", "0");
        if (!body.get("use_number")) body.set("use_number", "0");
        if (!body.get("use_symbol")) body.set("use_symbol", "0");
        if (buttonId === "saveAndResetPassword")
          body.set("reset_password", "1");
      }}
      onSuccess={async () => {
        await queryClient.invalidateQueries({ queryKey: queryKeyFactory.all });
        alertToast.success({
          ...ALERT_TOAST_PROPS.save,
          onClose: () => {
            navigate("/password-complexity");
          },
        });
      }}
    >
      {({ error }) => (
        <>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <CheckboxField>
              <Checkbox
                name="is_minimum_limit_character"
                checked={isMinimumLimitCharacter}
                value={1}
                onCheckedChange={(checked) =>
                  setIsMinimumLimitCharacter(checked as boolean)
                }
              />
              <Label withAsterisk={true}>Minimum Limit Character</Label>
              <ErrorMessage>
                {error?.get("is_minimum_limit_character")}
              </ErrorMessage>
            </CheckboxField>
            <CheckboxField>
              <Checkbox
                name="is_password_reuse_limit"
                checked={isPasswordReuseLimit}
                value={1}
                onCheckedChange={(checked) =>
                  setIsPasswordReuseLimit(checked as boolean)
                }
              />
              <Label withAsterisk={true}>Password Reuse Limit</Label>
              <ErrorMessage>
                {error?.get("is_password_reuse_limit")}
              </ErrorMessage>
            </CheckboxField>

            {(isMinimumLimitCharacter || isPasswordReuseLimit) && (
              <div className="col-span-full grid grid-cols-1 gap-6 lg:grid-cols-2">
                {isMinimumLimitCharacter ? (
                  <Field>
                    <InputGroup>
                      <Input
                        type="number"
                        name="minimum_limit_character"
                        defaultValue={
                          paswordComplexity?.minimum_limit_character ??
                          undefined
                        }
                        placeholder="Masukkan minimum limit character"
                        isInvalid={error?.has("minimum_limit_character")}
                      />
                    </InputGroup>
                    <ErrorMessage>
                      {error?.get("minimum_limit_character")}
                    </ErrorMessage>
                  </Field>
                ) : (
                  <div />
                )}
                {isPasswordReuseLimit && (
                  <Field>
                    <InputGroup>
                      <Input
                        type="number"
                        name="password_reuse_limit"
                        defaultValue={
                          paswordComplexity?.password_reuse_limit ?? undefined
                        }
                        placeholder="Masukkan password reuse limit"
                        isInvalid={error?.has("password_reuse_limit")}
                      />
                    </InputGroup>
                    <ErrorMessage>
                      {error?.get("password_reuse_limit")}
                    </ErrorMessage>
                  </Field>
                )}
              </div>
            )}

            <CheckboxField>
              <Checkbox
                name="use_capital_letter"
                checked={useCapitalLetter}
                value={1}
                onCheckedChange={(checked) =>
                  setUseCapitalLetter(checked as boolean)
                }
              />
              <Label withAsterisk={true}>Capital Letter (Huruf Besar)</Label>
              <ErrorMessage>{error?.get("capitalLetter")}</ErrorMessage>
            </CheckboxField>
            <CheckboxField>
              <Checkbox
                name="use_small_letter"
                checked={useSmallLetter}
                value={1}
                onCheckedChange={(checked) =>
                  setUseSmallLetter(checked as boolean)
                }
              />
              <Label withAsterisk={true}>Small Letter (Huruf Kecil)</Label>
              <ErrorMessage>{error?.get("use_small_letter")}</ErrorMessage>
            </CheckboxField>

            <CheckboxField>
              <Checkbox
                name="use_number"
                checked={useNumber}
                value={1}
                onCheckedChange={(checked) => setUseNumber(checked as boolean)}
              />
              <Label withAsterisk={true}>Number (Angka)</Label>
              <ErrorMessage>{error?.get("use_number")}</ErrorMessage>
            </CheckboxField>
            <CheckboxField>
              <Checkbox
                name="use_symbol"
                checked={useSymbol}
                value={1}
                onCheckedChange={(checked) => setUseSymbol(checked as boolean)}
              />
              <Label withAsterisk={true}>Symbols (Simbol)</Label>
              <ErrorMessage>{error?.get("use_symbol")}</ErrorMessage>
            </CheckboxField>
            <Field>
                <Label withAsterisk={true}>Password Expired (Months)</Label>
                <InputGroup>
                    <Input
                    type="number"
                    name="password_expired_period"
                    defaultValue={
                        paswordComplexity?.password_expired_period ?? undefined
                    }
                    placeholder="Masukkan Password Expired"
                    isInvalid={error?.has("password_expired_period")}
                    />
                </InputGroup>
                <ErrorMessage>
                    {error?.get("password_expired_period")}
                </ErrorMessage>
            </Field>
          </div>
        </>
      )}
    </MutationForm>
  );
}
