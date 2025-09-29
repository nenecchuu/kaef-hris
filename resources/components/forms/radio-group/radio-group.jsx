import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import clsx from "clsx";

import { FieldPrimitive, FieldPrimitiveContext } from "../field-primitive";
import { RadioButtonStyle } from "../forms.constants";

/**
 * @typedef {Object} RadioGroupProps
 * @prop {string=} id The id of the radio group.
 * @prop {string=} wrapperClassName Style the radio group wrapper with css classes.
 * @prop {string} label The label of the radio group. It should be defined to ensure accessibility.
 * @prop {boolean=} showLabel When `false`, `label` will be displayed on screen reader only.
 * @prop {boolean=} withAsterisk When `true`, the asterisk symbol (*) on `label` will be displayed. This will set `aria-required` to `true`.
 * @prop {string=} hintText The additional instructions or context of the radio group.
 * @prop {string=} errorText The error message when the value of the radio button that is checked is invalid.
 * @prop {import('@src/constants/theme').ThemeSizeType=} size The size of the radio group.
 * @prop {string=} defaultValue The value of the radio button that should be checked when initially rendered. Use when you do not need to control the state of the radio buttons.
 * @prop {string=} value The controlled value of the radio button to check. Should be used in conjunction with `onValueChange`.
 * @prop {((value: string) => void)=} onValueChange Event handler called when the value changes.
 * @prop {string=} name The name of the radio group. Submitted with its owning form as part of a name/value pair.
 * @prop {string=} value The value given as data when submitted with a `name`.
 * @prop {boolean=} isDisabled When `true`, prevents the user from interacting with radio buttons.
 * @prop {boolean=} isRequired When `true`, indicates that the user must check a radio item before the owning form can be submitted. This will set `aria-required` to `true`.
 * @prop {React.ReactNode} children The radio buttons that will be rendered.
 */
/** @type {React.ForwardRefExoticComponent<RadioGroupProps>} */
export const RadioGroup = React.forwardRef(
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
      isDisabled,
      isRequired,
      ...props
    },
    forwardedRef,
  ) => {
    const defaultRef = React.useRef(null);
    const ref = forwardedRef || defaultRef;

    return (
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
        <RadioGroupPrimitive.Root
          {...props}
          ref={ref}
          disabled={isDisabled}
          aria-disabled={isDisabled}
          aria-required={isRequired || withAsterisk}
          className="flex flex-wrap gap-x-4"
        />
      </FieldPrimitive>
    );
  },
);
RadioGroup.displayName = "RadioGroup";

/**
 * @typedef {Object} RadioGroupButtonProps
 * @prop {string=} id The id of the radio button.
 * @prop {string} label The label of the radio button. It should be defined to ensure accessibility.
 * @prop {string} value The value given as data when submitted with a `name`.
 * @prop {boolean=} isDisabled When `true`, prevents the user from interacting with the radio button.
 * @prop {boolean=} isRequired When `true`, indicates that the user must check the radio button before the owning form can be submitted. This will set `aria-required` to `true`.
 */
/** @type {React.ForwardRefExoticComponent<RadioGroupButtonProps>} */
export const RadioGroupButton = React.forwardRef(
  (
    { id: forwardedId, label, isDisabled = false, isRequired = false, value },
    forwardedRef,
  ) => {
    const defaultRef = React.useRef(null);
    const ref = forwardedRef || defaultRef;

    const defaultId = React.useId();
    const id = forwardedId || defaultId;

    const { size } = React.useContext(FieldPrimitiveContext);

    return (
      <div
        className={clsx("flex flex-wrap gap-x-2 py-2", RadioButtonStyle[size])}
      >
        <RadioGroupPrimitive.Item
          ref={ref}
          id={id}
          value={value}
          disabled={isDisabled}
          aria-disabled={isDisabled}
          aria-required={isRequired}
          className={clsx(
            "radio-button",
            "grid appearance-none place-items-center rounded-full border-2 border-brand-border",
            "transition-shadow duration-150 ease-linear",
            "focus:outline-none focus:ring-2 focus:ring-brand-focus",
            "focus-visible:ring-2 focus-visible:ring-brand-focus",
            "data-[state=checked]:border-brand-primary data-[state=checked]:bg-brand-primary",
            "data-[disabled]:bg-brand-border",
            "data-[state=checked]:data-[disabled]:border-brand-border data-[state=checked]:data-[disabled]:bg-brand-border",
          )}
        >
          <RadioGroupPrimitive.Indicator className="radio-button-indicator block rounded-full data-[state=checked]:bg-neutral-0" />
        </RadioGroupPrimitive.Item>
        <label htmlFor={id} className="block">
          {label}
        </label>
      </div>
    );
  },
);
RadioGroupButton.displayName = "RadioGroupButton";
