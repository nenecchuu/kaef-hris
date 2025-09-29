import clsx from "clsx";

import { BadgeStyle, DEFAULT_BADGE_SIZE } from "./badge.constants";

/**
 * @typedef {Object} BadgeProps
 * @prop {import('./badge.constants').BadgeSizeType=} size The size of the badge.
 * @prop {import('./badge.constants').BadgeVariantType} variant The variant of the badge.
 * @prop {React.ReactNode} children The content of the badge
 */
/** @param {BadgeProps} props */
export function Badge({
  size = DEFAULT_BADGE_SIZE,
  variant,
  children,
  ...props
}) {
  return (
    <span
      {...props}
      className={clsx(
        "inline-block rounded-2.5xl font-semibold",
        BadgeStyle[size][variant],
      )}
    >
      {children}
    </span>
  );
}
