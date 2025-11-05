import * as React from "react";
import { IconCheck, IconExclamationMark, IconX } from "@tabler/icons-react";
import { tv, type VariantProps } from "tailwind-variants";

import { Button } from "@src/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@src/ui/dialog";

const alertDialogStyle = tv({
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

type AlertDialogVariant = VariantProps<typeof alertDialogStyle>;

const icon = {
  info: IconExclamationMark,
  warning: IconExclamationMark,
  success: IconCheck,
  error: IconX,
};

export interface AlertDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog>,
    AlertDialogVariant {
  title: string;
  description?: React.ReactNode;
  closeButtonLabel?: React.ReactNode;
  onClose?: () => void;
  preventOutsideClose?: boolean;
}

export function AlertDialog({
  title,
  description,
  closeButtonLabel = "Tutup",
  variant = "warning",
  onClose,
  children,
  preventOutsideClose,
  ...props
}: AlertDialogProps) {
  const Icon = icon[variant];

  return (
    <Dialog {...props}>
      <DialogContent
        className="w-100 p-6"
        onInteractOutside={
          preventOutsideClose ? (e) => e.preventDefault() : undefined
        }
        {...(!description && { "aria-describedby": undefined })}
      >
        <div
          className={alertDialogStyle({
            variant,
            className: [
              "mx-auto grid size-14 place-content-center overflow-hidden rounded-full shadow-xl",
            ],
          })}
        >
          <Icon className="size-10 text-icon-negative" />
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
        <DialogClose asChild={true}>
          <Button
            type="button"
            variant="outline"
            color="default"
            className="mt-6 w-full"
            onClick={onClose}
          >
            {closeButtonLabel}
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
