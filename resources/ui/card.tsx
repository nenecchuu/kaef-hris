import * as React from "react";
import { IconChevronRight } from "@tabler/icons-react";

import { cn } from "@src/lib/styling";
import { ButtonPrimitive } from "@src/ui/button";

import { View } from "./view";

const CardContext = React.createContext<
  | {
      isCollapsible: boolean;
      isOpen: boolean;
      toggle: () => void;
    }
  | undefined
>(undefined);

interface CardProps {
  children?: React.ReactNode;
  isCollapsible?: boolean;
  defaultOpen?: boolean;
  className?: string;
}

export function Card({
  isCollapsible = false,
  defaultOpen = false,
  className,
  children,
}: CardProps) {
  const [open, setOpen] = React.useState(defaultOpen);

  const value = React.useMemo(
    () => ({
      isCollapsible,
      isOpen: open,
      toggle: () => {
        setOpen(!open);
      },
    }),
    [open, isCollapsible],
  );

  return (
    <CardContext.Provider value={value}>
      <View className={cn("divide-y divide-outline-default", className)}>
        {children}
      </View>
    </CardContext.Provider>
  );
}

function useCard(component = "Component") {
  const context = React.useContext(CardContext);

  if (context === undefined) {
    throw new Error(`${component} must be used within Card`);
  }

  return context;
}

interface CardHeaderProps {
  title?: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
}

export function CardHeader({ title, description, children }: CardHeaderProps) {
  const { isCollapsible, isOpen, toggle } = useCard("CardHeader");

  return (
    <div className="relative flex items-center gap-3 p-6 md:px-8">
      {title && (
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-icon-primary">{title}</h2>
          {description && (
            <p className="text-base text-icon-secondary">{description}</p>
          )}
        </div>
      )}
      {children}
      {isCollapsible && (
        <ButtonPrimitive
          type="button"
          className="inline-flex rounded p-1 text-icon-secondary"
          onClick={toggle}
          aria-label="Toggle collapsible"
        >
          <IconChevronRight
            className={cn(
              "size-6 transition",
              isOpen ? "rotate-90" : "rotate-0",
            )}
          />
        </ButtonPrimitive>
      )}
    </div>
  );
}

interface CardContentProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children?: React.ReactNode;
}
export function CardContent({ className, ...props }: CardContentProps) {
  const { isCollapsible, isOpen } = useCard("CardContent");

  if (isCollapsible && !isOpen) {
    return null;
  }

  return <div {...props} className={cn("p-6 md:px-8", className)} />;
}

interface CardFooterProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children?: React.ReactNode;
}

export function CardFooter({ className, ...props }: CardFooterProps) {
  const { isCollapsible, isOpen } = useCard("CardFooter");

  if (isCollapsible && !isOpen) {
    return null;
  }

  return <div {...props} className={cn("p-6 md:px-8", className)} />;
}
