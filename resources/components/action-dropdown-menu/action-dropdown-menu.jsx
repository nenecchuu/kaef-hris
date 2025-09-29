import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import { UnstyledButton } from "../button";

export const ActionDropdownMenuContext = React.createContext(null);
ActionDropdownMenuContext.displayName = "ActionDropdownMenuContext";

export function ActionDropdownMenu({ children }) {
  const [open, setOpen] = React.useState(false);

  const value = React.useMemo(
    () => ({
      open,
      close: () => {
        setOpen(false);
      },
    }),
    [open],
  );

  return (
    <DropdownMenuPrimitive.Root open={open} onOpenChange={setOpen}>
      <ActionDropdownMenuContext.Provider value={value}>
        {children}
      </ActionDropdownMenuContext.Provider>
    </DropdownMenuPrimitive.Root>
  );
}

/** @typedef {Omit<import('@radix-ui/react-dropdown-menu').DropdownMenuTriggerProps, 'asChild'>} ActionDropdownMenuTriggerProps  */
/** @type {React.ForwardRefExoticComponent<ActionDropdownMenuTriggerProps&React.RefAttributes<HTMLButtonElement>>} props */
export const ActionDropdownMenuTrigger = React.forwardRef(
  function ActionDropdownMenuTrigger({ children, ...props }, forwardedRef) {
    return (
      <DropdownMenuPrimitive.Trigger ref={forwardedRef} asChild={true}>
        <UnstyledButton {...props}>{children}</UnstyledButton>
      </DropdownMenuPrimitive.Trigger>
    );
  },
);

export function ActionDropdownMenuContent({ children }) {
  const { open } = React.useContext(ActionDropdownMenuContext);

  return (
    <AnimatePresence>
      {open && (
        <DropdownMenuPrimitive.Portal forceMount={true}>
          <DropdownMenuPrimitive.DropdownMenuContent
            align="end"
            sideOffset={5}
            asChild={true}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              className="min-w-[160px] origin-top-right rounded-lg border border-neutral-1000/5 bg-neutral-0 p-2 shadow-md"
            >
              {children}
            </motion.div>
          </DropdownMenuPrimitive.DropdownMenuContent>
        </DropdownMenuPrimitive.Portal>
      )}
    </AnimatePresence>
  );
}

/**
 * @typedef {Object} ActionDropdownMenuItemCustomProps
 * @prop {boolean=} disableCloseOnSelect When `true`, the dropdown will not automatically close when the dropdown item is selected.
 */
/** @typedef {import('@radix-ui/react-dropdown-menu').DropdownMenuItemProps&ActionDropdownMenuItemCustomProps} ActionDropdownMenuItemProps */
/** @type {React.ForwardRefExoticComponent<ActionDropdownMenuItemProps>} props */
export const ActionDropdownMenuItem = React.forwardRef(
  function ActionDropdownMenuItem(
    { disableCloseOnSelect = true, onSelect, ...props },
    forwardedRef,
  ) {
    return (
      <DropdownMenuPrimitive.DropdownMenuItem
        {...props}
        ref={forwardedRef}
        className={clsx(
          "block flex cursor-pointer select-none items-center rounded px-2 py-1.5 text-sm",
          "data-[highlighted]:bg-gray-100 data-[highlighted]:outline-none",
        )}
        onSelect={(e) => {
          if (disableCloseOnSelect) {
            e.preventDefault();
          }

          if (typeof onSelect === "function") {
            onSelect(e);
          }
        }}
      />
    );
  },
);
