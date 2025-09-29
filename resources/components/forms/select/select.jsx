import * as React from "react";

import { FieldPrimitive } from "../field-primitive";
import { SelectPrimitive } from "./select-primitive";

/** @typedef {import('./select-primitive').SelectOptionType} OptionType */
/**
 * @typedef {Object} SelectProps
 * @prop {string=} id The id of the select.
 * @prop {string=} wrapperClassName Style the select wrapper with css classes.
 * @prop {string} label The label of the select. It should be defined to ensure accessibility.
 * @prop {boolean=} showLabel When `false`, `label` will be displayed on screen reader only.
 * @prop {boolean=} withAsterisk When `true`, the asterisk symbol (*) on `label` will be displayed. This will set `aria-required` to `true`.
 * @prop {string=} hintText The additional instructions or context of the select.
 * @prop {string=} errorText The error message when the value that is entered into the select is invalid.
 * @prop {import('@src/constants/theme').ThemeSizeType=} size The size of the select.
 * @prop {string=} name The name of the select. Submitted with its owning form as part of a name/value pair.
 * @prop {boolean=} isDisabled When `true`, prevents the user from interacting with the select.
 * @prop {boolean=} isReadOnly When `true`, user cannot modify the value of the select.
 * @prop {boolean=} isAutoFocus When `true`, the select will have input focus on initial render.
 * @prop {boolean=} isRequired When `true`, indicates that the user must fill in a value before the owning form can be submitted. This will set `aria-required` to `true`.
 * @prop {boolean=} isLoading When `true`, the loading indicator will be displayed and prevents the user from modifying the value of the select.
 * @prop {boolean=} isClearable When `true`, user can remove the selected value using the clear button.
 * @prop {(string|OptionType)[]} options The options that will be rendered in select dropdown.
 * @prop {string=} form The id of its owning form. Specify this value when the select is rendered outside the form element with which it is associated.
 * @prop {string=} placeholder The text appeared on the select when it has no value set.
 * @prop {string=} emptyOptionsText The text rendered on the select dropdown when the options are empty.
 * @prop {string=} defaultValue The value of the select when initially rendered. Use when you do not need to control the state of the select.
 * @prop {string=} value The controlled value of the select. Should be used in conjunction with `onValueChange`.
 * @prop {((value: string|OptionType|null) => void)=} onValueChange Event handler called when the value changes.
 * @prop {(() => void)=} onValueClear Event handler called when then value is cleared.
 */
/** @type {React.ForwardRefExoticComponent<SelectProps>} props */
export const Select = React.forwardRef(
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
      <SelectPrimitive
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
Select.displayName = "Select";
