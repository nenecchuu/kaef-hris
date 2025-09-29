import * as React from "react";
import {
  keepPreviousData,
  QueryClient,
  useQuery,
  type DefaultError,
  type QueryKey,
  type UseQueryOptions,
} from "@tanstack/react-query";

import { isPlainObject } from "@src/lib/utils";

interface UseQueryOptionsOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> extends UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> {
  defaultData?: TData;
}

export function useQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  {
    defaultData,
    ...options
  }: UseQueryOptionsOptions<TQueryFnData, TError, TData, TQueryKey>,
  queryClient?: QueryClient,
) {
  const { data, status } = useQuery(
    {
      throwOnError: true,
      placeholderData: keepPreviousData,
      refetchOnWindowFocus: false,
      ...options,
    },
    queryClient,
  );
  const items = React.useMemo(
    () =>
      isPlainObject(data) && "data" in data
        ? (data.data as TData)
        : ((defaultData ?? []) as TData),
    [data, defaultData],
  );

  return { options: items, status };
}
