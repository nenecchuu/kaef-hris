import * as React from "react";
import {
  addWeeks,
  endOfWeek,
  format,
  isValid,
  startOfWeek,
  subWeeks,
} from "date-fns";
import { useSearchParams } from "react-router-dom";

/**
 * @param {Date} date
 */
function getRangeDateOfWeek(date) {
  const startDate = startOfWeek(date, { weekStartsOn: 1 });
  const endDate = endOfWeek(date, { weekStartsOn: 1 });

  return { start: startDate, end: endDate };
}

function getCurrentDate(date) {
  if (date && isValid(new Date(date))) {
    return new Date(date);
  }

  return new Date();
}

export function useWeekNavigation() {
  const [searchParams] = useSearchParams();

  const currentDate = getCurrentDate(searchParams.get("start_date"));
  const date = startOfWeek(currentDate, { weekStartsOn: 1 });

  const combinedSearchParams = React.useCallback(
    ({ start, end }) => {
      const params = new URLSearchParams(searchParams);

      const newParams = new URLSearchParams({
        start_date: format(start, "yyyy-MM-dd"),
        end_date: format(end, "yyyy-MM-dd"),
      });

      for (const [key, value] of newParams.entries()) {
        params.set(key, value);
      }

      return params;
    },
    [searchParams],
  );

  const value = React.useMemo(
    () => ({
      getCurrentMonth: () => format(date, "MMMM yyyy"),
      getCurrentWeek: () => getRangeDateOfWeek(date),
      getPreviousWeek: () => getRangeDateOfWeek(subWeeks(date, 1)),
      getNextWeek: () => getRangeDateOfWeek(addWeeks(date, 1)),
      getToday: () => getRangeDateOfWeek(new Date()),
      combinedSearchParams,
    }),
    [combinedSearchParams, date],
  );

  return value;
}
