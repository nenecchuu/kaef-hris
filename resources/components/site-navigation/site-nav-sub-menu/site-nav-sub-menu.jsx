import * as React from "react";
import { IconChevronDown } from "@tabler/icons-react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

/**
 * @typedef {Object} SiteNavSubMenuProps
 * @prop {string} label The label of site nav sub menu.
 * @prop {any} Icon The icon of site nav sub menu.
 * @prop {boolean=} showBadgeCountIndicator Determine whether to show badge count indicator.
 * @prop {string[]} rootPathnames The pathnames of sub items. This will be used to determine the default open of the sub menu should the one of the sub item is active.
 * @prop {React.ReactNode} children The content of site nav sub menu.
 */
/** @param {SiteNavSubMenuProps} props */
export function SiteNavSubMenu({
  label,
  Icon,
  showBadgeCountIndicator = false,
  rootPathnames = [],
  children,
}) {
  const location = useLocation();
  const [open, setOpen] = React.useState(() =>
    rootPathnames.some((rootPathname) => {
      const isAdminApp = window.location.pathname.startsWith("/admin");

      return window.location.pathname.startsWith(
        isAdminApp ? `/admin${rootPathname}` : rootPathname,
      );
    }),
  );
  const isActive = React.useMemo(
    () =>
      rootPathnames.some((rootPathname) =>
        location.pathname.startsWith(rootPathname),
      ),
    [location.pathname, rootPathnames],
  );

  React.useEffect(() => {
    setOpen(isActive);
  }, [isActive]);

  return (
    <>
      <button
        type="button"
        className={clsx(
          "group relative flex w-full select-none appearance-none items-center gap-x-4 p-4 pl-8 text-sm font-semibold leading-4",
          "focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-focus",
          isActive
            ? [
                "bg-brand-primary-light text-icon-base-primary",
                "before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-brand-primary",
              ]
            : "text-gray-900 hover:text-icon-base-primary",
        )}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <Icon
          className={clsx(
            "h-4 w-4 shrink-0",
            !isActive && "text-gray-500 group-hover:text-icon-base-primary",
          )}
        />
        <span className="min-w-0 flex-1 truncate text-left">{label}</span>
        {showBadgeCountIndicator ? (
          <span className="block h-1.5 w-1.5 rounded-full bg-brand-primary" />
        ) : null}
        <IconChevronDown className="h-4 w-4 shrink-0" />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </>
  );
}
