import { cn } from "@src/lib/styling";

type DescriptionListProps = React.HTMLAttributes<HTMLDListElement>;
export function DescriptionList({ className, ...props }: DescriptionListProps) {
  return (
    <dl
      {...props}
      className={cn("grid grid-cols-1 gap-6 md:grid-cols-2", className)}
    />
  );
}

type DescriptionItemProps = React.HTMLAttributes<HTMLDivElement>;
export function DescriptionItem({ className, ...props }: DescriptionItemProps) {
  return <div {...props} className={cn("flex flex-col gap-1", className)} />;
}

type DescriptionTermProps = React.HTMLAttributes<HTMLElement>;
export function DescriptionTerm({ className, ...props }: DescriptionTermProps) {
  return (
    <dt
      {...props}
      className={cn("text-sm font-semibold text-icon-primary", className)}
    />
  );
}
type DescriptionDetailsProps = React.HTMLAttributes<HTMLElement>;
export function DescriptionDetails({
  className,
  ...props
}: DescriptionDetailsProps) {
  return (
    <dd {...props} className={cn("text-sm text-icon-primary", className)} />
  );
}
