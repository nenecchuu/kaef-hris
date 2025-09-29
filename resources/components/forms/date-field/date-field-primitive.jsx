import * as React from "react";
import { IconCalendar, IconX } from "@tabler/icons-react";
import clsx from "clsx";
import ReactDatePicker from "react-datepicker";

import { UnstyledButton } from "@src/components/button";

import "react-datepicker/dist/react-datepicker.css";

import { FieldPrimitiveContext } from "../field-primitive";
import { DateFieldStyle, InputStyle } from "../forms.constants";

/**
 * @typedef {Object} DateFieldPrimitiveProps
 * @prop {boolean=} isDisabled When `true`, prevents the user from interacting with the date field.
 * @prop {boolean=} isReadOnly When `true`, user cannot modify the value of the date field.
 * @prop {boolean=} isAutoFocus When `true`, the text date will have input focus on initial render.
 * @prop {boolean=} isRequired When `true`, indicates that the user must fill in a value before the owning form can be submitted. This will set `aria-required` to `true`.
 * @prop {boolean=} isClearable When `true`, user can remove the selected value using the clear button.
 * @prop {string=} form The id of its owning form. Specify this value when the date field is rendered outside the form element with which it is associated.
 * @prop {string=} placeholder The text appeared on the date field when it has no value set.
 * @prop {Date=} defaultValue The value of the date field that should be filled in when initially rendered. Use when you do not need to control the state of the date field.
 * @prop {Date=} value The controlled value of the date field to fill in. Should be used in conjunction with `onValueChange`.
 * @prop {((value: Date) => void)=} onValueChange Event handler called when the value changes.
 * @prop {(() => void)=} onValueClear Event handler called when the value is cleared.
 */
/** @typedef {Omit<import('react-datepicker').ReactDatePickerProps, 'selected'|'onChange'|'placeholderText'>&React.RefAttributes<ReactDatePicker<"arrow", undefined>>} ReactDatePickerProps */
/** @type {React.ForwardRefExoticComponent<ReactDatePickerProps&DateFieldPrimitiveProps>} */
export const DateFieldPrimitive = React.forwardRef(
  (
    {
      isAutoFocus = false,
      isRequired = false,
      isReadOnly = false,
      isDisabled = false,
      isClearable = false,
      placeholder,
      defaultValue,
      value,
      onValueChange,
      onValueClear,
      ...props
    },
    forwardedRef,
  ) => {
    const defaultRef = React.useRef(null);
    const ref = forwardedRef || defaultRef;

    const { id, size, ariaDescribedBy, setAriaDescribedBy, setAriaInvalid } =
      React.useContext(FieldPrimitiveContext);

    const [selectedDate, setSelectedDate] = React.useState(
      defaultValue || null,
    );

    const selectedValue = React.useMemo(
      () => (value !== undefined ? value : selectedDate),
      [selectedDate, value],
    );

    /**
     * @param {Date} date
     */
    function handleChange(date) {
      setSelectedDate(date);

      if (typeof onValueChange === "function") {
        onValueChange(date);
      }
    }

    function handleClear() {
      setSelectedDate(null);

      if (typeof onValueChange === "function") {
        onValueChange(null);
      }

      if (typeof onValueClear === "function") {
        onValueClear();
      }
    }

    React.useEffect(() => {
      if (isAutoFocus) {
        // @ts-ignore
        ref.current.focus();
      }
    }, [isAutoFocus, ref]);

    return (
      <div className={clsx("relative", DateFieldStyle[size])}>
        <ReactDatePicker
          dateFormat="dd/MM/yyyy"
          {...props}
          ref={ref}
          id={id}
          disabled={isDisabled}
          readOnly={isReadOnly}
          aria-required={isRequired}
          aria-readonly={isReadOnly}
          aria-disabled={isDisabled}
          onChange={handleChange}
          placeholderText={placeholder}
          selected={selectedValue}
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
            [InputStyle[size]],
          )}
          {...(setAriaDescribedBy
            ? {
                "aria-describedby": ariaDescribedBy,
                ...(setAriaInvalid ? { "aria-invalid": true } : {}),
              }
            : {})}
          showMonthDropdown={true}
          showYearDropdown={true}
          dropdownMode="select"
          autoComplete="off"
          popperModifiers={[
            {
              name: "arrow",
              options: {
                padding: 24,
              },
            },
          ]}
        />
        <IconCalendar className="absolute top-1/2 -translate-y-1/2 text-gray-600" />
        {isClearable && Boolean(selectedValue) && (
          <UnstyledButton
            type="button"
            className="absolute top-1/2 -translate-y-1/2 text-gray-600"
            aria-label="Clear Value"
            onClick={handleClear}
          >
            <IconX />
          </UnstyledButton>
        )}
      </div>
    );
  },
);
DateFieldPrimitive.displayName = "DateFieldPrimitive";
