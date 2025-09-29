import * as React from "react";

import { AuthContext } from "@src/lib/auth/provider";

export function useAuth() {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error(`useAuth must be used within AuthProvider`);
  }

  return context;
}
