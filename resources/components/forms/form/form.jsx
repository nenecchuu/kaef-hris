import * as React from "react";

/** @typedef {React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>} FormProps */
/** @type {React.ForwardRefExoticComponent<FormProps>} */
export const Form = React.forwardRef(function Form(
  { onSubmit, ...props },
  forwardedRef,
) {
  const defaultRef = React.useRef(null);
  const ref = forwardedRef || defaultRef;

  function handleSubmit(e) {
    e.preventDefault();

    if (typeof onSubmit === "function") {
      onSubmit(e);
    }
  }

  return <form {...props} ref={ref} onSubmit={handleSubmit} />;
});
