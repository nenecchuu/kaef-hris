import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { ErrorResponse } from "@src/helpers/api-client";
import { Button } from "@src/ui/button";

import { CustomIconWarning } from "../../custom-icon";
import { Alert, useAlert } from "../alert";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../dialog";

/** @typedef {'success'|'danger'|'warning'} ConfirmType */
/**
 * @typedef {Object} ConfirmProps
 * @prop {React.ReactNode} children The button to trigger the confirmation dialog.
 * @prop {ConfirmType} type The type of the confirmation dialog. This will change the color of the icon accordingly.
 * @prop {string} title The title of the confirmation dialog.
 * @prop {string} description The description of the confirmation dialog.
 * @prop {string=} confirmButtonLabel The label of the confirmation button. By default, the label is set to `Confirm`.
 * @prop {import('@tanstack/react-query').MutationFunction} confirmFn A function that performs an asynchronous task and returns a promise.
 * @prop {((data: unknown) => void)=} onSuccess Event handler called when the confirmation is successful and will be passed the confirmation's result
 */
/** @param {ConfirmProps} props */
export function Confirm({
  children,
  type,
  title,
  description,
  confirmButtonLabel = "Confirm",
  confirmFn,
  onSuccess,
}) {
  const { alert, alertProps } = useAlert();
  const triggerRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const mutation = useMutation({
    mutationFn: confirmFn,
    onSuccess: ({ data, message }) => {
      setOpen(false);
      alert.success({
        title: "Success",
        description: message,
        onClose: () => {
          mutation.reset();
        },
        onCloseAutoFocus: () => {
          if (typeof onSuccess === "function") {
            onSuccess(data);
          }

          triggerRef.current.focus();
        },
      });
    },
    onError: (error) => {
      if (error instanceof ErrorResponse) {
        if (error.status !== 422) {
          alert.error({
            title: "Failed",
            description: error.message,
          });
        }
      }
    },
  });

  function handleOpenChange(state) {
    if (!mutation.isPending) {
      setOpen(state);
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger ref={triggerRef} asChild={true}>
          {children}
        </DialogTrigger>
        <DialogContent className="w-100 px-6 py-8 sm:px-8">
          <div className="mb-8 space-y-2">
            <CustomIconWarning className="mx-auto" variant={type} />
            <DialogTitle className="text-center text-2xl font-semibold text-gray-900">
              {title}
            </DialogTitle>
            <DialogDescription className="text-center text-sm text-gray-600">
              {description}
            </DialogDescription>
          </div>
          <div className="flex gap-x-4">
            <DialogClose asChild={true}>
              <Button
                type="button"
                variant="outline"
                color="default"
                className="flex-1"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={mutation.mutate}
              isLoading={mutation.isPending}
              className="flex-1"
            >
              {confirmButtonLabel}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Alert {...alertProps} />
    </>
  );
}
