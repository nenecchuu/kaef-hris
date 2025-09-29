import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { AnimatePresence, motion } from "framer-motion";

/**
 * @typedef {Object} TooltipType
 * @prop {string} content
 * @prop {any} children
 */
/** @param {TooltipType} TooltipProps */
export function Tooltip({ content, children }) {
  const [open, setOpen] = React.useState(false);

  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root open={open} onOpenChange={setOpen}>
        <TooltipPrimitive.Trigger asChild={true}>
          {children}
        </TooltipPrimitive.Trigger>
        <AnimatePresence>
          {open ? (
            <TooltipPrimitive.Portal>
              <TooltipPrimitive.Content sideOffset={5} asChild={true}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.1 },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    transition: { duration: 0.2 },
                  }}
                  className="w-full max-w-sm rounded-lg bg-gray-900 p-3 text-center text-sm text-neutral-0"
                >
                  <div
                    className="whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{
                      __html: content,
                    }}
                  />
                  <TooltipPrimitive.Arrow
                    className="fill-gray-900"
                    width={12}
                    height={6}
                  />
                </motion.div>
              </TooltipPrimitive.Content>
            </TooltipPrimitive.Portal>
          ) : null}
        </AnimatePresence>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
