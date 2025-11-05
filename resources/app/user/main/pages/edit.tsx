import { IconDeviceFloppy } from "@tabler/icons-react";
import { Navigate } from "react-router-dom";

import { UserForm } from "@src/app/user/main/components";
import {
  CONFIRM_DIALOG_PROPS,
  EDIT_PAGE_BREADCRUMBS,
} from "@src/app/user/main/config";
import { useUser } from "@src/app/user/main/hooks";
import { useAuth } from "@src/lib/auth";
import { Button } from "@src/ui/button";
import {
  ConfirmSubmitTrigger,
  MutationFormProvider,
} from "@src/ui/mutation-form";
import { Header, Title } from "@src/ui/page";

interface UserEditPageProps {
  isPageProfile?: boolean;
}

export function UserEditPage({ isPageProfile }: UserEditPageProps) {
  const { user } = useUser();
  const { user: authUser } = useAuth();
  const breadcrumb = !isPageProfile ? EDIT_PAGE_BREADCRUMBS : undefined;
  const title = !isPageProfile ? user.name : "Profile";
  if (user.is_administrator && !isPageProfile && !authUser.is_superadmin) {
    return <Navigate to="/users" />;
  }

  return (
    <>
      <MutationFormProvider>
        <Header className="flex justify-between" breadcrumbs={breadcrumb}>
          <Title>{title}</Title>

          <ConfirmSubmitTrigger {...CONFIRM_DIALOG_PROPS.edit}>
            <Button>
              <IconDeviceFloppy /> Simpan
            </Button>
          </ConfirmSubmitTrigger>
        </Header>

        <UserForm user={user} isPageProfile={isPageProfile} />
      </MutationFormProvider>
    </>
  );
}
