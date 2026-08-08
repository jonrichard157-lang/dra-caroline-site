import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/dra-caroline-site/",
  build: {
    target: "es2020",
    sourcemap: false,
  },
});
