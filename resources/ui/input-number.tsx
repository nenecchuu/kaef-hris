import * as React from "react";
import { useObjectRef } from "@react-aria/utils";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { NumericFormat, type NumericFormatProps } from "react-number-format";

import { cn } from "@src/lib/styling";
import { ButtonPrimitive } from "@src/ui/button";
import { Input } from "@src/ui/input";

export interface NumberInputProps
  extends Omit<NumericFormatProps, "value" | "onValueChange"> {
  stepper?: number;
  thousandSeparator?: string;
  placeholder?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  value?: number; // Controlled value
  suffix?: string;
  prefix?: string;
  onValueChange?: (value: number | undefined) => void;
  fixedDecimalScale?: boolean;
  decimalScale?: number;
  isInvalid?: boolean;
}

export const InputNumber = React.forwardRef<HTMLInputElement, NumberInputProps>(
  function InputNumber(
    {
      name,
      stepper,
      thousandSeparator,
      placeholder,
      defaultValue,
      min = -Infinity,
      max = Infinity,
      onValueChange,
      fixedDecimalScale = false,
      decimalScale = 0,
      suffix,
      prefix,
      value: controlledValue,
      ...props
    },
    forwardedRef,
  ) {
    const [value, setValue] = React.useState<number | undefined>(
      controlledValue ?? defaultValue,
    );
    const ref = useObjectRef(forwardedRef);

    const handleIncrement = React.useCallback(() => {
      setValue((prev) =>
        prev === undefined
          ? (stepper ?? 1)
          : Math.min(prev + (stepper ?? 1), max),
      );
    }, [stepper, max]);

    const handleDecrement = React.useCallback(() => {
      setValue((prev) =>
        prev === undefined
          ? -(stepper ?? 1)
          : Math.max(prev - (stepper ?? 1), min),
      );
    }, [stepper, min]);

    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (document.activeElement === ref.current) {
          if (e.key === "ArrowUp") {
            handleIncrement();
          } else if (e.key === "ArrowDown") {
            handleDecrement();
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [handleIncrement, handleDecrement, ref]);

    React.useEffect(() => {
      if (controlledValue !== undefined) {
        setValue(controlledValue);
      }
    }, [controlledValue]);

    const handleChange = (values: {
      value: string;
      floatValue: number | undefined;
    }) => {
      const newValue =
        values.floatValue === undefined ? undefined : values.floatValue;
      setValue(newValue);
      if (onValueChange) {
        onValueChange(newValue);
      }
    };

    const handleBlur = () => {
      if (value !== undefined) {
        if (value < min) {
          setValue(min);
          (ref as React.RefObject<HTMLInputElement>).current!.value =
            String(min);
        } else if (value > max) {
          setValue(max);
          (ref as React.RefObject<HTMLInputElement>).current!.value =
            String(max);
        }
      }
    };

    return (
      <div
        data-slot="control"
        className={cn(
          "relative isolate flex items-center",
          "[&>[data-slot=control]]:after:rounded-r-none",
        )}
      >
        <NumericFormat
          {...props}
          value={value}
          onValueChange={handleChange}
          thousandSeparator={thousandSeparator}
          decimalScale={decimalScale}
          fixedDecimalScale={fixedDecimalScale}
          allowNegative={min < 0}
          valueIsNumericString={true}
          onBlur={handleBlur}
          max={max}
          min={min}
          suffix={suffix}
          prefix={prefix}
          customInput={Input}
          placeholder={placeholder}
          className="relative rounded-r-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          getInputRef={ref}
        />
        <input
          name={name}
          type="hidden"
          className="sr-only"
          value={value ?? ""}
          disabled={props.disabled}
          readOnly={props.readOnly}
        />

        <div
          data-slot="stepper"
          className="flex flex-col [&_.tabler-icon]:size-[15px]"
        >
          <ButtonPrimitive
            type="button"
            aria-label="Increase value"
            className={cn(
              "h-5 rounded-lg rounded-l-none rounded-br-none border border-b-[0.5px] border-l-0 border-outline-default px-2 text-icon-tertiary",
              "focus-visible:z-10 hover:enabled:bg-background-default",
              "disabled:bg-background-disabled",
            )}
            onClick={handleIncrement}
            disabled={value === max || props.readOnly || props.disabled}
            tabIndex={-1}
          >
            <IconChevronUp />
          </ButtonPrimitive>
          <ButtonPrimitive
            type="button"
            aria-label="Decrease value"
            className={cn(
              "h-5 rounded-lg rounded-l-none rounded-tr-none border border-l-0 border-t-[0.5px] border-outline-default px-2 text-icon-tertiary",
              "focus-visible:z-10 hover:enabled:bg-background-default",
              "disabled:bg-background-disabled",
            )}
            onClick={handleDecrement}
            disabled={value === min || props.readOnly || props.disabled}
            tabIndex={-1}
          >
            <IconChevronDown />
          </ButtonPrimitive>
        </div>
      </div>
    );
  },
);
