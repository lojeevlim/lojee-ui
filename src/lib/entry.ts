// The actual Vite build entry for the `lojee-ui` package (see
// vite.lib.config.ts). This build ships no compiled CSS — consumers bring
// their own Tailwind v4 setup and scan `node_modules/lojee-ui/dist` via
// `@source` (see README). Kept separate from ./index so tsc's declaration
// build (tsconfig.lib.json) can target the clean entry file directly.
export * from "./index";
