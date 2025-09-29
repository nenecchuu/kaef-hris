export type FormElements<U extends string> = HTMLFormControlsCollection &
  Record<U, HTMLInputElement>;
