// Generates public/COMPONENTS.md (served at /COMPONENTS.md) — one Markdown reference for every component, written for people AND AI assistants.
// Everything per-component is derived from the code so it cannot drift: the props / events / web-component tags come from
// src/generated/apiDocs.ts (itself generated from the TypeScript interfaces), the usage examples from each component's docs
// showcase, and accessibility / responsive notes from the component source. Run: npm run docs:ai
// (needs src/generated/apiDocs.ts — `npm run docs:api` first if you changed a component's props).
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const exists = (p) => fs.existsSync(path.join(root, p));

const { API_DOCS } = await import(path.join(root, "src/generated/apiDocs.ts"));
const pkg = JSON.parse(read("package.json"));

// ---- sources of truth ---------------------------------------------------------------------------------------------
const app = read("src/App.tsx");
// import XShowcase from './components/ui/Dir'  →  { XShowcase: "Dir" }
const importDirs = {};
for (const m of app.matchAll(/import (\w+)(?:, \{[^}]*\})? from '\.\/components\/ui\/([^']+)'/g)) importDirs[m[1]] = m[2];
const showcaseBlock = app.slice(app.indexOf("const SHOWCASES"), app.indexOf("}\n", app.indexOf("const SHOWCASES")));
const pageToDir = {};
for (const m of showcaseBlock.matchAll(/^\s*(?:'([^']+)'|(\w+)):\s*(\w+),?$/gm)) pageToDir[m[1] ?? m[2]] = importDirs[m[3]];

// Sidebar categories, from the docs menu.
const menuSrc = read("src/constant/component_menu.tsx");
const categories = []; // { section, labels: [] }
{
  const compMenu = menuSrc.slice(menuSrc.indexOf("COMPONENT_MENU"), menuSrc.indexOf("DOCS_MENU"));
  let cur = null;
  for (const m of compMenu.matchAll(/section:\s*"([^"]+)"|label:\s*"([^"]+)"/g)) {
    if (m[1]) categories.push((cur = { section: m[1], labels: [] }));
    else if (cur && !cur.labels.includes(m[2])) cur.labels.push(m[2]);
  }
}

// Type aliases (string-literal unions) across the source, so a prop typed `ButtonVariant` can list its values.
const aliases = {};
function scanAliases(dir) {
  for (const f of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    const rel = path.join(dir, f.name);
    if (f.isDirectory()) scanAliases(rel);
    else if (/\.tsx?$/.test(f.name)) {
      const src = read(rel);
      for (const m of src.matchAll(/export type (\w+)\s*=\s*([^;]+?);/gs)) aliases[m[1]] = m[2].replace(/\s+/g, " ").trim();
      // `export const X = ["a", "b"] as const; export type Y = (typeof X)[number]`
      for (const m of src.matchAll(/export const (\w+)\s*=\s*\[([^\]]*)\]\s*as const/gs)) aliases[`__const_${m[1]}`] = m[2].replace(/\s+/g, " ");
    }
  }
}
scanAliases("src/core");
scanAliases("src/components/ui");
const COLOR_NAMES = [...read("src/core/tokens.ts").matchAll(/base:\s*"(\w+)"/g)].map((m) => m[1]);
const TRANSITIONS = [...(aliases.__const_TRANSITIONS ?? "").matchAll(/"([^"]+)"/g)].map((m) => m[1]);
const HOVER_EFFECTS = [...(aliases.__const_HOVER_EFFECTS ?? "").matchAll(/"([^"]+)"/g)].map((m) => m[1]);
const ANIMATED = [...(aliases.__const_ANIMATED_VARIANTS ?? "").matchAll(/"([^"]+)"/g)].map((m) => m[1]);

/** The literal values of a type (resolving a named alias), or null if it isn't a plain string-literal union. */
function literalValues(type, depth = 0) {
  if (!type || depth > 4) return null;
  const t = type.trim();
  if (t === "ColorName" || /^ColorName \|/.test(t)) return [...COLOR_NAMES, "accent"];
  if (t === "TransitionVariant") return TRANSITIONS;
  if (t === "HoverEffect") return HOVER_EFFECTS;
  if (/^[A-Z]\w*$/.test(t) && aliases[t]) return literalValues(aliases[t], depth + 1);
  const parts = t.split("|").map((s) => s.trim());
  const vals = [];
  for (const p of parts) {
    const lit = p.match(/^"([^"]*)"$/);
    if (lit) vals.push(lit[1]);
    else if (/^[A-Z]\w*$/.test(p) && aliases[p]) {
      const inner = literalValues(aliases[p], depth + 1);
      if (!inner) return null;
      vals.push(...inner);
    } else if (p === "undefined" || p === "null") continue;
    else return null;
  }
  return vals.length ? [...new Set(vals)] : null;
}

// ---- helpers ------------------------------------------------------------------------------------------------------
const esc = (s) => String(s ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
const code = (s) => "`" + String(s).replace(/`/g, "'") + "`";
const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const decode = (s) => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\{"([^"]*)"\}/g, "$1").replace(/\{'([^']*)'\}/g, "$1");
const table = (head, rows) => (rows.length ? `| ${head.join(" | ")} |\n| ${head.map(() => "---").join(" | ")} |\n${rows.map((r) => `| ${r.join(" | ")} |`).join("\n")}\n` : "");
const unescapeTemplate = (s) => s.replace(/\\`/g, "`").replace(/\\\$/g, "$").replace(/\\\\/g, "\\");

function showcaseFiles(dir) {
  const d = path.join("src/components/ui", dir, "showcase");
  if (!exists(d)) return [];
  return fs.readdirSync(path.join(root, d)).filter((f) => /\.tsx$/.test(f)).map((f) => path.join(d, f));
}
function componentSourceFiles(dir) {
  let abs = path.join("src/components/ui", dir);
  if (!exists(abs) && exists(abs + ".tsx")) return [abs + ".tsx"];
  if (!exists(abs)) return [];
  return fs.readdirSync(path.join(root, abs)).filter((f) => /\.tsx?$/.test(f) && !/Playground|Showcase|index\.ts$/.test(f)).map((f) => path.join(abs, f));
}

/** Title, one-line description and the code examples (section title + react / html / vue / angular) of a docs page. */
function readShowcase(dir) {
  const out = { title: null, description: null, examples: [] };
  const files = showcaseFiles(dir);
  // The main file first (the one with the <h1>), then the section files.
  files.sort((a, b) => (/Showcase\.tsx$/.test(b) ? 1 : 0) - (/Showcase\.tsx$/.test(a) ? 1 : 0));
  for (const f of files) {
    const src = read(f);
    if (!out.title) {
      const h = src.match(/<h1[^>]*>([\s\S]*?)<\/h1>\s*<p[^>]*>([\s\S]*?)<\/p>/);
      if (h) {
        out.title = decode(h[1].replace(/<[^>]+>/g, "").trim());
        out.description = decode(h[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
      }
    }
    const labels = [...src.matchAll(/<SectionLabel(?:\s+sub=(?:"([^"]*)"|'([^']*)'|\{`([^`]*)`\}))?[^>]*>([\s\S]*?)<\/SectionLabel>/g)];
    labels.forEach((m, i) => {
      const end = i + 1 < labels.length ? labels[i + 1].index : src.length;
      const slice = src.slice(m.index, end);
      const grab = (key) => {
        const mm = slice.match(new RegExp("\\b" + key + ":\\s*`((?:[^`\\\\]|\\\\[\\s\\S])*)`"));
        return mm ? unescapeTemplate(mm[1]).trim() : null;
      };
      const react = grab("react");
      if (!react) return;
      out.examples.push({
        title: decode(m[4].replace(/<[^>]+>/g, "").trim()),
        sub: decode((m[1] ?? m[2] ?? m[3] ?? "").trim()),
        react,
        js: grab("js"),
        vue: grab("vue"),
        angular: grab("angular"),
      });
    });
  }
  return out;
}

function readSourceFacts(dir) {
  const roles = new Set();
  const aria = new Set();
  const bps = new Set();
  let keyboard = false;
  let focusRing = false;
  let reducedMotion = false;
  let container = false;
  const native = new Set();
  for (const f of componentSourceFiles(dir)) {
    const src = read(f);
    for (const m of src.matchAll(/extends\s+(?:Omit<)?(\w*HTMLAttributes)<(\w+)>/g)) native.add(m[2].replace(/^HTML/, "").replace(/Element$/, "").toLowerCase() || "element");
    for (const m of src.matchAll(/role=["']([a-z]+)["']/g)) roles.add(m[1]);
    for (const m of src.matchAll(/\b(aria-[a-z]+)\b/g)) aria.add(m[1]);
    for (const m of src.matchAll(/(?<![\w-])((?:max-|min-)?(?:sm|md|lg|xl|2xl|@[a-z0-9]+|\[\d+px\])):/g)) bps.add(m[1]);
    for (const m of src.matchAll(/(?<![\w-])((?:max|min)-\[[^\]]+\]):/g)) bps.add(m[1]);
    if (/onKeyDown|Escape|ArrowDown|ArrowUp|keydown/.test(src)) keyboard = true;
    if (/focus-visible|focus:ring|focus:outline|focus:border/.test(src)) focusRing = true;
    if (/prefers-reduced-motion|motion-safe|motion-reduce/.test(src)) reducedMotion = true;
    if (/@container|ResizeObserver/.test(src)) container = true;
  }
  return { native: [...native], roles: [...roles], aria: [...aria].sort(), bps: [...bps].sort(), keyboard, focusRing, reducedMotion, container };
}

const COMPONENT_NAMES = new Set(Object.values(API_DOCS).flatMap((d) => d.components.map((c) => c.name)));

// ---- the document -------------------------------------------------------------------------------------------------
const L = [];
const push = (...s) => L.push(...s);

push(`# lojee-ui — Component Reference`);
push(``);
push(`> **Single source of truth and AI reference guide** for every component in \`${pkg.name}\` (v${pkg.version}).`);
push(`> Generated by \`npm run docs:ai\` from the code (TypeScript props, web-component registry, docs showcases) — **do not edit by hand**; change the component or its showcase and re-run.`);
push(``);
push(`## How to use this document`);
push(``);
push(`- Part 1 explains what applies to **every** component (install, the three ways to consume it, theming, motion, colors, sizes, accessibility, responsive behavior, customization).`);
push(`- Part 2 is the **component catalog** — one section per component, in the same order as the docs site sidebar, each with the same 14 subsections: Overview, Props and Interfaces, Events, Variants, Colors and Theming, Sizes, Component States, Slots / Children / Content, Framework Interfaces, Complete Usage Examples, Component Composition, Accessibility, Responsive Behavior, Customization.`);
push(`- Part 3 is an **index and quick lookups** (every web-component tag, which components emit which events).`);
push(`- When asked to build UI with this library, prefer the components here over hand-rolled markup; use only props listed in the component's table; use the exact prop names (React camelCase, web-component kebab-case attributes).`);
push(``);
push(`<!--TOC-->`);
push(``);
push(`**Contents:** [Part 1 — Global concepts](#part-1--global-concepts) · [Part 2 — Component catalog](#part-2--component-catalog) · [Part 3 — Index](#part-3--index-and-quick-lookups)`);
push(``);

// ===== Part 1 =====
push(`---`);
push(``);
push(`# Part 1 — Global concepts`);
push(``);
push(`## 1.1 Installation`);
push(``);
push("```bash");
push(`npm install ${pkg.name}`);
push("```");
push(``);
push(`Peer dependencies: ${Object.entries(pkg.peerDependencies ?? {}).map(([k, v]) => `${code(k)} ${v}`).join(", ")} (\`maplibre-gl\` is only needed for the Map components).`);
push(``);
push(`Three entry points:`);
push(``);
push(table(["Import", "What it is"], [
  [code(`import { Button } from "${pkg.name}"`), "The React components, hooks and types."],
  [code(`import "${pkg.name}/theme.css"`), "The stylesheet: design tokens (`--lojee-*` CSS variables), the light/dark themes, accent palettes, the Claymorphism design and animations. Import once at the app root."],
  [code(`import "${pkg.name}/elements"`), "Registers every component as a framework-agnostic **Web Component** (`<l-button>`, `<l-modal>`, …) for Vue, Angular, Svelte, plain HTML — no React needed."],
]));
push(`Tailwind CSS v4 must be set up in the consuming app (the components are styled with Tailwind utility classes).`);
push(``);
push(`## 1.2 Three ways to consume a component`);
push(``);
push(`1. **React** — import the component and pass props: ${code(`<Button variant="outline" color="indigo" label="Save" />`)}.`);
push(`2. **Web Component (Vue / Angular / plain JS / any framework)** — after ${code(`import "${pkg.name}/elements"`)} use the \`<l-*>\` tag; each React prop becomes an attribute (camelCase → kebab-case), see §1.3.`);
push(`3. **Data-driven shortcuts** — complex components (Sidebar, Navbar, Table, Stepper, Select, Chart, Tabs …) accept a plain-data prop (\`items\`, \`options\`, \`data\`, \`columns\`…) instead of child components, because that works identically in React and as a Web Component. Prefer the data prop when in doubt.`);
push(``);
push(`## 1.3 Web Component conventions (apply to every \`<l-*>\` tag)`);
push(``);
push(`- **Tag name:** ${code("l-" + "<kebab-case-component-name>")}, e.g. \`Button\` → \`<l-button>\`, \`SearchInput\` → \`<l-search-input>\`. (HTML tag names are case-insensitive, so \`<l-Button>\` also works.) The exact tag of each component is listed in its *Framework Interfaces* section.`);
push(`- **Attributes:** camelCase props become kebab-case attributes: \`iconPosition\` → \`icon-position\`, \`defaultMode\` → \`default-mode\`, \`transitionDuration\` → \`transition-duration\`. Setting the **property** (JS/Vue \`:prop\`/Angular \`[prop]\`) with the camelCase name always works too.`);
push(`- **Types:** \`string\` attributes are plain text; \`number\` attributes are numeric strings; \`boolean\` attributes need an explicit value — write \`disabled="true"\` / \`collapsed="true"\` and **\`show-label="false"\`** (a bare attribute is read as false); \`json\` attributes (\`items\`, \`options\`, \`data\`, \`columns\`, \`classNames\`…) take a JSON string, or assign an object to the property (\`el.items = [...]\`; Vue \`:items="items"\`; Angular \`[items]="items"\`).`);
push(`- **Children / slots:** light-DOM children are projected into the component's default slot. Components with named slots list them in *Slots / Children / Content*; use \`<div slot="name">…</div>\`.`);
push(`- **Events:** React callback props (\`onChange\`) become DOM CustomEvents with the callback name minus \`on\`, lower-cased (\`onChange\` → \`change\`, \`onCollapsedChange\` → \`collapsedchange\`); the payload is in \`event.detail\`. Vue: \`@change="…"\`; Angular: \`(change)="…"\`; JS: \`el.addEventListener("change", e => e.detail)\`.`);
push(`- **Shadow DOM:** components render into an open shadow root with the library's Tailwind styles included; \`theme.css\` CSS variables (inherited custom properties) cross the boundary, so theming works.`);
push(``);
push(`Framework templates (identical for every component — only the tag and attributes change):`);
push(``);
push("```html\n<!-- Plain HTML / JS -->\n<script type=\"module\">import \"lojee-ui/elements\";</script>\n<l-button variant=\"outline\" color=\"indigo\" label=\"Save\" id=\"save\"></l-button>\n<script>document.getElementById(\"save\").addEventListener(\"click\", () => console.log(\"clicked\"));</script>\n```");
push("```vue\n<!-- Vue 3: tell the compiler l-* tags are custom elements (vite: vue({ template: { compilerOptions: { isCustomElement: t => t.startsWith(\"l-\") } } })) -->\n<template>\n  <l-sidebar :items=\"items\" collapsible=\"true\" @activeitemchange=\"(e) => onActive(e.detail)\" />\n</template>\n<script setup lang=\"ts\">\nimport \"lojee-ui/elements\";\nconst items = [{ label: \"Dashboard\", icon: \"home\" }];\n</script>\n```");
push("```ts\n// Angular (standalone component)\nimport { Component, CUSTOM_ELEMENTS_SCHEMA } from \"@angular/core\";\nimport \"lojee-ui/elements\";\n\n@Component({\n  selector: \"app-nav\",\n  standalone: true,\n  schemas: [CUSTOM_ELEMENTS_SCHEMA],\n  template: `<l-sidebar [items]=\"items\" collapsible=\"true\" (activeitemchange)=\"onActive($event.detail)\" />`,\n})\nexport class NavComponent {\n  items = [{ label: \"Dashboard\", icon: \"home\" }];\n  onActive(item: unknown) {}\n}\n```");
push(``);
push(`## 1.4 Theming`);
push(``);
push(`Theme state is four independent settings, written as attributes on \`<html>\` (or on a scoped wrapper):`);
push(``);
push(table(["Setting", "Attribute", "Values", "Default"], [
  ["Mode", code("data-theme"), "`light`, `dark`", "`light`"],
  ["Accent", code("data-accent"), `${COLOR_NAMES.map(code).join(", ")}, or \`custom\` (+ \`data-accent-color="#hex"\`)`, "`slate`"],
  ["Design", code("data-design"), "`bento` (flat surfaces, thin borders, modest radii), `clay` (Claymorphism — soft, puffy, raised shapes, pressed-in fields)", "`bento`"],
  ["Active-item style", code("data-active-variant"), "`solid`, `outline`, `soft` — how the current item in Sidebar / Navbar / Pagination / Tabs … is drawn", "`solid`"],
]));
push(`How to set them:`);
push(``);
push(`- **React:** wrap the app in ${code("<ThemeProvider defaultMode=\"dark\" defaultAccent=\"orange\" defaultDesign=\"clay\" defaultActiveVariant=\"solid\">")}; read/change with the ${code("useTheme()")} hook (\`{ mode, accent, design, activeVariant, setMode, setAccent, setDesign, setActiveVariant }\`). Choices are persisted in \`localStorage\` (\`lojee-ui:theme\`, \`lojee-ui:accent\`, \`lojee-ui:design\`, \`lojee-ui:active-variant\`). ${code("<ThemeProvider isolated>")} scopes the theme to a wrapper instead of \`<html>\`.`);
push(`- **Anything:** drop a ${code("<ThemeSwitcher />")} (\`<l-theme-switcher>\`) anywhere — it works with or without a provider and writes the attributes itself.`);
push(`- **Without JS:** set the \`data-*\` attributes on \`<html>\` yourself.`);
push(`- **Scoped:** the \`App\` shell and \`ThemeProvider isolated\` accept \`theme\` / \`accent\` / \`design\` / \`activeVariant\` to pin one region.`);
push(``);
push(`Design tokens (CSS custom properties, all prefixed \`--lojee-\`): \`--lojee-surface\`, \`--lojee-surface-muted\`, \`--lojee-surface-raised\`, \`--lojee-fg\`, \`--lojee-fg-muted\`, \`--lojee-fg-subtle\`, \`--lojee-border\`, \`--lojee-border-strong\`, and the accent palette \`--lojee-accent-50 … --lojee-accent-950\`. Tailwind classes use them via \`bg-surface\`, \`bg-surface-muted\`, \`text-fg\`, \`text-fg-muted\`, \`text-fg-subtle\`, \`border-border\`, \`border-border-strong\`, and \`accent-*\` (e.g. \`bg-accent-600\`). Override a token on any ancestor to re-skin a region.`);
push(``);
push(`## 1.5 Colors`);
push(``);
push(`Most components take a ${code("color")} prop of type \`ColorName\`: ${[...COLOR_NAMES.map(code), code("accent")].join(", ")}. \`accent\` follows the active theme accent (so it recolors when the user picks an accent); the others are fixed palette colors. Several components also accept any CSS color string (a hex like \`"#e11d89"\`) for \`color\` — their prop description says so.`);
push(``);
push(`## 1.6 Sizes`);
push(``);
push(`Sized components use a ${code("size")} prop — usually ${code("sm")} | ${code("md")} | ${code("lg")} (default \`md\`); Button / Avatar / Tooltip add \`xs\` and/or \`xl\`. Each component's *Sizes* section lists its exact values. Input-like controls share heights: sm 32px, md 40px, lg 48px.`);
push(``);
push(`## 1.7 Motion (shared props on most components)`);
push(``);
push(table(["Prop", "Values", "Meaning"], [
  [code("transition"), TRANSITIONS.map(code).join(", "), "Enter transition played on mount (and for overlays on open/close). Default none. Respects `prefers-reduced-motion`."],
  [code("transitionDuration"), "number (ms)", "Duration of that transition (default 450)."],
  [code("transitionDelay"), "number (ms)", "Delay before it starts — handy for staggering."],
  [code("hoverEffect"), HOVER_EFFECTS.map(code).join(", "), "Effect while hovering. Default none."],
  [code("animated"), ANIMATED.map(code).join(", "), "Looping attention animation on some components (Button, Badge, Avatar, Card, Alert, Stat, ProfileCard). Pair with `pulseColor` / `pulseGradientTo`."],
]));
push(`## 1.8 Icons`);
push(``);
push(`Icons are referenced **by name** (a string like \`"mail"\`, \`"arrow-right"\`, \`"search"\`) — never as components — so they survive an HTML attribute boundary. The registry is \`src/core/icons.ts\`; the \`Icons\` page of the docs site lists every available name. Props: \`icon\`, \`leadingIcon\`, \`trailingIcon\`, \`headerIcon\`, etc.`);
push(``);
push(`## 1.9 Accessibility conventions`);
push(``);
push(`- Native elements are used where possible (\`<button>\`, \`<a>\`, \`<input>\`); custom widgets carry the right ARIA \`role\` and state (\`aria-expanded\`, \`aria-selected\`, \`aria-current\`, \`aria-invalid\`, \`aria-checked\` …) — each component's *Accessibility* section lists what its source sets.`);
push(`- Pass ${code("aria-label")} on icon-only controls (\`iconOnly\` buttons, search/clear buttons). Form controls accept native \`id\`, \`name\`, \`aria-*\`, \`required\`, \`disabled\` attributes (they spread onto the underlying element).`);
push(`- Overlays (Modal, Drawer, Sheet, Popover, menus, Command Menu) close on **Escape** and on outside click; menus support arrow-key navigation.`);
push(`- Focus rings use \`focus-visible\`; animations respect \`prefers-reduced-motion\`; colors meet contrast in both light and dark modes. \`disabled\` removes controls from the tab order.`);
push(`- Label every field: use \`<Label htmlFor>\` (or the \`label\` prop where a component has one) and mark \`invalid\` with an error message nearby.`);
push(``);
push(`## 1.10 Responsive behavior`);
push(``);
push(`- Components are fluid (\`w-full\` inside their container) and mobile-first; breakpoints follow Tailwind (\`sm\` 640, \`md\` 768, \`lg\` 1024, \`xl\` 1280, \`2xl\` 1536). The App shell uses **container queries** (it reacts to its own width, not the viewport), collapsing \`<Side>\` into an off-canvas drawer below \`collapseBelow\`.`);
push(`- Icon-only collapse: navigation components hide text labels on small screens and show tooltips.`);
push(`- Each component's *Responsive Behavior* section lists the breakpoint modifiers its source uses.`);
push(``);
push(`## 1.11 Customization`);
push(``);
push(`- **\`className\`** — extra classes on the root element. **\`classNames\`** — an object of per-part class overrides (\`root\`, \`icon\`, \`label\`, …); each component lists its parts under *Customization*. Classes are merged with \`tailwind-merge\`, so a conflicting utility you pass (a different \`bg-*\`, \`rounded-*\`) **wins** over the built-in one.`);
push(`- **Theme tokens** (§1.4) restyle everything at once; **\`color\`/accent** recolors accents; **\`data-design="clay"\`** switches the whole library to Claymorphism without touching components.`);
push(`- **Inline \`style\`** is accepted by form controls; custom colors (hex) work on components that say so.`);
push(``);
push(`## 1.12 Composition patterns`);
push(``);
push(`- **Layout shell:** \`<App>\` with \`<Top>\` (Navbar), \`<Side>\` (Sidebar), \`<Main>\`, \`<Footer>\` — a CSS-grid shell generated from a matrix \`layout\` prop; \`<SideToggle>\` opens the drawer on small screens.`);
push(`- **Forms:** \`Label\` + \`Input\`/\`Textarea\`/\`Select\`/\`Checkbox\`/\`Radio\`/\`Switch\` … inside a Card; submit with \`Button\`; ready-made \`LoginForm\`, \`SignupForm\`, \`ProfileSettings\`, \`AccountSettings\`, \`PlanBilling\`.`);
push(`- **Overlays:** \`Modal\` / \`Drawer\` / \`Sheet\` / \`AlertDialog\` / \`Popover\` take an \`open\` flag and \`onClose\`; place other components inside.`);
push(`- **Feedback:** \`Alert\`, \`Toast\`/\`Notification\`, \`ProgressBar\`, \`Skeleton\`, \`LoadingState\`/\`EmptyState\`/\`ErrorState\`/\`SuccessState\`.`);
push(`- **Data display:** \`Table\`, \`Chart\`, \`Stat\`, \`Timeline\`, \`ActivityFeed\`, \`List\`, \`GridView\`, \`DetailsList\`, \`Calendar\`, \`Map\` (+ \`MapMarker\`, \`MapRoute\`), \`FlowDiagram\`.`);
push(`- Each component's *Component Composition* section lists the other library components its own examples combine it with.`);
push(``);

// ===== Part 2 =====
push(`---`);
push(``);
push(`# Part 2 — Component catalog`);
push(``);
push(`Each section: **1 Overview · 2 Props and Interfaces · 3 Events · 4 Variants · 5 Colors and Theming · 6 Sizes · 7 Component States · 8 Slots / Children / Content · 9 Framework Interfaces · 10 Complete Usage Examples · 11 Component Composition · 12 Accessibility · 13 Responsive Behavior · 14 Customization**. Required props are marked **required**; \`—\` means no default.`);
push(``);

const allPages = [...new Set([...categories.flatMap((c) => c.labels), ...Object.keys(API_DOCS)])].filter((l) => API_DOCS[l]);
const toc = [];
const indexRows = [];
const eventRows = [];
const anchorOf = (label) => label.toLowerCase().replace(/[^a-z0-9 -]/g, "").trim().replace(/\s+/g, "-");

// The shared form events of the `<l-*>` form controls (src/elements/with-form-events.tsx).
const FORM_EVENT_DOCS = {
  update: "The value was committed (the native `change`); `detail` = the new value (`true` / `false` for a checkbox or switch, the value `string` / `number` otherwise). React: `onChange`.",
  input: "Fires as the user edits (typing, dragging); `detail` = the current value. React: `onInput`.",
  focus: "The control gained focus; `detail` = the current value. React: `onFocus`.",
  invalid: "The control failed validation (e.g. `required` and empty); `detail` = the validation message. React: `onInvalid`.",
};
const MAX_EXAMPLES = 5;
const MAX_CODE_LINES = 40;
// Props every component shares are documented once in §1.7; their rows are folded into one line per table.
const SHARED_MOTION = new Set(["transition", "transitionDuration", "transitionDelay", "hoverEffect"]);
const clip = (s) => {
  const lines = s.split("\n");
  return lines.length > MAX_CODE_LINES ? lines.slice(0, MAX_CODE_LINES).join("\n") + "\n// … (shortened)" : s;
};
const fence = (lang, body) => "```" + lang + "\n" + clip(body) + "\n```";

function pageSection(label, categoryName) {
  const doc = API_DOCS[label];
  const dir = pageToDir[label];
  const sc = dir ? readShowcase(dir) : { title: null, description: null, examples: [] };
  const facts = dir ? readSourceFacts(dir) : { native: [], roles: [], aria: [], bps: [], keyboard: false, focusRing: false, reducedMotion: false, container: false };
  const main = doc.components[0];
  push(`## ${label}`);
  push(``);
  push(`*Category: ${categoryName}.* Exports: ${doc.components.map((c) => code(c.name)).join(", ")}.`);
  push(``);

  // 1 Overview
  push(`### ${label} · 1. Component Overview`);
  push(``);
  push(sc.description ? `${sc.description}` : `The ${label} component${doc.components.length > 1 ? "s" : ""} of the library.`);
  push(``);
  push(`- React: ${doc.components.map((c) => code(`import { ${c.name} } from "${pkg.name}"`)).join(" · ")}`);
  const tags = doc.components.filter((c) => c.element).map((c) => code(`<${c.element.tag}>`));
  if (tags.length) push(`- Web Component: ${tags.join(" · ")} (after ${code(`import "${pkg.name}/elements"`)})`);
  push(``);

  // 2 Props
  push(`### ${label} · 2. Props and Interfaces`);
  push(``);
  for (const c of doc.components) {
    push(`#### ${code(c.name)}`);
    push(``);
    const shownProps = c.props.filter((p) => !SHARED_MOTION.has(p.name));
    const foldedMotion = c.props.length - shownProps.length;
    push(shownProps.length ? table(["Prop", "Type", "Default", "Description"], shownProps.map((p) => [code(p.name) + (p.required ? " **required**" : ""), code(esc(p.type)), p.default ? code(esc(p.default)) : "—", esc(p.description) || "—"])) : `_No props._\n`);
    if (foldedMotion) push(`Also accepts the shared motion props ${c.props.filter((p) => SHARED_MOTION.has(p.name)).map((p) => code(p.name)).join(", ")} — see §1.7.\n`);
  }
  if (facts.native.length) push(`**Native attributes:** these components also accept every standard attribute of the underlying \`<${facts.native.join(">\` / \`<")}>\` (e.g. \`id\`, \`name\`, \`value\`, \`defaultValue\`, \`placeholder\`, \`disabled\`, \`required\`, \`readOnly\`, \`min\`/\`max\`/\`step\`, \`aria-*\`, \`onChange\`/\`onFocus\`/\`onBlur\`) — they are spread onto it.\n`);
  if (doc.dataTypes?.length) {
    push(`#### Data shapes (objects passed to props)`);
    push(``);
    for (const dt of doc.dataTypes) {
      push(`**${code(dt.name)}**${dt.via ? ` — passed via ${code(dt.via)}` : ""}${dt.note ? `. ${dt.note}` : ""}`);
      push(``);
      if (dt.props.length) push(table(["Field", "Type", "Description"], dt.props.map((p) => [code(p.name) + (p.required ? " **required**" : ""), code(esc(p.type)), esc(p.description) || "—"])));
      if (dt.example) push("```ts\n" + dt.example + "\n```\n");
    }
  }
  if (doc.hooks?.length) {
    push(`#### Hooks`);
    push(``);
    push(table(["Hook", "Signature", "Description"], doc.hooks.map((h) => [code(h.name), code(esc(h.signature)), esc(h.description) || "—"])));
  }

  // 3 Events
  push(`### ${label} · 3. Events`);
  push(``);
  const cbRows = [];
  for (const c of doc.components) {
    for (const p of c.props) if (/^on[A-Z]/.test(p.name)) {
      const ev = c.element?.events.find((e) => e.callback === p.name);
      cbRows.push([code(c.name), code(p.name), code(esc(p.type)), ev ? code(ev.event) + " (CustomEvent, payload in `detail`)" : "— (React only)", esc(p.description) || "—"]);
      if (ev) eventRows.push([label, code(c.element.tag), code(ev.event), code(p.name)]);
    }
    for (const ev of c.element?.events ?? []) if (!c.props.some((p) => p.name === ev.callback)) {
      cbRows.push([code(c.name), code(ev.callback), "—", code(ev.event) + " (CustomEvent, payload in `detail`)", FORM_EVENT_DOCS[ev.event] ?? "—"]);
      eventRows.push([label, code(c.element.tag), code(ev.event), code(ev.callback)]);
    }
  }
  push(cbRows.length ? table(["Component", "React callback", "Signature", "Web Component event", "Description"], cbRows) : `_No component-specific events._ Native DOM events (\`click\`, \`input\`, \`focus\`…) bubble from the rendered element as usual.\n`);

  // 4-7 props-derived
  const allProps = doc.components.flatMap((c) => c.props.map((p) => ({ ...p, comp: c.name })));
  const valueRows = (names) =>
    allProps.filter((p) => names.includes(p.name)).map((p) => {
      const vals = literalValues(p.type);
      return [code(p.comp), code(p.name), vals ? vals.map(code).join(", ") : code(esc(p.type)), p.default ? code(esc(p.default)) : "—", esc(p.description) || "—"];
    });
  push(`### ${label} · 4. Variants`);
  push(``);
  const variantRows = valueRows(["variant", "type", "orientation", "shape", "position", "align", "layout", "mode", "direction", "kind", "style", "activeStyle", "placement", "variantType"]);
  push(variantRows.length ? table(["Component", "Prop", "Values", "Default", "Notes"], variantRows) : `_This component has no variant prop — it has a single look (restyle it with colors / ${code("classNames")})._\n`);

  push(`### ${label} · 5. Colors and Theming`);
  push(``);
  const colorRows = valueRows(["color", "gradientTo", "pulseColor", "tooltipColor", "accent", "theme", "design", "activeVariant", "defaultMode", "defaultAccent", "defaultDesign", "defaultActiveVariant"]);
  push(colorRows.length ? table(["Component", "Prop", "Values", "Default", "Notes"], colorRows) : "");
  push(`Follows the global theme (§1.4): it recolors with the accent, switches with light / dark mode, and takes the Claymorphism look when ${code('data-design="clay"')} is set.${colorRows.length ? "" : " It has no color prop of its own."}`);
  push(``);

  push(`### ${label} · 6. Sizes`);
  push(``);
  const sizeRows = valueRows(["size", "width", "height", "iconSize", "sizes"]);
  push(sizeRows.length ? table(["Component", "Prop", "Values", "Default", "Notes"], sizeRows) : `_No size prop — it sizes to its container / content (see ${code("className")} to constrain it)._\n`);

  push(`### ${label} · 7. Component States`);
  push(``);
  const STATE_NAMES = ["disabled", "loading", "invalid", "required", "readOnly", "checked", "defaultChecked", "indeterminate", "open", "collapsed", "active", "selected", "error", "dark", "indeterminate", "sticky", "bordered", "collapsible", "dismissible", "closable", "autoFocus", "animated", "iconOnly", "multiple", "clearable", "searchable", "striped", "showLabel", "countUp"];
  const stateRows = allProps.filter((p) => STATE_NAMES.includes(p.name)).map((p) => [code(p.comp), code(p.name), code(esc(p.type)), p.default ? code(esc(p.default)) : "—", esc(p.description) || "—"]);
  if (facts.native.length) push(`Native states also work: ${code("disabled")}, ${code("required")}, ${code("readOnly")} (spread onto the underlying element).\n`);
  push(stateRows.length ? table(["Component", "Prop", "Type", "Default", "Effect"], stateRows) : `_No dedicated state props — the visual states are default, hover, focus-visible and active._\n`);
  push(`Standard visual states: default · hover · focus-visible (ring) · active/pressed${stateRows.some((r) => /disabled/.test(r[1])) ? " · disabled (dimmed, not focusable)" : ""}${stateRows.some((r) => /invalid|error/.test(r[1])) ? " · invalid (rose border/ring, \`aria-invalid\`)" : ""}${stateRows.some((r) => /loading/.test(r[1])) ? " · loading (spinner, blocks clicks)" : ""}.`);
  push(``);

  // 8 Slots
  push(`### ${label} · 8. Slots / Children / Content`);
  push(``);
  const contentRows = allProps.filter((p) => p.name === "children" || /ReactNode|ReactElement/.test(p.type)).map((p) => [code(p.comp), code(p.name), code(esc(p.type)), esc(p.description) || "—"]);
  const extra = doc.components.flatMap((c) => (c.element?.extraProps ?? []).map((e) => [code(c.name), code(e.name), code(esc(e.type)), esc(e.description) || "—"]));
  if (contentRows.length) push(table(["Component", "React prop", "Type", "Description"], contentRows));
  if (extra.length) {
    push(`Web Component extras (slots and plain HTML attributes accepted by the \`<l-*>\` tag in addition to the props above):`);
    push(``);
    push(table(["Component", "Name", "Type", "Description"], extra));
  }
  if (!contentRows.length && !extra.length) push(`_No children or slots — it is configured entirely through props._\n`);
  push(`In a Web Component, the element's light-DOM text/children go into the default slot; a prop that accepts a node (e.g. ${code("header")}, ${code("footer")}) can usually also be filled with a child carrying ${code('slot="<name>"')}.`);
  push(``);

  // 9 Framework interfaces
  push(`### ${label} · 9. Framework Interfaces`);
  push(``);
  for (const c of doc.components) {
    if (!c.element) {
      push(`- ${code(c.name)}: React only (no standalone Web Component${doc.components.length > 1 ? " — used through its parent" : ""}).`);
      continue;
    }
    push(`**${code(c.name)}** → ${code(`<${c.element.tag}>`)}`);
    push(``);
    push(table(["React prop", "HTML attribute", "Attribute type"], Object.entries(c.element.props).map(([k, v]) => [code(k), code(kebab(k)), v === "json" ? "json (JSON string or object property)" : v])));
  }
  const ex0 = sc.examples[0];
  if (ex0) {
    push(`Minimal use in each target (from the first docs example, *${ex0.title}*):`);
    push(``);
    push(`**React**`);
    push(fence("tsx", ex0.react));
    if (ex0.js) push(`**Plain HTML / JavaScript**\n${fence("html", ex0.js)}`);
    push(`Vue and Angular use the same \`<l-*>\` tag and attributes — see the framework templates in §1.3.`);
  }
  push(``);

  // 10 Examples
  push(`### ${label} · 10. Complete Usage Examples`);
  push(``);
  if (sc.examples.length) {
    for (const ex of sc.examples.slice(0, MAX_EXAMPLES)) {
      push(`#### ${ex.title}`);
      push(``);
      if (ex.sub) push(`${ex.sub}`, ``);
      push(fence("tsx", ex.react));
      push(``);
    }
    if (sc.examples.length > MAX_EXAMPLES) push(`_${sc.examples.length - MAX_EXAMPLES} more examples are on the docs page._\n`);
  } else {
    const minimal = main ? `<${main.name}${main.props.filter((p) => p.required).map((p) => ` ${p.name}={…}`).join("")} />` : "";
    push(`No packaged examples. Minimal use:\n\n${fence("tsx", `import { ${main?.name ?? label} } from "${pkg.name}";\n\n${minimal}`)}`);
  }

  // 11 Composition
  push(`### ${label} · 11. Component Composition`);
  push(``);
  const used = new Set();
  for (const ex of sc.examples) for (const m of ex.react.matchAll(/<([A-Z][A-Za-z]+)/g)) if (COMPONENT_NAMES.has(m[1]) && !doc.components.some((c) => c.name === m[1])) used.add(m[1]);
  if (doc.components.length > 1) push(`- Built from ${doc.components.map((c) => code(c.name)).join(", ")} — use them together as shown in the examples above.`);
  if (used.size) push(`- Combined in its own examples with: ${[...used].sort().map(code).join(", ")}.`);
  const dataProps = main?.props.filter((p) => ["items", "options", "data", "columns", "rows", "steps", "tabs", "markers", "routes", "events", "messages"].includes(p.name)).map((p) => code(p.name)) ?? [];
  if (dataProps.length) push(`- Data-driven: pass ${dataProps.join(", ")} instead of child components (works the same as a Web Component).`);
  if (!used.size && doc.components.length === 1 && !dataProps.length) push(`- Standalone: drop it into any layout (Card, Section, Grid, Container, App shell) or inside forms and overlays.`);
  push(``);

  // 12 Accessibility
  push(`### ${label} · 12. Accessibility`);
  push(``);
  const ariaProps = allProps.filter((p) => /^aria-|ariaLabel|label$/.test(p.name)).map((p) => code(p.name));
  push(`- ARIA roles used: ${facts.roles.length ? facts.roles.map(code).join(", ") : "none beyond native element semantics"}.`);
  push(`- ARIA attributes set by the component: ${facts.aria.length ? facts.aria.map(code).join(", ") : "none"}.`);
  push(`- Keyboard: ${facts.keyboard ? "has keyboard handling (e.g. Escape / arrow keys) — see the docs page for the exact keys" : "native keyboard behavior of the underlying element (Tab to focus, Enter / Space to activate)"}.`);
  push(`- Focus: ${facts.focusRing ? "visible focus ring (`focus-visible`)" : "uses the browser focus outline / the underlying control's ring"}.`);
  push(`- Motion: ${facts.reducedMotion ? "respects `prefers-reduced-motion`" : "inherits the library's reduced-motion handling for transitions"}.`);
  if (ariaProps.length) push(`- Labelling props: ${ariaProps.join(", ")}.`);
  push(``);

  // 13 Responsive
  push(`### ${label} · 13. Responsive Behavior`);
  push(``);
  push(facts.bps.length ? `- Breakpoint modifiers in its source: ${facts.bps.map(code).join(", ")}.` : `- No breakpoint-specific rules — it is fluid and adapts to its container width.`);
  if (facts.container) push(`- Measures its own container (container queries / ResizeObserver), so it adapts inside narrow panels, not only on small viewports.`);
  push(`- Mobile-first; touch targets keep a comfortable minimum size.`);
  push(``);

  // 14 Customization
  push(`### ${label} · 14. Customization`);
  push(``);
  const parts = [];
  for (const c of doc.components) {
    const cn = c.props.find((p) => p.name === "classNames");
    if (cn) {
      const keys = [...cn.type.matchAll(/(\w+)\??:\s*string/g)].map((m) => m[1]);
      parts.push(`${code(c.name)}: ${keys.length ? keys.map(code).join(", ") : "per-part overrides"}`);
    }
  }
  push(`- ${code("className")} adds classes to the root; ${code("classNames")} overrides individual parts${parts.length ? ` — ${parts.join(" · ")}` : ""}. Conflicting Tailwind utilities passed here win (tailwind-merge).`);
  push(`- Recolor with ${main?.props.some((p) => p.name === "color") ? code("color") : "the theme accent"}; restyle globally with the theme tokens or ${code('data-design="clay"')}.`);
  push(`- Motion: ${main?.props.some((p) => p.name === "transition") ? `${code("transition")}, ${code("transitionDuration")}, ${code("transitionDelay")}${main.props.some((p) => p.name === "hoverEffect") ? `, ${code("hoverEffect")}` : ""}` : "no per-component motion props"}.`);
  push(``);

  indexRows.push([`[${label}](#${anchorOf(label)})`, categoryName, doc.components.map((c) => code(c.name)).join(", "), doc.components.filter((c) => c.element).map((c) => code(`<${c.element.tag}>`)).join(", ") || "—"]);
}

const seen = new Set();
for (const cat of categories) {
  const labels = cat.labels.filter((l) => API_DOCS[l] && !seen.has(l));
  if (!labels.length) continue;
  push(`## ── ${cat.section} ──`);
  push(``);
  for (const l of labels) {
    seen.add(l);
    pageSection(l, cat.section);
  }
}
const leftover = Object.keys(API_DOCS).filter((l) => !seen.has(l));
if (leftover.length) {
  push(`## ── Other ──`);
  push(``);
  for (const l of leftover) pageSection(l, "Other");
}

// ===== Part 3 =====
push(`---`);
push(``);
push(`# Part 3 — Index and quick lookups`);
push(``);
push(`## 3.1 All components`);
push(``);
push(table(["Page", "Category", "React exports", "Web Component tags"], indexRows));
push(`## 3.2 Web Component events`);
push(``);
push(table(["Page", "Tag", "DOM event", "React callback"], eventRows));
push(`## 3.3 Checklist for generating code with this library`);
push(``);
push(`1. Import the stylesheet once (${code(`import "${pkg.name}/theme.css"`)}) and, for non-React use, ${code(`import "${pkg.name}/elements"`)}.`);
push(`2. Wrap React apps in ${code("<ThemeProvider>")} (or add ${code("<ThemeSwitcher />")}); set \`data-theme\` / \`data-accent\` / \`data-design\` for plain HTML.`);
push(`3. Pick the component from Part 2; use **only** props from its table; icons by name; colors from \`ColorName\`.`);
push(`4. Prefer the data-driven props (\`items\`, \`options\`, \`data\`, \`columns\`) — they work identically in React and as Web Components.`);
push(`5. For Web Components: kebab-case attributes, explicit \`="true"\` / \`="false"\` for booleans, JSON or property assignment for objects/arrays, events via \`detail\`.`);
push(`6. Customize with \`className\` / \`classNames\` and theme tokens rather than forking the component.`);
push(``);

const tocText = categories
  .map((cat) => `- **${cat.section}** — ${cat.labels.filter((l) => API_DOCS[l]).map((l) => `[${l}](#${anchorOf(l)})`).join(" · ")}`)
  .filter((l) => !/— $/.test(l))
  .join("\n");
const outText = L.join("\n").replace("<!--TOC-->", `**Components by category**\n\n${tocText}`).replace(/\n{3,}/g, "\n\n") + "\n";
// The single copy lives in public/, so the site serves it at /COMPONENTS.md — the support chatbot's backend fetches it from there.
fs.mkdirSync(path.join(root, "public"), { recursive: true });
fs.writeFileSync(path.join(root, "public/COMPONENTS.md"), outText);
console.log(`public/COMPONENTS.md: ${seen.size + leftover.length} pages, ${outText.length} chars`);
