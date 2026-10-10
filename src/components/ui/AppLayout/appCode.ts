import type { CodeBlockVariants } from "../CodeBlock";
import { DEFAULT_LAYOUT, type AppSection, type GridLayout } from "./appLayout";

interface AppCodeOptions {
  layout?: GridLayout;
  /** Theme given to the `ThemeProvider` the example is wrapped in (`default-mode` / `default-accent` / `default-active-variant`). */
  mode?: string;
  accent?: string;
  activeVariant?: string;
  design?: string;
  /** Sections left out of the example (their markup is omitted). */
  hidden?: AppSection[];
  /** Stack into one column below this container width, like React's `collapseBelow` ("md" is the default). */
  collapseBelow?: string;
}

const ITEMS = `[{ label: "Dashboard", icon: "home" }]`;
const sameLayout = (a: GridLayout, b: GridLayout) => JSON.stringify(a) === JSON.stringify(b);
// Inside a double-quoted Vue / Angular binding, string literals take single quotes.
const bound = (v: string) => v.replace(/'/g, "\\'").replace(/"/g, "'");

/**
 * The plain JS / Vue / Angular versions of an `<App>` example. They mirror the React structure one to one:
 * `<l-theme-provider>` wraps `<l-app>`, which holds `<l-top>` (the Navbar, with `<l-side-toggle>` as its brand),
 * `<l-side>` (the Sidebar), `<l-main>` and `<l-foot>` (the Footer) — the same Top / Side / Main / Foot as React.
 */
export function appCodeVariants(react: string, opts: AppCodeOptions = {}): CodeBlockVariants {
  const layout = opts.layout ?? DEFAULT_LAYOUT;
  const customLayout = !sameLayout(layout, DEFAULT_LAYOUT);
  const layoutLiteral = `[\n${layout.map((row) => `    [${row.map((s) => `"${s}"`).join(", ")}],`).join("\n")}\n  ]`;
  const layoutFlat = JSON.stringify(layout).replace(/,/g, ", ");

  const providerAttrs = [
    `default-mode="${opts.mode ?? "light"}"`,
    opts.accent && `default-accent="${opts.accent}"`,
    opts.activeVariant && opts.activeVariant !== "solid" && `default-active-variant="${opts.activeVariant}"`,
    opts.design && opts.design !== "bento" && `default-design="${opts.design}"`,
  ]
    .filter(Boolean)
    .join(" ");
  const appAttrs = opts.collapseBelow ? ` collapse-below="${opts.collapseBelow}"` : "";

  // The four sections, one block each; `itemsAttr` adds the framework-specific `items` binding / id.
  const has = (section: AppSection) => !(opts.hidden ?? []).includes(section);
  const sections = (navAttr: string, sideAttr: string, indent: string) =>
    [
      ...(has("top") ? [`<l-top>`, `  <l-navbar${navAttr}><l-side-toggle slot="brand"></l-side-toggle></l-navbar>`, `</l-top>`] : []),
      ...(has("side") ? [`<l-side>`, `  <l-sidebar width="210"${sideAttr}></l-sidebar>`, `</l-side>`] : []),
      `<l-main>`,
      `  <l-button color="accent" label="Solid"></l-button>`,
      `  <l-button color="accent" variant="outline" label="Outline"></l-button>`,
      `  <l-button color="accent" variant="soft" label="Soft"></l-button>`,
      `  <l-button variant="solid" color="accent" size="lg" animation="sweep" icon="plus" label="Click me"></l-button>`,
      `</l-main>`,
      ...(has("footer") ? [`<l-foot>`, `  <l-footer bottom="© 2026 Lojee, Inc. All rights reserved."></l-footer>`, `</l-foot>`] : []),
    ]
      .map((l) => indent + l)
      .join("\n");
  const needsItems = has("top") || has("side");
  const itemLines = [has("top") ? `  document.getElementById("nav").items = items;` : "", has("side") ? `  document.getElementById("side").items = items;` : ""].filter(Boolean).join("\n");

  return {
    react,
    js: `<l-theme-provider ${providerAttrs}>
  <l-app id="app"${appAttrs}>
${sections(' id="nav"', ' id="side"', "    ")}
  </l-app>
</l-theme-provider>

<script type="module">
  import "lojee-ui/elements";
${customLayout ? `\n  document.getElementById("app").layout = ${layoutLiteral};` : ""}
${needsItems ? `  const items = ${ITEMS};\n${itemLines}` : ""}
</script>`,
    vue: `<template>
  <l-theme-provider ${providerAttrs}>
    <l-app${appAttrs}${customLayout ? ` :layout="${bound(layoutFlat)}"` : ""}>
${sections(' :items="items"', ' :items="items"', "      ")}
    </l-app>
  </l-theme-provider>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
${needsItems ? `\nconst items = ${ITEMS};\n` : ""}</script>`,
    angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-theme-provider ${providerAttrs}>
      <l-app${appAttrs}${customLayout ? ` [layout]="${bound(layoutFlat)}"` : ""}>
${sections(' [items]="items"', ' [items]="items"', "        ")}
      </l-app>
    </l-theme-provider>
  \`,
})
export class AppComponent {${needsItems ? `\n  items = ${ITEMS};` : ""}
}`,
  };
}
