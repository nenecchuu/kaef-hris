import { THEME_SIZE_MEDIUM, THEME_SIZE_SMALL } from "@src/constants/theme";

/** @typedef {import('@src/constants/theme').ThemeSizeType} FieldSizeType */

export const DEFAULT_FIELD_SIZE = THEME_SIZE_MEDIUM;

export const FieldLabelStyle = {
  [THEME_SIZE_SMALL]: "text-sm",
  [THEME_SIZE_MEDIUM]: "text-sm",
};

export const FieldTextStyle = {
  [THEME_SIZE_SMALL]: "text-xs",
  [THEME_SIZE_MEDIUM]: "text-xs",
};

export const TextAreaStyle = {
  [THEME_SIZE_SMALL]: "text-sm py-1.25 px-2",
  [THEME_SIZE_MEDIUM]: "text-sm py-2 px-3",
};

export const InputStyle = {
  [THEME_SIZE_SMALL]: "text-sm py-1.25 px-2",
  [THEME_SIZE_MEDIUM]: "text-sm py-2 px-3",
};

export const NativeSelectStyle = {
  [THEME_SIZE_SMALL]: "min-h-8.5 !pr-6 [&+svg]:h-4 [&+svg]:w-4 [&+svg]:right-2",
  [THEME_SIZE_MEDIUM]: "min-h-10 !pr-9 [&+svg]:h-4 [&+svg]:w-4 [&+svg]:right-3",
};

export const SelectStyle = {
  [THEME_SIZE_SMALL]:
    "min-h-8.5 !pr-6 [&_svg]:h-4 [&_svg]:w-4 [&_.selector]:right-2 [&+button_svg]:h-4 [&+button_svg]:w-4 [&+button]:right-2",
  [THEME_SIZE_MEDIUM]:
    "min-h-10 !pr-9 [&_svg]:h-4 [&_svg]:w-4 [&_.selector]:right-3 [&+button_svg]:h-4 [&+button_svg]:w-4 [&+button]:right-3",
};

export const SearchFieldStyle = {
  [THEME_SIZE_SMALL]:
    "!pl-8 !pr-6 [&~svg]:h-4 [&~svg]:w-4 [&~svg]:left-2 [&~button_svg]:h-4 [&~button_svg]:w-4 [&~button]:right-2",
  [THEME_SIZE_MEDIUM]:
    "!pl-10 !pr-9 [&~svg]:h-4 [&~svg]:w-4 [&~svg]:left-3 [&~button_svg]:h-4 [&~button_svg]:w-4 [&~button]:right-3",
};

export const SingleFileFieldStyle = {
  [THEME_SIZE_SMALL]:
    "!pl-8 !pr-6 [&~svg]:h-4 [&~svg]:w-4 [&~svg]:left-2 [&~button_svg]:h-4 [&~button_svg]:w-4 [&~button]:right-2",
  [THEME_SIZE_MEDIUM]:
    "!pl-10 !pr-9 [&~svg]:h-4 [&~svg]:w-4 [&~svg]:left-3 [&~button_svg]:h-4 [&~button_svg]:w-4 [&~button]:right-3",
};

export const RupiahFieldStyle = {
  [THEME_SIZE_SMALL]: "!pl-6 [&+p]:text-sm [&+p]:left-2",
  [THEME_SIZE_MEDIUM]: "!pl-7 [&+p]:text-sm [&+p]:left-3",
};

export const PasswordFieldStyle = {
  [THEME_SIZE_SMALL]:
    "!pr-6 [&~button_svg]:h-4 [&~button_svg]:w-4 [&~button]:right-2",
  [THEME_SIZE_MEDIUM]:
    "!pr-9 [&~button_svg]:h-4 [&~button_svg]:w-4 [&~button]:right-3",
};

export const DateFieldStyle = {
  [THEME_SIZE_SMALL]:
    "[&_input]:!pl-8 [&_input]:!pr-6 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:left-2 [&_button_svg]:h-4 [&_button_svg]:w-4 [&_button]:right-2",
  [THEME_SIZE_MEDIUM]:
    "[&_input]:!pl-10 [&_input]:!pr-9 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:left-3 [&_button_svg]:h-4 [&_button_svg]:w-4 [&_button]:right-3",
};

export const TextAreaDefaultRows = {
  [THEME_SIZE_SMALL]: 4,
  [THEME_SIZE_MEDIUM]: 6,
};

export const CheckboxStyle = {
  [THEME_SIZE_SMALL]:
    "[&_.checkbox]:h-5 [&_.checkbox]:w-5 [&_.checkbox]:rounded-md [&_.checkbox-icon]:h-3.5 [&_.checkbox-icon]:w-3.5 [&_label]:text-xs [&_label]:leading-5",
  [THEME_SIZE_MEDIUM]:
    "[&_.checkbox]:h-6 [&_.checkbox]:w-6 [&_.checkbox]:rounded-lg [&_.checkbox-icon]:h-4.5 [&_.checkbox-icon]:w-4.5 [&_label]:text-sm [&_label]:leading-6",
};

export const RadioButtonStyle = {
  [THEME_SIZE_SMALL]:
    "[&_.radio-button]:h-5 [&_.radio-button]:w-5 [&_label]:text-xs [&_label]:leading-5 [&_.radio-button-indicator]:h-1.5 [&_.radio-button-indicator]:w-1.5",
  [THEME_SIZE_MEDIUM]:
    "[&_.radio-button]:h-6 [&_.radio-button]:w-6 [&_label]:text-sm [&_label]:leading-6 [&_.radio-button-indicator]:h-2.5 [&_.radio-button-indicator]:w-2.5",
};
