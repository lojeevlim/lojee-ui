# Lojee UI

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
| `Loader` | `root`, `item` |
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

## Distributing without npm

npm publishing for this package is currently on hold, so until that's restored, use one
of these registry-free ways to get `dist/` (built via `npm run build:pkg`) into a
consumer project. All of them ship the exact same output that `npm publish` would
(`package.json` already declares `"files": ["dist"]` plus the right `main`/`module`/
`types`/`exports` fields). Consumers still need `react`, `react-dom`, and `lucide-react`
installed as peer dependencies for the React build.

### 1. Build the package

```bash
npm run build:pkg
```

Produces `dist/index.js` (ESM), `dist/index.cjs` (CJS), `dist/elements.js` (Web
Components, ESM), `dist/style.css`, and `dist/lib/index.d.ts`.

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

---

Once npm publishing access is restored, these are stopgaps — the primary distribution
path resumes via `npm publish` (see `PLAN.md` for the full release checklist).
