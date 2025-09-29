import * as React from "react";
import type { UseMutationOptions } from "@tanstack/react-query";

import { useMutation } from "@src/hooks/use-mutation";
import type { ErrorResponse } from "@src/lib/http-client";
import { nanoid } from "@src/lib/nanoid";
import { Button, type ButtonProps } from "@src/ui/button";
import {
  ConfirmDialog,
  ConfirmDialogContent,
  ConfirmDialogTrigger,
  type ConfirmDialogContentProps,
} from "@src/ui/confirm-dialog";
import { Form, type FormProps } from "@src/ui/form";

interface MutationFormContextProps {
  id: string;
  confirm: {
    open: boolean;
    onOpenChange: (state: boolean) => void;
  };
  cancel: {
    open: boolean;
    onOpenChange: (state: boolean) => void;
  };
  isConfirming: boolean;
  setIsConfirming: (isConfirming: boolean) => void;
  dialogTitle: string;
  setDialogTitle: (value: string) => void;
  dialogDescription: string;
  setDialogDescription: (value: string) => void;
  confirmSubmitId: string;
  setConfirmSubmitId: (value: string) => void;
}

export const MutationFormContext = React.createContext<
  MutationFormContextProps | undefined
>(undefined);
MutationFormContext.displayName = "MutationFormContext";

interface MutationFormProviderProps {
  children?: React.ReactNode;
}

export function MutationFormProvider(props: MutationFormProviderProps) {
  const id = React.useId();
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [cancelConfirm, setCancelConfirm] = React.useState(false);
  const [isConfirming, setIsConfirming] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState<string>("");
  const [dialogDescription, setDialogDescription] = React.useState<string>("");
  const [confirmSubmitId, setConfirmSubmitId] = React.useState<string>("");

  const value = React.useMemo(
    () => ({
      id,
      confirm: {
        open: openConfirm,
        onOpenChange: setOpenConfirm,
      },
      cancel: { open: cancelConfirm, onOpenChange: setCancelConfirm },
      isConfirming,
      setIsConfirming,
      dialogTitle,
      setDialogTitle,
      dialogDescription,
      setDialogDescription,
      confirmSubmitId,
      setConfirmSubmitId,
    }),
    [
      id,
      openConfirm,
      cancelConfirm,
      isConfirming,
      dialogTitle,
      dialogDescription,
      confirmSubmitId,
    ],
  );

  return <MutationFormContext.Provider {...props} value={value} />;
}

type SubmitTriggerProps = Omit<ButtonProps, "type" | "form" | "isLoading">;
export function SubmitTrigger(props: SubmitTriggerProps) {
  const context = React.useContext(MutationFormContext);

  if (context === undefined) {
    throw new Error("SubmitTrigger must be used within MutationFormProvider");
  }

  const { id, isConfirming } = context;

  return <Button {...props} type="submit" form={id} isLoading={isConfirming} />;
}

interface ConfirmSubmitTriggerProps
  extends Pick<ConfirmDialogContentProps, "title" | "description"> {
  children?: React.ReactNode;
  confirmSubmitId?: string;
}

export function ConfirmSubmitTrigger({
  children,
  title,
  description,
  confirmSubmitId,
  ...props
}: ConfirmSubmitTriggerProps) {
  const context = React.useContext(MutationFormContext);

  if (context === undefined) {
    throw new Error(
      "ConfirmSubmitTrigger must be used within MutationFormProvider",
    );
  }

  const {
    confirm,
    id,
    isConfirming,
    setIsConfirming,
    setDialogTitle,
    setDialogDescription,
    setConfirmSubmitId,
  } = context;

  function handleClick() {
    setDialogTitle(title);
    if (description) setDialogDescription(description);
    if (confirmSubmitId) setConfirmSubmitId(confirmSubmitId);
    confirm.onOpenChange(true);
  }

  return (
    <>
      <ConfirmDialog
        {...confirm}
        isConfirming={isConfirming}
        setIsConfirming={setIsConfirming}
      >
        <ConfirmDialogTrigger asChild={true}>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <span onClick={handleClick}>{children}</span>
        </ConfirmDialogTrigger>
        <ConfirmDialogContent
          {...props}
          title={context.dialogTitle}
          description={context.dialogDescription}
          form={id}
          confirmType="submit"
          cancelButtonLabel="Batal"
          confirmButtonLabel="Simpan"
          confirmSubmitId={context.confirmSubmitId}
        />
      </ConfirmDialog>
    </>
  );
}

type CancelTriggerProps = Omit<ButtonProps, "type" | "form" | "isLoading">;
export function CancelTrigger({ disabled, ...props }: CancelTriggerProps) {
  const context = React.useContext(MutationFormContext);

  if (context === undefined) {
    throw new Error("CancelTrigger must be used within MutationFormProvider");
  }

  const { id, isConfirming } = context;

  return (
    <Button
      {...props}
      type="reset"
      form={id}
      disabled={isConfirming || disabled}
    />
  );
}

interface ConfirmCancelTriggerProps {
  children?: React.ReactNode;
}

export function ConfirmCancelTrigger({
  children,
  ...props
}: ConfirmCancelTriggerProps) {
  const context = React.useContext(MutationFormContext);

  if (context === undefined) {
    throw new Error(
      "ConfirmCancelTrigger must be used within MutationFormProvider",
    );
  }

  const { cancel, id } = context;

  return (
    <ConfirmDialog {...cancel}>
      <ConfirmDialogTrigger asChild={true}>{children}</ConfirmDialogTrigger>
      <ConfirmDialogContent
        {...props}
        form={id}
        title="Batal Ubah Data"
        description="Data yang sudah  diinput tidak akan tersimpan ke dalam sistem."
        confirmType="reset"
        cancelButtonLabel="Batal"
        confirmButtonLabel="Ya, Batalkan"
      />
    </ConfirmDialog>
  );
}

export interface MutationFormProps<TData = unknown, TContext = unknown>
  extends Omit<FormProps, "onSubmit" | "children" | "onError">,
    Pick<
      UseMutationOptions<TData, ErrorResponse, FormData, TContext>,
      "mutationFn" | "onSuccess" | "onError" | "onSettled"
    > {
  mutateBody?: (body: FormData, buttonId?: string) => void;
  children?:
    | React.ReactNode
    | (({ error }: { error: Map<string, string> | null }) => React.ReactNode);
}

function UnforwardedMutationForm<TData = unknown, TContext = unknown>(
  {
    mutationFn,
    mutateBody,
    children,
    onReset,
    onSuccess,
    onError,
    onSettled,
    ...props
  }: MutationFormProps<TData, TContext>,
  forwardedRef: React.ForwardedRef<React.ElementRef<typeof Form>>,
) {
  const context = React.useContext(MutationFormContext);

  if (context === undefined) {
    throw new Error("Mutation must be used within MutationFormProvider");
  }

  const { id, cancel, confirm, setIsConfirming } = context;
  const [formKey, setFormKey] = React.useState(() => nanoid());

  const { submit, errorField } = useMutation({
    mutationFn,
    onMutate: () => {
      setIsConfirming(true);
      return undefined;
    },
    onSuccess,
    onError,
    onSettled: (data, error, variables, context) => {
      onSettled?.(data, error, variables, context);

      setIsConfirming(false);
      confirm.onOpenChange(false);
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const body = new FormData(e.currentTarget);
    const submitter = (e.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement;
    const buttonId = submitter.dataset.id;

    mutateBody?.(body, buttonId);
    submit(body, e.target);
  }

  function handleReset(e: React.FormEvent<HTMLFormElement>) {
    cancel.onOpenChange(false);
    setFormKey(nanoid());
    onReset?.(e);
  }

  return (
    <Form
      key={formKey}
      ref={forwardedRef}
      {...props}
      id={id}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      {typeof children === "function"
        ? children({ error: errorField })
        : children}
    </Form>
  );
}
export const MutationForm = React.forwardRef(UnforwardedMutationForm);
