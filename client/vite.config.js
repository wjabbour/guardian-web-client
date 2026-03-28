import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

const certsExist = fs.existsSync("../.certs/key.pem");

export default defineConfig({
  plugins: [
    // Allow JSX in .js files (project uses .js instead of .jsx for most files)
    {
      name: "treat-js-files-as-jsx",
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null;
        return transformWithEsbuild(code, id, { loader: "jsx", jsx: "automatic" });
      },
    },
    react(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      loader: { ".js": "jsx" },
    },
  },
  server: {
    https: certsExist
      ? {
          key: fs.readFileSync("../.certs/key.pem"),
          cert: fs.readFileSync("../.certs/cert.pem"),
        }
      : undefined,
    proxy: {
      "/v1": {
        target: "https://mxfj3q6m01.execute-api.us-east-1.amazonaws.com",
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: "localhost",
      },
    },
  },
  resolve: {
    // Point directly to source so Rollup can tree-shake named exports
    // without having to parse the CJS dist output
    alias: {
      "guardian-common": path.resolve("../common/src/index.ts"),
    },
  },
  build: {
    outDir: "build",
  },
});
