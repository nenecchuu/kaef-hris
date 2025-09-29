import * as React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { NavLink as NavLinkPrimitive } from "react-router-dom";

import { ConditionalRender } from "@src/components/conditional-render";

/** @typedef {Omit<import('../site-nav-item').NavLinkPrimitiveProps, 'children'>} NavLinkPrimitiveProps */
/**
 * @typedef {Object} SiteNavSubItemCustomProps
 * @prop {string} label The label of site nav item
 * @prop {number|undefined} badgeCount Determine whether to show badge count
 * @prop {boolean=} external When `true`, link will act as default HTML `a` tag.
 * @prop {boolean=} disabled When `true`, link will be disabled and not clickable.
 * @prop {string} to The pathname of the navigation.
 */
/** @typedef {NavLinkPrimitiveProps&SiteNavSubItemCustomProps} SiteNavSubItemProps */
/** @type {React.ForwardRefExoticComponent<SiteNavSubItemProps>} */
export const SiteNavSubItem = React.forwardRef(function SiteNavSubItem(
  { label, badgeCount, external, disabled, ...props },
  forwardedRef,
) {
  let Link;
  if (disabled) {
    Link = DisabledNavLink;
  } else if (external) {
    Link = ExternalNavLink;
  } else {
    Link = NavLink;
  }

  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="ml-10"
    >
      <Link {...props} ref={forwardedRef}>
        <span className="min-w-0 flex-1 truncate">{label}</span>
        <ConditionalRender show={typeof badgeCount === "number"}>
          <span
            className={clsx(
              "grid h-5 w-9 shrink-0 place-items-center rounded-3xl border text-center text-xs",
              disabled
                ? "border-gray-300 bg-gray-100 text-gray-400"
                : "border-brand-primary bg-brand-primary-light text-icon-base-primary",
            )}
          >
            {badgeCount < 100 ? badgeCount : "99+"}
          </span>
        </ConditionalRender>
      </Link>
    </motion.li>
  );
});

/** @typedef {Omit<SiteNavSubItemProps, 'label'|'badgeCount'|'external'>&React.RefAttributes<HTMLAnchorElement>&{children?:React.ReactNode}} NavLinkProps */
/** @type {React.ForwardRefExoticComponent<NavLinkProps>} */
const NavLink = React.forwardRef(function NavLink(props, forwardedRef) {
  return (
    <NavLinkPrimitive
      {...props}
      ref={forwardedRef}
      className={({ isActive }) =>
        clsx(
          "relative flex w-full items-center gap-x-4 p-4 pl-6 text-sm font-semibold leading-4",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-focus",
          "before:absolute before:inset-y-0 before:left-0 before:w-0.5",
          isActive
            ? "text-icon-base-primary before:bg-brand-primary"
            : "text-gray-900 before:bg-gray-500 hover:text-icon-base-primary",
        )
      }
    />
  );
});

/** @typedef {{to: string, children: React.ReactNode}} ExternalNavLinkCustomProps */
/** @typedef {Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, 'href'|'className'|'children'>} HTMLAnchorElementProps */
/** @typedef {HTMLAnchorElementProps&Omit<SiteNavSubItemProps, 'label'|'badgeCount'|'external'>&ExternalNavLinkCustomProps} ExternalNavLinkProps */
/** @type {React.ForwardRefExoticComponent<ExternalNavLinkProps>} */
const ExternalNavLink = React.forwardRef(({ to, ...props }, forwardedRef) => (
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  <a
    {...props}
    ref={forwardedRef}
    href={to}
    className={clsx(
      "relative flex w-full items-center gap-x-4 p-4 pl-6 text-sm font-semibold leading-4 text-gray-900 before:bg-gray-500 hover:text-icon-base-primary",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-focus",
      "before:absolute before:inset-y-0 before:left-0 before:w-0.5",
    )}
  />
));
ExternalNavLink.displayName = "ExternalNavLink";

/** @typedef {{children: React.ReactNode}} DisabledNavLinkCustomProps */
/** @typedef {Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'className'|'children'>&DisabledNavLinkCustomProps} DisabledNavLinkProps */
/** @type {React.ForwardRefExoticComponent<DisabledNavLinkProps>} */
const DisabledNavLink = React.forwardRef(({ ...props }, forwardedRef) => (
  <div
    {...props}
    ref={forwardedRef}
    className={clsx(
      "relative flex w-full cursor-not-allowed items-center gap-x-4 p-4 pl-6 text-sm font-semibold leading-4 text-gray-400 opacity-50 before:bg-gray-300",
      "before:absolute before:inset-y-0 before:left-0 before:w-0.5",
    )}
  />
));
DisabledNavLink.displayName = "DisabledNavLink";
