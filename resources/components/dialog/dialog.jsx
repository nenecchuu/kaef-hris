import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

const DialogContext = React.createContext(null);
DialogContext.displayName = "DialogContext";

/** @param {import('@radix-ui/react-dialog').DialogProps} props */
export function Dialog({ children, ...props }) {
  const [defaultOpen, setDefaultOpen] = React.useState(props.defaultOpen);

  const value = React.useMemo(
    () => ({
      open: defaultOpen || props.open,
    }),
    [defaultOpen, props.open],
  );

  function handleOpenChange(state) {
    if (typeof props.onOpenChange === "function") {
      props.onOpenChange(state);
    } else {
      setDefaultOpen(state);
    }
  }

  return (
    <DialogPrimitive.Root {...props} onOpenChange={handleOpenChange}>
      <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
    </DialogPrimitive.Root>
  );
}

/** @typedef {Omit<import('@radix-ui/react-dialog').DialogContentProps, 'asChild'|'children'>} DialogPrimitiveContentProps */
/** @typedef {DialogPrimitiveContentProps&{children: React.ReactNode|(() => React.ReactNode)}} DialogContentProps */
/** @param {DialogContentProps} props */
export function DialogContent({ children, className, ...props }) {
  const { open } = React.useContext(DialogContext);

  return (
    <AnimatePresence>
      {open && (
        <DialogPrimitive.Portal forceMount={true}>
          <DialogPrimitive.Overlay asChild={true}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 grid place-items-center overflow-hidden overflow-y-auto bg-neutral-1000/30"
            >
              <DialogPrimitive.Content {...props} asChild={true}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.2,
                      ease: "easeOut",
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    transition: {
                      duration: 0.15,
                      ease: "easeIn",
                    },
                  }}
                  className={clsx(
                    "my-8 max-w-[90vw] rounded-2xl border border-neutral-1000/5 bg-neutral-0 shadow-md",
                    "focus:outline-none focus:ring-2 focus:ring-brand-focus",
                    className,
                  )}
                >
                  {typeof children === "function" ? children() : children}
                </motion.div>
              </DialogPrimitive.Content>
            </motion.div>
          </DialogPrimitive.Overlay>
        </DialogPrimitive.Portal>
      )}
    </AnimatePresence>
  );
}

export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;
