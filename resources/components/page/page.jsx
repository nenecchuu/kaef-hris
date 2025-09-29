import * as React from "react";
import { Link } from "react-router-dom";

import { cn } from "@src/lib/styling";
import { fakeIds, truncateMiddle } from "@src/utils";

export function Page({ children }) {
  return children;
}

/**
 * @typedef {Object} BreadcrumbItemType
 * @prop {string} label The label of the breadcrumb item
 * @prop {string=} path The path of the breadcrumb item. Do not set the path if the breadcrumb item is the last item.
 */

/**
 * @typedef {Object} BreadcrumbsProps
 * @prop {BreadcrumbItemType[]} breadcrumbs Array of breadcrumb item.
 */
/** @param {BreadcrumbsProps} prop */
export function Breadcrumbs({ breadcrumbs = [] }) {
  if (breadcrumbs.length === 0) {
    return null;
  }

  /** @type {{id: number, label: string, path?:string}[]} */
  const items = fakeIds(breadcrumbs);

  return (
    <ul className="flex flex-wrap">
      {items.map((item) => (
        <li
          key={item.id}
          className="before:[&:not(:first-child)]:px-1 before:[&:not(:first-child)]:text-xs before:[&:not(:first-child)]:text-gray-600 before:[&:not(:first-child)]:content-['/']"
        >
          {item.path ? (
            <Link
              to={item.path}
              className="text-xs text-gray-600 transition-colors duration-150 ease-in-out hover:text-gray-700"
            >
              {truncateMiddle(item.label, 25)}
            </Link>
          ) : (
            <span className="select-none text-xs font-semibold text-icon-base-primary">
              {truncateMiddle(item.label, 25)}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

/**
 * @typedef {Object} PageHeaderProps
 * @prop {string} title The title of the page
 * @prop {boolean=} setTitleAsDocumentTitle Determine whether the title should be set as document title. By default the title is set as the document title. Set to false if you want a different document title.
 * @prop {string=} className Style page header wrapper with css classes
 * @prop {React.ReactNode=} children The content of the page header, which will be rendered on the right side. Typically used for CTA button groups.
 * @prop {BreadcrumbItemType[]=} breadcrumbs The breadcrumbs of the page.
 */
/** @param {PageHeaderProps} props */
export function PageHeader({
  title,
  className,
  children,
  setTitleAsDocumentTitle = true,
  breadcrumbs,
  ...props
}) {
  React.useEffect(() => {
    if (setTitleAsDocumentTitle) {
      window.document.title = `${title} • ${import.meta.env.VITE_APP_NAME}`;
    }
  }, [setTitleAsDocumentTitle, title]);

  return (
    <div {...props} className={cn(className)}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="flex flex-col gap-x-4 gap-y-2 sm:flex-row sm:items-center">
        <h1 className="flex-1 text-2xl font-semibold">{title}</h1>
        {children && (
          <div className="flex flex-wrap items-center gap-2">{children}</div>
        )}
      </div>
    </div>
  );
}

/**
 * @param {JSX.IntrinsicAttributes & import("react").ClassAttributes<HTMLDivElement> & import("react").HTMLAttributes<HTMLDivElement>} props
 */
export function PageContent({ className, ...props }) {
  return <div className={cn("flex-1", className)} {...props} />;
}
