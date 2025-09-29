import * as React from "react";
import clsx from "clsx";

import {
  DEFAULT_FIELD_SIZE,
  FieldLabelStyle,
  FieldTextStyle,
} from "../forms.constants";

/** @typedef {null|{id: string, size: import('../forms.constants').FieldSizeType, setAriaDescribedBy: boolean, setAriaInvalid: boolean, ariaDescribedBy?: string}} FieldPrimitiveContextType */
/** @type {FieldPrimitiveContextType} */
const contextData = null;

export const FieldPrimitiveContext = React.createContext(contextData);
FieldPrimitiveContext.displayName = "FieldPrimitiveContext";

/**
 * @typedef {Object} FieldPrimitiveProps
 * @prop {string=} id The id of the field.
 * @prop {string=} wrapperClassName Style the field wrapper with css classes.
 * @prop {string} label The label of the field. It should be defined to ensure accessibility.
 * @prop {boolean=} showLabel When `false`, `label` will be displayed on screen reader only.
 * @prop {boolean=} withAsterisk When `true`, the asterisk symbol (*) on `label` will be displayed. This will set `aria-required` to `true`.
 * @prop {string=} hintText The additional instructions or context of the field.
 * @prop {string=} errorText The error message when the value that is entered into the field is invalid.
 * @prop {import('@src/constants/theme').ThemeSizeType=} size The size of the field.
 * @prop {React.ReactNode} children The content of the field.
 */
/** @param {FieldPrimitiveProps} props */
export function FieldPrimitive({
  children,
  wrapperClassName,
  id: forwardedId,
  label,
  hintText,
  errorText,
  showLabel = true,
  withAsterisk = false,
  size = DEFAULT_FIELD_SIZE,
}) {
  const defaultId = React.useId();
  const id = forwardedId || defaultId;

  const hintTextId = `${id}-hint-text`;
  const errorTextId = `${id}-error-text`;

  let ariaDescribedBy;
  if (hintText) {
    ariaDescribedBy = hintTextId;
  }
  if (errorText) {
    ariaDescribedBy = errorTextId;
  }

  const setAriaDescribedBy = Boolean(ariaDescribedBy);
  const setAriaInvalid = Boolean(errorText);

  const value = React.useMemo(
    () => ({
      id,
      size,
      setAriaDescribedBy,
      setAriaInvalid,
      ariaDescribedBy,
    }),
    [id, size, ariaDescribedBy, setAriaDescribedBy, setAriaInvalid],
  );

  return (
    <div {...(wrapperClassName ? { className: wrapperClassName } : {})}>
      <label
        htmlFor={id}
        className={clsx(
          "mb-2 block font-semibold",
          {
            "sr-only": !showLabel,
          },
          FieldLabelStyle[size],
        )}
      >
        {label} {withAsterisk && <span className="text-red-500">*</span>}
      </label>
      <FieldPrimitiveContext.Provider value={value}>
        {children}
      </FieldPrimitiveContext.Provider>
      {Boolean(hintText) && (
        <p id={hintTextId} className={clsx("mt-2", FieldTextStyle[size])}>
          {hintText}
        </p>
      )}
      {Boolean(errorText) && (
        <p
          id={errorTextId}
          className={clsx("mt-2 text-brand-danger", [FieldTextStyle[size]])}
        >
          {errorText}
        </p>
      )}
    </div>
  );
}
