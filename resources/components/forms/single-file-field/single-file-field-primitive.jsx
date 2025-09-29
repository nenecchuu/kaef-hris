import * as React from "react";
import { IconUpload, IconX } from "@tabler/icons-react";
import clsx from "clsx";

import { UnstyledButton } from "@src/components/button";
import { truncateMiddle } from "@src/utils";

import { FieldPrimitiveContext } from "../field-primitive";
import { InputStyle, SingleFileFieldStyle } from "../forms.constants";

/** @typedef {Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'|'onChange'|'multiple'>} HTMLFileInputElementProps */
/**
 * @typedef {Object} SingleFileFieldPrimitiveCustomProps
 * @prop {boolean=} isDisabled When `true`, prevents the user from interacting with the single file field.
 * @prop {boolean=} isReadOnly When `true`, user cannot modify the value of the single file field.
 * @prop {boolean=} isAutoFocus When `true`, the single file field will have input focus on initial render.
 * @prop {boolean=} isRequired When `true`, indicates that the user must fill in a value before the owning form can be submitted. This will set `aria-required` to `true`.
 * @prop {string=} form The id of its owning form. Specify this value when the single file field is rendered outside the form element with which it is associated.
 * @prop {string=} placeholder The text appeared on the single file field when it has no value set.
 * @prop {((e: Event|null) => void)=} onFileChange Event handler called when the file changes.
 * @prop {(() => void)=} onFileClear Event handler called when the file is cleared.
 *
 */
/** @typedef {HTMLFileInputElementProps&SingleFileFieldPrimitiveCustomProps} SingleFilePrimitiveCustomProps */
/** @type {React.ForwardRefExoticComponent<SingleFilePrimitiveCustomProps>} */
export const SingleFileFieldPrimitive = React.forwardRef(
  function SingleFileFieldPrimitive(
    {
      isDisabled = false,
      isReadOnly = false,
      isAutoFocus = false,
      isRequired = false,
      placeholder,
      onFileChange,
      onFileClear,
      ...props
    },
    forwardedRef,
  ) {
    const defaultRef = React.useRef(null);
    const ref = forwardedRef || defaultRef;

    const { id, size, ariaDescribedBy, setAriaDescribedBy, setAriaInvalid } =
      React.useContext(FieldPrimitiveContext);

    const [fileName, setFileName] = React.useState(null);

    function handleFileChange(e) {
      if (e.target.value) {
        const [file] = e.target.files;

        setFileName(file.name);
      }

      if (typeof onFileChange === "function") {
        onFileChange(e);
      }
    }

    function handleFileClear() {
      setFileName(null);

      // @ts-ignore
      ref.current.type = "text";
      // @ts-ignore
      ref.current.type = "file";

      if (typeof onFileChange === "function") {
        onFileChange(null);
      }

      if (typeof onFileClear === "function") {
        onFileClear();
      }
    }

    React.useEffect(() => {
      if (isAutoFocus) {
        // @ts-ignore
        ref.current.focus();
      }
    }, [isAutoFocus, ref]);

    return (
      <div className="relative">
        <label
          htmlFor={id}
          className={clsx(
            "block w-full cursor-pointer select-none appearance-none rounded-lg border-2 border-brand-border bg-neutral-0",
            "transition-shadow duration-150 ease-linear",
            "focus:border-brand-focus focus:outline-none focus:ring-1.5 focus:ring-brand-focus/40",
            "focus-visible:border-brand-focus focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-brand-focus/40",
            {
              "bg-gray-100": isReadOnly,
              "!text-gray-500": placeholder && !fileName,
              "disabled:!border-gray-100 disabled:bg-gray-100 disabled:text-gray-600":
                isDisabled,
              "!border-brand-danger focus:!border-brand-danger focus:!ring-brand-danger/40 focus-visible:!border-brand-danger focus-visible:!ring-brand-danger/40":
                setAriaInvalid,
            },
            [InputStyle[size], SingleFileFieldStyle[size]],
          )}
        >
          {fileName ? truncateMiddle(fileName) : placeholder}
        </label>
        <IconUpload className="absolute top-1/2 -translate-y-1/2 text-gray-600" />
        <UnstyledButton
          type="button"
          className={clsx("absolute top-1/2 -translate-y-1/2 text-gray-600", {
            hidden: isReadOnly || isDisabled || !fileName,
          })}
          disabled={isReadOnly || isDisabled}
          onClick={handleFileClear}
        >
          <IconX />
        </UnstyledButton>
        <input
          {...props}
          type="file"
          ref={ref}
          id={id}
          disabled={isDisabled}
          readOnly={isReadOnly}
          aria-required={isRequired}
          aria-readonly={isReadOnly}
          aria-disabled={isDisabled}
          onChange={handleFileChange}
          className="sr-only opacity-0"
          {...(setAriaDescribedBy
            ? {
                "aria-describedby": ariaDescribedBy,
                ...(setAriaInvalid ? { "aria-invalid": true } : {}),
              }
            : {})}
        />
      </div>
    );
  },
);
