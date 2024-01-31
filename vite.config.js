import { defineConfig } from "vite";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["vitest-localstorage-mock"],
    mockReset: false,
  },
});
