import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { cn } from "@src/lib/styling";

type TableProps = React.DetailedHTMLProps<
  React.TableHTMLAttributes<HTMLTableElement>,
  HTMLTableElement
>;

export function Table({ className, ...props }: TableProps) {
  return (
    <div className="flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <table
            {...props}
            className={cn("min-w-full text-left text-sm", className)}
          />
        </div>
      </div>
    </div>
  );
}

type TableHeaderProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>;

export function TableHeader(props: TableHeaderProps) {
  return <thead {...props} />;
}

type TableHeadProps = React.DetailedHTMLProps<
  React.ThHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>;

export function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <th
      {...props}
      className={cn(
        "border-b border-outline-default p-4 font-semibold",
        "data-[slot=no]:w-13",
        className,
      )}
    />
  );
}

interface TableHeadVisuallyHiddenProps {
  children?: React.ReactNode;
}
export function TableHeadVisuallyHidden({
  children,
}: TableHeadVisuallyHiddenProps) {
  return (
    <TableHead data-slot="action" className="data-[slot=action]:w-10">
      <div className="relative">
        <VisuallyHidden.Root>{children}</VisuallyHidden.Root>
      </div>
    </TableHead>
  );
}

type TableRowProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
>;

export function TableRow(props: TableRowProps) {
  return <tr {...props} />;
}

type TableBodyProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>;

export function TableBody({ className, ...props }: TableBodyProps) {
  return (
    <tbody
      {...props}
      className={cn(
        "divide-y divide-outline-default [&>tr:hover]:bg-background-light-primary [&>tr>td]:data-[empty]:text-center",
        className,
      )}
    />
  );
}

type TableCellProps = React.DetailedHTMLProps<
  React.TdHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>;

export function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      {...props}
      className={cn(
        "p-4",
        "select-none data-[numeric]:whitespace-nowrap data-[numeric]:tabular-nums",
        className,
      )}
    />
  );
}
