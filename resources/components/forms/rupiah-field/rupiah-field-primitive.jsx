import * as React from "react";
import clsx from "clsx";
import { NumericFormat } from "react-number-format";

import { FieldPrimitiveContext } from "../field-primitive";
import { InputStyle, RupiahFieldStyle } from "../forms.constants";

/**
 * @typedef {Object} RupiahFieldPrimitiveCustomProps
 * @prop {boolean=} isDisabled When `true`, prevents the user from interacting with the rupiah field.
 * @prop {boolean=} isReadOnly When `true`, user cannot modify the value of the rupiah field.
 * @prop {boolean=} isAutoFocus When `true`, the rupiah field will have input focus on initial render.
 * @prop {boolean=} isRequired When `true`, indicates that the user must fill in a value before the owning form can be submitted. This will set `aria-required` to `true`.
 * @prop {string=} form The id of its owning form. Specify this value when the rupiah field is rendered outside the form element with which it is associated.
 * @prop {string=} defaultValue The value of the rupiah field that should be filled in when initially rendered. Use when you do not need to control the state of the rupiah field.
 * @prop {string=} value The controlled value of the rupiah field to fill in. Should be used in conjunction with `onValueChange`.
 * @prop {import('react-number-format').OnValueChange=} onValueChange Event handler called when the value changes.
 */
/** @typedef {Omit<import('react-number-format').NumericFormatProps, 'getInputRef'>} NumericFormatProps */
/** @typedef {NumericFormatProps&RupiahFieldPrimitiveCustomProps&React.RefAttributes<HTMLInputElement>} RupiahFieldPrimitiveProps */
/** @type {React.ForwardRefExoticComponent<RupiahFieldPrimitiveProps>} */
export const RupiahFieldPrimitive = React.forwardRef(
  (
    {
      isDisabled = false,
      isReadOnly = false,
      isAutoFocus = false,
      isRequired = false,
      onValueChange,
      ...props
    },
    forwardedRef,
  ) => {
    const defaultRef = React.useRef(null);
    const ref = forwardedRef || defaultRef;

    const { id, size, ariaDescribedBy, setAriaDescribedBy, setAriaInvalid } =
      React.useContext(FieldPrimitiveContext);

    function handleChange(values, sourceInfo) {
      if (typeof onValueChange === "function") {
        onValueChange(values, sourceInfo);
      }
    }

    React.useEffect(() => {
      if (isAutoFocus) {
        // @ts-ignore
        ref.current.focus();
      }
    }, [isAutoFocus, ref]);

    return (
      <div className="relative">
        <NumericFormat
          {...props}
          id={id}
          getInputRef={ref}
          disabled={isDisabled}
          readOnly={isReadOnly}
          aria-required={isRequired}
          aria-readonly={isReadOnly}
          aria-disabled={isDisabled}
          onValueChange={handleChange}
          className={clsx(
            "block w-full appearance-none rounded-lg border-2 border-brand-border placeholder-gray-500 outline-none",
            "transition-shadow duration-150 ease-linear",
            "focus:border-brand-focus focus:ring-1.5 focus:ring-brand-focus/40",
            "focus-visible:border-brand-focus focus-visible:ring-1.5 focus-visible:ring-brand-focus/40",
            {
              "bg-gray-100": isReadOnly,
              "disabled:!border-gray-100 disabled:bg-gray-100 disabled:text-gray-600":
                isDisabled,
              "!border-brand-danger focus:!border-brand-danger focus:!ring-brand-danger/40 focus-visible:!border-brand-danger focus-visible:!ring-brand-danger/40":
                setAriaInvalid,
            },
            [InputStyle[size], RupiahFieldStyle[size]],
          )}
          {...(setAriaDescribedBy
            ? {
                "aria-describedby": ariaDescribedBy,
                ...(setAriaInvalid ? { "aria-invalid": true } : {}),
              }
            : {})}
          thousandSeparator="."
          decimalSeparator=","
          valueIsNumericString={true}
        />
        <p className="absolute top-1/2 -translate-y-1/2 font-medium text-gray-600">
          Rp
        </p>
      </div>
    );
  },
);
RupiahFieldPrimitive.displayName = "RupiahFieldPrimitive";
