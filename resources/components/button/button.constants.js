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

/** @typedef {import('@src/constants/theme').ThemeSizeType} ButtonSizeType */
/** @typedef {import('@src/constants/theme').ThemeVariantType} ButtonVariantType */
/** @typedef {'solid'|'ghost'} ButtonStylingType */

const BUTTON_STYLING_SOLID = "solid";
const BUTTON_STYLING_GHOST = "ghost";

const ButtonSizeStyle = {
  [THEME_SIZE_SMALL]: "text-sm py-1.25 px-3 [&_svg]:h-4 [&_svg]:w-4",
  [THEME_SIZE_MEDIUM]: "text-sm py-2 px-4 [&_svg]:h-5 [&_svg]:w-5",
};

const IconButtonSizeStyle = {
  [THEME_SIZE_SMALL]: "h-8.5 w-8.5 [&_svg]:h-4 [&_svg]:w-4",
  [THEME_SIZE_MEDIUM]: "h-10 w-10 [&_svg]:h-5 [&_svg]:w-5",
};

/** @param {import('@src/constants/theme').ThemeSizeType} size */
const ButtonVariantStyle = (size) => ({
  [BUTTON_STYLING_SOLID]: {
    [THEME_VARIANT_PRIMARY]: [
      ButtonSizeStyle[size],
      "bg-brand-primary border-brand-primary text-neutral-0 [&_.loading-spinner]:text-neutral-0 hover:enabled:bg-brand-primary-dark hover:enabled:border-brand-primary-dark",
    ],
    [THEME_VARIANT_SECONDARY]: [
      ButtonSizeStyle[size],
      "bg-neutral-0 border-brand-border text-gray-900 [&_.loading-spinner]:text-gray-900 hover:enabled:bg-gray-50",
    ],
    [THEME_VARIANT_SUCCESS]: [
      ButtonSizeStyle[size],
      "bg-brand-success border-brand-success text-neutral-0 [&_.loading-spinner]:text-neutral-0 hover:enabled:bg-brand-success-dark hover:enabled:border-brand-success-dark",
    ],
    [THEME_VARIANT_DANGER]: [
      ButtonSizeStyle[size],
      "bg-brand-danger border-brand-danger text-neutral-0 [&_.loading-spinner]:text-neutral-0 hover:enabled:bg-brand-danger-dark hover:enabled:border-brand-danger-dark",
    ],
    [THEME_VARIANT_WARNING]: [
      ButtonSizeStyle[size],
      "bg-brand-warning border-brand-warning text-neutral-0 [&_.loading-spinner]:text-neutral-0 hover:enabled:bg-brand-warning-dark hover:enabled:border-brand-warning-dark",
    ],
    [THEME_VARIANT_INFO]: [
      ButtonSizeStyle[size],
      "bg-brand-info border-brand-info text-neutral-0 [&_.loading-spinner]:text-neutral-0 hover:enabled:bg-brand-info-dark hover:enabled:border-brand-info-dark",
    ],
    [THEME_VARIANT_APPROVE]: [
      ButtonSizeStyle[size],
      "bg-brand-approve border-brand-approve text-neutral-0 [&_.loading-spinner]:text-neutral-0 hover:enabled:bg-brand-approve-dark hover:enabled:border-brand-approve-dark",
    ],
  },
  [BUTTON_STYLING_GHOST]: {
    [THEME_VARIANT_PRIMARY]: [
      ButtonSizeStyle[size],
      "bg-transparent border-transparent text-icon-base-primary [&_.loading-spinner]:text-icon-base-primary hover:enabled:bg-brand-primary-light hover:enabled:border-brand-primary-light",
    ],
    [THEME_VARIANT_SECONDARY]: [
      ButtonSizeStyle[size],
      "bg-transparent border-transparent [&_.loading-spinner]:text-gray-900 hover:enabled:bg-gray-50 hover:enabled:border-gray-50",
    ],
    [THEME_VARIANT_SUCCESS]: [
      ButtonSizeStyle[size],
      "bg-transparent border-transparent text-brand-success [&_.loading-spinner]:text-brand-success hover:enabled:bg-brand-success-light hover:enabled:border-brand-success-light",
    ],
    [THEME_VARIANT_DANGER]: [
      ButtonSizeStyle[size],
      "bg-transparent border-transparent text-brand-danger [&_.loading-spinner]:text-brand-danger hover:enabled:bg-brand-danger-light hover:enabled:border-brand-danger-light",
    ],
    [THEME_VARIANT_WARNING]: [
      ButtonSizeStyle[size],
      "bg-transparent border-transparent text-brand-warning [&_.loading-spinner]:text-brand-warning hover:enabled:bg-brand-warning-light hover:enabled:border-brand-warning-light",
    ],
    [THEME_VARIANT_INFO]: [
      ButtonSizeStyle[size],
      "bg-transparent border-transparent text-brand-info [&_.loading-spinner]:text-brand-info hover:enabled:bg-brand-info-light hover:enabled:border-brand-info-light",
    ],
    [THEME_VARIANT_APPROVE]: [
      ButtonSizeStyle[size],
      "bg-transparent border-transparent text-brand-approve [&_.loading-spinner]:text-brand-approve hover:enabled:bg-brand-approve-light hover:enabled:border-brand-approve-light",
    ],
  },
});

const LinkButtonVariantStyle = (sizeStyle) => ({
  [BUTTON_STYLING_SOLID]: {
    [THEME_VARIANT_PRIMARY]: [
      sizeStyle,
      "bg-brand-primary border-brand-primary text-neutral-0 hover:bg-brand-primary-dark hover:border-brand-primary-dark",
    ],
    [THEME_VARIANT_SECONDARY]: [
      sizeStyle,
      "bg-neutral-0 border-brand-border text-gray-900 hover:bg-gray-50",
    ],
    [THEME_VARIANT_SUCCESS]: [
      sizeStyle,
      "bg-brand-success border-brand-success text-neutral-0 hover:bg-brand-success-dark hover:border-brand-success-dark",
    ],
    [THEME_VARIANT_DANGER]: [
      sizeStyle,
      "bg-brand-danger border-brand-danger text-neutral-0 hover:bg-brand-danger-dark hover:border-brand-danger-dark",
    ],
    [THEME_VARIANT_WARNING]: [
      sizeStyle,
      "bg-brand-warning border-brand-warning text-neutral-0 hover:bg-brand-warning-dark hover:border-brand-warning-dark",
    ],
    [THEME_VARIANT_INFO]: [
      sizeStyle,
      "bg-brand-info border-brand-info text-neutral-0 hover:bg-brand-info-dark hover:border-brand-info-dark",
    ],
    [THEME_VARIANT_APPROVE]: [
      sizeStyle,
      "bg-brand-approve border-brand-approve text-neutral-0 hover:bg-brand-approve-dark hover:border-brand-approve-dark",
    ],
  },
  [BUTTON_STYLING_GHOST]: {
    [THEME_VARIANT_PRIMARY]: [
      sizeStyle,
      "bg-transparent border-transparent text-icon-base-primary hover:bg-brand-primary-light hover:border-brand-primary-light",
    ],
    [THEME_VARIANT_SECONDARY]: [
      sizeStyle,
      "bg-transparent border-transparent hover:bg-gray-50 hover:border-gray-50",
    ],
    [THEME_VARIANT_SUCCESS]: [
      sizeStyle,
      "bg-transparent border-transparent text-brand-success hover:bg-brand-success-light hover:border-brand-success-light",
    ],
    [THEME_VARIANT_DANGER]: [
      sizeStyle,
      "bg-transparent border-transparent text-brand-danger hover:bg-brand-danger-light hover:border-brand-danger-light",
    ],
    [THEME_VARIANT_WARNING]: [
      sizeStyle,
      "bg-transparent border-transparent text-brand-warning hover:bg-brand-warning-light hover:border-brand-warning-light",
    ],
    [THEME_VARIANT_INFO]: [
      sizeStyle,
      "bg-transparent border-transparent text-brand-info hover:bg-brand-info-light hover:border-brand-info-light",
    ],
    [THEME_VARIANT_APPROVE]: [
      sizeStyle,
      "bg-transparent border-transparent text-brand-approve hover:bg-brand-approve-light hover:border-brand-approve-light",
    ],
  },
});

export const DEFAULT_BUTTON_SIZE = THEME_SIZE_MEDIUM;
export const DEFAULT_BUTTON_VARIANT = THEME_VARIANT_PRIMARY;
export const DEFAULT_BUTTON_STYLING = BUTTON_STYLING_SOLID;

export const ButtonStyle = {
  [THEME_SIZE_SMALL]: ButtonVariantStyle(THEME_SIZE_SMALL),
  [THEME_SIZE_MEDIUM]: ButtonVariantStyle(THEME_SIZE_MEDIUM),
};

export const LinkButtonStyle = {
  [THEME_SIZE_SMALL]: LinkButtonVariantStyle(ButtonSizeStyle[THEME_SIZE_SMALL]),
  [THEME_SIZE_MEDIUM]: LinkButtonVariantStyle(
    ButtonSizeStyle[THEME_SIZE_MEDIUM],
  ),
};

export const IconLinkButtonStyle = {
  [THEME_SIZE_SMALL]: LinkButtonVariantStyle(
    IconButtonSizeStyle[THEME_SIZE_SMALL],
  ),
  [THEME_SIZE_MEDIUM]: LinkButtonVariantStyle(
    IconButtonSizeStyle[THEME_SIZE_MEDIUM],
  ),
};

export const ButtonDisabledStyle = {
  [BUTTON_STYLING_SOLID]:
    "disabled:border-gray-400 disabled:bg-gray-400 disabled:text-gray-700 [&_.loading-spinner]:disabled:text-gray-700",
  [BUTTON_STYLING_GHOST]:
    "disabled:text-gray-700 [&_.loading-spinner]:disabled:text-gray-700",
};
