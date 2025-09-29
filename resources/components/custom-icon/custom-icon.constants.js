import {
  THEME_SIZE_MEDIUM,
  THEME_SIZE_SMALL,
  THEME_VARIANT_DANGER,
  THEME_VARIANT_SUCCESS,
  THEME_VARIANT_WARNING,
} from "@src/constants/theme";

/** @typedef {'success'|'danger'|'warning'} CustomIconVariantType */
/** @typedef {import('@src/constants/theme').ThemeSizeType} CustomIconSizeType */

const CustomIconSizeStyle = {
  [THEME_SIZE_SMALL]: "h-12 w-12 [&>svg]:h-12 [&>svg]:w-12",
  [THEME_SIZE_MEDIUM]: "h-16 w-16 [&>svg]:h-16 [&>svg]:w-16",
};

/** @param {import('@src/constants/theme').ThemeSizeType} size */
const CustomIconVariantStyle = (size) => ({
  [THEME_VARIANT_DANGER]: [
    CustomIconSizeStyle[size],
    "bg-brand-danger text-brand-danger shadow-brand-danger/15",
  ],
  [THEME_VARIANT_SUCCESS]: [
    CustomIconSizeStyle[size],
    "bg-brand-success text-brand-success shadow-brand-success/15",
  ],
  [THEME_VARIANT_WARNING]: [
    CustomIconSizeStyle[size],
    "bg-brand-warning text-brand-warning shadow-brand-warning/15",
  ],
});

export const DEFAULT_CUSTOM_ICON_SIZE = THEME_SIZE_MEDIUM;

export const CustomIconStyle = {
  [THEME_SIZE_SMALL]: CustomIconVariantStyle(THEME_SIZE_SMALL),
  [THEME_SIZE_MEDIUM]: CustomIconVariantStyle(THEME_SIZE_MEDIUM),
};
