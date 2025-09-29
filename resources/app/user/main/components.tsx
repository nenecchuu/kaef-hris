import * as React from "react";
import { IconLock } from "@tabler/icons-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import type { z } from "zod";

import { fetchPasswordComplexity } from "@src/app/password-complexity/requests";
import {
  ALERT_TOAST_PROPS,
  CONFIRM_DIALOG_PROPS,
  queryKeyFactory,
} from "@src/app/user/main/config";
import {
  createUser,
  deleteUser,
  fetchUser,
  getUserEntryRelatedData,
  updateUser,
  postForgotPasswordWithUserId,
} from "@src/app/user/main/requests";
import { SelectOptionListSchema } from "@src/app/user/main/schemas";
import type { SelectUserSchema, User } from "@src/app/user/main/schemas";
import { LoadingFallback } from "@src/components/fallbacks";
import { useAuth } from "@src/lib/auth";
import { validatePassword } from "@src/lib/password-complexity";
import { alertToast } from "@src/ui/alert-toast";
import { Button } from "@src/ui/button";
import { Card, CardContent, CardHeader } from "@src/ui/card";
import { Checkbox, CheckboxField } from "@src/ui/checkbox";
import {
  ConfirmDialog,
  ConfirmDialogTrigger,
  ConfirmRemoval,
} from "@src/ui/confirm-dialog";
import { ErrorMessage, Field, Label } from "@src/ui/field";
import { Input, InputAvatar, InputGroup, InputPassword } from "@src/ui/input";
import { MutationForm } from "@src/ui/mutation-form";
import { Select, SelectItem } from "@src/ui/select";
import { Switch } from "@src/ui/switch";
import { Textarea } from "@src/ui/textarea";

interface UserConfirmRemovalProps {
  userId: number;
  redirect?: boolean;
}
export function UserConfirmRemoval({
  userId,
  redirect,
}: UserConfirmRemovalProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return (
    <ConfirmRemoval
      {...CONFIRM_DIALOG_PROPS.delete}
      onConfirm={deleteUser(userId)}
      onSuccess={() => {
        if (!redirect) {
          return queryClient
            .invalidateQueries({
              queryKey: queryKeyFactory.all,
            })
            .then(() => {
              alertToast.success({
                ...ALERT_TOAST_PROPS.delete,
              });
            });
        }

        alertToast.success({
          ...ALERT_TOAST_PROPS.delete,
          onClose: () => {
            navigate("..");
            queryClient
              .invalidateQueries({
                queryKey: queryKeyFactory.all,
              })
              .catch((e) => console.error(e));
          },
        });
      }}
    />
  );
}

export const UserViewContext = React.createContext<{ user: User } | undefined>(
  undefined,
);
UserViewContext.displayName = "UserViewContext";

interface UserViewProps {
  isPageProfile?: boolean;
}
export function UserView({ isPageProfile }: UserViewProps) {
  let { userId } = useParams();
  const auth = useAuth();

  if (isPageProfile) {
    userId = auth.user.id.toString();
  }

  if (!userId) {
    throw new Error("User ID must be provided");
  }

  const { data: user } = useQuery({
    queryKey: queryKeyFactory.view(userId),
    queryFn: fetchUser,
    throwOnError: true,
  });

  if (!user) {
    return <LoadingFallback />;
  }

  return (
    <UserViewContext.Provider value={{ user }}>
      <Outlet />
    </UserViewContext.Provider>
  );
}

interface UserResetPasswordProps {
  id?: number;
}
export function UserResetPassword({ id }: UserResetPasswordProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return (
    <ConfirmRemoval
      variant="warning"
      confirmButtonLabel="Reset Password"
      {...CONFIRM_DIALOG_PROPS.resetPassword}
      onConfirm={postForgotPasswordWithUserId(id)}
      onSuccess={() => {
        alertToast.success({
          ...ALERT_TOAST_PROPS.resetPassword,
          onClose: () => {
            navigate("..");
            queryClient
              .invalidateQueries({
                queryKey: queryKeyFactory.all,
              })
              .catch((e) => console.error(e));
          },
        });
      }}
    />
  );
}

interface UserPasswordCardProps {
  user?: User;
  error?: Map<string, string> | null;
  readonly?: boolean;
  disableResetPasswordButton?: boolean;
  hideIsUseMfa?: boolean;
  disableIsUseMfa?: boolean;
  editPasswordMode?: boolean;
  isUseMFA?: boolean;
  setIsUseMFA?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function UserPasswordCard({
  user,
  error,
  readonly,
  hideIsUseMfa,
  disableIsUseMfa,
  editPasswordMode,
  disableResetPasswordButton,
  isUseMFA,
  setIsUseMFA,
}: UserPasswordCardProps) {
  // Internal state (used only if props are not provided)
  const [internalIsUseMFA, setInternalIsUseMFA] = React.useState<boolean>(
    user?.is_use_mfa ?? false,
  );

  // Determine whether to use internal state or props
  const controlledIsUseMFA = isUseMFA ?? internalIsUseMFA;
  const controlledSetIsUseMFA = setIsUseMFA ?? setInternalIsUseMFA;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <Label className="text-xl font-semibold text-icon-primary">
            Password
          </Label>

          {!hideIsUseMfa && (
            <CheckboxField>
              <Checkbox
                name="is_use_mfa"
                checked={controlledIsUseMFA}
                value={1}
                disabled={readonly || disableIsUseMfa}
                onCheckedChange={(checked) => {
                  controlledSetIsUseMFA(checked as boolean);
                }}
              />
              <Label>Gunakan Fungsi Multi-Factor Authentication</Label>
              <ErrorMessage>{error?.get("is_use_mfa")}</ErrorMessage>
            </CheckboxField>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {editPasswordMode ? (
          <div className="grid w-full flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
            <EditPassword error={error} />
          </div>
        ) : (
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <ConfirmDialog>
              <ConfirmDialogTrigger asChild={true}>
                <Button
                  type="button"
                  variant="secondary"
                  color={disableResetPasswordButton ? "default" : "primary"}
                  disabled={disableResetPasswordButton}
                >
                  <IconLock /> Reset Password
                </Button>
              </ConfirmDialogTrigger>
              <UserResetPassword id={user?.id} />
            </ConfirmDialog>
            <p className="text-sm text-icon-secondary">
              Dengan button ini User akan menerima Email untuk melakukan reset /
              pembaharuan password pada akunnya.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface EditPasswordProps {
  error?: Map<string, string> | null;
}

export function EditPassword({ error }: EditPasswordProps) {
  const [errors, setErrors] = React.useState<Map<string, string>>(
    error ?? new Map(),
  );

  React.useEffect(() => {
    if (error) setErrors(error);
  }, [error]);

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

  return (
    <>
      <Field className="mt-4">
        <Label>Password baru</Label>
        <InputGroup>
          <IconLock />
          <InputPassword
            name="password"
            placeholder="Masukan password baru"
            isInvalid={errors?.has("password")}
            onBlur={handlePasswordBlur}
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
            onBlur={handlePasswordConfirmBlur}
          />
        </InputGroup>
        <ErrorMessage>{errors?.get("password_confirmation")}</ErrorMessage>
      </Field>
    </>
  );
}

interface UserMasterAccountCardProps {
  user?: User;
  masterApplications: typeof SelectOptionListSchema._output;
  readonly?: boolean;
  masterApplicationIdsChange?: (value: number[]) => void;
  error?: Map<string, string> | null;
}

export function UserMasterAccountCard({
  user,
  masterApplications,
  masterApplicationIdsChange,
  readonly,
  error,
}: UserMasterAccountCardProps) {
  const [isOpenMasterAccount, setIsOpenMasterAccount] = React.useState<boolean>(
    user?.is_active ? true : false,
  );
  const [masterApplicationIds, setMasterApplicationsIds] = React.useState<
    number[]
  >(user?.master_application_ids ?? []);

  const onMasterApplicationChange = (
    checked: boolean | string,
    value: number,
  ) => {
    let newValue = [];
    if (checked) newValue = [...masterApplicationIds, value];
    else newValue = masterApplicationIds?.filter((v) => v !== value);

    setMasterApplicationsIds(newValue);

    if (masterApplicationIdsChange) masterApplicationIdsChange(newValue);

    return newValue;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-center gap-2">
          <Switch
            name="is_active_master"
            checked={isOpenMasterAccount}
            onCheckedChange={(value) => setIsOpenMasterAccount(value)}
            disabled={readonly}
          />
          <Label className="text-xl font-semibold text-icon-primary">
            Master Akun
          </Label>
        </div>
        <div>
          <ErrorMessage>{error?.get("master_application_id")}</ErrorMessage>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 lg:flex-row">
        {isOpenMasterAccount && (
          <div className="col-span-full grid w-full flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
            {masterApplications?.map((value, key) => (
              <CheckboxField key={key}>
                <Checkbox
                  onCheckedChange={(checked) => {
                    onMasterApplicationChange(checked, value.id);
                  }}
                  checked={masterApplicationIds?.includes(value.id)}
                  disabled={readonly}
                />
                <Label>{value.name}</Label>
              </CheckboxField>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface UserFormProps {
  user?: User;
  isPageProfile?: boolean;
}

export function UserForm({ user, isPageProfile }: UserFormProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [showTeamLeadField, setShowTeamLeadField] = React.useState<boolean>(
    user ? !(user.is_team_lead || user.is_head_division) : false,
  );

  const [showHeadDivisionField, setShowHeadDivisionField] =
    React.useState<boolean>(user ? !user?.is_head_division : false);

  const [filteredTeamLeads, setFilteredTeamLeads] = React.useState<
    z.infer<typeof SelectUserSchema>
  >([]);

  const [filteredHeadDivisions, setFilteredHeadDivisions] = React.useState<
    z.infer<typeof SelectUserSchema>
  >([]);

  const [isAdministrator, setIsAdministrator] = React.useState<boolean>(
    user?.is_administrator ?? false,
  );

  const [isEmailBlacklisted, setIsEmailBlacklisted] = React.useState<boolean>(
    user?.is_email_blacklisted ?? false,
  );

  const [division, setDivision] = React.useState<number | undefined>(
    user?.division_id ?? undefined,
  );
  const [jobPosition, setJobPosition] = React.useState<number | undefined>(
    user?.job_position_id ?? undefined,
  );
  const [teamLead, setTeamLead] = React.useState<number | undefined>(
    user?.team_lead_id ?? undefined,
  );
  const [headDivision, setHeadDivision] = React.useState<number | undefined>(
    user?.head_division_id ?? undefined,
  );
  const [isUseMFA, setIsUseMFA] = React.useState<boolean>(
    user?.is_use_mfa ?? false,
  );

  const [masterApplicationIds, setMasterApplicationsIds] = React.useState<
    number[]
  >(user?.master_application_ids ?? []);

  function handleDivisionChange(value: string) {
    setFilteredTeamLeads(team_leads.filter((tl) => tl.division_id === value));
    setFilteredHeadDivisions(
      head_divisions.filter((tl) => tl.division_id === value),
    );

    setDivision(Number(value));
  }

  function onJobPositionChange(job_id: number) {
    const selectedJobPosition = job_positions?.find((job) => job.id === job_id);

    if (selectedJobPosition) {
      const enableTLField = !(
        selectedJobPosition.is_team_lead || selectedJobPosition.is_head_division
      );
      const enableHDField = !selectedJobPosition.is_head_division;

      setShowTeamLeadField(enableTLField);
      setShowHeadDivisionField(enableHDField);

      if (!enableHDField) setHeadDivision(undefined);
      if (!enableHDField) setTeamLead(undefined);
    }

    setJobPosition(job_id);
  }

  function onIsAdministratorChange(isAdministrator: boolean) {
    setIsAdministrator(isAdministrator);
    if (isAdministrator) setIsUseMFA(true);
  }

  const { data } = useQuery({
    queryKey: ["entry-related-data"],
    queryFn: getUserEntryRelatedData,
    initialData: {
      divisions: [],
      job_positions: [],
      team_leads: [],
      head_divisions: [],
      master_applications: [],
    },
  });

  const {
    divisions,
    job_positions,
    team_leads,
    head_divisions,
    master_applications,
  } = data;

  const preparePickers = React.useCallback(() => {
    let filteredTLs = division
      ? team_leads.filter((tl) => tl.division_id === division.toString())
      : [...team_leads];
    let filteredHDs = division
      ? head_divisions.filter((hd) => hd.division_id === division.toString())
      : [...head_divisions];

    if (user?.is_team_lead) {
      filteredTLs = filteredTLs.filter((tl) => tl.id !== user.id);
    }

    if (user?.is_head_division) {
      filteredHDs = filteredHDs.filter((hd) => hd.id !== user.id);
    }

    filteredTLs.unshift({ id: 0, name: " ", division_id: "0" });

    setFilteredTeamLeads(filteredTLs);
    setFilteredHeadDivisions(filteredHDs);
  }, [division, team_leads, head_divisions, user]);

  React.useEffect(() => {
    preparePickers();
  }, [preparePickers]);
  return (
    <MutationForm
      mutationFn={user ? updateUser : createUser}
      encType="multipart/form-data"
      className="flex flex-col gap-6"
      mutateBody={(body) => {
        if (user) {
          body.set("id", user.id.toString());
        }
        if (masterApplicationIds) {
          masterApplicationIds.forEach((v, i) => {
            body.append(`master_application_ids[${i}]`, v.toString());
          });
        }

        body.set("is_email_blacklisted", isEmailBlacklisted ? "1" : "0");
        body.set("is_administrator", isAdministrator ? "1" : "0");
        body.set("is_use_mfa", isUseMFA ? "1" : "0");
        body.set("is_active", "1");
        body.set("team_lead_id", teamLead?.toString() || "0");
        body.set("head_division_id", headDivision?.toString() || "0");
        body.set("job_position_id", jobPosition?.toString() || "0");
        body.set("division_id", division?.toString() || "0");
      }}
      onSuccess={async (data) => {
        await queryClient.invalidateQueries({ queryKey: queryKeyFactory.all });
        alertToast.success({
          ...ALERT_TOAST_PROPS[user ? "edit" : "create"],
          onClose: () => {
            navigate(user ? ".." : `../${data.id}`);
          },
        });
      }}
    >
      {({ error }) => (
        <>
          <Card className="w-full">
            <CardHeader title="General Info" />
            <CardContent className="flex flex-col gap-6 lg:flex-row">
              <div className="lg:w-44 lg:shrink-0">
                <InputAvatar
                  name="image"
                  src={user?.avatar_path}
                  className="mx-auto"
                />
                <ErrorMessage>{error?.get("image")}</ErrorMessage>
              </div>
              <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
                <Field>
                  <Label withAsterisk={true}>Nama Lengkap</Label>
                  <InputGroup>
                    <Input
                      type="text"
                      name="name"
                      defaultValue={user?.name}
                      placeholder="Masukkan Nama Lengkap"
                      isInvalid={error?.has("name")}
                    />
                  </InputGroup>
                  <ErrorMessage>{error?.get("name")}</ErrorMessage>
                </Field>
                <Field>
                  <Label withAsterisk={true}>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Masukkan email"
                    disabled={isPageProfile && user?.is_administrator == false}
                    defaultValue={user?.email}
                    isInvalid={error?.has("email")}
                  />
                  {isPageProfile && user?.is_administrator == false && (
                    <Input
                      type="hidden"
                      name="email"
                      defaultValue={user?.email}
                    />
                  )}
                  <ErrorMessage>{error?.get("email")}</ErrorMessage>
                </Field>
                <Field>
                  <Label withAsterisk={true}>Divisi</Label>
                  <Select
                    name="division_id"
                    placeholder="Pilih Divisi"
                    disabled={isPageProfile && !user?.is_administrator}
                    value={division?.toString()}
                    onValueChange={(value) => {
                      handleDivisionChange(value);
                    }}
                    isInvalid={error?.has("division_id")}
                  >
                    {divisions?.map((value, key) => (
                      <SelectItem key={key} value={value.id.toString()}>
                        {value.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <ErrorMessage>{error?.get("division_id")}</ErrorMessage>
                </Field>
                <Field>
                  <Label withAsterisk={true}>Jabatan</Label>
                  <Select
                    name="job_position_id"
                    placeholder="Pilih Jabatan"
                    disabled={isPageProfile && !user?.is_administrator}
                    value={jobPosition?.toString()}
                    onValueChange={(value) => {
                      onJobPositionChange(Number(value));
                    }}
                    isInvalid={error?.has("job_position_id")}
                  >
                    {job_positions?.map((value, key) => (
                      <SelectItem key={key} value={value.id.toString()}>
                        {value.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <ErrorMessage>{error?.get("job_position_id")}</ErrorMessage>
                </Field>
                {showTeamLeadField && (
                  <Field>
                    <Label>TL (Team Lead)</Label>
                    <Select
                      name="team_lead_id"
                      placeholder="Pilih TL"
                      disabled={isPageProfile && !user?.is_administrator}
                      value={teamLead?.toString()}
                      onValueChange={(value) => {
                        setTeamLead(Number(value));
                      }}
                      isInvalid={error?.has("team_lead_id")}
                    >
                      {filteredTeamLeads?.map((value, key) => (
                        <SelectItem key={key} value={value.id.toString()}>
                          {value.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <ErrorMessage>{error?.get("team_lead_id")}</ErrorMessage>
                  </Field>
                )}
                {showHeadDivisionField && (
                  <Field>
                    <Label withAsterisk={true}>KADIV (Kepala Divisi)</Label>
                    <Select
                      name="head_division_id"
                      placeholder="Pilih KADIV"
                      disabled={isPageProfile && !user?.is_administrator}
                      value={headDivision?.toString()}
                      onValueChange={(value) => {
                        setHeadDivision(Number(value));
                      }}
                      isInvalid={error?.has("head_division_id")}
                    >
                      {filteredHeadDivisions?.map((value, key) => (
                        <SelectItem key={key} value={value.id.toString()}>
                          {value.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <ErrorMessage>
                      {error?.get("head_division_id")}
                    </ErrorMessage>
                  </Field>
                )}
                <Field className="col-span-full">
                  <Label>Deksripsi</Label>
                  <Textarea
                    name="description"
                    className="w-full"
                    defaultValue={user?.description ?? ""}
                    placeholder="Isi Deskripsi"
                    isInvalid={error?.has("description")}
                  />
                  <ErrorMessage>{error?.get("description")}</ErrorMessage>
                </Field>
                <CheckboxField>
                  <Checkbox
                    name="is_administrator"
                    checked={isAdministrator}
                    value={1}
                    disabled={isPageProfile && !user?.is_administrator}
                    onCheckedChange={(checked) =>
                      onIsAdministratorChange(checked as boolean)
                    }
                  />
                  <Label>User ini ditandai sebagai User UMS</Label>
                  <ErrorMessage>{error?.get("is_administrator")}</ErrorMessage>
                </CheckboxField>
                <CheckboxField>
                  <Checkbox
                    name="is_email_blacklisted"
                    checked={isEmailBlacklisted}
                    value={1}
                    disabled={isPageProfile && !user?.is_administrator}
                    onCheckedChange={(checked) =>
                      setIsEmailBlacklisted(checked as boolean)
                    }
                  />
                  <Label>Tandai sebagai Blacklist Email</Label>
                  <ErrorMessage>
                    {error?.get("is_email_blacklisted")}
                  </ErrorMessage>
                </CheckboxField>
              </div>
            </CardContent>
          </Card>

          <UserPasswordCard
            user={user}
            error={error}
            disableResetPasswordButton={user ? false : true}
            hideIsUseMfa={isPageProfile}
            disableIsUseMfa={isAdministrator}
            editPasswordMode={isPageProfile}
            isUseMFA={isUseMFA}
            setIsUseMFA={setIsUseMFA}
          />

          <UserMasterAccountCard
            user={user}
            error={error}
            masterApplications={master_applications}
            masterApplicationIdsChange={setMasterApplicationsIds}
            readonly={isPageProfile && !user?.is_administrator}
          />
        </>
      )}
    </MutationForm>
  );
}
