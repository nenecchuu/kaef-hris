import clsx from "clsx";

/** @typedef {React.DetailedHTMLProps<React.HTMLAttributes<HTMLDListElement>, HTMLDListElement>} DescriptionListProps */
/** @param {DescriptionListProps} props */
export function DescriptionList({ className, ...props }) {
  return (
    <dl
      className={clsx("grid grid-cols-1 gap-6 sm:grid-cols-2", className)}
      {...props}
    />
  );
}

/**
 * @typedef {Object} DescriptionItemCustomProps
 * @prop {string=} title The title of the item.
 * @prop {React.ReactNode} children The description of the item.
 * @prop {boolean=} isHidden When `true`, prevents user from seeing the item.
 * @prop {boolean=} setAsInnerHTML When `true`, children will be rendered with `dangerouslySetInnerHTML`
 */
/** @typedef {React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>} HTMLDivElementProps */
/** @typedef {HTMLDivElementProps&DescriptionItemCustomProps} DescriptionItemProps */
/** @param {DescriptionItemProps} props */
export function DescriptionItem({
  title,
  children,
  isHidden = false,
  setAsInnerHTML = false,
  ...props
}) {
  if (isHidden) {
    return null;
  }

  return (
    <div {...props}>
      <dt className="mb-1 text-sm font-semibold">{title}</dt>
      {setAsInnerHTML ? (
        <dd
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: children }}
        />
      ) : (
        <dd className="text-sm">{children}</dd>
      )}
    </div>
  );
}
