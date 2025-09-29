import * as React from "react";

import { FieldPrimitive } from "../field-primitive";
import { RupiahFieldPrimitive } from "./rupiah-field-primitive";

/**
 * @typedef {Object} RupiahFieldProps
 * @prop {string=} id The id of the rupiah field.
 * @prop {string=} wrapperClassName Style the rupiah field wrapper with css classes.
 * @prop {string} label The label of the rupiah field. It should be defined to ensure accessibility.
 * @prop {boolean=} showLabel When `false`, `label` will be displayed on screen reader only.
 * @prop {boolean=} withAsterisk When `true`, the asterisk symbol (*) on `label` will be displayed. This will set `aria-required` to `true`.
 * @prop {string=} hintText The additional instructions or context of the rupiah field.
 * @prop {string=} errorText The error message when the value that is entered into the rupiah field is invalid.
 * @prop {import('@src/constants/theme').ThemeSizeType=} size The size of the rupiah field.
 * @prop {boolean=} isDisabled When `true`, prevents the user from interacting with the rupiah field.
 * @prop {boolean=} isReadOnly When `true`, user cannot modify the value of the rupiah field.
 * @prop {boolean=} isAutoFocus When `true`, the rupiah field will have input focus on initial render.
 * @prop {boolean=} isRequired When `true`, indicates that the user must fill in a value before the owning form can be submitted. This will set `aria-required` to `true`.
 * @prop {string=} form The id of its owning form. Specify this value when the rupiah field is rendered outside the form element with which it is associated.
 * @prop {string=} placeholder The text appeared on the rupiah field when it has no value set.
 * @prop {string=} defaultValue The value of the rupiah field that should be filled in when initially rendered. Use when you do not need to control the state of the rupiah field.
 * @prop {string=} value The controlled value of the rupiah field to fill in. Should be used in conjunction with `onValueChange`.
 * @prop {import('react-number-format').OnValueChange=} onValueChange Event handler called when the value changes.
 */
/** @type {React.ForwardRefExoticComponent<import('./rupiah-field-primitive').NumericFormatProps&RupiahFieldProps>} props */
export const RupiahField = React.forwardRef(
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
      <RupiahFieldPrimitive
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
RupiahField.displayName = "RupiahField";
