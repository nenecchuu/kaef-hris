import * as React from "react";
import clsx from "clsx";
import { NavLink as NavLinkPrimitive } from "react-router-dom";

import { ConditionalRender } from "@src/components/conditional-render";

/** @typedef {Omit<import('react-router-dom').NavLinkProps, 'to'|'className'>} NavLinkPrimitiveProps */
/**
 * @typedef {Object} SiteNavItemCustomProps
 * @prop {string} label The label of site nav item.
 * @prop {any} Icon The icon of site nav item.
 * @prop {number|undefined} badgeCount Determine whether to show badge count.
 * @prop {boolean=} external When `true`, link will act as default HTML `a` tag.
 * @prop {boolean=} disabled When `true`, link will be disabled and not clickable.
 * @prop {string} to The pathname of the navigation.
 */
/** @typedef {NavLinkPrimitiveProps&SiteNavItemCustomProps} SiteNavItemProps */
/** @type {React.ForwardRefExoticComponent<SiteNavItemProps>} */
export const SiteNavItem = React.forwardRef(
  ({ external, disabled, ...props }, forwardedRef) => {
    if (disabled) {
      return <DisabledNavLink {...props} ref={forwardedRef} />;
    }

    const Link = external ? ExternalNavLink : NavLink;

    return <Link {...props} ref={forwardedRef} />;
  },
);
SiteNavItem.displayName = "SiteNavItem";

/** @typedef {Omit<SiteNavItemProps, 'children'|'external'>&React.RefAttributes<HTMLAnchorElement>} NavLinkProps */
/** @type {React.ForwardRefExoticComponent<NavLinkProps>} */
const NavLink = React.forwardRef(function NavLink(
  { label, Icon, badgeCount, ...props },
  forwardedRef,
) {
  return (
    <NavLinkPrimitive
      {...props}
      ref={forwardedRef}
      className={({ isActive }) =>
        clsx(
          "group relative flex w-full items-center gap-x-4 p-4 pl-8 text-sm font-semibold leading-4",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-focus",
          isActive
            ? [
                "bg-brand-primary-light text-icon-base-primary",
                "before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-brand-primary",
              ]
            : "text-gray-900 hover:text-icon-base-primary",
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            className={clsx(
              "h-4 w-4 shrink-0",
              !isActive && "text-gray-500 group-hover:text-icon-base-primary",
            )}
          />
          <span className="min-w-0 flex-1">{label}</span>
          <ConditionalRender show={typeof badgeCount === "number"}>
            <span className="grid h-5 w-9 shrink-0 place-items-center rounded-3xl border border-brand-primary bg-brand-primary-light text-center text-xs text-icon-base-primary">
              {badgeCount < 100 ? badgeCount : "99+"}
            </span>
          </ConditionalRender>
        </>
      )}
    </NavLinkPrimitive>
  );
});

/** @typedef {Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, 'href'|'className'|'children'>} HTMLAnchorElementProps */
/** @typedef {HTMLAnchorElementProps&Omit<SiteNavItemCustomProps, 'external'>} ExternalNavLinkProps */
/** @type {React.ForwardRefExoticComponent<ExternalNavLinkProps>} */
const ExternalNavLink = React.forwardRef(
  ({ label, Icon, badgeCount, to, ...props }, forwardedRef) => (
    <a
      {...props}
      ref={forwardedRef}
      href={to}
      className={clsx(
        "group relative flex w-full items-center gap-x-4 p-4 pl-8 text-sm font-semibold leading-4 text-gray-900 hover:text-icon-base-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-focus",
      )}
    >
      <Icon className="h-4 w-4 shrink-0 text-gray-500 group-hover:text-icon-base-primary" />
      <span className="min-w-0 flex-1 truncate">{label}</span>
      <ConditionalRender show={typeof badgeCount === "number"}>
        <span className="grid h-5 w-9 shrink-0 place-items-center rounded-3xl border border-brand-primary bg-brand-primary-light text-center text-xs text-icon-base-primary">
          {badgeCount < 100 ? badgeCount : "99+"}
        </span>
      </ConditionalRender>
    </a>
  ),
);
ExternalNavLink.displayName = "ExternalNavLink";

/** @typedef {Omit<SiteNavItemCustomProps, 'external'|'disabled'>} DisabledNavLinkProps */
/** @type {React.ForwardRefExoticComponent<DisabledNavLinkProps>} */
const DisabledNavLink = React.forwardRef(
  ({ label, Icon, badgeCount, ...props }, forwardedRef) => (
    <div
      {...props}
      ref={forwardedRef}
      className={clsx(
        "group relative flex w-full items-center gap-x-4 p-4 pl-8 text-sm font-semibold leading-4",
        "cursor-not-allowed text-gray-400",
        "opacity-50",
      )}
    >
      <Icon className="h-4 w-4 shrink-0 text-gray-400" />
      <span className="min-w-0 flex-1">{label}</span>
      <ConditionalRender show={typeof badgeCount === "number"}>
        <span className="grid h-5 w-9 shrink-0 place-items-center rounded-3xl border border-gray-300 bg-gray-100 text-center text-xs text-gray-400">
          {badgeCount < 100 ? badgeCount : "99+"}
        </span>
      </ConditionalRender>
      <span className="rounded-full border border-yellow-200 bg-yellow-100 px-2 py-1 text-xs text-yellow-700">
        Coming Soon
      </span>
    </div>
  ),
);
DisabledNavLink.displayName = "DisabledNavLink";
