import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { IconCheck, IconMinus } from "@tabler/icons-react";
import clsx from "clsx";

import { CheckboxStyle, DEFAULT_FIELD_SIZE } from "../forms.constants";

/**
 * @typedef {Object} CheckboxProps
 * @prop {string=} id The id of the checkbox.
 * @prop {string=} wrapperClassName Style the checkbox wrapper with css classes.
 * @prop {string} label The label of checkbox. It should be defined to ensure accessibility.
 * @prop {boolean=} showLabel When `false`, `label` will be displayed on screen reader only.
 * @prop {import('../forms.constants').FieldSizeType=} size The size of the checkbox.
 * @prop {(boolean|'indeterminate')=} defaultChecked The checked state of the checkbox when it is initially rendered. Use when you do not need to control its checked state.
 * @prop {(boolean|'indeterminate')=} checked The controlled checked state of the checkbox. Must be used in conjunction with `onCheckedChange`.
 * @prop {((checked: boolean | 'indeterminate') => void)=} onCheckedChange Event handler called when the checked state of the checkbox changes.
 * @prop {string=} name The name of the checkbox. Submitted with its owning form as part of a name/value pair.
 * @prop {string=} value The value given as data when submitted with a name. By default, it is set to `on`.
 * @prop {boolean=} isDisabled When `true`, prevents the user from interacting with the checkbox.
 * @prop {boolean=} isRequired When `true`, indicates that the user must check the checkbox before the owning form can be submitted. This will set `aria-required` to `true`.
 */
/** @type {React.ForwardRefExoticComponent<CheckboxProps>} */
export const Checkbox = React.forwardRef(
  (
    {
      wrapperClassName,
      id: forwardedId,
      checked,
      label,
      showLabel = true,
      isDisabled = false,
      isRequired = false,
      size = DEFAULT_FIELD_SIZE,
      ...props
    },
    forwardedRef,
  ) => {
    const defaultRef = React.useRef(null);
    const ref = forwardedRef || defaultRef;

    const defaultId = React.useId();
    const id = forwardedId || defaultId;

    const IndicatorIcon = checked === "indeterminate" ? IconMinus : IconCheck;

    return (
      <div
        className={clsx("flex gap-x-2", CheckboxStyle[size], wrapperClassName)}
      >
        <CheckboxPrimitive.Root
          ref={ref}
          {...props}
          id={id}
          checked={checked}
          disabled={isDisabled}
          className={clsx(
            "checkbox inline-block appearance-none border-2 border-brand-border align-middle",
            "transition-shadow duration-150 ease-linear",
            "focus:outline-none focus:ring-2 focus:ring-brand-focus",
            "focus-visible:ring-2 focus-visible:ring-brand-focus",
            'data-[state="checked"]:border-brand-primary data-[state="checked"]:bg-brand-primary',
            'data-[state="indeterminate"]:border-brand-primary data-[state="indeterminate"]:bg-brand-primary',
            'data-[state="checked"]:data-[disabled]:border-gray-500 data-[state="checked"]:data-[disabled]:bg-gray-500',
            'data-[state="indeterminate"]:data-[disabled]:border-gray-500 data-[state="indeterminate"]:data-[disabled]:bg-gray-500',
            "data-[disabled]:bg-brand-border",
          )}
          aria-disabled={isDisabled}
          aria-required={isRequired}
        >
          <CheckboxPrimitive.CheckboxIndicator>
            <IndicatorIcon
              className={clsx("checkbox-icon mx-auto text-neutral-0")}
            />
          </CheckboxPrimitive.CheckboxIndicator>
        </CheckboxPrimitive.Root>
        <label
          htmlFor={id}
          className={clsx("block", {
            "sr-only": !showLabel,
          })}
        >
          {label}
        </label>
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";
