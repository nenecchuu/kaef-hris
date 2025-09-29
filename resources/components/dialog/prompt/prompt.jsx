import * as React from "react";
import clsx from "clsx";

import { Form } from "@src/components/forms";
import { THEME_SIZE_MEDIUM, THEME_SIZE_SMALL } from "@src/constants/theme";
import { ErrorResponse } from "@src/helpers/api-client";
import { useMutationForm } from "@src/hooks/use-mutation-form";
import { Button } from "@src/ui/button";

import { Alert, useAlert } from "../alert";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../dialog";

/** @typedef {import('@src/constants/theme').ThemeSizeType=} PromptSizeType */

const DEFAULT_PROMPT_SIZE = THEME_SIZE_MEDIUM;
const PromptStyle = {
  [THEME_SIZE_MEDIUM]: "w-170",
  [THEME_SIZE_SMALL]: "w-125",
};

const PromptContext = React.createContext(null);
PromptContext.displayName = "PromptContext";

/**
 * @typedef {Object} PromptProps
 * @prop {string} title The title of the prompt.
 * @prop {React.ReactNode} children The content of the prompt.
 * @prop {React.MutableRefObject=} formRef The ref that will be passed to the `form` element.
 * @prop {string=} submitButtonLabel The label of the submit button. By default, the label is set to `Submit`.
 * @prop {import('@tanstack/react-query').MutationFunction} promptFn A function that performs an asynchronous task and returns a promise.
 * @prop {((data: unknown) => void)=} onSuccess Event handler called when the prompt submission is successful and will be passed the prompt's result.
 * @prop {((error: ErrorResponse) => void)=} onError Event handler called when the prompt submission is failed and will be passed the prompt's error response.
 * @prop {PromptSizeType=} size The size of the prompt dialog.
 */
/** @param {PromptProps} props */
export function Prompt({
  children,
  title,
  formRef,
  promptFn,
  onSuccess,
  onError,
  submitButtonLabel = "Submit",
  size = DEFAULT_PROMPT_SIZE,
  ...props
}) {
  const { alert, alertProps } = useAlert();
  const triggerRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  const mutation = useMutationForm({
    mutationFn: promptFn,
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

        if (typeof onError === "function") {
          onError(error);
        }
      }
    },
  });

  function handleOpenChange(state) {
    if (!mutation.isPending) {
      setOpen(state);
      mutation.reset();
    }
  }

  const value = React.useMemo(
    () => ({
      title,
      submitButtonLabel,
      formRef,
      triggerRef,
      mutation,
      size,
    }),
    [formRef, title, submitButtonLabel, mutation, size],
  );

  return (
    <>
      <Dialog {...props} open={open} onOpenChange={handleOpenChange}>
        <PromptContext.Provider value={value}>
          {children}
        </PromptContext.Provider>
      </Dialog>
      <Alert {...alertProps} />
    </>
  );
}

/**
 * @typedef {Object} PromptContentCustomProps
 * @prop {string=} className Style `fieldset` with css classes.
 * @prop {React.ReactNode|((props: { error: {[key:string]: string} }) => React.ReactNode)} children The content of the prompt content, where form fields will be rendered.
 */
/** @typedef {import('../dialog').DialogContentProps} DialogContentProps */
/** @typedef {DialogContentProps&PromptContentCustomProps} PromptContentProps */
/** @param {PromptContentProps} props */
export function PromptContent({ children, className, ...props }) {
  const {
    size,
    title,
    submitButtonLabel,
    mutation,
    formRef: forwardedFormRef,
  } = React.useContext(PromptContext);

  const defaultFormRef = React.useRef(null);
  const formRef = forwardedFormRef || defaultFormRef;

  function handleSubmit(e) {
    const body = new FormData(e.target);
    mutation.mutate(body);
  }

  return (
    <DialogContent
      {...props}
      className={PromptStyle[size]}
      aria-describedby={undefined}
    >
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        className="divide-y divide-brand-separator"
      >
        <div className="p-6 sm:px-8">
          <DialogTitle className="text-2xl font-semibold">{title}</DialogTitle>
        </div>
        <fieldset className={clsx("grid gap-6 p-6 sm:px-8", className)}>
          {typeof children === "function"
            ? children({
                error: mutation.error.field || {},
              })
            : children}
        </fieldset>
        <div className="flex justify-end gap-x-4 p-6 sm:px-8">
          <DialogClose asChild={true}>
            <Button
              type="button"
              variant="ghost"
              color="primary"
              disabled={mutation.isPending}
            >
              Close
            </Button>
          </DialogClose>
          <Button type="submit" isLoading={mutation.isPending}>
            {submitButtonLabel}
          </Button>
        </div>
      </Form>
    </DialogContent>
  );
}

export function PromptTrigger(props) {
  const { triggerRef } = React.useContext(PromptContext);

  return <DialogTrigger {...props} ref={triggerRef} />;
}
