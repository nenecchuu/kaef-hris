import * as React from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";

import { formatDate } from "@src/lib/formatter";

import "react-datepicker/dist/react-datepicker.css";

import { id } from "date-fns/locale";

import { cn } from "@src/lib/styling";
import { Input } from "@src/ui/input";

registerLocale("id", id);

const VALUE_FORMAT = "yyyy-MM-dd";

interface DatePickerProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof ReactDatePicker>,
    "onChange" | "selected" | "value" | "placeholderText" | "readOnly"
  > {
  isInvalid?: boolean;
  value?: string | null;
  onChange?: (value: string | null) => void;
  defaultValue?: string;
  placeholder?: string;
  portalId?: string;
}

export const DatePicker = React.forwardRef<
  React.ElementRef<typeof ReactDatePicker>,
  DatePickerProps
>(function DatePicker(
  {
    name,
    defaultValue,
    value,
    placeholder,
    onChange,
    isInvalid,
    portalId,
    ...props
  },
  forwardedRef,
) {
  const [dateValue, setDateValue] = React.useState<Date | null>(
    defaultValue ? new Date(defaultValue) : null,
  );

  const selected = React.useMemo(() => {
    return {
      value: value ? new Date(value) : dateValue,
      onChange: onChange
        ? (val: Date | Date[] | [Date | null, Date | null] | null) => {
            if (!Array.isArray(val)) {
              onChange(
                formatDate(val ? val.toISOString() : null, VALUE_FORMAT),
              );
            }
          }
        : setDateValue,
    };
  }, [dateValue, onChange, value]);

  return (
    <div data-slot="control">
      <ReactDatePicker
        ref={forwardedRef}
        customInput={
          <Input
            isInvalid={isInvalid}
            className="cursor-default caret-transparent"
          />
        }
        {...props}
        placeholderText={placeholder}
        selected={selected.value}
        onChange={(val) => {
          if (!Array.isArray(val)) {
            selected.onChange(val);
          }
        }}
        onKeyDown={(e) => {
          e.preventDefault(); // workaround for readOnly to let the datepicker to open on focus but prevent user to type on the input
        }}
        showMonthDropdown={true}
        showYearDropdown={true}
        dropdownMode="select"
        autoComplete="off"
        portalId={portalId ?? "date-picker-root"}
        showPopperArrow={false}
        locale="id"
        dateFormat="PPP"
        clearButtonClassName={cn(
          "!grid !size-10 !place-items-center !p-0",
          "after:!-mt-1 after:!size-6 after:!rounded-none after:!bg-transparent after:!p-0 after:!text-[24px] after:!leading-none after:!text-icon-secondary after:!content-['×']",
        )}
      />
      <input
        type="hidden"
        name={name}
        value={
          formatDate(
            selected.value ? selected.value.toISOString() : null,
            VALUE_FORMAT,
          ) ?? ""
        }
        disabled={props.disabled}
      />
    </div>
  );
});

export function DatePickerDialogPortal() {
  return <div id="date-picker-root" />;
}
