import type { CodeBlockVariants } from "../CodeBlock";
import { DEFAULT_LAYOUT, gridTemplateAreas, gridTemplateColumns, gridTemplateRows, type GridLayout } from "./appLayout";

interface AppCodeOptions {
  layout?: GridLayout;
  /** Pin a theme on the shell via `data-theme` / `data-accent` / `data-active-variant`. */
  mode?: string;
  accent?: string;
  activeVariant?: string;
  /** Stack into one column below this width (CSS media query), like React's `collapseBelow`. */
  collapseBelow?: string;
}

const ITEMS = `[{ label: "Dashboard", icon: "home" }]`;

/**
 * `<App>` is a React layout component with no Web Component of its own, so the plain JS / Vue / Angular
 * versions build the same shell with a CSS grid (same areas/rows/columns the React component generates)
 * and drop the registered elements — `<l-navbar>`, `<l-sidebar>`, `<l-footer>` — into it.
 */
export function appCodeVariants(react: string, opts: AppCodeOptions = {}): CodeBlockVariants {
  const layout = opts.layout ?? DEFAULT_LAYOUT;
  const attrs = [
    opts.mode && `data-theme="${opts.mode}"`,
    opts.accent && `data-accent="${opts.accent}"`,
    opts.activeVariant && opts.activeVariant !== "solid" && `data-active-variant="${opts.activeVariant}"`,
  ]
    .filter(Boolean)
    .join(" ");
  const attrText = attrs ? ` ${attrs}` : "";

  const media = opts.collapseBelow
    ? `\n@media (max-width: ${opts.collapseBelow}) {\n  .app { grid-template-areas: "top" "main" "footer"; grid-template-columns: 1fr; grid-template-rows: auto 1fr auto; }\n  .app > aside { display: none; } /* open it as a drawer from your own toggle */\n}`
    : "";
  const css = `.app {
  display: grid;
  min-height: 100vh;
  grid-template-areas: ${gridTemplateAreas(layout)};
  grid-template-columns: ${gridTemplateColumns(layout)};
  grid-template-rows: ${gridTemplateRows(layout)};
}
.app > header { grid-area: top; }
.app > aside  { grid-area: side; }
.app > main   { grid-area: main; }
.app > footer { grid-area: footer; }${media}`;

  const markup = (items: string, indent = "") =>
    [
      `<div class="app"${attrText}>`,
      `  <header><l-navbar${items === "plain" ? ' id="nav"' : ""}></l-navbar></header>`,
      `  <aside><l-sidebar${items === "plain" ? ' id="side"' : ""} height="100%"${items === "vue" ? ' :items="items"' : items === "angular" ? ' [items]="items"' : ""}></l-sidebar></aside>`,
      `  <main><l-button color="accent" label="Solid"></l-button></main>`,
      `  <footer><l-footer></l-footer></footer>`,
      `</div>`,
    ]
      .map((l) => indent + l)
      .join("\n");

  const note = `<!-- No <l-app> element: build the shell with CSS grid and drop the web components in. -->`;

  return {
    react,
    js: `${note}
${markup("plain")}

<style>
${css}
</style>

<script type="module">
  import "lojee-ui/elements";
  document.getElementById("side").items = ${ITEMS};
</script>`,
    vue: `<template>
  ${note}
${markup("vue", "  ")}
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = ${ITEMS};
</script>

<style scoped>
${css}
</style>`,
    angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
${markup("angular", "    ")}
  \`,
  styles: [\`
${css.replace(/^/gm, "    ")}
  \`],
})
export class AppComponent {
  items = ${ITEMS};
}`,
  };
}
