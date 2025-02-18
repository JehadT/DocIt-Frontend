
// https://vite.dev/config/
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
  server: mode === "development" ? {
    proxy: {
      "/api": "http://localhost:3000",
    },
  } : {},
  plugins: [react(), tailwindcss()],
}));

