# Changelog

All notable changes to lojee-ui. The docs site also has a live changelog (Docs → Changelog) generated from the git history.

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
