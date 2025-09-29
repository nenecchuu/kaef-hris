import { useQuery } from "@tanstack/react-query";

import { getDepartmentOptions } from "@src/helpers/query-fns";

import { Select } from "../forms";

/**
 * @typedef {Object} SelectDepartmentCustomProps
 * @prop {import('../forms/select/select-primitive').SelectOptionType[]=} options The options that will be rendered in the select dropdown. Initial options could be opted-out or pre-defined.
 */
/** @typedef {Omit<import('@src/components/forms').SelectProps, 'options'>} SelectProps */
/** @typedef {SelectProps&SelectDepartmentCustomProps} SelectDepartmentProps */
/** @param {SelectDepartmentProps} props */
export function SelectDepartment({ options = [], ...props }) {
  const query = useQuery({
    queryKey: ["department-options"],
    queryFn: getDepartmentOptions,
    initialData: options,
    refetchOnWindowFocus: false,
  });

  return (
    <Select
      {...props}
      key={`department-options-${query.isFetching}`}
      emptyOptionsText="No departments available."
      options={query.data}
      isLoading={query.isFetching}
    />
  );
}
