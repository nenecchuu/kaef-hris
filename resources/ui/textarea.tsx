import * as React from "react";

import { cn } from "@src/lib/styling";
import { FieldContext } from "@src/ui/field";

interface TextareaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  isInvalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { id, isInvalid, className, rows = 4, ...props },
    forwardedRef,
  ) {
    const context = React.useContext(FieldContext);

    return (
      <div
        data-slot="control"
        className={cn(
          "relative isolate w-full",
          "after:pointer-events-none after:rounded-lg",
          "after:focus-within:absolute after:focus-within:inset-0 after:focus-within:ring-2 after:focus-within:ring-inset after:focus-within:ring-blue-400",
        )}
      >
        <textarea
          ref={forwardedRef}
          {...props}
          id={id || context?.id}
          rows={rows}
          aria-invalid={isInvalid === true ? true : undefined}
          data-invalid={isInvalid === true ? "" : undefined}
          data-disabled={props.disabled === true ? "" : undefined}
          className={cn(
            "block w-full resize-none appearance-none rounded-lg border border-outline-default bg-neutral-0 px-[calc(theme(spacing[4])-1px)] py-[calc(theme(spacing[2.5])-1px)] text-sm placeholder-icon-placeholder outline-none",
            "data-[disabled]:bg-background-disabled data-[disabled]:text-icon-tertiary data-[disabled]:placeholder-transparent",
            "data-[invalid]:border-outline-error",
            className,
          )}
          aria-describedby={
            isInvalid ? context?.errorId : context?.descriptionId
          }
        />
      </div>
    );
  },
);
