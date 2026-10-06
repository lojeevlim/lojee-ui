# Changelog

All notable changes to lojee-ui. The docs site also has a live changelog (Docs → Changelog) generated from the git history.

## 0.1.0-alpha.13 — 2026-10-06

### Added
- **Animation effects** — `animation` prop on Button (and friends): `glow`, `pulse`, `sweep`, `bounce`, `float`, `wiggle`, `border-spin`, `particles`, `tail`; pass one or a list to combine. Respects `prefers-reduced-motion`.
- Page scrollbar and tooltip tips on the docs site.

### Changed
- **Breaking:** the `animated` prop is renamed `animation`. Smoother `pulse`.

## 0.1.0-alpha.12 — 2026-10-05

### Added
- **DotScroll** — dotted scrollbar with a glowing dot, tail, particles and edge burst; used by Sidebar, Modal, Drawer, Sheet, menus, dropdowns, Table and code blocks.
- **BottomNavigation** — `iconOnly`, and a floating action button (`fabIcon` / `fabLabel` / `onFabClick`) in a curved notch; `onItemClick`.
- **Slider / RangeSlider** — `size`, `thumbVariant`, `valuePlacement` (`"thumb"` puts the value inside the handle). Divider `handleVariant`.
- **Clay** look applied across Slider, TopBar, Header, Footer, Stepper, Tabs, Timeline, Stat, Chart bars, Map frame and active items. ThemeSwitcher gains more accents and presets.
- Per-language **data-binding guides** and a logo flow diagram on the docs site.

### Changed
- **Breaking:** `Loader` / `<l-loader>` is merged into `Skeleton` (now with a wave animation). Footer takes `color` only (variants removed).
- Theme-colored scrollbars; the browser-tab icon follows the accent.

## 0.1.0-alpha.11 — 2026-10-04

### Added
- **Data binding** — set component state from outside and read changes back, in React, Vue, Angular and plain JS.
- **Input** — `plain` variant (text only, no box); ChatBox now uses Input.

### Fixed
- `<l-theme-switcher>` change callbacks only report the pick; the theme is still applied unless controlled by its prop.

## 0.1.0-alpha.10 — 2026-10-04

### Added
- One-command release script (`npm run release`).

### Fixed
- Sidebar reveals the active item on collapse/expand; changelog survives shallow clones; `homepage` points to https://lojee-ui.vercel.app/.

## 0.1.0-alpha.6 – alpha.9 — 2026-10-04

### Added
- **Claymorphism** design look, new components and theming updates; input variants; Sidebar `showLabel` and overlay scrollbar.
- ChatBox code highlighting and options, Badge `xs`.
- **MapRoute** — real road routes from an array of points (A → B → C …).

## 0.1.0-alpha.5 — 2026-10-03

### Added
- **MapRoute** animation variants (`draw`, `pulse`, `trail`, `glow`, `shimmer`).
- **DetailsList** and **GridView** replace DataGrid; Table, Chart and Stat updates.

## 0.1.0-alpha.2 – alpha.4 — 2026-10-01 – 2026-10-02

### Added
- **Maps** (`Map`, `MapMarker`, `MapRoute`), motion effects and skeleton loading.
- **Image**, **Video**, **Skeleton**, **TagInput**, **NumberInput**, **OtpInput**, **Rating**, **ColorPicker** and **CodeSnippet**.
- App shell, theme provider/switcher and slot projection for Web Components; `Main` panel.
- Buttons accept any CSS color; Tooltip sizes `xs`–`xl` and an always-open state; Divider grip handle.
- Sidebar rows navigate by `path` without a page reload.

## 0.1.0-alpha.1 — 2026-10-01

### Added
- **Themes** — light / dark mode plus a brand accent (12 colors), driven by CSS variables so it reaches every component, including Web Components inside shadow roots. `ThemeProvider` (with an `isolated` mode), `useTheme`, and solid / outline / soft active-item styles. Default accent is now **slate**.
- **App layout** — `App`, `Top`, `Side`, `Main`, `Footer` on a container-query grid that collapses the side region into a drawer, with a drag-and-drop layout editor in the playground.
- **New components** — `TopBar` (built-in back, menu and search), `StepperItem` (`<l-stepper-item>`), and **Flow Diagram** (`FlowDiagram` / `<l-flow-diagram>`).
- **Flow Diagram** — data-driven SVG diagram with automatic layered layout; 7 node shapes (rect, pill, circle, diamond, hexagon, parallelogram, cylinder); 6 variants (schematic, blueprint, minimal, solid, outline, glow); smooth / step / straight wires; horizontal, vertical and auto direction; animated packets; hover highlight, selection and auto-play; draggable nodes; and an editor (`editable`) to add elements of any shape, connect them, rename and delete, plus zoom controls (`zoomable`).
- **Calendar** — selected-date footer (Today / Clear), `defaultSelected`, **range selection** (`selectionMode="range"`), and a dialog-style `variant="modal"` that can open as an overlay.
- **Navigation** — NavigationMenu, BottomNavigation, Stepper, Breadcrumbs, Tabs, Pagination and Footer follow the theme accent, with shared sliding active-item transitions and built-in self-managed selection.
- **Docs site** — landing page, Introduction, Installation, Theming, About and an auto-updating Changelog; command-menu search; per-language API reference for every component (React, Vue, Angular, plain JS), generated from the TypeScript types.

### Changed
- Every component defaults to `color="accent"` and follows the theme.
- Web Component attributes and events are documented per framework.

### Fixed
- Small-screen layouts on the docs site and landing page (navbar, drawer, hero, theme and layout labs).
- Installation guide installs Tailwind CSS only once.
