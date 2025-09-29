import * as React from "react";
import {
  IconCheck,
  IconLoader2,
  IconSelector,
  IconX,
} from "@tabler/icons-react";
import clsx from "clsx";
import { useSelect } from "downshift";

import { UnstyledButton } from "@src/components/button";
import { useSelectDropdown } from "@src/hooks/use-select-dropdown";

import { FieldPrimitiveContext } from "../field-primitive";
import { InputStyle, SelectStyle } from "../forms.constants";

/**
 * @typedef {Object} SelectOptionType
 * @prop {string} value
 * @prop {string} label
 * @prop {boolean=} isDisabled
 * @prop {boolean=} isParent
 */
/**
 * @typedef {Object} SelectPrimitiveProps
 * @prop {string=} name The name of the select. Submitted with its owning form as part of a name/value pair.
 * @prop {boolean=} isDisabled When `true`, prevents the user from interacting with the select.
 * @prop {boolean=} isReadOnly When `true`, user cannot modify the value of the select.
 * @prop {boolean=} isAutoFocus When `true`, the select will have input focus on initial render.
 * @prop {boolean=} isRequired When `true`, indicates that the user must fill in a value before the owning form can be submitted. This will set `aria-required` to `true`.
 * @prop {boolean=} isLoading When `true`, the loading indicator will be displayed and prevents the user from modifying the value of the select.
 * @prop {boolean=} isClearable When `true`, user can remove the selected value using the clear button.
 * @prop {(string|SelectOptionType)[]} options The options that will be rendered in select dropdown.
 * @prop {string=} form The id of its owning form. Specify this value when the select is rendered outside the form element with which it is associated.
 * @prop {string=} placeholder The text appeared on the select when it has no value set.
 * @prop {string=} emptyOptionsText The text rendered on the select dropdown when the options are empty.
 * @prop {string=} defaultValue The value of the select when initially rendered. Use when you do not need to control the state of the select.
 * @prop {string=} value The controlled value of the select. Should be used in conjunction with `onValueChange`.
 * @prop {((value: string|SelectOptionType|null) => void)=} onValueChange Event handler called when the value changes.
 * @prop {(() => void)=} onValueClear Event handler called when the value is cleared.
 */
/** @type {React.ForwardRefExoticComponent<SelectPrimitiveProps&React.RefAttributes<HTMLButtonElement>>} */
export const SelectPrimitive = React.forwardRef(function SelectPrimitive(
  {
    isReadOnly,
    isRequired,
    isDisabled,
    isAutoFocus,
    options,
    name,
    placeholder = "Select option",
    emptyOptionsText = "No options available.",
    isLoading = false,
    isClearable = false,
    defaultValue,
    value,
    onValueChange,
    onValueClear,
    form,
  },
  forwardedRef,
) {
  const defaultRef = React.useRef(null);
  const ref = forwardedRef || defaultRef;

  const { id, size, ariaDescribedBy, setAriaDescribedBy, setAriaInvalid } =
    React.useContext(FieldPrimitiveContext);

  const items = React.useMemo(
    () =>
      options.map((option) =>
        typeof option === "string" ? { label: option, value: option } : option,
      ),
    [options],
  );

  const [selectedItem, setSelectedItem] = React.useState(() => {
    if (value !== undefined) {
      return getInitialSelectedItem(value, items);
    }

    if (defaultValue !== undefined) {
      return getInitialSelectedItem(defaultValue, items);
    }

    return null;
  });

  const {
    getToggleButtonProps,
    getItemProps,
    getMenuProps,
    isOpen,
    openMenu,
    closeMenu,
    highlightedIndex,
  } = useSelect({
    items,
    selectedItem,
    itemToString: (item) => item.label,
    onSelectedItemChange: ({ selectedItem: currentSelectedItem }) => {
      if (currentSelectedItem) {
        setSelectedItem(currentSelectedItem);

        if (typeof onValueChange === "function") {
          onValueChange(
            typeof options[0] === "string"
              ? currentSelectedItem.value
              : currentSelectedItem,
          );
        }
      }
    },
  });

  const { refs, x, y, strategy } = useSelectDropdown({
    open: isOpen,
    onOpenChange: openMenu,
  });

  function handleValueClear() {
    setSelectedItem(null);
    closeMenu();

    if (typeof onValueChange === "function") {
      onValueChange(null);
    }

    if (typeof onValueClear === "function") {
      onValueClear();
    }
  }

  React.useEffect(() => {
    if (isAutoFocus) {
      // @ts-ignore
      ref.current.focus();
    }
  }, [isAutoFocus, ref]);

  const selectLabel = getSelectedItemLabel(selectedItem, placeholder);

  // selector icon
  const SelectorIcon = isLoading ? IconLoader2 : IconSelector;
  const showSelectorIcon =
    !isDisabled && !(isClearable && selectedItem && !isLoading);

  // show clear button
  const showClearButton =
    !isDisabled && isClearable && selectedItem && !isLoading;

  // input value
  const inputValue = getInputValue(selectedItem);

  // items to render
  const renderedItems = items.map((item) =>
    isReadOnly
      ? {
          ...item,
          isDisabled: item.value !== selectedItem?.value,
        }
      : item,
  );

  return (
    <div className="relative">
      <div
        // @ts-ignore
        ref={refs.reference}
        className="relative"
      >
        <div
          {...getToggleButtonProps({
            ref,
            id,
            disabled: isDisabled,
            readOnly: isReadOnly,
            "aria-required": isRequired,
            "aria-readonly": isReadOnly,
            "aria-disabled": isDisabled,
            className: clsx(
              "relative truncate block w-full select-none appearance-none rounded-lg border-2 border-brand-border bg-neutral-0",
              "transition-shadow duration-150 ease-linear",
              "focus:outline-none focus:border-brand-focus focus:ring-1.5 focus:ring-brand-focus/40",
              "focus-visible:border-brand-focus focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-brand-focus/40",
              {
                "text-gray-500": placeholder && !selectedItem,
                "pointer-events-none !border-gray-100 !bg-gray-100 !text-gray-600":
                  isDisabled,
                "!border-brand-danger focus:!border-brand-danger focus:!ring-brand-danger/40 focus-visible:!border-brand-danger focus-visible:!ring-brand-danger/40":
                  setAriaInvalid,
              },
              [InputStyle[size], SelectStyle[size]],
            ),
            ...(setAriaDescribedBy
              ? {
                  "aria-describedby": ariaDescribedBy,
                  ...(setAriaInvalid ? { "aria-invalid": true } : {}),
                }
              : {}),
          })}
        >
          {selectLabel}
          {showSelectorIcon && (
            <div className="selector absolute top-1/2 -translate-y-1/2">
              <SelectorIcon
                className={clsx("!text-gray-600", {
                  "animate-spin": isLoading,
                })}
              />
            </div>
          )}
        </div>
        {showClearButton && (
          <UnstyledButton
            type="button"
            onClick={handleValueClear}
            className="absolute top-1/2 -translate-y-1/2 !text-gray-600"
            aria-label="Remove Selected Item"
          >
            <IconX />
          </UnstyledButton>
        )}
        {Boolean(inputValue) && (
          <input
            type="hidden"
            className="sr-only"
            form={form}
            name={name}
            defaultValue={inputValue}
          />
        )}
      </div>
      <ul
        {...getMenuProps({
          ref: refs.floating,
          style: {
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          },
          className: clsx(
            "z-50 overflow-y-auto rounded-lg border border-neutral-1000/5 bg-neutral-0 p-2 shadow-md",
            "focus:outline-none",
            {
              hidden: !isOpen,
            },
          ),
        })}
      >
        {isOpen && (
          <SelectDropdownItem
            items={renderedItems}
            selectedItem={selectedItem}
            highlightedIndex={highlightedIndex}
            getItemProps={getItemProps}
            emptyText={emptyOptionsText}
            isLoading={isLoading}
          />
        )}
      </ul>
    </div>
  );
});

/**
 * @typedef {Object} SelectDropdownItemProps
 * @prop {SelectOptionType[]} items
 * @prop {SelectOptionType} selectedItem
 * @prop {number} highlightedIndex
 * @prop {any} getItemProps
 * @prop {string} emptyText
 * @prop {boolean} isLoading
 */
/** @param {SelectDropdownItemProps} props */
function SelectDropdownItem({
  items,
  selectedItem,
  highlightedIndex,
  getItemProps,
  emptyText,
  isLoading,
}) {
  if (isLoading) {
    return (
      <li className="truncate p-2 text-center text-sm leading-4">Loading...</li>
    );
  }

  if (items.length === 0) {
    return (
      <li className="truncate p-2 text-center text-sm leading-4">
        {emptyText}
      </li>
    );
  }

  return (
    <>
      {items.map((item, index) => {
        const isActive = selectedItem && selectedItem.value === item.value;

        if (item.isParent) {
          return (
            <li
              key={item.value}
              className="select-none p-2 text-xs text-gray-600"
            >
              {item.label}
            </li>
          );
        }

        return (
          <li
            key={item.value}
            className={clsx(
              "flex select-none gap-x-2 rounded p-2 text-sm leading-4",
              {
                "bg-background-light-primary text-icon-base-primary":
                  highlightedIndex === index,
                "text-icon-base-primary": isActive,
                "!text-gray-600": item.isDisabled,
              },
            )}
            {...getItemProps({
              item,
              index,
              disabled: item.isDisabled,
            })}
            title={item.label}
          >
            <IconCheck
              className={clsx("h-4 w-4 shrink-0 text-icon-base-primary", {
                invisible: !isActive,
              })}
            />
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
          </li>
        );
      })}
    </>
  );
}

/**
 * @param {string} initialValue
 * @param {(SelectOptionType)[]} options
 */
function getInitialSelectedItem(initialValue, options) {
  if (!initialValue) {
    return null;
  }

  const selectedOption = options.find(
    (option) => option.value === initialValue,
  );

  return selectedOption;
}

/**
 * @param {SelectOptionType} selectedItem
 * @param {string} placeholder
 */
function getSelectedItemLabel(selectedItem, placeholder) {
  if (placeholder && !selectedItem) {
    return placeholder;
  }

  return selectedItem.label;
}

/**
 * @param {SelectOptionType|null|undefined} selectedItem
 */
function getInputValue(selectedItem) {
  if (!selectedItem) {
    return undefined;
  }

  return selectedItem.value;
}
