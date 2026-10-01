import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

// Library build for the framework-agnostic Web Components entry
// (`lojee-ui/elements`, i.e. `dist/elements.js`) — run via `npm run
// build:elements`. Unlike vite.lib.config.ts, React/ReactDOM are bundled in
// (not externalized) since this entry targets non-React consumers; Tailwind
// CSS is already injected per-element into each shadow root at runtime (see
// src/elements/with-tailwind.tsx), so no separate CSS output is needed here.
export default defineConfig({
  publicDir: false,
  plugins: [react(), tailwindcss()],
  // Asset URLs inside the shipped JS (MapLibre's worker) must resolve next to the file that references them, not
  // against the consuming site's root — so they are built with `new URL(..., import.meta.url)`.
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      return hostType === "js" ? { runtime: `new URL(${JSON.stringify(filename)}, import.meta.url).href` } : { relative: true };
    },
  },

  // React (bundled in here, unlike the peer-dep lib build) checks
  // `process.env.NODE_ENV` internally. This entry ships as a plain
  // `<script type="module">` for non-bundled consumers, so there's no
  // Node/webpack polyfill to fall back on — without this, the literal
  // string `process.env.NODE_ENV` survives into the bundle and throws
  // `ReferenceError: process is not defined` the moment it loads.
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    outDir: "dist",
    emptyOutDir: false,
    cssCodeSplit: false,
    lib: {
      entry: resolve(import.meta.dirname, "src/elements/index.ts"),
      formats: ["es"],
      fileName: () => "elements.js",
    },
    rollupOptions: {
      // Every module here is `customElements.define(...)` side effects with
      // no named exports for a bundler to hang tree-shaking off of, and this
      // project's own `"sideEffects": ["*.css"]` in package.json (there for
      // *consumers* tree-shaking the main `lojee-ui` entry) applies to this
      // build too — left on, Rollup treats every element registration as
      // dead code and the whole bundle comes out empty. This is the one
      // build that needs treeshaking off entirely.
      treeshake: false,
    },
  },
});
