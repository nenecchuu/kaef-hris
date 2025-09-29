import * as React from "react";
import {
  keepPreviousData,
  QueryClient,
  useQuery,
  type DefaultError,
  type QueryKey,
  type UseQueryOptions,
} from "@tanstack/react-query";
import nProgress from "nprogress";
import { createSearchParams, useSearchParams } from "react-router-dom";

import { searchParamsToObject } from "@src/lib/utils";

type UseRecordOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>;

export function useRecord<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseRecordOptions<TQueryFnData, TError, TData, TQueryKey>,
  queryClient?: QueryClient,
) {
  const query = useQuery(
    {
      throwOnError: true,
      placeholderData: keepPreviousData,
      refetchOnWindowFocus: false,
      ...options,
    },
    queryClient,
  );

  React.useEffect(() => {
    if (!query.isLoading && query.isFetching) {
      nProgress.start();
    }

    return () => {
      nProgress.done();
    };
  }, [query.isFetching, query.isLoading]);

  return query;
}

export type RecordFilter = Record<string, string | string[]>;
export type RecordFilterChangeFn = (filter: RecordFilter) => void;

export function useRecordSearchParams(defaultFilter?: RecordFilter) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterAction = React.useMemo(() => {
    const filterObj = searchParamsToObject(searchParams);
    const filter = { ...filterObj, ...defaultFilter };

    const setFilter = (filter: RecordFilter) => {
      const newSearchParams = createSearchParams(filter);

      setSearchParams(newSearchParams, { preventScrollReset: true });
    };

    return [filter, setFilter] as [RecordFilter, RecordFilterChangeFn];
  }, [defaultFilter, searchParams, setSearchParams]);

  return filterAction;
}
