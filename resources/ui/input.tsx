import * as React from "react";
import { useObjectRef } from "@react-aria/utils";
import { IconEdit, IconPhotoQuestion, IconX } from "@tabler/icons-react";

import { cn } from "@src/lib/styling";
import { isNotEmpty } from "@src/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@src/ui/avatar";
import { ButtonPrimitive } from "@src/ui/button";
import { FieldContext } from "@src/ui/field";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  isInvalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ id, isInvalid, className, ...props }, forwardedRef) {
    const context = React.useContext(FieldContext);

    return (
      <div
        data-slot="control"
        className={cn(
          "relative isolate w-full",
          "after:pointer-events-none after:rounded-lg",
          "after:focus-within:absolute after:focus-within:inset-0 after:focus-within:ring-2 after:focus-within:ring-inset after:focus-within:ring-blue-400",
        )}
      >
        <input
          ref={forwardedRef}
          {...props}
          id={id || context?.id}
          aria-invalid={isInvalid === true ? true : undefined}
          data-invalid={isInvalid === true ? "" : undefined}
          data-disabled={props.disabled === true ? "" : undefined}
          className={cn(
            "block w-full appearance-none rounded-lg border border-outline-default bg-neutral-0 px-[calc(theme(spacing[4])-1px)] py-[calc(theme(spacing[2.5])-1px)] text-sm placeholder-icon-placeholder outline-none",
            "file:mr-4 file:cursor-pointer file:border-0 file:bg-transparent file:p-0 file:text-sm file:font-medium file:text-icon-base-primary file:outline-none file:hover:text-icon-darker-primary",
            "data-[disabled]:bg-background-disabled data-[disabled]:text-icon-tertiary data-[disabled]:placeholder-transparent",
            "data-[invalid]:border-outline-error",
            className,
          )}
          aria-describedby={
            isInvalid ? context?.errorId : context?.descriptionId
          }
        />
      </div>
    );
  },
);

type InputGroupProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export function InputGroup({ className, ...props }: InputGroupProps) {
  return (
    <div
      {...props}
      data-slot="control"
      className={cn(
        "relative isolate grid w-full grid-cols-[theme(spacing.10)_1fr_theme(spacing.10)] overflow-hidden",
        "[&>.tabler-icon:first-child]:col-start-1 [&>.tabler-icon:last-child]:col-start-3 [&>.tabler-icon]:z-10 [&>.tabler-icon]:row-start-1 [&>.tabler-icon]:size-4 [&>.tabler-icon]:place-self-center [&>.tabler-icon]:text-icon-secondary",
        "[&>[data-slot=control]]:col-span-3 [&>[data-slot=control]]:col-start-1 [&>[data-slot=control]]:row-start-1",
        "[&_button[role=combobox]]:has-[.tabler-icon:first-child]:pl-9 [&_input]:has-[.tabler-icon:first-child]:pl-9",
        "[&_input]:has-[.tabler-icon:last-child]:pr-9",
        className,
      )}
    />
  );
}

type InputPasswordProps = Omit<InputProps, "type">;

export const InputPassword = React.forwardRef<
  React.ElementRef<typeof Input>,
  InputPasswordProps
>(function InputPasswordProps(props, forwardedRef) {
  const ref = useObjectRef(forwardedRef);

  const [inputType, setInputType] = React.useState<"password" | "text">(
    "password",
  );

  function handleToggle() {
    setInputType(inputType === "password" ? "text" : "password");

    // 'defer the focus operation to the end of the stack
    setTimeout(() => {
      if (ref.current) {
        ref.current.focus();
        ref.current.setSelectionRange(
          ref.current.value.length,
          ref.current.value.length,
        );
      }
    }, 0);
  }

  return (
    <div
      data-slot="control"
      className={cn(
        "grid grid-cols-[1fr_theme(spacing.16)]",
        "[&>[data-slot=control]]:col-span-2 [&>[data-slot=control]]:col-start-1 [&>[data-slot=control]]:row-start-1",
        "[&_input]:has-[[data-slot=affix]:last-child]:pr-15",
        "[&:has([data-disabled])>[data-slot=affix]]:text-icon-secondary",
      )}
    >
      <Input ref={ref} {...props} type={inputType} />
      <ButtonPrimitive
        type="button"
        data-slot="affix"
        className="z-10 col-start-2 row-start-1 -m-0.5 place-self-center rounded p-0.5 text-sm font-semibold text-icon-base-primary"
        onClick={handleToggle}
        disabled={props.disabled}
      >
        {inputType === "password" ? "Show" : "Hide"}
      </ButtonPrimitive>
    </div>
  );
});

interface InputSearchProps extends Omit<InputProps, "type" | "onChange"> {
  onValueChange?: (value: string) => void;
  onClear?: () => void;
}

export const InputSearch = React.forwardRef<
  React.ElementRef<typeof Input>,
  InputSearchProps
>(function InputSearchProps(
  { defaultValue, value, onValueChange, onClear, ...props },
  forwardedRef,
) {
  const ref = useObjectRef(forwardedRef);

  const [inputValue, setInputValue] = React.useState(defaultValue ?? "");

  const [searchValue, setSearchValue] = React.useMemo(() => {
    const val = value ?? inputValue;
    const valChangeFn = onValueChange ?? setInputValue;

    return [val, valChangeFn] as [string, (value: string) => void];
  }, [inputValue, onValueChange, value]);

  function handleClear() {
    setSearchValue("");
    onClear?.();

    // 'defer the focus operation to the end of the stack
    setTimeout(() => {
      if (ref.current) {
        ref.current.focus();
        ref.current.setSelectionRange(
          ref.current.value.length,
          ref.current.value.length,
        );
      }
    }, 0);
  }

  return (
    <div
      data-slot="control"
      className={cn(
        "grid grid-cols-[1fr_theme(spacing.10)]",
        "[&>[data-slot=control]]:col-span-2 [&>[data-slot=control]]:col-start-1 [&>[data-slot=control]]:row-start-1",
        "[&_input]:has-[[data-slot=affix]:last-child]:pr-9",
        "[&:has([data-disabled])>[data-slot=affix]]:text-icon-secondary",
      )}
    >
      <Input
        ref={ref}
        {...props}
        type="search"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      <ButtonPrimitive
        type="button"
        data-slot="affix"
        className={cn(
          "z-10 col-start-2 row-start-1 -m-0.5 place-self-center rounded p-0.5 text-sm font-semibold text-icon-base-primary [&>.tabler-icon]:size-4 [&>.tabler-icon]:text-icon-tertiary",
          !isNotEmpty(searchValue) && "hidden",
        )}
        onClick={handleClear}
        disabled={props.disabled || !isNotEmpty(searchValue)}
        aria-label="Clear"
      >
        <IconX />
      </ButtonPrimitive>
    </div>
  );
});

interface InputAvatarProps {
  id?: string;
  name?: string;
  size?: number;
  className?: string;
  src?: string | null;
  onSelect?: (file: File) => void;
  disabled?: boolean;
}

export const InputAvatar = React.forwardRef<HTMLInputElement, InputAvatarProps>(
  function InputAvatar(
    { id, name, size = 128, src, onSelect, className, disabled },
    forwardedRef,
  ) {
    const defaultId = React.useId();
    const [preview, setPreview] = React.useState(src);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (
        e.currentTarget.value &&
        e.currentTarget.files &&
        e.currentTarget.files.length > 0
      ) {
        const file = e.currentTarget.files[0]!;

        setPreview(URL.createObjectURL(file));
        onSelect?.(file);
      }
    }

    return (
      <div
        data-slot="control"
        className={cn(
          "relative isolate size-[var(--avatar-size)]",
          "[&:has(label)>label>.tabler-icon]:size-[calc(var(--avatar-size)/8)]",
          className,
        )}
        style={{ "--avatar-size": `${size}px` } as React.CSSProperties}
      >
        <Avatar
          size={size}
          className={cn(
            "rounded-full border-dashed bg-transparent",
            "[&_.tabler-icon]:size-[calc(var(--avatar-size)/2)] [&_.tabler-icon]:text-icon-placeholder",
          )}
        >
          <AvatarImage src={preview} alt="Avatar image" />
          <AvatarFallback>
            <IconPhotoQuestion />
          </AvatarFallback>
        </Avatar>
        <input
          ref={forwardedRef}
          id={id || defaultId}
          type="file"
          accept="image/*"
          name={name}
          className="peer sr-only"
          onChange={handleChange}
          disabled={disabled}
          data-disabled={disabled ? "" : undefined}
        />
        <label
          htmlFor={id || defaultId}
          aria-label="Upload Image"
          className={cn(
            "absolute bottom-0 right-0 grid cursor-pointer place-items-center rounded-full bg-background-primary text-icon-negative hover:bg-background-darker-primary",
            "size-[calc(var(--avatar-size)/4)]",
            "peer-data-[disabled]:cursor-default peer-data-[disabled]:bg-background-disabled peer-data-[disabled]:text-icon-secondary",
          )}
        >
          <IconEdit />
        </label>
      </div>
    );
  },
);
