import * as React from "react";
import { IconLoader2 } from "@tabler/icons-react";
import clsx from "clsx";

import {
  ButtonDisabledStyle,
  ButtonStyle,
  DEFAULT_BUTTON_SIZE,
  DEFAULT_BUTTON_STYLING,
  DEFAULT_BUTTON_VARIANT,
} from "../button.constants";

/**
 * @typedef {Object} ButtonProps
 * @prop {boolean=} isFullWidth Set the button to full width.
 * @prop {boolean=} isLoading Set button on loading state.
 * @prop {boolean=} isDisabled Set button on disabled state.
 * @prop {import('../button.constants').ButtonSizeType=} size The size of the button.
 * @prop {import('../button.constants').ButtonStylingType=} styling The styling type of the button. It corresponds with how button of each variant will look like.
 * @prop {import('../button.constants').ButtonVariantType=} variant The variant of the button.
 */
/** @type {React.ForwardRefExoticComponent<import('../unstyled-button').HTMLButtonElementProps&ButtonProps>} */
export const Button = React.forwardRef(
  (
    {
      children,
      isFullWidth = false,
      isLoading = false,
      isDisabled = false,
      size = DEFAULT_BUTTON_SIZE,
      styling = DEFAULT_BUTTON_STYLING,
      variant = DEFAULT_BUTTON_VARIANT,
      ...props
    },
    forwardedRef,
  ) => {
    const defaultRef = React.useRef(null);
    const ref = forwardedRef || defaultRef;

    return (
      <button
        type="button"
        {...props}
        ref={ref}
        disabled={isLoading || isDisabled}
        className={clsx(
          "relative flex select-none appearance-none items-center justify-center gap-x-2 rounded-lg border-2 font-semibold",
          "transition-colors duration-150 ease-in-out",
          "focus:outline-none focus:ring-2 focus:ring-brand-focus",
          [
            ButtonStyle[size][styling][variant],
            isDisabled && ButtonDisabledStyle[styling],
          ],
          {
            "w-full": isFullWidth,
            "disabled:cursor-progress disabled:text-opacity-50": isLoading,
            "disabled:cursor-not-allowed": isDisabled,
          },
        )}
      >
        {children}
        {isLoading && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <IconLoader2 className="loading-spinner animate-spin !text-opacity-100" />
          </span>
        )}
      </button>
    );
  },
);
Button.displayName = "Button";
