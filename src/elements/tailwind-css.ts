// The same Tailwind-generated stylesheet the React app uses, pulled in as a
// raw string (Vite's `?inline` query still runs it through the
// `@tailwindcss/vite` transform). Injected into each wrapped component's
// shadow root by `withTailwind` — one Tailwind build, no duplicated styling
// logic between plain-React usage and the Web Component wrappers.
import tailwindCss from "../index.css?inline";

export default tailwindCss;
