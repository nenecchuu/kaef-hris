import * as React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

const DEFAULT_ID = "main-content";

export function SkipToMainContent() {
  return (
    <a
      href={`#${DEFAULT_ID}`}
      className="sr-only left-4 top-4 z-50 rounded-md bg-neutral-0 text-sm font-semibold focus:not-sr-only focus:absolute focus:p-1.5"
    >
      Skip to main content
    </a>
  );
}

export function MainContent({ children }) {
  const ref = React.useRef(null);
  const location = useLocation();
  const queryClient = useQueryClient();

  React.useEffect(() => {
    if (!location.search) {
      ref.current.scrollTo(0, 0);
    }

    queryClient.invalidateQueries(["user"]);
  }, [location, queryClient]);

  return (
    <div id={DEFAULT_ID} className="relative mt-15 flex-1 overflow-hidden">
      <main
        ref={ref}
        className="relative flex h-full flex-col gap-y-4 overflow-y-auto p-4 md:gap-y-6 md:px-6 md:py-8 xl:px-8"
      >
        {children}
      </main>
    </div>
  );
}
