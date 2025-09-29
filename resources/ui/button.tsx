import * as React from "react";
import { useFocusRing } from "@react-aria/focus";
import { IconLoader } from "@tabler/icons-react";
import { Link, type LinkProps } from "react-router-dom";
import { tv, type VariantProps } from "tailwind-variants";

import { cn, focusRing } from "@src/lib/styling";

type ButtonPrimitiveProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const ButtonPrimitive = React.forwardRef<
  HTMLButtonElement,
  ButtonPrimitiveProps
>(function ButtonPrimitive({ className, ...props }, forwardedRef) {
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <button
      ref={forwardedRef}
      {...props}
      {...focusProps}
      className={cn(focusRing({ isFocusVisible }), className)}
    />
  );
});

const buttonStyle = tv({
  base: [
    "relative isolate inline-flex select-none appearance-none items-center justify-center gap-2 overflow-hidden border border-transparent text-sm font-semibold",
    "[&>.tabler-icon:first-child]:-mx-0.5 [&>.tabler-icon]:shrink-0",
  ],
  variants: {
    size: {
      base: [
        "rounded-lg px-[calc(theme(spacing[4])-1px)] py-[calc(theme(spacing[2.5])-1px)]",
        "[&>.tabler-icon]:size-5",
      ],
      small: [
        "rounded-md px-[calc(theme(spacing[3])-1px)] py-[calc(theme(spacing[1.5])-1px)]",
        "[&>.tabler-icon]:size-4",
      ],
    },
    variant: {
      primary: ["text-neutral-0"],
      secondary: [],
      outline: ["border-outline-default bg-background-subtle"],
      ghost: [],
      success: ["bg-background-success text-neutral-0"],
    },
    color: {
      default: [],
      primary: [],
      info: [],
      warning: [],
      success: [],
      error: [],
    },
    disabled: {
      true: [],
    },
    isSquare: {
      true: [],
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      color: "primary",
      className: [
        "bg-background-primary [&>[data-slot=loading]]:bg-background-primary/75",
        "hover:enabled:bg-background-darker-primary [&:is(a)]:hover:bg-background-darker-primary",
      ],
    },
    {
      variant: "primary",
      color: "default",
      className: [
        "bg-background-subtle text-icon-primary [&>[data-slot=loading]]:bg-background-subtle/75",
        "hover:enabled:bg-background-default [&:is(a)]:hover:bg-background-default",
      ],
    },
    {
      variant: "primary",
      color: "info",
      className: [
        "bg-background-info [&>[data-slot=loading]]:bg-background-info/75",
        "hover:enabled:bg-background-darker-info [&:is(a)]:hover:bg-background-darker-info",
      ],
    },
    {
      variant: "primary",
      color: "warning",
      className: [
        "bg-background-warning [&>[data-slot=loading]]:bg-background-warning/75",
        "hover:enabled:bg-background-darker-warning [&:is(a)]:hover:bg-background-darker-warning",
      ],
    },
    {
      variant: "primary",
      color: "success",
      className: [
        "bg-background-success [&>[data-slot=loading]]:bg-background-success/75",
        "hover:enabled:bg-background-darker-success [&:is(a)]:hover:bg-background-darker-success",
      ],
    },
    {
      variant: "primary",
      color: "error",
      className: [
        "bg-background-error [&>[data-slot=loading]]:bg-background-error/75",
        "hover:enabled:bg-background-darker-error [&:is(a)]:hover:bg-background-darker-error",
      ],
    },

    {
      variant: "secondary",
      color: "primary",
      className: [
        "bg-background-light-primary text-icon-base-primary [&:has([data-slot=loading])]:text-icon-base-primary/25 [&>[data-slot=loading]]:text-icon-base-primary",
        "hover:enabled:text-icon-darker-primary [&:is(a)]:hover:text-icon-darker-primary",
      ],
    },
    {
      variant: "secondary",
      color: "default",
      className: [
        "bg-background-default text-icon-primary [&:has([data-slot=loading])]:text-icon-primary/25 [&>[data-slot=loading]]:text-icon-primary",
        "hover:enabled:text-icon-tertiary [&:is(a)]:hover:text-icon-tertiary",
      ],
    },
    {
      variant: "secondary",
      color: "info",
      className: [
        "bg-background-light-info text-icon-info [&:has([data-slot=loading])]:text-icon-info/25 [&>[data-slot=loading]]:text-icon-info",
        "hover:enabled:text-icon-darker-info [&:is(a)]:hover:text-icon-darker-info",
      ],
    },
    {
      variant: "secondary",
      color: "warning",
      className: [
        "bg-background-light-warning text-icon-warning [&:has([data-slot=loading])]:text-icon-warning/25 [&>[data-slot=loading]]:text-icon-warning",
        "hover:enabled:text-icon-darker-warning [&:is(a)]:hover:text-icon-darker-warning",
      ],
    },
    {
      variant: "secondary",
      color: "success",
      className: [
        "bg-background-light-success text-icon-success [&:has([data-slot=loading])]:text-icon-success/25 [&>[data-slot=loading]]:text-icon-success",
        "hover:enabled:text-icon-darker-success [&:is(a)]:hover:text-icon-darker-success",
      ],
    },
    {
      variant: "secondary",
      color: "error",
      className: [
        "bg-background-light-error text-icon-error [&:has([data-slot=loading])]:text-icon-error/25 [&>[data-slot=loading]]:text-icon-error",
        "hover:enabled:text-icon-darker-error [&:is(a)]:hover:text-icon-darker-error",
      ],
    },

    {
      variant: "outline",
      color: "primary",
      className: [
        "text-icon-base-primary [&:has([data-slot=loading])]:text-icon-base-primary/25 [&>[data-slot=loading]]:text-icon-base-primary",
        "hover:enabled:bg-background-light-primary hover:enabled:text-icon-darker-primary [&:is(a)]:hover:bg-background-light-primary [&:is(a)]:hover:text-icon-darker-primary",
      ],
    },
    {
      variant: "outline",
      color: "default",
      className: [
        "text-icon-primary [&:has([data-slot=loading])]:text-icon-primary/25 [&>[data-slot=loading]]:text-icon-primary",
        "hover:enabled:bg-background-default [&:is(a)]:hover:bg-background-default",
      ],
    },
    {
      variant: "outline",
      color: "info",
      className: [
        "text-icon-info [&:has([data-slot=loading])]:text-icon-info/25 [&>[data-slot=loading]]:text-icon-info",
        "hover:enabled:bg-background-light-info hover:enabled:text-icon-darker-info [&:is(a)]:hover:bg-background-light-info [&:is(a)]:hover:text-icon-darker-info",
      ],
    },
    {
      variant: "outline",
      color: "warning",
      className: [
        "text-icon-warning [&:has([data-slot=loading])]:text-icon-warning/25 [&>[data-slot=loading]]:text-icon-warning",
        "hover:enabled:bg-background-light-warning hover:enabled:text-icon-darker-warning [&:is(a)]:hover:bg-background-light-warning [&:is(a)]:hover:text-icon-darker-warning",
      ],
    },
    {
      variant: "outline",
      color: "success",
      className: [
        "text-icon-success [&:has([data-slot=loading])]:text-icon-success/25 [&>[data-slot=loading]]:text-icon-success",
        "hover:enabled:bg-background-light-success hover:enabled:text-icon-darker-success [&:is(a)]:hover:bg-background-light-success [&:is(a)]:hover:text-icon-darker-success",
      ],
    },
    {
      variant: "outline",
      color: "error",
      className: [
        "text-icon-error [&:has([data-slot=loading])]:text-icon-error/25 [&>[data-slot=loading]]:text-icon-error",
        "hover:enabled:bg-background-light-error hover:enabled:text-icon-darker-error [&:is(a)]:hover:bg-background-light-error [&:is(a)]:hover:text-icon-darker-error",
      ],
    },

    {
      variant: "ghost",
      color: "primary",
      className: [
        "text-icon-base-primary [&:has([data-slot=loading])]:text-icon-base-primary/25 [&>[data-slot=loading]]:text-icon-base-primary",
        "hover:enabled:bg-background-light-primary [&:is(a)]:hover:bg-background-light-primary",
      ],
    },
    {
      variant: "ghost",
      color: "default",
      className: [
        "text-icon-primary [&:has([data-slot=loading])]:text-icon-primary/25 [&>[data-slot=loading]]:text-icon-primary",
        "hover:enabled:bg-background-default [&:is(a)]:hover:bg-background-default",
      ],
    },
    {
      variant: "ghost",
      color: "info",
      className: [
        "text-icon-info [&:has([data-slot=loading])]:text-icon-info/25 [&>[data-slot=loading]]:text-icon-info",
        "hover:enabled:bg-background-light-info [&:is(a)]:hover:bg-background-light-info",
      ],
    },
    {
      variant: "ghost",
      color: "warning",
      className: [
        "text-icon-warning [&:has([data-slot=loading])]:text-icon-warning/25 [&>[data-slot=loading]]:text-icon-warning",
        "hover:enabled:bg-background-light-warning [&:is(a)]:hover:bg-background-light-warning",
      ],
    },
    {
      variant: "ghost",
      color: "success",
      className: [
        "text-icon-success [&:has([data-slot=loading])]:text-icon-success/25 [&>[data-slot=loading]]:text-icon-success",
        "hover:enabled:bg-background-light-success [&:is(a)]:hover:bg-background-light-success",
      ],
    },
    {
      variant: "ghost",
      color: "error",
      className: [
        "text-icon-error [&:has([data-slot=loading])]:text-icon-error/25 [&>[data-slot=loading]]:text-icon-error",
        "hover:enabled:bg-background-light-error [&:is(a)]:hover:bg-background-light-error",
      ],
    },

    {
      variant: "primary",
      disabled: true,
      className: [
        "bg-background-disabled text-icon-secondary",
        "[&:is(a)]:hover:bg-background-disabled",
      ],
    },
    {
      variant: "outline",
      disabled: true,
      className: ["text-icon-secondary", "[&:is(a)]:hover:text-icon-secondary"],
    },
    {
      variant: "ghost",
      disabled: true,
      className: ["text-icon-secondary", "[&:is(a)]:hover:text-icon-secondary"],
    },
    {
      isSquare: true,
      size: "base",
      className: ["size-10"],
    },
    {
      isSquare: true,
      size: "small",
      className: ["size-8"],
    },
  ],
  defaultVariants: {
    size: "base",
    variant: "primary",
    color: "primary",
    disabled: false,
    isSquare: false,
  },
});

type ButtonVariant = VariantProps<typeof buttonStyle>;
export interface ButtonProps
  extends Omit<ButtonPrimitiveProps, "color">,
    ButtonVariant {
  isLoading?: boolean;
}

export const Button = React.forwardRef<
  React.ElementRef<typeof ButtonPrimitive>,
  ButtonProps
>(function Button(
  {
    isSquare,
    size,
    variant,
    color,
    disabled,
    isLoading,
    className,
    children,
    ...props
  },
  forwardedRef,
) {
  return (
    <ButtonPrimitive
      ref={forwardedRef}
      {...props}
      className={buttonStyle({
        size,
        variant,
        color,
        disabled,
        isSquare,
        className,
      })}
      disabled={isLoading || disabled}
    >
      {children}
      {isLoading && (
        <span
          data-slot="loading"
          className="absolute inset-0 grid place-items-center [&>.tabler-icon]:animate-spin"
        >
          <IconLoader />
        </span>
      )}
    </ButtonPrimitive>
  );
});

interface ButtonLinkProps extends Omit<LinkProps, "color">, ButtonVariant {}

export function ButtonLink({
  isSquare,
  size,
  variant,
  color,
  className,
  disabled,
  to,
  children,
  ...props
}: ButtonLinkProps) {
  if (disabled || to === "") {
    return (
      <a
        {...props}
        aria-disabled={true}
        className={buttonStyle({
          size,
          variant,
          color,
          disabled: true,
          isSquare,
          className,
        })}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      {...props}
      to={to}
      className={buttonStyle({
        size,
        variant,
        color,
        isSquare,
        className,
      })}
    >
      {children}
    </Link>
  );
}
