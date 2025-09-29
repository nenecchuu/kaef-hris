import react from "@vitejs/plugin-react-swc";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "localhost",
    hmr: {
      host: "localhost",
    },
  },
  plugins: [
    react(),
    laravel({
      input: "resources/root.tsx",
      refresh: true,
    }),
  ],
  resolve: {
    alias: {
      "@src": "/resources",
    },
  },
});
