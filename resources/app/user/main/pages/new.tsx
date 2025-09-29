import { IconDeviceFloppy } from "@tabler/icons-react";

import { UserForm } from "@src/app/user/main/components";
import {
  CONFIRM_DIALOG_PROPS,
  NEW_PAGE_BREADCRUMBS,
} from "@src/app/user/main/config";
import { Button } from "@src/ui/button";
import {
  ConfirmSubmitTrigger,
  MutationFormProvider,
} from "@src/ui/mutation-form";
import { Header, Title } from "@src/ui/page";

export function UserNewPage() {
  return (
    <>
      <MutationFormProvider>
        <Header
          className="flex justify-between"
          breadcrumbs={NEW_PAGE_BREADCRUMBS}
        >
          <Title>Tambah User Baru</Title>

          <ConfirmSubmitTrigger {...CONFIRM_DIALOG_PROPS.create}>
            <Button>
              <IconDeviceFloppy /> Simpan
            </Button>
          </ConfirmSubmitTrigger>
        </Header>

        <UserForm />
      </MutationFormProvider>
    </>
  );
}
