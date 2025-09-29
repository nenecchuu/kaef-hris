import * as React from "react";
import { IconExclamationMark } from "@tabler/icons-react";
import type { MutationFunction } from "@tanstack/react-query";
import { tv, type VariantProps } from "tailwind-variants";

import { useMutation } from "@src/hooks/use-mutation";
import type { ErrorResponse } from "@src/lib/http-client";
import { Button } from "@src/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@src/ui/dialog";

interface ConfirmDialogContextProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isConfirming: boolean;
  setIsConfirming: (isConfirming: boolean) => void;
}

const ConfirmDialogContext = React.createContext<
  ConfirmDialogContextProps | undefined
>(undefined);
ConfirmDialogContext.displayName = "ConfirmDialogContext";

function useConfirmDialogContext(componentName = "Component") {
  const context = React.useContext(ConfirmDialogContext);

  if (context === undefined) {
    throw new Error(`${componentName} must be used with ConfirmDialogProvider`);
  }

  return context;
}

export const ConfirmDialogTrigger = DialogTrigger;

interface ConfirmDialogProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Dialog>, "onOpenChange"> {
  onOpenChange?: (open: boolean) => void;
  isConfirming?: boolean;
  setIsConfirming?: (isConfirming: boolean) => void;
}

export function ConfirmDialog({
  isConfirming: isConfirmingExt,
  setIsConfirming: setIsConfirmingExt,
  ...props
}: ConfirmDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [isConfirming, setIsConfirming] = React.useState(false);
  const { open: state, onOpenChange: onStateChange } = props;

  const value = React.useMemo(() => {
    return {
      open: state ?? open,
      onOpenChange: onStateChange ?? setOpen,
      isConfirming: isConfirmingExt ?? isConfirming,
      setIsConfirming: setIsConfirmingExt ?? setIsConfirming,
    };
  }, [
    isConfirming,
    isConfirmingExt,
    onStateChange,
    open,
    setIsConfirmingExt,
    state,
  ]);

  return (
    <ConfirmDialogContext.Provider value={value}>
      <Dialog open={value.open} onOpenChange={value.onOpenChange} {...props} />
    </ConfirmDialogContext.Provider>
  );
}

const confirmDialogContentStyle = tv({
  base: [],
  variants: {
    variant: {
      info: ["bg-background-info shadow-background-info/35"],
      warning: ["bg-background-warning shadow-background-warning/35"],
      success: ["bg-background-success shadow-background-success/35"],
      error: ["bg-background-error shadow-background-error/35"],
    },
  },
  defaultVariants: {
    variant: "warning",
  },
});

type ConfirmDialogContentVariant = VariantProps<
  typeof confirmDialogContentStyle
>;

export interface ConfirmDialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogContent>,
    ConfirmDialogContentVariant {
  title: string;
  description?: string;
  cancelButtonLabel?: React.ReactNode;
  confirmSubmitId?: string;
  confirmButtonLabel?: React.ReactNode;
  confirmType?: "button" | "submit" | "reset";
  form?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export const ConfirmDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogContent>,
  ConfirmDialogContentProps
>(function ConfirmDialogContent(
  {
    title,
    description,
    confirmButtonLabel = "Confirm",
    cancelButtonLabel = "Cancel",
    onCancel,
    onConfirm,
    confirmType = "button",
    form,
    variant,
    children,
    confirmSubmitId,
    ...props
  },
  forwardedRef,
) {
  const { isConfirming } = useConfirmDialogContext("ConfirmDialogContent");

  return (
    <DialogContent
      {...props}
      ref={forwardedRef}
      className="w-100 p-6"
      onEscapeKeyDown={(e) => {
        e.preventDefault();
      }}
      onPointerDownOutside={(e) => {
        e.preventDefault();
      }}
      onInteractOutside={(e) => {
        e.preventDefault();
      }}
      {...(!description && { "aria-describedby": undefined })}
    >
      <div
        className={confirmDialogContentStyle({
          variant,
          className: [
            "mx-auto grid size-14 place-content-center overflow-hidden rounded-full shadow-xl",
          ],
        })}
      >
        <IconExclamationMark className="size-10 text-icon-negative" />
      </div>
      <DialogTitle className="mt-4 text-center text-xl font-semibold">
        {title}
      </DialogTitle>
      {description && (
        <DialogDescription className="mt-1 text-center text-sm text-icon-secondary">
          {description}
        </DialogDescription>
      )}
      {children}
      <div className="mt-6 flex items-center gap-3">
        <DialogClose asChild={true}>
          <Button
            type="button"
            variant="outline"
            color="default"
            className="flex-1"
            onClick={onCancel}
            disabled={isConfirming}
          >
            {cancelButtonLabel}
          </Button>
        </DialogClose>
        <Button
          form={confirmType !== "button" && form ? form : undefined}
          type={confirmType}
          color={variant === "warning" ? "primary" : variant}
          className="flex-1"
          onClick={onConfirm}
          isLoading={isConfirming}
          data-id={confirmSubmitId}
        >
          {confirmButtonLabel}
        </Button>
      </div>
    </DialogContent>
  );
});

interface ConfirmRemovalProps
  extends Pick<
    ConfirmDialogContentProps,
    "title" | "description" | "onCancel"
  > {
  onConfirm?: MutationFunction<unknown, void>;
  onSuccess?:
    | ((data: unknown, variables: void, context: void) => unknown)
    | undefined;
  onError?:
    | ((
        error: ErrorResponse,
        variables: void,
        context: void | undefined,
      ) => unknown)
    | undefined;
  onSettled?:
    | ((
        data: unknown,
        error: ErrorResponse | null,
        variables: void,
        context: void | undefined,
      ) => unknown)
    | undefined;
  variant?: "warning" | "info" | "success" | "error" | undefined;
  confirmButtonLabel?: string;
}
export function ConfirmRemoval({
  onConfirm,
  onSuccess,
  onError,
  onSettled,
  variant,
  confirmButtonLabel,
  ...props
}: ConfirmRemovalProps) {
  const { onOpenChange, setIsConfirming } =
    useConfirmDialogContext("ConfirmRemoval");

  const { mutate } = useMutation({
    mutationFn: onConfirm,
    onMutate: () => {
      setIsConfirming(true);
    },
    onSuccess,
    onError,
    onSettled: (data, error, variables, context) => {
      onSettled?.(data, error, variables, context);

      setIsConfirming(false);
      onOpenChange(false);
    },
  });

  return (
    <ConfirmDialogContent
      {...props}
      variant={variant || "error"}
      confirmType="button"
      confirmButtonLabel={confirmButtonLabel || "Hapus"}
      cancelButtonLabel="Batal"
      onConfirm={mutate}
    />
  );
}
