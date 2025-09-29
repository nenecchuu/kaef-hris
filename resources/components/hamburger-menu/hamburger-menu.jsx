import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

import {
  AdminSiteNavigation,
  SupervisorSiteNavigation,
  UserSiteNavigation,
} from "@src/constants/site-navigation";
import { useAuth } from "@src/lib/auth";
import { getMenu } from "@src/utils";

import { UnstyledButton } from "../button";
import {
  SiteNavItem,
  SiteNavSubItem,
  SiteNavSubMenu,
} from "../site-navigation";
import { AreaNavItem, LogoNavItem, SignOutNavItem } from "../user-navigation";

export function HamburgerMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild={true}>
        <UnstyledButton aria-label="Hamburger Menu">
          <IconMenu2 />
        </UnstyledButton>
      </DialogPrimitive.Trigger>
      <AnimatePresence initial={false}>
        {open && (
          <DialogPrimitive.Portal forceMount={true}>
            <DialogPrimitive.Overlay asChild={true}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 bg-neutral-1000/30"
              />
            </DialogPrimitive.Overlay>
            <DialogPrimitive.Content asChild={true}>
              <motion.div
                initial={{ opacity: 0, x: -244 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -244 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className="fixed inset-y-0 flex w-61 flex-col bg-neutral-0"
              >
                <div className="flex h-14 items-center px-4">
                  <DialogPrimitive.Close asChild={true}>
                    <UnstyledButton aria-label="Close Menu">
                      <IconX />
                    </UnstyledButton>
                  </DialogPrimitive.Close>
                </div>
                <div className="flex flex-1 flex-col gap-y-6 overflow-hidden">
                  <LogoNavItem />
                  <SiteNavigation />
                  <UserNavigation />
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
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
                  <DialogPrimitive.Close key={subKey} asChild={true}>
                    <SiteNavSubItem
                      to={subItem.pathname}
                      label={subItem.name}
                      external={
                        subItem.isOnHold && subItem.pathname.startsWith("http")
                      }
                      disabled={
                        subItem.isOnHold && !subItem.pathname.startsWith("http")
                      }
                    />
                  </DialogPrimitive.Close>
                ))}
              </SiteNavSubMenu>
            );
          }

          return (
            <li key={key}>
              <DialogPrimitive.Close asChild={true}>
                <SiteNavItem
                  to={item.pathname}
                  label={item.name}
                  Icon={item.icon}
                  external={item.isOnHold && item.pathname.startsWith("http")}
                  disabled={item.isOnHold && !item.pathname.startsWith("http")}
                />
              </DialogPrimitive.Close>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function UserNavigation() {
  return (
    <nav className="pb-5 pt-2">
      <h3 className="sr-only">User Navigation</h3>
      <ul>
        <li>
          <AreaNavItem />
        </li>
        <li>
          <DialogPrimitive.Close asChild={true}>
            <SignOutNavItem />
          </DialogPrimitive.Close>
        </li>
      </ul>
    </nav>
  );
}
