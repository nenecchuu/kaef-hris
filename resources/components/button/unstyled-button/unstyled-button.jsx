import * as React from "react";
import clsx from "clsx";

/** @typedef {React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>} HTMLButtonElementProps */
/** @type {React.ForwardRefExoticComponent<HTMLButtonElementProps>} */
export const UnstyledButton = React.forwardRef(
  ({ onClick, className, children, ...props }, forwardedRef) => {
    const defaultRef = React.useRef();
    const ref = forwardedRef || defaultRef;

    /**
     * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event
     */
    function handleClick(event) {
      // fix focus issue onClick on Safari
      event.currentTarget.focus();

      if (typeof onClick === "function") {
        onClick(event);
      }
    }

    return (
      <button
        type="button"
        {...props}
        onClick={handleClick}
        ref={ref}
        className={clsx(
          "select-none appearance-none",
          "focus:outline-none focus:ring-2 focus:ring-brand-focus",
          "focus-visible:ring-2 focus-visible:ring-brand-focus",
          "disabled:cursor-not-allowed",
          className,
        )}
      >
        {children}
      </button>
    );
  },
);
UnstyledButton.displayName = "UnstyledButton";
