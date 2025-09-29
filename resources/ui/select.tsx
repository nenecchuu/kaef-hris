import * as React from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { IconCheck, IconSelector } from "@tabler/icons-react";

import { cn } from "@src/lib/styling";
import { FieldContext } from "@src/ui/field";

interface SelectProps extends RadixSelect.SelectProps {
  id?: string;
  className?: RadixSelect.SelectTriggerProps["className"];
  placeholder?: RadixSelect.SelectValueProps["placeholder"];
  isInvalid?: boolean;
}

export const Select = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Trigger>,
  SelectProps
>(function Select(
  { id, isInvalid, placeholder, className, children, ...props },
  forwardedRef,
) {
  const context = React.useContext(FieldContext);

  return (
    <RadixSelect.Root {...props}>
      <div
        data-slot="control"
        className={cn(
          "relative isolate w-full",
          "after:pointer-events-none after:rounded-lg",
          "after:focus-within:absolute after:focus-within:inset-0 after:focus-within:ring-2 after:focus-within:ring-inset after:focus-within:ring-blue-400",
        )}
      >
        <RadixSelect.Trigger
          id={id || context?.id}
          ref={forwardedRef}
          aria-invalid={isInvalid === true ? true : undefined}
          data-invalid={isInvalid === true ? "" : undefined}
          className={cn(
            "block h-10 w-full truncate rounded-lg border border-outline-default bg-neutral-0 py-[calc(theme(spacing[2.5])-1px)] pl-[calc(theme(spacing[4])-1px)] pr-[calc(theme(spacing[10])-1px)] text-left text-sm",
            "data-[placeholder]:text-icon-placeholder",
            "data-[disabled]:bg-background-disabled data-[disabled]:text-icon-tertiary data-[placeholder]:data-[disabled]:text-transparent",
            "data-[invalid]:border-outline-error",
            "[&_.tabler-icon]:size-4 [&_.tabler-icon]:text-icon-secondary",
            className,
          )}
          aria-describedby={
            isInvalid ? context?.errorId : context?.descriptionId
          }
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon className="absolute right-[calc(theme(spacing.4)-1px)] top-1/2 -translate-y-1/2">
            <IconSelector />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
      </div>
      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          sideOffset={4}
          className="z-50 max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)] rounded-lg bg-background-subtle shadow-md outline-none ring-1 ring-outline-lighter"
        >
          <RadixSelect.Viewport className="grid grid-cols-[theme(spacing.8)_1fr] p-1">
            {children}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
});

type SelectItemProps = RadixSelect.SelectItemProps;

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Item>,
  SelectItemProps
>(function SelectItem({ className, children, ...props }, forwardedRef) {
  return (
    <RadixSelect.Item
      {...props}
      ref={forwardedRef}
      className={cn(
        "col-span-full grid cursor-default select-none grid-cols-subgrid rounded-md px-3.5 py-1.5 text-sm outline-none",
        "data-[highlighted]:bg-background-light-primary data-[highlighted]:text-icon-base-primary",
        "data-[state=checked]:data-[highlighted]:text-icon-base-primary data-[state=checked]:text-icon-base-primary",
        "data-[disabled]:text-icon-secondary",
        "[&>[data-slot=icon]>.tabler-icon]:size-4 [&>[data-slot=icon]]:-ml-0.5 [&>[data-slot=icon]]:self-center",
        "[&>[data-slot=label]]:col-start-2 [&>[data-slot=label]]:self-center [&>[data-slot=label]]:truncate",
        className,
      )}
    >
      <RadixSelect.ItemIndicator data-slot="icon">
        <IconCheck />
      </RadixSelect.ItemIndicator>
      <RadixSelect.ItemText data-slot="label">{children}</RadixSelect.ItemText>
    </RadixSelect.Item>
  );
});

type SelectGroupProps = RadixSelect.SelectGroupProps;

export function SelectGroup({ className, ...props }: SelectGroupProps) {
  return (
    <>
      <RadixSelect.Group
        {...props}
        className={cn("col-span-full grid grid-cols-subgrid", className)}
      />
      <SelectSeparator />
    </>
  );
}

type SelectLabelProps = RadixSelect.SelectLabelProps;

export function SelectLabel({ className, ...props }: SelectLabelProps) {
  return (
    <RadixSelect.Label
      {...props}
      className={cn(
        "col-span-full select-none px-3.5 py-1.5 text-xs font-medium text-icon-secondary",
        className,
      )}
    />
  );
}

type SelectSeparatorProps = RadixSelect.SelectSeparatorProps;

export function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <RadixSelect.Separator
      {...props}
      className={cn(
        "col-span-full mx-3.5 my-1.5 h-px bg-outline-default last:hidden",
        className,
      )}
    />
  );
}
