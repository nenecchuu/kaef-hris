import {
  IconDeviceMobileMessage,
  IconDeviceMobileVibration,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { postUnbindMFA } from "@src/app/auth/requests";
import {
  UserConfirmRemoval,
  UserMasterAccountCard,
  UserPasswordCard,
} from "@src/app/user/main/components";
import {
  ALERT_TOAST_PROPS,
  CONFIRM_DIALOG_PROPS,
  DETAILS_PAGE_BREADCRUMBS,
  queryKeyFactory,
} from "@src/app/user/main/config";
import { useUser } from "@src/app/user/main/hooks";
import { getAllMasterApplications } from "@src/app/user/main/requests";
import { LinkButton } from "@src/components/button";
import { LoadingFallback } from "@src/components/fallbacks";
import { alertToast } from "@src/ui/alert-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@src/ui/avatar";
import { Button, ButtonLink } from "@src/ui/button";
import { Card, CardContent, CardHeader } from "@src/ui/card";
import { Checkbox, CheckboxField } from "@src/ui/checkbox";
import {
  ConfirmDialog,
  ConfirmDialogTrigger,
  ConfirmRemoval,
} from "@src/ui/confirm-dialog";
import {
  DescriptionDetails,
  DescriptionItem,
  DescriptionList,
  DescriptionTerm,
} from "@src/ui/description-list";
import { Label } from "@src/ui/field";
import { Header, Title } from "@src/ui/page";

interface UserDetailsPageProps {
  isPageProfile?: boolean;
}
export function UserDetailsPage({ isPageProfile }: UserDetailsPageProps) {
  const { user } = useUser();
  const breadcrumb = !isPageProfile ? DETAILS_PAGE_BREADCRUMBS : undefined;
  const title = !isPageProfile ? user.name : "Profile";

  const { data } = useQuery({
    queryKey: ["get-all-master-applicatons"],
    queryFn: getAllMasterApplications,
  });

  if (!data) {
    return <LoadingFallback />;
  }

  return (
    <>
      <Header className="flex justify-between" breadcrumbs={breadcrumb}>
        <Title>{title}</Title>
        <div className="flex gap-3">
          {user?.is_use_mfa && user?.is_mfa_enabled && (
            <ConfirmDialog>
              <ConfirmDialogTrigger asChild={true}>
                <Button type="button" variant="secondary" color="error">
                  <IconDeviceMobileVibration /> Unbind with MFA
                </Button>
              </ConfirmDialogTrigger>
              <UserProfileUnbindMFA userId={user.id} />
            </ConfirmDialog>
          )}

          {isPageProfile ? (
            user?.is_use_mfa && !user?.is_mfa_enabled ? (
              <LinkButton
                to="./bind-mfa"
                color="default"
                type="button"
                variant="secondary"
              >
                <IconDeviceMobileMessage /> Bind With MFA
              </LinkButton>
            ) : (
              <></>
            )
          ) : (
            !user?.is_administrator && (
              <ConfirmDialog>
                <ConfirmDialogTrigger asChild={true}>
                  <Button type="button" color="error">
                    <IconTrash /> Hapus
                  </Button>
                </ConfirmDialogTrigger>
                <UserConfirmRemoval userId={user.id} redirect={true} />
              </ConfirmDialog>
            )
          )}

          {(isPageProfile || !user.is_administrator) && (
            <ButtonLink to="./edit" color="warning">
              <IconEdit /> Ubah
            </ButtonLink>
          )}
        </div>
      </Header>
      <Card>
        <CardHeader title="General Info" />
        <CardContent className="flex flex-col gap-6 lg:flex-row">
          <div className="lg:w-44 lg:shrink-0">
            <Avatar size={128} className="mx-auto rounded-full text-5xl">
              <AvatarImage src={user.avatar_path} alt={`${user.name}'s logo`} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <DescriptionList className="flex-1">
            <DescriptionItem>
              <DescriptionTerm>Nama Lengkap</DescriptionTerm>
              <DescriptionDetails>{user.name}</DescriptionDetails>
            </DescriptionItem>
            <DescriptionItem>
              <DescriptionTerm>Email</DescriptionTerm>
              <DescriptionDetails>{user.email}</DescriptionDetails>
            </DescriptionItem>
            <DescriptionItem>
              <DescriptionTerm>Divisi</DescriptionTerm>
              <DescriptionDetails>{user.division?.name}</DescriptionDetails>
            </DescriptionItem>
            <DescriptionItem>
              <DescriptionTerm>Jabatan</DescriptionTerm>
              <DescriptionDetails>{user.job_position?.name}</DescriptionDetails>
            </DescriptionItem>
            <DescriptionItem>
              <DescriptionTerm>TL (Team Lead)</DescriptionTerm>
              <DescriptionDetails>{user.team_lead?.name}</DescriptionDetails>
            </DescriptionItem>
            <DescriptionItem>
              <DescriptionTerm>KADIV (Kepala Divisi)</DescriptionTerm>
              <DescriptionDetails>
                {user.head_division?.name}
              </DescriptionDetails>
            </DescriptionItem>
            <DescriptionItem className="col-span-full">
              <DescriptionTerm className="col-span-full">
                Deskripsi
              </DescriptionTerm>
              <DescriptionDetails>{user.description}</DescriptionDetails>
            </DescriptionItem>
            <CheckboxField className="mt-4">
              <Checkbox
                checked={user?.is_administrator ?? false}
                disabled={true}
              />
              <Label>User ini ditandai sebagai User UMS</Label>
            </CheckboxField>
            <CheckboxField className="mt-4">
              <Checkbox
                checked={user?.is_email_blacklisted ?? false}
                disabled={true}
              />
              <Label>Tandai sebagai Blacklist Email</Label>
            </CheckboxField>
          </DescriptionList>
        </CardContent>
      </Card>

      <UserPasswordCard
        user={user}
        readonly={true}
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        disableResetPasswordButton={isPageProfile || user?.is_administrator!}
      />

      <UserMasterAccountCard
        user={user}
        readonly={true}
        masterApplications={data}
      />
    </>
  );
}

interface UserProfileUnbindMFAProps {
  userId: number;
}

export function UserProfileUnbindMFA({ userId }: UserProfileUnbindMFAProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return (
    <ConfirmRemoval
      variant="warning"
      confirmButtonLabel={"Unbind"}
      {...CONFIRM_DIALOG_PROPS.unbindMFA}
      onConfirm={() => postUnbindMFA(userId)}
      onSuccess={() => {
        alertToast.success({
          ...ALERT_TOAST_PROPS.unbindMFA,
          onClose: () => {
            navigate("/profile");
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
