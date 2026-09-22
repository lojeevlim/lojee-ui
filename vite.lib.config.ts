import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// Library build for the React entry point (`lojee-ui`, i.e. `dist/index.js`
// / `dist/index.cjs`) — run via `npm run build:lib`. Kept separate from
// vite.config.ts so the demo app's `npm run build`/`npm run dev` are
// unaffected.
//
// Type declarations are generated separately via `tsc -p tsconfig.lib.json`
// (see the `build:lib` script) rather than a Vite plugin: `vite-plugin-dts`
// hooks into the classic Rollup plugin API, but Vite 8 bundles by default
// with Rolldown, and the plugin silently no-ops under it (no error, no
// output) — plain `tsc --emitDeclarationOnly` sidesteps that entirely.
export default defineConfig({
  publicDir: false,
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: false,
    lib: {
      entry: resolve(import.meta.dirname, "src/lib/entry.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "lucide-react"],
    },
  },
});
