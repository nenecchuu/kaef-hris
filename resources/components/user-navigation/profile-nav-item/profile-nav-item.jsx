import clsx from "clsx";

import { useAuth } from "@src/lib/auth";

export function ProfileNavItem() {
  const { user } = useAuth();

  return (
    <div className="px-4 py-0.5">
      <a
        href="/profile"
        className={clsx(
          "flex w-full items-center gap-x-2 rounded-lg p-2",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-focus",
        )}
      >
        <img
          src={user.avatar_path}
          alt={`${user.name} avatar.`}
          className="h-9 w-9 shrink-0 rounded-full bg-gray-100 object-cover object-center"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{user.name}</p>
          <p className="truncate text-xs text-gray-600">
            {user.position || "Unassigned Position"}
          </p>
        </div>
      </a>
    </div>
  );
}
