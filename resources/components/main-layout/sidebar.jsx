import {
  AdminSiteNavigation,
  SupervisorSiteNavigation,
  UserSiteNavigation,
} from "@src/constants/site-navigation";
import { SCREEN_SIZE_MEDIUM } from "@src/constants/theme";
import { useWindowDimensions } from "@src/hooks/use-window-dimensions";
import { useAuth } from "@src/lib/auth";
import { getMenu } from "@src/utils";

import {
  SiteNavItem,
  SiteNavSubItem,
  SiteNavSubMenu,
} from "../site-navigation";
import { LogoNavItem } from "../user-navigation";

export function Sidebar() {
  const { width } = useWindowDimensions();

  if (width < SCREEN_SIZE_MEDIUM) {
    return null;
  }

  return (
    <div className="fixed inset-y-0 z-20 flex w-61 flex-col gap-y-6 bg-neutral-0 py-6 shadow-sm shadow-neutral-1000/5">
      <LogoNavItem />
      <SiteNavigation />
    </div>
  );
}

function SiteNavigation() {
  const { user } = useAuth();

  // Determine which navigation to show based on user role
  let siteNavigation;
  if (user.is_superadmin || user.is_administrator) {
    siteNavigation = AdminSiteNavigation;
  } else {
    // Check if user has supervisor permissions by checking if they have user management access
    const hasSupervisorPermissions = user.permissions.some(
      (permission) =>
        permission === "management_user_access" ||
        permission === "blocked_user_access",
    );

    if (hasSupervisorPermissions) {
      siteNavigation = SupervisorSiteNavigation;
    } else {
      siteNavigation = UserSiteNavigation;
    }
  }

  let menu = getMenu({
    menu: siteNavigation,
    userType: 1,
  });

  return (
    <nav className="flex-1 overflow-hidden overflow-y-auto">
      <h3 className="sr-only">Site Navigation</h3>
      <ul>
        {menu.map(([key, item]) => {
          if (key.startsWith("sub_menu")) {
            return (
              <SiteNavSubMenu
                key={key}
                label={item.name}
                rootPathnames={item.pathnames}
                Icon={item.icon}
              >
                {item.menu.map(([subKey, subItem]) => (
                  <SiteNavSubItem
                    key={subKey}
                    to={subItem.pathname}
                    label={subItem.name}
                    external={
                      subItem.isOnHold && subItem.pathname.startsWith("http")
                    }
                    disabled={
                      subItem.isOnHold && !subItem.pathname.startsWith("http")
                    }
                    end={subItem.end}
                  />
                ))}
              </SiteNavSubMenu>
            );
          }

          return (
            <li key={key}>
              <SiteNavItem
                to={item.pathname}
                label={item.name}
                Icon={item.icon}
                external={item.isOnHold && item.pathname.startsWith("http")}
                disabled={item.isOnHold && !item.pathname.startsWith("http")}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
