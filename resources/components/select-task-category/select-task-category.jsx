import { useQuery } from "@tanstack/react-query";

import { getTaskCategoryOptions } from "@src/helpers/query-fns";

import { Select } from "../forms/select";

/**
 * @typedef {Object} SelectTaskCategoryCustomProps
 * @prop {string|null} departmentId The id of a department. This is mandatory to load the task category options.
 * @prop {import('../forms/select/select-primitive').SelectOptionType[]=} options The options that will be rendered in the select dropdown. Initial options could be opted-out or pre-defined.
 */
/** @typedef {Omit<import('@src/components/forms').SelectProps, 'options'>} SelectProps */
/** @typedef {SelectProps&SelectTaskCategoryCustomProps} SelectTaskCategoryProps */
/** @param {SelectTaskCategoryProps} props */
export function SelectTaskCategory({ departmentId, options = [], ...props }) {
  const query = useQuery({
    queryKey: ["task-category-options", departmentId],
    queryFn: getTaskCategoryOptions,
    initialData: options,
    enabled: Boolean(departmentId),
    refetchOnWindowFocus: false,
  });

  return (
    <Select
      {...props}
      key={`task-category-options-${departmentId}-${query.isFetching}`}
      emptyOptionsText="No task categories available."
      options={query.data}
      isLoading={query.isFetching}
      isDisabled={!departmentId}
    />
  );
}
