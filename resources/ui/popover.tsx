import * as React from "react";
import * as RadixPopover from "@radix-ui/react-popover";

import { cn } from "@src/lib/styling";

export const Popover = RadixPopover.Root;
export const PopoverTrigger = RadixPopover.Trigger;
export const PopoverArrow = RadixPopover.Arrow;
export const PopoverAnchor = RadixPopover.Anchor;

type PopoverContentProps = RadixPopover.PopoverContentProps;
export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof RadixPopover.Content>,
  PopoverContentProps
>(function PopoverContent(
  { children, sideOffset = 4, collisionPadding = 16, className, ...props },
  forwardedRef,
) {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        {...props}
        ref={forwardedRef}
        className={cn(
          "z-50 grid max-h-[var(--radix-popover-content-available-height)] w-[var(--radix-popover-trigger-width)] overflow-hidden overflow-y-auto rounded-lg bg-background-subtle p-1 shadow-md outline-none ring-1 ring-outline-lighter",
          className,
        )}
      >
        {children}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  );
});
