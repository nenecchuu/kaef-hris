import * as React from "react";
import clsx from "clsx";

import { FieldPrimitiveContext } from "../field-primitive";
import { InputStyle, TextAreaDefaultRows } from "../forms.constants";

/** @typedef {React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>} HTMLTextAreaElementProps */
/**
 * @typedef {Object} TextAreaPrimitiveProps
 * @prop {boolean=} isResizable When `true` user can resize the text area.
 * @prop {boolean=} isDisabled When `true`, prevents the user from interacting with the text area.
 * @prop {boolean=} isReadOnly When `true`, user cannot modify the value of the text area.
 * @prop {boolean=} isAutoFocus When `true`, the text area will have input focus on initial render.
 * @prop {boolean=} isRequired When `true`, indicates that the user must fill in a value before the owning form can be submitted. This will set `aria-required` to `true`.
 * @prop {number=} rows The number of visible text for the text area. By default, it is set according to the `size` of the text area.
 * @prop {string=} form The id of its owning form. Specify this value when the text area is rendered outside the form element with which it is associated.
 * @prop {string=} placeholder The text appeared on the text area when it has no value set.
 * @prop {string=} defaultValue The value of the text area that should be filled in when initially rendered. Use when you do not need to control the state of the text area.
 * @prop {string=} value The controlled value of the text area to fill in. Should be used in conjunction with `onChange`.
 * @prop {((value: string) => void)=} onValueChange Event handler called when the value changes.
 */
/** @type {React.ForwardRefExoticComponent<HTMLTextAreaElementProps&TextAreaPrimitiveProps>} props */
export const TextAreaPrimitive = React.forwardRef(
  (
    {
      rows,
      isResizable = false,
      isDisabled = false,
      isReadOnly = false,
      isAutoFocus = false,
      isRequired = false,
      onValueChange,
      ...props
    },
    forwardedRef,
  ) => {
    const { id, size, ariaDescribedBy, setAriaDescribedBy, setAriaInvalid } =
      React.useContext(FieldPrimitiveContext);

    const defaultRef = React.useRef(null);
    const ref = forwardedRef || defaultRef;

    function handleChange(e) {
      if (typeof onValueChange === "function") {
        onValueChange(e.target.value);
      }
    }

    React.useEffect(() => {
      if (isAutoFocus) {
        // @ts-ignore
        ref.current.focus();
      }
    }, [isAutoFocus, ref]);

    return (
      <textarea
        {...props}
        ref={ref}
        id={id}
        rows={rows || TextAreaDefaultRows[size]}
        disabled={isDisabled}
        readOnly={isReadOnly}
        aria-required={isRequired}
        aria-readonly={isReadOnly}
        aria-disabled={isDisabled}
        onChange={handleChange}
        className={clsx(
          "block w-full appearance-none rounded-lg border-2 border-brand-border placeholder-gray-500 outline-none",
          "transition-shadow duration-150 ease-linear",
          "focus:border-brand-focus focus:ring-1.5 focus:ring-brand-focus/40",
          "focus-visible:border-brand-focus focus-visible:ring-1.5 focus-visible:ring-brand-focus/40",
          {
            "resize-none": !isResizable,
            "bg-gray-100": isReadOnly,
            "disabled:!border-gray-100 disabled:bg-gray-100 disabled:text-gray-600":
              isDisabled,
            "!border-brand-danger focus:!border-brand-danger focus:!ring-brand-danger/40 focus-visible:!border-brand-danger focus-visible:!ring-brand-danger/40":
              setAriaInvalid,
          },
          [InputStyle[size]],
        )}
        {...(setAriaDescribedBy
          ? {
              "aria-describedby": ariaDescribedBy,
              ...(setAriaInvalid ? { "aria-invalid": true } : {}),
            }
          : {})}
      />
    );
  },
);
TextAreaPrimitive.displayName = "TextAreaPrimitive";
