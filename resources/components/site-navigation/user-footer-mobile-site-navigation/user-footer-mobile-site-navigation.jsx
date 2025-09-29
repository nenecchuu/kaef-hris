import clsx from "clsx";
import { NavLink } from "react-router-dom";

// import { UserFooterMobileSiteNavigationItem } from "@src/constants/site-navigation";
import { useAuth } from "@src/lib/auth";

export function UserFooterMobileSiteNavigation() {
  const menu = [];

  return (
    <nav>
      <h3 className="sr-only">Site Navigation</h3>
      <ul className="flex">
        {menu.map(([key, item]) => {
          const Icon = item.icon;

          return (
            <NavItem key={key} to={item.pathname}>
              <Icon />
              {item.name}
            </NavItem>
          );
        })}
      </ul>
    </nav>
  );
}

function NavItem({ children, to, ...props }) {
  return (
    <li className="w-1/4 px-1.5 py-2.5">
      <NavLink
        {...props}
        to={to}
        className={({ isActive }) =>
          clsx(
            "flex flex-col items-center gap-y-1.5 rounded p-0.5 text-[10px] font-medium leading-none",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-focus",
            "transition-colors duration-150 ease-linear",
            isActive
              ? "text-icon-base-primary [&_span]:border-brand-primary"
              : "text-gray-500 hover:text-gray-600 [&_span]:hover:border-gray-600",
          )
        }
      >
        {children}
      </NavLink>
    </li>
  );
}

export function IconProfile() {
  const { user } = useAuth();

  return (
    <span className="h-6 w-6 p-px">
      <span className="grid h-full w-full place-items-center overflow-hidden rounded-full border-2 border-gray-500">
        <img
          src={user.avatar_path}
          alt={`${user.name} avatar`}
          className="h-4 w-4 rounded-full"
        />
      </span>
    </span>
  );
}
