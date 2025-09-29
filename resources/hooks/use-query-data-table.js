import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import nProgress from "nprogress";

/** @typedef {import('@tanstack/react-query').UseQueryOptions} QueryDataTableProps */
/** @param {QueryDataTableProps} options */
export function useQueryDataTable(options) {
  const query = useQuery({
    ...options,
    keepPreviousData: true,
    useErrorBoundary: true,
  });

  React.useEffect(() => {
    if (!query.isLoading && query.isFetching) {
      nProgress.start();
    }

    return () => {
      nProgress.done();
    };
  }, [query.isFetching, query.isLoading]);

  React.useEffect(() => {
    if (!query.isFetching) {
      document.querySelector("main").scrollTo(0, 0);
    }
  }, [query.isFetching]);

  return query;
}
