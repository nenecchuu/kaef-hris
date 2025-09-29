import * as React from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { IconCheck, IconMinus } from "@tabler/icons-react";
import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@src/lib/styling";
import { FieldContext } from "@src/ui/field";

const checkboxStyle = tv({
  base: [
    "grid place-items-center self-center border border-outline-default bg-neutral-0 text-neutral-0 outline-none",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400",
    "[&_.tabler-icon:first-child]:data-[state=indeterminate]:hidden [&_.tabler-icon:last-child]:data-[state=checked]:hidden",
    "[&:not([data-disabled]):has([data-state=indeterminate],[data-state=checked])]:border-outline-primary [&:not([data-disabled]):has([data-state=indeterminate],[data-state=checked])]:bg-background-primary",
    "data-[disabled]:data-[state=unchecked]:border-outline-darker data-[disabled]:bg-background-disabled data-[disabled]:text-icon-tertiary",
  ],
  variants: {
    size: {
      small: ["size-4 rounded", "[&_.tabler-icon]:size-3"],
      medium: ["size-5 rounded-md", "[&_.tabler-icon]:size-4"],
      large: ["size-6 rounded-lg", "[&_.tabler-icon]:size-5"],
    },
  },
  defaultVariants: {
    size: "large",
  },
});

type CheckboxVariant = VariantProps<typeof checkboxStyle>;
interface CheckboxProps extends RadixCheckbox.CheckboxProps, CheckboxVariant {}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof RadixCheckbox.Root>,
  CheckboxProps
>(function Checkbox({ id, size, className, ...props }, forwardedRef) {
  const context = React.useContext(FieldContext);

  return (
    <RadixCheckbox.Root
      ref={forwardedRef}
      {...props}
      id={id || context?.id}
      data-slot="control"
      className={checkboxStyle({ size, className })}
    >
      <RadixCheckbox.Indicator>
        <IconCheck />
        <IconMinus />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
});

type CheckboxFieldProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export function CheckboxField({ className, ...props }: CheckboxFieldProps) {
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
          "grid grid-cols-[auto_1fr] gap-x-2",
          "[&>[data-slot=control]]:col-start-1 [&>[data-slot=control]]:row-start-1",
          "[&>[data-slot=label]]:col-start-2 [&>[data-slot=label]]:row-start-1 [&>[data-slot=label]]:self-center [&>[data-slot=label]]:justify-self-start",
          "[&>[data-slot=description]]:col-start-2 [&>[data-slot=description]]:row-start-2 [&>[data-slot=description]]:justify-self-start [&>[data-slot=label]]:self-center",
          className,
        )}
      />
    </FieldContext.Provider>
  );
}

type CheckboxGroupProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export function CheckboxGroup({ className, ...props }: CheckboxGroupProps) {
  return (
    <div
      {...props}
      role="group"
      data-slot="control"
      className={cn("space-y-4", className)}
    />
  );
}
