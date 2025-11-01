import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://168.197.50.142:8080", // tu backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // quita el prefijo /api
      },
    },
  },
});
