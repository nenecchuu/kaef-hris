import { formatNumber } from "@src/utils";

/** @param {{from: number, to: number, total: number}} TableInfoProps */
export function TableInfo({ from, to, total }) {
  return (
    <p className="text-sm text-gray-900">
      <span className="font-semibold">
        {formatNumber(from)} - {formatNumber(to)}
      </span>{" "}
      of {formatNumber(total)} entries
    </p>
  );
}
