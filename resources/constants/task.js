import { eachYearOfInterval, lightFormat } from "date-fns";

import { THEME_VARIANT_SUCCESS, THEME_VARIANT_WARNING } from "./theme";

export const MINIMUM_TASKS_WEIGHT = 7.0;

export const TASK_TYPE_WORKING_HOURS = "NORMAL";
export const TASK_TYPE_OVERTIME = "OVERTIME";

export const TASK_STATUS_APPROVED = "APPROVED";
export const TASK_STATUS_PENDING = "PENDING";

export const TaskTypeLabel = {
  [TASK_TYPE_WORKING_HOURS]: "Working Hours",
  [TASK_TYPE_OVERTIME]: "Overtime",
};

export const TaskStatusLabel = {
  [TASK_STATUS_APPROVED]: "Approved",
  [TASK_STATUS_PENDING]: "Pending",
};

export const TaskStatusVariant = {
  [TASK_STATUS_APPROVED]: THEME_VARIANT_SUCCESS,
  [TASK_STATUS_PENDING]: THEME_VARIANT_WARNING,
};

export const WeightOptions = [
  "0.5",
  "1",
  "1.5",
  "2",
  "2.5",
  "3",
  "3.5",
  "4",
  "4.5",
  "5",
  "5.5",
  "6",
  "6.5",
  "7",
  "7.5",
  "8",
];

export const TaskTypeOptions = [
  {
    label: TaskTypeLabel[TASK_TYPE_WORKING_HOURS],
    value: TASK_TYPE_WORKING_HOURS,
  },
  {
    label: TaskTypeLabel[TASK_TYPE_OVERTIME],
    value: TASK_TYPE_OVERTIME,
  },
];

export const TaskStatusOptions = [
  {
    label: TaskStatusLabel[TASK_STATUS_PENDING],
    value: TASK_STATUS_PENDING,
  },
  {
    label: TaskStatusLabel[TASK_STATUS_APPROVED],
    value: TASK_STATUS_APPROVED,
  },
];

export const YearOptions = eachYearOfInterval({
  start: new Date(2017, 0, 1),
  end: new Date(),
}).map((date) => lightFormat(date, "yyyy"));

export const MonthOptions = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];
