import clsx from "clsx";
import { Link, useSearchParams } from "react-router-dom";

import { LimitOptions } from "../limit-options";

/** @typedef {React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>} HTMLTableElementProps */
/** @typedef {HTMLTableElementProps} DataTableProps */
/** @param {DataTableProps} props */
export function DataTable({ children, ...props }) {
  return (
    <div className="-mx-4 overflow-x-auto md:-mx-6 xl:-mx-8">
      <div className="inline-block min-w-full px-4 pb-3 align-middle md:px-6 xl:px-8">
        <div className="min-w-full rounded-lg border border-neutral-1000/5 bg-neutral-0 shadow-sm">
          <table
            {...props}
            className="w-full min-w-[474px] table-auto border-collapse divide-y-2 divide-brand-separator [&_tbody]:divide-y-2 [&_tbody]:divide-brand-separator"
          >
            {children}
          </table>
        </div>
      </div>
    </div>
  );
}

/** @typedef {React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>} NativeThProps */
/** @typedef {NativeThProps} ThProps */
/** @param {ThProps} props */
export function Th({ children, className = "", ...props }) {
  return (
    <th
      {...props}
      className={clsx(
        "p-4 text-left text-sm font-semibold text-gray-900",
        className,
      )}
    >
      {children}
    </th>
  );
}

const SortOrderLookUp = {
  asc: "desc",
  desc: "asc",
};

/**
 * @typedef {Object} ThSortCustomType
 * @prop {string} name The name of the column that will be sorted.
 * @prop {string=} wrapperClassName Style the `ThSort` wrapper with css classes.
 */
/** @typedef {NativeThProps&ThSortCustomType} ThSortProps */
/** @param {ThSortProps} props */
export function ThSort({
  name,
  children,
  className = "",
  wrapperClassName = "",
  ...props
}) {
  const [searchParams] = useSearchParams();
  const sortOrder = searchParams.get("sort_order");
  const isSorted = searchParams.get("sort_column") === name;

  function getSearchParams() {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set("sort_column", name);
    newSearchParams.set(
      "sort_order",
      !sortOrder ? "asc" : SortOrderLookUp[sortOrder],
    );

    return newSearchParams;
  }

  return (
    <th className={wrapperClassName} {...props}>
      <Link
        to={`?${getSearchParams()}`}
        className={clsx(
          "flex items-center justify-between gap-x-2 p-4 text-left text-sm font-semibold text-gray-900",
          className,
        )}
      >
        {children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 shrink-0"
          viewBox="0 0 24 24"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <polyline
            points="8 9 12 5 16 9"
            stroke={
              isSorted && sortOrder === "asc"
                ? "hsl(var(--color-icon-primary))"
                : "hsl(var(--color-icon-secondary))"
            }
          />
          <polyline
            points="16 15 12 19 8 15"
            stroke={
              isSorted && sortOrder === "desc"
                ? "hsl(var(--color-icon-primary))"
                : "hsl(var(--color-icon-secondary))"
            }
          />
        </svg>
      </Link>
    </th>
  );
}

/** @typedef {React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>} NativeTdProps */
/** @typedef {NativeTdProps} TdProps */
/** @param {TdProps} props */
export function Td({ className = "", children, ...props }) {
  return (
    <td
      {...props}
      className={clsx("px-4 py-3 text-sm text-gray-900", className)}
    >
      {children}
    </td>
  );
}

export function DataTableHeader(props) {
  return (
    <div className="flex flex-col gap-x-4 gap-y-2 sm:flex-row sm:items-center">
      <LimitOptions />
      <div className="flex flex-1 gap-x-1.5 sm:justify-end" {...props} />
    </div>
  );
}

export function DataTableFooter(props) {
  return (
    <div
      {...props}
      className="flex flex-col items-center gap-0.5 sm:flex-row sm:justify-between"
    />
  );
}
