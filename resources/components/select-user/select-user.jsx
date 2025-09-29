import { useQuery } from "@tanstack/react-query";

import { getUserOptions } from "@src/helpers/query-fns";

import { Select } from "../forms";

/**
 * @typedef {Object} SelectUserCustomProps
 * @prop {import('../forms/select/select-primitive').SelectOptionType[]=} options The options that will be rendered in the select dropdown. Initial options could be opted-out or pre-defined.
 */
/** @typedef {Omit<import('@src/components/forms').SelectProps, 'options'>} SelectProps */
/** @typedef {SelectProps&SelectUserCustomProps} SelectUserProps */
/** @param {SelectUserProps} props */
export function SelectUser({ options = [], ...props }) {
  const query = useQuery({
    queryKey: ["user-options"],
    queryFn: getUserOptions,
    initialData: options,
    refetchOnWindowFocus: false,
  });

  return (
    <Select
      {...props}
      key={`user-options-${query.isFetching}`}
      emptyOptionsText="No user available."
      options={query.data}
      isLoading={query.isFetching}
    />
  );
}
