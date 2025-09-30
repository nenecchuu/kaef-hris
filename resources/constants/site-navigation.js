import {
  IconHome,
  IconSettings,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";

import { EMPLOYEE_TYPE_INHOUSE, EMPLOYEE_TYPE_OUTSOURCED } from "./user";

// Menu constants
const MENU_HOME = "home";
const MENU_EMPLOYEE_MANAGEMENT = "employee_management";
const MENU_USER_MANAGEMENT = "sub_menu_user_management";
const MENU_MANAGEMENT_USER = "management_user";
const MENU_BLOCKED_USER = "blocked_user";
const MENU_SETTINGS = "sub_menu_settings";
const MENU_PASSWORD_COMPLEXITY_SETUP = "password_complexity_setup";
const MENU_AUDIT_TRAIL = "audit_trail";
const MENU_PROFILE = "profile";

// Shared menu configurations - Define once, use everywhere!
const SHARED_MENUS = {
  [MENU_HOME]: {
    name: "Home",
    pathname: "/",
    icon: IconHome,
    allow: [EMPLOYEE_TYPE_INHOUSE, EMPLOYEE_TYPE_OUTSOURCED],
  },
  [MENU_EMPLOYEE_MANAGEMENT]: {
    name: "Karyawan",
    pathname: "/employees",
    icon: IconUsersGroup,
    allow: [EMPLOYEE_TYPE_INHOUSE, EMPLOYEE_TYPE_OUTSOURCED],
  },
  [MENU_USER_MANAGEMENT]: {
    name: "User",
    icon: IconUsers,
    pathnames: ["/users", "/blocked-users"],
    menu: {
      [MENU_MANAGEMENT_USER]: {
        name: "Management User",
        pathname: "/users",
        allow: [EMPLOYEE_TYPE_INHOUSE, EMPLOYEE_TYPE_OUTSOURCED],
      },
      [MENU_BLOCKED_USER]: {
        name: "Blocked User",
        pathname: "/blocked-users",
        allow: [EMPLOYEE_TYPE_INHOUSE, EMPLOYEE_TYPE_OUTSOURCED],
      },
    },
  },
  [MENU_SETTINGS]: {
    name: "Settings",
    icon: IconSettings,
    pathnames: ["/password-complexity", "/audit-trail"],
    menu: {
      [MENU_PASSWORD_COMPLEXITY_SETUP]: {
        name: "Password Complexity Setup",
        pathname: "/password-complexity",
        allow: [EMPLOYEE_TYPE_INHOUSE, EMPLOYEE_TYPE_OUTSOURCED],
      },
      [MENU_AUDIT_TRAIL]: {
        name: "Audit Trail",
        pathname: "/audit-trail",
        allow: [EMPLOYEE_TYPE_INHOUSE, EMPLOYEE_TYPE_OUTSOURCED],
      },
    },
  },
  [MENU_PROFILE]: {
    name: "Profile",
    pathname: "/profile",
    icon: IconUsers,
    allow: [EMPLOYEE_TYPE_INHOUSE, EMPLOYEE_TYPE_OUTSOURCED],
  },
};

// Helper function to pick specific menus for each role
function pickMenus(menuKeys) {
  const result = {};
  menuKeys.forEach((key) => {
    if (SHARED_MENUS[key]) {
      result[key] = SHARED_MENUS[key];
    }
  });
  return result;
}

// Role-based navigation configurations
// Now you only need to change the menu order/selection, not duplicate code!

// PT Kimia Farma HRIS Navigation
export const AdminSiteNavigation = pickMenus([
  MENU_HOME,
  MENU_EMPLOYEE_MANAGEMENT,
  MENU_USER_MANAGEMENT,
  MENU_SETTINGS,
]);

export const SupervisorSiteNavigation = pickMenus([
  MENU_HOME,
  MENU_EMPLOYEE_MANAGEMENT,
  MENU_PROFILE,
]);

export const UserSiteNavigation = pickMenus([
  MENU_HOME,
  MENU_PROFILE,
]);
