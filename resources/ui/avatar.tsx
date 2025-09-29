import type { CSSProperties } from "react";
import * as RadixAvatar from "@radix-ui/react-avatar";

import { cn } from "@src/lib/styling";

interface AvatarProps extends RadixAvatar.AvatarProps {
  size?: number;
}

export function Avatar({ size = 32, className, ...props }: AvatarProps) {
  return (
    <RadixAvatar.Root
      {...props}
      className={cn(
        "grid place-items-center overflow-hidden border-2 border-outline-default bg-background-light-primary text-sm font-semibold text-icon-base-primary",
        "size-[calc(var(--avatar-size)+4px)]",
        className,
      )}
      style={{ "--avatar-size": `${size}px` } as CSSProperties}
    />
  );
}

interface AvatarImageProps extends Omit<RadixAvatar.AvatarImageProps, "src"> {
  src?: string | null;
}

export function AvatarImage({ src, className, ...props }: AvatarImageProps) {
  return (
    <RadixAvatar.Image
      {...props}
      src={typeof src === "string" ? src : undefined}
      className={cn("size-full object-cover object-center", className)}
    />
  );
}

type AvatarFallbackProps = RadixAvatar.AvatarFallbackProps;

export function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  return (
    <RadixAvatar.Fallback
      {...props}
      className={cn("grid size-full place-items-center", className)}
    />
  );
}
