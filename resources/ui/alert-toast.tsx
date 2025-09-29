import * as React from "react";

import { AlertDialog, type AlertDialogProps } from "@src/ui/alert-dialog";

interface AlertOptions {
  duration?: number | null; // null means the alert won't auto-close
}

type AlertToastFunctionProps = Omit<
  AlertDialogProps,
  "open" | "onOpenChange" | "defaultOpen" | "modal"
>;

type AlertState = (AlertToastFunctionProps & AlertOptions) | null;

let alertHandler: ((alert: AlertState) => void) | null = null;

export function AlertToaster() {
  const [alert, setAlert] = React.useState<AlertState>(null);

  const showAlert = React.useCallback((newAlert: AlertState) => {
    setAlert(newAlert);
  }, []);

  const hideAlert = React.useCallback(() => {
    alert?.onClose?.();
    setAlert(null);
  }, [alert]);

  React.useEffect(() => {
    alertHandler = showAlert;
    return () => {
      alertHandler = null;
    };
  }, [showAlert]);

  React.useEffect(() => {
    if (alert && alert.duration !== null) {
      const timer = setTimeout(() => {
        hideAlert();
      }, alert.duration || 3000); // Default to 3000ms if duration is not specified

      return () => clearTimeout(timer);
    }
  }, [alert, hideAlert]);

  if (!alert) return null;

  return <AlertDialog {...alert} open={true} onClose={hideAlert} />;
}

interface AlertToastFunction {
  (props: AlertToastFunctionProps, options?: AlertOptions): void;
  info: (
    props: Omit<AlertToastFunctionProps, "variant">,
    options?: AlertOptions,
  ) => void;
  warning: (
    props: Omit<AlertToastFunctionProps, "variant">,
    options?: AlertOptions,
  ) => void;
  success: (
    props: Omit<AlertToastFunctionProps, "variant">,
    options?: AlertOptions,
  ) => void;
  error: (
    props: Omit<AlertToastFunctionProps, "variant">,
    options?: AlertOptions,
  ) => void;
}

const createAlertToast = (): AlertToastFunction => {
  const showAlert = (
    props: Omit<AlertDialogProps, "open">,
    options: AlertOptions = {},
  ) => {
    if (alertHandler) {
      alertHandler({ ...props, ...options });
    } else {
      console.warn(
        "AlertToaster is not mounted. Make sure to add <AlertToaster /> to your app.",
      );
    }
  };

  const alertToast = ((props, options) =>
    showAlert(props, options)) as AlertToastFunction;

  alertToast.info = (props, options) =>
    showAlert({ ...props, variant: "info" }, options);
  alertToast.warning = (props, options) =>
    showAlert({ ...props, variant: "warning" }, options);
  alertToast.success = (props, options) =>
    showAlert({ ...props, variant: "success" }, options);
  alertToast.error = (props, options) =>
    showAlert({ ...props, variant: "error" }, options);

  return alertToast;
};

// eslint-disable-next-line react-refresh/only-export-components
export const alertToast = createAlertToast();
