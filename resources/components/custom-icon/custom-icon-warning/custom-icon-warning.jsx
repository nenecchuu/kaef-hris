import clsx from "clsx";

import { THEME_VARIANT_WARNING } from "@src/constants/theme";

import {
  CustomIconStyle,
  DEFAULT_CUSTOM_ICON_SIZE,
} from "../custom-icon.constants";

/**
 * @typedef {Object} CustomIconWarningProps
 * @prop {string=} className Style the icon with custom classes.
 * @prop {import('../custom-icon.constants').CustomIconVariantType=} variant The variant of the custom icon.
 * @prop {import('../custom-icon.constants').CustomIconSizeType=} size The size of the custom icon.
 */
/** @param {CustomIconWarningProps} props */
export function CustomIconWarning({
  className,
  size = DEFAULT_CUSTOM_ICON_SIZE,
  variant = THEME_VARIANT_WARNING,
}) {
  return (
    <div
      className={clsx(
        "grid place-items-center overflow-hidden rounded-full shadow-[0_16px_24px]",
        CustomIconStyle[size][variant],
        className,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="text-neutral-0"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    </div>
  );
}
