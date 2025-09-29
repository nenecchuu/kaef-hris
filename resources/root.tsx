import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import * as ReactDOM from "react-dom/client";

import "./css/app.css";

import { RouterProvider } from "react-router-dom";

import { authRouter } from "@src/app/auth.router";
import { userRouter } from "@src/app/user.router";
import { InitialFallback } from "@src/components/fallbacks";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactNode | null,
  ): (props: P & React.RefAttributes<T>) => React.ReactNode | null;
}

const queryClient = new QueryClient();
const rootEl = document.getElementById("root")!;

const app = {
  auth: authRouter,
  user: userRouter,
};

function render(base: keyof typeof app) {
  return ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={app[base]}
          fallbackElement={<InitialFallback />}
        />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </React.StrictMode>,
  );
}

if (window.location.pathname.startsWith("/auth")) {
  render("auth");
} else {
  render("user");
}
