import { cn } from "@src/lib/styling";

interface DashedSeparatorProps {
  className?: string;
}
export function DashedSeparator({ className }: DashedSeparatorProps) {
  return (
    <div
      style={{
        backgroundImage: `url('data:image/svg+xml,<svg width="1058" height="2" viewBox="0 0 1058 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 1H1058" stroke="%23E6E6E6" stroke-width="1.5" stroke-dasharray="8 8"/></svg>')`,
      }}
      className={cn("my-6 h-0.5", className)}
      aria-hidden={true}
    />
  );
}
