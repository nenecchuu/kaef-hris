import * as React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";

import { cn, focusRing } from "@src/lib/styling";

export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogTitle = RadixDialog.Title;
export const DialogDescription = RadixDialog.Description;
export const DialogClose = RadixDialog.Close;

type DialogContentProps = RadixDialog.DialogContentProps;
export const DialogContent = React.forwardRef<
  React.ElementRef<typeof RadixDialog.DialogContent>,
  DialogContentProps
>(function DialogContent({ className, children, ...props }, forwardedRef) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 grid place-items-center overflow-y-auto bg-neutral-1000/35 outline-none backdrop-blur-sm data-[state=open]:animate-overlay">
        <RadixDialog.Content
          {...props}
          ref={forwardedRef}
          className={cn(
            "my-6 max-w-[90vw] rounded-xl bg-background-subtle outline-none ring-1 ring-outline-lighter data-[state=open]:animate-enter",
            focusRing({ isFocusVisible: true }),
            className,
          )}
        >
          {children}
        </RadixDialog.Content>
      </RadixDialog.Overlay>
    </RadixDialog.Portal>
  );
});
