import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    exclude: ["node_modules", "terraform"],
  },
  resolve: {
    alias: {
      "guardian-common": new URL("../common/src/index.ts", import.meta.url).pathname,
    },
  },
});
