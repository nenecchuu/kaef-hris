import {
  THEME_SIZE_MEDIUM,
  THEME_SIZE_SMALL,
  THEME_VARIANT_APPROVE,
  THEME_VARIANT_DANGER,
  THEME_VARIANT_INFO,
  THEME_VARIANT_PRIMARY,
  THEME_VARIANT_SECONDARY,
  THEME_VARIANT_SUCCESS,
  THEME_VARIANT_WARNING,
} from "@src/constants/theme";

/** @typedef {import('@src/constants/theme').ThemeVariantType} BadgeVariantType */
/** @typedef {import('@src/constants/theme').ThemeSizeType} BadgeSizeType */

const BadgeSizeStyle = {
  [THEME_SIZE_SMALL]: "py-1.5 px-2 text-xs",
  [THEME_SIZE_MEDIUM]: "py-2 px-4 text-sm",
};

const BadgeVariantStyle = (size) => ({
  [THEME_VARIANT_PRIMARY]: [
    BadgeSizeStyle[size],
    "text-icon-base-primary bg-brand-primary-light",
  ],
  [THEME_VARIANT_SECONDARY]: [
    BadgeSizeStyle[size],
    "text-gray-900 bg-neutral-0",
  ],
  [THEME_VARIANT_SUCCESS]: [
    BadgeSizeStyle[size],
    "text-brand-success bg-brand-success-light",
  ],
  [THEME_VARIANT_DANGER]: [
    BadgeSizeStyle[size],
    "text-brand-danger bg-brand-danger-light",
  ],
  [THEME_VARIANT_WARNING]: [
    BadgeSizeStyle[size],
    "text-brand-warning bg-brand-warning-light",
  ],
  [THEME_VARIANT_APPROVE]: [
    BadgeSizeStyle[size],
    "text-brand-approve bg-brand-approve-light",
  ],
  [THEME_VARIANT_INFO]: [
    BadgeSizeStyle[size],
    "text-brand-info bg-brand-info-light",
  ],
});

export const DEFAULT_BADGE_SIZE = THEME_SIZE_MEDIUM;

export const BadgeStyle = {
  [THEME_SIZE_SMALL]: BadgeVariantStyle(THEME_SIZE_SMALL),
  [THEME_SIZE_MEDIUM]: BadgeVariantStyle(THEME_SIZE_MEDIUM),
};
