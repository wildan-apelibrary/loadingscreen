import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "loadingscreen", // Ganti dengan nama repositori Anda
  build: {
    outDir: "dist",
  },
  server: {
    historyApiFallback: true, // Menambahkan fallback
  },
});
