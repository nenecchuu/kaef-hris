import clsx from "clsx";

import { THEME_VARIANT_DANGER } from "@src/constants/theme";

import {
  CustomIconStyle,
  DEFAULT_CUSTOM_ICON_SIZE,
} from "../custom-icon.constants";

/**
 * @typedef {Object} CustomIconDangerProps
 * @prop {string=} className Style the icon with custom classes.
 * @prop {import('../custom-icon.constants').CustomIconVariantType=} variant The variant of the custom icon.
 * @prop {import('../custom-icon.constants').CustomIconSizeType=} size The size of the custom icon.
 */
/** @param {CustomIconDangerProps} props */
export function CustomIconDanger({
  className,
  size = DEFAULT_CUSTOM_ICON_SIZE,
  variant = THEME_VARIANT_DANGER,
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
        viewBox="0 0 48 48"
        strokeWidth={4}
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M29.8334 18.6665L19.1667 29.3332M19.1667 18.6665L29.8334 29.3332L19.1667 18.6665Z" />
      </svg>
    </div>
  );
}
