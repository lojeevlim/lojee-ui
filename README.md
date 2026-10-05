# Lojee UI

**Official site & docs: https://lojee-ui.vercel.app/**

React + TypeScript UI component library styled with Tailwind v4 — ships auto-generated
Web Components (`<l-*>` custom elements) alongside the React components, with a
built-in demo/docs site.

## Development

```bash
npm install
npm run dev       # demo/docs app with HMR
```

Other scripts:

| Script | Purpose |
| --- | --- |
| `npm run dev` | Run the demo/docs app locally |
| `npm run build` | Build the demo/docs app (`dist/`) |
| `npm run build:lib` | Build the React component library (`dist/index.js`, `dist/index.cjs`, `dist/lib/*.d.ts`) |
| `npm run build:elements` | Build the framework-agnostic Web Components bundle (`dist/elements.js`) |
| `npm run build:pkg` | Build the full publishable package: `build:lib` + `build:elements` |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the built demo app |

## Releasing

```bash
npm run release                       # next pre-release (0.1.0-alpha.N+1): docs, bump, build, commit, tag, publish, push
npm run release -- minor              # or patch | major | an exact version
npm run release -- --dry-run          # show the steps, change nothing
npm run release -- --no-publish       # everything except `npm publish`
```

It needs a clean `main`, an npm login (or an `NPM_TOKEN` environment variable), and push rights. It regenerates the API reference,
changelog and `COMPONENTS.md`, bumps the version, type-checks, builds, commits "Release x", tags `vx`, publishes with the `latest`
tag (plus `alpha` while it is a pre-release) and pushes the commit and tag.

### Publishing manually with an access token

The full step-by-step guide, with example commands and output, is in [commands/npm.md](commands/npm.md). In short: create a granular token, paste it once at `read -rs NPM_TOKEN`, bump the version, build, then `npm publish --tag latest --userconfig "$TMP_NPMRC"`. `npm run release` does the same and reads `NPM_TOKEN`.

> **Note:** `npm run build` (demo app) and `npm run build:pkg` (library) both write to
> `dist/`. Don't run them back to back expecting both outputs to coexist — run
> `build:pkg` on its own in a clean checkout when you need the package output.

## Styling & customization

Every component accepts a `className` prop for the root element, plus a `classNames`
prop for overriding the styling of its internal parts individually — similar to the
`classNames`/slot-override pattern used by shadcn-style component libraries.

```tsx
<Button classNames={{ icon: "text-emerald-500", badge: "bg-blue-500" }}>
  Save
</Button>

<Modal
  open={open}
  onClose={onClose}
  classNames={{ overlay: "bg-black/70", header: "bg-slate-50", body: "p-4" }}
>
  ...
</Modal>
```

Under the hood, `cx()` (`src/core/tokens.ts`) merges classes with
[`tailwind-merge`](https://github.com/dcastil/tailwind-merge), so a conflicting utility
you pass in (e.g. a different `bg-*`) always wins over the component's built-in
styling, regardless of argument order.

Available slots per component:

| Component | Slots |
| --- | --- |
| `Button` | `root`, `icon`, `badge` |
| `SplitButton` | `root`, `divider`, `mainButton`, `menuButton`, `menu` |
| `ButtonGroup` | `root` |
| `SegmentButton` | `root`, `icon` |
| `Modal` | `root`, `overlay`, `header`, `title`, `closeButton`, `body` |
| `Badge` | `root`, `icon` |
| `Avatar` | `root`, `image`, `fallback`, `status` |
| `AvatarGroup` | `root` |
| `Tooltip` | `root`, `bubble` |
| `Spinner` | `root`, `dot`, `bar` |
| `Divider` | `root`, `line`, `label` |

`SplitButton`'s dropdown is composed from `SplitButtonMenuItem` children (not a data
prop), each with its own `className`:

```tsx
<SplitButton icon="download" label="Export">
  <SplitButtonMenuItem icon="file" onClick={() => exportAs("pdf")}>Export as PDF</SplitButtonMenuItem>
  <SplitButtonMenuItem icon="list" onClick={() => exportAs("csv")}>Export as CSV</SplitButtonMenuItem>
  <SplitButtonMenuItem disabled>Cancel</SplitButtonMenuItem>
</SplitButton>
```

`Icon` has no `classNames` — it renders a single element, so its existing `className`
prop already covers full customization.

## Theming

lojee-ui ships light/dark mode and switchable brand accents. Both are plain CSS variables
defined in `lojee-ui/theme.css`, so they also work inside the `<l-*>` Web Components.

```tsx
import { ThemeProvider, useTheme } from "lojee-ui";

<ThemeProvider defaultMode="light" defaultAccent="emerald">
  <App />
</ThemeProvider>;

const { mode, setMode, accent, setAccent } = useTheme(); // mode: "light" | "dark"
```

`ThemeProvider` persists the choice in `localStorage` and sets `data-theme` / `data-accent`
on `<html>`. Without React, set those attributes yourself (`<html data-theme="dark"
data-accent="teal">`); with neither set, the theme is light and the accent is slate.

- **Semantic utilities** for your own UI: `bg-surface`, `bg-surface-muted`, `bg-surface-raised`,
  `text-fg`, `text-fg-muted`, `text-fg-subtle`, `border-border`, `border-border-strong`.
- **`accent-*` palette** (`bg-accent-600`, `text-accent-700`, …) and `color="accent"` on any
  component with a color prop — follows the selected accent. Explicit colors (`color="rose"`) are unaffected.
- **Customise** by overriding the `--lojee-*` variables, e.g.
  `[data-theme="dark"] { --lojee-surface: #000; }`.

## Maps

`Map`, `MapMarker`, `MapRoute` and `MapControls` draw interactive vector maps with [MapLibre GL](https://maplibre.org/) and free CARTO basemaps (no API key). Maps follow the light / dark theme, and MapLibre is loaded on demand — only when a map is shown.

```bash
npm install maplibre-gl      # optional peer dependency, only needed for the React maps
```

```tsx
import { Map, MapMarker, MapRoute } from "lojee-ui";

<Map center={[123.9, 10.305]} zoom={12} controls>
  <MapMarker lng={123.9054} lat={10.2925} label="Fort San Pedro" popup="Hello" />
  <MapRoute waypoints={[[123.9, 10.305], [123.9049, 10.3182]]} />
</Map>
```

The Web Components bundle includes MapLibre. Markers and routes are plain data there:

```html
<l-map id="map" style="height: 360px" controls="true"></l-map>
<script type="module">
  import "lojee-ui/elements";
  const map = document.getElementById("map");
  map.center = [123.9, 10.305];
  map.zoom = 11;
  map.markers = [{ lng: 123.9054, lat: 10.2925, label: "Fort San Pedro", popup: "Hello" }];
  map.routes = [{ waypoints: [[123.9, 10.305], [123.9049, 10.3182]] }];
</script>
```

## Installation

```bash
npm install lojee-ui
```

Consumers need `react`, `react-dom`, `lucide-react`, and **`tailwindcss` (v4) installed and
set up** as peer dependencies for the React build — nothing is bundled, and Tailwind is
required (the components are styled with the Tailwind classes your build generates).
Import `lojee-ui/theme.css` right after Tailwind; it carries the design tokens and the
animation tokens, and tells Tailwind to scan the library itself, so no `@source` line is
needed:

```css
@import "tailwindcss";
@import "lojee-ui/theme.css";
```

For non-React consumers, the auto-generated `<l-*>` Web Components are available from
the `lojee-ui/elements` subpath (self-contained, bundles React internally):

```ts
import "lojee-ui/elements";
```

## Alternative distribution methods

Registry-free ways to get `dist/` (built via `npm run build:pkg`) into a consumer
project — useful for local development or non-npm environments. All of them ship the
exact same output that `npm publish` does (`package.json` already declares
`"files": ["dist"]` plus the right `main`/`module`/`types`/`exports` fields).

### 1. Build the package

```bash
npm run build:pkg
```

Produces `dist/index.js` (ESM), `dist/index.cjs` (CJS), `dist/elements.js` (Web
Components, ESM), `dist/theme.css`, and `dist/lib/index.d.ts`.

### 2. Local install / linking (for active development)

Fastest way to try the package in another local project — no registry, no packing:

```bash
# npm link — in this repo:
npm run build:pkg && npm link
# then in the consumer project:
npm link lojee-ui

# OR npm install from a local path — in the consumer project:
npm install /absolute/path/to/lojee-ui
# or: npm install file:../lojee-ui
```

Both approaches symlink the consumer's `node_modules/lojee-ui` to this repo, so after
the initial link you only need to re-run `npm run build:pkg` (or
`vite build --config vite.lib.config.ts --watch` for a live rebuild loop) — no
re-linking required.

### 3. Git install

```bash
npm install git+https://github.com/lojeevlim/lojee-ui.git#<commit-or-tag>
```

npm does **not** run a build step for a plain git dependency unless the package has a
`prepare` script, and `dist/` isn't committed to the repo. To make this work, either:

- commit built `dist/` output to a dedicated `dist`/release branch or tag that
  consumers point at, or
- add `"prepare": "npm run build:pkg"` to `package.json` so it builds automatically on
  install (requires the build's devDependencies to be installable in the consumer's
  environment).

### 4. Tarball via GitHub Release

```bash
npm run build:pkg && npm pack
```

This produces `lojee-ui-<version>.tgz`. Upload it as a GitHub Release asset, then
consumers install it directly:

```bash
npm install https://github.com/lojeevlim/lojee-ui/releases/download/<tag>/lojee-ui-<version>.tgz
# or, downloaded locally:
npm install ./lojee-ui-<version>.tgz
```

### 5. GitHub Packages (npm-compatible registry)

The closest like-for-like replacement for publishing to npmjs.com:

1. Add a scoped name (e.g. `@lojeevlim/lojee-ui`) and `publishConfig.registry` pointing
   at `https://npm.pkg.github.com` in `package.json`.
2. Authenticate with a GitHub token that has `write:packages` scope and run
   `npm publish`.
3. Consumers add an `.npmrc` scoping `@lojeevlim` to the GitHub Packages registry, then
   `npm install @lojeevlim/lojee-ui`.

### 6. CDN (jsDelivr / unpkg) straight from GitHub

No publish step needed — works directly off pushed commits or tags, and is the
easiest path for non-npm consumers who just want the `<l-*>` Web Components:

```html
<script type="module" src="https://cdn.jsdelivr.net/gh/lojeevlim/lojee-ui@<tag>/dist/elements.js"></script>
```

Requires `dist/` to be committed (or attached) at that tag, same as the git-install
caveat above.
