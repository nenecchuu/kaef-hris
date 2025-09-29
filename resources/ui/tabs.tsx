import * as RadixTabs from "@radix-ui/react-tabs";

import { cn } from "@src/lib/styling";

export const Tabs = RadixTabs.Root;
export const TabsContent = RadixTabs.Content;

type TabsListProps = RadixTabs.TabsListProps;

export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <RadixTabs.List
      {...props}
      className={cn("flex gap-1", "data-[orientation=horizontal]", className)}
    />
  );
}

type TabProps = RadixTabs.TabsTriggerProps;

export function Tab({ className, ...props }: TabProps) {
  return (
    <RadixTabs.Trigger
      {...props}
      className={cn(
        "relative isolate p-3 text-sm font-semibold",
        "data-[state=active]:text-icon-base-primary",
        "data-[state=inactive]:text-icon-secondary data-[state=inactive]:enabled:hover:text-icon-tertiary",
        "data-[state=inactive]:data-[disabled]:text-icon-placeholder",
        "data-[state=active]:data-[disabled]:text-icon-tertiary",
        "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:data-[state=active]:bg-background-primary after:data-[state=active]:data-[disabled]:bg-icon-tertiary",
        className,
      )}
    />
  );
}
