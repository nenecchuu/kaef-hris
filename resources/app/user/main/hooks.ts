import * as React from "react";

import { UserViewContext } from "@src/app/user/main/components";

export function useUser() {
  const context = React.useContext(UserViewContext);

  if (context === undefined) {
    throw new Error(`This page must be rendered within UserView`);
  }

  return context;
}
