import * as React from "react";
import {
  QueryClient,
  useMutation as useReactQueryMutation,
  type MutateOptions,
  type UseMutationOptions as QueryUseMutationOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { type ErrorResponse } from "@src/lib/http-client";
import { isPlainObject, validationErrorMap } from "@src/lib/utils";

interface UseMutationOptions<
  TData = unknown,
  TVariables = void,
  TContext = unknown,
> extends QueryUseMutationOptions<TData, ErrorResponse, TVariables, TContext> {
  showToast?: boolean;
}

export function useMutation<
  TData = unknown,
  TVariables = void,
  TContext = unknown,
>(
  {
    showToast = true,
    ...options
  }: UseMutationOptions<TData, TVariables, TContext>,
  queryClient?: QueryClient,
) {
  const { error, mutate, ...mutation } = useReactQueryMutation(
    {
      ...options,
      onSuccess: (data, variables, context) => {
        // dismiss any dangling toasts
        // possible case: loading toast called in `onMutate`
        toast.dismiss();

        return options.onSuccess?.(data, variables, context);
      },
      onError: (error, variables, context: TContext | undefined) => {
        // dismiss any dangling toasts
        // possible case: loading toast called in `onMutate`
        toast.dismiss();

        // show error on toast when showToast is true and it's not validation error
        if (error.status !== 422 && showToast) {
          toast.error(error.message);
        }

        return options.onError?.(error, variables, context);
      },
    },
    queryClient,
  );

  const errorField = React.useMemo(() => {
    return validationErrorMap(error?.error);
  }, [error?.error]);

  const submit = React.useCallback(
    (
      variables: TVariables,
      eventTarget?: EventTarget,
      options?: MutateOptions<TData, ErrorResponse, TVariables, TContext>,
    ) => {
      return mutate(variables, {
        ...options,
        onError: (
          error: ErrorResponse,
          variables: TVariables,
          context: TContext | undefined,
        ) => {
          // focus to the first error field in the form if presents
          if (
            eventTarget &&
            error.status === 422 &&
            isPlainObject(error.error)
          ) {
            const keys = Object.keys(error.error);
            if (keys.length > 0) {
              const name = keys[0]!;
              const el = (eventTarget as HTMLFormElement)[name] as unknown;

              setTimeout(() => {
                const elem = (
                  el instanceof RadioNodeList ? el.item(0) : el
                ) as HTMLElement;

                elem.focus();
              }, 1);
            }
          }

          return options?.onError?.(error, variables, context);
        },
      });
    },
    [mutate],
  );

  return { ...mutation, error, mutate, submit, errorField };
}
