import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}

export const focusRing = tv({
  base: ["outline-none"],
  variants: {
    isFocusVisible: {
      true: "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400",
    },
    isFocusField: {
      true: "after:focus-within:absolute after:focus-within:inset-0 after:focus-within:ring-2 after:focus-within:ring-inset after:focus-within:ring-blue-400",
    },
  },
});
