import { useQuery } from "@tanstack/react-query";

import { getJobPositionOptions } from "@src/helpers/query-fns";

import { Select } from "../forms";

/**
 * @typedef {Object} SelectJobPositionCustomProps
 * @prop {import('../forms/select/select-primitive').SelectOptionType[]=} options The options that will be rendered in the select dropdown. Initial options could be opted-out or pre-defined.
 */
/** @typedef {Omit<import('@src/components/forms').SelectProps, 'options'>} SelectProps */
/** @typedef {SelectProps&SelectJobPositionCustomProps} SelectJobPositionProps */
/** @param {SelectJobPositionProps} props */
export function SelectJobPosition({ options = [], ...props }) {
  const query = useQuery({
    queryKey: ["job-position-options"],
    queryFn: getJobPositionOptions,
    initialData: options,
    refetchOnWindowFocus: false,
  });

  return (
    <Select
      {...props}
      key={`job-position-options-${query.isFetching}`}
      emptyOptionsText="No job positions available."
      options={query.data}
      isLoading={query.isFetching}
    />
  );
}
