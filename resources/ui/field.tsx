import * as React from "react";

import { cn } from "@src/lib/styling";

export const FieldContext = React.createContext<
  { id: string; descriptionId: string; errorId: string } | undefined
>(undefined);
FieldContext.displayName = "FieldContext";

type FieldProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export function Field({ className, ...props }: FieldProps) {
  const id = React.useId();

  return (
    <FieldContext.Provider
      value={{
        id: `control-${id}`,
        descriptionId: `description-${id}`,
        errorId: `error-${id}`,
      }}
    >
      <div
        {...props}
        data-slot="field"
        className={cn(
          "[&>[data-slot=control]+[data-slot=description]]:mt-1.5 [&>[data-slot=error]]:mt-1.5 [&>[data-slot=label]]:mb-1.5",
          className,
        )}
      />
    </FieldContext.Provider>
  );
}

interface LabelProps
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  suffix?: "default" | "optional";
  withAsterisk?: boolean;
}

export function Label({
  suffix,
  htmlFor,
  className,
  children,
  withAsterisk,
  ...props
}: LabelProps) {
  const context = React.useContext(FieldContext);

  return (
    <label
      {...props}
      htmlFor={htmlFor || context?.id}
      data-slot="label"
      className={cn("block select-none text-sm font-semibold", className)}
    >
      {children}{" "}
      {suffix && <span className="text-icon-secondary">(Optional)</span>}
      {withAsterisk && <span className="text-red-500">*</span>}
    </label>
  );
}

type DescriptionProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

export function Description({ id, className, ...props }: DescriptionProps) {
  const context = React.useContext(FieldContext);

  return (
    <p
      {...props}
      id={id || context?.descriptionId}
      data-slot="description"
      className={cn("text-sm text-icon-secondary", className)}
    />
  );
}

type ErrorMessageProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

export function ErrorMessage({ id, className, ...props }: ErrorMessageProps) {
  const context = React.useContext(FieldContext);

  if (!props.children) {
    return null;
  }

  return (
    <p
      {...props}
      id={id || context?.errorId}
      data-slot="error"
      className={cn("text-sm text-icon-error", className)}
    />
  );
}
