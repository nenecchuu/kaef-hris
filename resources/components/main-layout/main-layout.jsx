import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster as HotToaster } from "react-hot-toast";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

import { Navbar } from "@src/components/main-layout/navbar";
import { AuthProvider } from "@src/lib/auth";
import { cn } from "@src/lib/styling";
import { AlertToaster } from "@src/ui/alert-toast";

import { ErrorFallback } from "../fallbacks";
import { Header } from "./header";
import { MainContent, SkipToMainContent } from "./main-content";
import { Sidebar } from "./sidebar";

/** @typedef {'user'|'admin'} AppType */
/**
 * @typedef {Object} AppTypeProps
 * @prop {AppType} app The type of the application.
 */

/** @param {AppTypeProps} props */
export function MainLayout({ app }) {
  const location = useLocation();

  return (
    <AuthProvider app={app}>
      <SkipToMainContent />
      <Navbar />
      <Sidebar />
      <div className="flex h-full flex-col bg-background-default md:ml-61">
        <Header />
        <MainContent>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                resetKeys={[location]}
                onReset={reset}
                FallbackComponent={ErrorFallback}
              >
                <Outlet />
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </MainContent>
        {/* <Footer /> */}
      </div>
      <HotToaster
        position="bottom-right"
        containerClassName="!bottom-19 !right-4 md:!right-6 md:!bottom-6 xl:!bottom-8 xl:!right-8"
      />
      <Toaster
        richColors={true}
        className={cn(
          app === "user" &&
            "bottom-19 right-4 md:bottom-6 md:right-6 xl:bottom-8 xl:right-8",
        )}
      />
      <AlertToaster />
    </AuthProvider>
  );
}
