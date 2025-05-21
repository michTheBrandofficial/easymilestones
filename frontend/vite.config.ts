import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
// @dts-expect-error types cant be fetched here
// import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: './app/screens',
      generatedRouteTree: './app/routeTree.gen.ts'
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": resolve("./"),
    },
  },
  server: {
    port: 3000,
  },
});
