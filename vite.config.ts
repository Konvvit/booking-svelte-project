import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";


export default defineConfig({
  plugins: [svelte()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5001", // Your backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});

