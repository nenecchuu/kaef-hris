import { Toaster } from "sonner";

import appLogo from "@src/assets/app-logo.png";
import bgAuth from "@src/assets/bg-auth.jpg";
import { env } from "@src/env";
import { useDocumentTitle } from "@src/hooks/use-document-title";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  useDocumentTitle("Sign In");

  return (
    <div className="flex min-h-full">
      <div
        aria-hidden={true}
        className="relative isolate hidden w-3/5 bg-background-darker-primary after:absolute after:inset-0 after:bg-neutral-1000/35 xl:block"
      >
        <img
          src={bgAuth}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </div>
      <div className="flex flex-1 p-8">
        <div className="mx-auto flex w-full max-w-sm flex-col gap-8">
          <div className="relative grid flex-1 place-items-center">
            <div className="w-full">
              <h1 className="sr-only">Sign In</h1>
              <img
                src={appLogo}
                alt={env.VITE_APP_NAME}
                width={179}
                className="mx-auto h-auto w-[179px]"
              />
              {children}
            </div>
          </div>
          <Copyright />
        </div>
      </div>
      <Toaster richColors={true} />
    </div>
  );
}

function Copyright() {
  return (
    <p className="text-center text-xs text-gray-500">
      <span className="font-bold">Luminakra</span> &copy;{" "}
      {new Date().getFullYear()}. All rights reserved.
    </p>
  );
}
