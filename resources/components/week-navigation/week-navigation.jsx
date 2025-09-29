import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

import { IconLinkButton, LinkButton } from "../button";
import { useWeekNavigation } from "./use-week-navigation.hook";

/**
 * @typedef {Object} RangeDateType
 * @prop {Date} start
 * @prop {Date} end
 */
/**
 * @typedef {Object} WeekNavigationProps
 * @prop {((date: RangeDateType) => void)=} onPreviousWeekChange Event handler called when the previous week value change.
 * @prop {((date: RangeDateType) => void)=} onTodayChange Event handler called when the week is set to today.
 * @prop {((date: RangeDateType) => void)=} onNextWeekChange Event handler called when the next week value change.
 */
/** @param {WeekNavigationProps} props */
export function WeekNavigation({
  onTodayChange,
  onPreviousWeekChange,
  onNextWeekChange,
}) {
  const { getPreviousWeek, getToday, getNextWeek, combinedSearchParams } =
    useWeekNavigation();

  return (
    <div className="inline-flex shrink-0 gap-x-0.5">
      <IconLinkButton
        to={`?${combinedSearchParams(getPreviousWeek())}`}
        size="small"
        variant="secondary"
        aria-label="Previous Week"
        title="Previous Week"
        onClick={() => {
          if (typeof onPreviousWeekChange === "function") {
            onPreviousWeekChange(getPreviousWeek());
          }
        }}
      >
        <IconChevronLeft />
      </IconLinkButton>
      <LinkButton
        to={`?${combinedSearchParams(getToday())}`}
        size="small"
        variant="secondary"
        onClick={() => {
          if (typeof onTodayChange === "function") {
            onTodayChange(getToday());
          }
        }}
      >
        Today
      </LinkButton>
      <IconLinkButton
        to={`?${combinedSearchParams(getNextWeek())}`}
        size="small"
        variant="secondary"
        aria-label="Next Week"
        title="Next Week"
        onClick={() => {
          if (typeof onNextWeekChange === "function") {
            onNextWeekChange(getNextWeek());
          }
        }}
      >
        <IconChevronRight />
      </IconLinkButton>
    </div>
  );
}
