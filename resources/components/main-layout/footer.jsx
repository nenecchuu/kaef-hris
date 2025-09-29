import { SCREEN_SIZE_MEDIUM } from "@src/constants/theme";
import { useWindowDimensions } from "@src/hooks/use-window-dimensions";
import { useAuth } from "@src/lib/auth";

import { UserFooterMobileSiteNavigation } from "../site-navigation";

export function Footer() {
  const { appType } = useAuth();
  const { width } = useWindowDimensions();

  if (width >= SCREEN_SIZE_MEDIUM) {
    return null;
  }

  if (appType === "admin") {
    return null;
  }

  return (
    <footer className="border-t border-neutral-1000/5 bg-neutral-0 shadow-sm">
      <UserFooterMobileSiteNavigation />
    </footer>
  );
}
