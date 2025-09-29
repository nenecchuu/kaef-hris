import * as React from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconChecks,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type Column,
  type ColumnDef,
  type RowData,
} from "@tanstack/react-table";

import { usePagination } from "@src/hooks/use-pagination";
import type { RecordFilter, RecordFilterChangeFn } from "@src/hooks/use-record";
import { cn } from "@src/lib/styling";
import { includes, typedObjectKeys } from "@src/lib/typed-fns";
import { formDataToObject, isNotEmpty } from "@src/lib/utils";
import { Button, ButtonPrimitive } from "@src/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@src/ui/dialog";
import { Field, Label } from "@src/ui/field";
import { Form } from "@src/ui/form";
import { InputGroup, InputSearch } from "@src/ui/input";
import { Select, SelectItem } from "@src/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@src/ui/table";

interface RecordContextProps {
  filter: RecordFilter;
  onFilterChange: RecordFilterChangeFn;
  pagination?: {
    total: number;
    current_page: number;
    last_page: number;
    from: number;
    to: number;
  };
}

const RecordContext = React.createContext<RecordContextProps | undefined>(
  undefined,
);
RecordContext.displayName = "RecordContext";

function useRecordContext(componentName = "Component") {
  const context = React.useContext(RecordContext);

  if (context === undefined) {
    throw new Error(`${componentName} must be used with RecordProvider`);
  }

  return context;
}

interface RecordProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >,
    RecordContextProps {
  toolbar?: React.ReactNode;
  footer?: React.ReactNode;
}

export function Record({
  pagination,
  filter,
  onFilterChange,
  toolbar,
  footer,
  className,
  children,
  ...props
}: RecordProps) {
  return (
    <RecordContext.Provider value={{ pagination, filter, onFilterChange }}>
      <section {...props} className={cn("flex flex-col gap-4", className)}>
        {toolbar && (
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
            {toolbar}
          </div>
        )}
        {children}
        {footer && (
          <div
            className={cn(
              "flex items-center gap-6",
              "[&>[data-slot=info]]:flex-1",
              "[&>[data-slot=pagination]]:flex-1 [&>[data-slot=pagination]]:md:flex-initial",
            )}
          >
            {footer}
          </div>
        )}
      </section>
    </RecordContext.Provider>
  );
}

interface RecordTableProps<TData extends RowData, TValue = unknown> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  emptyState?: React.ReactNode;
}

export function RecordTable<TData extends RowData, TValue = unknown>({
  data,
  columns,
  emptyState,
}: RecordTableProps<TData, TValue>) {
  const { filter, onFilterChange } = useRecordContext("RecordTable");
  const sorting = React.useMemo(() => {
    return filter.sort_order && filter.sort_column
      ? [
          {
            id: filter.sort_column as string,
            desc: (filter.sort_order as string) === "desc",
          },
        ]
      : [];
  }, [filter.sort_column, filter.sort_order]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    state: {
      sorting,
    },
    onSortingChange: (updateOrValue) => {
      if (typeof updateOrValue === "function") {
        const sortedColumn = updateOrValue(sorting)[0];
        if (sortedColumn) {
          onFilterChange({
            ...filter,
            sort_column: sortedColumn?.id,
            sort_order: sortedColumn?.desc ? "desc" : "asc",
          });
        }
      }
    },
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <React.Fragment key={header.id}>
                {header.isPlaceholder ? (
                  <TableHead />
                ) : (
                  flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )
                )}
              </React.Fragment>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody data-empty={data.length === 0 ? "" : undefined}>
        {table.getRowModel().rows.length > 0 ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <React.Fragment key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </React.Fragment>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length}>{emptyState}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

interface TableHeadSortProps<TData extends RowData, TValue = unknown>
  extends React.ComponentPropsWithoutRef<typeof TableHead> {
  column: Column<TData, TValue>;
}

export function TableHeadSort<TData extends RowData, TValue = unknown>({
  column,
  children,
  className,
  ...props
}: TableHeadSortProps<TData, TValue>) {
  return (
    <TableHead {...props}>
      <div
        className={cn("relative isolate flex items-center gap-4", className)}
      >
        <span className="flex-1">{children}</span>
        <ButtonPrimitive
          className={cn("shrink-0 rounded", "[&>[data-slot=icon]]:size-5")}
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          <span aria-hidden={true} className="absolute inset-0" />
          <svg
            data-slot="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M8 9l4 -4l4 4"
              stroke={
                column.getIsSorted() === "asc"
                  ? "hsl(var(--color-icon-primary))"
                  : "hsl(var(--color-icon-secondary))"
              }
            />
            <path
              d="M16 15l-4 4l-4 -4"
              stroke={
                column.getIsSorted() === "desc"
                  ? "hsl(var(--color-icon-primary))"
                  : "hsl(var(--color-icon-secondary))"
              }
            />
          </svg>
        </ButtonPrimitive>
      </div>
    </TableHead>
  );
}

const DEFAULT_LIMIT = "10";

export function LimitSelector() {
  const { filter, onFilterChange } = useRecordContext("LimitSelector");
  const limit = React.useMemo(() => {
    if (isNotEmpty(filter.limit)) {
      return typeof filter.limit === "string" ? filter.limit : DEFAULT_LIMIT;
    }

    return DEFAULT_LIMIT;
  }, [filter.limit]);

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="limit-selector" className="shrink-0">
        Show entries
      </Label>
      <Select
        id="limit-selector"
        value={limit}
        onValueChange={(value) => {
          onFilterChange({ ...filter, limit: value, page: "1" });
        }}
        className="w-20"
      >
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="25">25</SelectItem>

        <SelectItem value="50">50</SelectItem>
        <SelectItem value="100">100</SelectItem>
      </Select>
    </div>
  );
}

interface SearchBoxProps {
  placeholder?: string;
}

export function SearchBox({ placeholder = "Cari..." }: SearchBoxProps) {
  const { filter, onFilterChange } = useRecordContext("SearchBox");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const body = new FormData(e.currentTarget);
    const search = body.get("search");

    onFilterChange({
      ...filter,
      search: typeof search === "string" ? search : "",
      page: "1",
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <Label className="sr-only">Search</Label>
        <InputGroup>
          <IconSearch />
          <InputSearch
            key={`search-${filter.search?.toString()}`}
            name="search"
            defaultValue={filter.search?.toString() ?? ""}
            onClear={() => {
              onFilterChange({ ...filter, search: "", page: "1" });
            }}
            placeholder={placeholder}
          />
        </InputGroup>
      </Field>
    </Form>
  );
}

export function RecordInfo() {
  const { pagination } = useRecordContext("RecordInfo");
  if (!pagination) {
    return null;
  }

  return (
    <p data-slot="info" className="hidden text-sm md:block">
      {pagination.from} - {pagination.to} of {pagination.total} entries
    </p>
  );
}

export function RecordPagination() {
  const { filter, onFilterChange, pagination } =
    useRecordContext("RecordPagination");
  const buttons = usePagination({
    pages: pagination?.last_page ?? 1,
    currentPage: pagination?.current_page ?? 1,
  });

  if (!pagination) {
    return null;
  }

  return (
    <nav data-slot="pagination" className="flex justify-between gap-2">
      <Button
        size="small"
        variant="ghost"
        color="default"
        onClick={() => {
          onFilterChange({
            ...filter,
            page: (pagination.current_page - 1).toString(),
          });
        }}
        disabled={pagination.current_page <= 1}
      >
        <IconArrowNarrowLeft /> Previous
      </Button>
      <ol className="hidden gap-1 md:flex">
        {buttons.map((button, buttonIdx) => {
          if (typeof button === "string") {
            return (
              <li
                key={buttonIdx + 1}
                className="grid size-8 select-none place-items-center"
              >
                {button}
              </li>
            );
          }

          return (
            <li key={buttonIdx + 1}>
              <Button
                size="small"
                variant={
                  button === pagination.current_page ? "primary" : "ghost"
                }
                color={
                  button === pagination.current_page ? "primary" : "default"
                }
                className="min-w-8 truncate disabled:bg-background-primary disabled:text-icon-negative"
                disabled={button === pagination.current_page}
                onClick={() => {
                  onFilterChange({ ...filter, page: button.toString() });
                }}
              >
                {button}
              </Button>
            </li>
          );
        })}
      </ol>
      <Button
        size="small"
        variant="ghost"
        color="default"
        onClick={() => {
          onFilterChange({
            ...filter,
            page: (pagination.current_page + 1).toString(),
          });
        }}
        disabled={pagination.current_page >= pagination.last_page}
      >
        Next <IconArrowNarrowRight />
      </Button>
    </nav>
  );
}

interface RecordFilterDialogProps<TKeys extends string[]> {
  trigger?: React.ReactNode;
  filterKeys: TKeys;
  children?:
    | React.ReactNode
    | (({ filter }: { filter: RecordFilter }) => React.ReactNode);
  onReset?: () => void;
}

export function RecordFilterDialog<TKeys extends string[]>({
  filterKeys,
  trigger,
  onReset,
  children,
}: RecordFilterDialogProps<TKeys>) {
  const { filter, onFilterChange } = useRecordContext("RecordFilterDialog");
  const formId = React.useId();
  const [open, setOpen] = React.useState(false);
  const isFiltered = filterKeys.some((key) =>
    includes(typedObjectKeys(filter), key),
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        data-filtered={isFiltered ? "" : undefined}
        className="[&_.tabler-icon]:data-[filtered]:text-icon-success"
        asChild={true}
      >
        {trigger}
      </DialogTrigger>
      <DialogContent
        className="w-170 divide-y divide-outline-default"
        aria-describedby={undefined}
      >
        <div className="flex items-center gap-6 p-6">
          <DialogTitle className="flex-1 text-xl font-semibold">
            Filter
          </DialogTitle>
          <DialogClose asChild={true}>
            <Button
              type="button"
              variant="ghost"
              color="default"
              isSquare={true}
              className="text-icon-secondary"
            >
              <IconX />
            </Button>
          </DialogClose>
        </div>
        <Form
          id={formId}
          onSubmit={(e) => {
            const formData = new FormData(e.currentTarget);
            const searchParamsObj = formDataToObject(formData);

            onFilterChange({ ...filter, ...searchParamsObj, page: "1" });
            setOpen(false);
          }}
          onReset={() => {
            const newSearchParams = structuredClone(filter);
            filterKeys.forEach((key) => {
              delete newSearchParams[key];
            });
            delete newSearchParams.page; // reset page

            onFilterChange(newSearchParams);
            onReset?.();
            setOpen(false);
          }}
          className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2"
        >
          {typeof children === "function" ? children({ filter }) : children}
        </Form>
        <div className="flex items-center justify-end gap-3 p-6">
          <Button form={formId} type="reset" variant="ghost">
            Reset
          </Button>
          <Button form={formId} type="submit">
            <IconChecks /> Terapkan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
