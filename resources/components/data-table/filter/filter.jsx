import * as React from "react";
import { IconFilter } from "@tabler/icons-react";

import { Button } from "@src/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@src/components/dialog";
import { Form } from "@src/components/forms";

/**
 * @typedef {Object} FilterProps
 * @prop {(e: import('react').FormEvent) => void} onFilterChange Even handler called when the field fields are applied.
 * @prop {() => void} onFilterReset Event handler called when the filter fields are reset.
 * @prop {boolean=} isActive When `true`, the button trigger icon is set to `text-brand-success`
 * @prop {React.ReactNode} children The fields of the filter.
 */
/** @param {FilterProps} props */
export function Filter({
  onFilterChange,
  onFilterReset,
  isActive = false,
  children,
}) {
  const formId = React.useId();

  return (
    <Dialog>
      <DialogTrigger asChild={true}>
        <Button type="button" variant="secondary" size="medium">
          <IconFilter className={isActive ? "!text-brand-success" : ""} />{" "}
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-170 divide-y divide-brand-separator"
        aria-describedby={null}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <div className="px-8 py-6">
          <DialogTitle className="text-2xl font-semibold">Filter</DialogTitle>
        </div>
        <Form
          id={formId}
          onSubmit={onFilterChange}
          onReset={onFilterReset}
          className="px-8 py-6"
        >
          {children}
        </Form>
        <div className="flex justify-end gap-x-2 px-8 py-6">
          <DialogClose asChild={true}>
            <Button
              form={formId}
              type="reset"
              variant="primary"
              styling="ghost"
            >
              Reset
            </Button>
          </DialogClose>
          <DialogClose asChild={true}>
            <Button form={formId} type="submit" variant="primary">
              Submit
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
