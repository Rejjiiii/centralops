import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ES modules (Vite uses ESM by default)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@redux": path.resolve(__dirname, "./src/redux/store"),
      "@store": path.resolve(__dirname, "./src/redux"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.40.127:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
