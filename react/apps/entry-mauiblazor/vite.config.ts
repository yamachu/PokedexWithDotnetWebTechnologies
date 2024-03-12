import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build:
    process.env.TARGET !== "web"
      ? {
          outDir: "../../../src/PokedexDotnet.MAUIBlazor/wwwroot/js",
          lib: {
            entry: "src/main.tsx",
            fileName: "index",
            formats: ["es"],
          },
          minify: mode === "development" ? false : true,
          sourcemap: mode === "development" ? ("inline" as const) : false,
        }
      : undefined,
  // React自体がprocess.env.NODE_ENVを参照しているので、defineで消し去る
  define: {
    "process.env.NODE_ENV": JSON.stringify(mode),
  },
}));
