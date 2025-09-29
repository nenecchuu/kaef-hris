import * as React from "react";

import { FieldPrimitive } from "../field-primitive";
import { TextAreaPrimitive } from "./text-area-primitive";

/**
 * @typedef {Object} TextAreaProps
 * @prop {string=} id The id of the text area.
 * @prop {string=} wrapperClassName Style the text area wrapper with css classes.
 * @prop {string} label The label of the text area. It should be defined to ensure accessibility.
 * @prop {boolean=} showLabel When `false`, `label` will be displayed on screen reader only.
 * @prop {boolean=} withAsterisk When `true`, the asterisk symbol (*) on `label` will be displayed. This will set `aria-required` to `true`.
 * @prop {string=} hintText The additional instructions or context of the text area.
 * @prop {string=} errorText The error message when the value that is entered into the text area is invalid.
 * @prop {import('@src/constants/theme').ThemeSizeType=} size The size of the text area.
 * @prop {boolean=} isResizable When `true` user can resize the text area.
 * @prop {boolean=} isDisabled When `true`, prevents the user from interacting with the text area.
 * @prop {boolean=} isReadOnly When `true`, user cannot modify the value of the text area.
 * @prop {boolean=} isAutoFocus When `true`, the text area will have input focus on initial render.
 * @prop {boolean=} isRequired When `true`, indicates that the user must fill in a value before the owning form can be submitted. This will set `aria-required` to `true`.
 * @prop {number=} rows The number of visible text for the text area. By default, it is set according to the `size` of the text area.
 * @prop {string=} form The id of its owning form. Specify this value when the text area is rendered outside the form element with which it is associated.
 * @prop {string=} placeholder The text appeared on the text area when it has no value set.
 * @prop {string=} defaultValue The value of the text area that should be filled in when initially rendered. Use when you do not need to control the state of the text area.
 * @prop {string=} value The controlled value of the text area to fill in. Should be used in conjunction with `onValueChange`.
 * @prop {((value: string) => void)=} onValueChange Event handler called when the value changes.
 */
/** @type {React.ForwardRefExoticComponent<import('./text-area-primitive').HTMLTextAreaElementProps&TextAreaProps>} props */
export const TextArea = React.forwardRef(
  (
    {
      id,
      label,
      showLabel,
      errorText,
      hintText,
      withAsterisk,
      size,
      wrapperClassName,
      isAutoFocus,
      isRequired,
      isReadOnly,
      isDisabled,
      isResizable,
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
      <TextAreaPrimitive
        {...props}
        ref={forwardedRef}
        isAutoFocus={isAutoFocus}
        isRequired={isRequired || withAsterisk}
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        isResizable={isResizable}
      />
    </FieldPrimitive>
  ),
);
TextArea.displayName = "TextArea";
