import { useQuery } from "@tanstack/react-query";

import { getExpenseCategoryOptions } from "@src/helpers/query-fns";

import { Select } from "../forms/select";

/**
 * @typedef {Object} SelectExpenseCategoryCustomProps
 * @prop {string|null} siteType The type of a site. This will render a category-specific options based on the defined site type.
 * @prop {import('../forms/select/select-primitive').SelectOptionType[]=} options The options that will be rendered in the select dropdown. Initial options could be opted-out or pre-defined.
 */
/** @typedef {Omit<import('@src/components/forms').SelectProps, 'options'>} SelectProps */
/** @typedef {SelectProps&SelectExpenseCategoryCustomProps} SelectExpenseCategoryProps */
/** @param {SelectExpenseCategoryProps} props */
export function SelectExpenseCategory({ siteType, options = [], ...props }) {
  const query = useQuery({
    queryKey: ["expense-category-options", siteType],
    queryFn: getExpenseCategoryOptions,
    initialData: options,
    refetchOnWindowFocus: false,
  });
  const uniqueItems = query.data.map((item, index) => ({
    ...item,
    key: `${item.id}-${index}`,
  }));
  return (
    <Select
      {...props}
      key={`expense-category-options-${siteType}-${query.isFetching}`}
      emptyOptionsText="No expense categories available."
      options={uniqueItems}
      isLoading={query.isFetching}
    />
  );
}
