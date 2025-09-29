export const EMPLOYEE_TYPE_INHOUSE = 1;
export const EMPLOYEE_TYPE_OUTSOURCED = 2;

export const ADMIN_TYPE_SUPER = 1;
export const ADMIN_TYPE_HCM = 2;
export const ADMIN_TYPE_FINANCE = 3;
// export const ADMIN_TYPE_SITE_CONTROLLER = 4;

export const USER_TYPE_SUPER = "SUPER";
export const USER_TYPE_HCM = "HCM";
export const USER_TYPE_FINANCE = "FINANCE";
export const USER_TYPE_EMPLOYEE = "USER";

export const UserTypeKey = {
  user: "employee_type",
  admin: "admin_type",
};

export const UserTypeLabel = {
  [USER_TYPE_SUPER]: "Super Admin",
  [USER_TYPE_HCM]: "Admin HCM & GA",
  [USER_TYPE_FINANCE]: "Admin Finance",
  [USER_TYPE_EMPLOYEE]: "Employee",
  // [USER_TYPE_SM]: "Site Manager",
};

export const UserTypeOptions = Object.entries(UserTypeLabel).map(
  ([value, label]) => ({ label, value }),
);

export const EmployeePositionOptions = [
  "Staff",
  "Sr Staff",
  "Assistant Manager",
  "Manager",
  "Sr Manager",
  "AVP",
  "VP",
];
