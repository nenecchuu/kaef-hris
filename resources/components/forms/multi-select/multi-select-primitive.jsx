import * as React from "react";
import {
  IconCheck,
  IconLoader2,
  IconSelector,
  IconX,
} from "@tabler/icons-react";
import clsx from "clsx";
import { useMultipleSelection, useSelect } from "downshift";

import { UnstyledButton } from "@src/components/button";
import { useSelectDropdown } from "@src/hooks/use-select-dropdown";

import { FieldPrimitiveContext } from "../field-primitive";
import { InputStyle, SelectStyle } from "../forms.constants";

/**
 * @typedef {Object} MultiSelectOptionType
 * @prop {string} value
 * @prop {string} label
 * @prop {boolean=} isDisabled
 * @prop {boolean=} isParent
 */
/**
 * @typedef {Object} MultiSelectPrimitiveProps
 * @prop {string=} name The name of the multi select. Submitted with its owning form as part of a name/value pair.
 * @prop {boolean=} isDisabled When `true`, prevents the user from interacting with the multi select.
 * @prop {boolean=} isReadOnly When `true`, user cannot modify the value of the multi select.
 * @prop {boolean=} isAutoFocus When `true`, the multi select will have input focus on initial render.
 * @prop {boolean=} isRequired When `true`, indicates that the user must fill in a value before the owning form can be submitted. This will set `aria-required` to `true`.
 * @prop {boolean=} isLoading When `true`, the loading indicator will be displayed and prevents the user from modifying the value of the multi select.
 * @prop {boolean=} isClearable When `true`, user can remove the selected values using the clear button.
 * @prop {(string|MultiSelectOptionType)[]} options The options that will be rendered in the multi select dropdown.
 * @prop {string=} form The id of its owning form. Specify this value when the multi select is rendered outside the form element with which it is associated.
 * @prop {string=} placeholder The text appeared on the multi select when it has no value set.
 * @prop {string=} emptyOptionsText The text rendered on the multi select dropdown when the options are empty.
 * @prop {string[]=} defaultValue The value of the multi select when initially rendered. Use when you do not need to control the state of the multi select.
 * @prop {string[]=} value The controlled value of the multi select. Should be used in conjunction with `onValueChange`.
 * @prop {((value: (string|MultiSelectOptionType)[]) => void)=} onValueChange Event handler called when the value changes.
 * @prop {(() => void)=} onValueClear Event handler called when the value is cleared.
 * @prop {(string|((totalSelected: number) => string))=} selectedIndicatorText The customized text appeared on the multi select when it has selected values.
 */
/** @type {React.ForwardRefExoticComponent<MultiSelectPrimitiveProps&React.RefAttributes<HTMLButtonElement>>} */
export const MultiSelectPrimitive = React.forwardRef(
  (
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
      selectedIndicatorText = (total) =>
        `${total} ${total > 1 ? "options" : "option"} selected`,
    },
    forwardedRef,
  ) => {
    const defaultRef = React.useRef(null);
    const ref = forwardedRef || defaultRef;

    const { id, size, ariaDescribedBy, setAriaDescribedBy, setAriaInvalid } =
      React.useContext(FieldPrimitiveContext);

    const items = React.useMemo(
      () =>
        options.map((option) =>
          typeof option === "string"
            ? { label: option, value: option }
            : option,
        ),
      [options],
    );

    const { selectedItems, setSelectedItems, getDropdownProps, reset } =
      useMultipleSelection(
        value !== undefined
          ? { selectedItems: getSelectedItems(value, items) }
          : {
              initialSelectedItems: getSelectedItems(defaultValue, items),
            },
      );

    const {
      getToggleButtonProps,
      getMenuProps,
      getItemProps,
      highlightedIndex,
      isOpen,
      openMenu,
    } = useSelect({
      items,
      selectedItem: null,
      stateReducer: (_state, actionAndChanges) => {
        const { changes, type } = actionAndChanges;
        switch (type) {
          case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
          case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
          case useSelect.stateChangeTypes.ItemClick:
            return {
              ...changes,
              highlightedIndex: items.findIndex(
                (item) => item.value === changes.selectedItem.value,
              ),
              isOpen: true, // keep the menu open after selection.
            };
          default:
        }
        return changes;
      },
      onStateChange: ({ type, selectedItem }) => {
        switch (type) {
          case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
          case useSelect.stateChangeTypes.ItemClick: {
            if (selectedItem) {
              let newSelectedItems = [];
              if (
                selectedItems.find(
                  (option) => option.value === selectedItem.value,
                )
              ) {
                newSelectedItems = selectedItems.filter(
                  (option) => option.value !== selectedItem.value,
                );
              } else {
                newSelectedItems = [...selectedItems, selectedItem];
              }

              setSelectedItems(newSelectedItems);

              if (typeof onValueChange === "function") {
                // args will follow the type of its options.
                // for example, if the options are string[],
                // the args will also be string[],
                // else, it will be MultiSelectOptionType[]
                onValueChange(
                  typeof options[0] === "string"
                    ? newSelectedItems.map((item) => item.value)
                    : newSelectedItems,
                );
              }
            }
            break;
          }
          default: {
            break;
          }
        }
      },
    });

    const { refs, x, y, strategy } = useSelectDropdown({
      open: isOpen,
      onOpenChange: openMenu,
    });

    function handleValueClear() {
      reset();

      if (typeof onValueChange === "function") {
        onValueChange([]);
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

    const selectLabel = getSelectedItemsLabel(
      placeholder,
      selectedIndicatorText,
      selectedItems,
    );

    // selector icon
    const SelectorIcon = isLoading ? IconLoader2 : IconSelector;
    const showSelectorIcon =
      !isDisabled && !(isClearable && selectedItems.length > 0 && !isLoading);

    // show clear button
    const showClearButton =
      !isDisabled && isClearable && selectedItems.length > 0 && !isLoading;

    // input values
    const inputValues = getInputValues(selectedItems);

    // items to render
    const renderedItems = items.map((item) =>
      isReadOnly
        ? {
            ...item,
            isDisabled: !selectedItems.find(
              (selectedItem) => selectedItem.value === item.value,
            ),
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
            {...getToggleButtonProps(
              getDropdownProps({
                ref,
                id,
                preventKeyAction: isOpen,
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
                    "text-gray-500": placeholder && selectedItems.length === 0,
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
              }),
            )}
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
          {Boolean(inputValues) &&
            inputValues.map((inputValue) => (
              <input
                key={inputValue}
                type="hidden"
                className="sr-only"
                form={form}
                name={name}
                defaultValue={inputValue}
              />
            ))}
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
            <MultiSelectDropdownItem
              items={renderedItems}
              selectedItems={selectedItems}
              highlightedIndex={highlightedIndex}
              getItemProps={getItemProps}
              emptyText={emptyOptionsText}
              isLoading={isLoading}
            />
          )}
        </ul>
      </div>
    );
  },
);
MultiSelectPrimitive.displayName = "MultiSelectPrimitive";

/**
 * @typedef {Object} SelectDropdownItemProps
 * @prop {MultiSelectOptionType[]} items
 * @prop {MultiSelectOptionType[]} selectedItems
 * @prop {number} highlightedIndex
 * @prop {any} getItemProps
 * @prop {string} emptyText
 * @prop {boolean} isLoading
 */
/** @param {SelectDropdownItemProps} props */
function MultiSelectDropdownItem({
  items,
  selectedItems,
  highlightedIndex,
  getItemProps,
  emptyText,
  isLoading,
}) {
  if (isLoading) {
    return (
      <li
        key="loading-option"
        className="truncate p-2 text-center text-sm leading-4"
      >
        Loading...
      </li>
    );
  }

  if (items.length === 0) {
    return (
      <li
        key="empty-option"
        className="truncate p-2 text-center text-sm leading-4"
      >
        {emptyText}
      </li>
    );
  }

  return (
    <>
      {items.map((item, index) => {
        const isActive = selectedItems.find(
          (selected) => selected.value === item.value,
        );

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
            {...getItemProps({
              item,
              index,
              disabled: item.isDisabled,
            })}
            className={clsx("flex select-none gap-x-2 rounded p-2 text-sm", {
              "bg-background-light-primary text-icon-base-primary":
                highlightedIndex === index,
              "text-icon-base-primary": isActive,
              "!text-gray-600": item.isDisabled,
            })}
            title={item.label}
          >
            <div
              className={clsx(
                "grid h-5 w-5 shrink-0 place-items-center rounded-lg border-2 border-gray-200",
                {
                  "!border-outline-primary bg-background-primary": isActive,
                  "border-outline-primary": highlightedIndex === index,
                },
              )}
            >
              <IconCheck
                className={clsx(
                  "h-3.5 w-3.5 shrink-0",
                  isActive ? "text-neutral-0" : "text-icon-base-primary",
                  {
                    invisible: !isActive,
                  },
                )}
              />
            </div>
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
          </li>
        );
      })}
    </>
  );
}

/**
 * @param {string[]} values
 * @param {MultiSelectOptionType[]} items
 */
function getSelectedItems(values, items) {
  if (!values) {
    return [];
  }

  return values
    .map((value) => items.find((item) => item.value === value))
    .filter(Boolean);
}

/**
 * @param {string} placeholder
 * @param {string | ((totalSelected: number) => string)} selectedIndicatorText
 * @param {MultiSelectOptionType[]} selectedItems
 */
function getSelectedItemsLabel(
  placeholder,
  selectedIndicatorText,
  selectedItems,
) {
  if (selectedItems.length > 0) {
    if (typeof selectedIndicatorText === "function") {
      return selectedIndicatorText(selectedItems.length);
    }

    return `${selectedItems.length} ${selectedIndicatorText} selected`;
  }

  return placeholder;
}

/**
 * @param {MultiSelectOptionType[]} selectedItems
 */
function getInputValues(selectedItems) {
  if (selectedItems.length === 0) {
    return undefined;
  }

  return selectedItems.map((selectedItem) => selectedItem.value);
}
