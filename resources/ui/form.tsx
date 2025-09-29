import * as React from "react";

export type FormProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

export const Form = React.forwardRef<HTMLFormElement, FormProps>(function Form(
  { onSubmit, ...props },
  forwardedRef,
) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit?.(e);
  }

  return <form ref={forwardedRef} {...props} onSubmit={handleSubmit} />;
});
