import { Button } from "@src/components/button";
import { CustomIconWarning } from "@src/components/custom-icon";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@src/components/dialog";
import { TextArea } from "@src/components/forms";
import { EARLY_CHECK_OUT, LATE_CHECK_IN } from "@src/constants/attendance";

const PromptHeader = {
  [LATE_CHECK_IN]: {
    title: "You are late!",
    description: "Provide a brief explanation for checking in late.",
  },
  [EARLY_CHECK_OUT]: {
    title: "Leaving early?",
    description: "Provide a brief explanation for checking out early.",
  },
};

/** @typedef {'LATE_CHECK_IN'|'EARLY_CHECK_OUT'} PromptStatusType */
/**
 * @typedef {Object} CheckInOutPromptProps
 * @prop {boolean} open The controlled open state of the prompt.
 * @prop {() => void=} onClose Event handler called when the prompt is closing.
 * @prop {(event: Event) => void=} onCloseAutoFocus Event handler called when focus moves to the trigger after closing. It can be prevented by calling `event.preventDefault`.
 * @prop {PromptStatusType} status The attendance status which required an explanation.
 * @prop {string=} form The form id that associated with the prompt.
 * @prop {boolean=} isLoading The loading state of prompt submission.
 * @prop {string=} errorText The error message when then `notes` on prompt submission is invalid.
 */
/** @param {CheckInOutPromptProps} props */
export function CheckInOutPrompt({
  open,
  onClose,
  onCloseAutoFocus,
  status,
  form,
  isLoading,
  errorText,
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="w-125 divide-y divide-brand-border"
        onCloseAutoFocus={onCloseAutoFocus}
      >
        <fieldset className="p-6 sm:px-8">
          <CustomIconWarning className="mx-auto" />
          <DialogTitle className="mt-2 text-center text-2xl font-semibold text-gray-900">
            {PromptHeader[status].title}
          </DialogTitle>
          <DialogDescription className="mt-2 text-center text-sm text-gray-600">
            {PromptHeader[status].description}
          </DialogDescription>
          <TextArea
            id="notes"
            name="notes"
            label="Notes"
            wrapperClassName="mt-6"
            form={form}
            showLabel={false}
            errorText={errorText}
          />
        </fieldset>
        <div className="flex justify-end gap-x-4 p-6 sm:px-8">
          <DialogClose asChild={true}>
            <Button type="button" styling="ghost" isDisabled={isLoading}>
              Close
            </Button>
          </DialogClose>
          <Button type="submit" form={form} isLoading={isLoading}>
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
