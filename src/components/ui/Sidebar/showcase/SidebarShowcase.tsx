import { useState } from "react";
import { Sidebar, type SidebarMenuItemSpec, type SidebarProps } from "../Sidebar";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

// Reused across the "Variants"/"Colors"/"Collapsible" sections below — items generated from these
// automatically pick up whatever `color`/`variant`/`collapsed` the parent Sidebar itself gets.
const VARIANT_ITEMS: SidebarMenuItemSpec[] = [
  { label: "Dashboard", icon: "home", active: true },
  { label: "Projects", icon: "folder" },
  { label: "Team", icon: "users" },
  { label: "Settings", icon: "settings" },
];

// Each example starts collapsed so hovering a row shows its tooltip right away; `collapsed` is
// controlled here only to fix that state (no toggle, no header) — tooltips use the theme accent
// unless an example sets its own `tooltipColor`.
function CollapsedSidebar(props: Partial<SidebarProps>) {
  const collapsed = true;
  return (
    <div className="h-64 w-fit overflow-hidden rounded-lg border border-border">
      <Sidebar
        collapsed={collapsed}
        items={[
          { label: "Dashboard", icon: "home" },
          { label: "Projects", icon: "folder" },
          { label: "Team", icon: "users" },
        ]}
        {...props}
      />
    </div>
  );
}

const TOOLTIP_EXAMPLES: { label: string; props: Partial<SidebarProps> }[] = [
  { label: "Default (bounce)", props: {} },
  { label: "zoom", props: { tooltipTransition: "zoom" } },
  { label: "fade", props: { tooltipTransition: "fade" } },
  { label: "slide-left · 700ms", props: { tooltipTransition: "slide-left", tooltipTransitionDuration: 700 } },
  { label: "flip", props: { tooltipTransition: "flip" } },
  { label: "blur", props: { tooltipTransition: "blur" } },
  { label: "rotate", props: { tooltipTransition: "rotate" } },
  { label: "drop · 900ms", props: { tooltipTransition: "drop", tooltipTransitionDuration: 900 } },
  { label: "skew", props: { tooltipTransition: "skew" } },
];

export default function SidebarShowcase() {
  const [activeLabel, setActiveLabel] = useState<string | undefined>(undefined);

  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Sidebar</h1>
          <p className="text-sm text-fg-subtle mt-1">
            A vertical navigation panel — an app-shell shell for the rest of the library's nav content.
          </p>
        </div>

        <section>
          <SectionLabel sub="items is the data-driven shortcut for a simple nav list — label + icon rows with no active/path/onClick/disabled state (compose SidebarMenuItem directly instead when you need that).">
            Basic
          </SectionLabel>
          <div className="h-80 overflow-hidden rounded-lg border border-border">
            <Sidebar items={VARIANT_ITEMS} />
          </div>
          <CodeBlock
            variants={{
              react: `<Sidebar
  items={[
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
    { label: "Team", icon: "users" },
    { label: "Settings", icon: "settings" },
  ]}
/>`,
              js: `<l-Sidebar id="basic-sidebar"></l-Sidebar>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("basic-sidebar").items = [
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
    { label: "Team", icon: "users" },
    { label: "Settings", icon: "settings" },
  ];
</script>`,
              vue: `<template>
  <l-Sidebar :items="items" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = [
  { label: "Dashboard", icon: "home", active: true },
  { label: "Projects", icon: "folder" },
  { label: "Team", icon: "users" },
  { label: "Settings", icon: "settings" },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-Sidebar [items]="items" />\`,
})
export class AppComponent {
  items = [
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
    { label: "Team", icon: "users" },
    { label: "Settings", icon: "settings" },
  ];
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Leave `active` unset on every row (the common case) and Sidebar determines and manages it itself: a row's path is matched against the current URL on load/back-forward-navigation, and clicking any row updates it immediately — no router wiring or state needed. Clicking a row with a path changes the URL without reloading the page (history.pushState); pass onNavigate to hand the path to your own router instead. defaultActiveItem seeds which row starts active (Dashboard here) without touching the items themselves — purely an initial default, so clicking around afterward still works normally. onActiveItemChange reports the full item object whenever the active row changes, e.g. to sync it elsewhere.">
            Active item
          </SectionLabel>
          <div className="h-80 overflow-hidden rounded-lg border border-border">
            <Sidebar
              defaultActiveItem="Dashboard"
              onActiveItemChange={(item) => setActiveLabel(item.label)}
              items={[
                { label: "Dashboard", icon: "home", path: "/dashboard" },
                { label: "Projects", icon: "folder", path: "/projects" },
                { label: "Team", icon: "users", path: "/team" },
                { label: "Settings", icon: "settings", path: "/settings" },
              ]}
            />
          </div>
          <p className="mt-2 text-xs font-medium text-fg-subtle">
            Active: <span className="text-fg-muted">{activeLabel ?? "none yet — click a row"}</span>
          </p>
          <CodeBlock
            variants={{
              react: `<Sidebar
  defaultActiveItem="Dashboard"
  onActiveItemChange={(item) => console.log(item)}
  items={[
    { label: "Dashboard", icon: "home", path: "/dashboard" },
    { label: "Projects", icon: "folder", path: "/projects" },
    { label: "Team", icon: "users", path: "/team" },
    { label: "Settings", icon: "settings", path: "/settings" },
  ]}
/>`,
              js: `<l-Sidebar id="active-item-sidebar" default-active-item="Dashboard"></l-Sidebar>

<script type="module">
  import "lojee-ui/elements";

  const sidebar = document.getElementById("active-item-sidebar");
  sidebar.items = [
    { label: "Dashboard", icon: "home", path: "/dashboard" },
    { label: "Projects", icon: "folder", path: "/projects" },
    { label: "Team", icon: "users", path: "/team" },
    { label: "Settings", icon: "settings", path: "/settings" },
  ];
  sidebar.addEventListener("activeitemchange", (e) => console.log(e.detail));
</script>`,
              vue: `<template>
  <l-Sidebar default-active-item="Dashboard" :items="items" @activeitemchange="(e) => console.log(e.detail)" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = [
  { label: "Dashboard", icon: "home", path: "/dashboard" },
  { label: "Projects", icon: "folder", path: "/projects" },
  { label: "Team", icon: "users", path: "/team" },
  { label: "Settings", icon: "settings", path: "/settings" },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-Sidebar default-active-item="Dashboard" [items]="items" (activeitemchange)="onActiveItemChange($event.detail)" />\`,
})
export class AppComponent {
  items = [
    { label: "Dashboard", icon: "home", path: "/dashboard" },
    { label: "Projects", icon: "folder", path: "/projects" },
    { label: "Team", icon: "users", path: "/team" },
    { label: "Settings", icon: "settings", path: "/settings" },
  ];
  onActiveItemChange(item: unknown) {
    console.log(item);
  }
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="header/headerIcon and footer are the data-driven shortcut for a workspace name pinned above the nav content and a user row pinned below it (compose SidebarHeader/SidebarFooter directly instead for custom markup like an avatar).">
            With header and footer
          </SectionLabel>
          <div className="h-96 overflow-hidden rounded-lg border border-border">
            <Sidebar header="Lojee Inc" headerIcon="zap" footer="Jordan Diaz" items={VARIANT_ITEMS} />
          </div>
          <CodeBlock
            variants={{
              react: `<Sidebar
  header="Lojee Inc"
  headerIcon="zap"
  footer="Jordan Diaz"
  items={[
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
    { label: "Team", icon: "users" },
    { label: "Settings", icon: "settings" },
  ]}
/>`,
              js: `<l-Sidebar id="header-footer-sidebar" header="Lojee Inc" header-icon="zap" footer="Jordan Diaz"></l-Sidebar>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("header-footer-sidebar").items = [
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
    { label: "Team", icon: "users" },
    { label: "Settings", icon: "settings" },
  ];
</script>`,
              vue: `<template>
  <l-Sidebar header="Lojee Inc" header-icon="zap" footer="Jordan Diaz" :items="items" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = [
  { label: "Dashboard", icon: "home", active: true },
  { label: "Projects", icon: "folder" },
  { label: "Team", icon: "users" },
  { label: "Settings", icon: "settings" },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-Sidebar header="Lojee Inc" header-icon="zap" footer="Jordan Diaz" [items]="items" />\`,
})
export class AppComponent {
  items = [
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
    { label: "Team", icon: "users" },
    { label: "Settings", icon: "settings" },
  ];
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Mix { category, items } entries into items for labeled, collapsible section groups — click a heading to toggle it. Defaults open for the first group or one containing an active row; every other group starts closed.">
            Categories
          </SectionLabel>
          <div className="h-96 overflow-hidden rounded-lg border border-border">
            <Sidebar
              collapsible
              header="Lojee Inc"
              headerIcon="zap"
              footer="Jordan Diaz"
              items={[
                {
                  category: "Workspace",
                  items: [
                    { label: "Dashboard", icon: "home", active: true },
                    { label: "Projects", icon: "folder" },
                  ],
                },
                {
                  category: "Account",
                  items: [
                    { label: "Team", icon: "users" },
                    { label: "Settings", icon: "settings" },
                  ],
                },
              ]}
            />
          </div>
          <CodeBlock
            variants={{
              react: `<Sidebar
  collapsible
  header="Lojee Inc"
  headerIcon="zap"
  footer="Jordan Diaz"
  items={[
    {
      category: "Workspace",
      items: [
        { label: "Dashboard", icon: "home", active: true },
        { label: "Projects", icon: "folder" },
      ],
    },
    {
      category: "Account",
      items: [
        { label: "Team", icon: "users" },
        { label: "Settings", icon: "settings" },
      ],
    },
  ]}
/>`,
              js: `<l-Sidebar id="categories-sidebar" collapsible="true" header="Lojee Inc" header-icon="zap" footer="Jordan Diaz"></l-Sidebar>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("categories-sidebar").items = [
    {
      category: "Workspace",
      items: [
        { label: "Dashboard", icon: "home", active: true },
        { label: "Projects", icon: "folder" },
      ],
    },
    {
      category: "Account",
      items: [
        { label: "Team", icon: "users" },
        { label: "Settings", icon: "settings" },
      ],
    },
  ];
</script>`,
              vue: `<template>
  <l-Sidebar :collapsible="true" header="Lojee Inc" header-icon="zap" footer="Jordan Diaz" :items="items" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = [
  {
    category: "Workspace",
    items: [
      { label: "Dashboard", icon: "home", active: true },
      { label: "Projects", icon: "folder" },
    ],
  },
  {
    category: "Account",
    items: [
      { label: "Team", icon: "users" },
      { label: "Settings", icon: "settings" },
    ],
  },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-Sidebar [collapsible]="true" header="Lojee Inc" header-icon="zap" footer="Jordan Diaz" [items]="items" />\`,
})
export class AppComponent {
  items = [
    {
      category: "Workspace",
      items: [
        { label: "Dashboard", icon: "home", active: true },
        { label: "Projects", icon: "folder" },
      ],
    },
    {
      category: "Account",
      items: [
        { label: "Team", icon: "users" },
        { label: "Settings", icon: "settings" },
      ],
    },
  ];
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel
            sub={
              'Six themes: "light" (default), "dark", "bordered"/"elevated" (detached, ' +
              'floating panels), "minimal" (no chrome at all), and "gradient" (color-tinted).'
            }
          >
            Variants
          </SectionLabel>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">light</p>
              <div className="h-72 overflow-hidden rounded-lg border border-border">
                <Sidebar header="Lojee Inc" footer="Jordan Diaz" items={VARIANT_ITEMS} />
              </div>
            </div>
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">dark</p>
              <div className="h-72 overflow-hidden rounded-lg border border-slate-800">
                <Sidebar variant="dark" header="Lojee Inc" footer="Jordan Diaz" items={VARIANT_ITEMS} />
              </div>
            </div>
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">bordered</p>
              <div className="h-72 overflow-hidden rounded-lg border border-border">
                <Sidebar variant="bordered" height="100%" className="h-full" header="Lojee Inc" items={VARIANT_ITEMS} />
              </div>
            </div>
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">elevated</p>
              <div className="h-72 overflow-hidden rounded-lg border border-border">
                <Sidebar variant="elevated" height="100%" className="h-full" header="Lojee Inc" items={VARIANT_ITEMS} />
              </div>
            </div>
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">minimal</p>
              <div className="h-72 rounded-lg border border-dashed border-border-strong bg-surface p-4">
                <Sidebar variant="minimal" height="100%" className="h-full" header="Lojee Inc" items={VARIANT_ITEMS} />
              </div>
            </div>
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">gradient</p>
              <div className="h-72 overflow-hidden rounded-lg">
                <Sidebar variant="gradient" header="Lojee Inc" footer="Jordan Diaz" items={VARIANT_ITEMS} />
              </div>
            </div>
          </div>
          <CodeBlock
            variants={{
              react: `<Sidebar
  variant="dark"
  header="Lojee Inc"
  footer="Jordan Diaz"
  items={[
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
    { label: "Team", icon: "users" },
    { label: "Settings", icon: "settings" },
  ]}
/>

{/* Also available:
    variant="bordered" / "elevated" — detached-panel looks (rounded corners, floats
      inside a page instead of docking to a screen edge). Their backdrop (padding + a neutral
      background) is built in, so no extra markup is needed — just give them a height, e.g.
      height="100%" inside a sized parent. "bordered" is a solid panel on the page surface with a color-tinted
      border (see \`color\`/\`borderWidth\`); "elevated" is the same solid panel on the page surface but
      shadow-only, no border.
    variant="minimal"  — no background/border at all, blends into the page.
    variant="gradient" — a top-to-bottom gradient built from \`color\` (600 → 700). */}`,
              js: `<l-Sidebar id="variants-sidebar" variant="dark" header="Lojee Inc" footer="Jordan Diaz"></l-Sidebar>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("variants-sidebar").items = [
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
    { label: "Team", icon: "users" },
    { label: "Settings", icon: "settings" },
  ];
</script>

<!-- "bordered"/"elevated" — detached-panel looks; their backdrop is built in, no extra
     markup needed — just give them a height inside a sized parent, e.g. height="100%".
     "minimal" — no background/border at all, blends into the page. -->`,
              vue: `<template>
  <l-Sidebar variant="dark" header="Lojee Inc" footer="Jordan Diaz" :items="items" />

  <!-- "bordered"/"elevated" — detached-panel looks; their backdrop is built in, no extra
       markup needed — just give them a height inside a sized parent, e.g. height="100%".
       "minimal" — no background/border at all, blends into the page. -->
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = [
  { label: "Dashboard", icon: "home", active: true },
  { label: "Projects", icon: "folder" },
  { label: "Team", icon: "users" },
  { label: "Settings", icon: "settings" },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

// "bordered"/"elevated" — detached-panel looks; their backdrop is built in, no extra
// markup needed — just give them a height inside a sized parent, e.g. height="100%".
// "minimal" — no background/border at all, blends into the page.
@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-Sidebar variant="dark" header="Lojee Inc" footer="Jordan Diaz" [items]="items" />\`,
})
export class AppComponent {
  items = [
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
    { label: "Team", icon: "users" },
    { label: "Settings", icon: "settings" },
  ];
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="`color` tints the built-in collapse toggle's hover state — items generated from it automatically pick up the same color for a coordinated look, nothing to pass per-row.">
            Colors
          </SectionLabel>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-64 overflow-hidden rounded-lg border border-border">
              <Sidebar
                color="indigo"
                collapsible
                header="Lojee Inc"
                items={[
                  { label: "Dashboard", icon: "home", active: true },
                  { label: "Projects", icon: "folder" },
                  { label: "Team", icon: "users" },
                ]}
              />
            </div>
            <div className="h-64 overflow-hidden rounded-lg border border-border">
              <Sidebar
                color="emerald"
                collapsible
                header="Lojee Inc"
                items={[
                  { label: "Dashboard", icon: "home", active: true },
                  { label: "Projects", icon: "folder" },
                  { label: "Team", icon: "users" },
                ]}
              />
            </div>
            <div className="h-64 overflow-hidden rounded-lg border border-border">
              <Sidebar
                color="rose"
                collapsible
                header="Lojee Inc"
                items={[
                  { label: "Dashboard", icon: "home", active: true },
                  { label: "Projects", icon: "folder" },
                  { label: "Team", icon: "users" },
                ]}
              />
            </div>
          </div>
          <CodeBlock
            variants={{
              react: `<Sidebar
  color="indigo"
  collapsible
  header="Lojee Inc"
  items={[
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
    { label: "Team", icon: "users" },
  ]}
/>`,
              js: `<l-Sidebar id="colors-sidebar" color="indigo" collapsible="true" header="Lojee Inc"></l-Sidebar>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("colors-sidebar").items = [
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
    { label: "Team", icon: "users" },
  ];
</script>`,
              vue: `<template>
  <l-Sidebar color="indigo" :collapsible="true" header="Lojee Inc" :items="items" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = [
  { label: "Dashboard", icon: "home", active: true },
  { label: "Projects", icon: "folder" },
  { label: "Team", icon: "users" },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-Sidebar color="indigo" [collapsible]="true" header="Lojee Inc" [items]="items" />\`,
})
export class AppComponent {
  items = [
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
    { label: "Team", icon: "users" },
  ];
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Each example starts collapsed — hover the icons (or the toggle). `tooltipTransition` picks the enter/exit effect (default: bounce), `tooltipTransitionDuration` its length in ms, and `tooltipColor` the bubble color — all built in, nothing to wire per row.">
            Tooltip effects
          </SectionLabel>
          <div className="flex flex-wrap gap-6">
            {TOOLTIP_EXAMPLES.map((ex) => (
              <figure key={ex.label} className="m-0 w-24">
                <CollapsedSidebar {...ex.props} />
                <figcaption className="mt-1.5 text-xs font-medium text-fg-subtle">{ex.label}</figcaption>
              </figure>
            ))}
          </div>
          <CodeBlock
            variants={{
              react: `<Sidebar
  collapsible
  tooltipTransition="slide-left"
  tooltipTransitionDuration={700}
  items={items}
/>`,
              js: `<l-Sidebar collapsible="true" tooltipTransition="slide-left" tooltipTransitionDuration="700"></l-Sidebar>`,
              vue: `<l-Sidebar :collapsible="true" tooltipTransition="slide-left" :tooltipTransitionDuration="700" :items="items" />`,
              angular: `<l-Sidebar [collapsible]="true" tooltipTransition="slide-left" [tooltipTransitionDuration]="700" [items]="items" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Set `collapsible` to show a built-in toggle button — Sidebar tracks its own collapsed state internally, so this works with no other props. header/headerIcon and each generated item already animate for the collapse/expand transition, nothing extra to wire up.">
            Collapsible
          </SectionLabel>
          <div className="h-80 w-fit overflow-hidden rounded-lg border border-border">
            <Sidebar
              collapsible
              header="Lojee Inc"
              headerIcon="zap"
              items={[
                { label: "Dashboard", icon: "home", active: true },
                { label: "Projects", icon: "folder" },
              ]}
            />
          </div>
          <CodeBlock
            variants={{
              react: `<Sidebar
  collapsible
  header="Lojee Inc"
  headerIcon="zap"
  items={[
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
  ]}
/>

{/* Self-contained — no collapsed/onCollapsedChange needed. Pass those
    yourself only if something outside Sidebar also needs to drive/observe
    the collapsed state, e.g.:
    const [collapsed, setCollapsed] = useState(false);
    <Sidebar collapsible collapsed={collapsed} onCollapsedChange={setCollapsed} ... /> */}`,
              js: `<l-Sidebar id="app-sidebar" collapsible="true" header="Lojee Inc" header-icon="zap"></l-Sidebar>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("app-sidebar").items = [
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
  ];
</script>`,
              vue: `<template>
  <l-Sidebar :collapsible="true" header="Lojee Inc" header-icon="zap" :items="items" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = [
  { label: "Dashboard", icon: "home", active: true },
  { label: "Projects", icon: "folder" },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-Sidebar [collapsible]="true" header="Lojee Inc" header-icon="zap" [items]="items" />\`,
})
export class AppComponent {
  items = [
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
  ];
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="`collapseSpeed` sets how fast the panel narrows to the icon rail and widens back — the same speed both ways, items included: &quot;fast&quot; (150ms), &quot;normal&quot; (300ms, the default) or &quot;slow&quot; (600ms) — or a number of ms. Click each toggle to compare.">
            Collapse speed
          </SectionLabel>
          <div className="flex flex-wrap gap-6">
            {(["fast", "normal", "slow"] as const).map((speed) => (
              <div key={speed}>
                <div className="mb-2 text-xs font-medium text-fg-subtle">{speed}</div>
                <div className="h-64 w-fit overflow-hidden rounded-lg border border-border">
                  <Sidebar
                    collapsible
                    width={200}
                    collapseSpeed={speed}
                    header="Lojee Inc"
                    headerIcon="zap"
                    items={VARIANT_ITEMS}
                  />
                </div>
              </div>
            ))}
          </div>
          <CodeBlock
            variants={{
              react: `{/* "fast" | "normal" (default) | "slow", or a number of ms — same speed collapsing and expanding */}
<Sidebar collapsible collapseSpeed="slow" header="Lojee Inc" headerIcon="zap" items={items} />

<Sidebar collapsible collapseSpeed={800} items={items} />`,
              js: `<l-Sidebar id="app-sidebar" collapsible="true" collapse-speed="slow" header="Lojee Inc" header-icon="zap"></l-Sidebar>`,
              vue: `<template>
  <l-Sidebar :collapsible="true" collapse-speed="slow" header="Lojee Inc" header-icon="zap" :items="items" />
</template>`,
              angular: `template: \`<l-Sidebar [collapsible]="true" collapse-speed="slow" header="Lojee Inc" header-icon="zap" [items]="items" />\`,`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`). They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <TransitionPreview cols={3}>
            <div className="h-64 overflow-hidden rounded-lg border border-border"><Sidebar items={VARIANT_ITEMS} transition="fade" /></div>
            <div className="h-64 overflow-hidden rounded-lg border border-border"><Sidebar items={VARIANT_ITEMS} transition="slide-right" /></div>
            <div className="h-64 overflow-hidden rounded-lg border border-border"><Sidebar items={VARIANT_ITEMS} transition="zoom" /></div>
            <div className="h-64 overflow-hidden rounded-lg border border-border"><Sidebar items={VARIANT_ITEMS} transition="blur" /></div>
            <div className="h-64 overflow-hidden rounded-lg border border-border"><Sidebar items={VARIANT_ITEMS} transition="bounce" transitionDelay={100} /></div>
            <div className="h-64 overflow-hidden rounded-lg border border-border"><Sidebar items={VARIANT_ITEMS} transition="drop" transitionDuration={700} /></div>
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `const items = [
  { label: "Dashboard", icon: "home", active: true },
  { label: "Projects", icon: "folder" },
  { label: "Team", icon: "users" },
  { label: "Settings", icon: "settings" },
];

<Sidebar items={items} transition="fade" />
<Sidebar items={items} transition="slide-right" />
<Sidebar items={items} transition="zoom" />
<Sidebar items={items} transition="blur" />
<Sidebar items={items} transition="bounce" transitionDelay={100} />
<Sidebar items={items} transition="drop" transitionDuration={700} />`,
              js: `<l-Sidebar class="transition-demo" transition="fade"></l-Sidebar>
<l-Sidebar class="transition-demo" transition="slide-right"></l-Sidebar>
<l-Sidebar class="transition-demo" transition="zoom"></l-Sidebar>
<l-Sidebar class="transition-demo" transition="blur"></l-Sidebar>
<l-Sidebar class="transition-demo" transition="bounce" transitionDelay="100"></l-Sidebar>
<l-Sidebar class="transition-demo" transition="drop" transitionDuration="700"></l-Sidebar>


<script type="module">
  import "lojee-ui/elements";

  const items = [
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
    { label: "Team", icon: "users" },
    { label: "Settings", icon: "settings" },
  ];
  document.querySelectorAll(".transition-demo").forEach((el) => (el.items = items));
</script>`,
              vue: `<template>
  <l-Sidebar :items="items" transition="fade"></l-Sidebar>
  <l-Sidebar :items="items" transition="slide-right"></l-Sidebar>
  <l-Sidebar :items="items" transition="zoom"></l-Sidebar>
  <l-Sidebar :items="items" transition="blur"></l-Sidebar>
  <l-Sidebar :items="items" transition="bounce" transitionDelay="100"></l-Sidebar>
  <l-Sidebar :items="items" transition="drop" transitionDuration="700"></l-Sidebar>

</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = [
  { label: "Dashboard", icon: "home", active: true },
  { label: "Projects", icon: "folder" },
  { label: "Team", icon: "users" },
  { label: "Settings", icon: "settings" },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-Sidebar [items]="items" transition="fade"></l-Sidebar>
    <l-Sidebar [items]="items" transition="slide-right"></l-Sidebar>
    <l-Sidebar [items]="items" transition="zoom"></l-Sidebar>
    <l-Sidebar [items]="items" transition="blur"></l-Sidebar>
    <l-Sidebar [items]="items" transition="bounce" transitionDelay="100"></l-Sidebar>
    <l-Sidebar [items]="items" transition="drop" transitionDuration="700"></l-Sidebar>

  \`,
})
export class AppComponent {
  items = [
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
    { label: "Team", icon: "users" },
    { label: "Settings", icon: "settings" },
  ];
}`,
            }}
          />
        </section>

      </div>
    </div>
  );
}
