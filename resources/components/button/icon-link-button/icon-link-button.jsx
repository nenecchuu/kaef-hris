import * as React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

import {
  DEFAULT_BUTTON_SIZE,
  DEFAULT_BUTTON_STYLING,
  DEFAULT_BUTTON_VARIANT,
  IconLinkButtonStyle,
} from "../button.constants";

/** @typedef {import('react-router-dom').LinkProps} IconLinkProps */
/**
 * @typedef {Object} IconLinkButtonProps
 * @prop {import('../button.constants').ButtonSizeType=} size The size of the button.
 * @prop {import('../button.constants').ButtonStylingType=} styling The styling type of the button. It corresponds with how button of each variant will look like.
 * @prop {import('../button.constants').ButtonVariantType=} variant The variant of the button.
 */
/** @type {React.ForwardRefExoticComponent<IconLinkProps&IconLinkButtonProps>} */
export const IconLinkButton = React.forwardRef(function IconLinkButton(
  {
    size = DEFAULT_BUTTON_SIZE,
    styling = DEFAULT_BUTTON_STYLING,
    variant = DEFAULT_BUTTON_VARIANT,
    children,
    ...props
  },
  forwardedRef,
) {
  const defaultRef = React.useRef(null);
  const ref = forwardedRef || defaultRef;

  return (
    <Link
      {...props}
      ref={ref}
      className={clsx(
        "relative inline-flex shrink-0 select-none appearance-none items-center justify-center gap-x-2 rounded-lg border-2 font-semibold",
        "transition-colors duration-150 ease-in-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-focus",
        [IconLinkButtonStyle[size][styling][variant]],
      )}
    >
      {children}
    </Link>
  );
});
