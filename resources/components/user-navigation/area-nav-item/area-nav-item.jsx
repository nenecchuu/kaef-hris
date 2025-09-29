import clsx from "clsx";

import { useAuth } from "@src/lib/auth";

export function AreaNavItem() {
  const { user, appType } = useAuth();

  if (!user.is_admin) {
    return null;
  }

  const pathname = appType === "admin" ? "/" : "/admin";
  const label = appType === "admin" ? "Employee" : "Admin";

  return (
    <a
      href={pathname}
      className={clsx(
        "block w-full py-3 pl-8 pr-4 text-sm font-semibold hover:text-icon-base-primary",
        "focus-visible:ring-border-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset",
      )}
    >
      {label} Area
    </a>
  );
}
