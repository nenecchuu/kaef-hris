import * as React from "react";
import {
  autoUpdate,
  flip,
  offset,
  size,
  useFloating,
} from "@floating-ui/react";

export function useSelectDropdown({ open, onOpenChange }) {
  const { x, y, refs, strategy, update } = useFloating({
    open,
    onOpenChange,
    whileElementsMounted: autoUpdate,
    placement: "bottom",
    middleware: [
      offset(5),
      flip({ padding: 8 }),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: `220px`,
          });
        },
        padding: 8,
      }),
    ],
  });

  React.useLayoutEffect(() => {
    if (open) {
      return autoUpdate(refs.reference.current, refs.floating.current, update);
    }
  }, [open, update, refs.floating, refs.reference]);

  return { x, y, refs, strategy, update };
}
