import * as React from "react";

import { cn } from "@src/lib/styling";

type ViewProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;
export function View({ className, ...props }: ViewProps) {
  return (
    <section
      {...props}
      className={cn(
        "flex-none overflow-hidden rounded-2xl bg-background-subtle shadow-md outline-none ring-1 ring-outline-lighter",
        className,
      )}
    />
  );
}
