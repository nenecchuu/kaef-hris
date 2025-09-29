import appLogo from "@src/assets/app-logo.png";
import { SCREEN_SIZE_MEDIUM } from "@src/constants/theme";
import { useWindowDimensions } from "@src/hooks/use-window-dimensions";

import { HamburgerMenu } from "../hamburger-menu";

export function Header() {
  const { width } = useWindowDimensions();

  if (width >= SCREEN_SIZE_MEDIUM) {
    return null;
  }

  return (
    <header className="relative flex h-14 items-center border-b border-neutral-1000/5 bg-neutral-0 shadow-sm">
      <img
        src={appLogo}
        alt=""
        className="absolute left-1/2 top-1/2 h-10 -translate-x-1/2 -translate-y-1/2"
      />
      <div className="flex w-full gap-x-4 px-4 py-3">
        <div className="flex flex-1 items-center">
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
}
