import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
beforeAll(()=>{
    vi.resetModules();
})
afterAll(() => {
    vi.resetModules();
});
afterEach(() => {
    cleanup();
});
