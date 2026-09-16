# Lojee UI — npm Package Roadmap

## Context

This repo (`lojee_ui`) started as a component playground/demo app (Vite + React 19 + Tailwind v4). The goal now is to turn it into a **personal, publishable UI framework** on npm — a reusable component library (`Button` — covering text, icon, and icon-only buttons via `iconOnly`/`label`/`badge` props — `SplitButton`, `ButtonGroup`, `SegmentButton`, `Modal`, `Sidebar`, `Header`, etc.) that can be installed into other projects with `npm install`, while keeping this repo's demo app (`ButtonShowcase`, the sidebar-driven docs site, the interactive Playground) as the living documentation/showcase for the library.

## Current state (as of this plan)

- **Build tool:** Vite 8 + `@vitejs/plugin-react`, TypeScript ~6.0, Tailwind v4 via `@tailwindcss/vite`.
- **Library-ish components** already built, living in `src/components/ui/`:
  - `Buttons/` — a folder, not a single file: `Button.tsx`, `SplitButton.tsx`, `ButtonGroup.tsx`, `SegmentButton.tsx` (each its own Props interface + component), and `index.ts` (barrel re-exporting all four components plus the token re-exports `colorClasses`/`sizeClasses`/`shapeClasses`/`BASE_BUTTON_CLASSES`/`COLORS` and types `ButtonVariant`/`ColorName`/`Size`/`Shape` from `core/tokens` — so existing `from "./Buttons"` imports elsewhere are unaffected). Icon lookup moved to `src/core/icons.ts` (see below). The demo/showcase lives in `Buttons/showcase/`: `ButtonShowcase.tsx` (default export, composes the three sections below), `ButtonSection.tsx` (variants/sizes/colors/gradient/icons/icon-only/states/shapes), `ButtonGroupSection.tsx` (`ButtonGroup` + `SegmentButton` together, since they're always demoed nested), `SplitButtonSection.tsx`.
  - `Badge/`, `Avatar/` (+ `AvatarGroup`), `Icons/` (`Icon` display component + gallery), `Spinner/`, `Loader/`, `Divider/`, `Tooltip/` — same one-folder-per-component shape as `Buttons/` (component file(s) + `index.ts` barrel + `showcase/<Name>Showcase.tsx`), rounding out the sidebar's "Basic Components" section (all 8 items now implemented).
  - `src/core/icons.ts` — the canonical icon-name → `LucideIcon` registry for the whole library (superset of what used to live in `Buttons/icons.ts`); `Button`, `SegmentButton`, `Badge`, and `Icons/Icon` all resolve icons through it via `getIcon(name)`.
  - `src/components/ui/ShowcaseHelpers.tsx` — `SectionLabel`/`Row`, the demo-only presentational helpers shared by every showcase (promoted out of `Buttons/showcase/` once more folders needed them).
  - `Modal.tsx` — generic dialog.
  - `CodeBlock.tsx` — copyable code snippet block (docs-site utility, probably stays demo-only).
  - `ButtonPlayground.tsx` / `Playground.tsx` — interactive component demo (docs-site only, not shipped; only `Buttons` has one so far — the other 7 don't need their own playground yet).
- **App-shell / demo-only components**, living in `src/components/layouts/`:
  - `Sidebar.tsx` (active nav sidebar used by the demo app), `Header.tsx`. (The older `Sidebars.tsx` design-exploration variant, and the empty unused `Section.tsx`/`Footer.tsx`, were deleted in a cleanup pass — zero references anywhere.)
- **Demo data:** `src/constant/component_menu.tsx` drives the docs-site sidebar nav (`COMPONENT_MENU`, `DOCS_MENU`) — this is demo-app-only, not part of the shipped package.
- **Routing:** the demo app uses `react-router-dom` (v7) — real URLs, not just `useState`. Scheme is flat: `/:navKind/:item` (`navKind`: `"components"` | `"docs"`, e.g. `/components/buttons`, `/docs/introduction`) for the main layout, `/about` for a minimal About page, `/` redirects to the default component, `*` redirects to `/`. `src/core/routes.ts` centralizes the slug/path logic (`slugify`, `pathFor`, `defaultPathFor`, `findMenuItem`). Earlier draft nested by section (`/:navKind/:section/:item`) to dodge a label collision ("Pagination" appears under both "Layout & Content" and "Navigation" in `COMPONENT_MENU`) — flattened after realizing that's not really a collision to avoid: both entries are meant to converge on the same component, just cross-listed in two sections for browseability. `Sidebar.tsx` is a controlled component driven by an `activeLabel` prop (no more internal `selectedLabel` state going stale on back/forward) and renders real `<Link>`s instead of `<div onClick>` rows (incidentally fixed a pre-existing a11y gap — sidebar items weren't real interactive elements before). The `ButtonPlayground` modal deliberately stays outside the URL (local UI state) — no clear win from routing a modal.
- Package is currently `"private": true`, version `0.0.0`, no build target for a library, no type declarations emitted for consumers, no exports map.
- **Web Components track:** every component is still written exactly once, in React (`src/components/ui/`) — `src/elements/register.tsx` auto-wraps each one into a real custom element via `@r2wc/react-to-web-component` (`<lojee-button>`, `<lojee-split-button>`, `<lojee-button-group>`, `<lojee-segment-button>`, `<lojee-modal>`, plus `<lojee-badge>`, `<lojee-avatar>`, `<lojee-avatar-group>`, `<lojee-icon>`, `<lojee-spinner>`, `<lojee-loader>`, `<lojee-divider>`, `<lojee-tooltip>` — all 13 elements registered, matching every shipped React component), so there is no second hand-written implementation to keep in sync. Each wrapper mounts into a shadow root (`shadow: "open"`) with the same Tailwind-generated CSS injected via a small `withTailwind` HOC (`src/elements/with-tailwind.tsx` + `tailwind-css.ts`, same `?inline` import trick). Content projection (`Modal`'s body/title, `ButtonGroup`'s/`AvatarGroup`'s/`Tooltip`'s children, `Button`'s/`Badge`'s/`Divider`'s `children`/`label`) uses plain `<slot>` elements in the React JSX — harmless in ordinary React usage, and picked up natively once wrapped. `icon` props are string names (e.g. `"settings"`) resolved via `src/core/icons.ts`, since HTML attributes can't carry component references.
  - **Real gotcha:** `@r2wc/react-to-web-component`'s boolean props require an *explicit* truthy attribute value (`disabled="true"`, `icon-only="true"`) — a bare HTML boolean attribute (`disabled` with no `="..."`) is read as an empty string and silently treated as absent. This differs from the usual HTML/Lit convention where presence alone means true. Document this prominently wherever the Web Component API is described.
  - **Another real gotcha:** resolving an icon by name (`getIcon(name)`) and rendering the result as a JSX tag (`<Icon />`) trips `eslint-plugin-react-hooks`' `react-hooks/static-components` rule ("Cannot create components during render") — it fires even when wrapped in `useMemo`, since the rule can't statically prove `getIcon` returns a stable reference (it always does, since it's a lookup into a module-level map of already-imported components). Fixed with a scoped `// eslint-disable-next-line react-hooks/static-components` at each render site, with a comment explaining why it's safe. Any future component resolving something icon-like by name will hit this too.
  - **Bundle-size tradeoff:** because each element mounts a real React tree internally, the `lojee-ui/elements` bundle includes React + ReactDOM — it is not framework-free the way a from-scratch Web Component would be. That's the cost of "write once, in React" — accepted tradeoff per the user's explicit preference over maintaining two implementations.
  - `elements-demo.html` (project root) is a plain-HTML proof page — zero React, zero JSX in the page itself — `npm run dev` then visit `/elements-demo.html`. Not wired into the production build/packaging yet (see Phase 2).

## Goal

Publish an installable package (name TBD, default assumption: `lojee-ui`, adjust if a scoped name like `@lojeelim/ui` is preferred — check npm availability before committing) that exposes the component library, while this same repo keeps building/deploying the demo/docs site from the same source.

## Phases

### Phase 1 — Separate "library" from "demo app"
- Introduce a clear source split, e.g.:
  - `src/lib/` (or `packages/ui/src/`) — everything that ships: `Button`, `SplitButton`, `ButtonGroup`, `SegmentButton`, `Modal`, `Badge`, `Avatar`/`AvatarGroup`, `Icon`, `Spinner`, `Loader`, `Divider`, `Tooltip`, and future components (form controls, cards, etc. — the rest of `COMPONENT_MENU`), plus their shared tokens/types/icons (`core/tokens.ts`, `core/icons.ts`).
  - `src/demo/` (or keep `src/app`) — `App.tsx`, `main.tsx`, `AboutPage.tsx`, `ButtonShowcase`/`ButtonPlayground`/`Playground`/`CodeBlock`, `Sidebar`/`Header` (demo chrome), `component_menu.tsx`, `core/routes.ts`, plus the `react-router-dom` dependency itself (demo-only — not a runtime dependency of the shipped components).
- Add a single `src/lib/index.ts` barrel file that re-exports the public API (components + types) — this becomes the package entry point.

### Phase 2 — Library build output
- Add a second Vite build target in **library mode** (`vite.config.ts` `build.lib`), producing:
  - ESM + CJS bundles (`format: ['es', 'cjs']`).
  - Externalized peer deps: `react`, `react-dom`, `lucide-react` (don't bundle them).
- Add `vite-plugin-dts` (or `tsc --emitDeclarationOnly`) to generate `.d.ts` files for the library entry.
- Keep the existing `vite build` (app mode) working unchanged for the demo/docs site — likely via a separate `vite.lib.config.ts` and an `npm run build:lib` script, or a mode flag (`vite build --mode lib`).
- **Third build target for the Web Components** (`src/elements/index.ts` → e.g. `lojee-ui/elements`): a Vite lib-mode build bundling React + ReactDOM + `@r2wc/react-to-web-component` together with the components (this entry is not meant to be tree-shaken per-component like the main React entry — it's a self-contained bundle for non-React consumers) plus the embedded Tailwind CSS string, so `import "lojee-ui/elements"` works standalone in any non-React project.

### Phase 3 — Styling strategy (the trickiest decision)
Tailwind v4 classes are baked into every component's `className` strings. A consumer installing this package needs those utility classes to actually resolve to CSS. Options, in order of typical simplicity:
1. **Consumer must have Tailwind v4 configured** and this package just documents "add `src/**/node_modules/lojee-ui/dist/**/*.js` (or similar) to your Tailwind `content`/`source` scan" — simplest to ship, but couples every consumer to Tailwind.
2. **Ship a prebuilt CSS file** (`dist/style.css`) generated by running Tailwind's build against the library's own source, and have consumers `import "lojee-ui/style.css"` once — works without the consumer owning Tailwind config, at the cost of a fixed, non-tree-shaken CSS payload.
3. **Migrate component styling off Tailwind** entirely (CSS Modules / vanilla-extract / inline critical CSS) for full independence — biggest effort, most portable.
- Recommendation: start with **option 2** (prebuilt CSS export) for the first published version; revisit option 3 only if consumers hit real friction.

### Phase 4 — Package metadata
- Flip `"private": true` → remove it (or set `false`) when ready to publish.
- Set real `name`, start `version` at `0.1.0` (pre-1.0, expect breaking changes).
- Add `"type": "module"`, `"main"`, `"module"`, `"types"`, and an `"exports"` map (support both `import` and `require` consumers).
- Add `"files": ["dist"]` so `npm publish` doesn't ship source/demo/tests.
- Add `"peerDependencies"`: `react`, `react-dom`, `lucide-react` (with sensible semver ranges) so consumers control their own installed versions instead of getting duplicates. The `lojee-ui/elements` entry bundles its own React + ReactDOM + `@r2wc/react-to-web-component` internally (see Phase 2) rather than relying on the consumer's React — it's meant for non-React apps.
- Add `"sideEffects": false` (or `["*.css"]` if shipping a CSS file) so bundlers can tree-shake unused components.
- Add `license`, `repository`, `keywords`, `description`, `author`.

### Phase 5 — Quality gates before first publish
- Add component tests (Vitest + React Testing Library) for at least `Button`/`SplitButton`/`ButtonGroup`/`SegmentButton`/`Modal` — behavior + a11y basics (roles, `aria-*`, keyboard focus for `Modal`).
- Add a basic accessibility pass (focus rings already exist via `focus-visible:ring-*`; verify `Modal` traps focus and restores it on close, `Button` requires `label` when `iconOnly` is set, etc.).
- Verify tree-shaking works: build a throwaway consumer app that imports only `Button` and confirm the bundle doesn't pull in the whole library.
- Confirm the type declarations resolve correctly from a fresh `npm install` in a scratch project (not just via local `file:` link).

### Phase 6 — Docs
- Every exported component gets a short usage README section (props table, one or two code examples) — the existing `ButtonPlayground`/`CodeBlock` pattern in the demo app is a good source of truth to lift examples from.
- Decide whether the existing in-app docs/demo site is the permanent documentation (e.g. deployed to GitHub Pages / Vercel) or whether to add Storybook later — no need to introduce Storybook up front given the demo app already covers this.

### Phase 7 — CI/CD & publishing
- GitHub Actions workflow: on push/PR — install, typecheck, lint, test, build (both app and lib targets).
- On release (tag or manual dispatch): build lib, `npm publish` (consider `--access public` if scoped).
- Adopt a versioning approach: manual `npm version` bumps is fine at this size; revisit changesets/semantic-release only if the component count/contributor count grows.

### Phase 8 — First release checklist
- [ ] Package name chosen and confirmed available on npm.
- [ ] `src/lib` vs demo split done, no demo-only code leaking into the shipped bundle.
- [ ] Library build produces ESM+CJS+d.ts, demo app build still works unchanged.
- [ ] Styling strategy implemented and documented (README "Installation" section explains it).
- [ ] `package.json` metadata complete, `private` removed.
- [ ] At least smoke tests passing for shipped components.
- [ ] Fresh-project install test passes (types + styles both resolve).
- [ ] `npm publish` dry run (`npm publish --dry-run`) reviewed — confirm only `dist` (+ `README`, `LICENSE`) is included.
- [ ] Tag `v0.1.0`, publish, verify `npm view lojee-ui` shows expected files.

## Open decisions (need your input before/along the way)

1. **Package name** — `lojee-ui` on the public registry, a scoped name like `@lojeelim/ui`, or something else?
2. **Styling strategy** — comfortable requiring consumers to `import "lojee-ui/style.css"` once (Phase 3, option 2)? Or is a Tailwind-config-based approach preferred despite the coupling?
3. **Scope of v0.1.0** — the entire "Basic Components" section is now done (Button family, Modal, Badge, Avatar, Icons, Spinner, Loader, Divider, Tooltip — 8/8). Ship that as v0.1.0, or wait for more sections from the sidebar's `COMPONENT_MENU` list (Layout & Content, Forms & Inputs, Overlays, Feedback, Navigation, Data & Visualization, User/Account) to be implemented too?
4. **Repo layout** — keep everything in this one repo (`src/lib` + `src/demo` split), or split into a monorepo (`packages/ui`, `apps/docs`) now versus later?
