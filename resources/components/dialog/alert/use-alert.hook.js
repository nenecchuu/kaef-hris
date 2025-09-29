import * as React from "react";

import { DEFAULT_ALERT_DURATION } from "./alert";

/**
 * @typedef {Object} AlertStateProps
 * @prop {boolean} open
 * @prop {import('./alert').AlertType} type
 * @prop {string} title
 * @prop {string} description
 * @prop {number=} duration
 * @prop {(() => void)=} onClose Event handler called when the alert is closing.
 * @prop {(e: Event) => void=} onCloseAutoFocus Event handler called when focus moves to the trigger after closing. It can be prevented by calling `event.preventDefault`.
 */
/** @type {AlertStateProps} */
const defaultAlertProps = {
  title: "",
  description: "",
  type: "warning",
  open: false,
  duration: DEFAULT_ALERT_DURATION,
  onClose: undefined,
  onCloseAutoFocus: undefined,
};

export function useAlert() {
  const [state, setState] = React.useState(defaultAlertProps);

  const alert = React.useMemo(
    () => ({
      success: (/** @type {Omit<AlertStateProps, 'type'|'open'>} */ props) => {
        setState({ open: true, type: "success", ...props });
      },
      error: (/** @type {Omit<AlertStateProps, 'type'|'open'>} */ props) => {
        setState({ open: true, type: "error", ...props });
      },
      warning: (/** @type {Omit<AlertStateProps, 'type'|'open'>} */ props) => {
        setState({ open: true, type: "warning", ...props });
      },
      close: () => {
        setState((prevState) => ({ ...prevState, open: false }));
      },
    }),
    [],
  );

  const alertProps = React.useMemo(
    () => ({
      ...state,
      onClose: () => {
        setState((prevState) => ({ ...prevState, open: false }));

        if (typeof state.onClose === "function") {
          state.onClose();
        }
      },
    }),
    [state],
  );

  return { alert, alertProps };
}
