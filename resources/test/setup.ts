/**
 * Vitest Test Setup
 *
 * Global test configuration and mocks
 */

import "@testing-library/jest-dom";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// MSW setup will be imported here when needed
// import { server } from './mocks/server';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// MSW setup (uncomment when implementing API mocking)
// beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
// afterAll(() => server.close());
// afterEach(() => server.resetHandlers());
