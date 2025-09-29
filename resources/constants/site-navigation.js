import {
  IconBook,
  IconBriefcase,
  IconClock,
  IconCreditCard,
  IconExternalLink,
  IconFileReport,
  IconHeadset,
  IconHome,
  IconKey,
  IconSettings,
  IconUsers,
  IconUsersGroup,
  IconUserX,
} from "@tabler/icons-react";

import { EMPLOYEE_TYPE_INHOUSE, EMPLOYEE_TYPE_OUTSOURCED } from "./user";

// Menu constants
const MENU_HOME = "home";
const MENU_USER_MANAGEMENT = "sub_menu_user_management";
const MENU_MANAGEMENT_USER = "management_user";
const MENU_BLOCKED_USER = "blocked_user";
const MENU_SETTINGS = "sub_menu_settings";
const MENU_PASSWORD_COMPLEXITY_SETUP = "password_complexity_setup";
const MENU_AUDIT_TRAIL = "audit_trail";
const MENU_BIJPEDIA = "bijpedia";
const MENU_FINANCING = "sub_menu_financing";
const MENU_PENGAJUAN = "pengajuan";
const MENU_ANALISA = "analisa";
const MENU_KOMITE = "komite";
const MENU_AKAD = "akad";
const MENU_PENCAIRAN = "pencairan";
const MENU_MONITORING = "monitoring";
const MENU_LAPORAN_FINANCING = "laporan_financing";
const MENU_GENERAL_AFFAIR = "general_affair";
const MENU_HUMAN_RESOURCE = "human_resource";
const MENU_REPORTING = "reporting";
const MENU_HELP_DESK = "help_desk";
const MENU_PROFILE = "profile";

// Shared menu configurations - Define once, use everywhere!
const SHARED_MENUS = {
  [MENU_HOME]: {
    name: "Home",
    pathname: "/",
    icon: IconHome,
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
  [MENU_BIJPEDIA]: {
    name: "BIJPedia",
    pathname: "https://chatgpt.com/g/g-68b8e26233d48191ad8cdaedcebcfe19-ojekapedia",
    icon: IconBook,
    allow: [EMPLOYEE_TYPE_INHOUSE, EMPLOYEE_TYPE_OUTSOURCED],
    isOnHold: true, // External link
  },
  [MENU_FINANCING]: {
    name: "Financing",
    icon: IconCreditCard,
    pathnames: [
      "/pengajuan",
      "/analisa",
      "/komite",
      "/akad",
      "/pencairan",
      "/monitoring",
      "/laporan-financing",
    ],
    isOnHold: true, // Disabled
    menu: {
      [MENU_PENGAJUAN]: {
        name: "Pengajuan",
        pathname: "/pengajuan",
        allow: [EMPLOYEE_TYPE_INHOUSE, EMPLOYEE_TYPE_OUTSOURCED],
        isOnHold: true,
      },
      [MENU_ANALISA]: {
        name: "Analisa",
        pathname: "/analisa",
        allow: [EMPLOYEE_TYPE_INHOUSE, EMPLOYEE_TYPE_OUTSOURCED],
        isOnHold: true,
      },
      [MENU_KOMITE]: {
        name: "Komite",
        pathname: "/komite",
        allow: [EMPLOYEE_TYPE_INHOUSE, EMPLOYEE_TYPE_OUTSOURCED],
        isOnHold: true,
      },
      [MENU_AKAD]: {
        name: "Akad",
        pathname: "/akad",
        allow: [EMPLOYEE_TYPE_INHOUSE, EMPLOYEE_TYPE_OUTSOURCED],
        isOnHold: true,
      },
      [MENU_PENCAIRAN]: {
        name: "Pencairan",
        pathname: "/pencairan",
        allow: [EMPLOYEE_TYPE_INHOUSE, EMPLOYEE_TYPE_OUTSOURCED],
        isOnHold: true,
      },
      [MENU_MONITORING]: {
        name: "Monitoring",
        pathname: "/monitoring",
        allow: [EMPLOYEE_TYPE_INHOUSE, EMPLOYEE_TYPE_OUTSOURCED],
        isOnHold: true,
      },
      [MENU_LAPORAN_FINANCING]: {
        name: "Laporan",
        pathname: "/laporan-financing",
        allow: [EMPLOYEE_TYPE_INHOUSE, EMPLOYEE_TYPE_OUTSOURCED],
        isOnHold: true,
      },
    },
  },
  [MENU_GENERAL_AFFAIR]: {
    name: "General Affair",
    pathname: "/general-affair",
    icon: IconBriefcase,
    allow: [EMPLOYEE_TYPE_INHOUSE, EMPLOYEE_TYPE_OUTSOURCED],
    isOnHold: true, // Disabled
  },
  [MENU_HUMAN_RESOURCE]: {
    name: "Human Resource",
    pathname: "/human-resource",
    icon: IconUsersGroup,
    allow: [EMPLOYEE_TYPE_INHOUSE, EMPLOYEE_TYPE_OUTSOURCED],
    isOnHold: true, // Disabled
  },
  [MENU_REPORTING]: {
    name: "Reporting",
    pathname: "/reporting",
    icon: IconFileReport,
    allow: [EMPLOYEE_TYPE_INHOUSE, EMPLOYEE_TYPE_OUTSOURCED],
    isOnHold: true, // Disabled
  },
  [MENU_HELP_DESK]: {
    name: "Help Desk",
    pathname: "/help-desk",
    icon: IconHeadset,
    allow: [EMPLOYEE_TYPE_INHOUSE, EMPLOYEE_TYPE_OUTSOURCED],
    isOnHold: true, // Disabled
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

export const AdminSiteNavigation = pickMenus([
  MENU_HOME,
  MENU_USER_MANAGEMENT,
  MENU_SETTINGS,
  MENU_BIJPEDIA,
  MENU_FINANCING,
  MENU_GENERAL_AFFAIR,
  MENU_HUMAN_RESOURCE,
  MENU_REPORTING,
  MENU_HELP_DESK,
]);

export const SupervisorSiteNavigation = pickMenus([
  MENU_HOME,
  MENU_BIJPEDIA,
  MENU_FINANCING,
  MENU_GENERAL_AFFAIR,
  MENU_HUMAN_RESOURCE,
  MENU_REPORTING,
  MENU_HELP_DESK,
]);

export const UserSiteNavigation = pickMenus([
  MENU_HOME,
  MENU_BIJPEDIA,
  MENU_FINANCING,
  MENU_GENERAL_AFFAIR,
  MENU_HUMAN_RESOURCE,
  MENU_REPORTING,
  MENU_HELP_DESK,
  MENU_PROFILE,
]);
