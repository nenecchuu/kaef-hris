import {
  IconAlertTriangle,
  IconError404,
  IconForbid,
  IconLoader2,
} from "@tabler/icons-react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { useLocation, useRouteError } from "react-router-dom";

import appLogo from "@src/assets/app-logo.png";
import { useDocumentTitle } from "@src/hooks/use-document-title";
import { isHTTPErrorResponse } from "@src/lib/http-client";
import { Button } from "@src/ui/button";

export function InitialFallback() {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-8">
      <img src={appLogo} alt="Loading spinner" className="w-44" />
    </div>
  );
}

export function LoadingFallback() {
  return (
    <div className="flex h-full items-center justify-center">
      <IconLoader2 className="h-12 w-12 animate-spin text-gray-700" />
    </div>
  );
}

export function ForbiddenFallback() {
  useDocumentTitle("Forbidden");

  return (
    <div className="flex h-full items-center px-4 md:px-6 xl:px-8">
      <div className="mx-auto w-full max-w-xs">
        <IconForbid className="mx-auto h-18 w-18 text-gray-700" />
        <p className="mt-2 text-center text-sm font-medium">
          Sorry, you are forbidden to access this page. Contact the
          administrator to request for access.
        </p>
      </div>
    </div>
  );
}

export function ErrorFallback({ resetErrorBoundary, error }: FallbackProps) {
  const isQueryError = isHTTPErrorResponse(error);

  return (
    <div className="flex h-full items-center px-4 md:px-6 xl:px-8">
      <div className="mx-auto w-full max-w-xs">
        <div>
          <IconAlertTriangle className="mx-auto h-20 w-20 text-gray-700" />
          <p className="text-center text-sm font-medium">
            {error.message || "Something went wrong. Please try again."}
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          {isQueryError ? (
            <Button
              type="button"
              variant="secondary"
              onClick={resetErrorBoundary}
            >
              Try again
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function NotFoundFallback() {
  useDocumentTitle("Not Found");

  return (
    <div className="flex h-full items-center px-4 md:px-6 xl:px-8">
      <div className="mx-auto w-full max-w-xs">
        <IconError404 className="mx-auto h-20 w-20 text-gray-700" />
        <p className="text-center text-sm font-medium">
          Sorry, the page you are looking for does not exist or has been
          removed.
        </p>
      </div>
    </div>
  );
}

export function RootFallback() {
  const error = useRouteError();

  return (
    <div className="flex h-full items-center px-4 md:px-6 xl:px-8">
      <div className="mx-auto w-full max-w-xs">
        <div>
          <IconAlertTriangle className="mx-auto h-20 w-20 text-gray-700" />
          <p className="text-center text-sm font-medium">
            {(error as Error).message ||
              "Something went wrong. Please try again."}
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <Button
            type="button"
            variant="secondary"
            onClick={() => window.location.reload()}
          >
            Refresh page
          </Button>
        </div>
      </div>
    </div>
  );
}

type ErrorFallbackBoundaryProps = Omit<
  React.ComponentPropsWithoutRef<typeof ErrorBoundary>,
  "FallbackComponent" | "fallback" | "fallbackRender"
>;

export function ErrorFallbackBoundary({
  resetKeys,
  ...props
}: ErrorFallbackBoundaryProps) {
  const location = useLocation();

  return (
    <ErrorBoundary
      {...props}
      resetKeys={[location, ...(resetKeys ?? [])]}
      FallbackComponent={ErrorFallback}
    />
  );
}

export function QueryErrorFallbackBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorFallbackBoundary onReset={reset}>
          {children}
        </ErrorFallbackBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
