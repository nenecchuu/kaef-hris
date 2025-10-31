import appLogo from "@src/assets/app-logo.svg";
import { env } from "@src/env";

export function LogoNavItem() {
  return (
    <img
      src={appLogo}
      alt={env.VITE_APP_NAME}
      className="mx-auto h-auto w-1/2"
    />
  );
}
