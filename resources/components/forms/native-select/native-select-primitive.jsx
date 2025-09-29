import * as React from "react";
import { IconSelector } from "@tabler/icons-react";
import clsx from "clsx";

import { FieldPrimitiveContext } from "../field-primitive";
import { InputStyle, NativeSelectStyle } from "../forms.constants";

/**
 * @typedef {Object} NativeSelectOptionType
 * @prop {string} value
 * @prop {string} label
 * @prop {boolean=} isDisabled
 */
/**
 * @typedef {Object} NativeSelectPrimitiveProps
 * @prop {string=} name The name of the select. Submitted with its owning form as part of a name/value pair.
 * @prop {boolean=} isDisabled When `true`, prevents the user from interacting with the select.
 * @prop {boolean=} isReadOnly When `true`, user cannot modify the value of the select.
 * @prop {boolean=} isAutoFocus When `true`, the select will have input focus on initial render.
 * @prop {boolean=} isRequired When `true`, indicates that the user must fill in a value before the owning form can be submitted. This will set `aria-required` to `true`.
 * @prop {(string|NativeSelectOptionType)[]} options The options that will be rendered in select dropdown.
 * @prop {string=} form The id of its owning form. Specify this value when the select is rendered outside the form element with which it is associated.
 * @prop {string=} defaultValue The value of the select when initially rendered. Use when you do not need to control the state of the select.
 * @prop {string=} value The controlled value of the select. Should be used in conjunction with `onValueChange`.
 * @prop {((value: string|NativeSelectOptionType) => void)=} onValueChange Event handler called when the value changes.
 */
/** @type {React.ForwardRefExoticComponent<NativeSelectPrimitiveProps&React.RefAttributes<HTMLSelectElement>>} */
export const NativeSelectPrimitive = React.forwardRef(
  (
    {
      isDisabled = false,
      isReadOnly = false,
      isAutoFocus = false,
      isRequired = false,
      options,
      defaultValue,
      value,
      onValueChange,
      ...props
    },
    forwardedRef,
  ) => {
    const defaultRef = React.useRef(null);
    const ref = forwardedRef || defaultRef;

    const { id, size, ariaDescribedBy, setAriaDescribedBy, setAriaInvalid } =
      React.useContext(FieldPrimitiveContext);

    const [selectedItem, setSelectedItem] = React.useState(
      defaultValue || undefined,
    );

    const selectedValue = React.useMemo(
      () => (value !== undefined ? value : selectedItem),
      [selectedItem, value],
    );

    const items = React.useMemo(
      () =>
        options
          .map((option) =>
            typeof option === "string"
              ? {
                  label: option,
                  value: option,
                  isDisabled: false,
                }
              : option,
          )
          .map((option) => ({
            ...option,
            isDisabled: isReadOnly && option.value !== selectedItem,
          })),
      [isReadOnly, options, selectedItem],
    );

    function handleChange(e) {
      setSelectedItem(e.target.value);

      if (typeof onValueChange === "function") {
        onValueChange(
          options.find((option) =>
            typeof option === "string"
              ? option === e.target.value
              : option.value === e.target.value,
          ),
        );
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
        <select
          {...props}
          id={id}
          ref={ref}
          disabled={isDisabled}
          aria-required={isRequired}
          aria-readonly={isReadOnly}
          aria-disabled={isDisabled}
          value={selectedValue}
          onChange={handleChange}
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
            [InputStyle[size], NativeSelectStyle[size]],
          )}
          {...(setAriaDescribedBy
            ? {
                "aria-describedby": ariaDescribedBy,
                ...(setAriaInvalid ? { "aria-invalid": true } : {}),
              }
            : {})}
        >
          {items.map((item) => (
            <option
              key={item.value}
              value={item.value}
              disabled={item.isDisabled}
            >
              {item.label}
            </option>
          ))}
        </select>
        <IconSelector className="absolute top-1/2 -translate-y-1/2 text-gray-600" />
      </div>
    );
  },
);
NativeSelectPrimitive.displayName = "NativeSelectPrimitive";
