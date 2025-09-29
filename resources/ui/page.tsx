import { useDocumentTitle } from "@src/hooks/use-document-title";
import { cn } from "@src/lib/styling";
import { Breadcrumb, Breadcrumbs } from "@src/ui/breadcrumbs";

interface HeaderProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  breadcrumbs?: { name: string; label: string; to?: string }[];
}

export function Header({ breadcrumbs, className, ...props }: HeaderProps) {
  return (
    <div>
      <header
        {...props}
        className={cn("flex flex-wrap items-center gap-3", className)}
      />
      {breadcrumbs && (
        <Breadcrumbs className="mb-2">
          {breadcrumbs.map((breadcrumb) => (
            <Breadcrumb key={breadcrumb.name} to={breadcrumb.to}>
              {breadcrumb.label}
            </Breadcrumb>
          ))}
        </Breadcrumbs>
      )}
    </div>
  );
}

interface TitleProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  documentTitle?: string;
}

export function Title({
  className,
  documentTitle,
  children,
  ...props
}: TitleProps) {
  const title = typeof children === "string" ? children : undefined;
  useDocumentTitle(documentTitle || title);

  return (
    <h1 {...props} className={cn("flex-1 text-2xl/8 font-semibold", className)}>
      {children}
    </h1>
  );
}
