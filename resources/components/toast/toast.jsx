import { IconCircleCheck, IconCircleX, IconLoader2 } from "@tabler/icons-react";
import clsx from "clsx";
import { toast as toastPrimitive } from "react-hot-toast";

/**
 * @typedef {Object} ToastProps
 * @prop {import('react-hot-toast').Toast} t The react-hot-toast Toast properties.
 * @prop {React.ReactNode} children The content of the toast.
 */
/** @param {ToastProps} props */
function Toast({ t, children }) {
  return (
    <div
      className={clsx(
        t.visible ? "animate-enter" : "animate-leave",
        "flex w-full max-w-xs gap-x-3 rounded-lg border border-neutral-1000/5 bg-neutral-0 p-4 shadow-md",
      )}
    >
      {children}
    </div>
  );
}

/** @typedef {import('react-hot-toast').ToastOptions} ToastPrimitiveOptionsProps */
/**
 * @typedef {Object} ToastOptionsProps
 * @prop {string=} id The id of the toast
 * @prop {string=} title The title displayed on the toast.
 * @prop {string=} description The description or message displayed on the toast.
 * @prop {number=} duration The duration of the toast visibility.
 * @prop {{label?: string, onConfirm?: (close: () => void) => void}=} confirmButtonProps The properties of 'Confirm' button. To close the toast on confirm, the close method should be called manually using `close()` callback.
 * @prop {{label?: string, onDismiss?: () => void}=} dismissButtonProps The properties of 'Dismiss' button
 */

/** @param {Omit<ToastOptionsProps, 'title'|'confirmButtonProps'|'dismissButtonProps'>} props */
function loadingToast({ id, description, duration = 4000 }) {
  return toastPrimitive.custom(
    (t) => (
      <Toast t={t}>
        <IconLoader2 className="h-5 w-5 animate-spin text-gray-700" />
        <p className="text-sm text-gray-900">{description}</p>
      </Toast>
    ),
    { id, duration },
  );
}

const SuccessAndErrorWrapperToastTypeIcon = {
  error: IconCircleX,
  success: IconCircleCheck,
};

/** @param {Omit<ToastOptionsProps, 'title'>&{title: string, type: 'success'|'error'}} props */
function successAndErrorWrapperToast({
  id,
  title,
  description,
  type = "success",
  duration = 4000,
  dismissButtonProps,
  confirmButtonProps,
}) {
  const showDismissButton = dismissButtonProps !== undefined;
  const showConfirmButton = confirmButtonProps !== undefined;
  const showCTAButtons = showDismissButton || showConfirmButton;

  const Icon = SuccessAndErrorWrapperToastTypeIcon[type];

  return toastPrimitive.custom(
    (t) => (
      <Toast t={t}>
        <Icon
          className={clsx("h-5 w-5", {
            "text-brand-danger": type === "error",
            "text-brand-success": type === "success",
          })}
        />
        <div>
          <p className="text-sm font-semibold text-gray-900">{title}</p>
          {description ? (
            <p className="mt-0.5 text-sm text-gray-900">{description}</p>
          ) : null}
          {showCTAButtons ? (
            <div className="-mx-1.5 mt-1 flex gap-x-1">
              {showDismissButton ? (
                <button
                  type="button"
                  className={clsx(
                    "select-none appearance-none rounded px-1.5 py-0.5 text-sm font-semibold text-brand-danger",
                    "focus:outline-none focus:ring-2 focus:ring-brand-focus",
                  )}
                  onClick={() => {
                    toastPrimitive.dismiss(t.id);

                    if (typeof dismissButtonProps.onDismiss === "function") {
                      dismissButtonProps.onDismiss();
                    }
                  }}
                >
                  {dismissButtonProps.label || "Dismiss"}
                </button>
              ) : null}
              {showConfirmButton ? (
                <button
                  type="button"
                  className={clsx(
                    "select-none appearance-none rounded px-1.5 py-0.5 text-sm font-semibold text-brand-info",
                    "focus:outline-none focus:ring-2 focus:ring-brand-focus",
                  )}
                  onClick={() => {
                    if (typeof confirmButtonProps.onConfirm === "function") {
                      confirmButtonProps.onConfirm(() =>
                        toastPrimitive.dismiss(t.id),
                      );
                    } else {
                      toastPrimitive.dismiss(t.id);
                    }
                  }}
                >
                  {confirmButtonProps.label || "Confirm"}
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </Toast>
    ),
    { id, duration },
  );
}

/** @param {ToastOptionsProps} props */
function errorToast({ title = "Sorry, Something Went Wrong", ...props }) {
  return successAndErrorWrapperToast({ title, type: "error", ...props });
}

/** @param {ToastOptionsProps} props */
function successToast({ title = "Success!", ...props }) {
  return successAndErrorWrapperToast({ title, type: "success", ...props });
}

export const toast = Object.assign(toastPrimitive, {
  loading: loadingToast,
  error: errorToast,
  success: successToast,
});
