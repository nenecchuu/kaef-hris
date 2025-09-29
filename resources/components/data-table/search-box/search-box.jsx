import { useSearchParams } from "react-router-dom";

import { Form, SearchField } from "@src/components/forms";

/**
 * @typedef {Object} SearchBoxProps
 * @prop {string=} placeholder The text appeared on the search field when it has no value set.
 */
/** @param {SearchBoxProps} props */
export function SearchBox({ ...props }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("search") || "";

  function handleSubmit(e) {
    const { value } = e.target.search;
    if (value) {
      searchParams.set("search", value);
    } else {
      searchParams.delete("search");
    }

    searchParams.delete("page"); // reset pagination

    setSearchParams(searchParams);
  }

  function handleValueClear() {
    searchParams.delete("search");
    searchParams.delete("page");

    setSearchParams(searchParams);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <SearchField
        {...props}
        key={searchValue}
        id="search"
        name="search"
        label="Search"
        size="small"
        wrapperClassName="w-full max-w-[260px]"
        defaultValue={searchValue}
        onValueClear={handleValueClear}
        showLabel={false}
      />
    </Form>
  );
}
