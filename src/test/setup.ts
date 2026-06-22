import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock server-only so lib files using it can be imported in tests
vi.mock("server-only", () => ({}));

// Mock next/navigation stubs used by server-side utilities
vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`REDIRECT:${url}`);
  }),
  notFound: vi.fn(() => {
    throw new Error("NOT_FOUND");
  }),
}));
