// The actual Vite build entry for the `lojee-ui` package (see
// vite.lib.config.ts) — re-exports everything from ./index plus a
// side-effect CSS import so Tailwind's generation has something in this
// build's module graph to hang off of; the compiled output lands in
// dist/style.css (consumers opt in via `import "lojee-ui/style.css"`).
// Kept separate from ./index so tsc's declaration build (tsconfig.lib.json)
// can target the clean, CSS-import-free file instead.
import "../index.css";

export * from "./index";
