import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { ErrorResponse } from "@src/helpers/api-client";

/** @typedef {{error: {status: number|undefined, message: string|undefined, field: {[key:string]:any}|undefined}}} ErrorType  */
/**
 * @param {import('@tanstack/react-query').UseMutationOptions} options
 * @returns {Omit<import('@tanstack/react-query').UseMutationResult, 'error'>&ErrorType}
 */
export function useMutationForm(options) {
  const mutation = useMutation(options);

  const error = React.useMemo(() => {
    let errorObj = {
      status: undefined,
      message: undefined,
      field: undefined,
    };

    if (
      mutation.isError &&
      mutation.error instanceof ErrorResponse &&
      mutation.error.status === 422
    ) {
      errorObj = {
        status: mutation.error.status,
        message: mutation.error.message,
        field: mutation.error.error || undefined,
      };
    }
    return errorObj;
  }, [mutation.error, mutation.isError]);

  return {
    ...mutation,
    error,
  };
}
