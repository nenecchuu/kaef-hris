import * as React from "react";
import { DialogDescription } from "@radix-ui/react-dialog";

import { Button } from "@src/ui/button";

import {
  CustomIconDanger,
  CustomIconSuccess,
  CustomIconWarning,
} from "../../custom-icon";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "../dialog";

export const DEFAULT_ALERT_DURATION = 4000;

const icon = {
  success: CustomIconSuccess,
  error: CustomIconDanger,
  warning: CustomIconWarning,
};

/** @typedef {'success'|'error'|'warning'} AlertType */
/**
 * @typedef {Object} AlertProps
 * @prop {boolean} open The controlled state of the alert.
 * @prop {() => void} onClose Event handler called when the alert is closing.
 * @prop {(e: Event) => void=} onCloseAutoFocus Event handler called when focus moves to the trigger after closing. It can be prevented by calling `event.preventDefault`.
 * @prop {string} title The title of the alert.
 * @prop {string} description The description of the alert.
 * @prop {AlertType} type The type of the alert.
 * @prop {number=} duration The duration of the alert showing before closing automatically.
 */
/** @param {AlertProps} props */
export function Alert({
  title,
  description,
  type,
  open,
  onClose,
  onCloseAutoFocus,
  duration = DEFAULT_ALERT_DURATION,
}) {
  const Icon = icon[type];

  const timerRef = React.useRef(undefined);
  React.useEffect(() => {
    if (open && duration !== Infinity) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        onClose();
      }, duration);
    }

    return () => clearTimeout(timerRef.current);
  }, [duration, onClose, open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="w-100 px-6 py-8 sm:px-8"
        onCloseAutoFocus={onCloseAutoFocus}
      >
        <div className="mb-8 space-y-2">
          <Icon className="mx-auto" />
          <DialogTitle className="text-center text-2xl font-semibold text-gray-900">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-600">
            {description}
          </DialogDescription>
        </div>
        <DialogClose asChild={true}>
          <Button
            type="button"
            color="default"
            variant="outline"
            className="w-full"
          >
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
