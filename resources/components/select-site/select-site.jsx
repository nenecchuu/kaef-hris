import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import { getSiteOptions } from "@src/helpers/query-fns";

import { Select } from "../forms/select";

/**
 * @typedef {Object} SelectSiteCustomProps
 * @prop {import('../forms/select/select-primitive').SelectOptionType[]=} options The options that will be rendered in the select dropdown. Initial options could be opted-out or pre-defined.
 * @prop {1|0=} isPreSales When `true`, the `Pre-sales` checkbox will be checked and the options rendered are sites with type `PRE_SALES`.
 * @prop {((checked: boolean | 'indeterminate') => void)=} onPreSalesCheckedChange Event handler called when the value of `Pre-Sales` changed.
 */
/** @typedef {Omit<import('@src/components/forms').SelectProps, 'options'>} SelectProps */
/** @typedef {SelectProps&SelectSiteCustomProps} SelectSiteProps */
/** @param {SelectSiteProps} props */
export function SelectSite({
  options = [],
  isPreSales = 0,
  defaultValue,
  ...props
}) {
  // 0 non-pre-sales, 1 pre-sales
  const [siteType] = React.useState(isPreSales);
  const [site] = React.useState(defaultValue);

  const query = useQuery({
    queryKey: ["site-options", siteType],
    queryFn: getSiteOptions,
    initialData: options,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="relative">
      <Select
        {...props}
        key={`site-options-${siteType}-${query.isFetching}`}
        emptyOptionsText="No sites available."
        defaultValue={site}
        options={query.data}
        isLoading={query.isFetching}
      />
    </div>
  );
}
