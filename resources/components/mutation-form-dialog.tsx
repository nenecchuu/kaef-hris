import * as React from "react";
import { IconDeviceFloppy } from "@tabler/icons-react";

import { cn } from "@src/lib/styling";
import { isPlainObject } from "@src/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@src/ui/dialog";
import {
  CancelTrigger,
  MutationForm,
  MutationFormProvider,
  SubmitTrigger,
  type MutationFormProps,
} from "@src/ui/mutation-form";

export const MutationFormDialogTrigger = DialogTrigger;

interface MutationFormDialogContextProps {
  open: boolean;
  onOpenChange: (state: boolean) => void;
}

const MutationFormDialogContext = React.createContext<
  MutationFormDialogContextProps | undefined
>(undefined);
MutationFormDialogContext.displayName = "MutationFormDialogContext";

interface MutationFormDialogProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Dialog>, "onOpenChange"> {
  onOpenChange?: (state: boolean) => void;
}

export function MutationFormDialog({
  open,
  onOpenChange,
  ...props
}: MutationFormDialogProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const value = React.useMemo(() => {
    return {
      open: open ?? dialogOpen,
      onOpenChange: onOpenChange ?? setDialogOpen,
    };
  }, [dialogOpen, onOpenChange, open]);

  return (
    <MutationFormDialogContext.Provider value={value}>
      <Dialog {...props} {...value} />
    </MutationFormDialogContext.Provider>
  );
}

interface MutationFormDialogContentProps<TData = unknown, TContext = unknown>
  extends MutationFormProps<TData, TContext> {
  title: string;
  description?: string;
}

function UnforwardedMutationFormDialogContent<
  TData = unknown,
  TContext = unknown,
>(
  {
    title,
    description,
    className,
    ...props
  }: MutationFormDialogContentProps<TData, TContext>,
  forwardedRef: React.ForwardedRef<React.ElementRef<typeof MutationForm>>,
) {
  const context = React.useContext(MutationFormDialogContext);

  if (context === undefined) {
    throw new Error(
      "MutationFormDialogContet must be used within MutationFormDialog",
    );
  }

  return (
    <MutationFormProvider>
      <DialogContent
        className="w-170 divide-y divide-outline-default"
        {...(!description && { "aria-describedby": undefined })}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
        }}
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <div className="p-6">
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-sm text-icon-secondary">
              {description}
            </DialogDescription>
          )}
        </div>
        <MutationForm
          {...props}
          ref={forwardedRef}
          className={cn("p-6", className)}
          onSettled={(_data, error) => {
            if (error?.status === 422 && isPlainObject(error.error)) {
              return;
            }

            context.onOpenChange(false);
          }}
        />
        <div className="flex justify-end gap-3 p-6">
          <DialogClose asChild={true}>
            <CancelTrigger variant="ghost">Batal</CancelTrigger>
          </DialogClose>
          <SubmitTrigger>
            <IconDeviceFloppy /> Simpan
          </SubmitTrigger>
        </div>
      </DialogContent>
    </MutationFormProvider>
  );
}
export const MutationFormDialogContent = React.forwardRef(
  UnforwardedMutationFormDialogContent,
);
