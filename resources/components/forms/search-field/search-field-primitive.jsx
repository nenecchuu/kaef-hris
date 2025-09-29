import * as React from "react";
import { IconSearch, IconX } from "@tabler/icons-react";
import clsx from "clsx";

import { UnstyledButton } from "@src/components/button";

import { FieldPrimitiveContext } from "../field-primitive";
import { InputStyle, SearchFieldStyle } from "../forms.constants";

/** @typedef {Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'size'>} HTMLSearchInputElementProps */
/**
 * @typedef {Object} SearchFieldPrimitiveProps
 * @prop {boolean=} isDisabled When `true`, prevents the user from interacting with the search field.
 * @prop {boolean=} isReadOnly When `true`, user cannot modify the value of the search field.
 * @prop {boolean=} isAutoFocus When `true`, the search field will have input focus on initial render.
 * @prop {boolean=} isRequired When `true`, indicates that the user must fill in a value before the owning form can be submitted. This will set `aria-required` to `true`.
 * @prop {string=} form The id of its owning form. Specify this value when the search field is rendered outside the form element with which it is associated.
 * @prop {string=} placeholder The text appeared on the search field when it has no value set.
 * @prop {string=} defaultValue The value of the search field that should be filled in when initially rendered. Use when you do not need to control the state of the search field.
 * @prop {string=} value The controlled value of the search field to fill in. Should be used in conjunction with `onValueChange`.
 * @prop {((value: string) => void)=} onValueChange Event handler called when the value changes.
 * @prop {(() => void)=} onValueClear Event handler called when the value is cleared.
 */
/** @type {React.ForwardRefExoticComponent<HTMLSearchInputElementProps&SearchFieldPrimitiveProps>} props */
export const SearchFieldPrimitive = React.forwardRef(
  (
    {
      isDisabled = false,
      isReadOnly = false,
      isAutoFocus = false,
      isRequired = false,
      defaultValue,
      value,
      onValueChange,
      onValueClear,
      ...props
    },
    forwardedRef,
  ) => {
    const { id, size, ariaDescribedBy, setAriaDescribedBy, setAriaInvalid } =
      React.useContext(FieldPrimitiveContext);

    const defaultRef = React.useRef(null);
    const ref = forwardedRef || defaultRef;

    const [searchValue, setSearchValue] = React.useState(defaultValue || "");

    const search = React.useMemo(
      () => (value !== undefined ? value : searchValue),
      [searchValue, value],
    );

    function handleChange(e) {
      setSearchValue(e.target.value);

      if (typeof onValueChange === "function") {
        onValueChange(e.target.value);
      }
    }

    function handleClear() {
      setSearchValue("");

      if (typeof onValueChange === "function") {
        onValueChange("");
      }

      if (typeof onValueClear === "function") {
        onValueClear();
      }

      // @ts-ignore
      ref.current.focus();
    }

    React.useEffect(() => {
      if (isAutoFocus) {
        // @ts-ignore
        ref.current.focus();
      }
    }, [isAutoFocus, ref]);

    return (
      <div className="relative">
        <input
          {...props}
          type="search"
          ref={ref}
          id={id}
          disabled={isDisabled}
          readOnly={isReadOnly}
          aria-required={isRequired}
          aria-readonly={isReadOnly}
          aria-disabled={isDisabled}
          value={search}
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
            [InputStyle[size], SearchFieldStyle[size]],
          )}
          {...(setAriaDescribedBy
            ? {
                "aria-describedby": ariaDescribedBy,
                ...(setAriaInvalid ? { "aria-invalid": true } : {}),
              }
            : {})}
        />
        <IconSearch className="absolute top-1/2 -translate-y-1/2 text-gray-600" />
        {Boolean(search) && (
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
SearchFieldPrimitive.displayName = "SearchFieldPrimitive";
