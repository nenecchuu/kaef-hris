import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import clsx from "clsx";
import { Link, useSearchParams } from "react-router-dom";

import { usePagination } from "@src/hooks/use-pagination";

/**
 * @typedef  {Object} PaginationProps
 * @prop {number} pages The number of available pages.
 * @prop {number} currentPage The current page displayed.
 */

/** @param {PaginationProps} props */
export function Pagination({ pages, currentPage }) {
  const [searchParams] = useSearchParams();
  const buttons = usePagination({ pages, currentPage });

  function getSearchParams(page) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page);

    return newSearchParams;
  }

  if (pages < 1) {
    return null;
  }

  return (
    <nav aria-label="Pagination" className="flex items-center gap-x-1">
      <StaticLink
        rel="prev"
        to={getSearchParams(currentPage - 1)}
        isDisabled={currentPage === 1}
      >
        <IconChevronLeft />
        Previous
      </StaticLink>
      {buttons.map((button, idx) => (
        <DynamicLink
          key={`${button}-${idx + 1}`}
          to={getSearchParams(button)}
          isDisabled={button === currentPage}
        >
          {button}
        </DynamicLink>
      ))}
      <StaticLink
        rel="next"
        to={getSearchParams(currentPage + 1)}
        isDisabled={currentPage === pages}
      >
        Next
        <IconChevronRight />
      </StaticLink>
    </nav>
  );
}

const staticLinkClasses = [
  "inline-flex gap-x-1 rounded-lg py-2 px-3 text-sm",
  "[&>svg]:h-4 [&>svg]:w-4 [&>svg]:self-center",
];

function StaticLink({
  isDisabled,
  hideOnMobile = false,
  to,
  children,
  ...props
}) {
  if (isDisabled) {
    return (
      <span
        className={clsx(staticLinkClasses, "cursor-default text-gray-600", {
          "hidden xl:inline-flex": hideOnMobile,
        })}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      {...props}
      to={`?${to}`}
      className={clsx(
        staticLinkClasses,
        "text-gray-900",
        "hover:ring-2 hover:ring-inset hover:ring-gray-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-focus",
        {
          "hidden xl:inline-flex": hideOnMobile,
        },
      )}
    >
      {children}
    </Link>
  );
}

const dynamicLinkClasses = [
  "hidden lg:grid h-9 min-w-[36px] place-items-center rounded-lg text-sm",
];

function DynamicLink({ to, children, isDisabled, ...props }) {
  if (children === "...") {
    return <span className={clsx(dynamicLinkClasses)}>...</span>;
  }

  if (isDisabled) {
    return (
      <span
        className={clsx(
          dynamicLinkClasses,
          "cursor-pointer bg-background-primary font-semibold text-neutral-0",
        )}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      {...props}
      to={`?${to}`}
      className={clsx(
        dynamicLinkClasses,
        "hover:ring-2 hover:ring-inset hover:ring-gray-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-focus",
      )}
    >
      {children}
    </Link>
  );
}
