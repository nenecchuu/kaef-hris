import * as React from "react";
import { IconCheck, IconLoader2, IconSelector } from "@tabler/icons-react";
import { CommandItem } from "cmdk";

import { cn } from "@src/lib/styling";
import { Checkbox, CheckboxField } from "@src/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandLoading,
  CommandSeparator,
} from "@src/ui/command";
import { FieldContext, Label } from "@src/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@src/ui/popover";

interface MultiComboboxContextProps {
  selected: string[];
  onSelect: (value: string) => void;
}
const MultiComboboxContext = React.createContext<
  MultiComboboxContextProps | undefined
>(undefined);
MultiComboboxContext.displayName = "MultiComboboxContext";

interface MultiComboboxProps
  extends Pick<
    React.ComponentPropsWithoutRef<typeof Command>,
    "filter" | "shouldFilter"
  > {
  id?: string;
  name?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  selectedLabel?: string;
  className?: string;
  defaultValue?: string[];
  value?: string[];
  inputValue?: string;
  isSearching?: boolean;
  onInputValueChange?: (inputValue: string) => void;
  onValueChange?: (value: string[]) => void;
  children?: React.ReactNode;
}

export const MultiCombobox = React.forwardRef<
  React.ElementRef<typeof PopoverTrigger>,
  MultiComboboxProps
>(function MultiCombobox(
  {
    id,
    name,
    placeholder,
    searchPlaceholder = "Cari...",
    emptyMessage = "Data tidak ditemukan.",
    selectedLabel = "item(s) selected",
    disabled,
    isInvalid,
    className,
    defaultValue,
    value,
    onValueChange,
    inputValue,
    onInputValueChange,
    filter,
    shouldFilter,
    isSearching,
    children,
  },
  forwardedRef,
) {
  const context = React.useContext(FieldContext);
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? []);

  const contextValue = React.useMemo(() => {
    const selected = value ?? internalValue;
    const onSelect = (selectedValue: string) => {
      let newValue = structuredClone(value ?? internalValue);
      if (newValue.includes(selectedValue)) {
        newValue = newValue.filter((newVal) => newVal !== selectedValue);
      } else {
        newValue.push(selectedValue);
      }

      return onValueChange?.(newValue) ?? setInternalValue(newValue);
    };

    return { selected, onSelect };
  }, [internalValue, onValueChange, value]);

  const buttonLabel = React.useMemo(() => {
    const label = placeholder ?? "";

    if (contextValue.selected.length > 0) {
      return `${contextValue.selected.length} ${selectedLabel}`;
    }

    return label;
  }, [contextValue.selected.length, placeholder, selectedLabel]);

  const options = React.useMemo(
    () =>
      React.Children.toArray(children)
        .map((child) => {
          const node = (child as React.ReactElement<MultiComboboxItemProps>)
            .props;
          return node.value
            ? {
                label: node.children as string,
                value: node.value,
              }
            : undefined;
        })
        .filter((val) => val !== undefined),
    [children],
  );

  const getValueLabelString = React.useCallback(
    (value: string) => {
      return options.find((option) => option.value === value)?.label ?? "";
    },
    [options],
  );

  const handleFilter = React.useCallback(
    (value: string, search: string) => {
      const lowerCasedSearch = search.toLowerCase();
      const lowerCasedValue = value.toLowerCase();
      const lowerCasedValueLabel = getValueLabelString(value).toLowerCase();

      if (lowerCasedValue.includes(lowerCasedSearch)) return 1;
      if (lowerCasedValueLabel.includes(lowerCasedSearch)) return 1;
      return 0;
    },
    [getValueLabelString],
  );

  return (
    <MultiComboboxContext.Provider value={contextValue}>
      <Popover open={open} onOpenChange={setOpen}>
        <div
          data-slot="control"
          className={cn(
            "relative isolate w-full",
            "after:pointer-events-none after:rounded-lg",
            "after:focus-within:absolute after:focus-within:inset-0 after:focus-within:ring-2 after:focus-within:ring-inset after:focus-within:ring-blue-400",
          )}
        >
          <CheckboxField className="absolute -top-6.5 right-0">
            <Checkbox
              key={
                contextValue.selected.length === options.length
                  ? "all"
                  : undefined
              }
              value="1"
              size="medium"
              defaultChecked={contextValue.selected.length === options.length}
              onCheckedChange={(checked) => {
                if (checked) {
                  onValueChange?.(options.map((option) => option.value));
                  setInternalValue(options.map((option) => option.value));
                }
              }}
              disabled={contextValue.selected.length === options.length}
            />
            <Label>Semua</Label>
          </CheckboxField>
          <PopoverTrigger
            ref={forwardedRef}
            id={id || context?.id}
            name={name}
            aria-expanded={open}
            aria-invalid={isInvalid === true ? true : undefined}
            data-invalid={isInvalid === true ? "" : undefined}
            data-placeholder={
              contextValue.selected.length <= 0 ? "" : undefined
            }
            data-disabled={disabled ? "" : undefined}
            disabled={disabled}
            className={cn(
              "block h-10 w-full truncate rounded-lg border border-outline-default bg-neutral-0 py-[calc(theme(spacing[2.5])-1px)] pl-[calc(theme(spacing[4])-1px)] pr-[calc(theme(spacing[10])-1px)] text-left text-sm",
              "data-[placeholder]:text-icon-placeholder",
              "data-[disabled]:bg-background-disabled data-[disabled]:text-icon-tertiary data-[placeholder]:data-[disabled]:text-transparent",
              "data-[invalid]:border-outline-error",
              "[&_.tabler-icon]:size-4 [&_.tabler-icon]:text-icon-secondary",
              className,
            )}
            aria-describedby={
              isInvalid ? context?.errorId : context?.descriptionId
            }
          >
            <span>{buttonLabel}</span>
            <IconSelector
              data-slot="icon"
              className="absolute right-[calc(theme(spacing.4)-1px)] top-1/2 -translate-y-1/2"
            />
          </PopoverTrigger>
          {contextValue.selected.length > 0 ? (
            contextValue.selected.map((selectedInput) => (
              <input
                key={selectedInput}
                type="hidden"
                name={name}
                className="sr-only"
                disabled={disabled}
                value={selectedInput}
              />
            ))
          ) : (
            <input
              type="hidden"
              name={name}
              className="sr-only"
              disabled={disabled}
              value=""
            />
          )}
        </div>
        <PopoverContent className="p-0">
          <Command filter={filter ?? handleFilter} shouldFilter={shouldFilter}>
            <div className="relative isolate">
              <CommandInput
                placeholder={searchPlaceholder}
                value={inputValue}
                onValueChange={onInputValueChange}
              />
              {isSearching && (
                <CommandLoading className="absolute right-[calc(theme(spacing.4)-1px)] top-1/2 -translate-y-1/2">
                  <IconLoader2 className="size-4 animate-spin text-icon-secondary" />
                </CommandLoading>
              )}
            </div>
            <CommandList className="[&>[cmdk-list-sizer]]:grid [&>[cmdk-list-sizer]]:grid-cols-[theme(spacing.10)_1fr] [&>[cmdk-list-sizer]]:p-1">
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              {children}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </MultiComboboxContext.Provider>
  );
});

type MultiComboboxItemProps = React.ComponentPropsWithoutRef<
  typeof CommandItem
>;
export function MultiComboboxItem({
  className,
  children,
  value,
  ...props
}: MultiComboboxItemProps) {
  const context = React.useContext(MultiComboboxContext);

  if (context === undefined) {
    throw new Error("MultiComboboxItem must be used within MultiCombobox");
  }

  const { selected, onSelect } = context;
  const isChecked = value && selected.includes(value);

  return (
    <CommandItem
      {...props}
      value={value}
      className={cn(
        "col-span-full grid cursor-default select-none grid-cols-subgrid gap-2 rounded-md px-3.5 py-1.5 text-sm outline-none",
        "data-[selected=true]:bg-background-light-primary data-[selected=true]:text-icon-base-primary",
        "data-[state=checked]:data-[selected=true]:text-icon-base-primary data-[state=checked]:text-icon-base-primary",
        "data-[disabled=true]:text-icon-secondary",
        "[&>[data-slot=icon]]:grid [&>[data-slot=icon]]:size-5 [&>[data-slot=icon]]:place-content-center [&>[data-slot=icon]]:place-self-center [&>[data-slot=icon]]:rounded-lg [&>[data-slot=icon]]:border [&>[data-slot=icon]]:border-outline-default",
        "[&>[data-slot=icon]]:data-[selected=true]:border-outline-primary",
        "[&>[data-slot=icon]]:data-[disabled=true]:border-outline-darker [&>[data-slot=icon]]:data-[disabled=true]:bg-background-disabled [&>[data-slot=icon]]:data-[disabled=true]:text-icon-tertiary",
        "[&>[data-slot=icon]]:data-[state=checked]:border-outline-primary [&>[data-slot=icon]]:data-[state=checked]:bg-background-primary [&>[data-slot=icon]]:data-[state=checked]:text-icon-negative",
        "[&>[data-slot=icon]>.tabler-icon]:size-4",
        "[&>[data-slot=label]]:col-start-2 [&>[data-slot=label]]:self-center [&>[data-slot=label]]:truncate",
        className,
      )}
      data-state={isChecked ? "checked" : "unchecked"}
      onSelect={onSelect}
    >
      {<span data-slot="icon">{isChecked && <IconCheck />}</span>}
      <span data-slot="label">{children}</span>
    </CommandItem>
  );
}

type MultiComboboxGroupProps = React.ComponentPropsWithoutRef<
  typeof CommandGroup
>;
export function MultiComboboxGroup({
  className,
  ...props
}: MultiComboboxGroupProps) {
  return (
    <>
      <CommandGroup
        {...props}
        className={cn(
          "col-span-full grid grid-cols-subgrid",
          "[&>[cmdk-group-items]]:col-span-full [&>[cmdk-group-items]]:grid [&>[cmdk-group-items]]:grid-cols-subgrid",
          "[&>[cmdk-group-heading]]:col-span-full [&>[cmdk-group-heading]]:select-none [&>[cmdk-group-heading]]:px-3.5 [&>[cmdk-group-heading]]:py-1.5 [&>[cmdk-group-heading]]:text-xs [&>[cmdk-group-heading]]:font-medium [&>[cmdk-group-heading]]:text-icon-secondary",
          className,
        )}
      />
      <MultiComboboxSeparator />
    </>
  );
}

type MultiComboboxSeparatorProps = React.ComponentPropsWithoutRef<
  typeof CommandSeparator
>;
export function MultiComboboxSeparator({
  className,
  ...props
}: MultiComboboxSeparatorProps) {
  return (
    <CommandSeparator
      {...props}
      className={cn(
        "col-span-full mx-3.5 my-1.5 h-px bg-outline-default last:hidden",
        className,
      )}
    />
  );
}
