// The same Tailwind-generated stylesheet the React app uses, pulled in as a
// raw string (Vite's `?inline` query still runs it through the
// `@tailwindcss/vite` transform). Injected into each wrapped component's
// shadow root by `withTailwind` — one Tailwind build, no duplicated styling
// logic between plain-React usage and the Web Component wrappers.
import tailwindCssSource from "../index.css?inline";

// Tailwind v4 gives many utilities their default value (e.g. `border-r`'s
// implicit `solid` border-style, or `shadow-md`/`ring-1`'s zeroed-out
// `--tw-shadow`/`--tw-ring-shadow` pieces) via `@property ... { initial-value:
// X }` rather than an inline `var(--x, X)` fallback. `@property` registration
// is unreliable when the rule itself lives inside a Shadow DOM in current
// browsers — it silently doesn't take effect, so e.g. `var(--tw-border-style)`
// resolves to nothing and a border renders with the right width/color but no
// visible line at all, even though the exact same classes work fine in plain
// (non-shadow-DOM) React usage. A plain custom-property default set via an
// ordinary selector rule doesn't have this problem — regular custom property
// cascading works fine in shadow roots — so every `@property ... initial-value:
// X` here is mirrored into one such rule, working around the browser
// limitation regardless of whether `@property` itself ends up registering.
// Most of these are declared `inherits:false`, so the default has to apply to
// every element (not just :host) to match what `@property`'s initial-value
// would otherwise guarantee.
//
// Crucially, this fallback rule must be its own lowest-priority `@layer` —
// NOT a plain unlayered rule — or it backfires. `@property`'s initial-value
// only ever supplies a value when nothing else in the cascade sets that
// property at all, so a real utility class (however low its specificity,
// however deep inside `@layer utilities`) always wins over it. A plain
// unlayered rule is a normal cascade participant instead, and CSS Cascade
// Layers gives ANY unlayered rule priority over EVERY layered rule
// regardless of specificity — so an unlayered `--tw-shadow:0 0 #0000` here
// would permanently stomp every shadow/ring utility's own `--tw-shadow`
// (itself set inside Tailwind's `@layer utilities`), leaving every
// shadow/ring effect invisible no matter which utility class is applied.
// Declaring our own named layer first — before `tailwindCssSource`'s own
// `@layer theme, base, components, utilities` (and its `@layer properties`)
// even get introduced — registers it as the lowest-priority layer of all,
// so those later-declared layers correctly win, same as `@property`'s
// initial-value would.
const propertyDefaults = [...tailwindCssSource.matchAll(/@property (--tw-[a-z0-9-]+)\{[^}]*?initial-value:\s*([^;}]+)[;}]/g)]
  .map(([, name, value]) => {
    value = value.trim();
    // `--tw-ring-offset-width`'s `@property` declares it `<length>`-typed, which is what lets Tailwind
    // add its bare `0` default to a literal `1px` inside `calc(1px + var(--tw-ring-offset-width))` (part
    // of every `ring-*` utility's composited `box-shadow`) — CSS can't add a `<length>` to a plain,
    // untyped `<number>`. Since real `@property` registration is exactly what's unreliable here (see
    // above), our plain-cascade fallback carries no such typing, so a bare "0" makes that `calc()` — and
    // with it the whole composited `box-shadow` — invalid the moment any `ring-*` utility is used,
    // rendering no ring/shadow at all despite every other `--tw-*` piece resolving correctly. Giving it
    // an explicit unit keeps it arithmetically valid without needing real `@property` typing.
    if (name === "--tw-ring-offset-width" && /^-?[\d.]+$/.test(value)) value += "px";
    return `${name}:${value};`;
  })
  .join("");

const tailwindCss = propertyDefaults
  ? `@layer lojee-property-fallback{:host,*,*::before,*::after{${propertyDefaults}}}${tailwindCssSource}`
  : tailwindCssSource;

export default tailwindCss;
