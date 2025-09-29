import { useQuery } from "@tanstack/react-query";

import { getDivisionOptions } from "@src/helpers/query-fns";

import { Select } from "../forms";

/**
 * @typedef {Object} SelectDivisionCustomProps
 * @prop {import('../forms/select/select-primitive').SelectOptionType[]=} options The options that will be rendered in the select dropdown. Initial options could be opted-out or pre-defined.
 */
/** @typedef {Omit<import('@src/components/forms').SelectProps, 'options'>} SelectProps */
/** @typedef {SelectProps&SelectDivisionCustomProps} SelectDivisionProps */
/** @param {SelectDivisionProps} props */
export function SelectDivision({ options = [], ...props }) {
  const query = useQuery({
    queryKey: ["division-options"],
    queryFn: getDivisionOptions,
    initialData: options,
    refetchOnWindowFocus: false,
  });

  return (
    <Select
      {...props}
      key={`division-options-${query.isFetching}`}
      emptyOptionsText="No divisions available."
      options={query.data}
      isLoading={query.isFetching}
    />
  );
}
