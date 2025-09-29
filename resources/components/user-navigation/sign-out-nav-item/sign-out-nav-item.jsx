import * as React from "react";
import clsx from "clsx";

import { UnstyledButton } from "@src/components/button";
import { useAuth } from "@src/lib/auth";

export const SignOutNavItem = React.forwardRef((props, forwardedRef) => {
  const { signOut } = useAuth();

  return (
    <UnstyledButton
      {...props}
      ref={forwardedRef}
      type="button"
      className={clsx(
        "block w-full py-3 pl-8 pr-4 text-left text-sm font-semibold hover:text-icon-base-primary",
        "focus:!ring-0 focus-visible:!ring-2 focus-visible:ring-inset",
      )}
      onClick={signOut}
    >
      Sign Out
    </UnstyledButton>
  );
});
SignOutNavItem.displayName = "SignOutNavItem";
