import * as React from "react";
import * as Cmdk from "cmdk";

import { cn } from "@src/lib/styling";

export const CommandEmpty = Cmdk.CommandEmpty;
export const CommandGroup = Cmdk.CommandGroup;
export const CommandItem = Cmdk.CommandList;
export const CommandSeparator = Cmdk.CommandSeparator;
export const CommandLoading = Cmdk.CommandLoading;

type CommandProps = React.ComponentPropsWithoutRef<typeof Cmdk.Command>;
export function Command({ className, ...props }: CommandProps) {
  return (
    <Cmdk.Command
      {...props}
      className={cn(
        "[&:has([cmdk-input])>[cmdk-list]]:border-t [&:has([cmdk-input])>[cmdk-list]]:border-outline-default",
        className,
      )}
    />
  );
}

type CommandInputProps = React.ComponentPropsWithoutRef<
  typeof Cmdk.CommandInput
>;
export const CommandInput = React.forwardRef<
  React.ElementRef<typeof Cmdk.CommandInput>,
  CommandInputProps
>(function CommandInput({ className, ...props }, forwardedRef) {
  return (
    <Cmdk.CommandInput
      {...props}
      ref={forwardedRef}
      className={cn(
        "block w-full appearance-none px-[calc(theme(spacing[4])-1px)] py-[calc(theme(spacing[2.5])-1px)] text-sm placeholder-icon-placeholder outline-none",
        className,
      )}
    />
  );
});

type CommandListProps = React.ComponentPropsWithoutRef<typeof Cmdk.CommandList>;
export function CommandList({ className, ...props }: CommandListProps) {
  return (
    <Cmdk.CommandList
      {...props}
      className={cn(
        "[&_[cmdk-empty]]:col-span-full [&_[cmdk-empty]]:px-3.5 [&_[cmdk-empty]]:py-1.5 [&_[cmdk-empty]]:text-center [&_[cmdk-empty]]:text-sm",
        className,
      )}
    />
  );
}
