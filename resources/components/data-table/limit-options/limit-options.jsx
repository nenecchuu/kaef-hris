import { useSearchParams } from "react-router-dom";

import { NativeSelect } from "@src/components/forms";

const DEFAULT_LIMIT = "10";

export function LimitOptions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentLimit = searchParams.get("limit") || DEFAULT_LIMIT;

  function handleLimitChange(value) {
    const selectedLimit = typeof value === "string" ? value : value.value;

    searchParams.set("limit", selectedLimit);
    searchParams.delete("page"); // reset page on limit change;
    setSearchParams(searchParams);
  }

  return (
    <div className="flex shrink-0 items-center gap-1">
      <label htmlFor="limit" className="pl-0.5 text-sm font-semibold">
        Show
      </label>
      <NativeSelect
        key={currentLimit}
        id="limit"
        name="limit"
        label="Limit"
        size="small"
        defaultValue={currentLimit}
        onValueChange={handleLimitChange}
        showLabel={false}
        options={["10", "25", "50", "100"]}
      />
      <label htmlFor="limit" className="pl-0.5 text-sm font-semibold">
        Entries
      </label>
    </div>
  );
}
