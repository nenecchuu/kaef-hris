import * as React from "react";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";

import { cn } from "@src/lib/styling";

export const DropdownMenu = RadixDropdownMenu.Root;
export const DropdownMenuTrigger = RadixDropdownMenu.Trigger;

type DropdownMenuContentProps = RadixDropdownMenu.DropdownMenuContentProps;

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof RadixDropdownMenu.Content>,
  DropdownMenuContentProps
>(function DropdownMenuContent(
  { className, sideOffset = 4, collisionPadding = 16, ...props },
  forwardedRef,
) {
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content
        {...props}
        ref={forwardedRef}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn(
          "z-50 grid min-w-48 grid-cols-[auto_1fr] rounded-lg bg-background-subtle p-1 shadow-md outline-none ring-1 ring-outline-lighter",
          className,
        )}
      />
    </RadixDropdownMenu.Portal>
  );
});

type DropdownMenuItemProps = RadixDropdownMenu.DropdownMenuItemProps;

export function DropdownMenuItem({
  className,
  ...props
}: DropdownMenuItemProps) {
  return (
    <RadixDropdownMenu.Item
      {...props}
      className={cn(
        "col-span-full grid cursor-default select-none grid-cols-subgrid gap-x-2 rounded-md px-3.5 py-1.5 text-left text-sm",
        "outline-none data-[highlighted]:bg-background-light-primary data-[highlighted]:text-icon-base-primary",
        "data-[disabled]:text-icon-secondary",
        "[&>.tabler-icon]:-ml-0.5 [&>.tabler-icon]:size-5 [&>.tabler-icon]:self-center",
        className,
      )}
    />
  );
}

type DropdownMenuLabelProps = RadixDropdownMenu.DropdownMenuLabelProps;

export function DropdownMenuLabel({
  className,
  ...props
}: DropdownMenuLabelProps) {
  return (
    <RadixDropdownMenu.Label
      {...props}
      className={cn("col-start-2 self-center", className)}
    />
  );
}

type DropdownMenuSeparatorProps = RadixDropdownMenu.DropdownMenuSeparatorProps;

export function DropdownMenuSeparator({
  className,
  ...props
}: DropdownMenuSeparatorProps) {
  return (
    <RadixDropdownMenu.Separator
      {...props}
      className={cn(
        "col-span-full -mx-1 my-1 h-px bg-outline-default",
        className,
      )}
    />
  );
}
