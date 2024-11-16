import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        // additionalData: `
        // @import "./src/utilities/_variables.scss";
        //   @import "./src/assets/_global.scss";
        // `,
      },
    },
  },
});
