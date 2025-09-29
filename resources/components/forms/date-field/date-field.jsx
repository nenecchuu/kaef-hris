import * as React from "react";

import { FieldPrimitive } from "../field-primitive";
import { DateFieldPrimitive } from "./date-field-primitive";

/**
 * @typedef {Object} DateFieldProps
 * @prop {string=} id The id of the date field.
 * @prop {string=} wrapperClassName Style the date field wrapper with css classes.
 * @prop {string} label The label of the date field. It should be defined to ensure accessibility.
 * @prop {boolean=} showLabel When `false`, `label` will be displayed on screen reader only.
 * @prop {boolean=} withAsterisk When `true`, the asterisk symbol (*) on `label` will be displayed. This will set `aria-required` to `true`.
 * @prop {string=} hintText The additional instructions or context of the date field.
 * @prop {string=} errorText The error message when the value that is entered into the date field is invalid.
 * @prop {import('@src/constants/theme').ThemeSizeType=} size The size of the date field.
 * @prop {boolean=} isDisabled When `true`, prevents the user from interacting with the date field.
 * @prop {boolean=} isReadOnly When `true`, user cannot modify the value of the date field.
 * @prop {boolean=} isAutoFocus When `true`, the date field will have input focus on initial render.
 * @prop {boolean=} isRequired When `true`, indicates that the user must fill in a value before the owning form can be submitted. This will set `aria-required` to `true`.
 * @prop {boolean=} isClearable When `true`, user can remove the selected value using the clear button.
 * @prop {string=} form The id of its owning form. Specify this value when the date field is rendered outside the form element with which it is associated.
 * @prop {string=} placeholder The text appeared on the date field when it has no value set.
 * @prop {Date=} defaultValue The value of the date field that should be filled in when initially rendered. Use when you do not need to control the state of the search field.
 * @prop {Date=} value The controlled value of the date field to fill in. Should be used in conjunction with `onValueChange`.
 * @prop {((value: Date) => void)=} onValueChange Event handler called when the value changes.
 * @prop {(() => void)=} onValueClear Event handler called when the value is cleared.
 */
/** @type {React.ForwardRefExoticComponent<import('./date-field-primitive').ReactDatePickerProps&DateFieldProps>} props */
export const DateField = React.forwardRef(
  (
    {
      id,
      label,
      showLabel,
      withAsterisk,
      hintText,
      errorText,
      size,
      wrapperClassName,
      isAutoFocus,
      isRequired,
      isReadOnly,
      isDisabled,
      ...props
    },
    forwardedRef,
  ) => (
    <FieldPrimitive
      id={id}
      label={label}
      showLabel={showLabel}
      withAsterisk={withAsterisk}
      hintText={hintText}
      errorText={errorText}
      size={size}
      wrapperClassName={wrapperClassName}
    >
      <DateFieldPrimitive
        {...props}
        ref={forwardedRef}
        isAutoFocus={isAutoFocus}
        isRequired={isRequired || withAsterisk}
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
      />
    </FieldPrimitive>
  ),
);
DateField.displayName = "DateField";
