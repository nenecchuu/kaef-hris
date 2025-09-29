import * as React from "react";

import { env } from "@src/env";

export function useDocumentTitle(title?: string) {
  React.useEffect(() => {
    document.title = title
      ? `${title} | ${env.VITE_APP_NAME}`
      : env.VITE_APP_NAME;

    return () => {
      document.title = env.VITE_APP_NAME;
    };
  }, [title]);
}
