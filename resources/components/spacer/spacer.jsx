/**
 * @typedef {Object} SpacerProps
 * @prop {string} className Style the `Spacer` with css classes.
 */
/** @param {SpacerProps} props */
export function Spacer({ className }) {
  return <div className={className} aria-hidden="true" />;
}
