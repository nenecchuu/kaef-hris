/**
 * Test Utilities
 *
 * Common test helpers and wrapper components
 */

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RenderOptions, render as rtlRender } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

interface WrapperProps {
  children: React.ReactNode;
}

/**
 * Create a new QueryClient for each test
 */
export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

/**
 * Wrapper component with all providers
 */
export function AllTheProviders({ children }: WrapperProps) {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
}

/**
 * Custom render with providers
 */
export function render(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return rtlRender(ui, { wrapper: AllTheProviders, ...options });
}

// Re-export everything from @testing-library/react
export * from "@testing-library/react";
export { render as defaultRender } from "@testing-library/react";
