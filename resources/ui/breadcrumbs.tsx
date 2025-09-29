import { IconChevronRight } from "@tabler/icons-react";
import { Link, type To } from "react-router-dom";
import { tv } from "tailwind-variants";

import { cn } from "@src/lib/styling";

export interface BreadcrumbType {
  name: string;
  label: string;
  to?: string;
}

type BreadcrumbsProps = React.DetailedHTMLProps<
  React.OlHTMLAttributes<HTMLOListElement>,
  HTMLOListElement
>;

export function Breadcrumbs({ className, ...props }: BreadcrumbsProps) {
  return (
    <nav>
      <ol
        {...props}
        className={cn("flex flex-wrap items-center gap-1.5", className)}
      >
        {/*  */}
      </ol>
    </nav>
  );
}

const breadcrumbStyle = tv({
  base: "flex items-center gap-1.5 text-sm font-medium",
});

interface BreadcrumbProps {
  to?: To;
  children?: string;
}

export function Breadcrumb({ to, children }: BreadcrumbProps) {
  if (to) {
    return (
      <li
        className={breadcrumbStyle({
          className: [
            "text-icon-secondary",
            "[&>.tabler-icon]:size-4 [&>.tabler-icon]:shrink-0 [&>.tabler-icon]:text-icon-placeholder",
          ],
        })}
      >
        <Link to={to}>{children}</Link>
        <IconChevronRight />
      </li>
    );
  }

  return (
    <li className={breadcrumbStyle({ className: "text-icon-base-primary" })}>
      {children}
    </li>
  );
}
