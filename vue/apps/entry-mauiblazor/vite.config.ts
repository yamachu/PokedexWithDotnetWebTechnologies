import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  build:
    process.env.TARGET !== "web"
      ? {
          outDir: "../../../src/PokedexDotnet.MAUIBlazor/wwwroot/js",
          lib: {
            entry: "src/main.ts",
            fileName: "index",
            formats: ["es"],
          },
          minify: mode === "development" ? false : true,
          sourcemap: mode === "development" ? ("inline" as const) : false,
        }
      : undefined,
  define: {
    "process.env.NODE_ENV": JSON.stringify(mode),
  },
}));
