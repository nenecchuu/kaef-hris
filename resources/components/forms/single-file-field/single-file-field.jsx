import * as React from "react";

import { FieldPrimitive } from "../field-primitive";
import { SingleFileFieldPrimitive } from "./single-file-field-primitive";

/**
 * @typedef {Object} SingleFileFieldProps
 * @prop {string=} id The id of the single file field.
 * @prop {string=} wrapperClassName Style the single file field wrapper with css classes.
 * @prop {string} label The label of the single file field. It should be defined to ensure accessibility.
 * @prop {boolean=} showLabel When `false`, `label` will be displayed on screen reader only.
 * @prop {boolean=} withAsterisk When `true`, the asterisk symbol (*) on `label` will be displayed. This will set `aria-required` to `true`.
 * @prop {string=} hintText The additional instructions or context of the single file field.
 * @prop {string=} errorText The error message when the value that is entered into the single file field is invalid.
 * @prop {import('@src/constants/theme').ThemeSizeType=} size The size of the single file field.
 * @prop {boolean=} isDisabled When `true`, prevents the user from interacting with the single file field.
 * @prop {boolean=} isReadOnly When `true`, user cannot modify the value of the single file field.
 * @prop {boolean=} isAutoFocus When `true`, the single file field will have input focus on initial render.
 * @prop {boolean=} isRequired When `true`, indicates that the user must fill in a value before the owning form can be submitted. This will set `aria-required` to `true`.
 * @prop {string=} form The id of its owning form. Specify this value when the single file field is rendered outside the form element with which it is associated.
 * @prop {string=} placeholder The text appeared on the single file field when it has no value set.
 * @prop {string=} defaultValue The value of the single file field that should be filled in when initially rendered. Use when you do not need to control the state of the single file field.
 * @prop {string=} value The controlled value of the single file field to fill in. Should be used in conjunction with `onValueChange`.
 * @prop {((e: Event|null) => void)=} onFileChange Event handler called when the file changes.
 * @prop {(() => void)=} onFileClear Event handler called when the file is cleared.
 */
/** @type {React.ForwardRefExoticComponent<import('./single-file-field-primitive').HTMLFileInputElementProps&SingleFileFieldProps>} props */
export const SingleFileField = React.forwardRef(
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
      <SingleFileFieldPrimitive
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
SingleFileField.displayName = "SingleFileField";
