import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build:
    process.env.TARGET !== "web"
      ? {
          outDir:
            "../../../src/PokedexDotnet.Experimental.HybridWebView/Resources/Raw/hybrid_root",
          minify: mode === "development" ? false : true,
          sourcemap: mode === "development" ? ("inline" as const) : false,
        }
      : undefined,
}));
